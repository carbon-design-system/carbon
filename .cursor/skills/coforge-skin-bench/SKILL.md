---
name: coforge-skin-bench
description: >-
  Pass/fail gate for CoForge skin waves on Carbon-DS. Use before declaring
  colour/type/radius work done and before any Figma write on the Community v11
  branch. Use when the user asks if the skin is ready, to audit overlay
  contrast, or to reflect CoForge on Figma branch mnPFHuLUzXItWQimrWQEvV.
---

# CoForge skin bench

Run on git branch `Coforge_skin` only. If not on that branch, fail the bench.

Figma writes are **blocked** until every row below is Pass or Skip-with-reason.

## Preflight

```bash
git branch --show-current   # must print Coforge_skin
```

- Sass/lint on touched overlay files: clean.
- No edits to `themes.json` / `THEME_NAMES`.
- `code-connect-parserless` not staged with the skin.

## Colour proofs (Storybook CoForge decorator)

| Check                 | Pass                                                                |
| --------------------- | ------------------------------------------------------------------- |
| Page background       | `--cds-background` = `#eeece6`                                      |
| Primary Button **lg** | fill `#f15b40`, large label (white-on-coral 3.33:1 large-text only) |
| Primary Button **sm** | not coral fill (ink or ghost)                                       |
| Link                  | `--cds-link-primary` = `#b03822`                                    |
| Text input field      | still Carbon `field-*` gray                                         |
| Layer 01–03           | still IBM stack                                                     |
| Code snippet syntax   | IBM syntax tokens unchanged                                         |
| Interactive fan-out   | coral **not** assigned to all `--cds-interactive` consumers         |

## Contrast (measure, do not guess)

| Pair                                           | Floor                                                 |
| ---------------------------------------------- | ----------------------------------------------------- |
| Ink `#041222` on bone `#eeece6`                | ≥ 15:1 (expect ~15.95)                                |
| Coral-text `#b03822` on bone                   | ≥ 4.5:1 (expect ~5.18)                                |
| Coral `#f15b40` on bone as **body/small text** | must **fail** — if it passes, the wrong hex is in use |
| White on coral as **small** label              | fail — CTA must be large type                         |

Grep skinned `:root` / `.cds--white` for leftover IBM `#0f62fe` / `blue.60` on
background, text-primary, button-primary, link-primary.

## Type wave (when in scope)

- Prose is Anek Latin, not IBM Plex Sans.
- Code is Source Code Pro, not IBM Plex Mono.
- Numeric columns have `font-variant-numeric: tabular-nums`.

## Figma unlock

Only if colour (and type, if that wave shipped) is Pass:

- Target branch fileKey `mnPFHuLUzXItWQimrWQEvV`, never main
  `Ude8f8dEgXxxnpbzrvWfwE`.
- First page: Code snippet `35:2542`.
- Bind only roles proven in CSS. Leave `syntax.*`, `layer.01–03`, `field.*`.

Report as a table: Check · Result · Evidence (file, computed ratio, or
screenshot). Skipped is not Pass.
