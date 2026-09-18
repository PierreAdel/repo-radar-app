import { Container, Stack } from "@mui/material";
import { Header } from "./Header";
import { SearchResultsSection } from "./features/search/SearchResultsSection";
import { useRepoSearch } from "./features/search/useRepoSearch";
import { StarsChartCard } from "./features/stats-chart/StarsChartCard";
import { TrackedReposSection } from "./features/tracked-repos/TrackedReposSection";

function App() {
  const search = useRepoSearch();

  return (
    <>
      <Header searchValue={search.inputValue} onSearchChange={search.setInputValue} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {search.debouncedQuery ? (
            <SearchResultsSection search={search} />
          ) : (
            <>
              <StarsChartCard />
              <TrackedReposSection />
            </>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default App;
