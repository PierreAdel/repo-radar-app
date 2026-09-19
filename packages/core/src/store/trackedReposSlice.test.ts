import { describe, expect, it } from "vitest";
import {
  trackedReposReducer,
  trackRepo,
  untrackRepo,
  type TrackedReposState,
} from "./trackedReposSlice";

describe("trackedReposSlice", () => {
  it("tracks a new repo", () => {
    const state: TrackedReposState = { fullNames: [] };
    const next = trackedReposReducer(state, trackRepo("facebook/react"));
    expect(next.fullNames).toEqual(["facebook/react"]);
  });

  it("does not add duplicates", () => {
    const state: TrackedReposState = { fullNames: ["facebook/react"] };
    const next = trackedReposReducer(state, trackRepo("facebook/react"));
    expect(next.fullNames).toEqual(["facebook/react"]);
  });

  it("untracks a repo", () => {
    const state: TrackedReposState = { fullNames: ["facebook/react", "vuejs/vue"] };
    const next = trackedReposReducer(state, untrackRepo("facebook/react"));
    expect(next.fullNames).toEqual(["vuejs/vue"]);
  });
});
