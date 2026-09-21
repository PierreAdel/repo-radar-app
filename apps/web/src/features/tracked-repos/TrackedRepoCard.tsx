import { useCallback } from "react";
import { toApiError, untrackRepo, useGetRepositoryQuery } from "@repo-radar/core";
import { RepoCard } from "@repo-radar/ui";
import { useAppDispatch } from "../../app/store/hooks";

export function TrackedRepoCard({ fullName }: { fullName: string }) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, error, refetch } = useGetRepositoryQuery(fullName);

  const onUntrack = useCallback(() => dispatch(untrackRepo(fullName)), [dispatch, fullName]);
  const onRefresh = useCallback(() => refetch(), [refetch]);

  return (
    <RepoCard
      variant="tracked"
      repo={data}
      isTracked
      isLoading={isLoading || isFetching}
      error={toApiError(error)}
      onUntrack={onUntrack}
      onRefresh={onRefresh}
    />
  );
}
