import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { EmptyState } from "@repo-radar/ui";
import { TrackedRepoCard } from "./TrackedRepoCard";
import { useTrackedRepoView } from "./useTrackedRepoView";

const PAGE_SIZE = 6;

export function TrackedReposSection() {
  const { trackedFullNames, sortedFullNames, clearFilters } = useTrackedRepoView();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (trackedFullNames.length === 0) {
    return (
      <EmptyState
        title="No tracked repositories yet"
        description="Search for a repository above and track it to see its stats here."
      />
    );
  }

  if (sortedFullNames.length === 0) {
    return (
      <EmptyState
        title="No tracked repos match these filters"
        description="Try widening the star range or activity dates."
        actionLabel="Clear filter"
        onAction={clearFilters}
      />
    );
  }

  const visibleFullNames = sortedFullNames.slice(0, visibleCount);

  return (
    <Stack spacing={2}>
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
