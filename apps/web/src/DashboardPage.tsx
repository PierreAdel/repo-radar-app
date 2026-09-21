import { Suspense, lazy } from "react";
import { Stack, Typography } from "@mui/material";
import { TrackedRepoControls } from "./features/tracked-repos/TrackedRepoControls";
import { TrackedReposSection } from "./features/tracked-repos/TrackedReposSection";
import { RouteFallback } from "./RouteFallback";
import { visuallyHidden } from "./visuallyHidden";

const StarsChartCard = lazy(() =>
  import("./features/stats-chart/StarsChartCard").then((m) => ({ default: m.StarsChartCard })),
);

export function DashboardPage() {
  return (
    <Stack spacing={4}>
      <Typography component="h1" sx={visuallyHidden}>
        Dashboard
      </Typography>
      <TrackedRepoControls />
      <Suspense fallback={<RouteFallback />}>
        <StarsChartCard />
      </Suspense>
      <TrackedReposSection />
    </Stack>
  );
}
