# CoForge OS RAG (sibling pointers)

Do **not** nest or copy the CoForge OS repo into Carbon-DS. `Read` absolute
paths.

## Root

1. Env `COFORGE_OS` if set and non-empty.
2. Else the one line in [`root.txt`](./root.txt).

If that directory does not exist, **stop and ask**. Do not invent Luma Travel or
brand context.

## Load order

1. Overlay packs in this repo (`llms.txt`, `DESIGN-SYSTEM.md`,
   `context/PROJECT.md`, `BUSINESS.md`, `USER.md`, job `TASK.md`).
2. Every path in [`always.txt`](./always.txt) joined to the root.
3. Every path in [`screen-feed.txt`](./screen-feed.txt) joined to the root (skip
   a line if the file is missing; say so).
4. [`index.json`](./index.json) **only** when TASK names an `ART-*` id. Open
   that row’s `dir`/`file`. Do not dump the catalogue into context.

ART-034 problem statements: use the HMW section already in
`context/luma-travel.md` unless a dashboard card is required.

ART-037 (`context/luma-travel-research-governance-rag.md`) is on demand, not
every screen.

## Rules

- Define artifacts are draft. Gate A is not signed. Treat as synthetic /
  directional.
- No user quotes. Evidence ledger is zero (ADR-024). No `[E-nnn]`.
- One persona, one scenario per screen (P09 / P14 / P04 / P12).
- Do not invent IA / wireframes that are not in the catalogue; label new IA
  `ASSUMPTION`.
- Skip as primary RAG: `validation.md`, session logs, `system-operations/`,
  `luma-hands-on/`, journey v1/v2, interview HTML as quotes, `tokens.json`.

Regenerate the catalogue:

```bash
python3 packages/themes/src/dtcg/coforge/scripts/build-rag-index.py
```
