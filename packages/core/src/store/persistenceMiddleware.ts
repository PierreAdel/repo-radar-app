import { createListenerMiddleware } from "@reduxjs/toolkit";
import { saveToStorage } from "./persistence.js";
import {
  trackRepo,
  untrackRepo,
  selectTrackedFullNames,
  TRACKED_REPOS_STORAGE_KEY,
} from "./trackedReposSlice.js";
import { toggleTheme, setTheme, selectThemeMode, THEME_STORAGE_KEY } from "./themeSlice.js";

export const persistenceMiddleware = createListenerMiddleware();

persistenceMiddleware.startListening({
  matcher: (action) => trackRepo.match(action) || untrackRepo.match(action),
  effect: (_action, api) => {
    saveToStorage(TRACKED_REPOS_STORAGE_KEY, selectTrackedFullNames(api.getState() as never));
  },
});

persistenceMiddleware.startListening({
  matcher: (action) => toggleTheme.match(action) || setTheme.match(action),
  effect: (_action, api) => {
    saveToStorage(THEME_STORAGE_KEY, selectThemeMode(api.getState() as never));
  },
});
