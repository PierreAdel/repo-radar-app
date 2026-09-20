import { Navigate } from "react-router";
import { Button, Stack, Typography } from "@mui/material";
import { RepoCard } from "@repo-radar/ui";
import { MIN_QUERY_LENGTH, useRepoSearch } from "./useRepoSearch";

export function SearchResultsSection() {
  const { query, items, isLoading, error, hasMore, loadMore, isTracked, onTrack, onUntrack } =
    useRepoSearch();

  if (query.length === 0) {
    return <Navigate to="/" replace />;
  }

  if (query.length < MIN_QUERY_LENGTH) {
    return (
      <Typography color="text.secondary">
        Type at least {MIN_QUERY_LENGTH} characters to search.
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Stack spacing={2}>
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
      <Typography color="text.secondary">
        No repositories found for &ldquo;{query}&rdquo;.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
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
          Load more
        </Button>
      ) : null}
    </Stack>
  );
}
