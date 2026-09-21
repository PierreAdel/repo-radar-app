import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import {
  githubApi,
  persistenceMiddleware,
  trackedReposReducer,
  themeReducer,
} from "@repo-radar/core";
import { Header } from "../../app/Header/Header";
import { SearchResultsSection } from "./SearchResultsSection";

// Real SearchBar -> useSearchBox -> URL -> useRepoSearch -> githubApi -> render,
// with only the network boundary mocked. Same jsdom fetch/Request situation as
// the unit tests: stub before githubApi.ts's module-load-time fetchBaseQuery
// call captures its config.
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

function jsonResponse(body: unknown) {
  return Promise.resolve(new Response(JSON.stringify(body)));
}

function makeStore() {
  return configureStore({
    reducer: {
      [githubApi.reducerPath]: githubApi.reducer,
      trackedRepos: trackedReposReducer,
      theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(githubApi.middleware, persistenceMiddleware.middleware),
  });
}

function renderSearchApp(store = makeStore()) {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/search" element={<SearchResultsSection />} />
          <Route path="*" element={null} />
        </Routes>
      </Provider>
    </MemoryRouter>,
  );
}

describe("search flow (integration)", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("typing in the search box drives a real fetch and renders results", async () => {
    fetchMock.mockReturnValueOnce(
      jsonResponse({
        items: [
          {
            id: 1,
            fullName: "facebook/react",
            htmlUrl: "https://github.com/facebook/react",
            description: "A UI library",
            stargazersCount: 200000,
            openIssuesCount: 900,
            pushedAt: new Date().toISOString(),
            ownerLogin: "facebook",
            ownerAvatarUrl: "https://avatars/facebook",
          },
        ],
        totalCount: 1,
      }),
    );
    renderSearchApp();

    await userEvent.type(screen.getByPlaceholderText(/search github repositories/i), "react");

    await waitFor(() => expect(fetchMock).toHaveBeenCalled(), { timeout: 2000 });
    const requestedUrl = (fetchMock.mock.calls.at(-1)?.[0] as { url: string }).url;
    expect(requestedUrl).toContain("q=react");
    await waitFor(() => expect(screen.getByText("facebook/react")).toBeInTheDocument());
  }, 10000);

  it("shows an upstream error surfaced all the way from the fetch boundary", async () => {
    fetchMock.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify({ message: "GitHub rate limit exceeded." }), { status: 429 }),
      ),
    );
    renderSearchApp();

    await userEvent.type(screen.getByPlaceholderText(/search github repositories/i), "react");

    await waitFor(
      () => expect(screen.getByText("GitHub rate limit exceeded.")).toBeInTheDocument(),
      {
        timeout: 2000,
      },
    );
  }, 10000);
});
