// Subset of the GitHub REST API repository shape that the dashboard consumes.
export interface GithubRepo {
  id: number;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  stargazersCount: number;
  openIssuesCount: number;
  pushedAt: string;
  ownerLogin: string;
  ownerAvatarUrl: string;
  language?: string | null;
  license?: string;
  homepage?: string;
}

export interface SearchReposResult {
  items: GithubRepo[];
  totalCount: number;
}

export interface ApiError {
  status: number;
  message: string;
}
