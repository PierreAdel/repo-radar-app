import { Card, CardContent, Typography } from "@mui/material";
import { StarsBarChart } from "@repo-radar/ui";
import { useTrackedRepoView } from "../tracked-repos/useTrackedRepoView";

export interface StarsChartCardProps {
  // Passed through to StarsBarChart so tests can render it in its settled
  // state instead of mid-animation.
  skipAnimation?: boolean;
}

export function StarsChartCard({ skipAnimation }: StarsChartCardProps = {}) {
  const { entryByFullName, sortedFullNames } = useTrackedRepoView();
  const data = sortedFullNames
    .map((fullName) => entryByFullName.get(fullName)?.data)
    .filter((repo) => repo !== undefined)
    .map((repo) => ({
      // Keep the full "owner/repo" as the label - two different owners can
      // have a repo with the same name, and a band-scale axis needs unique
      // category values or same-named repos silently collapse onto the same
      // bar. StarsBarChart shortens it for display via an axis valueFormatter.
      label: repo.fullName,
      value: repo.stargazersCount,
    }));

  if (data.length === 0) {
    return null;
  }

  const missingCount = sortedFullNames.length - data.length;

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          fontWeight={600}
          sx={{ mb: missingCount > 0 ? 0.5 : 2 }}
        >
          Stars by repo
        </Typography>
        {missingCount > 0 ? (
          <Typography
            variant="caption"
            color="text.secondary"
            role="status"
            sx={{ display: "block", mb: 1.5 }}
          >
            Showing {data.length} of {sortedFullNames.length} tracked repos — the rest are still
            loading or failed to load.
          </Typography>
        ) : null}
        <StarsBarChart data={data} skipAnimation={skipAnimation} />
      </CardContent>
    </Card>
  );
}
