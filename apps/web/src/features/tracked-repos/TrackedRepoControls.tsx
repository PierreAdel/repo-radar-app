import { useState } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import {
  Button,
  MenuItem,
  Select,
  Slider,
  Stack,
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
      <Typography variant="h6" component="h2">
        Tracked repos
      </Typography>

      <Typography id="tracked-repos-star-filter-label" variant="body2" color="text.secondary">
        Stars: {formatCompactNumber(starRange[0])} – {formatCompactNumber(starRange[1])}
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexWrap="wrap"
        useFlexGap
        sx={{ gap: { xs: 0.5, sm: 2 } }}
      >
        <Slider
          size="small"
          value={starRange}
          min={0}
          max={maxStarBound}
          aria-labelledby="tracked-repos-star-filter-label"
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
          sx={{ width: { xs: "98%", sm: 320 } }}
        />

        {hasActiveFilters ? (
          <Button
            size="small"
            onClick={clearFilters}
            startIcon={<DeleteOutlineRoundedIcon fontSize="small" />}
            sx={{ flexShrink: 0, mb: { xs: 1, sm: 0 } }}
          >
            Clear filter
          </Button>
        ) : null}

        <Select
          size="small"
          value={sortKey}
          onChange={handleSortChange}
          aria-label="Sort tracked repos by"
          sx={{ flexShrink: 0, ml: { sm: "auto" } }}
        >
          <MenuItem value="stars">Stars</MenuItem>
          <MenuItem value="lastCommit">Last commit</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </Stack>
    </Stack>
  );
}
