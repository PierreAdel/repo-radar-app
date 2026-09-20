import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { GithubRepo } from "@repo-radar/core";
import { RepoCard } from "./RepoCard";

const repo: GithubRepo = {
  id: 1,
  fullName: "facebook/react",
  htmlUrl: "https://github.com/facebook/react",
  description: "A UI library",
  stargazersCount: 250000,
  openIssuesCount: 1200,
  pushedAt: new Date().toISOString(),
  ownerLogin: "facebook",
  ownerAvatarUrl: "https://avatars/facebook",
};

describe("RepoCard", () => {
  it("renders a loading skeleton when isLoading and no repo yet", () => {
    const { container } = render(<RepoCard variant="result" isLoading />);
    expect(container.querySelector(".MuiSkeleton-root")).not.toBeNull();
  });

  it("renders an error state with a retry action", async () => {
    const onRefresh = vi.fn();
    render(
      <RepoCard
        variant="tracked"
        error={{ status: 404, message: "Repository not found." }}
        onRefresh={onRefresh}
      />,
    );

    expect(screen.getByText("Repository not found.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(onRefresh).toHaveBeenCalledOnce();
  });

  it("renders repo stats and calls onTrack when not tracked", async () => {
    const onTrack = vi.fn();
    render(<RepoCard variant="result" repo={repo} onTrack={onTrack} />);

    expect(screen.getByText("facebook/react")).toBeInTheDocument();
    expect(screen.getByText("250K")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Track" }));
    expect(onTrack).toHaveBeenCalledOnce();
  });

  it("shows an untrack action when tracked", async () => {
    const onUntrack = vi.fn();
    render(<RepoCard variant="tracked" repo={repo} isTracked onUntrack={onUntrack} />);

    await userEvent.click(screen.getByRole("button", { name: "Untrack" }));
    expect(onUntrack).toHaveBeenCalledOnce();
  });

  it("renders a safe homepage as a clickable link", async () => {
    render(<RepoCard variant="result" repo={{ ...repo, homepage: "https://react.dev" }} />);

    await userEvent.click(screen.getByRole("button", { name: /expand details/i }));

    const link = screen.getByRole("link", { name: "https://react.dev" });
    expect(link).toHaveAttribute("href", "https://react.dev");
  });

  it("does not render a javascript: homepage as a link", async () => {
    render(
      <RepoCard
        variant="result"
        repo={{ ...repo, homepage: "javascript:alert(document.cookie)" }}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /expand details/i }));

    expect(screen.getByText("javascript:alert(document.cookie)")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /javascript:/i })).not.toBeInTheDocument();
  });
});
