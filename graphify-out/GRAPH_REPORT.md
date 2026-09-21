# Graph Report - repo-radar-app  (2026-09-21)

## Corpus Check
- 146 files · ~45,318 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 5, .graphify-bak 1, .example 1)

## Summary
- 808 nodes · 1317 edges · 60 communities (46 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cdce8fc0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- packages_core_src_index_tracked_repos_storage_key
- Repo Radar (project overview)
- web/package.json
- ui/package.json
- RepoCard.tsx
- devDependencies
- githubApi
- package.json
- core/package.json
- githubProxy.ts
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
- ref_react
- dependencies
- graphify reference: extra exports and benchmark
- useTrackedRepoView.ts
- core/src/index.ts
- SearchResultsSection.tsx
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
- RepoCard.stories.tsx
- release-please-config.json
- wait-for-vercel-preview.mjs
- themeSlice.ts
- ref_vitest
- ref_mui_material
- graphify reference: GitHub clone and cross-repo merge
- useRepoSearch.test.tsx
- github-repo.js
- ref_reduxjs_toolkit
- ref_playwright_core
- ui/src/index.ts
- Constraints
- ref_testing_library_react
- AppErrorBoundary
- CHANGELOG.md
- Header.tsx
- App.tsx
- useOnlineStatus.ts
- StarsBarChart.test.tsx
- isSafeHttpUrl

## God Nodes (most connected - your core abstractions)
1. `scripts` - 20 edges
2. `react-router` - 17 edges
3. `useTrackedRepoView()` - 17 edges
4. `compilerOptions` - 15 edges
5. `githubApi` - 13 edges
6. `GithubRepo` - 13 edges
7. `What You Must Do When Invoked` - 12 edges
8. `useAppSelector` - 11 edges
9. `@playwright/test` - 10 edges
10. `trackedReposReducer` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Enforced with numbers` --references--> `StarsBarChart()`  [INFERRED]
  CONSTRAINTS.md → packages/ui/src/StarsBarChart.tsx
- `Enforced with numbers` --references--> `OfflineBanner()`  [INFERRED]
  CONSTRAINTS.md → packages/ui/src/OfflineBanner.tsx
- `Header()` --indirect_call--> `selectThemeMode()`  [INFERRED]
  apps/web/src/Header.tsx → packages/core/src/store/themeSlice.ts
- `useRepoSearch()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/features/search/useRepoSearch.ts → packages/core/src/store/trackedReposSlice.ts
- `Header()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/Header.tsx → packages/core/src/store/trackedReposSlice.ts

## Import Cycles
- None detected.

## Communities (60 total, 14 thin omitted)

### Community 1 - "Repo Radar (project overview)"
Cohesion: 0.20
Nodes (11): CI Workflow (lint, typecheck, test, build, storybook), CI/CD split: Vercel handles deployment, workflow is CI-only, pnpm install --no-frozen-lockfile rationale, Node 22 required for jsdom/undici webidl compatibility, pnpm workspace packages config (apps/*, packages/*), CI/CD section, Getting Started instructions, Repo Radar (project overview) (+3 more)

### Community 2 - "web/package.json"
Cohesion: 0.04
Nodes (48): devDependencies, jsdom, rollup-plugin-visualizer, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react (+40 more)

### Community 3 - "ui/package.json"
Cohesion: 0.04
Nodes (45): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core, exports (+37 more)

### Community 4 - "RepoCard.tsx"
Cohesion: 0.21
Nodes (12): ApiError, GithubRepo, compactNumberFormatter, DIVISIONS, formatCompactNumber(), formatRelativeTime(), relativeTimeFormatter, RepoCard (+4 more)

### Community 5 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, @axe-core/playwright, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+13 more)

### Community 6 - "githubApi"
Cohesion: 0.33
Nodes (6): baseQueryWithRetry, githubApi, isRetryableError(), SearchArgs, mergeSearchResults(), SearchReposResult

### Community 7 - "package.json"
Cohesion: 0.06
Nodes (37): dependencies, @repo-radar/core, @sentry/node, engines, node, @repo-radar/core, @types/node, typescript (+29 more)

### Community 8 - "core/package.json"
Cohesion: 0.06
Nodes (34): dependencies, react-redux, @reduxjs/toolkit, devDependencies, jsdom, react-dom, @testing-library/jest-dom, @testing-library/react (+26 more)

### Community 9 - "githubProxy.ts"
Cohesion: 0.06
Nodes (26): getRepositoryMock, searchRepositoriesMock, mockResponse(), buildHeaders(), getRepository(), mapRawRepo(), normalizeError(), ProxyResult (+18 more)

### Community 10 - "tasks"
Cohesion: 0.08
Nodes (25): dependsOn, outputs, dependsOn, outputs, cache, persistent, dependsOn, $schema (+17 more)

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

### Community 22 - "ref_react"
Cohesion: 0.21
Nodes (6): Props, State, ErrorFallback(), ErrorFallbackProps, ref_react, ref_testing_library_user_event

### Community 23 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+7 more)

### Community 24 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 25 - "useTrackedRepoView.ts"
Cohesion: 0.08
Nodes (30): useAppDispatch, useAppSelector, AppDispatch, RootState, StarsChartCard(), mockedUseTrackedRepoView, CacheEntries, selectDerivedTrackedRepoView (+22 more)

### Community 26 - "core/src/index.ts"
Cohesion: 0.21
Nodes (13): packages_core_src_api_githubapi_usegetrepositoryquery, packages_core_src_api_githubapi_usesearchrepositoriesquery, persistenceMiddleware, packages_core_src_store_themeslice_settheme, packages_core_src_store_themeslice_toggletheme, initialState, selectIsTracked(), TRACKED_REPOS_STORAGE_KEY (+5 more)

### Community 27 - "SearchResultsSection.tsx"
Cohesion: 0.19
Nodes (9): SearchResultsSection, SearchResultsListProps, SearchResultsSection(), mockedUseRepoSearch, renderAtSearch(), renderAtSearchWith(), MIN_QUERY_LENGTH, useRepoSearch() (+1 more)

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
Cohesion: 0.28
Nodes (7): assertNoA11yViolations(), mockGithubApi(), MockRepo, toRepoResponse(), REPOS, REACT, @playwright/test

### Community 35 - "scripts"
Cohesion: 0.10
Nodes (20): scripts, build, build-storybook, check:fast, check:task, dev, e2e, format (+12 more)

### Community 39 - "RepoCard.stories.tsx"
Cohesion: 0.06
Nodes (30): meta, NoTrackedRepos, Story, TitleOnly, WithIconAndAction, Default, meta, Story (+22 more)

### Community 40 - "release-please-config.json"
Cohesion: 0.40
Nodes (4): bootstrap-sha, packages, release-type, $schema

### Community 41 - "wait-for-vercel-preview.mjs"
Cohesion: 0.47
Nodes (5): fetchDeployments(), main(), maxAttempts, pickDeployment(), pollIntervalMs

### Community 42 - "themeSlice.ts"
Cohesion: 0.20
Nodes (8): loadFromStorage(), saveToStorage(), initialState, THEME_STORAGE_KEY, ThemeMode, themeReducer, themeSlice, ThemeState

### Community 43 - "ref_vitest"
Cohesion: 0.14
Nodes (4): fetchMock, fetchMock, requestedUrl(), ref_vitest

### Community 44 - "ref_mui_material"
Cohesion: 0.31
Nodes (7): App(), ThemedApp(), selectThemeMode(), createAppTheme(), preview, withTheme(), ref_mui_material

### Community 47 - "github-repo.js"
Cohesion: 0.29
Nodes (5): options, REPOS, options, QUERIES, ref_k6

### Community 48 - "ref_reduxjs_toolkit"
Cohesion: 0.24
Nodes (5): fetchMock, packages_core_src_index_untrackrepo, packages_core_src_index_usegetrepositoryquery, toApiError(), ref_reduxjs_toolkit

### Community 50 - "ui/src/index.ts"
Cohesion: 0.29
Nodes (7): EmptyState(), EmptyStateProps, StarsBarChart(), StarsBarChartDatum, StarsBarChartProps, visuallyHidden, ref_mui_x_charts

### Community 51 - "Constraints"
Cohesion: 0.22
Nodes (7): Constraints, Enforced with numbers, Exceptions, Floor (always enforced, no setup required), Measured coverage (baseline 2026-09-20, updated 2026-09-21), Notes on scope, OfflineBanner()

### Community 52 - "ref_testing_library_react"
Cohesion: 0.09
Nodes (12): store, useSearchBox(), fetchMock, fetchMock, fetchMock, useDebouncedValue(), packages_core_src_index_settheme, packages_core_src_index_trackrepo (+4 more)

### Community 53 - "AppErrorBoundary"
Cohesion: 0.25
Nodes (3): AppErrorBoundary, loadSentry(), @sentry/react

### Community 55 - "Header.tsx"
Cohesion: 0.36
Nodes (5): MAX_SEARCH_QUERY_LENGTH, SearchBar(), SearchBarProps, packages_core_src_index_toggletheme, ref_mui_icons_material

### Community 56 - "App.tsx"
Cohesion: 0.33
Nodes (3): StarsChartCard, visuallyHidden, StarsChartCardProps

### Community 57 - "useOnlineStatus.ts"
Cohesion: 0.48
Nodes (4): getServerSnapshot(), getSnapshot(), subscribe(), useOnlineStatus()

## Knowledge Gaps
- **410 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `ProxyResult` (+405 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 507 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@vercel/node` connect `githubProxy.ts` to `package.json`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `react-router` connect `ref_testing_library_react` to `web/package.json`, `ref_vitest`, `useRepoSearch.test.tsx`, `Header.tsx`, `App.tsx`, `useTrackedRepoView.ts`, `SearchResultsSection.tsx`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `RepoCard.stories.tsx` to `ui/package.json`, `ref_mui_material`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _410 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._