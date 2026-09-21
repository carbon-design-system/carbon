---
name: coforge-frontend
description: >-
  CoForge Luma React prototype: HashRouter, Carbon Header shell, CoForge Sass,
  keyboard and labelled fields. Use when building the example app, wiring
  routes, Storybook CoForge decorator, or front-end interaction for
  Coforge_skin.
---

# CoForge frontend

Clickable **code** twin of `product/IA.md` + `proto-spec.json`. Dual flagship:
`@carbon/react` now.

Read: [app-shell.md](references/app-shell.md), `coforge-skin-contract`,
`coforge-ux` anti-HMW.

Ban: Vercel `react-best-practices` as a writer (shadcn/Tailwind). Ban `refine`
glass/dark heuristics.

## Workflow

1. Branch `Coforge_skin`.
2. Implement routes from `nav-spec.json` / proto-spec. Do not add routes IA
   marks **No**.
3. State in URL or local component state (empty query, selected document leg).
   No fake auth.
4. Verify in browser: Header, each hotspot, keyboard tab order, no Book on
   `/venues`.
5. Colour: `data-coforge-skin=on` on light theme only.

## Files

Keep the app under `packages/themes/examples/coforge-skin/app/`. Do not publish
a fifth IBM theme. Do not mix `code-connect-parserless` into the same commit.
