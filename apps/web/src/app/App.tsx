import { Suspense, lazy, useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Container, Link } from "@mui/material";
import { OfflineBanner } from "@repo-radar/ui";
import { Header } from "./Header";
import { DashboardPage } from "./DashboardPage";
import { RouteFallback } from "./RouteFallback";
import { visuallyHidden } from "./visuallyHidden";
import { useOnlineStatus } from "./useOnlineStatus";

const SearchResultsSection = lazy(() =>
  import("../features/search/SearchResultsSection").then((m) => ({
    default: m.SearchResultsSection,
  })),
);

function App() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const isOnline = useOnlineStatus();

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
      {isOnline ? null : <OfflineBanner />}
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
