# Graph Report - repo-radar-app  (2026-09-19)

## Corpus Check
- 79 files · ~18,068 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .graphify-bak 1)

## Summary
- 568 nodes · 801 edges · 31 communities (23 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aa128eca`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ui/src/index.ts
- Prioritised worklist
- web/package.json
- ui/package.json
- core/src/index.ts
- package.json
- What You Must Do When Invoked
- RepoCard.stories.tsx
- core/package.json
- _lib/githubProxy.ts
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
- graphify reference: extra exports and benchmark
- CLAUDE.md
- graphify reference: query, path, explain
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- .claude/CLAUDE.md
- extraction-spec.md

## God Nodes (most connected - your core abstractions)
1. `Prioritised worklist` - 31 edges
2. `compilerOptions` - 15 edges
3. `What You Must Do When Invoked` - 12 edges
4. `useAppSelector` - 11 edges
5. `/graphify` - 10 edges
6. `useRepoSearch()` - 10 edges
7. `selectTrackedFullNames()` - 10 edges
8. `GithubRepo` - 9 edges
9. `getRepository()` - 9 edges
10. `searchRepositories()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `ThemedApp()` --indirect_call--> `selectThemeMode()`  [INFERRED]
  apps/web/src/app/ThemedApp.tsx → packages/core/src/store/themeSlice.ts
- `useRepoSearch()` --calls--> `useDebouncedValue()`  [EXTRACTED]
  apps/web/src/features/search/useRepoSearch.ts → packages/core/src/hooks/useDebouncedValue.ts
- `useRepoSearch()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/features/search/useRepoSearch.ts → packages/core/src/store/trackedReposSlice.ts
- `TrackedReposSection()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/features/tracked-repos/TrackedReposSection.tsx → packages/core/src/store/trackedReposSlice.ts
- `Header()` --indirect_call--> `selectThemeMode()`  [INFERRED]
  apps/web/src/Header.tsx → packages/core/src/store/themeSlice.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Findings resolved by the entity-slice refactor** — architecture_review_recommended_architecture_entity_slice, architecture_review_p0_4_stars_chart_partial_data, architecture_review_p0_5_refresh_all_noop, architecture_review_p0_6_refresh_error_data_loss, architecture_review_p0_7_createselector_inert, architecture_review_p1_13_tracked_repo_no_owner, architecture_review_p1_15_ui_reaches_data_layer [EXTRACTED 1.00]
- **Praised architectural decisions in the review's verdict** — architecture_review_verdict, architecture_review_serverless_proxy_decision, architecture_review_rtk_query_decision, architecture_review_per_card_subscriptions, architecture_review_nouncheckedindexedaccess, architecture_review_listener_middleware_persistence [EXTRACTED 1.00]
- **P0 correctness bugs section** — architecture_review_p0_1_search_pagination_bug, architecture_review_p0_2_merge_no_dedupe, architecture_review_p0_3_hasmore_cap_ignored, architecture_review_p0_4_stars_chart_partial_data, architecture_review_p0_5_refresh_all_noop, architecture_review_p0_6_refresh_error_data_loss, architecture_review_p0_7_createselector_inert, architecture_review_p0_8_error_card_contrast, architecture_review_p0_9_env_example_gitignored, architecture_review_p0_10_api_boundary_unvalidated, architecture_review_p0_11_last_commit_date_wrong [EXTRACTED 1.00]

## Communities (31 total, 8 thin omitted)

### Community 0 - "ui/src/index.ts"
Cohesion: 0.06
Nodes (55): App(), AppErrorBoundary, Props, State, useAppDispatch, useAppSelector, AppDispatch, RootState (+47 more)

### Community 1 - "Prioritised worklist"
Cohesion: 0.05
Nodes (51): Listener middleware for persistence instead of useEffect, noUncheckedIndexedAccess strictness choice, P0-10: API boundary is unvalidated, P0-11: 'Last commit date' is actually pushed_at, P0-1: Search pagination corrupts results when query changes, P0-2: merge never de-duplicates search results, P0-3: hasMore ignores GitHub's 1000-result search cap, P0-4: Stars chart shows whatever happens to be cached (+43 more)

### Community 2 - "web/package.json"
Cohesion: 0.04
Nodes (46): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, react, react-dom (+38 more)

### Community 3 - "ui/package.json"
Cohesion: 0.05
Nodes (42): dependencies, @emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/x-charts, @repo-radar/core, exports (+34 more)

### Community 4 - "core/src/index.ts"
Cohesion: 0.06
Nodes (44): SearchArgs, packages_core_src_api_githubapi_usegetrepositoryquery, packages_core_src_api_githubapi_usesearchrepositoriesquery, useDebouncedValue(), buildHeaders(), getRepository(), mapRawRepo(), normalizeError() (+36 more)

### Community 5 - "package.json"
Cohesion: 0.05
Nodes (39): dependencies, @repo-radar/core, devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, turbo (+31 more)

### Community 6 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 7 - "RepoCard.stories.tsx"
Cohesion: 0.08
Nodes (24): meta, NoTrackedRepos, Story, TitleOnly, WithIconAndAction, Default, meta, Story (+16 more)

### Community 8 - "core/package.json"
Cohesion: 0.06
Nodes (32): dependencies, react-redux, @reduxjs/toolkit, devDependencies, jsdom, react-dom, @testing-library/jest-dom, @testing-library/react (+24 more)

### Community 9 - "_lib/githubProxy.ts"
Cohesion: 0.18
Nodes (15): handler(), handler(), buildHeaders(), getRepository(), mapRawRepo(), normalizeError(), ProxyResult, RawGithubRepo (+7 more)

### Community 10 - "tasks"
Cohesion: 0.10
Nodes (20): dependsOn, outputs, dependsOn, outputs, cache, persistent, dependsOn, $schema (+12 more)

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
Cohesion: 0.50
Nodes (3): buildCommand, installCommand, outputDirectory

### Community 21 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 23 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 24 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 25 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 26 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

## Ambiguous Edges - Review These
- `Prioritised worklist` → `P2-29: Turborepo config is approximate`  [AMBIGUOUS]
  ARCHITECTURE-REVIEW.md · relation: references

## Knowledge Gaps
- **300 isolated node(s):** `graphify`, `Usage`, `What graphify is for`, `Step 0 - GitHub repos and multi-path merge (only if a URL or several paths)`, `Step 1 - Ensure graphify is installed` (+295 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 362 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Prioritised worklist` and `P2-29: Turborepo config is approximate`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `@vercel/node` connect `_lib/githubProxy.ts` to `package.json`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `RepoCard.stories.tsx` to `ui/src/index.ts`, `ui/package.json`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `ui/package.json`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `graphify`, `Usage`, `What graphify is for` to the rest of the system?**
  _300 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ui/src/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0558641975308642 - nodes in this community are weakly interconnected._
- **Should `Prioritised worklist` be split into smaller, more focused modules?**
  _Cohesion score 0.050980392156862744 - nodes in this community are weakly interconnected._