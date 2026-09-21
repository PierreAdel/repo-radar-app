# Screenshots / GIFs

Stills live in this folder (`docs/screenshots/`), animated captures live in
[`docs/gifs/`](../gifs). The main [README.md](../../README.md) links to files here.

## Captured

| File                    | Shows                                                                        |
| ----------------------- | ---------------------------------------------------------------------------- |
| `tracked-repos.png`     | Tracked Repos grid + the stars-per-repo chart (used as the hero image)       |
| `tablet-responsive.png` | Tracked Repos view on a tablet viewport (two-column grid)                    |
| `mobile-responsive.png` | Tracked Repos view on a narrow mobile viewport (single-column grid)          |
| `empty-state-dark.png`  | Empty state ("no tracked repos yet"), dark theme                             |
| `empty-state-light.png` | Empty state, light theme                                                     |
| `offline-state.png`     | `OfflineBanner` shown while the browser is offline                           |
| `../gifs/search.gif`    | Typing in the search box, debounced results appearing                        |
| `search-results.png`    | Populated search results - captured but not currently linked from the README |

## Still needed

Run `pnpm dev`, open the app, and capture (PNG for stills, GIF for interactions,
saving GIFs into `docs/gifs/`):

| File                        | What to capture                                                              |
| --------------------------- | ---------------------------------------------------------------------------- |
| `../gifs/track-untrack.gif` | Clicking track on a search result, then untrack from the Tracked Repos view  |
| `../gifs/refresh.gif`       | Clicking refresh on a single tracked repo card (loading → updated data)      |
| `loading-error-states.png`  | A repo card in its loading skeleton state and a repo card in its error state |
| `../gifs/persistence.gif`   | Tracking a repo, reloading the page, and it's still there                    |

Keep GIFs short (5-10s) and under ~3MB so the README stays fast to load -
`../gifs/search.gif` is down to ~11MB after re-exporting (was ~36MB), still worth
trimming further if you get the chance.
