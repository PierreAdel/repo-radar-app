import { describe, expect, it, vi } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const searchRepositoriesMock = vi.hoisted(() => vi.fn());
vi.mock("../_lib/githubProxy", () => ({ searchRepositories: searchRepositoriesMock }));

const { default: handler } = await import("./search.js");

function mockRequest(query: Record<string, unknown>) {
  return { query } as unknown as VercelRequest;
}

function mockResponse() {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res as unknown as VercelResponse;
}

describe("api/github/search", () => {
  it("defaults q to empty string and page to 1 when omitted", async () => {
    searchRepositoriesMock.mockResolvedValueOnce({
      status: 200,
      body: { items: [], totalCount: 0 },
    });
    const res = mockResponse();

    await handler(mockRequest({}), res);

    expect(searchRepositoriesMock).toHaveBeenCalledWith("", 1, process.env.GITHUB_TOKEN);
  });

  it("passes q and a parsed page through to the proxy", async () => {
    searchRepositoriesMock.mockResolvedValueOnce({
      status: 200,
      body: { items: [], totalCount: 0 },
    });
    const res = mockResponse();

    await handler(mockRequest({ q: "react hooks", page: "3" }), res);

    expect(searchRepositoriesMock).toHaveBeenCalledWith("react hooks", 3, process.env.GITHUB_TOKEN);
  });

  it("falls back to page 1 when page is not a valid number", async () => {
    searchRepositoriesMock.mockResolvedValueOnce({
      status: 200,
      body: { items: [], totalCount: 0 },
    });
    const res = mockResponse();

    await handler(mockRequest({ q: "react", page: "not-a-number" }), res);

    expect(searchRepositoriesMock).toHaveBeenCalledWith("react", 1, process.env.GITHUB_TOKEN);
  });

  it("forwards the proxy's status/body unchanged", async () => {
    searchRepositoriesMock.mockResolvedValueOnce({
      status: 502,
      body: { status: 502, message: "GitHub is unavailable." },
    });
    const res = mockResponse();

    await handler(mockRequest({ q: "react" }), res);

    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.json).toHaveBeenCalledWith({ status: 502, message: "GitHub is unavailable." });
  });
});
