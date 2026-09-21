import { describe, expect, it } from "vitest";
import { isSafeHttpUrl, isValidRepoFullName } from "./validation.js";

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

describe("isSafeHttpUrl", () => {
  it("accepts http and https URLs", () => {
    expect(isSafeHttpUrl("https://example.com")).toBe(true);
    expect(isSafeHttpUrl("http://example.com/path")).toBe(true);
  });

  it("rejects javascript: and other non-http schemes", () => {
    expect(isSafeHttpUrl("javascript:alert(document.cookie)")).toBe(false);
    expect(isSafeHttpUrl("data:text/html,<script>alert(1)</script>")).toBe(false);
  });

  it("rejects unparseable values", () => {
    expect(isSafeHttpUrl("not a url")).toBe(false);
  });
});
