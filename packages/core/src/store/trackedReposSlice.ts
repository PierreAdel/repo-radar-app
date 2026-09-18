import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage } from "./persistence";

const STORAGE_KEY = "repo-radar/tracked-repos";

export interface TrackedReposState {
  fullNames: string[];
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

const initialState: TrackedReposState = {
  fullNames: loadFromStorage(STORAGE_KEY, isStringArray) ?? [],
};

const trackedReposSlice = createSlice({
  name: "trackedRepos",
  initialState,
  reducers: {
    trackRepo(state, action: PayloadAction<string>) {
      if (!state.fullNames.includes(action.payload)) {
        state.fullNames.push(action.payload);
      }
    },
    untrackRepo(state, action: PayloadAction<string>) {
      state.fullNames = state.fullNames.filter((fullName) => fullName !== action.payload);
    },
  },
});

export const { trackRepo, untrackRepo } = trackedReposSlice.actions;
export const trackedReposReducer = trackedReposSlice.reducer;
export const TRACKED_REPOS_STORAGE_KEY = STORAGE_KEY;

export const selectTrackedFullNames = (state: { trackedRepos: TrackedReposState }) =>
  state.trackedRepos.fullNames;

export const selectIsTracked = (fullName: string) => (state: { trackedRepos: TrackedReposState }) =>
  state.trackedRepos.fullNames.includes(fullName);
