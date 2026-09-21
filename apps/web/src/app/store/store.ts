import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
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

// Wires up RTK Query's window online/focus listeners - without this,
// refetchOnReconnect never fires, since there's nothing dispatching the
// reconnect action when connectivity comes back.
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
