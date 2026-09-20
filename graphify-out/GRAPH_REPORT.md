# Graph Report - repo-radar-app  (2026-09-20)

## Corpus Check
- 118 files · ~30,722 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .graphify-bak 1, .example 1)

## Summary
- 742 nodes · 1148 edges · 46 communities (39 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `40891182`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- EmptyState.stories.tsx
- Repo Radar (project overview)
- web/package.json
- ui/package.json
- RepoCard.stories.tsx
- package.json
- core/src/index.ts
- useTrackedRepoView.ts
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
- repo
- Task List
- GithubRepo
- graphify reference: query, path, explain
- .prettierrc.json
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- RepoCard.tsx
- graphify reference: transcribe video and audio
- ErrorFallback.stories.tsx
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- ui/src/index.ts
- StarsBarChart.stories.tsx
- scripts
- main.tsx
- Constraints
- createAppTheme
- ref_testing_library_user_event

## God Nodes (most connected - your core abstractions)
1. `useTrackedRepoView()` - 16 edges
2. `react-router` - 15 edges
3. `scripts` - 15 edges
4. `compilerOptions` - 15 edges
5. `GithubRepo` - 12 edges
6. `What You Must Do When Invoked` - 12 edges
7. `useAppSelector` - 11 edges
8. `githubApi` - 11 edges
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

## Communities (46 total, 7 thin omitted)

### Community 0 - "EmptyState.stories.tsx"
Cohesion: 0.22
Nodes (8): EmptyState(), EmptyStateProps, meta, NoTrackedRepos, Story, TitleOnly, WithIconAndAction, @storybook/test

### Community 1 - "Repo Radar (project overview)"
Cohesion: 0.20
Nodes (11): CI Workflow (lint, typecheck, test, build, storybook), CI/CD split: Vercel handles deployment, workflow is CI-only, pnpm install --no-frozen-lockfile rationale, Node 22 required for jsdom/undici webidl compatibility, pnpm workspace packages config (apps/*, packages/*), CI/CD section, Getting Started instructions, Repo Radar (project overview) (+3 more)

### Community 2 - "web/package.json"
Cohesion: 0.04
Nodes (47): devDependencies, jsdom, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react, @types/react-dom (+39 more)

### Community 3 - "ui/package.json"
Cohesion: 0.04
Nodes (44): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core, exports (+36 more)

### Community 4 - "RepoCard.stories.tsx"
Cohesion: 0.15
Nodes (12): ErrorState, HighCounts, Loading, meta, NoDescription, RateLimited, RefreshingInPlace, repo (+4 more)

### Community 5 - "package.json"
Cohesion: 0.05
Nodes (46): dependencies, @repo-radar/core, @sentry/node, devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y (+38 more)

### Community 6 - "core/src/index.ts"
Cohesion: 0.06
Nodes (37): RootState, fetchMock, fetchMock, TrackedRepoCard(), selectTrackedRepoCacheEntries, fetchMock, fetchMock, githubApi (+29 more)

### Community 7 - "useTrackedRepoView.ts"
Cohesion: 0.06
Nodes (44): App(), useAppDispatch, useAppSelector, SearchResultsSection, StarsChartCard, AppDispatch, ThemedApp(), visuallyHidden (+36 more)

### Community 8 - "core/package.json"
Cohesion: 0.06
Nodes (33): dependencies, react-redux, @reduxjs/toolkit, devDependencies, jsdom, react-dom, @testing-library/jest-dom, @testing-library/react (+25 more)

### Community 9 - "ref_vitest"
Cohesion: 0.08
Nodes (21): getRepositoryMock, searchRepositoriesMock, mockResponse(), buildHeaders(), getRepository(), mapRawRepo(), normalizeError(), ProxyResult (+13 more)

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
Nodes (33): Checkpoint: apps/web unit coverage, Checkpoint: Complete, Checkpoint: E2E + a11y, Checkpoint: Foundations, Phase 0: Foundations, Phase 1: apps/web unit coverage, Phase 2: Integration tests, Phase 3: E2E + accessibility (+25 more)

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

### Community 27 - "GithubRepo"
Cohesion: 0.24
Nodes (5): SearchArgs, fetchMock, mergeSearchResults(), GithubRepo, SearchReposResult

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

### Community 33 - "RepoCard.tsx"
Cohesion: 0.26
Nodes (9): ApiError, compactNumberFormatter, DIVISIONS, formatCompactNumber(), formatRelativeTime(), relativeTimeFormatter, RepoCardContent(), RepoCardContentProps (+1 more)

### Community 35 - "ErrorFallback.stories.tsx"
Cohesion: 0.22
Nodes (8): ErrorFallback(), ErrorFallbackProps, Default, meta, Story, WithErrorDetails, WithReportAction, @storybook/react

### Community 39 - "ui/src/index.ts"
Cohesion: 0.25
Nodes (7): StarsBarChart(), StarsBarChartDatum, StarsBarChartProps, fewRepos, manyRepos, visuallyHidden, ref_mui_x_charts

### Community 40 - "StarsBarChart.stories.tsx"
Cohesion: 0.29
Nodes (6): Default, ManyRepos, meta, SingleRepo, Story, TallBar

### Community 41 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, build-storybook, check:fast, check:task, dev, format, format:check (+7 more)

### Community 42 - "main.tsx"
Cohesion: 0.16
Nodes (6): AppErrorBoundary, Props, State, store, ref_react_dom, @sentry/react

### Community 43 - "Constraints"
Cohesion: 0.29
Nodes (6): Constraints, Enforced with numbers, Exceptions, Floor (always enforced, no setup required), Measured, not yet enforced (baseline, 2026-09-20), Notes on scope

### Community 44 - "createAppTheme"
Cohesion: 0.53
Nodes (3): createAppTheme(), preview, withTheme()

### Community 46 - "ref_testing_library_user_event"
Cohesion: 0.29
Nodes (3): RepoCard(), repo, ref_testing_library_user_event

## Knowledge Gaps
- **406 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `ProxyResult` (+401 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 487 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@vercel/node` connect `ref_vitest` to `package.json`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `react-router` connect `useTrackedRepoView.ts` to `web/package.json`, `main.tsx`, `core/src/index.ts`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `ErrorFallback.stories.tsx` to `EmptyState.stories.tsx`, `ui/package.json`, `RepoCard.stories.tsx`, `StarsBarChart.stories.tsx`, `createAppTheme`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _406 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.04609929078014184 - nodes in this community are weakly interconnected._