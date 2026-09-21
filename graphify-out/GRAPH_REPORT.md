# Graph Report - repo-radar-app  (2026-09-21)

## Corpus Check
- 148 files · ~62,635 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 5, .graphify-bak 1, .example 1)

## Summary
- 825 nodes · 1336 edges · 57 communities (43 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b4381305`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- packages_core_src_index_tracked_repos_storage_key
- Repo Radar (project overview)
- web/package.json
- ui/package.json
- RepoCard.stories.tsx
- devDependencies
- ref_testing_library_react
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
- searchFlow.integration.test.tsx
- dependencies
- graphify reference: extra exports and benchmark
- useTrackedRepoView.ts
- core/src/index.ts
- devDependencies
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
- scripts
- release-please-config.json
- trackedReposSlice.ts
- ref_vitest
- Engineering Notes
- useTrackedRepoView.test.tsx
- graphify reference: GitHub clone and cross-repo merge
- eslint.config.js
- github-repo.js
- ui/src/index.ts
- ref_playwright_core
- trackedRepoFlow.integration.test.tsx
- AppErrorBoundary
- dependencies
- Features
- lint-staged
- @sentry/react
- engines

## God Nodes (most connected - your core abstractions)
1. `scripts` - 19 edges
2. `react-router` - 17 edges
3. `useTrackedRepoView()` - 17 edges
4. `compilerOptions` - 15 edges
5. `Engineering Notes` - 15 edges
6. `githubApi` - 13 edges
7. `GithubRepo` - 13 edges
8. `What You Must Do When Invoked` - 12 edges
9. `useAppSelector` - 11 edges
10. `@playwright/test` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Observability` --references--> `withErrorReporting()`  [INFERRED]
  docs/ENGINEERING.md → api/_lib/withErrorReporting.ts
- `Resilience` --references--> `useOnlineStatus()`  [INFERRED]
  docs/ENGINEERING.md → apps/web/src/app/useOnlineStatus.ts
- `CI/CD` --references--> `main()`  [INFERRED]
  docs/ENGINEERING.md → scripts/wait-for-vercel-preview.mjs
- `Release engineering` --references--> `main()`  [INFERRED]
  docs/ENGINEERING.md → scripts/wait-for-vercel-preview.mjs
- `Vercel / deployment` --references--> `main()`  [INFERRED]
  docs/ENGINEERING.md → scripts/wait-for-vercel-preview.mjs

## Import Cycles
- None detected.

## Communities (57 total, 14 thin omitted)

### Community 1 - "Repo Radar (project overview)"
Cohesion: 0.20
Nodes (11): CI Workflow (lint, typecheck, test, build, storybook), CI/CD split: Vercel handles deployment, workflow is CI-only, pnpm install --no-frozen-lockfile rationale, Node 22 required for jsdom/undici webidl compatibility, pnpm workspace packages config (apps/*, packages/*), CI/CD section, Getting Started instructions, Repo Radar (project overview) (+3 more)

### Community 2 - "web/package.json"
Cohesion: 0.07
Nodes (26): @emotion/react, @emotion/styled, jsdom, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+18 more)

### Community 3 - "ui/package.json"
Cohesion: 0.04
Nodes (44): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core, exports (+36 more)

### Community 4 - "RepoCard.stories.tsx"
Cohesion: 0.06
Nodes (34): CacheEntries, baseQueryWithRetry, isRetryableError(), SearchArgs, fetchMock, requestedUrl(), mergeSearchResults(), ApiError (+26 more)

### Community 5 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, @axe-core/playwright, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+13 more)

### Community 6 - "ref_testing_library_react"
Cohesion: 0.23
Nodes (9): App(), store, ThemedApp(), packages_core_src_index_settheme, selectThemeMode(), ref_react_dom, ref_react_redux, react-router (+1 more)

### Community 7 - "package.json"
Cohesion: 0.12
Nodes (15): @repo-radar/core, @types/node, typescript, vitest, name, packageManager, private, type (+7 more)

### Community 8 - "core/package.json"
Cohesion: 0.06
Nodes (33): dependencies, react-redux, @reduxjs/toolkit, devDependencies, jsdom, react-dom, @testing-library/jest-dom, @testing-library/react (+25 more)

### Community 9 - "githubProxy.ts"
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
Cohesion: 0.29
Nodes (6): buildCommand, headers, installCommand, outputDirectory, regions, rewrites

### Community 21 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 22 - "searchFlow.integration.test.tsx"
Cohesion: 0.13
Nodes (6): fetchMock, fetchMock, fetchMock, githubApi, packages_core_src_index_untrackrepo, ref_reduxjs_toolkit

### Community 23 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+7 more)

### Community 24 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 25 - "useTrackedRepoView.ts"
Cohesion: 0.06
Nodes (48): useAppDispatch, useAppSelector, SearchResultsSection, AppDispatch, RootState, visuallyHidden, MAX_SEARCH_QUERY_LENGTH, SearchBar() (+40 more)

### Community 26 - "core/src/index.ts"
Cohesion: 0.20
Nodes (14): packages_core_src_api_githubapi_usegetrepositoryquery, packages_core_src_api_githubapi_usesearchrepositoriesquery, persistenceMiddleware, initialState, packages_core_src_store_themeslice_settheme, THEME_STORAGE_KEY, ThemeMode, themeReducer (+6 more)

### Community 27 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, rollup-plugin-visualizer, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react (+5 more)

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
Cohesion: 0.11
Nodes (19): assertNoA11yViolations(), mockGithubApi(), MockRepo, toRepoResponse(), REPOS, REACT, @axe-core/playwright, lighthouse (+11 more)

### Community 35 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, build-storybook, check:fast, check:task, dev, e2e, format (+11 more)

### Community 39 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, preview, test, test:coverage, typecheck

### Community 40 - "release-please-config.json"
Cohesion: 0.40
Nodes (4): bootstrap-sha, packages, release-type, $schema

### Community 41 - "trackedReposSlice.ts"
Cohesion: 0.22
Nodes (7): loadFromStorage(), saveToStorage(), initialState, selectIsTracked(), trackedReposReducer, trackedReposSlice, TrackedReposState

### Community 42 - "ref_vitest"
Cohesion: 0.21
Nodes (3): useSearchBox(), useDebouncedValue(), ref_vitest

### Community 43 - "Engineering Notes"
Cohesion: 0.07
Nodes (30): getServerSnapshot(), getSnapshot(), subscribe(), useOnlineStatus(), Changelog, Constraints, Enforced with numbers, Exceptions (+22 more)

### Community 44 - "useTrackedRepoView.test.tsx"
Cohesion: 0.20
Nodes (3): fetchMock, fetchMock, packages_core_src_index_trackrepo

### Community 46 - "eslint.config.js"
Cohesion: 0.25
Nodes (7): eslint-config-prettier, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 47 - "github-repo.js"
Cohesion: 0.29
Nodes (5): options, REPOS, options, QUERIES, ref_k6

### Community 48 - "ui/src/index.ts"
Cohesion: 0.05
Nodes (38): Props, State, StarsChartCard, EmptyState(), EmptyStateProps, meta, NoTrackedRepos, Story (+30 more)

### Community 52 - "dependencies"
Cohesion: 0.67
Nodes (3): dependencies, @repo-radar/core, @sentry/node

### Community 53 - "Features"
Cohesion: 0.18
Nodes (10): Built to be used comfortably, Features, Light and dark themes, Repo cards, and the details underneath, Search, Sorting and filtering tracked repos, Stars chart, Staying useful when your connection drops (+2 more)

### Community 54 - "lint-staged"
Cohesion: 0.67
Nodes (3): lint-staged, *.{json,md,yml,yaml,css,html}, *.{ts,tsx,js,jsx}

## Knowledge Gaps
- **422 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `ProxyResult` (+417 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 518 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@vercel/node` connect `githubProxy.ts` to `package.json`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `react-router` connect `ref_testing_library_react` to `web/package.json`, `ref_vitest`, `useTrackedRepoView.test.tsx`, `trackedRepoFlow.integration.test.tsx`, `searchFlow.integration.test.tsx`, `useTrackedRepoView.ts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `ui/src/index.ts` to `ui/package.json`, `RepoCard.stories.tsx`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _422 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `RepoCard.stories.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.058069381598793365 - nodes in this community are weakly interconnected._