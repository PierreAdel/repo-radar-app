import type { ApiError, GithubRepo, SearchReposResult } from "@repo-radar/core";

export type ProxyResult<T> =
  { ok: true; status: number; body: T } | { ok: false; status: number; body: ApiError };

interface RawGithubRepo {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  open_issues_count: number;
  pushed_at: string;
  owner: { login: string; avatar_url: string };
}

const GITHUB_API_BASE = "https://api.github.com";

function buildHeaders(token?: string): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function mapRawRepo(raw: RawGithubRepo): GithubRepo {
  return {
    id: raw.id,
    fullName: raw.full_name,
    htmlUrl: raw.html_url,
    description: raw.description,
    stargazersCount: raw.stargazers_count,
    openIssuesCount: raw.open_issues_count,
    pushedAt: raw.pushed_at,
    ownerLogin: raw.owner.login,
    ownerAvatarUrl: raw.owner.avatar_url,
  };
}

function normalizeError(status: number, json: unknown): ApiError {
  const rawMessage =
    typeof json === "object" && json !== null && "message" in json
      ? String((json as { message: unknown }).message)
      : "GitHub API request failed.";
  if (status === 403 && /rate limit/i.test(rawMessage)) {
    return {
      status,
      message: "GitHub API rate limit exceeded. Try again later or configure GITHUB_TOKEN.",
    };
  }
  if (status === 404) {
    return { status, message: "Repository not found." };
  }
  return { status, message: rawMessage };
}

export async function searchRepositories(
  query: string,
  page: number,
  token?: string,
): Promise<ProxyResult<SearchReposResult>> {
  if (!query.trim()) {
    return { ok: true, status: 200, body: { items: [], totalCount: 0 } };
  }

  const url = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(query)}&per_page=10&page=${page}`;
  const response = await fetch(url, { headers: buildHeaders(token) });
  const json = await response.json();

  if (!response.ok) {
    return { ok: false, status: response.status, body: normalizeError(response.status, json) };
  }

  const items = (json.items as RawGithubRepo[]).map(mapRawRepo);
  return { ok: true, status: 200, body: { items, totalCount: json.total_count as number } };
}

export async function getRepository(
  fullName: string,
  token?: string,
): Promise<ProxyResult<GithubRepo>> {
  const url = `${GITHUB_API_BASE}/repos/${fullName}`;
  const response = await fetch(url, { headers: buildHeaders(token) });
  const json = await response.json();

  if (!response.ok) {
    return { ok: false, status: response.status, body: normalizeError(response.status, json) };
  }

  return { ok: true, status: 200, body: mapRawRepo(json as RawGithubRepo) };
}
