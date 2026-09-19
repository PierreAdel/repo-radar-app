import type { ApiError, GithubRepo } from "@repo-radar/core";
import { formatCompactNumber, formatRelativeTime } from "@repo-radar/core";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

export interface RepoCardProps {
  variant: "result" | "tracked";
  repo?: GithubRepo;
  isTracked?: boolean;
  isLoading?: boolean;
  error?: ApiError;
  onTrack?: () => void;
  onUntrack?: () => void;
  onRefresh?: () => void;
}

export function RepoCard({
  variant,
  repo,
  isTracked,
  isLoading,
  error,
  onTrack,
  onUntrack,
  onRefresh,
}: RepoCardProps) {
  if (isLoading && !repo) {
    return (
      <Card variant="outlined" sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Skeleton variant="circular" width={40} height={40} />
          <Stack sx={{ flex: 1 }} spacing={0.5}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </Stack>
        </Stack>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        variant="outlined"
        sx={{ p: 2, borderColor: "error.main", bgcolor: "error.main", opacity: 0.9 }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <ReportProblemRoundedIcon color="error" />
          <Typography variant="body2" sx={{ flex: 1 }}>
            {error.message}
          </Typography>
          {onRefresh ? (
            <Button size="small" onClick={onRefresh}>
              Retry
            </Button>
          ) : null}
        </Stack>
      </Card>
    );
  }

  if (!repo) {
    return null;
  }

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Avatar src={repo.ownerAvatarUrl} alt={repo.ownerLogin} sx={{ width: 40, height: 40 }} />
          <Stack sx={{ flex: 1, minWidth: 0 }} spacing={0.5}>
            <Typography variant="subtitle2" noWrap title={repo.fullName}>
              {repo.fullName}
            </Typography>
            {repo.description ? (
              <Typography variant="body2" color="text.secondary" noWrap>
                {repo.description}
              </Typography>
            ) : null}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 0.5 }}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <StarBorderRoundedIcon fontSize="small" />
                <Typography variant="caption">
                  {formatCompactNumber(repo.stargazersCount)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <ErrorOutlineRoundedIcon fontSize="small" />
                <Typography variant="caption">
                  {formatCompactNumber(repo.openIssuesCount)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <HistoryRoundedIcon fontSize="small" />
                <Typography variant="caption">{formatRelativeTime(repo.pushedAt)}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            {variant === "tracked" && onRefresh ? (
              <Tooltip title="Refresh">
                <IconButton size="small" onClick={onRefresh} disabled={isLoading}>
                  <RefreshRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : null}
            {isTracked ? (
              <Tooltip title="Untrack">
                <IconButton size="small" onClick={onUntrack}>
                  <BookmarkRemoveOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Track">
                <IconButton size="small" onClick={onTrack}>
                  <BookmarkAddOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
