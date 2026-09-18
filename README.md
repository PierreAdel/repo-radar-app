# Repo Radar

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
# repo-radar-app
