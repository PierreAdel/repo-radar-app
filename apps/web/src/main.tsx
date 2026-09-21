import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { AppErrorBoundary } from "./app/AppErrorBoundary";
import { store } from "./app/store";
import { ThemedApp } from "./app/ThemedApp";
import { loadSentry } from "./instrumentation";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppErrorBoundary>
          <ThemedApp />
        </AppErrorBoundary>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);

// Load Sentry once the browser is idle rather than blocking the initial
// render - Safari has no requestIdleCallback, so it falls back to a
// same-tick-deferred setTimeout there.
const scheduleIdle =
  typeof window.requestIdleCallback === "function"
    ? window.requestIdleCallback
    : (cb: () => void) => setTimeout(cb, 1);
scheduleIdle(() => {
  void loadSentry();
});
