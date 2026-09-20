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

- [x] `store.ts` tested (reducer wiring, middleware attached) — already 100% via Task 1's App smoke test, no separate file needed
- [x] `hooks.ts` tested (typed hooks return what's expected from a mock store) — same, already 100%
- [x] `AppErrorBoundary.tsx` tested (renders children normally; renders fallback on a thrown error; retry recovers; report copies to clipboard)

**Verification:** `pnpm --filter web test:coverage` — apps/web now 45.3% lines (was 40.6%), 5 tests passing

**Note:** `@sentry/react`'s exports are non-configurable in ESM — `vi.spyOn(Sentry, "captureException")` throws `Cannot redefine property`. Used `vi.mock("@sentry/react", ...)` instead.

**Dependencies:** Task 1

**Files likely touched:** `apps/web/src/app/AppErrorBoundary.test.tsx`

**Estimated scope:** Medium

---

### Task 6: App, Header, ThemedApp (+ snapshots)

**Acceptance criteria:**

- [x] Each renders without throwing given a mock store/theme
- [x] Header has a `toMatchSnapshot()` assertion

**Verification:** `pnpm --filter web test:coverage` — apps/web now 48.8% lines (was 45.3%), 12 tests passing. `AppErrorBoundary.tsx` and `ThemedApp.tsx` both 100%.

**Deviation from plan:** skipped snapshotting App and ThemedApp themselves — both render the full dashboard tree (nested MUI components, lazy chart, tracked-repos section), so their snapshots would just be a much larger, more brittle superset of Header's, breaking on any incidental MUI markup change without adding real regression-catching value beyond the RTL assertions already in place. Snapshotted Header (bounded size) instead; component-level snapshots (RepoCard, EmptyState, ErrorFallback, StarsBarChart) already cover the leaf-level rendering this is meant to guard.

**Note:** `ButtonBase`'s accessible role is `"button"`, not `"link"`, even though it navigates — don't assume role from behavior. Also MUI's search `TextField` renders `type="text"`, so its role is `"textbox"`, not `"searchbox"`; query by placeholder text instead.

**Dependencies:** Task 1, Task 5 (for store mocking pattern)

**Files likely touched:** `apps/web/src/Header.test.tsx`, `apps/web/src/app/ThemedApp.test.tsx`

**Estimated scope:** Medium

---

### Task 7: search feature hooks

**Acceptance criteria:**

- [x] `useSearchBox.ts` tested (input state, debounce interaction) — 100%
- [x] `useRepoSearch.ts` tested (loading/success/error states against a mocked `githubApi`) — 80%

**Verification:** `pnpm --filter web test:coverage` — apps/web now 57.5% lines (was 48.8%), 19 tests passing

**Note:** both test files needed `.tsx` (not `.ts`) since they contain JSX
wrappers. Also: don't mix `vi.useFakeTimers()` with `@testing-library`'s
`waitFor` — `waitFor`'s internal polling hung against the faked clock and blew
past vitest's real 5000ms test timeout. Fixed by asserting directly after the
`act(() => vi.advanceTimersByTime(...))` flush instead of wrapping in `waitFor`.

**Dependencies:** Task 1

**Files likely touched:** `apps/web/src/features/search/useSearchBox.test.tsx`, `apps/web/src/features/search/useRepoSearch.test.tsx`

**Estimated scope:** Medium

---

### Task 8: search feature components (+ snapshots)

**Acceptance criteria:**

- [x] `SearchBar.tsx` tested — 100%. (Plan's description was slightly off: SearchBar is a controlled component, not itself a hook consumer — `useSearchBox` belongs to Header, already covered in Task 7.)
- [x] `SearchResultsSection.tsx` tested (redirect / prompt / loading / error / empty / populated / virtualized-threshold states) + snapshot of the populated state

**Verification:** `pnpm --filter web test:coverage` — apps/web now 68.1% lines (was 57.5%), 29 tests passing

**Note:** MUI's `TextField` `aria-label` prop lands on the outer `MuiFormControl`
wrapper, not the `<input>` itself — `getByRole("textbox", {name: ...})` can't
see it; query by placeholder text instead. Also `@tanstack/react-virtual`
computes a zero-size viewport in jsdom (no real layout), so the virtualized
list renders zero rows — the test for the >=20-item path only proves it mounts
without crashing, not that rows are visible; verifying actual virtualized
rendering needs a real browser (Playwright, Phase 3).

**Dependencies:** Task 7

**Files likely touched:** `apps/web/src/features/search/SearchBar.test.tsx`, `apps/web/src/features/search/SearchResultsSection.test.tsx`

**Estimated scope:** Medium

---

### Task 9: tracked-repos hooks

**Acceptance criteria:**

- [x] `useTrackedRepoCacheEntries.ts` tested — 100%
- [x] `useTrackedRepoView.ts` tested (sort by stars/name, filter by minStars, clearFilters, hasActiveFilters) — 96.7%

**Verification:** `pnpm --filter web test:coverage` — apps/web now 79.1% lines (was 68.1%), 35 tests passing — nearly at the 80% bar

**Dependencies:** Task 1

**Files likely touched:** `apps/web/src/features/tracked-repos/useTrackedRepoCacheEntries.test.tsx`, `apps/web/src/features/tracked-repos/useTrackedRepoView.test.tsx`

**Estimated scope:** Medium

---

### Task 10: tracked-repos components (+ snapshots)

**Acceptance criteria:**

- [x] `TrackedRepoCard.tsx` (80%), `TrackedRepoControls.tsx` (69%), `TrackedReposSection.tsx` (87%) each tested
- [x] `TrackedRepoControls.tsx` and `TrackedReposSection.tsx` have `toMatchSnapshot()` assertions

**Verification:** `pnpm --filter web test:coverage` — apps/web now **87% lines, already past the 80% bar**, 48 tests passing

**Note:** same MUI wrapper-vs-element aria-label gap as Tasks 6/8: the `role="combobox"` element on MUI's `Select` doesn't itself carry the `aria-label` (it's on an ancestor `MuiInputBase-root`) — dropped the `name` filter since there's only one combobox in this component.

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

- [x] apps/web reaches ≥ 80% line coverage — **89.4%**, plus the T1 exception for main.tsx/instrumentation.ts
- [x] `pnpm test:coverage` clean workspace-wide — 122 tests passing across all 4 workspaces (api 91.5%, core 92.6%, ui 80.4%, web 89.4%)
- [x] `pnpm typecheck` and `pnpm lint` clean workspace-wide (fixed 2 `noUncheckedIndexedAccess` errors found while verifying)
- [ ] Review with human before proceeding to Phase 2

---

## Phase 2: Integration tests

### Task 13: integration — search flow

**Acceptance criteria:**

- [x] Test drives real `Header` (SearchBar + useSearchBox) → URL → real `SearchResultsSection` (useRepoSearch) → real `githubApi`, with only `fetch`/`Request` mocked at the network boundary
- [x] Covers success and error-from-API paths end to end through the component tree

**Verification:** `pnpm --filter web test:coverage` — 2/2 passing, ~1s real time

**Note:** mixing `vi.useFakeTimers()` with `userEvent.type()` hung the same way
Task 7's `waitFor` combo did (`userEvent`'s own internal delays get faked too,
and never got advanced). Used real timers throughout instead — slower
(~400ms debounce actually elapses) but reliable, and arguably more honest for
an integration test.

**Dependencies:** Task 8

**Files likely touched:** `apps/web/src/features/search/searchFlow.integration.test.tsx`

**Estimated scope:** Medium

---

### Task 14: integration — track-repo flow

**Acceptance criteria:**

- [x] Test drives real `TrackedReposSection` (useTrackedRepoView) → store dispatch (`trackRepo`/`untrackRepo`) → real `persistenceMiddleware` → real jsdom `localStorage`, with only `fetch`/`Request` mocked
- [x] Covers track, untrack, and persistence-survives-reload

**Verification:** `pnpm --filter web test:coverage` — 3/3 passing

**Note:** `TRACKED_REPOS_STORAGE_KEY` was exported from `trackedReposSlice.ts`
but never re-exported from `@repo-radar/core`'s barrel (`index.ts`) — a test
importing it got `undefined` silently (Vite/esbuild doesn't validate named
imports the way `tsc` does, so this didn't error, it just read `localStorage`
under the key `"undefined"`). Added it to the barrel — small, legitimate
addition, it was already a stable public export one level down. The
persistence-survives-reload sub-test uses `vi.resetModules()` to force
`trackedReposSlice`'s module-load-time `loadFromStorage()` read to actually
re-run, simulating a page reload; this reliably re-evaluates the workspace
package once the key bug above was fixed.

**Dependencies:** Task 10

**Files likely touched:** `apps/web/src/features/tracked-repos/trackedRepoFlow.integration.test.tsx`, `packages/core/src/index.ts`

**Estimated scope:** Medium

---

## Phase 3: E2E + accessibility

### Task 15: install & configure Playwright

**Acceptance criteria:**

- [x] `@playwright/test` installed, Chromium browser installed
- [x] `playwright.config.ts` at repo root — `webServer` auto-starts `apps/web`'s Vite dev server on port 5173
- [x] One smoke spec: app loads, key landmark is visible
- [x] CI job added (`e2e`, `continue-on-error: true` — non-blocking until proven stable)

**Verification:** `pnpm e2e` green locally (1/1 passing)

**Note:** wrote `e2e/mockGithubApi.ts`, a shared Playwright route-mocking helper
(`page.route("**/api/github/search**", ...)` etc.) so every e2e spec runs
against canned responses instead of the real GitHub API — deterministic, no
rate limits, no token needed.

**Dependencies:** None (can run in parallel with Phase 0–2)

**Files likely touched:** `playwright.config.ts`, `e2e/smoke.spec.ts`, `e2e/mockGithubApi.ts`, `.github/workflows/ci.yml`, `package.json`

**Estimated scope:** Medium

---

### Task 16: e2e — critical search flow

**Acceptance criteria:**

- [x] Spec searches for a repo, sees results render
- [x] Bonus: covers the no-results state too

**Verification:** `pnpm exec playwright test e2e/search.spec.ts` — 2/2 passing

**Dependencies:** Task 15

**Files likely touched:** `e2e/search.spec.ts`

**Estimated scope:** Small

---

### Task 17: e2e — track/untrack repo, persists across reload

**Acceptance criteria:**

- [x] Spec tracks a repo, reloads the page, confirms it's still tracked
- [x] Spec untracks it, confirms it's gone

**Verification:** `pnpm exec playwright test e2e/track-repo.spec.ts` — 2/2 passing

**Dependencies:** Task 15

**Files likely touched:** `e2e/track-repo.spec.ts`

**Estimated scope:** Small

---

### Task 18: e2e — sort/filter controls

**Acceptance criteria:**

- [x] Spec exercises the tracked-repo sort menu (labeled per the recent a11y pass) and confirms order changes

**Verification:** `pnpm exec playwright test e2e/sort-filter.spec.ts` — 1/1 passing

**Note:** the shared `mockGithubApi` helper returns the same canned search
results for every query (it doesn't filter by search text), so tracking two
different repos via two separate searches made "Track" ambiguous (both cards
render every time). Fixed by searching once and scoping each click to its own
`<li>` via `hasText`.

**Dependencies:** Task 15

**Files likely touched:** `e2e/sort-filter.spec.ts`

**Estimated scope:** Small

---

### Task 19: accessibility — axe assertions on the 3 flows

**Acceptance criteria:**

- [x] `@axe-core/playwright` installed
- [x] Each of Tasks 16–18's specs gets a zero-critical/serious axe assertion at its key state
- [x] CI gate added (same `e2e` job as Task 15, non-blocking for now)

**Verification:** `pnpm e2e` green with axe assertions included — 6/6 passing

**This found 3 real, pre-existing accessibility bugs**, not test issues — fixed all three:

1. **Nested interactive controls** (`RepoCard.tsx`): the whole card was
   `role="button"` (click-to-expand) while also containing Track/Untrack/
   Refresh/Open-on-GitHub buttons inside it — axe's `nested-interactive` rule
   (serious). Screen readers don't reliably announce interactive elements
   nested inside another interactive element. Fixed by removing the
   click-to-expand behavior from the outer `Card` entirely and moving it to
   a dedicated `IconButton` wrapping the chevron (which already existed
   visually, just wasn't a real button before).
2. **Invalid `aria-label` on a role-less `<div>`** (`TrackedRepoControls.tsx`):
   MUI's `<Select aria-label="...">` puts that attribute on the outer
   `MuiInputBase-root` wrapper div, not the inner `role="combobox"` element —
   axe's `aria-prohibited-attr` rule (serious), since `aria-label` isn't valid
   on an element with no ARIA role. Fixed via MUI's `SelectDisplayProps`,
   which targets the actual combobox element.
3. **Same rule, different cause** (`Header.tsx`): the mobile "Refresh all"
   button is disabled sometimes, and MUI Tooltip needs a non-disabled wrapper
   `<span>` to keep receiving hover events for the tooltip — but Tooltip then
   clones its `aria-label` onto that `<span>` instead of the button, and a
   bare `<span>` isn't a valid `aria-label` target either. Fixed by giving the
   `IconButton` its own explicit `aria-label`, and explicitly overriding the
   span's inherited one back to `undefined` (MUI spreads `children.props`
   last, so an explicit prop on the JSX wins over Tooltip's auto-injection).

All three fixes changed only markup/prop-placement, not behavior — existing
unit-test snapshots for `RepoCard`-adjacent components (`SearchResultsSection`,
`TrackedRepoControls`) were regenerated to match (`vitest run -u`), and one
`Header.test.tsx` assertion was loosened from `getByRole` to `getAllByRole`
since the mobile button now has its own accessible name too (previously it
had none, so only the desktop button was matched — this was a latent test gap
the fix exposed, not a regression).

**Dependencies:** Tasks 16, 17, 18

**Files likely touched:** `e2e/search.spec.ts`, `e2e/track-repo.spec.ts`, `e2e/sort-filter.spec.ts`, `e2e/assertNoA11yViolations.ts`, `.github/workflows/ci.yml`, `packages/ui/src/RepoCard.tsx`, `apps/web/src/Header.tsx`, `apps/web/src/features/tracked-repos/TrackedRepoControls.tsx`

**Estimated scope:** Small (grew to Medium once real bugs were found)

---

## Checkpoint: E2E + a11y

- [x] `playwright test` green locally — 6/6
- [x] Axe assertions pass on all 3 flows (after fixing 3 real a11y bugs they found)
- [x] Full workspace re-verified: 127 unit/integration tests + 6 e2e tests, typecheck and lint clean
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

- [x] `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID` confirmed present in repo secrets (human-provided 2026-09-20, set via `gh secret set`)
- [x] `scripts/wait-for-vercel-preview.mjs` polls `GET https://api.vercel.com/v6/deployments?projectId=...&teamId=...`, filters to `meta.githubCommitSha === GIT_SHA`, waits for `readyState === "READY"`, prints the URL
- [x] URL exposed as a job output (`steps.preview.outputs.url` / `steps.target.outputs.url`) Tasks 21–22 consume

**Verification:** tested directly against the real Vercel API (not just CI) — returned a real, live `*.vercel.app` URL on the first call

**Note:** the token was shared in plaintext in chat — flagged to the user as
something worth rotating in the Vercel dashboard, even though it's now stored
as an encrypted GitHub secret and was never echoed in any command output or
committed anywhere.

**Dependencies:** Task 15 (reuses the same CI job); human-provided secrets

**Files likely touched:** `.github/workflows/ci.yml`, `scripts/wait-for-vercel-preview.mjs`

**Estimated scope:** Small

---

### Task 21: Lighthouse performance gate

**Acceptance criteria:**

- [x] `lighthouse` installed as devDependency
- [x] CI step (`lighthouse` job) runs against the URL from Task 20, asserts LCP ≤2500ms, CLS ≤0.1 per CONSTRAINTS.md (non-blocking `continue-on-error` for now, same as `e2e`)

**Verification:** ran `scripts/check-lighthouse-budget.mjs` directly against the real Vercel preview — mechanics confirmed working (report generated, budgets checked, correct exit code)

**Real finding, not a script bug:** the actual deployed preview measures
**3600ms LCP** against the 2500ms budget. Flagged to the user; not fixed here
— this task was to wire up the check, not to do the performance work it
surfaces. The non-blocking CI job means this won't fail builds yet.

**Note:** `lighthouse`'s Node API needs an actual Chrome binary via
`chrome-launcher`, not a Playwright `Browser` object (`browser.wsEndpoint` is
a Puppeteer API, not Playwright's) — resolved Playwright's already-installed
Chromium path via `createRequire` chained through `@playwright/test`'s own
module context (robust to pnpm's store layout, unlike hardcoding the
`.pnpm/...` path). Also had to add a `globals.node` block to `eslint.config.js`
for `scripts/**/*.mjs` — nothing previously configured Node globals
(`process`, `fetch`, etc.) for plain Node scripts outside the workspaces.

**Dependencies:** Task 20

**Files likely touched:** `.github/workflows/ci.yml`, `package.json`, `scripts/check-lighthouse-budget.mjs`, `eslint.config.js`

**Estimated scope:** Medium

---

### Task 22: k6 stress tests for the GitHub API

**Acceptance criteria:**

- [x] `k6` installed (`brew install k6`)
- [x] Scripts covering sustained concurrent load, randomized queries/repos so requests aren't identical
- [x] Manual-trigger CI job (`stress-test.yml`, `workflow_dispatch` only — not run on push/PR, per CONSTRAINTS.md)

**Verification:** ran both scripts locally against the real `api.github.com` with a fake token — confirmed real HTTP round-trips (401, correctly _not_ flagged as rate-limited) proving the request/header structure is right; can't verify a real 200 without the actual `TESTING_GITHUB_TOKEN` value, which isn't available locally

**Revised 2026-09-20, after Task 20/21 had already shipped:** originally these
scripts hit `api/github/search`/`api/github/repo` (our own proxy) through a
resolved Vercel preview URL, same as Lighthouse. Changed to call
`api.github.com` directly instead, authenticated with a dedicated
`TESTING_GITHUB_TOKEN` — isolates stress-test traffic from the app's real
`GITHUB_TOKEN` and its production rate-limit budget entirely, rather than
just "being deliberately light" about sharing it. See CONSTRAINTS.md's
"Stress/load scope note" for the full reasoning. `stress-test.yml`
simplified accordingly — no longer needs pnpm/Node or the Vercel-preview
polling step, just k6 directly.

**Note:** GitHub's search endpoint has its own stricter limit (30 req/min
authenticated, separate from the 5000/hr core REST limit) — `github-search.js`
uses a `constant-arrival-rate` executor paced at 20/min to stay safely under
it, while `github-repo.js` (core REST, repo lookups) can use free-running VUs.

**Note:** the token turned out to be named `TESTING_GITHUB_TOKEN` (not
`GITHUB_TOKEN_TESTING`) and scoped to the `Preview`/`Production` GitHub
Environments (Vercel's integration auto-created these and mirrors its own
env vars into them) rather than a plain repo secret — `gh secret list`
didn't show it at all until checked via `gh api repos/.../environments/Preview/secrets`.
The workflow job needs `environment: Preview` declared, or
`secrets.TESTING_GITHUB_TOKEN` resolves to nothing even with the right name.

**Note:** local smoke-testing hit an unrelated macOS quirk — k6 resolves
`localhost` to IPv4 (`127.0.0.1`) specifically, but Vite's dev server was only
listening on the IPv6 loopback here, so requests got `connection refused`
despite `curl http://localhost:...` working fine (curl/browsers try both).
Used `http://[::1]:PORT` to smoke-test the earlier proxy-based version
locally. No longer relevant now that these scripts hit a public DNS name.

**Dependencies:** Task 20 (for the pattern; no longer a runtime dependency)

**Files likely touched:** `load-tests/github-search.js`, `load-tests/github-repo.js`, `.github/workflows/stress-test.yml`, `package.json`, `eslint.config.js`, `scripts/wait-for-vercel-preview.mjs` (comment only), `CONSTRAINTS.md`

**Estimated scope:** Medium

---

### Task 23: large-data Playwright test

**Acceptance criteria:**

- [x] Fixture seeds 1200 tracked repos into the persisted store (via `page.addInitScript` writing localStorage before the app boots)
- [x] Spec asserts the list renders, stays virtualized (mounted DOM nodes stay under 50, not 1200), and stays interactive (scrolling mounts different rows)

**Verification:** `pnpm exec playwright test e2e/large-data.spec.ts` — stable across 3 consecutive runs

**Note:** two real gotchas, not obvious from the source alone:

1. `[data-index]` isn't unique to the tracked-repos virtualizer — MUI's chart
   component uses it too elsewhere on the same dashboard page. An unscoped
   `page.locator('[data-index]')` silently matched the chart first, so
   "did scrolling change the mounted rows" never moved. Scoped the locator to
   the list container itself.
2. Adding this spec to the suite shifted worker-parallelism timing enough to
   expose a **pre-existing** ambiguity in `track-repo.spec.ts`: once a repo is
   tracked, `StarsChartCard`'s accessible chart description text also contains
   the repo's full name, so `getByText("facebook/react")` intermittently
   matched two elements depending on whether the chart had rendered yet.
   Fixed by targeting the repo card's heading role instead of loose text.

**Dependencies:** Task 15

**Files likely touched:** `e2e/large-data.spec.ts`, `e2e/track-repo.spec.ts` (selector fix)

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
