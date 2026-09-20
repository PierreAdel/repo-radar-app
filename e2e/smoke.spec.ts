import { expect, test } from "@playwright/test";
import { mockGithubApi } from "./mockGithubApi";

test("the app loads and shows the dashboard", async ({ page }) => {
  await mockGithubApi(page);
  await page.goto("/");

  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("button", { name: /repo radar.*go to dashboard/i })).toBeVisible();
});
