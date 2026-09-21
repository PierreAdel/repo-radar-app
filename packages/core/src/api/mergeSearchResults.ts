import type { GithubRepo, SearchReposResult } from "../types/repo.js";

// GitHub's search ranking is not a stable sort across requests, so a repo whose
// score shifts between two calls can legitimately appear on both page 1 and
// page 2. Dedupe by id instead of naively concatenating.
export function mergeSearchResults(
  cacheItems: GithubRepo[],
  incoming: SearchReposResult,
): GithubRepo[] {
  const byId = new Map(cacheItems.map((item) => [item.id, item]));
  for (const item of incoming.items) {
    byId.set(item.id, item);
  }
  return Array.from(byId.values());
}
