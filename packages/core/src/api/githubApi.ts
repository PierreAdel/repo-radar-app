import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GithubRepo, SearchReposResult } from "../types/repo";

interface SearchArgs {
  query: string;
  page: number;
}

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/github" }),
  tagTypes: ["Repo"],
  endpoints: (builder) => ({
    searchRepositories: builder.query<SearchReposResult, SearchArgs>({
      query: ({ query, page }) => `/search?q=${encodeURIComponent(query)}&page=${page}`,
      // Cache by search text only, so subsequent pages merge into the same entry.
      serializeQueryArgs: ({ queryArgs }) => queryArgs.query,
      merge: (cache, incoming) => {
        cache.items.push(...incoming.items);
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
