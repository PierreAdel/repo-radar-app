import { Navigate, Route, Routes } from "react-router";
import { Container, Stack } from "@mui/material";
import { Header } from "./Header";
import { SearchResultsSection } from "./features/search/SearchResultsSection";
import { StarsChartCard } from "./features/stats-chart/StarsChartCard";
import { TrackedRepoControls } from "./features/tracked-repos/TrackedRepoControls";
import { TrackedReposSection } from "./features/tracked-repos/TrackedReposSection";

function DashboardPage() {
  return (
    <Stack spacing={4}>
      <TrackedRepoControls />
      <StarsChartCard />
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
          <Route path="/search" element={<SearchResultsSection />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
