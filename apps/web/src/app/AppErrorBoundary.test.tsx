import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// @sentry/react's exports are non-configurable in ESM, so vi.spyOn can't patch
// them directly (TypeError: Cannot redefine property) — mock the module instead.
vi.mock("@sentry/react", () => ({ captureException: vi.fn() }));
const Sentry = await import("@sentry/react");

const { AppErrorBoundary } = await import("./AppErrorBoundary");

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("kaboom");
  }
  return <div>safe content</div>;
}

describe("AppErrorBoundary", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // React logs the caught error to console.error too — expected noise, not a test failure.
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    vi.mocked(Sentry.captureException).mockClear();
  });

  it("renders children when nothing throws", () => {
    render(
      <AppErrorBoundary>
        <Bomb shouldThrow={false} />
      </AppErrorBoundary>,
    );
    expect(screen.getByText("safe content")).toBeInTheDocument();
  });

  it("renders the ErrorFallback and reports to Sentry when a child throws", () => {
    render(
      <AppErrorBoundary>
        <Bomb shouldThrow={true} />
      </AppErrorBoundary>,
    );

    expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeInTheDocument();
    expect(screen.getByText("kaboom")).toBeInTheDocument();
    expect(Sentry.captureException).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        extra: expect.objectContaining({ componentStack: expect.any(String) }),
      }),
    );
  });

  it("recovers when Try again is clicked", async () => {
    // Retry only clears the boundary's own state; the parent still has to stop
    // passing a throwing child, the same way a real app would after a retry.
    const { rerender } = render(
      <AppErrorBoundary>
        <Bomb shouldThrow={true} />
      </AppErrorBoundary>,
    );
    expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeInTheDocument();

    rerender(
      <AppErrorBoundary>
        <Bomb shouldThrow={false} />
      </AppErrorBoundary>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(screen.getByText("safe content")).toBeInTheDocument();
  });

  it("copies error details to the clipboard when Report is clicked", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <AppErrorBoundary>
        <Bomb shouldThrow={true} />
      </AppErrorBoundary>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Report" }));

    expect(writeText).toHaveBeenCalledWith("Error: kaboom");
  });
});
