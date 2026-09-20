import { createTheme, type Theme, type PaletteMode } from "@mui/material/styles";

export function createAppTheme(mode: PaletteMode): Theme {
  return createTheme({
    palette: {
      mode,
      primary: { main: "#7c5cfc" },
      ...(mode === "dark" ? { background: { default: "#0b0b10", paper: "#15151d" } } : {}),
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCard: {
        defaultProps: { variant: "elevation" },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 20,
            border: "none",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 2px 16px rgba(0,0,0,0.45)"
                : "0 2px 12px rgba(15,15,25,0.07)",
          }),
        },
      },
    },
  });
}
