import { expect, test } from "@playwright/test";
import { assertNoA11yViolations } from "./assertNoA11yViolations";
import { mockGithubApi } from "./mockGithubApi";

const REPO_COUNT = 1200;
const TRACKED_REPOS_STORAGE_KEY = "repo-radar/tracked-repos";

function seedFullNames(count: number) {
  return Array.from({ length: count }, (_, i) => `owner-${i}/repo-${i}`);
}

test("1000+ tracked repos stay virtualized and the page stays responsive", async ({ page }) => {
  const fullNames = seedFullNames(REPO_COUNT);
  const repos = Object.fromEntries(
    fullNames.map((fullName, i) => [fullName, { id: i, fullName, stargazersCount: i }]),
  );
  await mockGithubApi(page, { repos });

  // Seed localStorage before any app code runs, the same way a returning
  // user with a long tracked-repos history would load the page.
  await page.addInitScript(
    ([key, value]) => {
      window.localStorage.setItem(key, value);
    },
    [TRACKED_REPOS_STORAGE_KEY, JSON.stringify(fullNames)],
  );

  await page.goto("/");

  const list = page.getByRole("list").first();
  await expect(list).toBeVisible();

  // The virtualizer should only ever mount a viewport's worth of rows, not
  // all 1200 - this is the actual "stays responsive" claim being tested.
  // Scoped to the tracked-repos list specifically: MUI's chart component
  // elsewhere on the page also uses `data-index`, so an unscoped selector
  // could match the wrong thing.
  const mountedCards = list.locator("[data-index]");
  await expect(mountedCards.first()).toBeVisible();
  const mountedCount = await mountedCards.count();
  expect(mountedCount).toBeGreaterThan(0);
  expect(mountedCount).toBeLessThan(50);

  // Scrolling further down should mount different rows further down the
  // list, proving the virtualizer is actually windowing, not just rendering
  // the first N and stopping.
  const firstIndexBeforeScroll = await mountedCards.first().getAttribute("data-index");
  await page.evaluate(() => {
    const listEl = document.querySelector('[role="list"]');
    const scrollEl = listEl?.parentElement;
    scrollEl?.scrollTo({ top: 5000 });
  });
  await expect
    .poll(async () => mountedCards.first().getAttribute("data-index"))
    .not.toBe(firstIndexBeforeScroll);

  await assertNoA11yViolations(page);
});
