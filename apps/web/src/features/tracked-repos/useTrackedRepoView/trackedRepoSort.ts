export type SortKey = "stars" | "lastCommit" | "name";

const SORT_KEYS: readonly SortKey[] = ["stars", "lastCommit", "name"];
export const DEFAULT_SORT_KEY: SortKey = "stars";

export function isSortKey(value: string | null): value is SortKey {
  return SORT_KEYS.includes(value as SortKey);
}
