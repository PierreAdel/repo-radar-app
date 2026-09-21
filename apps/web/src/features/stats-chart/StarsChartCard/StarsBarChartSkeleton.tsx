import { Skeleton, Stack } from "@mui/material";

const CHART_HEIGHT = 260;
// Mirrors StarsBarChart's default desktop page size (8 bars) so the fallback
// claims roughly the same footprint and the swap-in doesn't shift layout.
const SKELETON_BAR_HEIGHTS = [55, 80, 40, 95, 65, 30, 75, 50];

export function StarsBarChartSkeleton() {
  return (
    <Stack spacing={1} aria-hidden="true">
      <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ height: CHART_HEIGHT, px: 1 }}>
        {SKELETON_BAR_HEIGHTS.map((heightPct, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{ flex: 1, borderRadius: 0.75 }}
            height={`${heightPct}%`}
          />
        ))}
      </Stack>
      <Skeleton variant="text" width={48} sx={{ mx: "auto" }} />
    </Stack>
  );
}
