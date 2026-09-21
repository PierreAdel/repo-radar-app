import { Suspense, lazy } from "react";
import { Stack, Typography } from "@mui/material";
import { TrackedReposSection } from "../../features/tracked-repos/TrackedReposSection";
import { RouteFallback } from "../RouteFallback/RouteFallback";
import { visuallyHidden } from "../visuallyHidden";
import { TrackedRepoControlsSkeleton } from "./TrackedRepoControlsSkeleton";

const StarsChartCard = lazy(() =>
  import("../../features/stats-chart/StarsChartCard").then((m) => ({
    default: m.StarsChartCard,
  })),
);
const TrackedRepoControls = lazy(() =>
  import("../../features/tracked-repos/TrackedRepoControls").then((m) => ({
    default: m.TrackedRepoControls,
  })),
);

export function DashboardPage() {
  return (
    <Stack spacing={4}>
      <Typography component="h1" sx={visuallyHidden}>
        Dashboard
      </Typography>
      <Suspense fallback={<TrackedRepoControlsSkeleton />}>
        <TrackedRepoControls />
      </Suspense>
      <Suspense fallback={<RouteFallback />}>
        <StarsChartCard />
      </Suspense>
      <TrackedReposSection />
    </Stack>
  );
}
