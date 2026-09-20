import { useMemo, useRef } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import { EmptyState } from "@repo-radar/ui";
import { TrackedRepoCard } from "./TrackedRepoCard";
import { useTrackedRepoView } from "./useTrackedRepoView";

const VIRTUALIZE_THRESHOLD = 20;
const ESTIMATED_ROW_HEIGHT = 180;
const GRID_GAP = 3;

function GridListItem({ fullName }: { fullName: string }) {
  return (
    <Box role="listitem" sx={{ display: "flex", minWidth: 0 }}>
      <TrackedRepoCard fullName={fullName} />
    </Box>
  );
}

export function TrackedReposSection() {
  const { trackedFullNames, sortedFullNames, clearFilters } = useTrackedRepoView();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const columns = isMd ? 3 : isSm ? 2 : 1;

  const rows = useMemo(() => {
    const chunked: string[][] = [];
    for (let i = 0; i < sortedFullNames.length; i += columns) {
      chunked.push(sortedFullNames.slice(i, i + columns));
    }
    return chunked;
  }, [sortedFullNames, columns]);

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 3,
  });

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
      <Box role="status" aria-live="polite">
        <EmptyState
          title="No tracked repos match these filters"
          description="Try widening the star range or activity dates."
          actionLabel="Clear filter"
          onAction={clearFilters}
        />
      </Box>
    );
  }

  if (sortedFullNames.length < VIRTUALIZE_THRESHOLD) {
    return (
      <Box
        role="list"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: GRID_GAP,
        }}
      >
        {sortedFullNames.map((fullName) => (
          <GridListItem key={fullName} fullName={fullName} />
        ))}
      </Box>
    );
  }

  return (
    <Box ref={parentRef} sx={{ maxHeight: "75vh", overflowY: "auto" }}>
      <Box role="list" sx={{ position: "relative", height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const rowFullNames = rows[virtualRow.index];
          if (!rowFullNames) return null;
          return (
            <Box
              key={virtualRow.index}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                pb: GRID_GAP,
                transform: `translateY(${virtualRow.start}px)`,
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: GRID_GAP,
              }}
            >
              {rowFullNames.map((fullName) => (
                <GridListItem key={fullName} fullName={fullName} />
              ))}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
