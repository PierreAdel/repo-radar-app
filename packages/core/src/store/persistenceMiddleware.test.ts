import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi } from "vitest";
import * as persistence from "./persistence.js";
import { persistenceMiddleware } from "./persistenceMiddleware.js";
import { trackRepo, untrackRepo, trackedReposReducer } from "./trackedReposSlice.js";
import { toggleTheme, setTheme, themeReducer } from "./themeSlice.js";

function makeStore() {
  return configureStore({
    reducer: { trackedRepos: trackedReposReducer, theme: themeReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(persistenceMiddleware.middleware),
  });
}

describe("persistenceMiddleware", () => {
  it("persists tracked repos on trackRepo/untrackRepo", () => {
    const saveSpy = vi.spyOn(persistence, "saveToStorage").mockImplementation(() => {});
    const store = makeStore();

    store.dispatch(trackRepo("octocat/hello-world"));
    expect(saveSpy).toHaveBeenCalledWith("repo-radar/tracked-repos", ["octocat/hello-world"]);

    store.dispatch(untrackRepo("octocat/hello-world"));
    expect(saveSpy).toHaveBeenCalledWith("repo-radar/tracked-repos", []);

    saveSpy.mockRestore();
  });

  it("persists theme on toggleTheme/setTheme", () => {
    const saveSpy = vi.spyOn(persistence, "saveToStorage").mockImplementation(() => {});
    const store = makeStore();

    store.dispatch(setTheme("light"));
    expect(saveSpy).toHaveBeenCalledWith("repo-radar/theme", "light");

    store.dispatch(toggleTheme());
    expect(saveSpy).toHaveBeenCalledWith("repo-radar/theme", "dark");

    saveSpy.mockRestore();
  });

  it("does not persist on unrelated actions", () => {
    const saveSpy = vi.spyOn(persistence, "saveToStorage").mockImplementation(() => {});
    const store = makeStore();

    store.dispatch({ type: "unrelated/action" });
    expect(saveSpy).not.toHaveBeenCalled();

    saveSpy.mockRestore();
  });
});
