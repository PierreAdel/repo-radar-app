import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createAppTheme } from "@repo-radar/ui";
import { selectThemeMode } from "@repo-radar/core";
import { useAppSelector } from "../store/hooks";
import App from "../App/App";

export function ThemedApp() {
  const mode = useAppSelector(selectThemeMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
