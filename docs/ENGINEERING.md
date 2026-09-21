# Engineering Notes

Repo Radar started as a GitHub repo search/tracking dashboard, but the interesting part of this
codebase is everything around that feature: how it's structured, tested, hardened, and shipped.
This page is a tour of that — written for a technical reviewer, with links to the actual code and
PRs behind each claim rather than just a list of buzzwords.

A note on branches before diving in: this repo uses a `main ← staging ← feature branch` promotion
flow, matching how a real team stages changes. Some of what's below lives on
[`chore/testing-quality-bar`](https://github.com/PierreAdel/repo-radar-app/tree/chore/testing-quality-bar)
pending promotion to `staging`, not because it's incomplete, but because that's the honest state of
an actively-developed repo — every PR linked below is real, reviewable code regardless of which
branch it's currently sitting on.

## At a glance

| Area                 | Highlights                                                                                            | Status |
| -------------------- | ----------------------------------------------------------------------------------------------------- | :----: |
| Architecture         | pnpm + Turborepo monorepo, enforced module boundaries, a committed AST knowledge graph (Graphify)     |   ✅   |
| React architecture   | Route-level code splitting, Suspense boundaries, memoized selectors shared across sibling components  |   ✅   |
| Performance          | Vendor chunk splitting, virtualization, stress testing, a root-caused (if not yet fixed) LCP budget   |   ✅   |
| Resilience           | Audited loading/error/empty/offline states, network retry with a real retry policy, reconnect refetch |   ✅   |
| Security             | Threat-modeled pass, 2 real vulns fixed, CSP + security headers, dependency monitoring                |   ✅   |
| Testing strategy     | 158 unit/integration tests, 7 e2e specs, axe accessibility checks, k6 stress testing                  |   ✅   |
| Accessibility        | Axe-gated CI, skip links, live regions, real accessible names everywhere                              |   ✅   |
| Observability        | Sentry client + server, structured error context, uptime health check                                 |   ✅   |
| CI/CD                | Lint/type/test/build/e2e/a11y/perf gates, all required on protected branches                          |   ✅   |
| Vercel / deployment  | Region-pinned Functions, CSP via platform config, CI resolves the real per-PR preview URL             |   ✅   |
| Code quality         | TypeScript strict + `noUncheckedIndexedAccess`, zero-tolerance ESLint, isolated tested selectors      |   ✅   |
| Release engineering  | Conventional commits, release-please wired up, CHANGELOG + GitHub Releases automated                  |   ✅   |
| Developer experience | Graphify, Husky + lint-staged, Storybook, a numbers-backed quality bar instead of tribal knowledge    |   ✅   |

## Architecture

The repo is a pnpm workspace (`apps/web`, `packages/core`, `packages/ui`) orchestrated by
Turborepo, plus a fourth surface, `api/`, for the Vercel serverless functions that proxy GitHub's
REST API. Module boundaries are real, not aspirational:

- **`packages/core`** — types, the RTK Query GitHub client, Redux slices, hooks, pure utilities.
  No UI imports.
- **`packages/ui`** — shared, presentational MUI components, documented in Storybook. No Redux,
  no RTK Query, no business logic — everything comes in through props.
- **`apps/web`** — composes both into routes and features (`src/features/{search,tracked-repos,stats-chart}`),
  each with its hooks, components, and tests colocated.
- **`api/`** — thin Vercel Functions that reuse `packages/core`'s types, kept deliberately dumb.

Every file in the repo is also indexed into a committed **knowledge graph**
([`graphify-out/`](../graphify-out)) — an AST-derived map with god-node and community detection,
queryable (`graphify query`, `graphify path`, `graphify explain`) instead of grepping cold. It's
what let a lot of the work described below start with "here's the actual blast radius" instead of
guessing.

## React architecture

This is a client-only Vite SPA (no server rendering, so no streaming in the Next.js sense — worth
being precise about that rather than overselling it). Within that model:

- **Route-level code splitting**: `/search` and the stars chart lazy-load via `React.lazy` +
  `Suspense`, since neither is needed on the default dashboard route
  ([PR #26](https://github.com/PierreAdel/repo-radar-app/pull/26)). Cut the initial chunk from
  1,101KB to 937KB.
- **Granular render boundaries**: `RepoCard`, `RepoCardContent`, and the grid's row component are
  `React.memo`'d, with `useCallback`-stabilized handler props so the memoization actually holds —
  memoizing a component that receives a fresh closure every render is a no-op, so both had to land
  together ([PR #32](https://github.com/PierreAdel/repo-radar-app/pull/32)).
- **Selector-level memoization across sibling components**: three different components
  (`TrackedReposSection`, `TrackedRepoControls`, `StarsChartCard`) all read the same derived
  tracked-repo view. Rather than each recomputing it locally, a module-scoped `createSelector`
  memoizes it once per render pass, and a separate fix scoped the underlying Redux selector to
  just the relevant RTK Query cache slice instead of the whole store — it had been recomputing on
  _every_ dispatch in the app, not just tracked-repo ones (the O(N²) bug this fixed is detailed in
  the PR).

## Performance

- **Vendor chunk splitting**: React, MUI, Redux, Router, and Sentry each get their own cacheable
  chunk, so an app-only deploy doesn't invalidate the browser's cache of React
  ([PR #30](https://github.com/PierreAdel/repo-radar-app/pull/30)).
- **Virtualization**: both the tracked-repos grid and search results switch to
  `@tanstack/react-virtual` past a 20-item threshold — below that, the overhead isn't worth it, so
  it stays a plain list.
- **Explicit large-data validation**: [`e2e/large-data.spec.ts`](../e2e/large-data.spec.ts) seeds
  1,200 tracked repos via `localStorage` and asserts the virtualizer mounts a bounded DOM window
  (not all 1,200 nodes) and that scrolling actually windows in new content, not just renders the
  first page and stops.
- **Stress testing**: k6 scripts (`load-tests/`) hit `api.github.com` directly under sustained
  concurrent load, using a token isolated from production's, wired to a `workflow_dispatch`-only
  CI job so it never runs unintentionally.
- **A Lighthouse CI budget gate** checks LCP and CLS against the _real_ Vercel preview for every
  PR (`scripts/check-lighthouse-budget.mjs`), not a synthetic local proxy. When it started failing
  budget, the fix wasn't a guess — it was root-caused through a measure → hypothesize → test →
  revert loop: FCP was already 2.7s before any LCP-eligible element painted, which pointed at the
  ~1MB of critical JS (including a Sentry SDK with tracing + session replay imported and
  initialized synchronously ahead of React) rather than the LCP element itself. Deferring that
  SDK's _execution order_ didn't move the number; only removing its ~270KB from the critical path
  entirely did (a clean before/after test confirmed a ~390ms LCP improvement in isolation). That
  fix is not yet landed — the honest state is a root cause identified and measured, with the
  budget gate currently non-blocking while the real fix (loading Sentry's heavy integrations
  without tripping Lighthouse's simulated-throttling model) gets solved properly instead of
  papered over.

## Resilience

Error/loading/empty/offline states weren't audited feature-by-feature as an afterthought — they
were reviewed as a category and fixed where they were actually broken
([PR #32](https://github.com/PierreAdel/repo-radar-app/pull/32)):

- Search errors had **no retry affordance at all** — fixed, with a retry button wired to the
  underlying query's `refetch`.
- A failed "Load more" used to **replace the entire results list** with a bare error card,
  discarding page 1's already-loaded data. Now it keeps existing results visible with an inline
  retry.
- **Offline handling didn't exist.** Added a `useOnlineStatus` hook
  (`useSyncExternalStore` over `navigator.onLine` + the `online`/`offline` events) and a banner
  that appears while offline and clears automatically on reconnect — cached data stays visible
  underneath it the whole time.
- **Network retry has an actual policy**, not a blanket retry-everything: RTK Query's `retry()` is
  wrapped with a condition that only retries network failures and 5xx — never 4xx, since retrying
  a 404 is pointless and retrying a 429 rate-limit makes it worse. `refetchOnReconnect` is wired up
  via `setupListeners()` so a query that failed while offline retries automatically once
  connectivity returns.
- **Optimistic updates were audited, not assumed.** Track/untrack turned out to already be
  optimal: it's local Redux + `localStorage` state with no server round-trip, so it's already
  instant — the honest finding was "nothing to fix here," documented as such rather than adding
  unnecessary complexity to satisfy a checklist.

## Security

A threat-modeled pass (trust boundaries, STRIDE) over the API proxy and SPA surfaced two real
vulnerabilities, both fixed in [PR #31](https://github.com/PierreAdel/repo-radar-app/pull/31):

- **A confused-deputy path-injection** in the repo-lookup proxy: `fullName` went straight into the
  GitHub API URL with no validation. Since URL parsing normalizes dot-segments, a value like
  `../rate_limit` could walk the request outside `/repos/*`, letting any caller use the app's
  privileged `GITHUB_TOKEN` against arbitrary GitHub REST endpoints. Fixed with a strict validator
  at the request boundary.
- **A stored/reflected XSS**: a repo's `homepage` field — set by the repo's owner, so fully
  attacker-controlled — was rendered directly as a link's `href` with no protocol check. A
  `javascript:` URI would execute in the app's origin on click. Fixed by only rendering it as a
  link when it's an actual `http(s)` URL.

Beyond the fixes:

- **Security headers + a real CSP** in `vercel.json`, scoped to what the app actually loads
  (`self`, GitHub avatars, Sentry ingest) rather than a blanket allow-list.
- **Dependency monitoring** via Dependabot, weekly, grouped so Storybook's packages (which must
  move together) don't get half-updated by an automated PR.
- **No authentication or RBAC** — stated plainly rather than glossed over. This is a public,
  read-only GitHub browser with no user accounts, so there's no session/authz surface to secure;
  scoping that out was a deliberate decision, not a gap.

## Testing strategy

| Layer              | Tool                                         | Count                                                                                       |
| ------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Unit + integration | Vitest, per workspace                        | 158 tests (`ui` 28, `core` 36, `web` 77, `api` 17)                                          |
| End-to-end         | Playwright                                   | 7 specs — search, track/untrack, sort/filter, reload persistence, large-data virtualization |
| Accessibility      | `@axe-core/playwright`, inside the e2e specs | zero critical/serious violations, gated in CI                                               |
| Stress/load        | k6, against the real GitHub API              | manual-trigger CI job, isolated token                                                       |

The bar itself is written down and numbers-backed ([`CONSTRAINTS.md`](../CONSTRAINTS.md)) rather
than implicit: types and lint are zero-tolerance today; coverage and per-change test requirements
are warn-only with an explicit flip-to-blocking date; e2e and accessibility are already blocking.
One deliberate exception exists (`main.tsx`/`instrumentation.ts`, thin bootstrap code, verified by
the e2e smoke spec instead of unit tests) — and it's recorded with an owner and an expiry date, not
left as a silent gap.

## Accessibility

Axe-core assertions are wired directly into the e2e specs, not run as a separate manual pass, so a
regression fails the same CI job as a broken user flow. The initial audit
([PR #27](https://github.com/PierreAdel/repo-radar-app/pull/27)) found and fixed 3 real violations.
Beyond the automated gate: a skip-to-content link, ARIA live regions on loading/error/status
messages, and every interactive control has a real accessible name — enforced implicitly by the
test suite itself, since Testing Library's `getByRole` queries fail if a control isn't reachable by
role and name.

## Observability

Sentry is wired on both sides: server-side, every Vercel Function is wrapped
(`withErrorReporting`) so an unhandled exception is captured and reported instead of crashing
silently; client-side, errors and Web Vitals are captured with `componentStack` context attached
via a top-level error boundary. A dependency-free `/api/health` endpoint exists specifically for
external uptime monitoring (UptimeRobot).

## CI/CD

`ci.yml` runs lint → typecheck → test → build → Storybook build on every push/PR to `main` or
`staging`, plus a separate Playwright + axe job and a Lighthouse budget job against the real
per-PR Vercel preview — all required status checks on protected branches. A second workflow
(`stress-test.yml`) runs the k6 load test on manual trigger only, scoped to a dedicated GitHub
Environment so its token never overlaps with production's. A third
([`release-please.yml`](../.github/workflows/release-please.yml)) automates versioning (below).

## Vercel / deployment

Deployment is deliberately _not_ part of CI — Vercel's own GitHub integration handles
preview-per-PR and production-on-push-to-`main`, so no deploy credentials live in this repo at
all. What _is_ in this repo: the API proxy as region-pinned Vercel Functions (`fra1`, close to
GitHub's own infrastructure), the CSP/security headers delivered via `vercel.json` rather than app
code, and a small but real fix
([`2ffdbc7`](https://github.com/PierreAdel/repo-radar-app/commit/2ffdbc7)) where the Lighthouse CI
job needed the PR's actual head SHA — not just its branch name — to reliably resolve which Vercel
preview deployment to test against.

## Code quality

TypeScript runs in `strict` mode with `noUncheckedIndexedAccess` also enabled — the latter catches
a whole class of "this array access might be undefined" bugs that most projects don't bother
turning on. ESLint (flat config, `typescript-eslint` + `react-hooks` + `jsx-a11y`) is zero-error in
CI. Derived state that used to live inline in components was pulled out into small, independently
tested modules (`trackedRepoSort.ts`, `trackedRepoFilters.ts`, `selectDerivedTrackedRepoView.ts`)
rather than left as untested logic buried in a component body.

## Release engineering

Conventional commits (`feat:`, `fix:`, `chore:`, ...) have been used consistently across this
repo's history. [`release-please`](https://github.com/googleapis/release-please)
([PR #33](https://github.com/PierreAdel/repo-radar-app/pull/33)) turns that into automation: it
keeps a "Release PR" up to date with the next semantic version bump and a generated
[`CHANGELOG.md`](../CHANGELOG.md), computed from commits since the last release. Nothing is tagged
silently — merging that PR is the actual release step, which stays a deliberate, reviewable action
rather than a side effect of every push to `main`.

## Developer experience

- **Graphify**: a committed, queryable knowledge graph so every contributor (human or agent) starts
  from a shared map of the codebase instead of re-deriving its architecture from scratch each time.
- **Husky + lint-staged**: format and lint run on every commit, not just in CI.
- **Storybook**: shared `packages/ui` components are developed and visually reviewed in isolation.
- **A written quality bar**: `CONSTRAINTS.md` turns "we should probably test this" into a specific
  command, a specific enforcement point, and a specific status — the kind of document that exists
  precisely so the same conversation doesn't happen twice.
