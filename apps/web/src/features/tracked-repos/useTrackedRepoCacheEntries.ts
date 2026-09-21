import { createSelector } from "@reduxjs/toolkit";
import { githubApi, selectTrackedFullNames } from "@repo-radar/core";
import { useAppSelector } from "../../app/store/hooks";
import type { RootState } from "../../app/store/store";

// Scoped to just the RTK Query cache slice, not the whole RootState - the
// slice's reference only changes on githubApi-related actions, so this
// selector doesn't recompute (and re-map all N tracked repos) on every
// unrelated dispatch in the app.
const selectTrackedRepoCacheEntries = createSelector(
  [selectTrackedFullNames, (state: RootState) => state[githubApi.reducerPath]],
  (trackedFullNames, apiState) => {
    const scopedState = { [githubApi.reducerPath]: apiState };
    return trackedFullNames.map((fullName) => ({
      fullName,
      ...githubApi.endpoints.getRepository.select(fullName)(scopedState),
    }));
  },
);

export function useTrackedRepoCacheEntries() {
  return useAppSelector(selectTrackedRepoCacheEntries);
}
