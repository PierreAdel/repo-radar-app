import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ErrorFallback } from "./ErrorFallback";

describe("ErrorFallback", () => {
  it("renders a default message and focuses the heading", () => {
    render(<ErrorFallback onRetry={() => {}} />);
    const heading = screen.getByRole("heading", { name: "Something went wrong" });
    expect(heading).toHaveFocus();
    expect(screen.getByText(/unexpected error occurred/i)).toBeInTheDocument();
  });

  it("renders custom details when provided", () => {
    render(<ErrorFallback onRetry={() => {}} details="Network request failed." />);
    expect(screen.getByText("Network request failed.")).toBeInTheDocument();
  });

  it("calls onRetry when Try again is clicked", async () => {
    const onRetry = vi.fn();
    render(<ErrorFallback onRetry={onRetry} />);

    await userEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("renders and calls onReport only when provided", async () => {
    const onReport = vi.fn();
    render(<ErrorFallback onRetry={() => {}} onReport={onReport} />);

    await userEvent.click(screen.getByRole("button", { name: "Report" }));

    expect(onReport).toHaveBeenCalledOnce();
  });

  it("does not render a Report button when onReport is omitted", () => {
    render(<ErrorFallback onRetry={() => {}} />);
    expect(screen.queryByRole("button", { name: "Report" })).toBeNull();
  });

  it("matches its snapshot", () => {
    const { container } = render(
      <ErrorFallback onRetry={() => {}} onReport={() => {}} details="Network request failed." />,
    );
    expect(container).toMatchSnapshot();
  });
});
