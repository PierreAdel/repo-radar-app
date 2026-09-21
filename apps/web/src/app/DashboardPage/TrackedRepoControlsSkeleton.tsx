import { Skeleton, Stack } from "@mui/material";

export function TrackedRepoControlsSkeleton() {
  return (
    <Stack spacing={{ xs: 2.5, sm: 1.8 }} aria-hidden="true">
      <Skeleton variant="text" width={140} height={32} />
      <Skeleton variant="text" width={180} />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent={{ xs: "flex-start", sm: "space-between" }}
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
          width={100}
          height={40}
          sx={{ borderRadius: 1, ml: { sm: "auto" } }}
        />
      </Stack>
    </Stack>
  );
}
