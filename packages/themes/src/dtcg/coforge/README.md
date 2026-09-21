# CoForge skin foundation

Agent index: [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) · [llms.txt](./llms.txt) ·
[context/](./context/)

Overlay on `@carbon/themes`. **Does not rewrite** IBM `white` / `g10` / `g90` /
`g100`.

## Provenance

| Source                                                                                                                               | What we take                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| [brand.md](file:///Users/raquelpalis/Projects/CoForge-Agentic-Design---Claude-duplicated/design-system/foundations/brand.md)         | Bone ground, navy ink, coral container vs coral-text                                         |
| [tokens.json](file:///Users/raquelpalis/Projects/CoForge-Agentic-Design---Claude-duplicated/design-system/tokens/tokens.json) v0.2.0 | `palette.bone` `#eeece6`, `ink` `#041222`, `coral.default` `#f15b40`, `coral.text` `#b03822` |
| [Figma Foundations](https://www.figma.com/design/ip2wZ3UUQ5sbFc3r902kYK/Agentic-Design-test---Claude?node-id=11-833)                 | Same four brand swatches; `layer.01–03` / `field` stay Carbon neutrals                       |
| ADR-011                                                                                                                              | Brand theme **on top of** Carbon structure                                                   |

## Colour roles (binding)

- **Bone** — page ground, not `#ffffff`. White is for raised cards only.
- **Ink** — default text, icons, focus. Not black. Not IBM blue.
- **Coral** — fills, wordmark, large-type CTAs. Never small text (2.82:1 on
  bone).
- **Coral-text** — the only coral allowed on labels/links (5.18:1 on bone).

Do **not** remap `layer-01/02/03`, `field-*`, `border-subtle-*`, or `syntax-*`.

Dark (`g90`/`g100`) is **not** skinned. Brand OQ-5 (dark register) is still
open.

## Use

```scss
@use '@carbon/styles';
@use '@carbon/themes/scss/coforge/skin' as coforge;

:root {
  @include styles.theme(styles.$white);
}

@include coforge.coforge-skin;
```

Then render Carbon components (`cds-button`, `Button`, …) as usual.

Storybook (git branch `Coforge_skin`): toolbar **CoForge → CoForge skin**. Sets
`data-coforge-skin="on"` on `<html>`. Default remains IBM. Dark themes
(g90/g100) are not skinned.

## Type (in this overlay)

Eight levels from `tokens.json` `typography.scale` — display, h1, h2, h3, body,
body-sm, caption, code. Prose is **Anek Latin**; code is **Source Code Pro**.
Every level binds `font-variant-numeric: tabular-nums`. Does **not** rewrite
`@carbon/type` IBM Plex maps. Figma: local text styles `CoForge/display` …
`CoForge/code` on the **CoForge foundations** page.

## Not in this pass

- Radius language (pills / 16–28px cards) — Carbon 0-radius stays default until
  a flagged overlay
- Two density registers (Stage vs Document)
- Dark (`g90` / `g100`) — brand.md OQ-5
- Merging a fifth theme into Style Dictionary `THEME_NAMES`

Those stay out until we add them here on purpose.
