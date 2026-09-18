import { Button, Stack, Typography } from "@mui/material";
import { RepoCard } from "@repo-radar/ui";
import type { useRepoSearch } from "./useRepoSearch";

export interface SearchResultsSectionProps {
  search: ReturnType<typeof useRepoSearch>;
}

export function SearchResultsSection({ search }: SearchResultsSectionProps) {
  const { debouncedQuery, items, isLoading, error, hasMore, loadMore, isTracked, onTrack, onUntrack } = search;

  if (!debouncedQuery) {
    return null;
  }

  if (isLoading) {
    return (
      <Stack spacing={1.5}>
        {Array.from({ length: 4 }, (_, index) => (
          <RepoCard key={index} variant="result" isLoading />
        ))}
      </Stack>
    );
  }

  if (error) {
    return <RepoCard variant="result" error={error} />;
  }

  if (items.length === 0) {
    return (
      <Typography color="text.secondary">No repositories found for &ldquo;{debouncedQuery}&rdquo;.</Typography>
    );
  }

  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2" color="text.secondary">
        Search results
      </Typography>
      {items.map((repo) => (
        <RepoCard
          key={repo.id}
          variant="result"
          repo={repo}
          isTracked={isTracked(repo.fullName)}
          onTrack={() => onTrack(repo.fullName)}
          onUntrack={() => onUntrack(repo.fullName)}
        />
      ))}
      {hasMore ? (
        <Button variant="outlined" onClick={loadMore}>
          Load 10 more
        </Button>
      ) : null}
    </Stack>
  );
}
