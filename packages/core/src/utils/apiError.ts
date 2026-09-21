import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { ApiError } from "../types/repo.js";

export function toApiError(
  error: FetchBaseQueryError | SerializedError | undefined,
): ApiError | undefined {
  if (!error) {
    return undefined;
  }
  if ("status" in error) {
    const data = error.data;
    if (data && typeof data === "object" && "message" in data) {
      return {
        status: typeof error.status === "number" ? error.status : 0,
        message: String((data as { message: unknown }).message),
      };
    }
    return {
      status: typeof error.status === "number" ? error.status : 0,
      message: "Request failed.",
    };
  }
  return { status: 0, message: error.message ?? "Unknown error." };
}
