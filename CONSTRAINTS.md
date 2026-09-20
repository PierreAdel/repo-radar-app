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

| Dimension                | Rule                                                                                                     | Checked by                                          | Runs at                   | Status                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------- |
| Types                    | Zero type errors                                                                                         | `tsc --noEmit -p tsconfig.json`                     | every edit, CI            | ✅ enforced                                                                             |
| Lint                     | Zero errors from our config                                                                              | `eslint .`                                          | every edit, CI            | ✅ enforced                                                                             |
| Coverage (changed lines) | ≥ 80% of changed lines covered                                                                           | `vitest run --coverage` (per workspace) + diff      | task end                  | ⚠️ warn-only until 2026-10-04, then blocks                                              |
| Unit + integration       | New/changed logic has a corresponding test                                                               | `pnpm test` (vitest, per workspace)                 | task end, CI              | ⚠️ warn-only until 2026-10-04                                                           |
| Snapshot                 | UI components with nontrivial render output have a snapshot test                                         | `vitest` built-in `toMatchSnapshot()`               | task end                  | ⚠️ warn-only, opt-in per component                                                      |
| E2E                      | Critical user flows (search, track repo, sort/filter) pass in a real browser                             | `playwright test`                                   | CI                        | 🔲 not installed — see task plan                                                        |
| Accessibility            | Zero critical or serious axe violations on key pages                                                     | `@axe-core/playwright` assertions inside e2e specs  | CI                        | 🔲 not installed — see task plan (static `eslint-plugin-jsx-a11y` already active today) |
| Performance (page)       | LCP ≤ 2500ms, CLS ≤ 0.1                                                                                  | `lighthouse $PREVIEW_URL --output=json`             | preview deploy (CI)       | 🔲 not installed — needs a running preview URL                                          |
| Stress / load (API)      | `api/github/search`, `api/github/repo` hold up under sustained concurrent load without error-rate spikes | `k6 run` against a deployed preview                 | CI (manual trigger first) | 🔲 not installed — see task plan                                                        |
| Large-data rendering     | Repo list/grid stays responsive and virtualized with 1000+ tracked repos                                 | Playwright test with a seeded large fixture dataset | CI                        | 🔲 not installed — see task plan                                                        |

Every row names the command that produces the verdict. A 🔲 row is an aspiration until
its install task lands — tracked as the first slice of the test-infrastructure plan, not
left indefinitely as a number with no mechanism.

## Measured, not yet enforced (baseline, 2026-09-20)

| Workspace       | Lines covered                                                     | Direction     |
| --------------- | ----------------------------------------------------------------- | ------------- |
| `api/`          | 91.5% (43/47)                                                     | must not fall |
| `packages/core` | 92.6% (75/81)                                                     | must not fall |
| `packages/ui`   | 80.4% (41/51)                                                     | must not fall |
| `apps/web`      | 40.6% (103/254) — infra just stood up (Task 1), single smoke test | must not fall |

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
