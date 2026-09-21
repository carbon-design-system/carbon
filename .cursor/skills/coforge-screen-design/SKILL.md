---
name: coforge-screen-design
description: >-
  Design CoForge/Carbon screens and flows with precision, then hand a
  screen-spec to Figma generate-design / use_figma. Use when the user asks to
  design a screen, agentic design, compose a flow in Figma, or pair with Figma
  agents using the CoForge overlay, bone/ink/coral, Coforge_skin, or Community
  branch mnPFHuLUzXItWQimrWQEvV.
---

# CoForge screen design

You are the design-system brain **in front of** Figma agents. You compose from
Carbon + CoForge overlay. You do not draw primitives when a Code Connect
component exists.

Read before any write:

1. [coforge-skin-contract](../coforge-skin-contract/SKILL.md)
2. [coforge-skin-bench](../coforge-skin-bench/SKILL.md)
3. [packages/themes/src/dtcg/coforge/llms.txt](../../../packages/themes/src/dtcg/coforge/llms.txt)
4. [packages/themes/src/dtcg/coforge/DESIGN-SYSTEM.md](../../../packages/themes/src/dtcg/coforge/DESIGN-SYSTEM.md)
5. Context pack: `PROJECT.md`, `BUSINESS.md`, `USER.md`, then `TASK.md`
6. Product RAG:
   [rag/RAG.md](../../../packages/themes/src/dtcg/coforge/rag/RAG.md) then
   `always.txt` and `screen-feed.txt` as absolute reads under the sibling
   CoForge OS root. Catalogue `index.json` only if TASK names an ART-id.

References: [bans](references/bans.md) ·
[screen-spec](references/screen-spec.md) ·
[code-connect](references/code-connect.md) ·
[handoff-figma](references/handoff-figma.md)

Product (multi-screen): `coforge-ux` → `coforge-ui` → this skill →
`coforge-prototype`. Agent: `coforge-product-architect`. Interactive flows emit
`proto-spec.json` **before** Figma reactions.

## Workflow

```
Preflight → Load packs → Compose spec → Handoff Figma → Optional Storybook twin → Verify
```

### 1. Preflight

```bash
git branch --show-current   # must print Coforge_skin
```

If not `Coforge_skin`, stop. Figma writes are blocked until colour rows in
`coforge-skin-bench` are Pass or Skip-with-reason.

Do not mix `packages/web-components/code-connect-parserless/**` into the same
commit as a screen.

### 2. Load packs

Read overlay + local context:

- `packages/themes/src/dtcg/coforge/context/PROJECT.md`
- `.../BUSINESS.md`
- `.../USER.md`
- Job `TASK.md` — template at `context/TASK.md`, filled copy under
  `packages/themes/examples/coforge-skin/screens/<slug>/TASK.md`

Then product RAG (sibling repo, never nested):

1. `packages/themes/src/dtcg/coforge/rag/RAG.md`
2. Join each line of `rag/always.txt` and `rag/screen-feed.txt` to `COFORGE_OS`
   or `rag/root.txt`. `Read` those files. If the root is missing, stop.
3. `rag/index.json` only when TASK names an `ART-*` id.

If `TASK.md` is EMPTY or missing slug/goal/flow: ask which **one** of P09 / P14
/ P04 / P12 and which journey stage (max **five** questions). Do not invent the
product. Calibration `create-request` is not Luma Travel.

Label ungrounded claims `ASSUMPTION`. Never invent user quotes. Define artifacts
are draft; Gate A unsigned.

### 3. Compose, do not draw

Query
[component-token-map.json](../../../packages/themes/src/dtcg/coforge/component-token-map.json).
Every region is a Carbon `id` / React export that exists in the map.

Emit:

```
packages/themes/examples/coforge-skin/screens/<slug>/
  TASK.md
  screen-spec.json
  flow.md
```

Schema: [references/screen-spec.md](references/screen-spec.md).

Primary `lg` may use coral fill. Primary `sm` = ink or ghost. Fields stay
`--cds-field-*`. Page ground `--cds-background` (bone), not `#ffffff`.

Missing component → proposal in the reply, not a rectangle on the canvas.

### 4. Handoff to Figma

Follow [references/handoff-figma.md](references/handoff-figma.md). Load
`figma-use` then `figma-generate-design`. Instances from Community branch
`mnPFHuLUzXItWQimrWQEvV` using map `write_fileKey` + `componentKey`. Place the
frame on existing page `Screens` — not Code snippet `35:2542`.

Forbidden: `$fig.autoLayout` of unlabeled frames painted with `hex('#f15b40')`
when `cds-button` exists.

### 5. Optional code twin

Same spec as a React story under CoForge decorator
(`globals.coforgeSkin: 'on'`), vendor names (`Button`, `TextInput`, …).

### 6. Verify

Figma screenshot vs spec vs Storybook. Table: Check · Result · Evidence. Skipped
≠ Pass. Re-run skin-bench colour checks the screen actually uses. Human Gate A —
do not self-approve.

## Operate mode

Task UI. Brand lives in precise token bindings, not decoration.
