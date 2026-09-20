import { Suspense, lazy, useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { CircularProgress, Container, Link, Stack, Typography } from "@mui/material";
import { Header } from "./Header";
import { TrackedRepoControls } from "./features/tracked-repos/TrackedRepoControls";
import { TrackedReposSection } from "./features/tracked-repos/TrackedReposSection";

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

const SearchResultsSection = lazy(() =>
  import("./features/search/SearchResultsSection").then((m) => ({
    default: m.SearchResultsSection,
  })),
);
const StarsChartCard = lazy(() =>
  import("./features/stats-chart/StarsChartCard").then((m) => ({ default: m.StarsChartCard })),
);

function RouteFallback() {
  return (
    <Stack alignItems="center" sx={{ py: 6 }}>
      <CircularProgress size={28} />
    </Stack>
  );
}

function DashboardPage() {
  return (
    <Stack spacing={4}>
      <Typography component="h1" sx={visuallyHidden}>
        Dashboard
      </Typography>
      <TrackedRepoControls />
      <Suspense fallback={<RouteFallback />}>
        <StarsChartCard />
      </Suspense>
      <TrackedReposSection />
    </Stack>
  );
}

function App() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus();
  }, [location.pathname]);

  return (
    <>
      <Link
        href="#main-content"
        sx={{
          ...visuallyHidden,
          "&:focus": {
            position: "fixed",
            top: 8,
            left: 8,
            width: "auto",
            height: "auto",
            clip: "auto",
            overflow: "visible",
            zIndex: 2000,
            p: 1,
            bgcolor: "background.paper",
          },
        }}
      >
        Skip to main content
      </Link>
      <Header />
      <Container
        component="main"
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        maxWidth="lg"
        sx={{ py: 4, outline: "none" }}
      >
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route
            path="/search"
            element={
              <Suspense fallback={<RouteFallback />}>
                <SearchResultsSection />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
