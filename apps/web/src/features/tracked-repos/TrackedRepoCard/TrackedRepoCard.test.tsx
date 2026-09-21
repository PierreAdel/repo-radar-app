import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { githubApi, untrackRepo } from "@repo-radar/core";

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

const { TrackedRepoCard } = await import("./TrackedRepoCard");

function jsonResponse(body: unknown, status = 200) {
  return Promise.resolve(new Response(JSON.stringify(body), { status }));
}

function makeStore() {
  const store = configureStore({
    reducer: { [githubApi.reducerPath]: githubApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
  });
  return store;
}

describe("TrackedRepoCard", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("shows a loading state, then the repo once it arrives", async () => {
    fetchMock.mockReturnValueOnce(
      jsonResponse({
        id: 1,
        fullName: "octocat/hello-world",
        htmlUrl: "https://github.com/octocat/hello-world",
        description: "desc",
        stargazersCount: 10,
        openIssuesCount: 1,
        pushedAt: new Date().toISOString(),
        ownerLogin: "octocat",
        ownerAvatarUrl: "https://avatars/octocat",
      }),
    );
    const store = makeStore();

    render(
      <Provider store={store}>
        <TrackedRepoCard fullName="octocat/hello-world" />
      </Provider>,
    );

    await waitFor(() => expect(screen.getByText("octocat/hello-world")).toBeInTheDocument());
  });

  it("dispatches untrackRepo when Untrack is clicked", async () => {
    fetchMock.mockReturnValueOnce(
      jsonResponse({
        id: 1,
        fullName: "octocat/hello-world",
        htmlUrl: "https://github.com/octocat/hello-world",
        description: "desc",
        stargazersCount: 10,
        openIssuesCount: 1,
        pushedAt: new Date().toISOString(),
        ownerLogin: "octocat",
        ownerAvatarUrl: "https://avatars/octocat",
      }),
    );
    const store = makeStore();
    const dispatchSpy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <TrackedRepoCard fullName="octocat/hello-world" />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByText("octocat/hello-world")).toBeInTheDocument());

    await userEvent.click(screen.getByRole("button", { name: /untrack/i }));

    expect(dispatchSpy).toHaveBeenCalledWith(untrackRepo("octocat/hello-world"));
  });

  it("shows an error state when the fetch fails", async () => {
    fetchMock.mockReturnValueOnce(jsonResponse({ message: "not found" }, 404));
    const store = makeStore();

    render(
      <Provider store={store}>
        <TrackedRepoCard fullName="octocat/missing" />
      </Provider>,
    );

    await waitFor(() => expect(screen.getByText("not found")).toBeInTheDocument());
  });
});
