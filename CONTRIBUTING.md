# Contributing

This is currently a one-person project, so there's no external contributor process yet -
this file exists mainly to make the workflow explicit rather than tribal knowledge.

## Workflow

1. Branch off `staging` (the active integration branch - `main` trails behind it and is
   only updated via release cuts).
2. Open a PR targeting `staging`.
3. CI must pass before merge: `lint` → `typecheck` → `test:coverage` → `build` →
   `build-storybook`, plus `e2e` (Playwright + axe-core accessibility checks),
   `api-smoke-test` (against the real Vercel preview deploy), and `lighthouse`
   (performance budget). See [`.github/workflows/ci.yml`](./.github/workflows/ci.yml).
4. Wait for review and approval from [@PierreAdel](https://github.com/PierreAdel) before
   merging - a green CI run is necessary but not sufficient on its own.
5. `main` and `staging` are both protected branches.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`,
`chore:`, `refactor:`, `perf:`, `docs:`, `test:`, …). `release-please` derives version
bumps and [`CHANGELOG.md`](./CHANGELOG.md) directly from these on every push to `main` -
an inaccurate prefix produces an inaccurate changelog entry.

## Before opening a PR

```bash
pnpm check:task   # typecheck + lint + test:coverage - the full local gate
```

Husky + `lint-staged` also run ESLint (`--fix`) and Prettier automatically on every
`git commit`, so most formatting/lint issues are caught before they reach CI.

## Quality bar

[`CONSTRAINTS.md`](./CONSTRAINTS.md) is the project's written quality contract -
coverage thresholds, accessibility, performance budgets, and the "floor" rules (no
`@ts-ignore`/`eslint-disable` suppressions, no unimplemented stubs, no skipped tests
without a reason). It does not get weakened to make a change pass; if a change needs an
exception, it's recorded there with an owner and an expiry, not silently worked around.

## Adding a package

New workspace packages go under `apps/*` or `packages/*` (see
[`pnpm-workspace.yaml`](./pnpm-workspace.yaml)) and need a `vitest.config.ts` with the
same `coverage.thresholds.lines: 80` gate the existing packages use, plus a matching
entry in [`turbo.json`](./turbo.json) if they add new task types.
