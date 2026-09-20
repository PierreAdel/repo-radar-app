import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import type { GithubRepo } from "@repo-radar/core";
import { SearchResultsSection } from "./SearchResultsSection";
import { useRepoSearch } from "./useRepoSearch";

vi.mock("./useRepoSearch", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./useRepoSearch")>();
  return { ...actual, useRepoSearch: vi.fn() };
});

const mockedUseRepoSearch = vi.mocked(useRepoSearch);

function baseResult(overrides: Partial<ReturnType<typeof useRepoSearch>> = {}) {
  return {
    query: "react",
    items: [],
    isLoading: false,
    isLoadingMore: false,
    error: undefined,
    hasMore: false,
    loadMore: vi.fn(),
    isTracked: () => false,
    onTrack: vi.fn(),
    onUntrack: vi.fn(),
    ...overrides,
  } as ReturnType<typeof useRepoSearch>;
}

function repo(id: number): GithubRepo {
  return {
    id,
    fullName: `owner/repo-${id}`,
    htmlUrl: `https://github.com/owner/repo-${id}`,
    description: "A test repo",
    stargazersCount: 10,
    openIssuesCount: 1,
    pushedAt: new Date().toISOString(),
    ownerLogin: "owner",
    ownerAvatarUrl: "https://avatars/owner",
  };
}

function renderAtSearch() {
  return render(
    <MemoryRouter initialEntries={["/search?q=react"]}>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/search" element={<SearchResultsSection />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("SearchResultsSection", () => {
  it("redirects home when the query is empty", () => {
    mockedUseRepoSearch.mockReturnValue(baseResult({ query: "" }));
    renderAtSearch();
    expect(screen.getByText("home")).toBeInTheDocument();
  });

  it("prompts for more characters below MIN_QUERY_LENGTH", () => {
    mockedUseRepoSearch.mockReturnValue(baseResult({ query: "r" }));
    renderAtSearch();
    expect(screen.getByRole("status")).toHaveTextContent(/type at least/i);
  });

  it("shows loading skeletons while isLoading", () => {
    const { container } = renderAtSearchWith(baseResult({ isLoading: true }));
    expect(container.querySelectorAll(".MuiSkeleton-root").length).toBeGreaterThan(0);
  });

  it("shows an error state", () => {
    renderAtSearchWith(baseResult({ error: { status: 500, message: "GitHub is down." } }));
    expect(screen.getByText("GitHub is down.")).toBeInTheDocument();
  });

  it("shows a not-found message with no results", () => {
    renderAtSearchWith(baseResult({ items: [] }));
    expect(screen.getByRole("status")).toHaveTextContent(/no repositories found/i);
  });

  it("renders results, tracks a repo, and loads more", async () => {
    const onTrack = vi.fn();
    const loadMore = vi.fn();
    renderAtSearchWith(baseResult({ items: [repo(1), repo(2)], hasMore: true, onTrack, loadMore }));

    expect(screen.getByText("owner/repo-1")).toBeInTheDocument();
    const [firstTrackButton] = screen.getAllByRole("button", { name: /track/i });
    await userEvent.click(firstTrackButton!);
    expect(onTrack).toHaveBeenCalledWith("owner/repo-1");

    await userEvent.click(screen.getByRole("button", { name: "Load more" }));
    expect(loadMore).toHaveBeenCalledOnce();
  });

  it("matches its snapshot in the populated, non-virtualized state", () => {
    const { container } = renderAtSearchWith(baseResult({ items: [repo(1), repo(2)] }));
    expect(container).toMatchSnapshot();
  });

  it("switches to the virtualized list at the threshold without crashing", () => {
    // jsdom has no real layout, so @tanstack/react-virtual computes a
    // zero-size viewport and renders no rows — this only proves the
    // virtualized code path mounts cleanly with >=20 items, not that any
    // particular row is visible (that's what packages/ui's own virtualization
    // behavior would need a real browser, i.e. Playwright, to verify).
    const items = Array.from({ length: 25 }, (_, i) => repo(i));
    const { container } = renderAtSearchWith(baseResult({ items }));
    expect(container.querySelector("ul")).toBeInTheDocument();
  });

  function renderAtSearchWith(result: ReturnType<typeof useRepoSearch>) {
    mockedUseRepoSearch.mockReturnValue(result);
    return renderAtSearch();
  }
});
