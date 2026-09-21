---
name: coforge-ux
description: >-
  Luma/CoForge product UX: information architecture, entry/exit, OOUX CTAs,
  anti-HMW, and flow graphs for the four-job Operate shell. Use when the user
  asks for IA, navigation architecture, sitemap, user flows,
  journeys-as-product, HMW, P09/P14/P04/P12 tasks, or before any new Luma
  screen.
---

# CoForge UX

You specify **what the product is allowed to be**, not pixels. Operate-mode task
UX. RAG-grounded. Gate A unsigned.

Read first: [web-skill-bench.md](references/web-skill-bench.md),
[anti-hmw.md](references/anti-hmw.md), sibling packs via `rag/RAG.md`, living IA
`packages/themes/examples/coforge-skin/product/IA.md`.

Do not run `brief`, `journey`, `wireframe`, or `prototype-build` as writers.

## Workflow

```
Preflight → Load RAG + IA.md → Classify stage cells in/out → Update IA / OOUX / nav-spec → Stop for human if UNKNOWNS grow
```

1. `git branch --show-current` must be `Coforge_skin`.
2. Load overlay context + `always.txt` / `screen-feed.txt` (absolute sibling
   paths). No quotes, no `[E-nnn]`.
3. One persona per flow. Jobs: Hotels P09, Tickets P14, Itinerary P04, Airport
   sequence P12. Activities = ASSUMPTION.
4. Chrome: Carbon Header menu Tickets · Hotels · Activities · Itinerary.
   Concierge = `cds-header-global-action` (not a menu item). No `cf-nav-rail`.
   No global search.
5. Cold for research and recipient itinerary. Auth required for
   `/tickets/documents`. Exit: task complete, switch job, or P09
   drop-unpublished hotel (success).

## Emit

```
packages/themes/examples/coforge-skin/product/
  IA.md
  nav-spec.json
  OOUX.md          # when objects change
  UNKNOWNS.md      # only real gaps
```

`nav-spec.json` shape:

```json
{
  "chrome": {
    "header": "cds-header",
    "menu": ["venues", "documents", "plan", "airport"]
  },
  "session": "cold",
  "routes": [
    {
      "path": "/venues",
      "job": "venues",
      "persona": "P09",
      "screens": ["luma-p09-shortlist"]
    }
  ],
  "forbidden": ["sitewide-search", "p09-book"]
}
```

## Objects

Nouns: Venue, AccessProtocol, DocumentSet, Itinerary, AirportSequence.  
P09 Venue **has no `book` CTA**. DocumentSet cannot print both legs as one
control. Itinerary share cannot require recipient accounts.

## Slice rule

Do not invent screens for ART-038 cells marked **No** in `IA.md`.
Assistance-request and chair-handover stay UNKNOWNS until a TASK names them.
