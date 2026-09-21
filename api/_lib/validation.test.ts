import { describe, expect, it } from "vitest";
import { isValidRepoFullName } from "./validation.js";

describe("isValidRepoFullName", () => {
  it("accepts a normal owner/repo pair", () => {
    expect(isValidRepoFullName("facebook/react")).toBe(true);
    expect(isValidRepoFullName("my-org/my.repo_name")).toBe(true);
  });

  it("rejects path traversal attempts", () => {
    expect(isValidRepoFullName("../rate_limit")).toBe(false);
    expect(isValidRepoFullName("..%2f..%2fuser")).toBe(false);
    expect(isValidRepoFullName("a/../../rate_limit")).toBe(false);
  });

  it("rejects values with the wrong number of segments", () => {
    expect(isValidRepoFullName("just-a-name")).toBe(false);
    expect(isValidRepoFullName("a/b/c")).toBe(false);
    expect(isValidRepoFullName("")).toBe(false);
  });

  it("rejects an empty owner or repo segment", () => {
    expect(isValidRepoFullName("/repo")).toBe(false);
    expect(isValidRepoFullName("owner/")).toBe(false);
  });
});
