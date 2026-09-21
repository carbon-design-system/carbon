---
name: coforge-skin-contract
description: >-
  Binding rules for the CoForge overlay on IBM Carbon-DS. Use when editing
  packages/themes/scss/coforge, packages/themes/src/dtcg/coforge, CoForge
  Storybook decorators, type/radius overlay, or reflecting tokens to Figma
  Community. Use when the user mentions CoForge skin, bone/ink/coral,
  Coforge_skin, or Carbon Community branch mnPFHuLUzXItWQimrWQEvV.
---

# CoForge skin contract

Read this before any write. Pair with `coforge-skin-bench` before calling a wave
done.

## Dual branch (non-negotiable)

| Surface | Branch                                               | Never                                                  |
| ------- | ---------------------------------------------------- | ------------------------------------------------------ |
| Git     | `Coforge_skin`                                       | `main`, `master`, Community Code Connect-only branches |
| Figma   | `mnPFHuLUzXItWQimrWQEvV` (Community v11 `/branch/…`) | Published main `Ude8f8dEgXxxnpbzrvWfwE`                |

If `git branch --show-current` is not `Coforge_skin`, stop and switch (or tell
the user). Do not commit skin work on another branch. Do not merge to `main`
unless the user asks.

Skin commits may include: `packages/themes/**/coforge/**`,
`.cursor/skills/coforge-skin-*`, a Storybook CoForge decorator. Do **not** mix
`packages/web-components/code-connect-parserless/**` into skin commits.

## Overlay, not a fifth IBM theme

- Do not edit `packages/themes/src/dtcg/themes.json` or Style Dictionary
  `THEME_NAMES`.
- Do not prefix `Button` / `cds-button` (Code Connect binds vendor names).
- Light only (`white` / `g10`). Do not skin `g90` / `g100` (brand.md OQ-5).
- Do not remap `layer-01/02/03`, `field-*`, `border-subtle-*`, `syntax-*`.

## Colour roles (brand.md)

| Role            | Hex       | Carbon CSS vars                                           | Never                                               |
| --------------- | --------- | --------------------------------------------------------- | --------------------------------------------------- |
| Bone            | `#eeece6` | `--cds-background`                                        | Page `#ffffff`                                      |
| Ink             | `#041222` | `--cds-text-primary`, `--cds-icon-primary`, `--cds-focus` | Black, IBM gray.100 as brand ink                    |
| Coral container | `#f15b40` | `--cds-button-primary`, `--cds-background-brand`          | Small labels, helper text, `--cds-interactive` dump |
| Coral text      | `#b03822` | `--cds-link-primary`, `--coforge-accent-text`             | Using container coral as text                       |

Coral on bone is 2.82:1. Large-type CTA fill only. Small primary controls: ink
or ghost.

## Type / radius (later waves)

Overlay Anek Latin + Source Code Pro + `tabular-nums`. Do not rewrite
`@carbon/type` IBM Plex maps. Radius overlay is feature-flagged; IBM 0-radius
stays default.

## Figma (after bench green only)

`use_figma` with `skillNames: "figma-use"`. `fileKey` =
`mnPFHuLUzXItWQimrWQEvV`. First canvas: Code snippet `35:2542` (chrome may
rebind; syntax stays IBM). Do not run `figma-generate-library` on this kit. Keep
IBM as the default variable mode.

## Do not use as writers

`styleguide` (second DESIGN.md), ux-atlas `storybook`, CoForge `token-keeper`
copied into this repo.
