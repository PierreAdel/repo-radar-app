import { describe, expect, it } from "vitest";
import type { GithubRepo } from "../types/repo.js";
import { mergeSearchResults } from "./mergeSearchResults.js";

function makeRepo(id: number, fullName = `owner/repo-${id}`): GithubRepo {
  return {
    id,
    fullName,
    htmlUrl: `https://github.com/${fullName}`,
    description: null,
    stargazersCount: 0,
    openIssuesCount: 0,
    pushedAt: "2024-01-01T00:00:00Z",
    ownerLogin: "owner",
    ownerAvatarUrl: "https://example.com/avatar.png",
  };
}

describe("mergeSearchResults", () => {
  it("appends new items to the existing cache", () => {
    const cache = [makeRepo(1), makeRepo(2)];
    const incoming = { items: [makeRepo(3)], totalCount: 3 };

    expect(mergeSearchResults(cache, incoming).map((item) => item.id)).toEqual([1, 2, 3]);
  });

  it("de-duplicates items that appear on more than one page", () => {
    // GitHub's search ranking can shift between calls, so id 2 legitimately
    // reappears on the "next" page.
    const cache = [makeRepo(1), makeRepo(2)];
    const incoming = { items: [makeRepo(2), makeRepo(3)], totalCount: 3 };

    expect(mergeSearchResults(cache, incoming).map((item) => item.id)).toEqual([1, 2, 3]);
  });

  it("does not reorder existing entries", () => {
    const cache = [makeRepo(5), makeRepo(1), makeRepo(9)];
    const incoming = { items: [makeRepo(2)], totalCount: 4 };

    expect(mergeSearchResults(cache, incoming).map((item) => item.id)).toEqual([5, 1, 9, 2]);
  });
});
