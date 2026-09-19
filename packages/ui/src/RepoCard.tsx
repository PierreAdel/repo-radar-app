import type { ApiError, GithubRepo } from "@repo-radar/core";
import { formatCompactNumber, formatRelativeTime } from "@repo-radar/core";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import type { KeyboardEvent, MouseEvent } from "react";
import { useState } from "react";
import {
  alpha,
  Avatar,
  Button,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Link,
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
      <Card sx={{ p: 2 }}>
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
        sx={{
          p: 2,
          bgcolor: (theme) =>
            alpha(theme.palette.error.main, theme.palette.mode === "dark" ? 0.16 : 0.08),
        }}
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
    <RepoCardContent
      variant={variant}
      repo={repo}
      isTracked={isTracked}
      isLoading={isLoading}
      onTrack={onTrack}
      onUntrack={onUntrack}
      onRefresh={onRefresh}
    />
  );
}

interface RepoCardContentProps {
  variant: "result" | "tracked";
  repo: GithubRepo;
  isTracked?: boolean;
  isLoading?: boolean;
  onTrack?: () => void;
  onUntrack?: () => void;
  onRefresh?: () => void;
}

function RepoCardContent({
  variant,
  repo,
  isTracked,
  isLoading,
  onTrack,
  onUntrack,
  onRefresh,
}: RepoCardContentProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((value) => !value);

  const stopThen = (handler?: () => void) => (event: MouseEvent) => {
    event.stopPropagation();
    handler?.();
  };

  const hasDetails = Boolean(repo.language || repo.license || repo.homepage || repo.description);

  return (
    <Card
      onClick={toggleExpanded}
      onKeyDown={(event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleExpanded();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${expanded ? "Collapse" : "Expand"} details for ${repo.fullName}`}
      sx={{
        p: 2,
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.08 : 0.04),
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 6px 22px rgba(0,0,0,0.55)"
              : "0 6px 20px rgba(15,15,25,0.12)",
        },
      }}
    >
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
          <Stack direction="row" spacing={0.5} alignItems="center">
            {variant === "tracked" && onRefresh ? (
              <Tooltip title="Refresh">
                <IconButton size="small" onClick={stopThen(onRefresh)} disabled={isLoading}>
                  <RefreshRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : null}
            {isTracked ? (
              <Tooltip title="Untrack">
                <IconButton size="small" onClick={stopThen(onUntrack)}>
                  <BookmarkRemoveOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Track">
                <IconButton size="small" onClick={stopThen(onTrack)}>
                  <BookmarkAddOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Open on GitHub">
              <IconButton
                size="small"
                onClick={stopThen(() => window.open(repo.htmlUrl, "_blank", "noopener,noreferrer"))}
              >
                <OpenInNewRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {hasDetails ? (
              <ExpandMoreRoundedIcon
                fontSize="small"
                sx={{
                  color: "text.secondary",
                  transition: "transform 0.15s ease",
                  transform: expanded ? "rotate(180deg)" : "none",
                }}
              />
            ) : null}
          </Stack>
        </Stack>
        <Collapse in={expanded} unmountOnExit>
          <Stack spacing={1} sx={{ mt: 1.5, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="body2" color="text.secondary">
              {repo.description ?? "No description provided."}
            </Typography>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <LanguageRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
              <Typography variant="caption">{repo.language ?? "No language detected"}</Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              License: {repo.license ?? "None"}
            </Typography>
            {repo.homepage ? (
              <Link
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                variant="caption"
              >
                {repo.homepage}
              </Link>
            ) : (
              <Typography variant="caption" color="text.secondary">
                No homepage set
              </Typography>
            )}
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  );
}
