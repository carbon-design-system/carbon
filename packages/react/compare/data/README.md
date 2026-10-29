# compare/data/

Generated outputs from `packages/react/compare/capture.mjs` and
`compare/diff.mjs`.

| File                         | Written by | Committed | Contents                                                                      |
| ---------------------------- | ---------- | --------- | ----------------------------------------------------------------------------- |
| `manifest.json`              | capture    | no        | Story pairing: matched (V11↔V12), migrated (IBM Products↔V12), V11/V12-only |
| `meta.json`                  | capture    | no        | When and against which builds the capture ran                                 |
| `docs.json`                  | capture    | no        | V12 Storybook Changelog + Feature Flags pages, parsed                         |
| `tokens.json`                | capture    | no        | `--cds-*` custom properties that differ between the V11 and V12 CSS           |
| `captures.json`              | capture    | no        | One summary row per captured story: pixel diff, element counts, errors        |
| `sass-index.json`            | sass-index | no        | Plain CSS value → Sass variable name map (rebuilt each CI run)                |
| `changelog.json`             | diff       | **yes**   | What the site reads: every component with its status, stories and changes     |
| `run-diff.json`              | diff       | **yes**   | What changed since the previous run                                           |
| `CHANGELOG.md`               | diff       | **yes**   | The same changelog, human-readable                                            |
| `stories/<id>.json`          | capture    | no        | Full per-story capture: computed styles, pixel diff                           |
| `shots/{v11,ibmp,v12,diff}/` | capture    | no        | Screenshots                                                                   |

## Generating

```bash
# From packages/react/
yarn compare:sass-index           # < 2 seconds, run once or after a Carbon update
yarn compare:capture              # ~15 min on laptop, ~6-10 min on CI (incremental)
yarn compare:diff
yarn compare:serve                # → http://localhost:4321
```

See `compare/capture.mjs` for `--only`, `--force`, `--limit`, `--concurrency`
flags.

## CI

`.github/workflows/refresh-compare.yml` runs automatically after the V12
Storybook deploys (`deploy-v12-storybooks.yml` completes) and deploys the site
to `compare-react.carbondesignsystem.com`.

Only `changelog.json`, `run-diff.json` and `CHANGELOG.md` are committed to git;
everything else lives in the Actions cache (raw captures) or the Pages deploy
(screenshots).
