import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import { CircularProgress, Container, Stack } from "@mui/material";
import { Header } from "./Header";
import { TrackedRepoControls } from "./features/tracked-repos/TrackedRepoControls";
import { TrackedReposSection } from "./features/tracked-repos/TrackedReposSection";

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
      <TrackedRepoControls />
      <Suspense fallback={<RouteFallback />}>
        <StarsChartCard />
      </Suspense>
      <TrackedReposSection />
    </Stack>
  );
}

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
