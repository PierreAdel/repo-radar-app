import { configureStore } from "@reduxjs/toolkit";
import {
  githubApi,
  persistenceMiddleware,
  themeReducer,
  trackedReposReducer,
} from "@repo-radar/core";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    trackedRepos: trackedReposReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware, persistenceMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
