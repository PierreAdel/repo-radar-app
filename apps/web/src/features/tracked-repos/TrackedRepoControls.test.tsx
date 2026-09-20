import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TrackedRepoControls } from "./TrackedRepoControls";
import { useTrackedRepoView } from "./useTrackedRepoView";

vi.mock("./useTrackedRepoView", () => ({ useTrackedRepoView: vi.fn() }));
const mockedUseTrackedRepoView = vi.mocked(useTrackedRepoView);

function baseView(overrides: Partial<ReturnType<typeof useTrackedRepoView>> = {}) {
  return {
    trackedFullNames: ["a/a"],
    entryByFullName: new Map(),
    sortKey: "stars",
    setSortKey: vi.fn(),
    filters: {},
    setFilters: vi.fn(),
    clearFilters: vi.fn(),
    hasActiveFilters: false,
    maxStarBound: 1000,
    sortedFullNames: ["a/a"],
    ...overrides,
  } as ReturnType<typeof useTrackedRepoView>;
}

describe("TrackedRepoControls", () => {
  it("renders nothing when nothing is tracked", () => {
    mockedUseTrackedRepoView.mockReturnValue(baseView({ trackedFullNames: [] }));
    const { container } = render(<TrackedRepoControls />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the sort select and star range, with no clear button when filters are inactive", () => {
    mockedUseTrackedRepoView.mockReturnValue(baseView());
    render(<TrackedRepoControls />);

    expect(screen.getByText("Tracked repos")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /clear filter/i })).toBeNull();
  });

  it("shows a Clear filter button when filters are active, and calls clearFilters", async () => {
    const clearFilters = vi.fn();
    mockedUseTrackedRepoView.mockReturnValue(
      baseView({ hasActiveFilters: true, filters: { minStars: 100 }, clearFilters }),
    );
    render(<TrackedRepoControls />);

    await userEvent.click(screen.getByRole("button", { name: /clear filter/i }));
    expect(clearFilters).toHaveBeenCalledOnce();
  });

  it("calls setSortKey when the sort select changes", async () => {
    const setSortKey = vi.fn();
    mockedUseTrackedRepoView.mockReturnValue(baseView({ setSortKey }));
    render(<TrackedRepoControls />);

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "Sort by name" }));

    expect(setSortKey).toHaveBeenCalledWith("name");
  });

  it("matches its snapshot", () => {
    mockedUseTrackedRepoView.mockReturnValue(
      baseView({ hasActiveFilters: true, filters: { minStars: 50, maxStars: 500 } }),
    );
    const { container } = render(<TrackedRepoControls />);
    expect(container).toMatchSnapshot();
  });
});
