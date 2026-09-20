import { describe, expect, it, vi } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";

vi.mock("./sentry", () => ({
  Sentry: {
    captureException: vi.fn(),
    flush: vi.fn().mockResolvedValue(undefined),
  },
}));

const { Sentry } = await import("./sentry");
const { withErrorReporting } = await import("./withErrorReporting");

function mockResponse() {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res as unknown as VercelResponse;
}

describe("withErrorReporting", () => {
  it("runs the handler and flushes Sentry on success, without reporting an error", async () => {
    const handler = vi.fn().mockResolvedValue(undefined);
    const wrapped = withErrorReporting("boom", handler);
    const res = mockResponse();

    await wrapped({} as VercelRequest, res);

    expect(handler).toHaveBeenCalledOnce();
    expect(Sentry.flush).toHaveBeenCalledWith(2000);
    expect(Sentry.captureException).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("reports and swallows a thrown error, responding with a generic 500", async () => {
    const error = new Error("upstream exploded");
    const handler = vi.fn().mockRejectedValue(error);
    const wrapped = withErrorReporting("Unexpected error fetching repository.", handler);
    const res = mockResponse();

    await wrapped({} as VercelRequest, res);

    expect(Sentry.captureException).toHaveBeenCalledWith(error);
    expect(Sentry.flush).toHaveBeenCalledWith(2000);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Unexpected error fetching repository.",
    });
  });
});
