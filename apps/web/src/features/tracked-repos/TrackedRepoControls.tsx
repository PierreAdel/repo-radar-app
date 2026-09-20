import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { formatCompactNumber } from "@repo-radar/core";
import { type SortKey, useTrackedRepoView } from "./useTrackedRepoView";

export function TrackedRepoControls() {
  const {
    trackedFullNames,
    sortKey,
    setSortKey,
    filters,
    setFilters,
    clearFilters,
    hasActiveFilters,
    maxStarBound,
  } = useTrackedRepoView();
  const [starRangeDraft, setStarRangeDraft] = useState<[number, number] | null>(null);

  if (trackedFullNames.length === 0) {
    return null;
  }

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortKey(event.target.value as SortKey);
  };

  const starRange: [number, number] = starRangeDraft ?? [
    filters.minStars ?? 0,
    filters.maxStars ?? maxStarBound,
  ];

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <Typography variant="h6">Tracked repos</Typography>
        <Select size="small" value={sortKey} onChange={handleSortChange}>
          <MenuItem value="stars">Stars</MenuItem>
          <MenuItem value="lastCommit">Last commit</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </Stack>

      <Stack
        direction="row"
        spacing={4}
        alignItems="flex-start"
        flexWrap="wrap"
        useFlexGap
        sx={{ rowGap: 2 }}
      >
        <Box sx={{ minWidth: 220, flex: "1 1 220px", maxWidth: 320 }}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Stars: {formatCompactNumber(starRange[0])} – {formatCompactNumber(starRange[1])}
          </Typography>
          <Slider
            size="small"
            value={starRange}
            min={0}
            max={maxStarBound}
            onChange={(_event, value) => setStarRangeDraft(value as [number, number])}
            onChangeCommitted={(_event, value) => {
              const [min, max] = value as [number, number];
              setFilters({
                minStars: min > 0 ? min : undefined,
                maxStars: max < maxStarBound ? max : undefined,
              });
              setStarRangeDraft(null);
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatCompactNumber(value)}
          />
        </Box>
        <Stack direction="row" spacing={1.5}>
          <TextField
            label="Active after"
            type="date"
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            value={filters.activeFrom ?? ""}
            onChange={(event) => setFilters({ activeFrom: event.target.value || undefined })}
          />
          <TextField
            label="Active before"
            type="date"
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            value={filters.activeTo ?? ""}
            onChange={(event) => setFilters({ activeTo: event.target.value || undefined })}
          />
        </Stack>
        {hasActiveFilters ? (
          <Button size="small" onClick={clearFilters} sx={{ alignSelf: "center" }}>
            Clear filters
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
}
