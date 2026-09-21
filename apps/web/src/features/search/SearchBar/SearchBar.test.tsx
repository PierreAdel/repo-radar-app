import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders the current value with no clear button when empty", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search github repositories/i)).toHaveValue("");
    expect(screen.queryByRole("button", { name: "Clear search" })).toBeNull();
  });

  it("calls onChange as the user types, capped at MAX_SEARCH_QUERY_LENGTH", async () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    await userEvent.type(screen.getByPlaceholderText(/search github repositories/i), "re");

    expect(onChange).toHaveBeenCalledWith("r");
    expect(onChange).toHaveBeenCalledWith("e");
  });

  it("shows a clear button once there's a value, and refocuses the input on clear", async () => {
    const onChange = vi.fn();
    render(<SearchBar value="react" onChange={onChange} />);

    const clearButton = screen.getByRole("button", { name: "Clear search" });
    await userEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith("");
    expect(screen.getByPlaceholderText(/search github repositories/i)).toHaveFocus();
  });
});
