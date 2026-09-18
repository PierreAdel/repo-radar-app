import { useEffect, useState } from "react";
import {
  selectTrackedFullNames,
  toApiError,
  trackRepo,
  untrackRepo,
  useDebouncedValue,
  useSearchRepositoriesQuery,
} from "@repo-radar/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const MIN_QUERY_LENGTH = 2;

export function useRepoSearch() {
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebouncedValue(inputValue, 400).trim();
  const dispatch = useAppDispatch();
  const trackedFullNames = useAppSelector(selectTrackedFullNames);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const skip = debouncedQuery.length < MIN_QUERY_LENGTH;
  const { data, isLoading, error } = useSearchRepositoriesQuery(
    { query: debouncedQuery, page },
    { skip },
  );

  const items = data?.items ?? [];
  const hasMore = !skip && items.length < (data?.totalCount ?? 0);

  return {
    inputValue,
    setInputValue,
    debouncedQuery,
    items,
    isLoading: isLoading && page === 1,
    error: toApiError(error),
    hasMore,
    loadMore: () => setPage((current) => current + 1),
    isTracked: (fullName: string) => trackedFullNames.includes(fullName),
    onTrack: (fullName: string) => dispatch(trackRepo(fullName)),
    onUntrack: (fullName: string) => dispatch(untrackRepo(fullName)),
  };
}
