import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { githubApi, trackRepo, trackedReposReducer } from "@repo-radar/core";

// Same fetchBaseQuery/Request situation as packages/core's githubApi.test.ts:
// jsdom has no fetch/Request, and this hook's own effect dispatches
// getRepository.initiate() for every tracked repo on mount.
const fetchMock = vi.hoisted(() => {
  class TestRequest {
    url: string;
    constructor(url: string, init?: RequestInit) {
      this.url = url;
      Object.assign(this, init);
    }
    clone() {
      return this;
    }
  }
  globalThis.Request = TestRequest as unknown as typeof Request;
  return vi.fn();
});
globalThis.fetch = fetchMock as unknown as typeof fetch;

const { useTrackedRepoView } = await import("./useTrackedRepoView");

function jsonResponse(body: unknown) {
  return Promise.resolve(new Response(JSON.stringify(body)));
}

function repoBody(fullName: string, stars: number, pushedAt: string) {
  return {
    id: fullName.length,
    fullName,
    htmlUrl: `https://github.com/${fullName}`,
    description: "",
    stargazersCount: stars,
    openIssuesCount: 0,
    pushedAt,
    ownerLogin: fullName.split("/")[0],
    ownerAvatarUrl: "https://avatars/x",
  };
}

function makeStore() {
  return configureStore({
    reducer: { [githubApi.reducerPath]: githubApi.reducer, trackedRepos: trackedReposReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
  });
}

describe("useTrackedRepoView", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("sorts by stars descending by default", async () => {
    fetchMock
      .mockImplementationOnce(() => jsonResponse(repoBody("a/low", 10, "2020-01-01")))
      .mockImplementationOnce(() => jsonResponse(repoBody("b/high", 500, "2020-01-01")));

    const store = makeStore();
    store.dispatch(trackRepo("a/low"));
    store.dispatch(trackRepo("b/high"));

    const { result } = renderHook(() => useTrackedRepoView(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/"]}>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      ),
    });

    await waitFor(() => expect(result.current.entryByFullName.get("b/high")?.data).toBeDefined());

    expect(result.current.sortedFullNames).toEqual(["b/high", "a/low"]);
    expect(result.current.maxStarBound).toBe(500);
  });

  it("sorts alphabetically by name when sortKey is 'name'", async () => {
    fetchMock
      .mockImplementationOnce(() => jsonResponse(repoBody("z/last", 1, "2020-01-01")))
      .mockImplementationOnce(() => jsonResponse(repoBody("a/first", 1, "2020-01-01")));

    const store = makeStore();
    store.dispatch(trackRepo("z/last"));
    store.dispatch(trackRepo("a/first"));

    const { result } = renderHook(() => useTrackedRepoView(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/"]}>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      ),
    });
    await waitFor(() => expect(result.current.entryByFullName.size).toBe(2));

    act(() => result.current.setSortKey("name"));

    await waitFor(() => expect(result.current.sortKey).toBe("name"));
    expect(result.current.sortedFullNames).toEqual(["a/first", "z/last"]);
  });

  it("filters by minStars and reports hasActiveFilters", async () => {
    fetchMock
      .mockImplementationOnce(() => jsonResponse(repoBody("a/low", 5, "2020-01-01")))
      .mockImplementationOnce(() => jsonResponse(repoBody("b/high", 500, "2020-01-01")));

    const store = makeStore();
    store.dispatch(trackRepo("a/low"));
    store.dispatch(trackRepo("b/high"));

    const { result } = renderHook(() => useTrackedRepoView(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/"]}>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      ),
    });
    await waitFor(() => expect(result.current.entryByFullName.size).toBe(2));

    expect(result.current.hasActiveFilters).toBe(false);

    act(() => result.current.setFilters({ minStars: 100 }));

    await waitFor(() => expect(result.current.hasActiveFilters).toBe(true));
    expect(result.current.sortedFullNames).toEqual(["b/high"]);

    act(() => result.current.clearFilters());
    await waitFor(() => expect(result.current.hasActiveFilters).toBe(false));
    expect(result.current.sortedFullNames).toEqual(["b/high", "a/low"]);
  });
});
