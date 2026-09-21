import { describe, expect, it, vi } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const getRepositoryMock = vi.hoisted(() => vi.fn());
vi.mock("../_lib/githubProxy", () => ({ getRepository: getRepositoryMock }));

const { default: handler } = await import("./repo.js");

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

describe("api/github/repo", () => {
  it("400s when fullName is missing", async () => {
    const res = mockResponse();
    await handler(mockRequest({}), res);

    expect(getRepositoryMock).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: "Missing fullName query param.",
    });
  });

  it("400s when fullName is not a valid owner/repo pair", async () => {
    const res = mockResponse();

    await handler(mockRequest({ fullName: "../rate_limit" }), res);

    expect(getRepositoryMock).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: "Invalid fullName query param.",
    });
  });

  it("passes fullName and the GitHub token through, forwarding the proxy's status/body", async () => {
    getRepositoryMock.mockResolvedValueOnce({
      status: 200,
      body: { id: 1, fullName: "facebook/react" },
    });
    const res = mockResponse();

    await handler(mockRequest({ fullName: "facebook/react" }), res);

    expect(getRepositoryMock).toHaveBeenCalledWith("facebook/react", process.env.GITHUB_TOKEN);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, fullName: "facebook/react" });
  });

  it("forwards an upstream error status/body unchanged", async () => {
    getRepositoryMock.mockResolvedValueOnce({
      status: 404,
      body: { status: 404, message: "Repository not found." },
    });
    const res = mockResponse();

    await handler(mockRequest({ fullName: "nope/nope" }), res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: 404, message: "Repository not found." });
  });
});
