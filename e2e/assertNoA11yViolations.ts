import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

// Per CONSTRAINTS.md: zero critical or serious axe violations. Moderate/minor
// are often debatable calls and left out of the gate.
export async function assertNoA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  const blocking = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );

  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
}
