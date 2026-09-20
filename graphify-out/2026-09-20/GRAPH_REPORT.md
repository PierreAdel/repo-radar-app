# Graph Report - repo-radar-app  (2026-09-20)

## Corpus Check
- 132 files · ~35,080 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .graphify-bak 1, .example 1)

## Summary
- 801 nodes · 1257 edges · 63 communities (52 shown, 11 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `438575f6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- packages_core_src_index_tracked_repos_storage_key
- Repo Radar (project overview)
- web/package.json
- ui/package.json
- Phase 1: apps/web unit coverage
- devDependencies
- App.tsx
- package.json
- core/package.json
- ref_vitest
- tasks
- devDependencies
- compilerOptions
- web/tsconfig.json
- tsconfig.json
- core/tsconfig.json
- ui/tsconfig.json
- vercel.json
- ref_testing_library_jest_dom
- Repo Radar HTML entry point (mounts src/main.tsx into #root)
- { useSearchRepositoriesQuery, useGetRepositoryQuery }
- What You Must Do When Invoked
- Todo: Testing Quality Bar
- dependencies
- graphify reference: extra exports and benchmark
- SearchResultsSection.tsx
- Task List
- ref_testing_library_user_event
- graphify reference: query, path, explain
- .prettierrc.json
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- mockGithubApi.ts
- graphify reference: transcribe video and audio
- scripts
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- ui/src/index.ts
- devDependencies
- wait-for-vercel-preview.mjs
- useTrackedRepoView.ts
- Constraints
- scripts
- trackedRepoFlow.integration.test.tsx
- core/src/index.ts
- github-repo.js
- check-lighthouse-budget.mjs
- dependencies
- lint-staged
- ref_testing_library_react
- searchFlow.integration.test.tsx
- store.ts
- engines
- TrackedRepoCard.test.tsx
- ErrorFallback.stories.tsx
- EmptyState.stories.tsx
- StarsBarChart.stories.tsx
- createAppTheme
- AppErrorBoundary
- repo
- @sentry/react

## God Nodes (most connected - your core abstractions)
1. `scripts` - 19 edges
2. `react-router` - 17 edges
3. `useTrackedRepoView()` - 16 edges
4. `compilerOptions` - 15 edges
5. `githubApi` - 12 edges
6. `GithubRepo` - 12 edges
7. `What You Must Do When Invoked` - 12 edges
8. `useAppSelector` - 11 edges
9. `Task List` - 11 edges
10. `Todo: Testing Quality Bar` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Task 18: e2e — sort/filter controls` --references--> `mockGithubApi()`  [INFERRED]
  tasks/todo.md → e2e/mockGithubApi.ts
- `Task 13: integration — search flow` --references--> `Header()`  [INFERRED]
  tasks/todo.md → apps/web/src/Header.tsx
- `Task 13: integration — search flow` --references--> `SearchResultsSection()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/search/SearchResultsSection.tsx
- `Task 19: accessibility — axe assertions on the 3 flows` --references--> `SearchResultsSection()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/search/SearchResultsSection.tsx
- `Task 8: search feature components (+ snapshots)` --references--> `useSearchBox()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/search/useSearchBox.ts

## Import Cycles
- None detected.

## Communities (63 total, 11 thin omitted)

### Community 1 - "Repo Radar (project overview)"
Cohesion: 0.20
Nodes (11): CI Workflow (lint, typecheck, test, build, storybook), CI/CD split: Vercel handles deployment, workflow is CI-only, pnpm install --no-frozen-lockfile rationale, Node 22 required for jsdom/undici webidl compatibility, pnpm workspace packages config (apps/*, packages/*), CI/CD section, Getting Started instructions, Repo Radar (project overview) (+3 more)

### Community 2 - "web/package.json"
Cohesion: 0.07
Nodes (26): @emotion/react, @emotion/styled, jsdom, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+18 more)

### Community 3 - "ui/package.json"
Cohesion: 0.04
Nodes (44): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core, exports (+36 more)

### Community 4 - "Phase 1: apps/web unit coverage"
Cohesion: 0.14
Nodes (11): useSearchBox(), useDebouncedValue(), Phase 1: apps/web unit coverage, Task 10: tracked-repos components (+ snapshots), Task 11: stats-chart (+ snapshot), Task 12: main.tsx / instrumentation.ts — exception recorded, Task 5: app shell — store, hooks, error boundary, Task 6: App, Header, ThemedApp (+ snapshots) (+3 more)

### Community 5 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, @axe-core/playwright, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+13 more)

### Community 6 - "App.tsx"
Cohesion: 0.17
Nodes (10): SearchResultsSection, StarsChartCard, visuallyHidden, MAX_SEARCH_QUERY_LENGTH, SearchBar(), SearchBarProps, StarsChartCard(), packages_core_src_index_toggletheme (+2 more)

### Community 7 - "package.json"
Cohesion: 0.11
Nodes (22): @repo-radar/core, @types/node, typescript, vitest, name, packageManager, private, type (+14 more)

### Community 8 - "core/package.json"
Cohesion: 0.06
Nodes (33): dependencies, react-redux, @reduxjs/toolkit, devDependencies, jsdom, react-dom, @testing-library/jest-dom, @testing-library/react (+25 more)

### Community 9 - "ref_vitest"
Cohesion: 0.06
Nodes (23): getRepositoryMock, searchRepositoriesMock, mockResponse(), buildHeaders(), getRepository(), mapRawRepo(), normalizeError(), ProxyResult (+15 more)

### Community 10 - "tasks"
Cohesion: 0.08
Nodes (23): dependsOn, outputs, dependsOn, outputs, cache, persistent, dependsOn, $schema (+15 more)

### Community 11 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, jsdom, react-dom, storybook, @storybook/addon-a11y, @storybook/addon-essentials, @storybook/addon-interactions, @storybook/react (+10 more)

### Community 12 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module (+7 more)

### Community 13 - "web/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, noEmit, types, extends, include, ../../tsconfig.base.json

### Community 14 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, noEmit, types, extends, include, ./tsconfig.base.json

### Community 15 - "core/tsconfig.json"
Cohesion: 0.33
Nodes (5): compilerOptions, noEmit, extends, include, ../../tsconfig.base.json

### Community 16 - "ui/tsconfig.json"
Cohesion: 0.33
Nodes (5): compilerOptions, noEmit, extends, include, ../../tsconfig.base.json

### Community 17 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, installCommand, outputDirectory, regions, rewrites

### Community 21 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 22 - "Todo: Testing Quality Bar"
Cohesion: 0.08
Nodes (25): Checkpoint: apps/web unit coverage, Checkpoint: Complete, Checkpoint: E2E + a11y, Checkpoint: Foundations, Phase 0: Foundations, Phase 2: Integration tests, Phase 3: E2E + accessibility, Phase 4: Performance + stress/large-data (+17 more)

### Community 23 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+7 more)

### Community 24 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 25 - "SearchResultsSection.tsx"
Cohesion: 0.22
Nodes (10): SearchResultsListProps, SearchResultsSection(), mockedUseRepoSearch, renderAtSearch(), renderAtSearchWith(), MIN_QUERY_LENGTH, useRepoSearch(), packages_core_src_index_usesearchrepositoriesquery (+2 more)

### Community 26 - "Task List"
Cohesion: 0.12
Nodes (16): Architecture Decisions, Checkpoint: apps/web unit coverage, Checkpoint: Complete, Checkpoint: E2E + a11y, Checkpoint: Foundations, Decisions (resolved 2026-09-20), Implementation Plan: Testing Quality Bar, Overview (+8 more)

### Community 27 - "ref_testing_library_user_event"
Cohesion: 0.29
Nodes (3): Props, State, ref_testing_library_user_event

### Community 28 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 29 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 30 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 31 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 32 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 33 - "mockGithubApi.ts"
Cohesion: 0.26
Nodes (8): assertNoA11yViolations(), mockGithubApi(), MockRepo, toRepoResponse(), REPOS, REACT, @axe-core/playwright, @playwright/test

### Community 35 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, build-storybook, check:fast, check:task, dev, e2e, format (+11 more)

### Community 39 - "ui/src/index.ts"
Cohesion: 0.20
Nodes (9): EmptyState(), EmptyStateProps, StarsBarChart(), StarsBarChartDatum, StarsBarChartProps, fewRepos, manyRepos, visuallyHidden (+1 more)

### Community 40 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, jsdom, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react, @types/react-dom (+4 more)

### Community 41 - "wait-for-vercel-preview.mjs"
Cohesion: 0.47
Nodes (5): fetchDeployments(), main(), maxAttempts, pickDeployment(), pollIntervalMs

### Community 42 - "useTrackedRepoView.ts"
Cohesion: 0.23
Nodes (11): mockedUseTrackedRepoView, TrackedRepoControls(), useTrackedRepoCacheEntries(), isSortKey(), parseIntParam(), SORT_KEYS, SortKey, TrackedRepoFilters (+3 more)

### Community 43 - "Constraints"
Cohesion: 0.29
Nodes (6): Constraints, Enforced with numbers, Exceptions, Floor (always enforced, no setup required), Measured, not yet enforced (baseline, 2026-09-20), Notes on scope

### Community 44 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, preview, test, test:coverage, typecheck

### Community 45 - "trackedRepoFlow.integration.test.tsx"
Cohesion: 0.16
Nodes (5): fetchMock, importFresh(), mockedUseTrackedRepoView, TrackedReposSection(), @tanstack/react-virtual

### Community 46 - "core/src/index.ts"
Cohesion: 0.09
Nodes (30): githubApi, SearchArgs, packages_core_src_api_githubapi_usegetrepositoryquery, packages_core_src_api_githubapi_usesearchrepositoriesquery, mergeSearchResults(), ApiError, GithubRepo, SearchReposResult (+22 more)

### Community 47 - "github-repo.js"
Cohesion: 0.29
Nodes (5): options, REPOS, options, QUERIES, ref_k6

### Community 48 - "check-lighthouse-budget.mjs"
Cohesion: 0.29
Nodes (6): lighthouse, ref_node_fs, ref_node_module, chromeLauncher, { chromium }, require

### Community 49 - "dependencies"
Cohesion: 0.67
Nodes (3): dependencies, @repo-radar/core, @sentry/node

### Community 50 - "lint-staged"
Cohesion: 0.67
Nodes (3): lint-staged, *.{json,md,yml,yaml,css,html}, *.{ts,tsx,js,jsx}

### Community 51 - "ref_testing_library_react"
Cohesion: 0.15
Nodes (5): mockedUseTrackedRepoView, fetchMock, fetchMock, packages_core_src_index_trackrepo, ref_testing_library_react

### Community 52 - "searchFlow.integration.test.tsx"
Cohesion: 0.09
Nodes (21): fetchMock, fetchMock, loadFromStorage(), saveToStorage(), persistenceMiddleware, initialState, packages_core_src_store_themeslice_settheme, THEME_STORAGE_KEY (+13 more)

### Community 53 - "store.ts"
Cohesion: 0.17
Nodes (13): App(), useAppSelector, AppDispatch, RootState, store, ThemedApp(), selectTrackedRepoCacheEntries, Header() (+5 more)

### Community 55 - "TrackedRepoCard.test.tsx"
Cohesion: 0.27
Nodes (6): useAppDispatch, fetchMock, TrackedRepoCard(), packages_core_src_index_untrackrepo, packages_core_src_index_usegetrepositoryquery, toApiError()

### Community 56 - "ErrorFallback.stories.tsx"
Cohesion: 0.24
Nodes (7): ErrorFallback(), ErrorFallbackProps, Default, meta, Story, WithErrorDetails, WithReportAction

### Community 57 - "EmptyState.stories.tsx"
Cohesion: 0.29
Nodes (6): meta, NoTrackedRepos, Story, TitleOnly, WithIconAndAction, @storybook/test

### Community 58 - "StarsBarChart.stories.tsx"
Cohesion: 0.29
Nodes (6): Default, ManyRepos, meta, SingleRepo, Story, TallBar

### Community 59 - "createAppTheme"
Cohesion: 0.43
Nodes (4): createAppTheme(), preview, withTheme(), @storybook/react

### Community 61 - "repo"
Cohesion: 0.50
Nodes (3): repo(), graphify reference: GitHub clone and cross-repo merge, Step 0 - Clone GitHub repo(s) (only if a GitHub URL was given)

## Knowledge Gaps
- **425 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `ProxyResult` (+420 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 517 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@vercel/node` connect `ref_vitest` to `package.json`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `react-router` connect `SearchResultsSection.tsx` to `web/package.json`, `Phase 1: apps/web unit coverage`, `App.tsx`, `useTrackedRepoView.ts`, `trackedRepoFlow.integration.test.tsx`, `ref_testing_library_react`, `searchFlow.integration.test.tsx`, `store.ts`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `createAppTheme` to `ui/package.json`, `core/src/index.ts`, `ErrorFallback.stories.tsx`, `EmptyState.stories.tsx`, `StarsBarChart.stories.tsx`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _425 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `Phase 1: apps/web unit coverage` be split into smaller, more focused modules?**
  _Cohesion score 0.13970588235294118 - nodes in this community are weakly interconnected._