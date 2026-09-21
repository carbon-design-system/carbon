---
name: coforge-prototype
description: >-
  Interactive Luma prototype on Figma reactions and React HashRouter from
  proto-spec.json. Use when the user wants a clickable prototype, hotspots,
  end-to-end flow, Figma prototype connections, or dual-surface interaction on
  Coforge_skin / mnPFHuLUzXItWQimrWQEvV.
---

# CoForge prototype

One spec, two surfaces. **Never** Figma Make, Claude Artifacts, Lovable, or v0.

Load: `coforge-ux`, `coforge-ui`, `coforge-frontend`,
[proto-spec.md](references/proto-spec.md),
[figma-reactions.md](references/figma-reactions.md),
[bench.md](references/bench.md).

## Order

```
IA.md + nav-spec → proto-spec.json → screen-specs → Figma frames → reactions → React routes → bench
```

Do not start at `use_figma`. Colour bench must be Pass or Skip-with-reason.

## Spec location

```
packages/themes/examples/coforge-skin/screens/<slug>/proto-spec.json
packages/themes/examples/coforge-skin/product/flows/<flow_id>.json   # multi-screen
```

Prefer `product/flows/` when a flow spans slugs.

## Surfaces

| Surface | Mechanism                                                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Figma   | Plugin `node.reactions` ON_CLICK → destination frame. Page: Screens `1756:1439` or user-named proto page — never Code snippet `35:2542` |
| React   | HashRouter in `examples/coforge-skin/app/`                                                                                              |

Hotspot `from` ids match `screen-spec.json` region ids.

## After write

Run [bench.md](references/bench.md). Optional:
`python3 .cursor/skills/coforge-prototype/scripts/validate-proto.py <proto-spec.json>`.
