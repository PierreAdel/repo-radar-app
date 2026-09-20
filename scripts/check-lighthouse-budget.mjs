#!/usr/bin/env node
// Runs Lighthouse against a URL and gates on the two budgets CONSTRAINTS.md
// sets: LCP <= 2500ms, CLS <= 0.1. Usage: node scripts/check-lighthouse-budget.mjs <url>

import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
import lighthouse from "lighthouse";

const LCP_BUDGET_MS = 2500;
const CLS_BUDGET = 0.1;

const url = process.argv[2];
if (!url) {
  console.error("Usage: node scripts/check-lighthouse-budget.mjs <url>");
  process.exit(1);
}

// Resolving these through @playwright/test's and lighthouse's own module
// contexts (rather than a direct require) keeps this independent of pnpm's
// exact store layout, since neither is a direct dependency here.
const require = createRequire(import.meta.url);
const { chromium } = createRequire(require.resolve("@playwright/test"))("playwright-core");
const chromeLauncher = createRequire(require.resolve("lighthouse"))("chrome-launcher");

const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
});

try {
  const runnerResult = await lighthouse(
    url,
    { port: chrome.port, output: "json", logLevel: "error" },
    undefined,
  );

  await writeFile("lighthouse-report.json", runnerResult.report);

  const { audits } = runnerResult.lhr;
  const lcp = audits["largest-contentful-paint"].numericValue;
  const cls = audits["cumulative-layout-shift"].numericValue;

  console.log(`LCP: ${Math.round(lcp)}ms (budget: ${LCP_BUDGET_MS}ms)`);
  console.log(`CLS: ${cls.toFixed(3)} (budget: ${CLS_BUDGET})`);

  const failures = [];
  if (lcp > LCP_BUDGET_MS) failures.push(`LCP ${Math.round(lcp)}ms exceeds ${LCP_BUDGET_MS}ms`);
  if (cls > CLS_BUDGET) failures.push(`CLS ${cls.toFixed(3)} exceeds ${CLS_BUDGET}`);

  if (failures.length > 0) {
    console.error("Lighthouse budget exceeded:\n" + failures.map((f) => `  - ${f}`).join("\n"));
    process.exitCode = 1;
  }
} finally {
  await chrome.kill();
}
