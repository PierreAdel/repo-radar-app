# Graph Report - repo-radar-app  (2026-09-19)

## Corpus Check
- 71 files · ~12,912 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: (none) 1)

## Summary
- 508 nodes · 752 edges · 22 communities (19 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `38e7df18`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- TrackedReposSection.tsx
- Prioritised worklist
- web/package.json
- ui/package.json
- core/src/index.ts
- package.json
- RepoCard.stories.tsx
- ui/src/index.ts
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
- server/githubProxy.ts

## God Nodes (most connected - your core abstractions)
1. `Prioritised worklist` - 31 edges
2. `compilerOptions` - 15 edges
3. `useAppSelector` - 11 edges
4. `useRepoSearch()` - 10 edges
5. `selectTrackedFullNames()` - 10 edges
6. `searchRepositories()` - 9 edges
7. `getRepository()` - 9 edges
8. `scripts` - 9 edges
9. `GithubRepo` - 9 edges
10. `Architecture review verdict` - 9 edges

## Surprising Connections (you probably didn't know these)
- `UI polish backlog` --references--> `StarsBarChart()`  [INFERRED]
  NOTES.md → packages/ui/src/StarsBarChart.tsx
- `Header()` --indirect_call--> `selectTrackedFullNames()`  [INFERRED]
  apps/web/src/Header.tsx → packages/core/src/store/trackedReposSlice.ts
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

## Communities (22 total, 3 thin omitted)

### Community 0 - "TrackedReposSection.tsx"
Cohesion: 0.07
Nodes (40): App(), AppErrorBoundary, Props, State, useAppDispatch, useAppSelector, AppDispatch, RootState (+32 more)

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
Cohesion: 0.12
Nodes (22): packages_core_src_api_githubapi_usegetrepositoryquery, packages_core_src_api_githubapi_usesearchrepositoriesquery, loadFromStorage(), saveToStorage(), persistenceMiddleware, initialState, packages_core_src_store_themeslice_settheme, THEME_STORAGE_KEY (+14 more)

### Community 5 - "package.json"
Cohesion: 0.05
Nodes (39): dependencies, @repo-radar/core, devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, turbo (+31 more)

### Community 6 - "RepoCard.stories.tsx"
Cohesion: 0.08
Nodes (23): useDebouncedValue(), compactNumberFormatter, DIVISIONS, formatCompactNumber(), formatRelativeTime(), relativeTimeFormatter, RepoCard(), ErrorState (+15 more)

### Community 7 - "ui/src/index.ts"
Cohesion: 0.07
Nodes (29): Ideas / notes, Notes to self, UI polish backlog, EmptyState(), EmptyStateProps, meta, NoTrackedRepos, Story (+21 more)

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

### Community 21 - "server/githubProxy.ts"
Cohesion: 0.25
Nodes (12): SearchArgs, buildHeaders(), getRepository(), mapRawRepo(), normalizeError(), ProxyResult, RawGithubRepo, searchRepositories() (+4 more)

## Ambiguous Edges - Review These
- `Prioritised worklist` → `P2-29: Turborepo config is approximate`  [AMBIGUOUS]
  ARCHITECTURE-REVIEW.md · relation: references

## Knowledge Gaps
- **258 isolated node(s):** `ProxyResult`, `RawGithubRepo`, `name`, `private`, `version` (+253 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 310 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Prioritised worklist` and `P2-29: Turborepo config is approximate`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `@vercel/node` connect `_lib/githubProxy.ts` to `package.json`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `@storybook/react` connect `ui/src/index.ts` to `TrackedReposSection.tsx`, `ui/package.json`, `RepoCard.stories.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `ui/package.json`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `ProxyResult`, `RawGithubRepo`, `name` to the rest of the system?**
  _258 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TrackedReposSection.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0701484895033282 - nodes in this community are weakly interconnected._
- **Should `Prioritised worklist` be split into smaller, more focused modules?**
  _Cohesion score 0.050980392156862744 - nodes in this community are weakly interconnected._