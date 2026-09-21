import { Suspense, lazy } from "react";
import { Stack, Typography } from "@mui/material";
import { selectTrackedFullNames } from "@repo-radar/core";
import { useAppSelector } from "../store/hooks";
import { TrackedReposSection } from "../../features/tracked-repos/TrackedReposSection/TrackedReposSection";
import { visuallyHidden } from "../visuallyHidden";
import { TrackedRepoControlsSkeleton } from "./TrackedRepoControlsSkeleton";
import { StarsChartCardSkeleton } from "../../features/stats-chart/StarsChartCard/StarsChartCardSkeleton";

const StarsChartCard = lazy(() =>
  import("../../features/stats-chart/StarsChartCard/StarsChartCard").then((m) => ({
    default: m.StarsChartCard,
  })),
);
const TrackedRepoControls = lazy(() =>
  import("../../features/tracked-repos/TrackedRepoControls/TrackedRepoControls").then((m) => ({
    default: m.TrackedRepoControls,
  })),
);

export function DashboardPage() {
  const hasTrackedRepos = useAppSelector(selectTrackedFullNames).length > 0;

  return (
    <Stack spacing={4}>
      <Typography component="h1" sx={visuallyHidden}>
        Dashboard
      </Typography>
      {hasTrackedRepos ? (
        <>
          <Suspense fallback={<TrackedRepoControlsSkeleton />}>
            <TrackedRepoControls />
          </Suspense>
          <Suspense fallback={<StarsChartCardSkeleton />}>
            <StarsChartCard />
          </Suspense>
        </>
      ) : null}
      <TrackedReposSection />
    </Stack>
  );
}
