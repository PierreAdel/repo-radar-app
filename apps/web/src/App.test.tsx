import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

describe("App", () => {
  it("renders the dashboard without throwing", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /skip to main content/i })).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
