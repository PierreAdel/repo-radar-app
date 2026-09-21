import { useRef } from "react";
import { Navigate } from "react-router";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import { RepoCard } from "@repo-radar/ui";
import { visuallyHidden } from "../../app/visuallyHidden";
import { MIN_QUERY_LENGTH, useRepoSearch } from "./useRepoSearch";

const VIRTUALIZE_THRESHOLD = 20;
const ESTIMATED_CARD_HEIGHT = 140;

interface SearchResultsListProps {
  items: ReturnType<typeof useRepoSearch>["items"];
  isTracked: (fullName: string) => boolean;
  onTrack: (fullName: string) => void;
  onUntrack: (fullName: string) => void;
}

function PlainResultsList({ items, isTracked, onTrack, onUntrack }: SearchResultsListProps) {
  return (
    <Stack component="ul" spacing={2} sx={{ listStyle: "none", m: 0, p: 0 }}>
      {items.map((repo) => (
        <Box component="li" key={repo.id}>
          <RepoCard
            variant="result"
            repo={repo}
            isTracked={isTracked(repo.fullName)}
            onTrack={() => onTrack(repo.fullName)}
            onUntrack={() => onUntrack(repo.fullName)}
          />
        </Box>
      ))}
    </Stack>
  );
}

function VirtualizedResultsList({ items, isTracked, onTrack, onUntrack }: SearchResultsListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_CARD_HEIGHT,
    overscan: 5,
  });

  return (
    <Box ref={parentRef} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
      <Box
        component="ul"
        sx={{
          position: "relative",
          height: virtualizer.getTotalSize(),
          listStyle: "none",
          m: 0,
          p: 0,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const repo = items[virtualRow.index];
          if (!repo) return null;
          return (
            <Box
              component="li"
              key={repo.id}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                pb: 2,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <RepoCard
                variant="result"
                repo={repo}
                isTracked={isTracked(repo.fullName)}
                onTrack={() => onTrack(repo.fullName)}
                onUntrack={() => onUntrack(repo.fullName)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export function SearchResultsSection() {
  const {
    query,
    items,
    isLoading,
    isLoadingMore,
    error,
    onRetry,
    hasMore,
    loadMore,
    isTracked,
    onTrack,
    onUntrack,
  } = useRepoSearch();

  if (query.length === 0) {
    return <Navigate to="/" replace />;
  }

  if (query.length < MIN_QUERY_LENGTH) {
    return (
      <Typography color="text.secondary" role="status">
        Type at least {MIN_QUERY_LENGTH} characters to search.
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Stack spacing={2} role="status" aria-live="polite" aria-label="Loading search results">
        {Array.from({ length: 4 }, (_, index) => (
          <RepoCard key={index} variant="result" isLoading />
        ))}
      </Stack>
    );
  }

  // A "Load more" failure still has page 1's items in the cache (RTK Query
  // keeps the last successful data around on a refetch error) - only replace
  // the whole section with the error card when there's nothing to show yet.
  if (error && items.length === 0) {
    return <RepoCard variant="result" error={error} onRefresh={onRetry} />;
  }

  if (items.length === 0) {
    return (
      <Typography color="text.secondary" role="status">
        No repositories found for &ldquo;{query}&rdquo;.
      </Typography>
    );
  }

  const ListComponent =
    items.length >= VIRTUALIZE_THRESHOLD ? VirtualizedResultsList : PlainResultsList;

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" component="h1" color="text.secondary" sx={visuallyHidden}>
        Search results
      </Typography>
      <ListComponent items={items} isTracked={isTracked} onTrack={onTrack} onUntrack={onUntrack} />
      {error ? (
        <Stack direction="row" spacing={1.5} alignItems="center" role="alert">
          <Typography variant="body2" color="error" sx={{ flex: 1 }}>
            {error.message}
          </Typography>
          <Button variant="outlined" size="small" onClick={onRetry}>
            Retry
          </Button>
        </Stack>
      ) : hasMore ? (
        <Button
          variant="outlined"
          onClick={loadMore}
          disabled={isLoadingMore}
          startIcon={isLoadingMore ? <CircularProgress size={16} /> : null}
        >
          {isLoadingMore ? "Loading…" : "Load more"}
        </Button>
      ) : null}
    </Stack>
  );
}
