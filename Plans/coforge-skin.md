# CoForge skin — living plan (conformity first)

**Date:** 2026-09-18  
**Git:** `Coforge_skin` only  
**Figma:** Community v11 branch `mnPFHuLUzXItWQimrWQEvV` only — never published
main `Ude8f8dEgXxxnpbzrvWfwE`

**Human audit next.** Storybook is **last**, after repo + Figma token/docs paths
match the IBM fork.

SSOT order: `brand.md` → CoForge `tokens.json` v0.2.0 → **this repo’s DTCG
overlay** → Figma CoForge foundations page. Overlay, not a fifth IBM theme.

Board to audit:
[CoForge Foundations](https://www.figma.com/design/mnPFHuLUzXItWQimrWQEvV/Coforge_skin?node-id=13170-1951)
(`13170:1951`).

---

## Agents (disclosure)

| Role      | Who                                                       | This pass                                                                             |
| --------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Parent    | Cursor Grok 4.6                                           | Audit + rewrite this plan. No Storybook. No commit.                                   |
| Skill     | `coforge-skin-contract`                                   | Dual branch, overlay rules, coral roles                                               |
| Skill     | `coforge-skin-bench`                                      | Pass/fail gates; Figma writes stay blocked until colour rows Pass or Skip-with-reason |
| Skill     | `coforge-screen-design`                                   | Read only. No new screens.                                                            |
| Subagent  | [IBM token doc map](dad4e0be-51b2-4765-b892-325cb89e0557) | `cavecrew-investigator` — IBM path table                                              |
| Figma MCP | `get_metadata`, `get_variable_defs`                       | Foundations board + bound variables                                                   |
| Identify  | `audit` (craft/code)                                      | Findings only; `refine` does not run                                                  |

**Do not use as writers:** `styleguide` (second DESIGN.md), CoForge
`token-keeper` copied in, `figma-generate-library` on this kit, CoForge’s 14 OS
agents, `get_design_context`.

---

## IBM path we must copy (not IBM values)

Every **new** CoForge token or doc follows the fork, not a parallel OS tree.

| Concern            | IBM pattern                                                                                          | CoForge must                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Palette primitives | `packages/colors/src/dtcg/colors.json` — nested groups, `$type` `$value` `$description`              | `packages/themes/src/dtcg/coforge/palette.json` same node shape                                             |
| Semantic colour    | `packages/themes/src/dtcg/themes.json` — nested keys, `$description`, `$extensions["carbon.themes"]` | Overlay JSON with nested keys + `$description`; values only for **white/g10**; **do not** add `THEME_NAMES` |
| Component colour   | `src/dtcg/components/<name>.json`                                                                    | Do **not** fork button.json. Overlay remaps `--cds-button-primary` in Sass only                             |
| Nested → flat      | `border.subtle.02` → `border-subtle-02` → `--cds-border-subtle-02`                                   | Same hyphenation. Document in overlay README like `dtcg/README.md`                                          |
| Type               | `packages/type/README.md` + `docs/sass.md` named styles (`heading-01`, …)                            | Overlay `type.json` + README table for the **eight CoForge levels**; do not rewrite Plex maps               |
| Layout             | `@carbon/layout` 13-step                                                                             | Document aliases; Figma px @ 16px/rem already                                                               |
| Sass API           | `packages/themes/docs/sass.md` entrypoint table                                                      | Add `@carbon/themes/scss/coforge` row                                                                       |
| Agent lookup       | `AGENTS.md` theme token section                                                                      | One overlay paragraph (nested keys, where to look)                                                          |
| Examples           | `packages/themes/examples/<name>/README.md`                                                          | `examples/coforge-skin/README.md`                                                                           |
| Generated SCSS     | `yarn build` → `scss/generated/` (gitignored)                                                        | Overlay stays **hand Sass** until a dedicated SD task; JSON is still SoT                                    |

---

## Audit (repo)

### Pass

- Overlay Sass exists: `packages/themes/scss/coforge/_skin.scss` +
  `_index.scss`. Prefix `cds`. Layer / field / syntax not remapped.
- Palette JSON is DTCG-ish: `$type` `$value` `$description` on bone / ink /
  coral / coral.text.
- IBM `themes.json` / `THEME_NAMES` untouched.
- HTML colour bench: `packages/themes/examples/coforge-skin/`.
- Skills under `.cursor/skills/coforge-skin-*`.

### Fail — tokens do not match IBM documentation structure

1. **`semantic-overrides.json` is a sidecar, not DTCG.** Flat hyphen keys
   (`text-primary`), no per-token `$type` / `$description` / `$extensions`, plus
   a `do_not_override` array IBM never uses. IBM would nest `text` → `primary`.
2. **Type has no DTCG file.** Eight levels live as `--coforge-type-*` literals
   in Sass. IBM documents type as named styles with descriptions in
   `packages/type/docs/sass.md`. Need `src/dtcg/coforge/type.json`
   (`$type: dimension` / fontFamily / fontWeight) and a README group table.
3. **Hex duplicated.** Sass `$coforge-bone` etc. are a second SoT. IBM: JSON in,
   generated (or documented overlay) out.
4. **Package docs ignore the overlay.** Missing from
   `packages/themes/src/dtcg/README.md` (structure tree),
   `packages/themes/docs/sass.md` (entrypoint table),
   `packages/themes/README.md`, `AGENTS.md`.
5. **Example has no README.** IBM `examples/preview/README.md` is the pattern.
6. **Token tree mixed with product OS.** `context/`, `rag/` (Luma Travel),
   `DESIGN-SYSTEM.md`, `llms.txt`, `component-token-map.json` are **not** Carbon
   dtcg siblings. Keep as agent membrane **beside** tokens, but they must not be
   the colour/type SoT. Do not add more product RAG into `src/dtcg/`.

### Skip

- Storybook preview (packages unbuilt). **Last wave.**
- Product radius, density, dark (OQ-5).

---

## Audit (Figma branch)

### Pass

- Unique foundations board `13170:1951` (Brand, Semantic surfaces, Type scale,
  Spacing, radius 0).
- IBM nested names already used for Carbon leftovers: `layer/01`, `field/01`,
  `border/subtle-01`.
- Text styles `CoForge/display` … `CoForge/code` (Anek / Source Code Pro). Title
  tracking −2px on display.
- IBM Theme ramps (`gray/10` … `blue/60`) still present on the file (collection
  not rewritten).

### Fail — variables / captions vs IBM + repo

1. **Three naming schemes on one board:** primitives `bone/default`, Carbon
   nested `layer/01`, CSS strings `var(--cds-text-primary)` /
   `var(--cds-background)`. IBM Theme kit uses **token path**, not CSS var
   strings. Conform: `text/primary`, `background`, `button/primary`,
   `link/primary` — same nested path as `themes.json`.
2. **Caption still points at sibling `tokens.json` as the bind target.** After
   repo DTCG is SoT, caption must cite `packages/themes/src/dtcg/coforge/`
   (palette + overlay + type), sourced from brand.md.
3. **Extra CoForge-only names** (`palette/ink-2`, `palette/rule`,
   `accent/container`, `surface/flat`) are not documented in repo DTCG. Either
   add them as nested DTCG nodes with `$description`, or remove from the board.
4. **No on-page nested→flat→CSS table** matching `dtcg/README.md` (e.g.
   `text.primary` → `text-primary` → `--cds-text-primary`).
5. **Type styles are CoForge names, not IBM `heading-01`.** Correct (do not bind
   Plex). Missing: a **mapping column** (CoForge `h1` ↔ do-not-use IBM
   `productive-heading-05` etc.) so auditors do not mix Type Set.

---

## Do not do

- Edit `themes.json` / `THEME_NAMES` / IBM `components/*.json`.
- Skin `g90` / `g100`.
- Mix `code-connect-parserless/` into a skin commit.
- Run `figma-generate-library` on this kit.
- Copy CoForge’s 14 agents into this repo.
- Invent a fifth documentation root (`DESIGN.md` via styleguide).
- Start Storybook until waves 1–2 are done and you have audited.

---

## Next waves (order)

### 1. Repo token + docs conformity (do this first)

- Reshape `semantic-overrides.json` to nested DTCG (IBM groups: `background`,
  `text.primary`, `icon.primary`, `focus`, `interactive`, `link.primary`,
  `button.primary` + hover/active). Each node: `$type`, `$description`, overlay
  values for white/g10 as aliases `{ink.default}` / `{coral.default}` /
  `{coral.text}`. List untouched groups in README, not a fake token array.
- Align `palette.json` with `colors.json` node rules; document nested → flat
  (`coral.text` → `coral-text`).
- Add `type.json` for the eight levels (size, weight, tracking, family). README
  table like `packages/type/docs/sass.md`.
- Point `_skin.scss` comments (and later codegen) at those JSON paths; keep hand
  Sass until SD is a real task.
- Document overlay in: `src/dtcg/README.md` (subtree),
  `packages/themes/docs/sass.md` (one row), `AGENTS.md` (lookup),
  `examples/coforge-skin/README.md`.
- Do not grow `rag/` / `context/` as token docs.

### 2. Figma conformity (same names as wave 1)

- Rename CoForge collection vars to IBM nested paths for remaps; keep primitives
  `bone` / `ink` / `coral` as the overlay palette (like `@carbon/colors` vs
  themes).
- Drop `var(--cds-*)` variable names; the CSS column lives in the documentation
  table on the board.
- Update the head caption to Carbon-DS dtcg paths.
- Add nested → hyphen → `--cds-*` table; add CoForge type style ↔ IBM type-set
  **do-not-use** table.
- Any variable on the board that is not in dtcg JSON is either added to JSON
  first or deleted.
- IBM Theme White/G10/G90/G100 collections stay default / untouched.

### 3. Hygiene

- Skin-only commit when asked (themes/coforge, docs touches, skills, this plan).
  Leave parserless untracked.
- Stale canvas `canvases/coforge-skin-audit.canvas.tsx`: refresh or delete.

### 4. Storybook — **last**

- Build monorepo packages, fix Vite resolve.
- Prove Colour bench: IBM default, CoForge toolbar opt-in (bone page, lg coral,
  sm ink, coral-text link, field/layer/syntax IBM).

### Later (not this audit)

- Product radius flag, Stage vs Document density, dark (OQ-5), optional Code
  snippet chrome bind.

---

## Bench (current)

| Check                                   | Result                                                           |
| --------------------------------------- | ---------------------------------------------------------------- |
| Dual branch                             | Pass                                                             |
| Colour overlay Sass                     | Pass (runtime)                                                   |
| Type overlay Sass + Figma styles        | Pass (runtime)                                                   |
| DTCG + docs match IBM fork              | **Fail** — semantic flat JSON, no type.json, package docs silent |
| Figma var names match DTCG nested paths | **Fail** — CSS-var names + undocumented extras                   |
| Foundations page uniqueness             | Pass                                                             |
| Document spacing / radius 0             | Pass                                                             |
| IBM Theme modes                         | Pass (untouched)                                                 |
| Storybook preview                       | Skip — last                                                      |
| Product radius / dark                   | Skip                                                             |

---

## First action when you say go

Wave **1 (repo DTCG + IBM-path docs)**, then wave **2 (Figma names + caption +
tables)** so your audit can walk the same nested keys in git and in Figma.
Storybook stays last.
