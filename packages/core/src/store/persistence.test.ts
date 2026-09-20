import { describe, expect, it } from "vitest";
import { loadFromStorage, saveToStorage } from "./persistence";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

describe("persistence", () => {
  it("returns undefined when the key is missing", () => {
    expect(loadFromStorage("missing-key", isStringArray)).toBeUndefined();
  });

  it("round-trips a value through save/load", () => {
    saveToStorage("repo-radar/test", ["a/b", "c/d"]);
    expect(loadFromStorage("repo-radar/test", isStringArray)).toEqual(["a/b", "c/d"]);
  });

  it("returns undefined when the stored value fails validation", () => {
    window.localStorage.setItem("repo-radar/bad", JSON.stringify({ not: "an array" }));
    expect(loadFromStorage("repo-radar/bad", isStringArray)).toBeUndefined();
  });

  it("returns undefined when the stored value is malformed JSON", () => {
    window.localStorage.setItem("repo-radar/broken", "{not-json");
    expect(loadFromStorage("repo-radar/broken", isStringArray)).toBeUndefined();
  });
});
