# Luma Travel — information architecture (prototype)

**Status:** ASSUMPTION draft. Gate A unsigned. Chrome **v2 accepted 2026-09-18**
(stakeholder + [`IA-BENCH-v2.md`](IA-BENCH-v2.md)).  
**Corpus:** synthetic. ADR-024: no quotes. Pain → ART-030. Opportunity →
ART-039.  
**Surfaces (later):** Figma `mnPFHuLUzXItWQimrWQEvV` + React HashRouter. Not
pixels this file.

**Anti-finding #6:** four **jobs** plus a **horizontal concierge**. Not one OTA
funnel. No sitewide search. Do not sell tickets or hotel/activity SKUs in this
prototype.

Use cases: [`USE-CASES.md`](USE-CASES.md) · Flows: [`FLOWS.md`](FLOWS.md) ·
Objects: [`OOUX.md`](OOUX.md) · Competitor model:
[`COMPETITOR-MODEL-BENCH.md`](COMPETITOR-MODEL-BENCH.md) · P2:
`Plans/prototype-agentic-2.md` · Audit:
[`PROTOTYPE-2-AUDIT.md`](PROTOTYPE-2-AUDIT.md)

---

## Product promise

| Job / layer              | Persona     | HMW                                               | Anti-HMW                                      |
| ------------------------ | ----------- | ------------------------------------------------- | --------------------------------------------- |
| Hotels                   | P09 Halina  | Access facts before intent                        | Not Book / hold / pay                         |
| Tickets (airplane first) | P14 Bernard | Wrong document pair impossible to confuse         | Not sell the seat; not “simplify for elderly” |
| Activities               | —           | ASSUMPTION: access-gated stops or itinerary lines | Not an experiences marketplace                |
| Itinerary                | P04 Reuben  | Plan the other seven can act on                   | Not faster planning; not collab editor        |
| Airport sequence         | P12 Jaden   | Physical sequence as primary content              | Not a Luma booking form; not a MyTSA clone    |
| Concierge (layer)        | All         | Jump into the right job                           | Not Book for P09; not “I’ll plan it for you”  |

---

## Chrome

| Region      | Carbon                                          | Content                                                         |
| ----------- | ----------------------------------------------- | --------------------------------------------------------------- |
| Header name | `cds-header`                                    | Luma                                                            |
| Menu        | `cds-header-menu-item` ×4                       | Tickets · Hotels · Activities · Itinerary                       |
| Concierge   | `cds-header-global-action` + `cds-header-panel` | Horizontal. Always on. Not a menu destination                   |
| Account     | Header global / panel                           | Required only for stored tickets/documents and planner save     |
| Search      | In-job only                                     | Hotels (and Activities if research). **No** sitewide OTA search |

Airport sequence is **not** a fifth menu item. Open from Itinerary, Tickets, or
Concierge → `/airport`.

Canonical joined flowchart (v1 task depth + v2 chrome): [`FLOWS.md`](FLOWS.md).
Join plan: [`FLOW-JOIN.md`](FLOW-JOIN.md).

---

## Session

```
Cold → /
  open: Hotels, Activities (research), Itinerary recipient URL, /airport, Concierge first ask
Auth → /tickets/documents, planner saved itinerary, concierge memory (ASSUMPTION)
```

Exit: task complete · switch job · drop unpublished hotel (success) · sign out
to cold.

---

## Routes

| Path                          | Auth                                         | Persona          |
| ----------------------------- | -------------------------------------------- | ---------------- |
| `/`                           | No                                           | All              |
| `/tickets`                    | No (flight on itinerary)                     | P14              |
| `/tickets/documents`          | **Yes**                                      | P14              |
| `/tickets/documents/recovery` | Yes                                          | P14              |
| `/hotels`                     | No                                           | P09              |
| `/hotels/:id`                 | No                                           | P09              |
| `/hotels/how-verified`        | No                                           | P09              |
| `/activities`                 | No                                           | ASSUMPTION       |
| `/itinerary`                  | Planner save = yes; **view/share link = no** | P04 + recipients |
| `/itinerary/share`            | No for recipients                            | P04              |
| `/airport`                    | No                                           | P12              |

---

## Journey stages → routes

Stages are time, not menu items.

### P09 — Hotels

| Stage           | In?    | Route                                                                     |
| --------------- | ------ | ------------------------------------------------------------------------- |
| 1–2             | Yes    | `/hotels` shortlist, empty, unpublished drop, `/hotels/:id`, how-verified |
| 3 Book          | **No** | Anti-HMW                                                                  |
| 4, 7 assistance | Later  | UNKNOWNS                                                                  |
| 5 chair photos  | Later  | Not `/airport`                                                            |
| 6               | No     | Inferred                                                                  |

### P14 — Tickets

| Stage      | In?                           | Route                         |
| ---------- | ----------------------------- | ----------------------------- |
| 1–4        | View flight on itinerary only | `/tickets` · `/itinerary`     |
| 5 pair     | Yes                           | Auth → `/tickets/documents`   |
| 7 recovery | Yes, ASSUMPTION               | `/tickets/documents/recovery` |
| Sell seat  | **No**                        | Market wall                   |

### P04 — Itinerary

| Stage         | In?    | Route                            |
| ------------- | ------ | -------------------------------- |
| 4             | Yes    | `/itinerary`, `/itinerary/share` |
| 7 attribution | Later  | UNKNOWNS                         |
| Collab editor | **No** | ART-039                          |

### P12 — Sequence

| Stage         | In?    | Route                                              |
| ------------- | ------ | -------------------------------------------------- |
| 2 + 4 + 5     | Yes    | `/airport` (docs-I-need, TSA link, passport, gate) |
| 3 agency book | **No** | Not Luma checkout                                  |

---

## Slice map

| Slice | Ships                                               |
| ----- | --------------------------------------------------- |
| 0     | Header (4 jobs + concierge + account) + Home        |
| 1     | Hotels P09 (no Book)                                |
| 2     | Tickets + auth + document pair + recovery           |
| 3     | Itinerary + share (recipients no account)           |
| 4     | `/airport` sequence + TSA link-out                  |
| 5     | Activities interiors (ASSUMPTION) + concierge jumps |

---

## Interaction grammar

- P09 success includes **dropping** an unpublished hotel.
- DocumentSet: two controls, one **leg**. Never print both as one action.
- Recipients of `/itinerary/share` never hit the account wall.
- Concierge may deep-link; it must not emit Book on Hotels.
- Keyboard: Header, concierge, labelled in-job Search, tiles, links.
