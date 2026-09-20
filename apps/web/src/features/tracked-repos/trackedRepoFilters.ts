export interface TrackedRepoFilters {
  minStars?: number;
  maxStars?: number;
}

export function parseIntParam(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}
