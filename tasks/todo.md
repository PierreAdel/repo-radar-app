# Todo: Testing Quality Bar

See `tasks/plan.md` for architecture decisions, risks, and open questions.
Verification commands assume you're at the repo root unless a workspace is named.

---

## Phase 0: Foundations

### Task 1: apps/web test infrastructure

**Description:** apps/web has no vitest config, no testing-library deps, and no
test script at all — it's invisible to `turbo run test`. Bring it in line with
packages/core and packages/ui.

**Acceptance criteria:**

- [x] `apps/web/vitest.config.ts` exists (jsdom env, globals, setupFiles, coverage block matching the other two workspaces)
- [x] `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` added to `apps/web/package.json` devDependencies
- [x] `apps/web/package.json` has `"test": "vitest run"` and `"test:coverage": "vitest run --coverage"`
- [x] One trivial smoke test (`App.test.tsx` asserting it renders without throwing) proves the setup works

**Verification:**

- [x] `pnpm --filter web test:coverage` runs and reports a real (non-zero) number — 40.55% lines
- [x] `turbo run test` now includes apps/web

**Note:** package name is `"web"`, not `"@repo-radar/web"` — corrected the filter used above and in downstream tasks.

**Dependencies:** None

**Files likely touched:** `apps/web/vitest.config.ts`, `apps/web/vitest.setup.ts`, `apps/web/package.json`, `apps/web/src/App.test.tsx`

**Estimated scope:** Small

---

### Task 2: packages/core remaining unit coverage

**Description:** Cover the two untested files with real logic: `githubApi.ts`
(fetch wrapper) and `persistenceMiddleware.ts` (Redux middleware). `index.ts`
(barrel) and `types/repo.ts` (types-only) are excluded — no runtime behavior to test.

**Acceptance criteria:**

- [x] `githubApi.ts` has tests covering success and error-response paths
- [x] `persistenceMiddleware.ts` has a test proving it persists on the actions it's meant to react to, and does nothing on others

**Verification:**

- [x] `pnpm --filter @repo-radar/core test:coverage` — 92.6% lines (was 70.4%)

**Note:** jsdom implements neither `fetch` nor `Request` — Node's native `Request`
backs `fetchBaseQuery` in tests and requires an absolute URL (no document to
resolve a relative one against), so `githubApi.test.ts` stubs `globalThis.Request`
with a permissive stand-in via `vi.hoisted` (must run before the module import,
since `fetchBaseQuery({...})` captures its config at that module's load time).
Worth remembering for any other RTK Query endpoint tests later in this plan.

**Dependencies:** None

**Files likely touched:** `packages/core/src/api/githubApi.test.ts`, `packages/core/src/store/persistenceMiddleware.test.ts`

**Estimated scope:** Small

---

### Task 3: packages/ui remaining unit coverage + snapshots

**Description:** Cover `EmptyState.tsx`, `ErrorFallback.tsx`, `theme/createAppTheme.ts`.
`index.ts` (barrel) excluded.

**Acceptance criteria:**

- [x] `EmptyState.tsx` and `ErrorFallback.tsx` each have a render test plus a `toMatchSnapshot()` assertion
- [x] `createAppTheme.ts` has a test asserting key theme tokens (palette mode, at minimum) come out as expected

**Verification:**

- [x] `pnpm --filter @repo-radar/ui test:coverage` — 80.4% lines (was 68.6%), 25 tests passing

**Dependencies:** None

**Files likely touched:** `packages/ui/src/EmptyState.test.tsx`, `packages/ui/src/ErrorFallback.test.tsx`, `packages/ui/src/theme/createAppTheme.test.ts`

**Estimated scope:** Small

---

### Task 4: api remaining unit coverage

**Description:** Cover `sentry.ts`, `github/repo.ts`, `github/search.ts`. Bump
`withErrorReporting.ts` past its current 50% while touching this area.

**Acceptance criteria:**

- [x] `github/repo.ts` and `github/search.ts` handlers tested for success + upstream-error + validation-error paths
- [x] `sentry.ts` init/wrapper tested (mock the Sentry SDK, don't hit the network)
- [x] `withErrorReporting.ts`'s uncovered branch (lines 15–18 per baseline) addressed

**Verification:**

- [x] `pnpm test:api` (root) — 91.5% lines (was 61.7%), 16 tests passing across 6 files

**Dependencies:** None

**Files likely touched:** `api/_lib/sentry.test.ts`, `api/github/repo.test.ts`, `api/github/search.test.ts`, `api/_lib/withErrorReporting.test.ts`

**Estimated scope:** Medium

---

## Checkpoint: Foundations

- [x] `pnpm test:coverage` runs clean across all 4 workspaces
- [x] No workspace's coverage has dropped below its CONSTRAINTS.md baseline — all 4 rose instead (api 61.7→91.5%, core 70.4→92.6%, ui 68.6→80.4%, web 0→40.6%)
- [x] `pnpm typecheck` and `pnpm lint` clean workspace-wide
- [ ] Review with human before proceeding to Phase 1

**Incidental fixes found while verifying:** `check:fast` only ran the root
`tsconfig.json` (covers `api/` only) — silently skipped typecheck for
apps/web/packages/core/ui. Changed it to `pnpm typecheck` (which already runs
`turbo run typecheck` + the root config). Also `apps/web/tsconfig.json` was
missing `vitest.setup.ts` from its `include`, so `@testing-library/jest-dom`'s
matcher types (`toBeInTheDocument`, etc.) weren't visible to `tsc` — added it,
matching the pattern already used in packages/core and packages/ui.

---

## Phase 1: apps/web unit coverage

### Task 5: app shell — store, hooks, error boundary

**Acceptance criteria:**

- [ ] `store.ts` tested (reducer wiring, middleware attached)
- [ ] `hooks.ts` tested (typed hooks return what's expected from a mock store)
- [ ] `AppErrorBoundary.tsx` tested (renders children normally; renders fallback on a thrown error)

**Verification:** `pnpm --filter @repo-radar/web test:coverage`

**Dependencies:** Task 1

**Files likely touched:** `apps/web/src/app/store.test.ts`, `apps/web/src/app/hooks.test.ts`, `apps/web/src/app/AppErrorBoundary.test.tsx`

**Estimated scope:** Medium

---

### Task 6: App, Header, ThemedApp (+ snapshots)

**Acceptance criteria:**

- [ ] Each renders without throwing given a mock store/theme
- [ ] Each has a `toMatchSnapshot()` assertion

**Verification:** `pnpm --filter @repo-radar/web test:coverage`

**Dependencies:** Task 1, Task 5 (for store mocking pattern)

**Files likely touched:** `apps/web/src/App.test.tsx`, `apps/web/src/Header.test.tsx`, `apps/web/src/app/ThemedApp.test.tsx`

**Estimated scope:** Medium

---

### Task 7: search feature hooks

**Acceptance criteria:**

- [ ] `useSearchBox.ts` tested (input state, debounce interaction)
- [ ] `useRepoSearch.ts` tested (loading/success/error states against a mocked `githubApi`)

**Verification:** `pnpm --filter @repo-radar/web test:coverage`

**Dependencies:** Task 1

**Files likely touched:** `apps/web/src/features/search/useSearchBox.test.ts`, `apps/web/src/features/search/useRepoSearch.test.ts`

**Estimated scope:** Medium

---

### Task 8: search feature components (+ snapshots)

**Acceptance criteria:**

- [ ] `SearchBar.tsx` tested (typing triggers the hook it depends on)
- [ ] `SearchResultsSection.tsx` tested (empty / loading / populated states) + snapshot

**Verification:** `pnpm --filter @repo-radar/web test:coverage`

**Dependencies:** Task 7

**Files likely touched:** `apps/web/src/features/search/SearchBar.test.tsx`, `apps/web/src/features/search/SearchResultsSection.test.tsx`

**Estimated scope:** Medium

---

### Task 9: tracked-repos hooks

**Acceptance criteria:**

- [ ] `useTrackedRepoCacheEntries.ts` tested
- [ ] `useTrackedRepoView.ts` tested

**Verification:** `pnpm --filter @repo-radar/web test:coverage`

**Dependencies:** Task 1

**Files likely touched:** `apps/web/src/features/tracked-repos/useTrackedRepoCacheEntries.test.ts`, `apps/web/src/features/tracked-repos/useTrackedRepoView.test.ts`

**Estimated scope:** Medium

---

### Task 10: tracked-repos components (+ snapshots)

**Acceptance criteria:**

- [ ] `TrackedRepoCard.tsx`, `TrackedRepoControls.tsx`, `TrackedReposSection.tsx` each tested
- [ ] Each has a `toMatchSnapshot()` assertion

**Verification:** `pnpm --filter @repo-radar/web test:coverage`

**Dependencies:** Task 9

**Files likely touched:** `apps/web/src/features/tracked-repos/TrackedRepoCard.test.tsx`, `TrackedRepoControls.test.tsx`, `TrackedReposSection.test.tsx`

**Estimated scope:** Medium

---

### Task 11: stats-chart (+ snapshot)

**Acceptance criteria:**

- [ ] `StarsChartCard.tsx` tested with representative data + snapshot

**Verification:** `pnpm --filter @repo-radar/web test:coverage`

**Dependencies:** Task 1

**Files likely touched:** `apps/web/src/features/stats-chart/StarsChartCard.test.tsx`

**Estimated scope:** Small

---

### Task 12: main.tsx / instrumentation.ts — exception recorded

**Description:** Resolved 2026-09-20 — exempted via CONSTRAINTS.md exception
T1, covered instead by the e2e smoke spec (Task 15). Nothing left to implement
here; task exists as a record of the decision.

**Acceptance criteria:**

- [x] Exceptions row T1 added to CONSTRAINTS.md with owner (@PierreAdel) and expiry (2026-12-19)

**Verification:** `git diff CONSTRAINTS.md` shows row T1

**Dependencies:** None

**Files likely touched:** `CONSTRAINTS.md` (already done)

**Estimated scope:** Small — done

---

## Checkpoint: apps/web unit coverage

- [ ] apps/web reaches ≥ 80% line coverage (or has a recorded, dated exception for bootstrap files)
- [ ] `pnpm test:coverage` clean workspace-wide
- [ ] Review with human before proceeding to Phase 2

---

## Phase 2: Integration tests

### Task 13: integration — search flow

**Acceptance criteria:**

- [ ] Test drives `SearchBar` → `useRepoSearch` → `@repo-radar/core` `githubApi` → `SearchResultsSection`, with only the network boundary (fetch) mocked
- [ ] Covers success and error-from-API paths end to end through the component tree

**Verification:** `pnpm --filter @repo-radar/web test:coverage`

**Dependencies:** Task 8

**Files likely touched:** `apps/web/src/features/search/searchFlow.integration.test.tsx`

**Estimated scope:** Medium

---

### Task 14: integration — track-repo flow

**Acceptance criteria:**

- [ ] Test drives `TrackedRepoControls` → store dispatch → `persistence` → `TrackedReposSection` re-render, with only `localStorage` mocked
- [ ] Covers track, untrack, and persistence-survives-reload

**Verification:** `pnpm --filter @repo-radar/web test:coverage`

**Dependencies:** Task 10

**Files likely touched:** `apps/web/src/features/tracked-repos/trackedRepoFlow.integration.test.tsx`

**Estimated scope:** Medium

---

## Phase 3: E2E + accessibility

### Task 15: install & configure Playwright

**Acceptance criteria:**

- [ ] `@playwright/test` installed, browsers installed (`playwright install`)
- [ ] `playwright.config.ts` at repo root, pointed at `apps/web`'s dev/preview server
- [ ] One smoke spec: app loads, key landmark is visible
- [ ] CI job skeleton added (can be non-blocking initially)

**Verification:** `pnpm exec playwright test` green locally

**Dependencies:** None (can run in parallel with Phase 0–2)

**Files likely touched:** `playwright.config.ts`, `e2e/smoke.spec.ts`, `.github/workflows/ci.yml`, `package.json`

**Estimated scope:** Medium

---

### Task 16: e2e — critical search flow

**Acceptance criteria:**

- [ ] Spec searches for a repo, sees results render

**Verification:** `pnpm exec playwright test e2e/search.spec.ts`

**Dependencies:** Task 15

**Files likely touched:** `e2e/search.spec.ts`

**Estimated scope:** Small

---

### Task 17: e2e — track/untrack repo, persists across reload

**Acceptance criteria:**

- [ ] Spec tracks a repo, reloads the page, confirms it's still tracked
- [ ] Spec untracks it, confirms it's gone

**Verification:** `pnpm exec playwright test e2e/track-repo.spec.ts`

**Dependencies:** Task 15

**Files likely touched:** `e2e/track-repo.spec.ts`

**Estimated scope:** Small

---

### Task 18: e2e — sort/filter controls

**Acceptance criteria:**

- [ ] Spec exercises the tracked-repo sort menu (labeled per the recent a11y pass) and confirms order changes

**Verification:** `pnpm exec playwright test e2e/sort-filter.spec.ts`

**Dependencies:** Task 15

**Files likely touched:** `e2e/sort-filter.spec.ts`

**Estimated scope:** Small

---

### Task 19: accessibility — axe assertions on the 3 flows

**Acceptance criteria:**

- [ ] `@axe-core/playwright` installed
- [ ] Each of Tasks 16–18's specs gets a zero-critical/serious axe assertion at its key state
- [ ] CI gate added per CONSTRAINTS.md's accessibility row

**Verification:** `pnpm exec playwright test` still green with axe assertions included

**Dependencies:** Tasks 16, 17, 18

**Files likely touched:** `e2e/search.spec.ts`, `e2e/track-repo.spec.ts`, `e2e/sort-filter.spec.ts`, `.github/workflows/ci.yml`

**Estimated scope:** Small

---

## Checkpoint: E2E + a11y

- [ ] `playwright test` green locally
- [ ] Axe assertions pass on all 3 flows
- [ ] Review with human before proceeding to Phase 4

---

## Phase 4: Performance + stress/large-data

### Task 20: preview-URL capture in CI (polls the Vercel API)

**Description:** Resolved 2026-09-20 — polls the Vercel API for the real
deployment URL rather than using a local `vite preview` build. **Requires a
human to add repo secrets first** (GitHub → Settings → Secrets and variables →
Actions): `VERCEL_TOKEN` (Vercel account → Settings → Tokens) and
`VERCEL_PROJECT_ID`/`VERCEL_ORG_ID` (from `.vercel/project.json` after `vercel link`,
or the Vercel project's Settings page). This is an ask-first item — do not
generate or commit a token; the human creates it out-of-band.

**Acceptance criteria:**

- [ ] `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID` confirmed present in repo secrets (human-provided)
- [ ] CI step polls `GET https://api.vercel.com/v6/deployments?projectId=...` filtered to the current branch/SHA, waits for `READY` state, extracts `.url`
- [ ] URL exposed as a job output Tasks 21–22 can consume

**Verification:** Manual — CI job logs show a reachable `*.vercel.app` URL for the branch under test

**Dependencies:** Task 15 (reuses the same CI job); human-provided secrets

**Files likely touched:** `.github/workflows/ci.yml`

**Estimated scope:** Small

---

### Task 21: Lighthouse performance gate

**Acceptance criteria:**

- [ ] `lighthouse` installed as devDependency
- [ ] CI step runs against the URL from Task 20, asserts LCP ≤2500ms, CLS ≤0.1 per CONSTRAINTS.md

**Verification:** CI job output shows the Lighthouse JSON report and pass/fail

**Dependencies:** Task 20

**Files likely touched:** `.github/workflows/ci.yml`, `package.json`

**Estimated scope:** Medium

---

### Task 22: k6 stress tests for the API routes

**Acceptance criteria:**

- [ ] `k6` installed (brew, or documented alternative for non-macOS contributors)
- [ ] Scripts for `api/github/search` and `api/github/repo` covering sustained concurrent load
- [ ] Manual-trigger CI job (not PR-blocking yet, per CONSTRAINTS.md)

**Verification:** `k6 run` locally against Task 20's URL, review error-rate output

**Dependencies:** Task 20

**Files likely touched:** `load-tests/github-search.js`, `load-tests/github-repo.js`, `.github/workflows/ci.yml`

**Estimated scope:** Medium

---

### Task 23: large-data Playwright test

**Acceptance criteria:**

- [ ] Fixture seeds 1000+ tracked repos into the persisted store
- [ ] Spec asserts the list renders, stays virtualized (only a viewport's worth of DOM nodes), and stays interactive

**Verification:** `pnpm exec playwright test e2e/large-data.spec.ts`

**Dependencies:** Task 15

**Files likely touched:** `e2e/large-data.spec.ts`, `e2e/fixtures/large-repo-list.ts`

**Estimated scope:** Medium

---

## Phase 5: Ratchet the bar

### Task 24: flip coverage from warn to block

**Acceptance criteria:**

- [ ] All 4 workspaces confirmed at or above 80% line coverage
- [ ] CONSTRAINTS.md's coverage row updated from "⚠️ warn-only" to "✅ enforced"
- [ ] CI step changed to fail the build below threshold

**Verification:** A deliberately-uncovered new line in a test PR causes CI to fail

**Dependencies:** All of Phase 0–2 plus Task 24's own date (2026-10-04)

**Files likely touched:** `CONSTRAINTS.md`, `.github/workflows/ci.yml`

**Estimated scope:** Small

---

## Checkpoint: Complete

- [ ] All CONSTRAINTS.md 🔲 rows now ✅
- [ ] `pnpm check:task` green
- [ ] CI green on the branch
- [ ] Human review before merge
