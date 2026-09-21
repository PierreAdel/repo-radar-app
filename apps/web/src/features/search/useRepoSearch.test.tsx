import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { githubApi, persistenceMiddleware, trackedReposReducer } from "@repo-radar/core";

// Same reason as packages/core/src/api/githubApi.test.ts: jsdom has no fetch/
// Request, so Node's Request (used by fetchBaseQuery) needs an absolute URL a
// relative baseUrl can't provide. Stub it before githubApi.ts's module-load-time
// fetchBaseQuery({...}) call captures its config.
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

const { useRepoSearch } = await import("./useRepoSearch");

function jsonResponse(body: unknown, status = 200) {
  return Promise.resolve(new Response(JSON.stringify(body), { status }));
}

function makeStore() {
  return configureStore({
    reducer: { [githubApi.reducerPath]: githubApi.reducer, trackedRepos: trackedReposReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(githubApi.middleware, persistenceMiddleware.middleware),
  });
}

function renderWithProviders(initialEntries: string[], store = makeStore()) {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
  return { ...renderHook(() => useRepoSearch(), { wrapper }), store };
}

describe("useRepoSearch", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("does not query GitHub when the query is below MIN_QUERY_LENGTH", () => {
    const { result } = renderWithProviders(["/search?q=a"]);
    expect(result.current.items).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fetches and returns results for a valid query", async () => {
    fetchMock.mockReturnValueOnce(
      jsonResponse({
        items: [{ id: 1, fullName: "facebook/react" }],
        totalCount: 500,
      }),
    );
    const { result } = renderWithProviders(["/search?q=react&page=1"]);

    await waitFor(() => expect(result.current.items).toHaveLength(1));

    expect(result.current.items[0]).toMatchObject({ fullName: "facebook/react" });
    expect(result.current.hasMore).toBe(true);
  });

  it("tracks and untracks a repo", async () => {
    fetchMock.mockReturnValueOnce(jsonResponse({ items: [], totalCount: 0 }));
    const { result } = renderWithProviders(["/search?q=react"]);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isTracked("facebook/react")).toBe(false);

    act(() => result.current.onTrack("facebook/react"));
    expect(result.current.isTracked("facebook/react")).toBe(true);

    act(() => result.current.onUntrack("facebook/react"));
    expect(result.current.isTracked("facebook/react")).toBe(false);
  });

  it("onRetry refetches after a failed search", async () => {
    // A 404 isn't retried automatically (see githubApi's isRetryableError), so
    // this surfaces immediately instead of waiting through the automatic
    // retry backoff used for 5xx/network errors.
    fetchMock.mockReturnValueOnce(jsonResponse({ status: 404, message: "not found" }, 404));
    const { result } = renderWithProviders(["/search?q=react"]);

    await waitFor(() => expect(result.current.error).toBeDefined());
    expect(fetchMock).toHaveBeenCalledTimes(1);

    fetchMock.mockReturnValueOnce(jsonResponse({ items: [{ id: 1, fullName: "a/b" }] }));
    act(() => {
      result.current.onRetry();
    });

    await waitFor(() => expect(result.current.error).toBeUndefined());
    expect(result.current.items).toHaveLength(1);
  });

  it("clamps an invalid page param to 1", async () => {
    fetchMock.mockReturnValueOnce(jsonResponse({ items: [], totalCount: 0 }));
    renderWithProviders(["/search?q=react&page=-3"]);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect((fetchMock.mock.calls.at(-1)?.[0] as { url: string }).url).toContain("page=1");
  });
});
