import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type { GithubRepo, SearchReposResult } from "../types/repo.js";
import { mergeSearchResults } from "./mergeSearchResults.js";

interface SearchArgs {
  query: string;
  page: number;
}

const MAX_RETRIES = 2;

// Retry network blips and upstream 5xx, but not 4xx - a 404 (repo doesn't
// exist) or 403 (rate limited) won't succeed on retry, and hammering a
// rate-limited endpoint again only makes that worse.
function isRetryableError(error: unknown): boolean {
  const status =
    typeof error === "object" && error !== null && "status" in error
      ? (error as { status: unknown }).status
      : undefined;
  if (typeof status === "number") {
    return status >= 500;
  }
  return status === "FETCH_ERROR" || status === "TIMEOUT_ERROR";
}

const baseQueryWithRetry = retry(fetchBaseQuery({ baseUrl: "/api/github" }), {
  retryCondition: (error, _args, { attempt }) => attempt <= MAX_RETRIES && isRetryableError(error),
});

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: baseQueryWithRetry,
  refetchOnReconnect: true,
  tagTypes: ["Repo"],
  endpoints: (builder) => ({
    searchRepositories: builder.query<SearchReposResult, SearchArgs>({
      query: ({ query, page }) => `/search?q=${encodeURIComponent(query)}&page=${page}`,
      // Cache by search text only, so subsequent pages merge into the same entry.
      serializeQueryArgs: ({ queryArgs }) => queryArgs.query,
      merge: (cache, incoming) => {
        cache.items = mergeSearchResults(cache.items, incoming);
        cache.totalCount = incoming.totalCount;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg?.page !== previousArg?.page,
    }),
    getRepository: builder.query<GithubRepo, string>({
      query: (fullName) => `/repo?fullName=${encodeURIComponent(fullName)}`,
      providesTags: (_result, _error, fullName) => [{ type: "Repo", id: fullName }],
    }),
  }),
});

export const { useSearchRepositoriesQuery, useGetRepositoryQuery } = githubApi;
