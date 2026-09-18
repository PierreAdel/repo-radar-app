# Repo Radar

[![CI](https://github.com/PierreAdel/repo-radar-app/actions/workflows/ci.yml/badge.svg)](https://github.com/PierreAdel/repo-radar-app/actions/workflows/ci.yml)

Search GitHub repositories, track favorites, and monitor their latest stats.

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

## CI/CD

- **CI** — [.github/workflows/ci.yml](.github/workflows/ci.yml) runs on every push to `main` or
  `staging` and every pull request targeting either: `lint` → `typecheck` → `test` → `build`, via
  the same `pnpm` scripts used locally. `main` and `staging` are protected branches; this check
  must pass before a PR can merge.
- **CD** — deployment is handled by Vercel's own GitHub integration, not this workflow: pushes to
  `main` deploy to production, and every branch/PR gets its own preview URL. No deploy secrets
  live in this repo.
