# Graph Report - repo-radar-app  (2026-09-21)

## Corpus Check
- 144 files · ~33,134 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .graphify-bak 1, .example 1)

## Summary
- 789 nodes · 1292 edges · 51 communities (42 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b727188`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- packages_core_src_index_tracked_repos_storage_key
- Repo Radar (project overview)
- web/package.json
- ui/package.json
- RepoCard.stories.tsx
- devDependencies
- useTrackedRepoView.ts
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
- useOnlineStatus.ts
- dependencies
- graphify reference: extra exports and benchmark
- StarsChartCard.tsx
- core/src/index.ts
- SearchBar.tsx
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
- ThemedApp.tsx
- release-please-config.json
- wait-for-vercel-preview.mjs
- ref_testing_library_react
- Constraints
- ui/src/index.ts
- graphify reference: GitHub clone and cross-repo merge
- EmptyState.stories.tsx
- github-repo.js
- ErrorFallback.stories.tsx
- createAppTheme
- StarsBarChart.stories.tsx

## God Nodes (most connected - your core abstractions)
1. `scripts` - 19 edges
2. `react-router` - 17 edges
3. `useTrackedRepoView()` - 17 edges
4. `compilerOptions` - 15 edges
5. `githubApi` - 13 edges
6. `GithubRepo` - 13 edges
7. `What You Must Do When Invoked` - 12 edges
8. `useAppSelector` - 11 edges
9. `trackedReposReducer` - 10 edges
10. `selectTrackedFullNames()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Header()` --indirect_call--> `selectThemeMode()`  [INFERRED]
  apps/web/src/Header.tsx → packages/core/src/store/themeSlice.ts
- `Header()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/Header.tsx → packages/core/src/store/trackedReposSlice.ts
- `ThemedApp()` --indirect_call--> `selectThemeMode()`  [INFERRED]
  apps/web/src/app/ThemedApp.tsx → packages/core/src/store/themeSlice.ts
- `ThemedApp()` --calls--> `createAppTheme()`  [EXTRACTED]
  apps/web/src/app/ThemedApp.tsx → packages/ui/src/theme/createAppTheme.ts
- `useRepoSearch()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/features/search/useRepoSearch.ts → packages/core/src/store/trackedReposSlice.ts

## Import Cycles
- None detected.

## Communities (51 total, 9 thin omitted)

### Community 1 - "Repo Radar (project overview)"
Cohesion: 0.20
Nodes (11): CI Workflow (lint, typecheck, test, build, storybook), CI/CD split: Vercel handles deployment, workflow is CI-only, pnpm install --no-frozen-lockfile rationale, Node 22 required for jsdom/undici webidl compatibility, pnpm workspace packages config (apps/*, packages/*), CI/CD section, Getting Started instructions, Repo Radar (project overview) (+3 more)

### Community 2 - "web/package.json"
Cohesion: 0.04
Nodes (47): devDependencies, jsdom, rollup-plugin-visualizer, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react (+39 more)

### Community 3 - "ui/package.json"
Cohesion: 0.04
Nodes (44): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core, exports (+36 more)

### Community 4 - "RepoCard.stories.tsx"
Cohesion: 0.06
Nodes (35): fetchMock, TrackedRepoCard(), baseQueryWithRetry, githubApi, isRetryableError(), SearchArgs, mergeSearchResults(), packages_core_src_index_untrackrepo (+27 more)

### Community 5 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, @axe-core/playwright, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+13 more)

### Community 6 - "useTrackedRepoView.ts"
Cohesion: 0.07
Nodes (41): useAppDispatch, useAppSelector, SearchResultsSection, AppDispatch, RootState, visuallyHidden, SearchResultsListProps, SearchResultsSection() (+33 more)

### Community 7 - "package.json"
Cohesion: 0.06
Nodes (37): dependencies, @repo-radar/core, @sentry/node, engines, node, @repo-radar/core, @types/node, typescript (+29 more)

### Community 8 - "core/package.json"
Cohesion: 0.06
Nodes (33): dependencies, react-redux, @reduxjs/toolkit, devDependencies, jsdom, react-dom, @testing-library/jest-dom, @testing-library/react (+25 more)

### Community 9 - "ref_vitest"
Cohesion: 0.06
Nodes (26): getRepositoryMock, searchRepositoriesMock, mockResponse(), buildHeaders(), getRepository(), mapRawRepo(), normalizeError(), ProxyResult (+18 more)

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

### Community 22 - "useOnlineStatus.ts"
Cohesion: 0.48
Nodes (4): getServerSnapshot(), getSnapshot(), subscribe(), useOnlineStatus()

### Community 23 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+7 more)

### Community 24 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 25 - "StarsChartCard.tsx"
Cohesion: 0.40
Nodes (3): StarsChartCard, StarsChartCard(), mockedUseTrackedRepoView

### Community 26 - "core/src/index.ts"
Cohesion: 0.06
Nodes (30): fetchMock, fetchMock, fetchMock, fetchMock, fetchMock, fetchMock, requestedUrl(), packages_core_src_api_githubapi_usegetrepositoryquery (+22 more)

### Community 27 - "SearchBar.tsx"
Cohesion: 0.40
Nodes (4): MAX_SEARCH_QUERY_LENGTH, SearchBar(), SearchBarProps, ref_mui_icons_material

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

### Community 39 - "ThemedApp.tsx"
Cohesion: 0.11
Nodes (11): App(), AppErrorBoundary, Props, State, store, ThemedApp(), packages_core_src_index_settheme, selectThemeMode() (+3 more)

### Community 40 - "release-please-config.json"
Cohesion: 0.40
Nodes (4): bootstrap-sha, packages, release-type, $schema

### Community 41 - "wait-for-vercel-preview.mjs"
Cohesion: 0.47
Nodes (5): fetchDeployments(), main(), maxAttempts, pickDeployment(), pollIntervalMs

### Community 42 - "ref_testing_library_react"
Cohesion: 0.18
Nodes (5): mockedUseTrackedRepoView, fewRepos, manyRepos, ref_testing_library_react, ref_testing_library_user_event

### Community 43 - "Constraints"
Cohesion: 0.29
Nodes (6): Constraints, Enforced with numbers, Exceptions, Floor (always enforced, no setup required), Measured, not yet enforced (baseline, 2026-09-20), Notes on scope

### Community 44 - "ui/src/index.ts"
Cohesion: 0.31
Nodes (6): OfflineBanner(), StarsBarChart(), StarsBarChartDatum, StarsBarChartProps, visuallyHidden, ref_mui_x_charts

### Community 46 - "EmptyState.stories.tsx"
Cohesion: 0.24
Nodes (7): EmptyState(), EmptyStateProps, meta, NoTrackedRepos, Story, TitleOnly, WithIconAndAction

### Community 47 - "github-repo.js"
Cohesion: 0.29
Nodes (5): options, REPOS, options, QUERIES, ref_k6

### Community 48 - "ErrorFallback.stories.tsx"
Cohesion: 0.22
Nodes (8): ErrorFallback(), ErrorFallbackProps, Default, meta, Story, WithErrorDetails, WithReportAction, @storybook/test

### Community 49 - "createAppTheme"
Cohesion: 0.43
Nodes (4): createAppTheme(), preview, withTheme(), @storybook/react

### Community 57 - "StarsBarChart.stories.tsx"
Cohesion: 0.29
Nodes (6): Default, ManyRepos, meta, SingleRepo, Story, TallBar

## Knowledge Gaps
- **401 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `ProxyResult` (+396 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 496 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@vercel/node` connect `ref_vitest` to `package.json`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Why does `react-router` connect `useTrackedRepoView.ts` to `web/package.json`, `core/src/index.ts`, `ThemedApp.tsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `createAppTheme` to `ui/package.json`, `RepoCard.stories.tsx`, `EmptyState.stories.tsx`, `ErrorFallback.stories.tsx`, `StarsBarChart.stories.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _401 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `RepoCard.stories.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06274509803921569 - nodes in this community are weakly interconnected._