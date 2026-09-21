import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";
import { lazy, Suspense } from "react";
import { useTrackedRepoView } from "../tracked-repos/useTrackedRepoView";

// @mui/x-charts is the heaviest dependency this card pulls in - split it into
// its own chunk so it's only fetched once a tracked repo actually has data to
// chart, instead of riding along with the rest of this already-lazy card.
const StarsBarChart = lazy(() =>
  import("@repo-radar/ui").then((m) => ({ default: m.StarsBarChart })),
);

const CHART_HEIGHT = 260;
// Mirrors StarsBarChart's default desktop page size (8 bars) so the fallback
// claims roughly the same footprint and the swap-in doesn't shift layout.
const SKELETON_BAR_HEIGHTS = [55, 80, 40, 95, 65, 30, 75, 50];

function StarsBarChartSkeleton() {
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

export interface StarsChartCardProps {
  // Passed through to StarsBarChart so tests can render it in its settled
  // state instead of mid-animation.
  skipAnimation?: boolean;
}

export function StarsChartCard({ skipAnimation }: StarsChartCardProps = {}) {
  const { entryByFullName, sortedFullNames } = useTrackedRepoView();
  const data = sortedFullNames
    .map((fullName) => entryByFullName.get(fullName)?.data)
    .filter((repo) => repo !== undefined)
    .map((repo) => ({
      // Keep the full "owner/repo" as the label - two different owners can
      // have a repo with the same name, and a band-scale axis needs unique
      // category values or same-named repos silently collapse onto the same
      // bar. StarsBarChart shortens it for display via an axis valueFormatter.
      label: repo.fullName,
      value: repo.stargazersCount,
    }));

  if (data.length === 0) {
    return null;
  }

  const missingCount = sortedFullNames.length - data.length;

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          fontWeight={600}
          sx={{ mb: missingCount > 0 ? 0.5 : 2 }}
        >
          Stars by repo
        </Typography>
        {missingCount > 0 ? (
          <Typography
            variant="caption"
            color="text.secondary"
            role="status"
            sx={{ display: "block", mb: 1.5 }}
          >
            Showing {data.length} of {sortedFullNames.length} tracked repos — the rest are still
            loading or failed to load.
          </Typography>
        ) : null}
        <Suspense fallback={<StarsBarChartSkeleton />}>
          <StarsBarChart data={data} skipAnimation={skipAnimation} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
