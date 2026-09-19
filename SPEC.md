# Spec: Bento-style UI Redesign

## 1. Objective

Refresh the visual design of the whole app to a modern "bento" look — rounded corners and soft shadows on all card-based sections — while reusing the existing MUI + Emotion styling system. This is a pure visual/layout pass: no changes to routing, data-fetching, state management, or component APIs.

**Target users:** existing app users (no new user-facing capability, just a visual refresh).

**Out of scope:** asymmetric/varied-size grid cells (the user chose "rounded corners + soft shadows," not a mosaic-style bento layout), restructuring the header into a floating/inset bar, introducing a new styling system (Tailwind, CSS modules, etc.).

## 2. Commands

Run from the repo root unless noted:

| Command                                  | Purpose                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| `pnpm dev`                               | Run all dev servers via Turbo (use `pnpm --filter web dev` to run only the app) |
| `pnpm --filter @repo-radar/ui storybook` | Storybook for shared components — primary visual QA tool for this redesign      |
| `pnpm --filter @repo-radar/ui test`      | Vitest unit tests for `packages/ui` (includes `RepoCard.test.tsx`)              |
| `pnpm lint`                              | ESLint across all packages (Turbo)                                              |
| `pnpm typecheck`                         | `tsc --noEmit` across all packages (Turbo)                                      |
| `pnpm format`                            | Prettier write (pre-commit via lint-staged/Husky already enforces this)         |

No test script exists for `apps/web` — verification there is lint + typecheck + manual browser check.

## 3. Project structure (relevant to this work)

```
apps/web/src/
  App.tsx                                  # routes: "/" (Dashboard), "/search"
  Header.tsx                               # sticky AppBar: logo, search, refresh, theme toggle
  features/
    stats-chart/StarsChartCard.tsx         # wraps StarsBarChart — currently NO card wrapper
    tracked-repos/
      TrackedReposSection.tsx              # CSS grid of tracked repos, sort control
      TrackedRepoCard.tsx                  # RepoCard + live data query
    search/SearchResultsSection.tsx        # vertical stack of search result RepoCards

packages/ui/src/
  theme/createAppTheme.ts                  # single source of visual tokens (palette, shape)
  RepoCard.tsx (+ .stories.tsx, .test.tsx) # core card: result/tracked/loading/error variants
  EmptyState.tsx (+ .stories.tsx)          # dashed-border placeholder
  ErrorFallback.tsx (+ .stories.tsx)       # full-page error state
  StarsBarChart.tsx (+ .stories.tsx)       # wraps @mui/x-charts BarChart
  index.ts                                 # barrel export
```

`packages/ui` has no atoms/molecules split — it flatly _is_ the design system. This redesign keeps that convention: no new component hierarchy, no new "BentoCard" component. The bento look is applied via a theme-level `MuiCard` style override, so every existing `<Card>` picks it up for free.

## 4. Code style / design approach

- **Styling stays MUI `sx` + theme** — no new library, no inline raw CSS.
- **Theme is the single source of truth** for the bento look (`packages/ui/src/theme/createAppTheme.ts`). Do not hand-roll radius/shadow values as one-off `sx` overrides in individual components — if a component needs to deviate, that's a signal the token needs revisiting, not a reason to add a local override.
- **Token additions** (additive to the existing theme, nothing removed):
  ```ts
  components: {
    MuiCard: {
      defaultProps: { variant: "elevation" }, // was "outlined" (bordered, flat)
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 20,
          border: "none",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 16px rgba(0,0,0,0.45)"
              : "0 2px 12px rgba(15,15,25,0.07)",
        }),
      },
    },
  },
  ```
  `shape.borderRadius: 12` (buttons/inputs/chips) stays unchanged — the 20px card radius is intentionally larger, per typical bento proportions. Dark-mode shadow values are a starting point and expected to need visual tuning.
- **Spacing**: no new spacing scale — keep using MUI's default 8px unit via `theme.spacing()`. Convention going forward: card internal padding ~2.5–3 units, inter-card grid/stack gap ~2–3 units, inter-section stack spacing ~3–4 units.

## 5. Capability map / build order

| ID  | Module                                   | File(s)                                                       | Depends on   |
| --- | ---------------------------------------- | ------------------------------------------------------------- | ------------ |
| M0  | Theme tokens                             | `packages/ui/src/theme/createAppTheme.ts`                     | — (blocking) |
| M1  | Bento card convention                    | (no new file — theme override from M0 is the convention)      | M0           |
| M2  | RepoCard restyle                         | `packages/ui/src/RepoCard.tsx`                                | M0, M1       |
| M3  | EmptyState restyle                       | `packages/ui/src/EmptyState.tsx`                              | M0, M1       |
| M4  | ErrorFallback restyle                    | `packages/ui/src/ErrorFallback.tsx`                           | M0, M1       |
| M5  | StarsChartCard: add missing card wrapper | `apps/web/src/features/stats-chart/StarsChartCard.tsx`        | M0, M1       |
| M6  | Header spacing softening                 | `apps/web/src/Header.tsx`                                     | M0           |
| M7  | Dashboard layout spacing check           | `apps/web/src/App.tsx`                                        | M5           |
| M8  | TrackedReposSection gap tuning           | `apps/web/src/features/tracked-repos/TrackedReposSection.tsx` | M2           |
| M9  | SearchResultsSection gap tuning          | `apps/web/src/features/search/SearchResultsSection.tsx`       | M2           |
| M10 | Verification pass                        | all of the above                                              | all          |

M2–M6 can be built in parallel once M0 lands. M7–M9 follow once their dependent card components are restyled, since they're spacing/gap tuning done by eye against the new look.

**Per-module notes:**

- **M2**: drop `variant="outlined"`; soften the error-state card, which currently uses a solid `bgcolor: "error.main"` fill — will move to a tinted background so it doesn't clash with soft shadows elsewhere. Props/variant logic/callbacks untouched.
- **M3**: convert from dashed-border placeholder to the bento card look.
- **M4**: wrap the centered content in a `Card` rather than bare text on the page background.
- **M5**: `StarsChartCard` currently renders `<StarsBarChart>` with no card at all — add `Card` + `CardContent` + a small title, matching the rest of the app's card language.
- **M6**: header stays a full-bleed sticky `AppBar` (not converted to a floating/inset bar) — only internal spacing changes.
- **M7–M9**: re-check `Stack`/grid gap values now that cards have visible shadows; shadows need more breathing room than flat outlined cards did.

## 6. Testing strategy

- `packages/ui/src/RepoCard.test.tsx` asserts on roles/text content and the MUI-internal `.MuiSkeleton-root` class — not on custom classnames or inline styles — so it's expected to keep passing unchanged. Re-run after M2 to confirm, especially if the error-state markup shifts.
- `EmptyState`, `ErrorFallback`, `StarsChartCard`, and `Header` have no unit tests today — verify visually via their Storybook stories (M3, M4) and by running `pnpm --filter web dev` (M5, M6–M9), checking both light and dark palette modes.
- Before considering the redesign done, run: `pnpm --filter @repo-radar/ui test`, `pnpm lint`, `pnpm typecheck`.

## 7. Boundaries

**Always do:**

- Keep all styling changes inside `sx` props and `createAppTheme.ts` — no new styling library or pattern.
- Preserve every component's public props/interface (`RepoCardProps`, `EmptyStateProps`, `ErrorFallbackProps`).
- Preserve all data-fetching, Redux state, routing, and business logic (`useTrackedRepoCacheEntries`, `useSearchBox`, `useRepoSearch`, sort/pagination, track/untrack callbacks) exactly as-is.
- Preserve existing responsive breakpoints (`TrackedReposSection`'s grid, `Header`'s `flexWrap`).
- Check both light and dark mode for every visual change, since dark-mode shadows read very differently than light-mode ones.

**Ask first about:**

- Any change beyond what's listed here — e.g. if mid-implementation it looks like the header or search bar genuinely needs restructuring (not just restyling) to look right, stop and confirm before doing it.
- Whether to keep `EmptyState`'s dashed border (intentionally signals "placeholder") vs. converting it to a solid bento card — current plan converts it, but this is a judgment call worth a quick visual check-in if it looks off.

**Never do:**

- Introduce a new styling system/library (Tailwind, CSS modules, styled-components) alongside MUI.
- Change component prop interfaces or callback signatures to achieve a visual effect.
- Touch data-fetching, caching, or Redux logic as part of this pass.
- Add asymmetric/varied grid-cell spans (out of scope per user's explicit choice).
