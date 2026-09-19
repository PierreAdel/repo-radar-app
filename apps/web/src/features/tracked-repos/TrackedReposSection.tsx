import { useMemo, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { EmptyState } from "@repo-radar/ui";
import { selectTrackedFullNames } from "@repo-radar/core";
import { useSearchParams } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { TrackedRepoCard } from "./TrackedRepoCard";
import { useTrackedRepoCacheEntries } from "./useTrackedRepoCacheEntries";

type SortKey = "stars" | "lastCommit" | "name";

const SORT_KEYS: readonly SortKey[] = ["stars", "lastCommit", "name"];
const DEFAULT_SORT_KEY: SortKey = "stars";
const PAGE_SIZE = 6;

function isSortKey(value: string | null): value is SortKey {
  return SORT_KEYS.includes(value as SortKey);
}

export function TrackedReposSection() {
  const trackedFullNames = useAppSelector(selectTrackedFullNames);
  const entries = useTrackedRepoCacheEntries();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get("sort");
  const sortKey: SortKey = isSortKey(sortParam) ? sortParam : DEFAULT_SORT_KEY;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const handleSortChange = (event: SelectChangeEvent) => {
    const next = event.target.value as SortKey;
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

  const sortedFullNames = useMemo(() => {
    const entryByFullName = new Map(entries.map((entry) => [entry.fullName, entry]));
    return [...trackedFullNames].sort((a, b) => {
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
  }, [entries, trackedFullNames, sortKey]);

  if (trackedFullNames.length === 0) {
    return (
      <EmptyState
        title="No tracked repositories yet"
        description="Search for a repository above and track it to see its stats here."
      />
    );
  }

  const visibleFullNames = sortedFullNames.slice(0, visibleCount);

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Tracked repos</Typography>
        <Select size="small" value={sortKey} onChange={handleSortChange}>
          <MenuItem value="stars">Stars</MenuItem>
          <MenuItem value="lastCommit">Last commit</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 3,
        }}
      >
        {visibleFullNames.map((fullName) => (
          <TrackedRepoCard key={fullName} fullName={fullName} />
        ))}
      </Box>
      {visibleCount < sortedFullNames.length ? (
        <Button variant="outlined" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
          Load more
        </Button>
      ) : null}
    </Stack>
  );
}
