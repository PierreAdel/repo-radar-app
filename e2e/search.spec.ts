import { expect, test } from "@playwright/test";
import { assertNoA11yViolations } from "./assertNoA11yViolations";
import { mockGithubApi } from "./mockGithubApi";

test("searching for a repo shows results", async ({ page }) => {
  await mockGithubApi(page, {
    searchResults: [
      { id: 1, fullName: "facebook/react", stargazersCount: 200000 },
      { id: 2, fullName: "facebook/relay", stargazersCount: 18000 },
    ],
  });
  await page.goto("/");

  await page.getByPlaceholder(/search github repositories/i).fill("facebook");
  await page.waitForURL(/\/search\?/);

  await expect(page.getByText("facebook/react")).toBeVisible();
  await expect(page.getByText("facebook/relay")).toBeVisible();

  await assertNoA11yViolations(page);
});

test("searching with no matches shows a not-found message", async ({ page }) => {
  await mockGithubApi(page, { searchResults: [] });
  await page.goto("/");

  await page.getByPlaceholder(/search github repositories/i).fill("nonexistent-repo-xyz");
  await page.waitForURL(/\/search\?/);

  await expect(page.getByRole("status")).toContainText(/no repositories found/i);
});
