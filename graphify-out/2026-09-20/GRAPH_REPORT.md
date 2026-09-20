# Graph Report - repo-radar-app  (2026-09-20)

## Corpus Check
- 133 files · ~31,666 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .graphify-bak 1, .example 1)

## Summary
- 759 nodes · 1217 edges · 57 communities (48 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e1152346`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- packages_core_src_index_tracked_repos_storage_key
- Repo Radar (project overview)
- web/package.json
- ui/package.json
- devDependencies
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
- RepoCard.stories.tsx
- dependencies
- graphify reference: extra exports and benchmark
- ref_testing_library_user_event
- ref_reduxjs_toolkit
- trackedRepoFlow.integration.test.tsx
- graphify reference: query, path, explain
- .prettierrc.json
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- @playwright/test
- graphify reference: transcribe video and audio
- scripts
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- store.ts
- ref_testing_library_react
- wait-for-vercel-preview.mjs
- searchFlow.integration.test.tsx
- Constraints
- scripts
- App.tsx
- core/src/index.ts
- github-repo.js
- useTrackedRepoView.ts
- EmptyState.stories.tsx
- StarsBarChart.stories.tsx
- createAppTheme
- persistenceMiddleware.ts
- ErrorFallback.stories.tsx
- @sentry/react
- AppErrorBoundary.tsx
- repo

## God Nodes (most connected - your core abstractions)
1. `scripts` - 19 edges
2. `react-router` - 17 edges
3. `useTrackedRepoView()` - 16 edges
4. `compilerOptions` - 15 edges
5. `githubApi` - 12 edges
6. `GithubRepo` - 12 edges
7. `What You Must Do When Invoked` - 12 edges
8. `useAppSelector` - 11 edges
9. `@playwright/test` - 10 edges
10. `selectTrackedFullNames()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Step 0 - Clone GitHub repo(s) (only if a GitHub URL was given)` --references--> `repo()`  [INFERRED]
  .claude/skills/graphify/references/github-and-merge.md → apps/web/src/features/search/SearchResultsSection.test.tsx
- `Header()` --indirect_call--> `selectThemeMode()`  [INFERRED]
  apps/web/src/Header.tsx → packages/core/src/store/themeSlice.ts
- `useRepoSearch()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/features/search/useRepoSearch.ts → packages/core/src/store/trackedReposSlice.ts
- `Header()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/Header.tsx → packages/core/src/store/trackedReposSlice.ts
- `ThemedApp()` --indirect_call--> `selectThemeMode()`  [INFERRED]
  apps/web/src/app/ThemedApp.tsx → packages/core/src/store/themeSlice.ts

## Import Cycles
- None detected.

## Communities (57 total, 9 thin omitted)

### Community 1 - "Repo Radar (project overview)"
Cohesion: 0.20
Nodes (11): CI Workflow (lint, typecheck, test, build, storybook), CI/CD split: Vercel handles deployment, workflow is CI-only, pnpm install --no-frozen-lockfile rationale, Node 22 required for jsdom/undici webidl compatibility, pnpm workspace packages config (apps/*, packages/*), CI/CD section, Getting Started instructions, Repo Radar (project overview) (+3 more)

### Community 2 - "web/package.json"
Cohesion: 0.07
Nodes (26): @emotion/react, @emotion/styled, jsdom, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+18 more)

### Community 3 - "ui/package.json"
Cohesion: 0.04
Nodes (44): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core, exports (+36 more)

### Community 4 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, rollup-plugin-visualizer, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react (+5 more)

### Community 5 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, @axe-core/playwright, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+13 more)

### Community 6 - "ui/src/index.ts"
Cohesion: 0.24
Nodes (9): EmptyState(), EmptyStateProps, ErrorFallbackProps, StarsBarChart(), StarsBarChartDatum, StarsBarChartProps, visuallyHidden, ref_mui_material (+1 more)

### Community 7 - "package.json"
Cohesion: 0.06
Nodes (37): dependencies, @repo-radar/core, @sentry/node, engines, node, @repo-radar/core, @types/node, typescript (+29 more)

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

### Community 22 - "RepoCard.stories.tsx"
Cohesion: 0.15
Nodes (12): ErrorState, HighCounts, Loading, meta, NoDescription, RateLimited, RefreshingInPlace, repo (+4 more)

### Community 23 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+7 more)

### Community 24 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 25 - "ref_testing_library_user_event"
Cohesion: 0.20
Nodes (6): MAX_SEARCH_QUERY_LENGTH, SearchBar(), SearchBarProps, fewRepos, manyRepos, ref_testing_library_user_event

### Community 26 - "ref_reduxjs_toolkit"
Cohesion: 0.20
Nodes (4): fetchMock, fetchMock, packages_core_src_index_trackrepo, ref_reduxjs_toolkit

### Community 27 - "trackedRepoFlow.integration.test.tsx"
Cohesion: 0.16
Nodes (5): fetchMock, importFresh(), mockedUseTrackedRepoView, TrackedReposSection(), @tanstack/react-virtual

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

### Community 33 - "@playwright/test"
Cohesion: 0.24
Nodes (8): assertNoA11yViolations(), mockGithubApi(), MockRepo, toRepoResponse(), REPOS, REACT, @playwright/test, input

### Community 35 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, build-storybook, check:fast, check:task, dev, e2e, format (+11 more)

### Community 39 - "store.ts"
Cohesion: 0.20
Nodes (9): App(), AppDispatch, RootState, store, ThemedApp(), packages_core_src_index_settheme, selectThemeMode(), ref_react_dom (+1 more)

### Community 40 - "ref_testing_library_react"
Cohesion: 0.31
Nodes (4): useSearchBox(), useDebouncedValue(), ref_react, ref_testing_library_react

### Community 41 - "wait-for-vercel-preview.mjs"
Cohesion: 0.47
Nodes (5): fetchDeployments(), main(), maxAttempts, pickDeployment(), pollIntervalMs

### Community 42 - "searchFlow.integration.test.tsx"
Cohesion: 0.16
Nodes (10): fetchMock, SearchResultsListProps, SearchResultsSection(), mockedUseRepoSearch, renderAtSearch(), renderAtSearchWith(), MIN_QUERY_LENGTH, useRepoSearch() (+2 more)

### Community 43 - "Constraints"
Cohesion: 0.29
Nodes (6): Constraints, Enforced with numbers, Exceptions, Floor (always enforced, no setup required), Measured, not yet enforced (baseline, 2026-09-20), Notes on scope

### Community 44 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, preview, test, test:coverage, typecheck

### Community 45 - "App.tsx"
Cohesion: 0.22
Nodes (5): SearchResultsSection, StarsChartCard, visuallyHidden, StarsChartCard(), mockedUseTrackedRepoView

### Community 46 - "core/src/index.ts"
Cohesion: 0.10
Nodes (25): fetchMock, TrackedRepoCard(), githubApi, SearchArgs, packages_core_src_api_githubapi_usegetrepositoryquery, packages_core_src_api_githubapi_usesearchrepositoriesquery, mergeSearchResults(), packages_core_src_index_untrackrepo (+17 more)

### Community 47 - "github-repo.js"
Cohesion: 0.29
Nodes (5): options, REPOS, options, QUERIES, ref_k6

### Community 48 - "useTrackedRepoView.ts"
Cohesion: 0.19
Nodes (16): useAppDispatch, useAppSelector, mockedUseTrackedRepoView, TrackedRepoControls(), selectTrackedRepoCacheEntries, useTrackedRepoCacheEntries(), isSortKey(), parseIntParam() (+8 more)

### Community 49 - "EmptyState.stories.tsx"
Cohesion: 0.29
Nodes (6): meta, NoTrackedRepos, Story, TitleOnly, WithIconAndAction, @storybook/test

### Community 50 - "StarsBarChart.stories.tsx"
Cohesion: 0.29
Nodes (6): Default, ManyRepos, meta, SingleRepo, Story, TallBar

### Community 51 - "createAppTheme"
Cohesion: 0.43
Nodes (4): createAppTheme(), preview, withTheme(), @storybook/react

### Community 52 - "persistenceMiddleware.ts"
Cohesion: 0.10
Nodes (20): fetchMock, loadFromStorage(), saveToStorage(), persistenceMiddleware, initialState, packages_core_src_store_themeslice_settheme, THEME_STORAGE_KEY, ThemeMode (+12 more)

### Community 53 - "ErrorFallback.stories.tsx"
Cohesion: 0.33
Nodes (5): Default, meta, Story, WithErrorDetails, WithReportAction

### Community 56 - "AppErrorBoundary.tsx"
Cohesion: 0.15
Nodes (4): AppErrorBoundary, Props, State, ErrorFallback()

### Community 59 - "repo"
Cohesion: 0.50
Nodes (3): repo(), graphify reference: GitHub clone and cross-repo merge, Step 0 - Clone GitHub repo(s) (only if a GitHub URL was given)

## Knowledge Gaps
- **393 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `input` (+388 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 484 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@vercel/node` connect `ref_vitest` to `package.json`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `react-router` connect `searchFlow.integration.test.tsx` to `web/package.json`, `store.ts`, `ref_testing_library_react`, `App.tsx`, `useTrackedRepoView.ts`, `persistenceMiddleware.ts`, `ref_reduxjs_toolkit`, `trackedRepoFlow.integration.test.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `createAppTheme` to `ui/package.json`, `EmptyState.stories.tsx`, `StarsBarChart.stories.tsx`, `ErrorFallback.stories.tsx`, `RepoCard.stories.tsx`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _393 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._