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

  return <StarsBarChart data={data} />;
}
