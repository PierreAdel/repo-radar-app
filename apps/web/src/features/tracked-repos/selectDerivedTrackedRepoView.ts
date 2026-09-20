import { createSelector } from "@reduxjs/toolkit";
import { parseIntParam } from "./trackedRepoFilters";
import type { SortKey } from "./trackedRepoSort";
import type { useTrackedRepoCacheEntries } from "./useTrackedRepoCacheEntries";

type CacheEntries = ReturnType<typeof useTrackedRepoCacheEntries>;

// useTrackedRepoView() is called from three components (TrackedReposSection,
// TrackedRepoControls, StarsChartCard) in the same render pass, all reading
// the same tracked-repo cache entries, filters, and sort key. Deriving this
// with a plain per-hook-instance useMemo would redo the O(N)/O(N log N) work
// three times over. createSelector's memoization lives at module scope
// (shared by every caller, not per component instance), so as long as the
// three calls land with the same primitive args - true within one render
// pass - the 2nd and 3rd calls hit the cache instead of recomputing.
export const selectDerivedTrackedRepoView = createSelector(
  [
    (entries: CacheEntries) => entries,
    (_entries: CacheEntries, trackedFullNames: string[]) => trackedFullNames,
    (_entries: CacheEntries, _trackedFullNames: string[], minStarsParam: string | null) =>
      minStarsParam,
    (
      _entries: CacheEntries,
      _trackedFullNames: string[],
      _minStarsParam: string | null,
      maxStarsParam: string | null,
    ) => maxStarsParam,
    (
      _entries: CacheEntries,
      _trackedFullNames: string[],
      _minStarsParam: string | null,
      _maxStarsParam: string | null,
      sortKey: SortKey,
    ) => sortKey,
  ],
  (entries, trackedFullNames, minStarsParam, maxStarsParam, sortKey) => {
    const minStars = parseIntParam(minStarsParam);
    const maxStars = parseIntParam(maxStarsParam);

    const entryByFullName = new Map(entries.map((entry) => [entry.fullName, entry]));
    const maxStarBound = Math.max(1, ...entries.map((entry) => entry.data?.stargazersCount ?? 0));

    const filteredFullNames = trackedFullNames.filter((fullName) => {
      const repo = entryByFullName.get(fullName)?.data;
      if (!repo) return true;
      if (minStars !== undefined && repo.stargazersCount < minStars) return false;
      if (maxStars !== undefined && repo.stargazersCount > maxStars) return false;
      return true;
    });

    const sortedFullNames = [...filteredFullNames].sort((a, b) => {
      if (sortKey === "name") {
        return a.localeCompare(b);
      }
      const repoA = entryByFullName.get(a)?.data;
      const repoB = entryByFullName.get(b)?.data;
      if (sortKey === "lastCommit") {
        return new Date(repoB?.pushedAt ?? 0).getTime() - new Date(repoA?.pushedAt ?? 0).getTime();
      }
      return (repoB?.stargazersCount ?? 0) - (repoA?.stargazersCount ?? 0);
    });

    return { entryByFullName, maxStarBound, filteredFullNames, sortedFullNames };
  },
);
