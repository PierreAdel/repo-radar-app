import { BarChart } from "@mui/x-charts/BarChart";

export interface StarsBarChartDatum {
  label: string;
  value: number;
}

export interface StarsBarChartProps {
  data: StarsBarChartDatum[];
  height?: number;
}

export function StarsBarChart({ data, height = 260 }: StarsBarChartProps) {
  return (
    <BarChart
      height={height}
      series={[{ data: data.map((d) => d.value), label: "Stars", color: "#7c5cfc" }]}
      xAxis={[{ data: data.map((d) => d.label), scaleType: "band" }]}
      margin={{ left: 56 }}
    />
  );
}
