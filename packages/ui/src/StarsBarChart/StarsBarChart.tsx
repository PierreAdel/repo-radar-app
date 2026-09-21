import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";
import { formatCompactNumber } from "@repo-radar/core";

// MUI's sx treats bare numbers for width/height as fractions (1 -> "100%"),
// not px, so these need explicit units or the "1x1px" box becomes full-size
// and inflates the page's scrollable area even though it stays invisible.
const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

export interface StarsBarChartDatum {
  label: string;
  value: number;
}

export interface StarsBarChartProps {
  data: StarsBarChartDatum[];
  height?: number;
  // Lets tests render the chart in its settled state instead of mid-animation,
  // since @mui/x-charts otherwise animates bar heights in on every mount.
  skipAnimation?: boolean;
}

const PAGE_SIZE_DEFAULT = 8;
const PAGE_SIZE_SMALL = 3;

export function StarsBarChart({ data, height = 260, skipAnimation }: StarsBarChartProps) {
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
      <Box aria-hidden="true">
        <BarChart
          height={height}
          skipAnimation={skipAnimation}
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
      </Box>
      <Typography component="p" sx={visuallyHidden}>
        {pageData.map((d) => `${d.label}: ${formatCompactNumber(d.value)} stars`).join("; ")}
      </Typography>
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
          <Typography variant="caption" color="text.secondary" role="status" aria-live="polite">
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
