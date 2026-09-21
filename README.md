# Repo Radar

[![CI](https://github.com/PierreAdel/repo-radar-app/actions/workflows/ci.yml/badge.svg)](https://github.com/PierreAdel/repo-radar-app/actions/workflows/ci.yml)

Search GitHub repositories, track favorites, and monitor their latest stats.

- 📸 [docs/FEATURES.md](docs/FEATURES.md) — a feature walkthrough with screenshots.
- 🛠️ [docs/ENGINEERING.md](docs/ENGINEERING.md) — architecture, testing, security, performance,
  and everything else under the hood.

## Stack

- React 19 + TypeScript, Vite
- Redux Toolkit (RTK Query for the GitHub API)
- MUI
- pnpm workspaces + Turborepo

## Structure

```
apps/web        # the dashboard (deployed to Vercel)
packages/ui     # shared MUI-based presentational components
packages/core   # shared types, GitHub API client, redux slices, hooks
```

## Getting started

```bash
pnpm install
pnpm dev
```

Storybook for `packages/ui`'s shared components:

```bash
pnpm storybook          # dev server on :6006
pnpm build-storybook    # static build to packages/ui/storybook-static
```

## CI/CD

- **CI** — [.github/workflows/ci.yml](.github/workflows/ci.yml) runs on every push to `main` or
  `staging` and every pull request targeting either: `lint` → `typecheck` → `test` → `build` →
  `build-storybook`, via the same `pnpm` scripts used locally. `main` and `staging` are protected
  branches; this check must pass before a PR can merge.
- **CD** — deployment is handled by Vercel's own GitHub integration, not this workflow: pushes to
  `main` deploy to production, and every branch/PR gets its own preview URL. No deploy secrets
  live in this repo.
- **Releases** — [.github/workflows/release-please.yml](.github/workflows/release-please.yml) runs
  on every push to `main` and keeps a "Release PR" up to date with the next version bump and
  [CHANGELOG.md](CHANGELOG.md), computed from [Conventional Commits](https://www.conventionalcommits.org/)
  since the last release. Merging that PR is what actually tags the release and publishes it on
  GitHub — nothing is tagged automatically on every push.
