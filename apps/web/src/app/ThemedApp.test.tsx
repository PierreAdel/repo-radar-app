import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { setTheme } from "@repo-radar/core";
import { store } from "./store";
import { ThemedApp } from "./ThemedApp";

function renderThemedApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Provider store={store}>
        <ThemedApp />
      </Provider>
    </MemoryRouter>,
  );
}

describe("ThemedApp", () => {
  it("renders the app under a theme matching the current mode", () => {
    store.dispatch(setTheme("dark"));
    renderThemedApp();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("re-renders without throwing when the mode changes to light", () => {
    store.dispatch(setTheme("light"));
    renderThemedApp();
    expect(store.getState().theme.mode).toBe("light");
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
