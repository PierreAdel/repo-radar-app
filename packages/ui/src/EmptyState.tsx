import type { ReactNode } from "react";
import { Button, Stack, Typography } from "@mui/material";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1.5}
      sx={{
        py: 6,
        px: 2,
        textAlign: "center",
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      {icon}
      <Typography variant="subtitle1" fontWeight={600}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      ) : null}
      {actionLabel && onAction ? (
        <Button variant="outlined" size="small" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Stack>
  );
}
