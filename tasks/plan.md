# Implementation Plan: Testing Quality Bar

## Overview

Raise repo-radar-app from 9/41 source files with any test toward the 80%-coverage
bar in `CONSTRAINTS.md`, and stand up the six test types the project has none of
today: apps/web unit test infra, integration, e2e (Playwright), snapshot,
accessibility (axe), performance (Lighthouse), and stress/large-data (k6 +
Playwright fixtures). Work happens on `chore/testing-quality-bar` (branched off
`staging`).

## Architecture Decisions

- **apps/web gets its own vitest config**, mirroring packages/core and
  packages/ui (jsdom + @testing-library/react), rather than trying to share one
  root config across a React app and two library packages with different
  environments.
- **Snapshot assertions ride along with each component's unit test task**
  instead of a separate pass over every component — one file touch, not two.
- **E2E owns accessibility and large-data checks**: axe assertions and the
  seeded-1000-repos test both need a real running app, which is what the
  Playwright scaffold (Task 10) provides. Building a second harness for either
  would duplicate that scaffold.
- **Stress (k6) and Lighthouse stay CI-manual-trigger, not PR-blocking, at
  first** — both need a deployed preview URL, and this repo's CI doesn't yet
  expose one to workflow steps (Vercel's GitHub integration posts it as a PR
  comment, not an env var). Wiring that is its own task, called out below
  rather than assumed away.

## Task List

### Phase 0: Foundations (parallel-safe, no shared files)

- [ ] Task 1: apps/web test infrastructure
- [ ] Task 2: packages/core remaining unit coverage (githubApi.ts, persistenceMiddleware.ts)
- [ ] Task 3: packages/ui remaining unit coverage (EmptyState, ErrorFallback, createAppTheme) + snapshots
- [ ] Task 4: api remaining unit coverage (sentry.ts, github/repo.ts, github/search.ts)

### Checkpoint: Foundations

- [ ] `pnpm test:coverage` runs clean across all 4 workspaces
- [ ] No workspace's coverage has dropped below its CONSTRAINTS.md baseline

### Phase 1: apps/web unit coverage (depends on Task 1)

- [ ] Task 5: app shell — store.ts, hooks.ts, AppErrorBoundary.tsx
- [ ] Task 6: App.tsx, Header.tsx, ThemedApp.tsx (+ snapshots)
- [ ] Task 7: search feature hooks — useSearchBox.ts, useRepoSearch.ts
- [ ] Task 8: search feature components — SearchBar.tsx, SearchResultsSection.tsx (+ snapshots)
- [ ] Task 9: tracked-repos hooks — useTrackedRepoCacheEntries.ts, useTrackedRepoView.ts
- [ ] Task 10: tracked-repos components — TrackedRepoCard.tsx, TrackedRepoControls.tsx, TrackedReposSection.tsx (+ snapshots)
- [ ] Task 11: stats-chart — StarsChartCard.tsx (+ snapshot)
- [ ] Task 12: main.tsx / instrumentation.ts — decide test-or-exempt (see Open Questions)

### Checkpoint: apps/web unit coverage

- [ ] apps/web reaches ≥ 80% line coverage (or a recorded, dated exception for bootstrap files)
- [ ] `pnpm test:coverage` clean workspace-wide

### Phase 2: Integration tests (depends on Phase 1)

- [ ] Task 13: integration — search flow (SearchBar → useRepoSearch → core githubApi → SearchResultsSection), network boundary mocked
- [ ] Task 14: integration — track-repo flow (TrackedRepoControls → store → persistence → TrackedReposSection)

### Phase 3: E2E + accessibility (depends on Phase 2)

- [ ] Task 15: install & configure Playwright — config, CI job skeleton, one smoke spec ("app loads")
- [ ] Task 16: e2e — critical search flow
- [ ] Task 17: e2e — track/untrack repo, persists across reload
- [ ] Task 18: e2e — sort/filter controls
- [ ] Task 19: install @axe-core/playwright, add zero-critical/serious assertions to Tasks 16–18's specs

### Checkpoint: E2E + a11y

- [ ] `playwright test` green locally
- [ ] Axe assertions pass on all 3 flows

### Phase 4: Performance + stress/large-data (depends on Phase 3's Playwright scaffold)

- [ ] Task 20: wire preview-URL capture into CI (needed by Tasks 21–22 — see Open Questions)
- [ ] Task 21: install Lighthouse, CI step against preview URL, LCP ≤2500ms / CLS ≤0.1 gate
- [ ] Task 22: install k6, load-test scripts for api/github/search and api/github/repo (manual trigger)
- [ ] Task 23: large-data Playwright test — seed 1000+ tracked repos, assert virtualized list stays responsive

### Phase 5: Ratchet the bar

- [ ] Task 24: flip coverage constraint from warn to block (dated 2026-10-04 in CONSTRAINTS.md), update CI

### Checkpoint: Complete

- [ ] All CONSTRAINTS.md 🔲 rows now ✅
- [ ] `pnpm check:task` green
- [ ] CI green on the branch
- [ ] Human review before merge

## Risks and Mitigations

| Risk                                                                                                  | Impact | Mitigation                                                                                       |
| ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| apps/web has 18 untested files behind MUI/Redux — components may be more entangled than packages/ui's | Medium | Tasks 5–12 sized at 1–3 files each specifically to surface entanglement early, not at the end    |
| Lighthouse/k6 need a preview URL CI doesn't expose yet                                                | Medium | Task 20 isolates that plumbing so Tasks 21–22 aren't blocked on guessing at it                   |
| Flipping coverage to blocking (Task 24) could stall unrelated PRs if a workspace hasn't hit 80% yet   | Medium | Dated in CONSTRAINTS.md, and Task 24 explicitly checks all workspaces are at bar before flipping |

## Decisions (resolved 2026-09-20)

- **main.tsx / instrumentation.ts:** exempted from unit coverage via CONSTRAINTS.md exception T1 (owner @PierreAdel, expires 2026-12-19). Covered instead by the e2e smoke spec (Task 15).
- **Preview URL in CI (Task 20):** polls the Vercel API for the real deployment URL rather than testing against a local `vite preview` build, so Lighthouse/k6 exercise the actual edge deployment. Requires a `VERCEL_TOKEN` CI secret and the Vercel project/org ID — **ask-first item**, needs to be added in GitHub repo settings by a human before Task 20 can run in CI (see Task 20 for the exact steps).
