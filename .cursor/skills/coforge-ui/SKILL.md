---
name: coforge-ui
description: >-
  CoForge/Carbon UI composition: overlay tokens, 2x grid, Header chrome,
  Search/Tile/Tag/Link, empty and commitment states, Figma Community instances.
  Use when designing or polishing Luma or CoForge screens, visual hierarchy, or
  UI craft on Coforge_skin / bone/ink/coral.
---

# CoForge UI

Pixels and instances. You do not invent IA (that is `coforge-ux`) and you do not
invent components (token map or propose).

Read: `coforge-skin-contract`, `coforge-skin-bench`,
[composition.md](references/composition.md), `component-token-map.json`.

## Rules

- Query the map. Vendor names only (`Header`, `Search`, `Tile`, `Tag`, `Link`,
  `Button`).
- Missing capability → `packages/themes/examples/coforge-skin/new/` per
  `coforge-new-component` (Prototype 2). Not a rectangle, not `cf-*`, not
  `packages/react/src/components`.
- Coral never body/small text. Small primary = ink or ghost.
- Light only. No glass, no custom radius language, no dark skin.
- Calibration `create-request` is not Luma visual reference for product IA.

## Screen emit

`packages/themes/examples/coforge-skin/screens/<slug>/{TASK.md,screen-spec.json,flow.md}`  
Then
`coforge-screen-design` handoff. Product chrome from `product/IA.md` +
`nav-spec.json`.

## Verify

Screenshot vs spec. Table Check · Result · Evidence. Skipped ≠ Pass. Human Gate
A.
