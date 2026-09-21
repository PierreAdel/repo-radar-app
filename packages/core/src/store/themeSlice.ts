import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage } from "./persistence.js";

const STORAGE_KEY = "repo-radar/theme";

export type ThemeMode = "light" | "dark";

export interface ThemeState {
  mode: ThemeMode;
}

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}

const initialState: ThemeState = {
  mode: loadFromStorage(STORAGE_KEY, isThemeMode) ?? "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const THEME_STORAGE_KEY = STORAGE_KEY;

export const selectThemeMode = (state: { theme: ThemeState }) => state.theme.mode;
