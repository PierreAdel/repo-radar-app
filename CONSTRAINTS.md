# Constraints

Last reviewed: 2026-09-20 by @PierreAdel

## Floor (always enforced, no setup required)

- No new suppression comments: `@ts-ignore`, `eslint-disable`
- No unimplemented stubs: `throw new Error("Not implemented")`, empty `catch {}`
- No skipped or deleted tests without a reason in the commit message
- No secrets in source
- This file does not get weakened to make a change pass

Enforcement today is written-only (agents read this file and comply). No automated
floor-guard script yet — first candidate task in the test-infrastructure plan.

## Enforced with numbers

| Dimension                | Rule                                                                                                                                                                                      | Checked by                                          | Runs at                  | Status                                                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Types                    | Zero type errors                                                                                                                                                                          | `tsc --noEmit -p tsconfig.json`                     | every edit, CI           | ✅ enforced                                                                                                              |
| Lint                     | Zero errors from our config                                                                                                                                                               | `eslint .`                                          | every edit, CI           | ✅ enforced                                                                                                              |
| Coverage (changed lines) | ≥ 80% of changed lines covered                                                                                                                                                            | `vitest run --coverage` (per workspace) + diff      | task end                 | ⚠️ warn-only until 2026-10-04, then blocks                                                                               |
| Unit + integration       | New/changed logic has a corresponding test                                                                                                                                                | `pnpm test` (vitest, per workspace)                 | task end, CI             | ⚠️ warn-only until 2026-10-04                                                                                            |
| Snapshot                 | UI components with nontrivial render output have a snapshot test                                                                                                                          | `vitest` built-in `toMatchSnapshot()`               | task end                 | ⚠️ warn-only, opt-in per component                                                                                       |
| E2E                      | Critical user flows (search, track repo, sort/filter) pass in a real browser                                                                                                              | `playwright test`                                   | CI                       | ✅ enforced — 7 specs passing                                                                                            |
| Accessibility            | Zero critical or serious axe violations on key pages                                                                                                                                      | `@axe-core/playwright` assertions inside e2e specs  | CI                       | ✅ enforced — same job as E2E                                                                                            |
| Performance (page)       | LCP ≤ 2500ms, CLS ≤ 0.1                                                                                                                                                                   | `lighthouse $PREVIEW_URL --output=json`             | preview deploy (CI)      | ✅ enforced (blocking) — currently failing: real preview measures 3600ms LCP                                             |
| Stress / load            | GitHub's search and repo-lookup APIs hold up under sustained concurrent load without error-rate spikes, using a dedicated testing token isolated from the app's production `GITHUB_TOKEN` | `k6 run` directly against `api.github.com`          | CI (manual trigger only) | ✅ installed — `stress-test.yml`, `workflow_dispatch` only, `TESTING_GITHUB_TOKEN` from the `Preview` GitHub Environment |
| Large-data rendering     | Repo list/grid stays responsive and virtualized with 1000+ tracked repos                                                                                                                  | Playwright test with a seeded large fixture dataset | CI                       | ✅ installed and passing (`e2e/large-data.spec.ts`)                                                                      |

Every row names the command that produces the verdict. A 🔲 row is an aspiration until
its install task lands — tracked as the first slice of the test-infrastructure plan, not
left indefinitely as a number with no mechanism.

**Stress/load scope note (2026-09-20):** originally scoped as load-testing
`api/github/search` and `api/github/repo` (our own Vercel Functions). Changed
to hit `api.github.com` directly instead, authenticated with a token isolated
from production's — running it through our proxy would've shared the real
app's rate-limit budget with actual users on every run. Our proxy's own
correctness (request shaping, error mapping) is still covered by
`api/github/*.test.ts`; this dimension now specifically validates GitHub's
API holding up under concurrent access, which is the part our thin proxy
can't insulate the app from anyway.

## Measured, not yet enforced (baseline, 2026-09-20)

| Workspace       | Lines covered   | Direction     |
| --------------- | --------------- | ------------- |
| `api/`          | 91.5% (43/47)   | must not fall |
| `packages/core` | 92.6% (75/81)   | must not fall |
| `packages/ui`   | 80.4% (41/51)   | must not fall |
| `apps/web`      | 89.4% (227/254) | must not fall |

Ratchet tolerance: 0.5% (absorbs drift when an unrelated file moves the number).

## Exceptions

| ID  | Rule                            | Path                                                       | Reason                                                                                                                                  | Owner       | Expires    |
| --- | ------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------- |
| T1  | Coverage of changed lines ≥ 80% | `apps/web/src/main.tsx`, `apps/web/src/instrumentation.ts` | Thin bootstrap (ReactDOM.render, Sentry.init) — low-value to unit-test, verified instead by the e2e smoke spec actually loading the app | @PierreAdel | 2026-12-19 |

## Notes on scope

This bar covers testing only (coverage, unit/integration/e2e/snapshot, stress/perf,
accessibility), per an explicit decision on 2026-09-20 to keep security scanning and
architecture-boundary rules out of this pass. `security-and-hardening` remains the
place to revisit that separately.
