import { Card, CardContent, Skeleton } from "@mui/material";
import { StarsBarChartSkeleton } from "./StarsBarChartSkeleton";

export function StarsChartCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="rectangular" height={32} width={150} />
        <StarsBarChartSkeleton />
      </CardContent>
    </Card>
  );
}
