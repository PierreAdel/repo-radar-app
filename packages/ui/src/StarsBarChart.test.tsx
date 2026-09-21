import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StarsBarChart } from "./StarsBarChart";

function mockMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

const fewRepos = [
  { label: "react", value: 231000 },
  { label: "vue", value: 208000 },
];

const manyRepos = Array.from({ length: 20 }, (_, i) => ({
  label: `repo-${i + 1}`,
  value: 1000 * (20 - i),
}));

describe("StarsBarChart", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("hides the single-series legend since the card title already says what it is", () => {
    render(<StarsBarChart data={fewRepos} />);
    expect(screen.queryByText("Stars")).not.toBeInTheDocument();
  });

  it("shows fewer bars per page on small screens to avoid cramped/overlapping labels", () => {
    mockMatchMedia(true);
    render(<StarsBarChart data={manyRepos} />);
    // 20 repos / 3 per page (small-screen size) = 7 pages, vs 3 pages at the default size of 8.
    expect(screen.getByText("1 / 7")).toBeInTheDocument();
  });

  it("renders without pagination controls for a short list", () => {
    render(<StarsBarChart data={fewRepos} />);
    expect(screen.queryByLabelText("Next repos")).not.toBeInTheDocument();
  });

  it("paginates a long list instead of showing everyone at once", async () => {
    render(<StarsBarChart data={manyRepos} />);

    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    expect(screen.getByText("repo-1")).toBeInTheDocument();
    expect(screen.queryByText("repo-9")).not.toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("Next repos"));

    expect(screen.getByText("2 / 3")).toBeInTheDocument();
    expect(screen.getByText("repo-9")).toBeInTheDocument();
    expect(screen.queryByText("repo-1")).not.toBeInTheDocument();
  });

  it("keeps same-named repos from different owners as distinct bars", () => {
    const { container } = render(
      <StarsBarChart
        data={[
          { label: "facebook/react", value: 231000 },
          { label: "reactjs-alt/react", value: 500 },
        ]}
      />,
    );

    // Both underlying category values must produce their own bar rect -
    // if the axis were keyed by the shortened "react" label instead of the
    // full name, both would collapse onto a single band.
    const bars = container.querySelectorAll('[class*="MuiBarElement"]');
    expect(bars.length).toBe(2);
    expect(screen.getAllByText("react").length).toBeGreaterThan(0);
  });

  it("formats the value axis with compact numbers, not raw digits", () => {
    render(<StarsBarChart data={fewRepos} />);
    expect(screen.getAllByText(/^\d+K$/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/^\d{1,3}(,\d{3})+$/)).not.toBeInTheDocument();
  });

  it("disables prev/next at the ends", async () => {
    render(<StarsBarChart data={manyRepos} />);

    expect(screen.getByLabelText("Previous repos")).toBeDisabled();

    await userEvent.click(screen.getByLabelText("Next repos"));
    await userEvent.click(screen.getByLabelText("Next repos"));

    expect(screen.getByText("3 / 3")).toBeInTheDocument();
    expect(screen.getByLabelText("Next repos")).toBeDisabled();
  });

  it("matches its snapshot with pagination controls visible", () => {
    const { container } = render(<StarsBarChart data={manyRepos} />);
    expect(container).toMatchSnapshot();
  });
});
