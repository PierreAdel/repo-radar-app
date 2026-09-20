import { expect, test } from "@playwright/test";
import { assertNoA11yViolations } from "./assertNoA11yViolations";
import { mockGithubApi } from "./mockGithubApi";

const REACT = { id: 1, fullName: "facebook/react", stargazersCount: 200000 };

test("tracking a repo from search results, then untracking it", async ({ page }) => {
  await mockGithubApi(page, { searchResults: [REACT], repos: { "facebook/react": REACT } });
  await page.goto("/");

  await page.getByPlaceholder(/search github repositories/i).fill("react");
  await page.waitForURL(/\/search\?/);
  await expect(page.getByText("facebook/react")).toBeVisible();

  await page.getByRole("button", { name: /^track$/i }).click();

  await page.getByPlaceholder(/search github repositories/i).fill("");
  await page.waitForURL("/");
  await expect(page.getByText("No tracked repositories yet")).toHaveCount(0);
  await expect(page.getByText("facebook/react")).toBeVisible();
  await assertNoA11yViolations(page);

  await page.getByRole("button", { name: /^untrack$/i }).click();
  await expect(page.getByText("No tracked repositories yet")).toBeVisible();
});

test("a tracked repo survives a reload", async ({ page }) => {
  await mockGithubApi(page, { searchResults: [REACT], repos: { "facebook/react": REACT } });
  await page.goto("/");

  await page.getByPlaceholder(/search github repositories/i).fill("react");
  await page.waitForURL(/\/search\?/);
  await page.getByRole("button", { name: /^track$/i }).click();

  await page.reload();

  await expect(page.getByText("facebook/react")).toBeVisible();
});
