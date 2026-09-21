import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TrackedReposSection } from "./TrackedReposSection";
import { useTrackedRepoView } from "./useTrackedRepoView";

vi.mock("./useTrackedRepoView", () => ({ useTrackedRepoView: vi.fn() }));
vi.mock("./TrackedRepoCard", () => ({
  TrackedRepoCard: ({ fullName }: { fullName: string }) => <div>card:{fullName}</div>,
}));

const mockedUseTrackedRepoView = vi.mocked(useTrackedRepoView);

function baseView(overrides: Partial<ReturnType<typeof useTrackedRepoView>> = {}) {
  return {
    trackedFullNames: [],
    entryByFullName: new Map(),
    sortKey: "stars",
    setSortKey: vi.fn(),
    filters: {},
    setFilters: vi.fn(),
    clearFilters: vi.fn(),
    hasActiveFilters: false,
    maxStarBound: 1000,
    sortedFullNames: [],
    ...overrides,
  } as ReturnType<typeof useTrackedRepoView>;
}

describe("TrackedReposSection", () => {
  it("shows the empty state when nothing is tracked", () => {
    mockedUseTrackedRepoView.mockReturnValue(baseView());
    render(<TrackedReposSection />);
    expect(screen.getByText("No tracked repositories yet")).toBeInTheDocument();
  });

  it("shows a filtered-empty state with a clear action when tracked repos exist but none match", () => {
    const clearFilters = vi.fn();
    mockedUseTrackedRepoView.mockReturnValue(
      baseView({ trackedFullNames: ["a/a"], sortedFullNames: [], clearFilters }),
    );
    render(<TrackedReposSection />);
    expect(screen.getByText("No tracked repos match these filters")).toBeInTheDocument();
  });

  it("renders a plain grid of cards below the virtualization threshold", () => {
    mockedUseTrackedRepoView.mockReturnValue(
      baseView({ trackedFullNames: ["a/a", "b/b"], sortedFullNames: ["a/a", "b/b"] }),
    );
    render(<TrackedReposSection />);
    expect(screen.getByText("card:a/a")).toBeInTheDocument();
    expect(screen.getByText("card:b/b")).toBeInTheDocument();
  });

  it("mounts the virtualized path without crashing at the threshold", () => {
    const names = Array.from({ length: 25 }, (_, i) => `owner/repo-${i}`);
    mockedUseTrackedRepoView.mockReturnValue(
      baseView({ trackedFullNames: names, sortedFullNames: names }),
    );
    const { container } = render(<TrackedReposSection />);
    expect(container.querySelector('[role="list"]')).toBeInTheDocument();
  });

  it("matches its snapshot in the plain-grid state", () => {
    mockedUseTrackedRepoView.mockReturnValue(
      baseView({ trackedFullNames: ["a/a"], sortedFullNames: ["a/a"] }),
    );
    const { container } = render(<TrackedReposSection />);
    expect(container).toMatchSnapshot();
  });
});
