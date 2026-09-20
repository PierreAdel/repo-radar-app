import type { Page } from "@playwright/test";

export interface MockRepo {
  id: number;
  fullName: string;
  htmlUrl?: string;
  description?: string;
  stargazersCount?: number;
  openIssuesCount?: number;
  pushedAt?: string;
  ownerLogin?: string;
  ownerAvatarUrl?: string;
}

function toRepoResponse(repo: MockRepo) {
  return {
    id: repo.id,
    fullName: repo.fullName,
    htmlUrl: repo.htmlUrl ?? `https://github.com/${repo.fullName}`,
    description: repo.description ?? "",
    stargazersCount: repo.stargazersCount ?? 0,
    openIssuesCount: repo.openIssuesCount ?? 0,
    pushedAt: repo.pushedAt ?? new Date().toISOString(),
    ownerLogin: repo.ownerLogin ?? repo.fullName.split("/")[0],
    ownerAvatarUrl: repo.ownerAvatarUrl ?? "https://avatars.githubusercontent.com/u/1",
  };
}

// Stubs the two Vercel Functions apps/web's dev server proxies to
// api.github.com, so e2e specs never depend on the real GitHub API (rate
// limits, network flakiness, needing a token).
export async function mockGithubApi(
  page: Page,
  options: { searchResults?: MockRepo[]; repos?: Record<string, MockRepo> } = {},
) {
  const items = (options.searchResults ?? []).map(toRepoResponse);

  await page.route("**/api/github/search**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ items, totalCount: items.length }),
    });
  });

  await page.route("**/api/github/repo**", async (route) => {
    const url = new URL(route.request().url());
    const fullName = url.searchParams.get("fullName") ?? "";
    const repo = options.repos?.[fullName];
    if (!repo) {
      await route.fulfill({
        status: 404,
        contentType: "application/json",
        body: JSON.stringify({ status: 404, message: "Repository not found." }),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(toRepoResponse(repo)),
    });
  });
}
