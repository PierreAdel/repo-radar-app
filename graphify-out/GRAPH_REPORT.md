# Graph Report - repo-radar-app  (2026-09-20)

## Corpus Check
- 134 files · ~36,044 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .graphify-bak 1, .example 1)

## Summary
- 810 nodes · 1276 edges · 64 communities (53 shown, 11 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `21fcd7da`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- packages_core_src_index_tracked_repos_storage_key
- Repo Radar (project overview)
- web/package.json
- ui/package.json
- searchFlow.integration.test.tsx
- devDependencies
- ui/src/index.ts
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
- AppErrorBoundary
- Task List
- trackedRepoFlow.integration.test.tsx
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
- ref_testing_library_react
- devDependencies
- wait-for-vercel-preview.mjs
- SearchResultsSection.tsx
- Constraints
- scripts
- App.tsx
- core/src/index.ts
- github-repo.js
- useTrackedRepoView.ts
- store.ts
- EmptyState.stories.tsx
- ErrorFallback.stories.tsx
- persistenceMiddleware.ts
- Header.tsx
- eslint.config.js
- ref_testing_library_user_event
- StarsBarChart.stories.tsx
- ref_mui_material
- check-lighthouse-budget.mjs
- repo
- dependencies
- lint-staged
- engines
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
- `Task 8: search feature components (+ snapshots)` --references--> `useSearchBox()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/search/useSearchBox.ts
- `Task 18: e2e — sort/filter controls` --references--> `mockGithubApi()`  [INFERRED]
  tasks/todo.md → e2e/mockGithubApi.ts
- `Task 13: integration — search flow` --references--> `Header()`  [INFERRED]
  tasks/todo.md → apps/web/src/Header.tsx
- `Task 13: integration — search flow` --references--> `SearchResultsSection()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/search/SearchResultsSection.tsx
- `Task 19: accessibility — axe assertions on the 3 flows` --references--> `TrackedRepoControls()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/tracked-repos/TrackedRepoControls.tsx

## Import Cycles
- None detected.

## Communities (64 total, 11 thin omitted)

### Community 1 - "Repo Radar (project overview)"
Cohesion: 0.20
Nodes (11): CI Workflow (lint, typecheck, test, build, storybook), CI/CD split: Vercel handles deployment, workflow is CI-only, pnpm install --no-frozen-lockfile rationale, Node 22 required for jsdom/undici webidl compatibility, pnpm workspace packages config (apps/*, packages/*), CI/CD section, Getting Started instructions, Repo Radar (project overview) (+3 more)

### Community 2 - "web/package.json"
Cohesion: 0.07
Nodes (26): @emotion/react, @emotion/styled, jsdom, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+18 more)

### Community 3 - "ui/package.json"
Cohesion: 0.04
Nodes (44): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core, exports (+36 more)

### Community 4 - "searchFlow.integration.test.tsx"
Cohesion: 0.18
Nodes (3): fetchMock, fetchMock, persistenceMiddleware

### Community 5 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, @axe-core/playwright, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+13 more)

### Community 6 - "ui/src/index.ts"
Cohesion: 0.24
Nodes (7): StarsBarChart(), StarsBarChartDatum, StarsBarChartProps, fewRepos, manyRepos, visuallyHidden, ref_mui_x_charts

### Community 7 - "package.json"
Cohesion: 0.12
Nodes (16): @repo-radar/core, @types/node, typescript, vitest, name, packageManager, private, type (+8 more)

### Community 8 - "core/package.json"
Cohesion: 0.06
Nodes (33): dependencies, react-redux, @reduxjs/toolkit, devDependencies, jsdom, react-dom, @testing-library/jest-dom, @testing-library/react (+25 more)

### Community 9 - "ref_vitest"
Cohesion: 0.06
Nodes (25): getRepositoryMock, searchRepositoriesMock, mockResponse(), buildHeaders(), getRepository(), mapRawRepo(), normalizeError(), ProxyResult (+17 more)

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
Cohesion: 0.29
Nodes (6): buildCommand, headers, installCommand, outputDirectory, regions, rewrites

### Community 21 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 22 - "Todo: Testing Quality Bar"
Cohesion: 0.06
Nodes (33): StarsChartCard(), mockedUseTrackedRepoView, Checkpoint: apps/web unit coverage, Checkpoint: Complete, Checkpoint: E2E + a11y, Checkpoint: Foundations, Phase 0: Foundations, Phase 1: apps/web unit coverage (+25 more)

### Community 23 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+7 more)

### Community 24 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 26 - "Task List"
Cohesion: 0.12
Nodes (16): Architecture Decisions, Checkpoint: apps/web unit coverage, Checkpoint: Complete, Checkpoint: E2E + a11y, Checkpoint: Foundations, Decisions (resolved 2026-09-20), Implementation Plan: Testing Quality Bar, Overview (+8 more)

### Community 27 - "trackedRepoFlow.integration.test.tsx"
Cohesion: 0.12
Nodes (9): fetchMock, importFresh(), mockedUseTrackedRepoView, TrackedReposSection(), TRACKED_REPOS_STORAGE_KEY, @tanstack/react-virtual, Phase 2: Integration tests, Task 13: integration — search flow (+1 more)

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
Cohesion: 0.28
Nodes (7): assertNoA11yViolations(), mockGithubApi(), MockRepo, toRepoResponse(), REPOS, REACT, @playwright/test

### Community 35 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, build-storybook, check:fast, check:task, dev, e2e, format (+11 more)

### Community 39 - "ref_testing_library_react"
Cohesion: 0.17
Nodes (8): App(), store, useSearchBox(), useDebouncedValue(), packages_core_src_index_settheme, ref_react_redux, react-router, ref_testing_library_react

### Community 40 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, rollup-plugin-visualizer, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react (+5 more)

### Community 41 - "wait-for-vercel-preview.mjs"
Cohesion: 0.47
Nodes (5): fetchDeployments(), main(), maxAttempts, pickDeployment(), pollIntervalMs

### Community 42 - "SearchResultsSection.tsx"
Cohesion: 0.20
Nodes (10): useAppDispatch, SearchResultsListProps, SearchResultsSection(), mockedUseRepoSearch, renderAtSearch(), renderAtSearchWith(), MIN_QUERY_LENGTH, useRepoSearch() (+2 more)

### Community 43 - "Constraints"
Cohesion: 0.29
Nodes (6): Constraints, Enforced with numbers, Exceptions, Floor (always enforced, no setup required), Measured, not yet enforced (baseline, 2026-09-20), Notes on scope

### Community 44 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, preview, test, test:coverage, typecheck

### Community 45 - "App.tsx"
Cohesion: 0.22
Nodes (9): useAppSelector, SearchResultsSection, StarsChartCard, ThemedApp(), visuallyHidden, Header(), selectThemeMode(), ref_react (+1 more)

### Community 46 - "core/src/index.ts"
Cohesion: 0.07
Nodes (36): fetchMock, TrackedRepoCard(), SearchArgs, packages_core_src_api_githubapi_usegetrepositoryquery, packages_core_src_api_githubapi_usesearchrepositoriesquery, mergeSearchResults(), packages_core_src_index_untrackrepo, packages_core_src_index_usegetrepositoryquery (+28 more)

### Community 47 - "github-repo.js"
Cohesion: 0.29
Nodes (5): options, REPOS, options, QUERIES, ref_k6

### Community 48 - "useTrackedRepoView.ts"
Cohesion: 0.25
Nodes (10): mockedUseTrackedRepoView, TrackedRepoControls(), useTrackedRepoCacheEntries(), isSortKey(), parseIntParam(), SORT_KEYS, SortKey, TrackedRepoFilters (+2 more)

### Community 49 - "store.ts"
Cohesion: 0.18
Nodes (8): AppDispatch, RootState, selectTrackedRepoCacheEntries, fetchMock, fetchMock, githubApi, packages_core_src_index_trackrepo, ref_reduxjs_toolkit

### Community 50 - "EmptyState.stories.tsx"
Cohesion: 0.22
Nodes (8): EmptyState(), EmptyStateProps, meta, NoTrackedRepos, Story, TitleOnly, WithIconAndAction, @storybook/react

### Community 51 - "ErrorFallback.stories.tsx"
Cohesion: 0.22
Nodes (8): ErrorFallback(), ErrorFallbackProps, Default, meta, Story, WithErrorDetails, WithReportAction, @storybook/test

### Community 52 - "persistenceMiddleware.ts"
Cohesion: 0.13
Nodes (17): loadFromStorage(), saveToStorage(), initialState, packages_core_src_store_themeslice_settheme, THEME_STORAGE_KEY, ThemeMode, themeReducer, themeSlice (+9 more)

### Community 53 - "Header.tsx"
Cohesion: 0.36
Nodes (5): MAX_SEARCH_QUERY_LENGTH, SearchBar(), SearchBarProps, packages_core_src_index_toggletheme, ref_mui_icons_material

### Community 54 - "eslint.config.js"
Cohesion: 0.25
Nodes (7): eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 55 - "ref_testing_library_user_event"
Cohesion: 0.29
Nodes (3): Props, State, ref_testing_library_user_event

### Community 56 - "StarsBarChart.stories.tsx"
Cohesion: 0.29
Nodes (6): Default, ManyRepos, meta, SingleRepo, Story, TallBar

### Community 57 - "ref_mui_material"
Cohesion: 0.48
Nodes (4): createAppTheme(), preview, withTheme(), ref_mui_material

### Community 58 - "check-lighthouse-budget.mjs"
Cohesion: 0.29
Nodes (6): lighthouse, ref_node_fs, ref_node_module, chromeLauncher, { chromium }, require

### Community 59 - "repo"
Cohesion: 0.50
Nodes (3): repo(), graphify reference: GitHub clone and cross-repo merge, Step 0 - Clone GitHub repo(s) (only if a GitHub URL was given)

### Community 60 - "dependencies"
Cohesion: 0.67
Nodes (3): dependencies, @repo-radar/core, @sentry/node

### Community 61 - "lint-staged"
Cohesion: 0.67
Nodes (3): lint-staged, *.{json,md,yml,yaml,css,html}, *.{ts,tsx,js,jsx}

## Knowledge Gaps
- **428 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `ProxyResult` (+423 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 521 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@vercel/node` connect `ref_vitest` to `package.json`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `react-router` connect `ref_testing_library_react` to `web/package.json`, `searchFlow.integration.test.tsx`, `SearchResultsSection.tsx`, `App.tsx`, `useTrackedRepoView.ts`, `store.ts`, `Header.tsx`, `trackedRepoFlow.integration.test.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `EmptyState.stories.tsx` to `ui/package.json`, `core/src/index.ts`, `ErrorFallback.stories.tsx`, `StarsBarChart.stories.tsx`, `ref_mui_material`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _428 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._