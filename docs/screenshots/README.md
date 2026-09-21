# Screenshots / GIFs to capture

The main [README.md](../../README.md) links to image files in this folder that don't
exist yet — they're placeholders. Run `pnpm dev`, open the app, and capture the
following (PNG for stills, GIF for interactions):

| File                       | What to capture                                                              |
| -------------------------- | ---------------------------------------------------------------------------- |
| `hero.gif`                 | Full flow: search → track a repo → see it in Tracked Repos → chart updates   |
| `search.gif`               | Typing in the search box, debounced results appearing                        |
| `track-untrack.gif`        | Clicking track on a search result, then untrack from the Tracked Repos view  |
| `tracked-repos.png`        | Tracked Repos grid showing stars, open issues, and last commit date          |
| `refresh.gif`              | Clicking refresh on a single tracked repo card (loading → updated data)      |
| `loading-error-states.png` | A repo card in its loading skeleton state and a repo card in its error state |
| `persistence.gif`          | Tracking a repo, reloading the page, and it's still there                    |
| `stars-chart.png`          | The bar chart of stars per tracked repository                                |

Keep GIFs short (5–10s) and under ~3MB so the README stays fast to load.
