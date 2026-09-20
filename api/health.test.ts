import { describe, expect, it, vi } from "vitest";
import handler from "./health";

function mockResponse() {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res as unknown as import("@vercel/node").VercelResponse;
}

describe("api/health", () => {
  it("returns 200 ok without calling any external service", () => {
    const res = mockResponse();
    handler({} as import("@vercel/node").VercelRequest, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: "ok" });
  });
});
