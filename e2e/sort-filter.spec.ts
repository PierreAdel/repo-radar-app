import { expect, test } from "@playwright/test";
import { assertNoA11yViolations } from "./assertNoA11yViolations";
import { mockGithubApi } from "./mockGithubApi";

const REPOS = [
  { id: 1, fullName: "a-owner/alpha", stargazersCount: 10 },
  { id: 2, fullName: "z-owner/zeta", stargazersCount: 1000 },
];

test("sorting tracked repos by name reorders the list", async ({ page }) => {
  await mockGithubApi(page, {
    searchResults: REPOS,
    repos: Object.fromEntries(REPOS.map((r) => [r.fullName, r])),
  });
  await page.goto("/");

  await page.getByPlaceholder(/search github repositories/i).fill("owner");
  await page.waitForURL(/\/search\?/);
  for (const repo of REPOS) {
    const [, name] = repo.fullName.split("/");
    await page
      .locator("li", { hasText: name! })
      .getByRole("button", { name: /^track$/i })
      .click();
  }
  await page.getByPlaceholder(/search github repositories/i).fill("");
  await page.waitForURL("/");

  // Default sort is by stars descending — zeta (1000) should lead alpha (10).
  const cardsByStars = page.getByRole("listitem");
  await expect(cardsByStars.first()).toContainText("zeta");

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Sort by name" }).click();

  const cardsByName = page.getByRole("listitem");
  await expect(cardsByName.first()).toContainText("alpha");

  await assertNoA11yViolations(page);
});
