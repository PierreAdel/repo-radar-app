import { Alert } from "@mui/material";

export function OfflineBanner() {
  return (
    <Alert severity="warning" role="status" sx={{ borderRadius: 0 }}>
      You&rsquo;re offline. Showing the last loaded data — some information may be out of date.
    </Alert>
  );
}
