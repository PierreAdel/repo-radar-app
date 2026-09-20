import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";

// jsdom implements neither `fetch` nor `Request`, so Node's native `Request`
// backs fetchBaseQuery here — and unlike a browser, it has no document to
// resolve a relative URL against, so `new Request("/api/github/...")` throws
// before fetchFn (our mock) is ever reached. Swap in a permissive stand-in
// that just records what it was given. Must happen before githubApi.ts is
// imported, since fetchBaseQuery({...}) runs at that module's load time.
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

const { githubApi } = await import("./githubApi");

function makeStore() {
  return configureStore({
    reducer: { [githubApi.reducerPath]: githubApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
  });
}

function jsonResponse(body: unknown, status = 200) {
  return Promise.resolve(
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    }),
  );
}

function requestedUrl() {
  return (fetchMock.mock.calls.at(-1)?.[0] as { url: string } | undefined)?.url;
}

describe("githubApi", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("requests /search with the encoded query and page", async () => {
    fetchMock.mockReturnValueOnce(jsonResponse({ items: [], totalCount: 0 }));
    const store = makeStore();

    await store.dispatch(
      githubApi.endpoints.searchRepositories.initiate({ query: "react hooks", page: 1 }),
    );

    expect(requestedUrl()).toContain("/api/github/search?q=react%20hooks&page=1");
  });

  it("merges page 2 results into page 1's cache entry for the same query", async () => {
    fetchMock
      .mockReturnValueOnce(jsonResponse({ items: [{ id: 1, fullName: "a/a" }], totalCount: 2 }))
      .mockReturnValueOnce(jsonResponse({ items: [{ id: 2, fullName: "b/b" }], totalCount: 2 }));
    const store = makeStore();

    await store.dispatch(
      githubApi.endpoints.searchRepositories.initiate({ query: "react", page: 1 }),
    );
    await store.dispatch(
      githubApi.endpoints.searchRepositories.initiate({ query: "react", page: 2 }),
    );

    const result = githubApi.endpoints.searchRepositories.select({ query: "react", page: 2 })(
      store.getState(),
    );
    expect(result.data?.items).toHaveLength(2);
    expect(result.data?.totalCount).toBe(2);
  });

  it("requests /repo with the encoded full name", async () => {
    fetchMock.mockReturnValueOnce(jsonResponse({ id: 1, fullName: "octocat/hello-world" }));
    const store = makeStore();

    await store.dispatch(githubApi.endpoints.getRepository.initiate("octocat/hello-world"));

    expect(requestedUrl()).toContain("/api/github/repo?fullName=octocat%2Fhello-world");
  });

  it("surfaces an upstream error", async () => {
    fetchMock.mockReturnValueOnce(jsonResponse({ message: "not found" }, 404));
    const store = makeStore();

    const result = await store.dispatch(githubApi.endpoints.getRepository.initiate("nope/nope"));

    expect(result.error).toBeDefined();
  });
});
