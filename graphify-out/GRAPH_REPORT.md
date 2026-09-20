# Graph Report - repo-radar-app  (2026-09-20)

## Corpus Check
- 132 files · ~35,697 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .graphify-bak 1, .example 1)

## Summary
- 805 nodes · 1262 edges · 52 communities (43 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8cff560a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- packages_core_src_index_tracked_repos_storage_key
- Repo Radar (project overview)
- web/package.json
- ui/package.json
- Header.tsx
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
- ref_react
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
- react-router
- devDependencies
- wait-for-vercel-preview.mjs
- Constraints
- scripts
- RepoCard.stories.tsx
- github-repo.js
- TrackedRepoCard.test.tsx
- store.ts
- core/src/index.ts
- useTrackedRepoView.ts
- ref_testing_library_react
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
9. `Task List` - 11 edges
10. `Todo: Testing Quality Bar` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Task 8: search feature components (+ snapshots)` --references--> `useSearchBox()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/search/useSearchBox.ts
- `Task 18: e2e — sort/filter controls` --references--> `mockGithubApi()`  [INFERRED]
  tasks/todo.md → e2e/mockGithubApi.ts
- `Task 19: accessibility — axe assertions on the 3 flows` --references--> `SearchResultsSection()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/search/SearchResultsSection.tsx
- `Task 19: accessibility — axe assertions on the 3 flows` --references--> `TrackedRepoControls()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/tracked-repos/TrackedRepoControls.tsx
- `Task 14: integration — track-repo flow` --references--> `loadFromStorage()`  [INFERRED]
  tasks/todo.md → packages/core/src/store/persistence.ts

## Import Cycles
- None detected.

## Communities (52 total, 9 thin omitted)

### Community 1 - "Repo Radar (project overview)"
Cohesion: 0.20
Nodes (11): CI Workflow (lint, typecheck, test, build, storybook), CI/CD split: Vercel handles deployment, workflow is CI-only, pnpm install --no-frozen-lockfile rationale, Node 22 required for jsdom/undici webidl compatibility, pnpm workspace packages config (apps/*, packages/*), CI/CD section, Getting Started instructions, Repo Radar (project overview) (+3 more)

### Community 2 - "web/package.json"
Cohesion: 0.07
Nodes (26): @emotion/react, @emotion/styled, jsdom, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+18 more)

### Community 3 - "ui/package.json"
Cohesion: 0.04
Nodes (44): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core, exports (+36 more)

### Community 4 - "Header.tsx"
Cohesion: 0.16
Nodes (15): useAppDispatch, useAppSelector, SearchResultsSection, SearchResultsListProps, SearchResultsSection(), mockedUseRepoSearch, renderAtSearch(), renderAtSearchWith() (+7 more)

### Community 5 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, @axe-core/playwright, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+13 more)

### Community 6 - "ui/src/index.ts"
Cohesion: 0.06
Nodes (33): EmptyState(), EmptyStateProps, meta, NoTrackedRepos, Story, TitleOnly, WithIconAndAction, ErrorFallback() (+25 more)

### Community 7 - "package.json"
Cohesion: 0.06
Nodes (36): dependencies, @repo-radar/core, @sentry/node, engines, node, @repo-radar/core, @types/node, typescript (+28 more)

### Community 8 - "core/package.json"
Cohesion: 0.06
Nodes (33): dependencies, react-redux, @reduxjs/toolkit, devDependencies, jsdom, react-dom, @testing-library/jest-dom, @testing-library/react (+25 more)

### Community 9 - "ref_vitest"
Cohesion: 0.07
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
Cohesion: 0.06
Nodes (30): Checkpoint: apps/web unit coverage, Checkpoint: Complete, Checkpoint: E2E + a11y, Checkpoint: Foundations, Phase 0: Foundations, Phase 1: apps/web unit coverage, Phase 3: E2E + accessibility, Phase 4: Performance + stress/large-data (+22 more)

### Community 23 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+7 more)

### Community 24 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 26 - "Task List"
Cohesion: 0.12
Nodes (16): Architecture Decisions, Checkpoint: apps/web unit coverage, Checkpoint: Complete, Checkpoint: E2E + a11y, Checkpoint: Foundations, Decisions (resolved 2026-09-20), Implementation Plan: Testing Quality Bar, Overview (+8 more)

### Community 27 - "ref_react"
Cohesion: 0.19
Nodes (6): Props, State, useSearchBox(), useDebouncedValue(), ref_react, @sentry/react

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

### Community 39 - "react-router"
Cohesion: 0.24
Nodes (7): App(), store, ThemedApp(), packages_core_src_index_settheme, ref_react_dom, ref_react_redux, react-router

### Community 40 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, rollup-plugin-visualizer, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react (+5 more)

### Community 41 - "wait-for-vercel-preview.mjs"
Cohesion: 0.47
Nodes (5): fetchDeployments(), main(), maxAttempts, pickDeployment(), pollIntervalMs

### Community 43 - "Constraints"
Cohesion: 0.29
Nodes (6): Constraints, Enforced with numbers, Exceptions, Floor (always enforced, no setup required), Measured, not yet enforced (baseline, 2026-09-20), Notes on scope

### Community 44 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, preview, test, test:coverage, typecheck

### Community 46 - "RepoCard.stories.tsx"
Cohesion: 0.08
Nodes (28): SearchArgs, mergeSearchResults(), ApiError, GithubRepo, SearchReposResult, compactNumberFormatter, DIVISIONS, formatCompactNumber() (+20 more)

### Community 47 - "github-repo.js"
Cohesion: 0.29
Nodes (5): options, REPOS, options, QUERIES, ref_k6

### Community 48 - "TrackedRepoCard.test.tsx"
Cohesion: 0.24
Nodes (5): fetchMock, TrackedRepoCard(), packages_core_src_index_untrackrepo, packages_core_src_index_usegetrepositoryquery, toApiError()

### Community 50 - "store.ts"
Cohesion: 0.17
Nodes (7): AppDispatch, RootState, selectTrackedRepoCacheEntries, fetchMock, fetchMock, githubApi, packages_core_src_index_trackrepo

### Community 52 - "core/src/index.ts"
Cohesion: 0.07
Nodes (28): fetchMock, fetchMock, fetchMock, fetchMock, requestedUrl(), packages_core_src_api_githubapi_usegetrepositoryquery, packages_core_src_api_githubapi_usesearchrepositoriesquery, loadFromStorage() (+20 more)

### Community 53 - "useTrackedRepoView.ts"
Cohesion: 0.11
Nodes (20): StarsChartCard, visuallyHidden, StarsChartCard(), mockedUseTrackedRepoView, TrackedRepoControls(), importFresh(), mockedUseTrackedRepoView, TrackedReposSection() (+12 more)

### Community 56 - "ref_testing_library_react"
Cohesion: 0.22
Nodes (6): MAX_SEARCH_QUERY_LENGTH, SearchBar(), SearchBarProps, mockedUseTrackedRepoView, ref_mui_icons_material, ref_testing_library_react

### Community 61 - "repo"
Cohesion: 0.50
Nodes (3): repo(), graphify reference: GitHub clone and cross-repo merge, Step 0 - Clone GitHub repo(s) (only if a GitHub URL was given)

## Knowledge Gaps
- **427 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `ProxyResult` (+422 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 520 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@vercel/node` connect `ref_vitest` to `package.json`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `react-router` connect `react-router` to `web/package.json`, `Header.tsx`, `store.ts`, `core/src/index.ts`, `useTrackedRepoView.ts`, `ref_react`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `ui/src/index.ts` to `ui/package.json`, `RepoCard.stories.tsx`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _427 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._