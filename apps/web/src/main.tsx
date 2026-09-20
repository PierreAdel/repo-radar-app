import "./instrumentation";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { AppErrorBoundary } from "./app/AppErrorBoundary";
import { store } from "./app/store";
import { ThemedApp } from "./app/ThemedApp";

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
