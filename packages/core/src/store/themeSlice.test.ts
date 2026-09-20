import { describe, expect, it } from "vitest";
import { themeReducer, toggleTheme, setTheme, type ThemeState } from "./themeSlice";

describe("themeSlice", () => {
  it("toggles between dark and light", () => {
    const dark: ThemeState = { mode: "dark" };
    expect(themeReducer(dark, toggleTheme()).mode).toBe("light");
    const light: ThemeState = { mode: "light" };
    expect(themeReducer(light, toggleTheme()).mode).toBe("dark");
  });

  it("sets an explicit mode", () => {
    const state: ThemeState = { mode: "dark" };
    expect(themeReducer(state, setTheme("light")).mode).toBe("light");
  });
});
