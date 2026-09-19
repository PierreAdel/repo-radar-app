export function loadFromStorage<T>(
  key: string,
  isValid: (value: unknown) => value is T,
): T | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return undefined;
    }
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function saveToStorage(key: string, value: unknown): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage can throw (quota exceeded, private browsing) — persistence is best-effort.
  }
}
