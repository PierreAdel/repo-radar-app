import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatCompactNumber, formatRelativeTime } from "./format";

describe("formatCompactNumber", () => {
  it("formats large numbers compactly", () => {
    expect(formatCompactNumber(1234)).toBe("1.2K");
    expect(formatCompactNumber(1500000)).toBe("1.5M");
  });

  it("leaves small numbers as-is", () => {
    expect(formatCompactNumber(42)).toBe("42");
  });
});

describe("formatRelativeTime", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date("2026-01-10T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("formats a date two days in the past", () => {
    expect(formatRelativeTime("2026-01-08T00:00:00.000Z")).toBe("2 days ago");
  });

  it("formats a date in the future", () => {
    expect(formatRelativeTime("2026-01-12T00:00:00.000Z")).toBe("in 2 days");
  });
});
