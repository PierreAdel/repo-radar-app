import { describe, expect, it } from "vitest";
import { toApiError } from "./apiError";

describe("toApiError", () => {
  it("returns undefined for no error", () => {
    expect(toApiError(undefined)).toBeUndefined();
  });

  it("extracts status and message from a FetchBaseQueryError with a JSON body", () => {
    expect(toApiError({ status: 404, data: { message: "Repository not found." } })).toEqual({
      status: 404,
      message: "Repository not found.",
    });
  });

  it("falls back to a generic message for non-HTTP FetchBaseQueryErrors", () => {
    expect(toApiError({ status: "FETCH_ERROR", error: "network down" })).toEqual({
      status: 0,
      message: "Request failed.",
    });
  });

  it("extracts a message from a SerializedError", () => {
    expect(toApiError({ message: "boom" })).toEqual({ status: 0, message: "boom" });
  });
});
