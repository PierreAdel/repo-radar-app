import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { TRACKED_REPOS_STORAGE_KEY } from "@repo-radar/core";

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

async function importFresh() {
  // The tracked-repos slice reads localStorage into its initialState once, at
  // module load — the same way a real page load re-reads it. Reset the module
  // registry so each "reload" actually re-executes that read, instead of
  // reusing whatever the previous test's in-memory store already had.
  vi.resetModules();
  const core = await import("@repo-radar/core");
  const { TrackedReposSection } = await import("./TrackedReposSection");
  return { core, TrackedReposSection };
}

function makeStore(core: Awaited<ReturnType<typeof importFresh>>["core"]) {
  return configureStore({
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
}

describe("track-repo flow (integration)", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    window.localStorage.clear();
  });

  it("tracking a repo persists it and renders its card", async () => {
    const { core, TrackedReposSection } = await importFresh();
    const store = makeStore(core);
    fetchMock.mockReturnValueOnce(jsonResponse(repoBody("octocat/hello-world")));

    const { Provider } = await import("react-redux");
    render(
      <MemoryRouter>
        <Provider store={store}>
          <TrackedReposSection />
        </Provider>
      </MemoryRouter>,
    );
    expect(screen.getByText("No tracked repositories yet")).toBeInTheDocument();

    store.dispatch(core.trackRepo("octocat/hello-world"));

    await waitFor(() => expect(screen.getByText("octocat/hello-world")).toBeInTheDocument());
    expect(JSON.parse(window.localStorage.getItem(core.TRACKED_REPOS_STORAGE_KEY)!)).toEqual([
      "octocat/hello-world",
    ]);
  });

  it("untracking removes the card and updates storage", async () => {
    const { core, TrackedReposSection } = await importFresh();
    const store = makeStore(core);
    fetchMock.mockReturnValueOnce(jsonResponse(repoBody("octocat/hello-world")));

    const { Provider } = await import("react-redux");
    render(
      <MemoryRouter>
        <Provider store={store}>
          <TrackedReposSection />
        </Provider>
      </MemoryRouter>,
    );
    store.dispatch(core.trackRepo("octocat/hello-world"));
    await waitFor(() => expect(screen.getByText("octocat/hello-world")).toBeInTheDocument());

    await userEvent.click(screen.getByRole("button", { name: /untrack/i }));

    await waitFor(() =>
      expect(screen.getByText("No tracked repositories yet")).toBeInTheDocument(),
    );
    expect(JSON.parse(window.localStorage.getItem(core.TRACKED_REPOS_STORAGE_KEY)!)).toEqual([]);
  });

  it("survives a simulated reload: a fresh store picks up what was persisted", async () => {
    window.localStorage.setItem(TRACKED_REPOS_STORAGE_KEY, JSON.stringify(["octocat/hello-world"]));

    // Re-importing forces trackedReposSlice's initialState to re-read
    // localStorage, the same way a real page reload would.
    const { core, TrackedReposSection } = await importFresh();
    const store = makeStore(core);
    fetchMock.mockReturnValueOnce(jsonResponse(repoBody("octocat/hello-world")));

    const { Provider } = await import("react-redux");
    render(
      <MemoryRouter>
        <Provider store={store}>
          <TrackedReposSection />
        </Provider>
      </MemoryRouter>,
    );

    expect(store.getState().trackedRepos.fullNames).toEqual(["octocat/hello-world"]);
    await waitFor(() => expect(screen.getByText("octocat/hello-world")).toBeInTheDocument());
  });
});
