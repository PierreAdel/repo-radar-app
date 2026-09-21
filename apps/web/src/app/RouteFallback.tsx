import { CircularProgress, Stack } from "@mui/material";

export function RouteFallback() {
  return (
    <Stack alignItems="center" sx={{ py: 6 }}>
      <CircularProgress size={28} />
    </Stack>
  );
}
