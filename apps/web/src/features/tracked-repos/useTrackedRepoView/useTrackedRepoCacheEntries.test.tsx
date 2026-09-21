import { configureStore } from "@reduxjs/toolkit";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { githubApi, trackRepo, trackedReposReducer } from "@repo-radar/core";

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

const { useTrackedRepoCacheEntries } = await import("./useTrackedRepoCacheEntries");

function jsonResponse(body: unknown) {
  return Promise.resolve(new Response(JSON.stringify(body)));
}

function makeStore() {
  return configureStore({
    reducer: { [githubApi.reducerPath]: githubApi.reducer, trackedRepos: trackedReposReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
  });
}

describe("useTrackedRepoCacheEntries", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("returns an empty array when nothing is tracked", () => {
    const store = makeStore();
    const { result } = renderHook(() => useTrackedRepoCacheEntries(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current).toEqual([]);
  });

  it("returns one entry per tracked repo, reflecting the RTK Query cache once populated", async () => {
    const store = makeStore();
    store.dispatch(trackRepo("octocat/hello-world"));

    const { result } = renderHook(() => useTrackedRepoCacheEntries(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current).toMatchObject([
      { fullName: "octocat/hello-world", isUninitialized: true },
    ]);

    // Simulate the data arriving the way useTrackedRepoView's effect would
    // trigger it, without pulling that whole hook into this unit test.
    fetchMock.mockReturnValueOnce(
      jsonResponse({ id: 1, fullName: "octocat/hello-world", stargazersCount: 42 }),
    );
    await store.dispatch(githubApi.endpoints.getRepository.initiate("octocat/hello-world"));

    await waitFor(() =>
      expect(result.current[0]?.data).toMatchObject({ fullName: "octocat/hello-world" }),
    );
  });
});
