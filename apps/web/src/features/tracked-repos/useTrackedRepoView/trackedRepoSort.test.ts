import { describe, expect, it } from "vitest";
import { DEFAULT_SORT_KEY, isSortKey } from "./trackedRepoSort";

describe("isSortKey", () => {
  it("accepts each valid sort key", () => {
    expect(isSortKey("stars")).toBe(true);
    expect(isSortKey("lastCommit")).toBe(true);
    expect(isSortKey("name")).toBe(true);
  });

  it("rejects null and unrecognized values", () => {
    expect(isSortKey(null)).toBe(false);
    expect(isSortKey("")).toBe(false);
    expect(isSortKey("popularity")).toBe(false);
  });
});

describe("DEFAULT_SORT_KEY", () => {
  it("is itself a valid sort key", () => {
    expect(isSortKey(DEFAULT_SORT_KEY)).toBe(true);
  });
});
