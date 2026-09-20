import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { useSearchBox } from "./useSearchBox";

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="*" element={<>{children}</>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("useSearchBox", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts with an empty input when not on /search", () => {
    const { result } = renderHook(() => useSearchBox(), { wrapper });
    expect(result.current.inputValue).toBe("");
  });

  it("navigates to /search with the debounced query after typing", async () => {
    vi.useFakeTimers();
    let location: ReturnType<typeof useLocation> | undefined;
    function Probe() {
      location = useLocation();
      return null;
    }

    const { result } = renderHook(() => useSearchBox(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="*"
              element={
                <>
                  {children}
                  <Probe />
                </>
              }
            />
          </Routes>
        </MemoryRouter>
      ),
    });

    act(() => result.current.setInputValue("react"));
    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    expect(location?.pathname).toBe("/search");
    expect(location?.search).toContain("q=react");

    vi.useRealTimers();
  });

  it("navigates home when the input is cleared", async () => {
    vi.useFakeTimers();
    let location: ReturnType<typeof useLocation> | undefined;
    function Probe() {
      location = useLocation();
      return null;
    }

    const { result } = renderHook(() => useSearchBox(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/search?q=react&page=1"]}>
          <Routes>
            <Route
              path="*"
              element={
                <>
                  {children}
                  <Probe />
                </>
              }
            />
          </Routes>
        </MemoryRouter>
      ),
    });

    expect(result.current.inputValue).toBe("react");

    act(() => result.current.setInputValue(""));
    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    expect(location?.pathname).toBe("/");

    vi.useRealTimers();
  });
});
