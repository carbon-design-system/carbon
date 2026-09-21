# Project RAG from CoForge OS

The design agent already knows **Carbon + overlay**. It does **not** yet know
**Luma Travel**, the only product workstream with Define-phase outputs. Those
live in a **sibling** repo, not nested in Carbon-DS:

`/Users/raquelpalis/Projects/CoForge-Agentic-Design---Claude-duplicated`

Override with env `COFORGE_OS`. Agents `Read` that path directly. Do not copy
the 14-agent fleet, `tokens.json`, or `token-keeper` into Carbon-DS.

Machine pointers: `packages/themes/src/dtcg/coforge/rag/`.

## Load order

1. Carbon overlay packs (`llms.txt`, `DESIGN-SYSTEM.md`,
   `context/PROJECT|BUSINESS|USER|TASK.md`)
2. Always list (`rag/always.txt`)
3. Design-loop screen feed (`rag/screen-feed.txt`)
4. Catalogue (`rag/index.json`) only when TASK names an ART-id

## Always

- `context/luma-travel.md`
- `design-system/foundations/brand.md`
- `design-system/a11y/rules.md`
- `design-system/DESIGN-SYSTEM.md`

ART-037 governance RAG is on demand, not every screen.

## Screen feed (latest non-superseded)

| ART        | Payload                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| ART-005    | `artifacts/brand-foundations/2026-08-27__brand-extraction__coforge-web__v1/coforge-visual-foundations.md` |
| ART-027 v2 | semantic colour contrast audit v2 (not v1)                                                                |
| ART-030    | `research-grounded-personas.md`                                                                           |
| ART-035    | priority-four HTML + handoff MD (not `luma-personas 2/`)                                                  |
| ART-034    | HMWs in `luma-travel.md` unless a dashboard card is needed                                                |
| ART-038 v3 | `05-luma-journey-maps-priority-four-content.md` (not journey v1/v2)                                       |
| ART-039    | `luma-priority-four-benchmark.md`                                                                         |
| ART-022    | cf-chip, cf-nav-rail, cf-detail-panel specs                                                               |
| ADRs       | 011, 018, 021, 022, 024                                                                                   |

No `ia-map` / `user-flow` / `wireframe` / `ui-screen` yet. New IA is
`ASSUMPTION`.

## Skip as primary RAG

`validation.md`, session logs, `system-operations/`, `luma-hands-on/`,
superseded journeys, interview HTML as quotes (ADR-024), token dumps.

Define artifacts are **draft**; Gate A not signed. No `[E-nnn]` quotes.

Empty TASK: ask which one of P09 / P14 / P04 / P12 and which journey stage (max
5). Calibration `create-request` is not the product.
