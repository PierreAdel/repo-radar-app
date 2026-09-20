import { describe, expect, it } from "vitest";
import { createAppTheme } from "./createAppTheme";

describe("createAppTheme", () => {
  it("sets the requested palette mode", () => {
    expect(createAppTheme("light").palette.mode).toBe("light");
    expect(createAppTheme("dark").palette.mode).toBe("dark");
  });

  it("applies dark-mode background overrides only in dark mode", () => {
    const dark = createAppTheme("dark");
    const light = createAppTheme("light");

    expect(dark.palette.background.default).toBe("#0b0b10");
    expect(light.palette.background.default).not.toBe("#0b0b10");
  });

  it("uses the same primary color and card border radius in both modes", () => {
    const dark = createAppTheme("dark");
    const light = createAppTheme("light");

    expect(dark.palette.primary.main).toBe("#7248e0");
    expect(light.palette.primary.main).toBe("#7248e0");
    expect(dark.shape.borderRadius).toBe(12);
    expect(light.shape.borderRadius).toBe(12);
  });
});
