import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders title only when description/action are omitted", () => {
    const { container } = render(<EmptyState title="Nothing tracked yet" />);
    expect(screen.getByText("Nothing tracked yet")).toBeInTheDocument();
    expect(container.querySelector("button")).toBeNull();
  });

  it("renders description when provided", () => {
    render(<EmptyState title="No results" description="Try a different search." />);
    expect(screen.getByText("Try a different search.")).toBeInTheDocument();
  });

  it("renders the action button and calls onAction when clicked", async () => {
    const onAction = vi.fn();
    render(<EmptyState title="No results" actionLabel="Retry" onAction={onAction} />);

    const button = screen.getByRole("button", { name: "Retry" });
    await userEvent.click(button);

    expect(onAction).toHaveBeenCalledOnce();
  });

  it("does not render the action button when only one of actionLabel/onAction is set", () => {
    const { container } = render(<EmptyState title="No results" actionLabel="Retry" />);
    expect(container.querySelector("button")).toBeNull();
  });

  it("matches its snapshot", () => {
    const { container } = render(
      <EmptyState
        title="No results"
        description="Try a different search."
        actionLabel="Retry"
        onAction={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
