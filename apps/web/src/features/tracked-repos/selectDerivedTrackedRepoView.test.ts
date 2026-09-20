import { describe, expect, it } from "vitest";
import type { GithubRepo } from "@repo-radar/core";
import { selectDerivedTrackedRepoView } from "./selectDerivedTrackedRepoView";

type CacheEntries = Parameters<typeof selectDerivedTrackedRepoView>[0];

function repo(fullName: string, overrides: Partial<GithubRepo> = {}): GithubRepo {
  return {
    id: fullName.length,
    fullName,
    htmlUrl: `https://github.com/${fullName}`,
    description: null,
    stargazersCount: 0,
    openIssuesCount: 0,
    pushedAt: "2024-01-01T00:00:00.000Z",
    ownerLogin: fullName.split("/")[0] ?? fullName,
    ownerAvatarUrl: "https://avatars/x",
    ...overrides,
  };
}

function entries(repos: GithubRepo[]): CacheEntries {
  return repos.map((data) => ({ fullName: data.fullName, data })) as CacheEntries;
}

describe("selectDerivedTrackedRepoView", () => {
  it("builds an entryByFullName lookup and the max star bound", () => {
    const result = selectDerivedTrackedRepoView(
      entries([repo("a/low", { stargazersCount: 5 }), repo("b/high", { stargazersCount: 500 })]),
      ["a/low", "b/high"],
      null,
      null,
      "stars",
    );

    expect(result.entryByFullName.get("b/high")?.data?.stargazersCount).toBe(500);
    expect(result.maxStarBound).toBe(500);
  });

  it("sorts by stars descending by default", () => {
    const result = selectDerivedTrackedRepoView(
      entries([repo("a/low", { stargazersCount: 5 }), repo("b/high", { stargazersCount: 500 })]),
      ["a/low", "b/high"],
      null,
      null,
      "stars",
    );

    expect(result.sortedFullNames).toEqual(["b/high", "a/low"]);
  });

  it("sorts alphabetically by name", () => {
    const result = selectDerivedTrackedRepoView(
      entries([repo("z/last"), repo("a/first")]),
      ["z/last", "a/first"],
      null,
      null,
      "name",
    );

    expect(result.sortedFullNames).toEqual(["a/first", "z/last"]);
  });

  it("sorts by last commit, most recent first", () => {
    const result = selectDerivedTrackedRepoView(
      entries([
        repo("old/repo", { pushedAt: "2020-01-01T00:00:00.000Z" }),
        repo("new/repo", { pushedAt: "2024-01-01T00:00:00.000Z" }),
      ]),
      ["old/repo", "new/repo"],
      null,
      null,
      "lastCommit",
    );

    expect(result.sortedFullNames).toEqual(["new/repo", "old/repo"]);
  });

  it("filters out repos below minStars", () => {
    const result = selectDerivedTrackedRepoView(
      entries([repo("a/low", { stargazersCount: 5 }), repo("b/high", { stargazersCount: 500 })]),
      ["a/low", "b/high"],
      "100",
      null,
      "stars",
    );

    expect(result.sortedFullNames).toEqual(["b/high"]);
  });

  it("filters out repos above maxStars", () => {
    const result = selectDerivedTrackedRepoView(
      entries([repo("a/low", { stargazersCount: 5 }), repo("b/high", { stargazersCount: 500 })]),
      ["a/low", "b/high"],
      null,
      "100",
      "stars",
    );

    expect(result.sortedFullNames).toEqual(["a/low"]);
  });

  it("keeps a tracked repo whose data hasn't loaded yet, regardless of filters", () => {
    const pending = [{ fullName: "pending/repo", data: undefined }] as CacheEntries;

    const result = selectDerivedTrackedRepoView(pending, ["pending/repo"], "100", null, "stars");

    expect(result.sortedFullNames).toEqual(["pending/repo"]);
  });

  it("memoizes: the same primitive args return the same result reference", () => {
    const trackedEntries = entries([repo("a/b")]);
    const trackedFullNames = ["a/b"];

    const first = selectDerivedTrackedRepoView(
      trackedEntries,
      trackedFullNames,
      null,
      null,
      "stars",
    );
    const second = selectDerivedTrackedRepoView(
      trackedEntries,
      trackedFullNames,
      null,
      null,
      "stars",
    );

    expect(first).toBe(second);
  });
});
