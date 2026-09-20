import { Card, CardContent, Typography } from "@mui/material";
import { StarsBarChart } from "@repo-radar/ui";
import { useTrackedRepoView } from "../tracked-repos/useTrackedRepoView";

export function StarsChartCard() {
  const { entryByFullName, sortedFullNames } = useTrackedRepoView();
  const data = sortedFullNames
    .map((fullName) => entryByFullName.get(fullName)?.data)
    .filter((repo) => repo !== undefined)
    .map((repo) => ({
      label: repo.fullName.split("/")[1] ?? repo.fullName,
      value: repo.stargazersCount,
    }));

  if (data.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Stars over time
        </Typography>
        <StarsBarChart data={data} />
      </CardContent>
    </Card>
  );
}
