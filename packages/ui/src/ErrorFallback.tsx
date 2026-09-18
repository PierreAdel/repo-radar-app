import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Button, Stack, Typography } from "@mui/material";

export interface ErrorFallbackProps {
  onRetry: () => void;
  onReport?: () => void;
  details?: string;
}

export function ErrorFallback({ onRetry, onReport, details }: ErrorFallbackProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ minHeight: "100vh", textAlign: "center", px: 3 }}
    >
      <ErrorOutlineRoundedIcon color="error" sx={{ fontSize: 48 }} />
      <Typography variant="h5" fontWeight={600}>
        Something went wrong
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
        {details ?? "An unexpected error occurred while rendering the dashboard."}
      </Typography>
      <Stack direction="row" spacing={1.5}>
        <Button variant="contained" onClick={onRetry}>
          Try again
        </Button>
        {onReport ? (
          <Button variant="outlined" onClick={onReport}>
            Report
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
}
