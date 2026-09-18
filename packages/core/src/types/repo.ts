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
}
