import { Card, CardContent, Typography } from "@mui/material";
import { lazy, Suspense } from "react";
import { useTrackedRepoView } from "../tracked-repos/useTrackedRepoView";
import { StarsBarChartSkeleton } from "./StarsBarChartSkeleton";

// @mui/x-charts is the heaviest dependency this card pulls in - split it into
// its own chunk so it's only fetched once a tracked repo actually has data to
// chart, instead of riding along with the rest of this already-lazy card.
const StarsBarChart = lazy(() =>
  import("@repo-radar/ui").then((m) => ({ default: m.StarsBarChart })),
);

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
