import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MemoryRouter, useLocation } from "react-router";
import { Provider } from "react-redux";
import { setTheme } from "@repo-radar/core";
import { store } from "./app/store";
import { Header } from "./Header";

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderHeader(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Provider store={store}>
        <Header />
        <LocationProbe />
      </Provider>
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("renders the brand and search box", () => {
    renderHeader();
    expect(
      screen.getByRole("button", { name: /repo radar.*go to dashboard/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search github repositories/i)).toBeInTheDocument();
  });

  it("navigates home when the brand is clicked", async () => {
    renderHeader(["/search?q=react"]);
    expect(screen.getByTestId("location")).toHaveTextContent("/search");

    await userEvent.click(screen.getByRole("button", { name: /repo radar.*go to dashboard/i }));

    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });

  it("toggles the theme mode when the theme button is clicked", async () => {
    store.dispatch(setTheme("dark"));
    renderHeader();

    await userEvent.click(screen.getByRole("button", { name: /switch to light theme/i }));

    expect(store.getState().theme.mode).toBe("light");
  });

  it("disables Refresh all when nothing is tracked", () => {
    renderHeader();
    // Both a mobile IconButton and a desktop Button render "Refresh all" —
    // CSS media queries pick which is visible, but jsdom doesn't apply CSS,
    // so both exist in the accessibility tree at once.
    for (const button of screen.getAllByRole("button", { name: "Refresh all" })) {
      expect(button).toBeDisabled();
    }
  });

  it("matches its snapshot", () => {
    // Set explicitly rather than relying on the "toggles the theme mode"
    // test's dispatch above having already left the shared store in this
    // state - depending on execution order for that made this test only
    // pass when run after it, not in isolation.
    store.dispatch(setTheme("light"));
    const { container } = renderHeader();
    const header = container.querySelector("header");

    // React's useId() ids are based on how many roots have mounted earlier
    // in the process, so they shift depending on which other tests ran
    // first. Normalize so the snapshot doesn't depend on execution order.
    header?.querySelectorAll("[id]").forEach((el) => {
      if (el.id.startsWith("_r_")) {
        el.id = "stable-id";
      }
    });

    expect(header).toMatchSnapshot();
  });
});
