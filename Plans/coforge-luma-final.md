# Luma prototype — final plan

**Date:** 2026-09-18  
**Git:** `Coforge_skin` only  
**Figma:** `mnPFHuLUzXItWQimrWQEvV`  
**Status:** Define draft. Gate A unsigned. Synthetic corpus. ADR-024.

This executes [`prototype-agentic-1.md`](prototype-agentic-1.md). Skills, IA v2,
joined flow, and competitor bench are **done**. Slice 0–1 React HashRouter is in
`packages/themes/examples/coforge-skin/app`.

---

## What we are building

Operate-mode travel **shell**, not an OTA.

| Chrome     | Role                                                  | Goal (ART-034)                  |
| ---------- | ----------------------------------------------------- | ------------------------------- |
| Tickets    | Flight on itinerary; after **account**, document pair | P14 near-miss                   |
| Hotels     | Access shortlist + protocol                           | P09 gate — **no Book**          |
| Activities | ASSUMPTION: access-gated or itinerary stops           | Not a marketplace               |
| Itinerary  | Full trip; share URL/print                            | P04 — recipients **no account** |
| Concierge  | Header **global action** (horizontal)                 | Jump to a job; never Book       |
| `/airport` | Sequence (TSA link, passport, gate)                   | P12 — **not** a menu item       |

Canonical graph: `packages/themes/examples/coforge-skin/product/FLOWS.md`  
Use cases: `…/USE-CASES.md`  
IA: `…/IA.md`  
Competitor bench: `…/COMPETITOR-MODEL-BENCH.md`  
Visual close-out: canvases `luma-competitor-final-plan.canvas.tsx`

**Nobody profiled ships this combination.** Expedia-class products have the
**four verticals and sell**. TripIt captures without selling but does not serve
dependents. Wheel the World verifies **and books**. MyTSA owns security only.
Wanderlog is collab. Airline wallets do not fix the wrong **leg**.

---

## What we are not building

- Seat checkout, hotel Book, activity SKU Book
- Sitewide OTA search
- Concierge that plans/books for you
- Airport as fifth Header item
- Auth on hotel research or recipient itinerary
- P01–P03 and the other ten personas
- Later: assistance object, chair photos, group attribution

---

## Agents / skills

`coforge-product-architect` → `coforge-ux` → `coforge-ui` →
`coforge-screen-design` → `coforge-prototype` + `coforge-frontend`.  
Always: `coforge-skin-contract`, `coforge-skin-bench`.  
Ban: Figma Make, shadcn, `journey` as writer, `figma-generate-library`.

---

## Slice sequence

| Slice  | Do                                                                                                                        | Done when                                                |
| ------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **0**  | Header: 4 jobs + concierge + account. Home tiles. Figma + HashRouter stubs                                                | All four jobs + concierge clickable; airport not in menu |
| **1**  | Hotels P09: rebase existing frame `13184:2991` into shell; empty; unpublished drop; mainstream + specialist; how-verified | No Book; proto-spec `p09-access-gate.json` green         |
| **2**  | Tickets: itinerary flight (cold); auth; pair; block; recovery stub                                                        | Account only here; no checkout                           |
| **3**  | Itinerary + share; recipient URL without login                                                                            | Zero adoption                                            |
| **4**  | `/airport` from itinerary/tickets/concierge; TSA link-out                                                                 | No MyTSA clone                                           |
| **5**  | Activities interiors (after TASK) + concierge deep-links                                                                  | Still no marketplace Book                                |
| Gate A | Human                                                                                                                     | Do not self-approve                                      |

Surfaces: Figma reactions **and** React HashRouter from one proto-spec.

---

## Risks (leave visible)

| Risk                          | Mitigation                                        |
| ----------------------------- | ------------------------------------------------- |
| Menu looks like Expedia       | Ban Book/checkout in prototype-bench              |
| Concierge becomes the product | Panel only routes; no booking tools               |
| Auth at the airport desk      | Login is for **stored** passes, before travel day |
| Activities undefined          | Slice 5 blocked until TASK                        |
| P14 uncorroborated            | Recovery labelled ASSUMPTION                      |
| ART-012 coverage 6/14         | Do not cite unprofiled as current                 |

---

## Definition of done (interactive)

- Joined flow in Figma + React
- Every `forbidden_hotspots` absent
- Colour bench still Pass
- `product/VERIFY.md` Check · Result · Evidence
- Human Gate A
