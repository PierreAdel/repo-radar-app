import { afterEach, describe, expect, it, vi } from "vitest";
import { getRepository, searchRepositories } from "./githubProxy";

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe("githubProxy", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("short-circuits an empty search query without calling fetch", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await searchRepositories("   ", 1);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result).toEqual({ ok: true, status: 200, body: { items: [], totalCount: 0 } });
  });

  it("maps a successful search response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse(200, {
          total_count: 1,
          items: [
            {
              id: 1,
              full_name: "facebook/react",
              html_url: "https://github.com/facebook/react",
              description: "A UI library",
              stargazers_count: 100,
              open_issues_count: 5,
              pushed_at: "2026-01-01T00:00:00Z",
              owner: { login: "facebook", avatar_url: "https://avatars/facebook" },
            },
          ],
        }),
      ),
    );

    const result = await searchRepositories("react", 1);

    expect(result).toEqual({
      ok: true,
      status: 200,
      body: {
        totalCount: 1,
        items: [
          {
            id: 1,
            fullName: "facebook/react",
            htmlUrl: "https://github.com/facebook/react",
            description: "A UI library",
            stargazersCount: 100,
            openIssuesCount: 5,
            pushedAt: "2026-01-01T00:00:00Z",
            ownerLogin: "facebook",
            ownerAvatarUrl: "https://avatars/facebook",
          },
        ],
      },
    });
  });

  it("normalizes a 404 from getRepository", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(404, { message: "Not Found" })));

    const result = await getRepository("owner/missing");

    expect(result).toEqual({ ok: false, status: 404, body: { status: 404, message: "Repository not found." } });
  });

  it("normalizes a 403 rate-limit error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(403, { message: "API rate limit exceeded for you." })),
    );

    const result = await getRepository("owner/repo");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(403);
      expect(result.body.message).toMatch(/rate limit/i);
    }
  });
});
