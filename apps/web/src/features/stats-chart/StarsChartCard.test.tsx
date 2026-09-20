import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StarsChartCard } from "./StarsChartCard";
import { useTrackedRepoView } from "../tracked-repos/useTrackedRepoView";

vi.mock("../tracked-repos/useTrackedRepoView", () => ({ useTrackedRepoView: vi.fn() }));
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

describe("StarsChartCard", () => {
  it("renders nothing when no tracked repo has loaded data yet", () => {
    mockedUseTrackedRepoView.mockReturnValue(baseView({ sortedFullNames: ["a/a"] }));
    const { container } = render(<StarsChartCard />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the chart with loaded repos, no notice when all have loaded", () => {
    const entryByFullName = new Map([
      ["a/a", { fullName: "a/a", data: { fullName: "a/a", stargazersCount: 10 } }],
    ]);
    mockedUseTrackedRepoView.mockReturnValue(
      baseView({ sortedFullNames: ["a/a"], entryByFullName } as never),
    );
    render(<StarsChartCard />);

    expect(screen.getByText("Stars by repo")).toBeInTheDocument();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("shows a partial-data notice when some tracked repos haven't loaded", () => {
    const entryByFullName = new Map([
      ["a/a", { fullName: "a/a", data: { fullName: "a/a", stargazersCount: 10 } }],
    ]);
    mockedUseTrackedRepoView.mockReturnValue(
      baseView({ sortedFullNames: ["a/a", "b/b"], entryByFullName } as never),
    );
    render(<StarsChartCard />);

    expect(screen.getByRole("status")).toHaveTextContent("Showing 1 of 2 tracked repos");
  });

  it("matches its snapshot", () => {
    const entryByFullName = new Map([
      ["a/a", { fullName: "a/a", data: { fullName: "a/a", stargazersCount: 10 } }],
    ]);
    mockedUseTrackedRepoView.mockReturnValue(
      baseView({ sortedFullNames: ["a/a"], entryByFullName } as never),
    );
    const { container } = render(<StarsChartCard />);
    expect(container).toMatchSnapshot();
  });
});
