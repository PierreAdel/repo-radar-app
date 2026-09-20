function isTraversalSegment(segment: string): boolean {
  return segment === "" || segment === "." || segment === "..";
}

export function isValidRepoFullName(value: string): boolean {
  const slashIndex = value.indexOf("/");
  if (slashIndex === -1 || value.indexOf("/", slashIndex + 1) !== -1) {
    return false;
  }
  const owner = value.slice(0, slashIndex);
  const repo = value.slice(slashIndex + 1);
  return !isTraversalSegment(owner) && !isTraversalSegment(repo);
}

export function isSafeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
