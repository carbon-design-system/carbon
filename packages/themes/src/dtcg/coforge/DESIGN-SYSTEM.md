# CoForge overlay — agent index

Thin index for screen-design agents. **Not** a fifth IBM theme and **not** a
dump of Carbon tokens.

Authoritative colour overlay lives in [palette.json](./palette.json) and
[semantic-overrides.json](./semantic-overrides.json). IBM maps stay in
[`packages/themes/src/dtcg/themes.json`](../themes.json). Binding rules:
[README.md](./README.md). Screen jobs: [context/](./context/). Component ↔
Figma ↔ CSS: [component-token-map.json](./component-token-map.json). Machine
twin: [llms.txt](./llms.txt).

## Resolve a component (required order)

1. Find Code Connect:
   `packages/web-components/code-connect-parserless/**/*.figma.ts` (`id`,
   `// url=`).
2. Keep the **node id**. For writes, swap published fileKey
   `Ude8f8dEgXxxnpbzrvWfwE` → Community branch `mnPFHuLUzXItWQimrWQEvV`.
3. Instantiate the vendor name (`Button` / `cds-button`). Do not prefix CoForge.
4. Style only through `--cds-*` / `--coforge-*` listed on that row in
   `component-token-map.json`. No raw hex.

React API is the twin of `cds-*` (dual flagship). Prefer `@carbon/react` for
Storybook twins; Figma instances still come from Community Code Connect nodes.

## Colour roles

| Role            | Hex       | CSS                                                       | Never                                                       |
| --------------- | --------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| Bone            | `#eeece6` | `--cds-background`                                        | Page `#ffffff`                                              |
| Ink             | `#041222` | `--cds-text-primary`, `--cds-icon-primary`, `--cds-focus` | Black, IBM blue as brand ink                                |
| Coral container | `#f15b40` | `--cds-button-primary`, `--cds-background-brand`          | Small labels, helper text, dumping onto `--cds-interactive` |
| Coral text      | `#b03822` | `--cds-link-primary`, `--coforge-accent-text`             | Container coral as text                                     |

Do **not** remap `layer-01/02/03`, `field-*`, `border-subtle-*`, `syntax-*`.
Light only (`white` / `g10`).

## Type (legal to name; overlay is later-wave)

Prose: Anek Latin. Code: Source Code Pro. `font-variant-numeric: tabular-nums`.
Do not rewrite `@carbon/type` IBM Plex maps. IBM 0-radius stays default.

## Figma

Writes: branch `mnPFHuLUzXItWQimrWQEvV`. Never published main
`Ude8f8dEgXxxnpbzrvWfwE`. IBM default variable mode. New screens go on page
`Screens / <slug>`, not Code snippet `35:2542`. Do not run
`figma-generate-library` on this kit.

## Product (Luma prototype)

IA and anti-HMW: `packages/themes/examples/coforge-skin/product/IA.md`. Skills:
`coforge-ux`, `coforge-ui`, `coforge-frontend`, `coforge-prototype`. Architect
agent before `use_figma`.

## Membrane

If a component is missing from Code Connect / the token map, **stop and
propose**. Do not draw unlabeled rectangles or invent L2 CoForge components on
the canvas.
