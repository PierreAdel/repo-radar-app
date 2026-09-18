import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { AppErrorBoundary } from "./app/AppErrorBoundary";
import { store } from "./app/store";
import { ThemedApp } from "./app/ThemedApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppErrorBoundary>
        <ThemedApp />
      </AppErrorBoundary>
    </Provider>
  </StrictMode>,
);
