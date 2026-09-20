import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { githubApi, selectTrackedFullNames } from "@repo-radar/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useTrackedRepoCacheEntries } from "./useTrackedRepoCacheEntries";

export type SortKey = "stars" | "lastCommit" | "name";

const SORT_KEYS: readonly SortKey[] = ["stars", "lastCommit", "name"];
const DEFAULT_SORT_KEY: SortKey = "stars";

function isSortKey(value: string | null): value is SortKey {
  return SORT_KEYS.includes(value as SortKey);
}

export interface TrackedRepoFilters {
  minStars?: number;
  maxStars?: number;
}

function parseIntParam(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

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

  const entryByFullName = useMemo(
    () => new Map(entries.map((entry) => [entry.fullName, entry])),
    [entries],
  );

  const maxStarBound = useMemo(
    () => Math.max(1, ...entries.map((entry) => entry.data?.stargazersCount ?? 0)),
    [entries],
  );

  const filteredFullNames = useMemo(() => {
    return trackedFullNames.filter((fullName) => {
      const repo = entryByFullName.get(fullName)?.data;
      if (!repo) return true;
      if (filters.minStars !== undefined && repo.stargazersCount < filters.minStars) return false;
      if (filters.maxStars !== undefined && repo.stargazersCount > filters.maxStars) return false;
      return true;
    });
  }, [trackedFullNames, entryByFullName, filters]);

  const sortedFullNames = useMemo(() => {
    return [...filteredFullNames].sort((a, b) => {
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
  }, [filteredFullNames, entryByFullName, sortKey]);

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
