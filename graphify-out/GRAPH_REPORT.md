# Graph Report - repo-radar-app  (2026-09-20)

## Corpus Check
- 120 files · ~31,544 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .graphify-bak 1, .example 1)

## Summary
- 755 nodes · 1186 edges · 48 communities (39 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2f1df6f4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- packages_core_src_index_tracked_repos_storage_key
- Repo Radar (project overview)
- web/package.json
- ui/package.json
- core/src/index.ts
- package.json
- ref_vitest
- Header.tsx
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
- Todo: Testing Quality Bar
- dependencies
- graphify reference: extra exports and benchmark
- repo
- Task List
- useTrackedRepoView.ts
- graphify reference: query, path, explain
- .prettierrc.json
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- scripts
- graphify reference: transcribe video and audio
- SearchResultsSection.tsx
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- ui/src/index.ts
- AppErrorBoundary.tsx
- Constraints
- react-router
- store.ts
- devDependencies
- scripts
- trackedRepoFlow.integration.test.tsx
- ref_testing_library_react

## God Nodes (most connected - your core abstractions)
1. `react-router` - 17 edges
2. `useTrackedRepoView()` - 16 edges
3. `scripts` - 15 edges
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
- `Task 13: integration — search flow` --references--> `SearchBar()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/search/SearchBar.tsx
- `Step 0 - Clone GitHub repo(s) (only if a GitHub URL was given)` --references--> `repo()`  [INFERRED]
  .claude/skills/graphify/references/github-and-merge.md → apps/web/src/features/search/SearchResultsSection.test.tsx
- `Task 13: integration — search flow` --references--> `SearchResultsSection()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/search/SearchResultsSection.tsx
- `Task 13: integration — search flow` --references--> `useRepoSearch()`  [INFERRED]
  tasks/todo.md → apps/web/src/features/search/useRepoSearch.ts

## Import Cycles
- None detected.

## Communities (48 total, 9 thin omitted)

### Community 1 - "Repo Radar (project overview)"
Cohesion: 0.20
Nodes (11): CI Workflow (lint, typecheck, test, build, storybook), CI/CD split: Vercel handles deployment, workflow is CI-only, pnpm install --no-frozen-lockfile rationale, Node 22 required for jsdom/undici webidl compatibility, pnpm workspace packages config (apps/*, packages/*), CI/CD section, Getting Started instructions, Repo Radar (project overview) (+3 more)

### Community 2 - "web/package.json"
Cohesion: 0.07
Nodes (26): @emotion/react, @emotion/styled, jsdom, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+18 more)

### Community 3 - "ui/package.json"
Cohesion: 0.04
Nodes (44): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core, exports (+36 more)

### Community 4 - "core/src/index.ts"
Cohesion: 0.07
Nodes (35): fetchMock, TrackedRepoCard(), githubApi, SearchArgs, packages_core_src_api_githubapi_usegetrepositoryquery, packages_core_src_api_githubapi_usesearchrepositoriesquery, mergeSearchResults(), packages_core_src_index_untrackrepo (+27 more)

### Community 5 - "package.json"
Cohesion: 0.05
Nodes (46): dependencies, @repo-radar/core, @sentry/node, devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y (+38 more)

### Community 6 - "ref_vitest"
Cohesion: 0.06
Nodes (28): fetchMock, fetchMock, fetchMock, fetchMock, fetchMock, requestedUrl(), packages_core_src_index_trackrepo, loadFromStorage() (+20 more)

### Community 7 - "Header.tsx"
Cohesion: 0.33
Nodes (6): MAX_SEARCH_QUERY_LENGTH, SearchBar(), SearchBarProps, packages_core_src_index_toggletheme, ref_mui_icons_material, ref_mui_material

### Community 8 - "core/package.json"
Cohesion: 0.06
Nodes (33): dependencies, react-redux, @reduxjs/toolkit, devDependencies, jsdom, react-dom, @testing-library/jest-dom, @testing-library/react (+25 more)

### Community 9 - "githubProxy.ts"
Cohesion: 0.08
Nodes (20): getRepositoryMock, searchRepositoriesMock, mockResponse(), buildHeaders(), getRepository(), mapRawRepo(), normalizeError(), ProxyResult (+12 more)

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
Nodes (32): Checkpoint: apps/web unit coverage, Checkpoint: Complete, Checkpoint: E2E + a11y, Checkpoint: Foundations, Phase 0: Foundations, Phase 1: apps/web unit coverage, Phase 3: E2E + accessibility, Phase 4: Performance + stress/large-data (+24 more)

### Community 23 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+7 more)

### Community 24 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 25 - "repo"
Cohesion: 0.50
Nodes (3): repo(), graphify reference: GitHub clone and cross-repo merge, Step 0 - Clone GitHub repo(s) (only if a GitHub URL was given)

### Community 26 - "Task List"
Cohesion: 0.12
Nodes (16): Architecture Decisions, Checkpoint: apps/web unit coverage, Checkpoint: Complete, Checkpoint: E2E + a11y, Checkpoint: Foundations, Decisions (resolved 2026-09-20), Implementation Plan: Testing Quality Bar, Overview (+8 more)

### Community 27 - "useTrackedRepoView.ts"
Cohesion: 0.14
Nodes (16): mockedUseTrackedRepoView, TrackedRepoControls(), importFresh(), mockedUseTrackedRepoView, TrackedReposSection(), isSortKey(), parseIntParam(), SORT_KEYS (+8 more)

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

### Community 33 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, build-storybook, check:fast, check:task, dev, format, format:check (+7 more)

### Community 35 - "SearchResultsSection.tsx"
Cohesion: 0.19
Nodes (11): useAppDispatch, SearchResultsSection, SearchResultsListProps, SearchResultsSection(), mockedUseRepoSearch, renderAtSearch(), renderAtSearchWith(), MIN_QUERY_LENGTH (+3 more)

### Community 39 - "ui/src/index.ts"
Cohesion: 0.06
Nodes (32): EmptyState(), EmptyStateProps, meta, NoTrackedRepos, Story, TitleOnly, WithIconAndAction, ErrorFallback() (+24 more)

### Community 42 - "AppErrorBoundary.tsx"
Cohesion: 0.14
Nodes (4): AppErrorBoundary, Props, State, @sentry/react

### Community 43 - "Constraints"
Cohesion: 0.29
Nodes (6): Constraints, Enforced with numbers, Exceptions, Floor (always enforced, no setup required), Measured, not yet enforced (baseline, 2026-09-20), Notes on scope

### Community 45 - "react-router"
Cohesion: 0.33
Nodes (3): useSearchBox(), useDebouncedValue(), react-router

### Community 46 - "store.ts"
Cohesion: 0.17
Nodes (14): App(), useAppSelector, AppDispatch, RootState, store, ThemedApp(), selectTrackedRepoCacheEntries, useTrackedRepoCacheEntries() (+6 more)

### Community 47 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, jsdom, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react, @types/react-dom (+4 more)

### Community 49 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, preview, test, test:coverage, typecheck

### Community 52 - "ref_testing_library_react"
Cohesion: 0.22
Nodes (5): StarsChartCard, visuallyHidden, StarsChartCard(), mockedUseTrackedRepoView, ref_testing_library_react

## Knowledge Gaps
- **408 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `ProxyResult` (+403 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 496 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@vercel/node` connect `githubProxy.ts` to `package.json`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `react-router` connect `react-router` to `web/package.json`, `SearchResultsSection.tsx`, `ref_vitest`, `Header.tsx`, `store.ts`, `trackedRepoFlow.integration.test.tsx`, `ref_testing_library_react`, `useTrackedRepoView.ts`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `ui/src/index.ts` to `ui/package.json`, `core/src/index.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _408 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `core/src/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07164404223227752 - nodes in this community are weakly interconnected._