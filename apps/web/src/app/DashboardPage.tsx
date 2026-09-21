import { Suspense, lazy } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import { TrackedReposSection } from "../features/tracked-repos/TrackedReposSection";
import { RouteFallback } from "./RouteFallback";
import { visuallyHidden } from "./visuallyHidden";

const StarsChartCard = lazy(() =>
  import("../features/stats-chart/StarsChartCard").then((m) => ({ default: m.StarsChartCard })),
);
const TrackedRepoControls = lazy(() =>
  import("../features/tracked-repos/TrackedRepoControls").then((m) => ({
    default: m.TrackedRepoControls,
  })),
);

function TrackedRepoControlsSkeleton() {
  return (
    <Stack spacing={2} aria-hidden="true">
      <Skeleton variant="text" width={140} height={32} />
      <Skeleton variant="text" width={180} />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <Skeleton
          variant="rectangular"
          height={4}
          sx={{ width: { xs: "98%", sm: 320 }, borderRadius: 2 }}
        />
        <Skeleton
          variant="rectangular"
          width={110}
          height={36}
          sx={{ borderRadius: 1, ml: { sm: "auto" } }}
        />
      </Stack>
    </Stack>
  );
}

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
