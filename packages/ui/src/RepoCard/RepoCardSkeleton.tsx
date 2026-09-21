import { Card, Skeleton, Stack } from "@mui/material";

export function RepoCardSkeleton() {
  return (
    <Card sx={{ p: 2, width: "100%" }}>
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Skeleton variant="circular" width={40} height={40} />
        <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Skeleton variant="text" width="55%" sx={{ flex: 1, minWidth: 0 }} />
            <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
              <Skeleton variant="circular" width={28} height={28} />
              <Skeleton variant="circular" width={28} height={28} />
              <Skeleton variant="circular" width={28} height={28} />
            </Stack>
          </Stack>
          <Skeleton variant="text" width="70%" />
          <Stack direction="row" spacing={2} sx={{ pt: 0.5 }}>
            <Skeleton variant="text" width={40} />
            <Skeleton variant="text" width={40} />
            <Skeleton variant="text" width={64} />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
