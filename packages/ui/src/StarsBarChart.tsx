import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";
import { formatCompactNumber } from "@repo-radar/core";

export interface StarsBarChartDatum {
  label: string;
  value: number;
}

export interface StarsBarChartProps {
  data: StarsBarChartDatum[];
  height?: number;
}

const PAGE_SIZE_DEFAULT = 8;
const PAGE_SIZE_SMALL = 3;

export function StarsBarChart({ data, height = 260 }: StarsBarChartProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const pageSize = isSmallScreen ? PAGE_SIZE_SMALL : PAGE_SIZE_DEFAULT;
  const [page, setPage] = useState(0);

  const pageCount = Math.max(1, Math.ceil(data.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const pageData = data.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  const categoryAxis = {
    data: pageData.map((d) => d.label),
    scaleType: "band" as const,
    categoryGapRatio: 0.4,
    barGapRatio: 0.2,
    valueFormatter: (value: string) => value.split("/")[1] ?? value,
  };
  const valueAxis = {
    valueFormatter: (value: number) => formatCompactNumber(value),
  };

  return (
    <Stack spacing={1}>
      <BarChart
        height={height}
        series={[
          {
            data: pageData.map((d) => d.value),
            label: "Stars",
            color: theme.palette.primary.main,
            valueFormatter: (value: number | null) => formatCompactNumber(value ?? 0),
          },
        ]}
        xAxis={[categoryAxis]}
        yAxis={[valueAxis]}
        borderRadius={6}
        grid={{ horizontal: true }}
        margin={isSmallScreen ? { left: 44, right: 0 } : { left: 56 }}
        slotProps={{ legend: { hidden: true } }}
      />
      {pageCount > 1 ? (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <IconButton
            size="small"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            aria-label="Previous repos"
          >
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            {currentPage + 1} / {pageCount}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={currentPage >= pageCount - 1}
            aria-label="Next repos"
          >
            <ChevronRightRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      ) : null}
    </Stack>
  );
}
