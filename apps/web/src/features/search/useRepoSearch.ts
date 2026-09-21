import { useCallback } from "react";
import { useSearchParams } from "react-router";
import {
  selectTrackedFullNames,
  toApiError,
  trackRepo,
  untrackRepo,
  useSearchRepositoriesQuery,
} from "@repo-radar/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 1000; // GitHub Search API's documented result cap.

export function useRepoSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const trackedFullNames = useAppSelector(selectTrackedFullNames);

  const query = (searchParams.get("q") ?? "").trim();
  // Guards against a hand-edited URL like ?page=abc or ?page=-3.
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const skip = query.length < MIN_QUERY_LENGTH;
  const { data, isLoading, isFetching, error, refetch } = useSearchRepositoriesQuery(
    { query, page },
    { skip },
  );

  const items = data?.items ?? [];
  const hasMore = !skip && items.length < Math.min(data?.totalCount ?? 0, MAX_RESULTS);

  const loadMore = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(page + 1));
        return next;
      },
      { replace: true },
    );
  }, [page, setSearchParams]);

  return {
    query,
    items,
    isLoading: isLoading && page === 1,
    isLoadingMore: isFetching && page > 1,
    error: toApiError(error),
    onRetry: refetch,
    hasMore,
    loadMore,
    isTracked: (fullName: string) => trackedFullNames.includes(fullName),
    onTrack: (fullName: string) => dispatch(trackRepo(fullName)),
    onUntrack: (fullName: string) => dispatch(untrackRepo(fullName)),
  };
}
