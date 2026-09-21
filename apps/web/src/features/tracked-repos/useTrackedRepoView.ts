import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { githubApi, selectTrackedFullNames } from "@repo-radar/core";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { selectDerivedTrackedRepoView } from "./selectDerivedTrackedRepoView";
import { parseIntParam, type TrackedRepoFilters } from "./trackedRepoFilters";
import { DEFAULT_SORT_KEY, isSortKey, type SortKey } from "./trackedRepoSort";
import { useTrackedRepoCacheEntries } from "./useTrackedRepoCacheEntries";

export type { SortKey } from "./trackedRepoSort";
export type { TrackedRepoFilters } from "./trackedRepoFilters";

/**
 * Shared sort + filter state for the tracked-repos grid and the stars chart,
 * so both reflect the same order and the same subset of tracked repos.
 * State lives in the URL, matching the rest of the app's URL-driven state.
 */
export function useTrackedRepoView() {
  const dispatch = useAppDispatch();
  const trackedFullNames = useAppSelector(selectTrackedFullNames);
  const entries = useTrackedRepoCacheEntries();
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch every tracked repo's data unconditionally, not just the ones
  // whose TrackedRepoCard happens to be mounted (the grid paginates via
  // "Load more") - otherwise the chart and star-filter bounds silently
  // ignore anything past the first page.
  useEffect(() => {
    const subscriptions = trackedFullNames.map((fullName) =>
      dispatch(githubApi.endpoints.getRepository.initiate(fullName)),
    );
    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [dispatch, trackedFullNames]);

  const sortParam = searchParams.get("sort");
  const sortKey: SortKey = isSortKey(sortParam) ? sortParam : DEFAULT_SORT_KEY;

  const setSortKey = (next: SortKey) => {
    setSearchParams(
      (prev) => {
        const nextParams = new URLSearchParams(prev);
        if (next === DEFAULT_SORT_KEY) {
          nextParams.delete("sort");
        } else {
          nextParams.set("sort", next);
        }
        return nextParams;
      },
      { replace: true },
    );
  };

  const minStarsParam = searchParams.get("minStars");
  const maxStarsParam = searchParams.get("maxStars");

  const filters: TrackedRepoFilters = useMemo(
    () => ({
      minStars: parseIntParam(minStarsParam),
      maxStars: parseIntParam(maxStarsParam),
    }),
    [minStarsParam, maxStarsParam],
  );

  const setFilters = (next: Partial<TrackedRepoFilters>) => {
    setSearchParams(
      (prev) => {
        const nextParams = new URLSearchParams(prev);
        const merged = { ...filters, ...next };
        for (const [key, value] of Object.entries(merged)) {
          if (value === undefined) {
            nextParams.delete(key);
          } else {
            nextParams.set(key, String(value));
          }
        }
        return nextParams;
      },
      { replace: true },
    );
  };

  const clearFilters = () =>
    setFilters({
      minStars: undefined,
      maxStars: undefined,
    });

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined);

  const { entryByFullName, maxStarBound, sortedFullNames } = selectDerivedTrackedRepoView(
    entries,
    trackedFullNames,
    minStarsParam,
    maxStarsParam,
    sortKey,
  );

  return {
    trackedFullNames,
    entryByFullName,
    sortKey,
    setSortKey,
    filters,
    setFilters,
    clearFilters,
    hasActiveFilters,
    maxStarBound,
    sortedFullNames,
  };
}
