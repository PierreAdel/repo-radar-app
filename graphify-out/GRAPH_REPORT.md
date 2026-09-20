# Graph Report - repo-radar-app  (2026-09-21)

## Corpus Check
- 145 files · ~33,370 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .graphify-bak 1, .example 1)

## Summary
- 791 nodes · 1293 edges · 57 communities (44 shown, 13 thin omitted)
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
- App.tsx
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
- devDependencies
- dependencies
- graphify reference: extra exports and benchmark
- useTrackedRepoView.ts
- core/src/index.ts
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
- AppErrorBoundary.tsx
- release-please-config.json
- wait-for-vercel-preview.mjs
- scripts
- Constraints
- StarsBarChart.tsx
- graphify reference: GitHub clone and cross-repo merge
- ui/src/index.ts
- github-repo.js
- EmptyState.stories.tsx
- createAppTheme
- dependencies
- scripts
- main.ts
- @sentry/react
- CHANGELOG.md
- peerDependencies
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
- `Header()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/Header.tsx → packages/core/src/store/trackedReposSlice.ts
- `Header()` --indirect_call--> `selectThemeMode()`  [INFERRED]
  apps/web/src/Header.tsx → packages/core/src/store/themeSlice.ts
- `ThemedApp()` --indirect_call--> `selectThemeMode()`  [INFERRED]
  apps/web/src/app/ThemedApp.tsx → packages/core/src/store/themeSlice.ts
- `ThemedApp()` --calls--> `createAppTheme()`  [EXTRACTED]
  apps/web/src/app/ThemedApp.tsx → packages/ui/src/theme/createAppTheme.ts
- `useRepoSearch()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/features/search/useRepoSearch.ts → packages/core/src/store/trackedReposSlice.ts

## Import Cycles
- None detected.

## Communities (57 total, 13 thin omitted)

### Community 1 - "Repo Radar (project overview)"
Cohesion: 0.20
Nodes (11): CI Workflow (lint, typecheck, test, build, storybook), CI/CD split: Vercel handles deployment, workflow is CI-only, pnpm install --no-frozen-lockfile rationale, Node 22 required for jsdom/undici webidl compatibility, pnpm workspace packages config (apps/*, packages/*), CI/CD section, Getting Started instructions, Repo Radar (project overview) (+3 more)

### Community 2 - "web/package.json"
Cohesion: 0.07
Nodes (26): @emotion/react, @emotion/styled, jsdom, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+18 more)

### Community 3 - "ui/package.json"
Cohesion: 0.07
Nodes (26): exports, @emotion/react, @emotion/styled, jsdom, @mui/icons-material, @mui/material, @mui/x-charts, react (+18 more)

### Community 4 - "RepoCard.stories.tsx"
Cohesion: 0.08
Nodes (30): baseQueryWithRetry, githubApi, isRetryableError(), SearchArgs, mergeSearchResults(), ApiError, GithubRepo, SearchReposResult (+22 more)

### Community 5 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, @axe-core/playwright, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+13 more)

### Community 6 - "App.tsx"
Cohesion: 0.06
Nodes (36): App(), SearchResultsSection, StarsChartCard, store, ThemedApp(), getServerSnapshot(), getSnapshot(), subscribe() (+28 more)

### Community 7 - "package.json"
Cohesion: 0.06
Nodes (36): dependencies, @repo-radar/core, @sentry/node, engines, node, @repo-radar/core, @types/node, typescript (+28 more)

### Community 8 - "core/package.json"
Cohesion: 0.06
Nodes (33): dependencies, react-redux, @reduxjs/toolkit, devDependencies, jsdom, react-dom, @testing-library/jest-dom, @testing-library/react (+25 more)

### Community 9 - "githubProxy.ts"
Cohesion: 0.08
Nodes (22): getRepositoryMock, searchRepositoriesMock, mockResponse(), buildHeaders(), getRepository(), mapRawRepo(), normalizeError(), ProxyResult (+14 more)

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

### Community 22 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, rollup-plugin-visualizer, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react (+5 more)

### Community 23 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+7 more)

### Community 24 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 25 - "useTrackedRepoView.ts"
Cohesion: 0.08
Nodes (27): useAppDispatch, useAppSelector, RootState, useRepoSearch(), StarsChartCard(), mockedUseTrackedRepoView, CacheEntries, selectDerivedTrackedRepoView (+19 more)

### Community 26 - "core/src/index.ts"
Cohesion: 0.05
Nodes (34): AppDispatch, fetchMock, fetchMock, fetchMock, fetchMock, fetchMock, fetchMock, requestedUrl() (+26 more)

### Community 27 - "ref_testing_library_user_event"
Cohesion: 0.33
Nodes (5): MAX_SEARCH_QUERY_LENGTH, SearchBar(), SearchBarProps, ref_mui_icons_material, ref_testing_library_user_event

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

### Community 39 - "AppErrorBoundary.tsx"
Cohesion: 0.17
Nodes (3): AppErrorBoundary, Props, State

### Community 40 - "release-please-config.json"
Cohesion: 0.40
Nodes (4): bootstrap-sha, packages, release-type, $schema

### Community 41 - "wait-for-vercel-preview.mjs"
Cohesion: 0.47
Nodes (5): fetchDeployments(), main(), maxAttempts, pickDeployment(), pollIntervalMs

### Community 42 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, preview, test, test:coverage, typecheck

### Community 43 - "Constraints"
Cohesion: 0.29
Nodes (6): Constraints, Enforced with numbers, Exceptions, Floor (always enforced, no setup required), Measured, not yet enforced (baseline, 2026-09-20), Notes on scope

### Community 44 - "StarsBarChart.tsx"
Cohesion: 0.22
Nodes (7): StarsBarChart(), StarsBarChartDatum, StarsBarChartProps, fewRepos, manyRepos, visuallyHidden, ref_mui_x_charts

### Community 46 - "ui/src/index.ts"
Cohesion: 0.39
Nodes (4): EmptyState(), EmptyStateProps, ErrorFallback(), ErrorFallbackProps

### Community 47 - "github-repo.js"
Cohesion: 0.29
Nodes (5): options, REPOS, options, QUERIES, ref_k6

### Community 48 - "EmptyState.stories.tsx"
Cohesion: 0.15
Nodes (12): meta, NoTrackedRepos, Story, TitleOnly, WithIconAndAction, Default, meta, Story (+4 more)

### Community 49 - "createAppTheme"
Cohesion: 0.53
Nodes (3): createAppTheme(), preview, withTheme()

### Community 50 - "dependencies"
Cohesion: 0.29
Nodes (7): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core

### Community 51 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build-storybook, lint, storybook, test, test:coverage, typecheck

### Community 57 - "StarsBarChart.stories.tsx"
Cohesion: 0.29
Nodes (6): Default, ManyRepos, meta, SingleRepo, Story, TallBar

## Knowledge Gaps
- **402 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `ProxyResult` (+397 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 498 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@vercel/node` connect `githubProxy.ts` to `package.json`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Why does `react-router` connect `App.tsx` to `useTrackedRepoView.ts`, `web/package.json`, `core/src/index.ts`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `EmptyState.stories.tsx` to `StarsBarChart.stories.tsx`, `ui/package.json`, `RepoCard.stories.tsx`, `createAppTheme`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _402 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `RepoCard.stories.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08076923076923077 - nodes in this community are weakly interconnected._