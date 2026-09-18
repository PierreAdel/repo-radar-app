import { createTheme, type Theme, type PaletteMode } from "@mui/material/styles";

export function createAppTheme(mode: PaletteMode): Theme {
  return createTheme({
    palette: {
      mode,
      primary: { main: "#7c5cfc" },
      ...(mode === "dark"
        ? { background: { default: "#0b0b10", paper: "#15151d" } }
        : {}),
    },
    shape: { borderRadius: 12 },
  });
}
