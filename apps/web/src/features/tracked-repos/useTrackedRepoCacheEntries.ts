import { createSelector } from "@reduxjs/toolkit";
import { githubApi, selectTrackedFullNames } from "@repo-radar/core";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";

const selectTrackedRepoCacheEntries = createSelector(
  [selectTrackedFullNames, (state: RootState) => state],
  (trackedFullNames, state) =>
    trackedFullNames.map((fullName) => ({
      fullName,
      ...githubApi.endpoints.getRepository.select(fullName)(state),
    })),
);

export function useTrackedRepoCacheEntries() {
  return useAppSelector(selectTrackedRepoCacheEntries);
}
