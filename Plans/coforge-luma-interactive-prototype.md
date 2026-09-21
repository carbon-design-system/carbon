# Luma interactive prototype — plan

**Updated:** 2026-09-18  
**Git:** `Coforge_skin` only — do not merge to `main` unless asked  
**Figma:** Community v11 `mnPFHuLUzXItWQimrWQEvV` only — never published
`Ude8f8dEgXxxnpbzrvWfwE`  
**Status:** Define-phase draft. Gate A unsigned. Synthetic corpus. ADR-024: no
user quotes. IA labeled **ASSUMPTION**.

**Superseded for next action.** Canonical close-out:
[`Plans/coforge-luma-final.md`](coforge-luma-final.md). Competitor re-audit:
`packages/themes/examples/coforge-skin/product/COMPETITOR-MODEL-BENCH.md`. This
file remains the longer decision log. **Do not start pixels until the final plan
is accepted.**

---

## Decision log (locked)

| Fork          | Decision                                                                                                       |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| Surfaces      | **Both** — Figma reactions + React HashRouter                                                                  |
| Scope         | Priority-four HMWs in an Operate shell — not a 14-persona OTA                                                  |
| Chrome **v2** | Menu: **Tickets · Hotels · Activities · Itinerary**. Layer: **Concierge**. Airport sequence is not a menu item |
| Search        | In-job only (Hotels / Activities). No sitewide search                                                          |
| Session       | **Cold** for research + recipient itinerary. **Auth** for `/tickets/documents`                                 |
| Slice 1       | P09 **Hotels** access gate                                                                                     |
| IA            | `IA.md` v2 + `USE-CASES.md` + `FLOWS.md`                                                                       |

Anti-HMW: no Book on Hotels; no ticket checkout; P14 pair after auth; P04 share
without recipient account; P12 sequence via `/airport`; concierge does not Book.

---

## Where things live

| Artifact      | Path                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| IA            | `packages/themes/examples/coforge-skin/product/IA.md`                                 |
| Nav           | `…/product/nav-spec.json`                                                             |
| P09 flow      | `…/product/flows/p09-access-gate.json`                                                |
| Unknowns      | `…/product/UNKNOWNS.md`                                                               |
| Product bench | `…/product/PRODUCT-BENCH.md`                                                          |
| Skill bench   | `.cursor/skills/coforge-ux/references/web-skill-bench.md`                             |
| Colour bench  | `…/screens/luma-p09-shortlist/BENCH.md` — Pass (type Skip; Figma IBM mode Skip)       |
| P09 frame     | Figma `13184:2991` on Ai Test `13172:2451` — **static leaf**, no Header, no reactions |
| Calibration   | `screens/create-request/` — **not Luma**; do not fold into the map                    |

---

## Agents and skills (disclosure)

Parent for plan updates: Cursor Grok 4.6.

### Run this product (in order)

| Step      | Who                                                                  | Does                                              |
| --------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| 1         | Agent `coforge-product-architect`                                    | Orchestrates. Never starts at `use_figma`         |
| 2         | Skill `coforge-ux`                                                   | IA, anti-HMW, CTAs, nav-spec                      |
| 3         | Skill `coforge-ui`                                                   | Carbon composition, overlay, states               |
| 4         | Skill `coforge-screen-design` + agent `coforge-screen-designer`      | One frame / screen-spec (leaf)                    |
| 5         | Skill `coforge-prototype`                                            | Figma reactions + proto-spec                      |
| 6         | Skill `coforge-frontend`                                             | HashRouter app under `examples/coforge-skin/app/` |
| Always    | `coforge-skin-contract` + `coforge-skin-bench`                       | Overlay law; Figma unlock                         |
| Figma MCP | `use_figma` (`figma-use`, `figma-generate-design`), `get_screenshot` | Instances + hotspots + verify                     |

### Do not use as writers

`prototype-build`, `wireframe`, `journey`, `brief`, Vercel
`react-best-practices` / `shadcn`, impeccable `bolder`/`delight`/`overdrive`,
Claude `refine` (glass/dark), `figma-generate-library`, CoForge OS 14 agents /
`token-keeper`, `cf-nav-rail`.

`map` objects: only if we write `product/OOUX.md` (still missing).
`create-skill` is **done** for this cut.

---

## Done vs not

### Done

- Overlay colour + RAG pointers
- UX/UI/frontend/prototype skills + product-architect agent
- IA, nav-spec, P09 proto-spec (`validate-proto.py` OK)
- One static P09 shortlist in Figma (Community instances)

### Not done (blocks “interactive”)

- `product/OOUX.md`
- Slice 0 frames: Home + Header on four jobs
- Slice 1 screens: venue protocol, how-verified, empty; wrap shortlist in shell
- Figma `reactions` graph
- React `app/` HashRouter
- Flows for P14 / P04 / P12 (`nav-spec` names screens that do not exist yet)
- Prototype bench table in `product/VERIFY.md`
- Human Gate A

`cf-nav-rail` stays blocked. Type wave (Anek) stays Skip.

---

## Build sequence (next)

```
Slice 0   Shell + Home
          Figma: Header + four job tiles + four stub destinations
          React: HashRouter + Header; stub routes
          Wire Header reactions / links both surfaces

Slice 1   P09 access gate  ← current priority
          Screens: shortlist (reparent into shell), venue, how-verified, empty
          proto-spec already at product/flows/p09-access-gate.json
          No Book CTA. Drop-unpublished = success
          validate-proto.py + prototype bench

Slice 2   P14 documents — outbound vs return pair; recovery stub (ASSUMPTION)
Slice 3   P04 plan — read-only + share link/print
Slice 4   P12 airport — sequence + TSA link-out; do not clone MyTSA
Gate A    Human — do not self-approve
```

Figma product frames: page **Screens** `1756:1439` (or a named Luma proto page
you pick). Do not park on Code snippet `35:2542`. Existing shortlist on Ai Test
can be **duplicated into the shell**, not left as the only chrome-less frame.

Commits: skin/product/screens only. Never mix
`packages/web-components/code-connect-parserless/**`.

---

## Slice 0 / 1 screen inventory

| Slug                                 | Route                           | Status                                        |
| ------------------------------------ | ------------------------------- | --------------------------------------------- |
| `luma-home`                          | `/`                             | Not built                                     |
| `luma-p09-shortlist`                 | `/venues`                       | Frame exists; needs shell + reactions + empty |
| `luma-p09-venue`                     | `/venues/:id`                   | Not built                                     |
| `luma-p09-how-verified`              | `/venues/how-verified`          | Not built                                     |
| Documents / Plan / Airport interiors | `/documents` `/plan` `/airport` | Stubs only until slices 2–4                   |

---

## Definition of done (interactive, this product)

- Header reaches all four jobs on Figma **and** React
- P09: search → verified tile → protocol; unpublished has no Book; how-verified
  reachable; empty state
- `forbidden_hotspots` absent
- Keyboard: Header, labelled Search, tiles, links (React)
- `product/VERIFY.md` Check · Result · Evidence
- Gate A still human

---

## Next action

Accept or reject [`Plans/coforge-luma-final.md`](coforge-luma-final.md). Slice 0
starts only after that.
