import { Card, CardContent, Typography } from "@mui/material";
import { StarsBarChart } from "@repo-radar/ui";
import { useTrackedRepoCacheEntries } from "../tracked-repos/useTrackedRepoCacheEntries";

export function StarsChartCard() {
  const entries = useTrackedRepoCacheEntries();
  const data = entries
    .filter((entry) => entry.data)
    .map((entry) => ({
      label: entry.data!.fullName.split("/")[1] ?? entry.data!.fullName,
      value: entry.data!.stargazersCount,
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
