import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { trackedReposReducer, trackRepo } from "@repo-radar/core";
import { DashboardPage } from "./DashboardPage";

vi.mock("../../features/tracked-repos/TrackedReposSection/TrackedReposSection", () => ({
  TrackedReposSection: () => <div>tracked-repos-section</div>,
}));
vi.mock("../../features/tracked-repos/TrackedRepoControls/TrackedRepoControls", () => ({
  TrackedRepoControls: () => <div>tracked-repo-controls</div>,
}));
vi.mock("../../features/stats-chart/StarsChartCard/StarsChartCard", () => ({
  StarsChartCard: () => <div>stars-chart-card</div>,
}));

function renderWithStore(trackedFullNames: string[] = []) {
  const store = configureStore({ reducer: { trackedRepos: trackedReposReducer } });
  trackedFullNames.forEach((fullName) => store.dispatch(trackRepo(fullName)));
  return render(
    <Provider store={store}>
      <DashboardPage />
    </Provider>,
  );
}

describe("DashboardPage", () => {
  it("skips the tracked-repo controls and chart sections when nothing is tracked", () => {
    const { container } = renderWithStore([]);

    expect(container.querySelectorAll(".MuiSkeleton-root").length).toBe(0);
    expect(screen.queryByText("tracked-repo-controls")).toBeNull();
    expect(screen.queryByText("stars-chart-card")).toBeNull();
    expect(screen.getByText("tracked-repos-section")).toBeInTheDocument();
  });

  it("renders the tracked-repo controls and chart sections once something is tracked", async () => {
    renderWithStore(["a/a"]);

    expect(await screen.findByText("tracked-repo-controls")).toBeInTheDocument();
    expect(await screen.findByText("stars-chart-card")).toBeInTheDocument();
  });
});
