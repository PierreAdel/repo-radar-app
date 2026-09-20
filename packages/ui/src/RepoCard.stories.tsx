import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import type { GithubRepo } from "@repo-radar/core";
import { RepoCard } from "./RepoCard";

const repo: GithubRepo = {
  id: 10270250,
  fullName: "facebook/react",
  htmlUrl: "https://github.com/facebook/react",
  description: "The library for web and native user interfaces.",
  stargazersCount: 231000,
  openIssuesCount: 1180,
  pushedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  ownerLogin: "facebook",
  ownerAvatarUrl: "https://avatars.githubusercontent.com/u/69631?v=4",
  language: "JavaScript",
  license: "MIT License",
  homepage: "https://react.dev",
};

const meta: Meta<typeof RepoCard> = {
  title: "Repo Radar/RepoCard",
  component: RepoCard,
  parameters: {
    layout: "padded",
  },
  args: {
    onTrack: fn(),
    onUntrack: fn(),
    onRefresh: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RepoCard>;

export const Loading: Story = {
  args: {
    variant: "result",
    isLoading: true,
  },
};

export const SearchResultUntracked: Story = {
  name: "Search result — untracked",
  args: {
    variant: "result",
    repo,
    isTracked: false,
  },
};

export const SearchResultTracked: Story = {
  name: "Search result — already tracked",
  args: {
    variant: "result",
    repo,
    isTracked: true,
  },
};

export const TrackedWithRefresh: Story = {
  name: "Tracked repo (with refresh action)",
  args: {
    variant: "tracked",
    repo,
    isTracked: true,
  },
};

export const RefreshingInPlace: Story = {
  name: "Tracked repo — refreshing (stats already loaded)",
  args: {
    variant: "tracked",
    repo,
    isTracked: true,
    isLoading: true,
  },
};

export const NoDescription: Story = {
  args: {
    variant: "result",
    repo: { ...repo, description: null },
  },
};

export const HighCounts: Story = {
  name: "Compact-formatted large numbers",
  args: {
    variant: "result",
    repo: { ...repo, stargazersCount: 4_200_000, openIssuesCount: 18_500 },
  },
};

export const ErrorState: Story = {
  name: "Error — not found",
  args: {
    variant: "tracked",
    error: { status: 404, message: "Repository not found." },
  },
};

export const RateLimited: Story = {
  name: "Error — rate limited",
  args: {
    variant: "tracked",
    error: {
      status: 403,
      message: "GitHub API rate limit exceeded. Try again later or configure GITHUB_TOKEN.",
    },
  },
};
