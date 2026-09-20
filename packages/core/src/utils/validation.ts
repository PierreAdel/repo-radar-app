const FULL_NAME_PATTERN = /^(?!\.\.?\/)[^/]+\/(?!\.\.?$)[^/]+$/;

export function isValidRepoFullName(value: string): boolean {
  return FULL_NAME_PATTERN.test(value);
}

export function isSafeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
