import { describe, expect, it } from "vitest";
import { parseIntParam } from "./trackedRepoFilters";

describe("parseIntParam", () => {
  it("parses a valid integer string", () => {
    expect(parseIntParam("42")).toBe(42);
  });

  it("truncates a float string to its integer part", () => {
    expect(parseIntParam("12.9")).toBe(12);
  });

  it("returns undefined for null or empty input", () => {
    expect(parseIntParam(null)).toBeUndefined();
    expect(parseIntParam("")).toBeUndefined();
  });

  it("returns undefined for non-numeric input", () => {
    expect(parseIntParam("abc")).toBeUndefined();
    expect(parseIntParam("Infinity")).toBeUndefined();
  });
});
