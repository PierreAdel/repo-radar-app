import { Skeleton, Stack } from "@mui/material";

export function TrackedRepoControlsSkeleton() {
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
