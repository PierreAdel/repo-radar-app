import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import {
  githubApi,
  persistenceMiddleware,
  trackedReposReducer,
  trackRepo,
  TRACKED_REPOS_STORAGE_KEY,
} from "@repo-radar/core";
import { TrackedReposSection } from "./TrackedReposSection/TrackedReposSection";

// Real store + real persistenceMiddleware + real localStorage (jsdom provides
// a working one; no need to mock it), only the network boundary mocked, same
// as the other RTK Query integration tests in this plan.
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

function repoBody(fullName: string) {
  return {
    id: fullName.length,
    fullName,
    htmlUrl: `https://github.com/${fullName}`,
    description: "",
    stargazersCount: 10,
    openIssuesCount: 0,
    pushedAt: new Date().toISOString(),
    ownerLogin: fullName.split("/")[0],
    ownerAvatarUrl: "https://avatars/x",
  };
}

function makeStore() {
  return configureStore({
    reducer: {
      [githubApi.reducerPath]: githubApi.reducer,
      trackedRepos: trackedReposReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(githubApi.middleware, persistenceMiddleware.middleware),
  });
}

function renderSection(store: ReturnType<typeof makeStore>) {
  return render(
    <MemoryRouter>
      <Provider store={store}>
        <TrackedReposSection />
      </Provider>
    </MemoryRouter>,
  );
}

describe("track-repo flow (integration)", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    window.localStorage.clear();
  });

  it("tracking a repo persists it and renders its card", async () => {
    const store = makeStore();
    fetchMock.mockReturnValueOnce(jsonResponse(repoBody("octocat/hello-world")));

    renderSection(store);
    expect(screen.getByText("No tracked repositories yet")).toBeInTheDocument();

    store.dispatch(trackRepo("octocat/hello-world"));

    await waitFor(() => expect(screen.getByText("octocat/hello-world")).toBeInTheDocument());
    expect(JSON.parse(window.localStorage.getItem(TRACKED_REPOS_STORAGE_KEY)!)).toEqual([
      "octocat/hello-world",
    ]);
  });

  it("untracking removes the card and updates storage", async () => {
    const store = makeStore();
    fetchMock.mockReturnValueOnce(jsonResponse(repoBody("octocat/hello-world")));

    renderSection(store);
    store.dispatch(trackRepo("octocat/hello-world"));
    await waitFor(() => expect(screen.getByText("octocat/hello-world")).toBeInTheDocument());

    await userEvent.click(screen.getByRole("button", { name: /untrack/i }));

    await waitFor(() =>
      expect(screen.getByText("No tracked repositories yet")).toBeInTheDocument(),
    );
    expect(JSON.parse(window.localStorage.getItem(TRACKED_REPOS_STORAGE_KEY)!)).toEqual([]);
  });

  // Unlike the two tests above, this one needs trackedReposSlice's
  // initialState to actually re-read localStorage - which only happens at
  // module load - so it pays for a full module reset + re-import instead of
  // reusing the file's shared top-level import. Under a loaded/parallel test
  // run that module re-execution plus the render+fetch round trip can run
  // close to the default 5s test timeout, so it gets its own explicit budget.
  it("survives a simulated reload: a fresh store picks up what was persisted", async () => {
    window.localStorage.setItem(TRACKED_REPOS_STORAGE_KEY, JSON.stringify(["octocat/hello-world"]));

    vi.resetModules();
    const core = await import("@repo-radar/core");
    const { TrackedReposSection: FreshTrackedReposSection } =
      await import("./TrackedReposSection/TrackedReposSection");
    const { Provider: FreshProvider } = await import("react-redux");

    const store = configureStore({
      reducer: {
        [core.githubApi.reducerPath]: core.githubApi.reducer,
        trackedRepos: core.trackedReposReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          core.githubApi.middleware,
          core.persistenceMiddleware.middleware,
        ),
    });
    fetchMock.mockReturnValueOnce(jsonResponse(repoBody("octocat/hello-world")));

    render(
      <MemoryRouter>
        <FreshProvider store={store}>
          <FreshTrackedReposSection />
        </FreshProvider>
      </MemoryRouter>,
    );

    expect(store.getState().trackedRepos.fullNames).toEqual(["octocat/hello-world"]);
    await waitFor(() => expect(screen.getByText("octocat/hello-world")).toBeInTheDocument());
  }, 15000);
});
