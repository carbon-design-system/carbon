# Prototype 1 audit — depth for Prototype 2

**Date:** 2026-09-18  
**Git:** `Coforge_skin`  
**Live:** Storybook `CoForge / Luma prototype / App`  
**P1 plan:** `Plans/prototype-agentic-1.md`  
**Skills:** `coforge-heuristics`, `coforge-new-component`, `coforge-ux`,
`coforge-ui`

P1 proved the **graph is clickable**. It did not prove the graph is **usable or
desirable**. P2 is depth: stage patterns, Carbon capability vs gap, new wrappers
only under `new/`.

---

## What P1 actually ships

| Stage     | Route         | Carbon used                                      | Flow pattern attempted | Honest P1 quality                                                                                                              |
| --------- | ------------- | ------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Shell     | `/`           | Header, ClickableTile                            | Hub-and-spoke          | Jobs exist; tiles still **read as OTA product cards**                                                                          |
| Concierge | panel         | HeaderGlobalAction, Switcher                     | Horizontal layer       | Routes work; Switcher is **IBM app-switcher**, not a concierge                                                                 |
| P09       | `/hotels`     | Search, Tile, Tag, Link, ghost Button            | Research gate          | Search/empty/drop/protocol exist; drop does not persist; “Krakow” is a magic query; protocol is a **list**, not dual inventory |
| P14       | `/tickets`    | ClickableTile, Form, Button lg, Radio, two Tiles | Commitment / near-miss | Auth is one button; **selection is split** (tiles vs radios); recovery is a notice                                             |
| P04       | `/itinerary`  | Tile, OrderedList, Button                        | Broadcast share        | “Share URL” is an **in-app route**, not a URL the other seven can copy                                                         |
| P12       | `/airport`    | ProgressIndicator                                | Physical sequence      | Looks like a **checkout wizard** (N2 fail)                                                                                     |
| ACT       | `/activities` | Tile, Tag                                        | ASSUMPTION list        | One dead tile; no itinerary join                                                                                               |

Anti-HMW still held: no Book, no sell, no airport menu item. That is the floor,
not the product.

---

## Stage × use case × flow pattern (depth)

Pattern names are UX, not OTA funnels.

| Stage         | Use cases       | Market pattern we **refuse**                        | Pattern we **keep**                        | P2 depth to add                                                                                         |
| ------------- | --------------- | --------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Shell         | UC-SHELL-1–3    | Expedia four verticals + Book                       | Four **jobs**, return Home                 | Job doors state what the job **does not** do                                                            |
| Concierge     | UC-CONC-1       | Tripadvisor AI planner                              | Router into jobs                           | Layer copy + no Book affordance; airport as sequence not a fifth menu                                   |
| Auth          | UC-ACCT-1       | Auth wall on **all** saved trips (6/6 ART-012)      | Auth **only** stored documents             | Real Form fields (email) still fake IdP; never on hotels or recipient share                             |
| P09 research  | UC-P09-1–4      | Booking.com filters + Book; WtW verify **and book** | Dual inventory, drop unpublished = success | Persistent drop; empty not magic string; protocol as measured facts; how-verified stays protocol (W-01) |
| P09 out/later | UC-P09-5, 6/7/9 | —                                                   | Out Book; Later assist                     | Visible **absence** of Book (not a disabled button that begs a click)                                   |
| P14 near-miss | UC-P14-0–3      | Wallet = scan-fail fix; airline app                 | Spatial pair after auth                    | One control: two **documents**; wrong blocked in place; confirm outbound                                |
| P14 out       | UC-P14-SELL     | OTA checkout                                        | No sell                                    | No fare, no cart                                                                                        |
| P04           | UC-P04-1–3      | Wanderlog collab editors                            | Zero-adoption share                        | Copyable link + print; recipient view without account chrome pressure                                   |
| P12           | UC-P12-1–5      | MyTSA checkpoint-only; ProgressIndicator-as-pay     | End-to-end seam                            | Sequence object, not step-wizard; TSA link-out; passport ≠ immigration                                  |
| P12 out       | UC-P12-6        | Agency book                                         | Out                                        | —                                                                                                       |
| Activities    | UC-ACT-1        | Tripadvisor Experiences Book                        | ASSUMPTION stops                           | Access tag or itinerary line; still no SKU                                                              |

---

## Carbon capability bench (form + behaviour)

| Job            | Carbon can already               | Carbon **cannot** (capability gap)                                                                            | P2 `new/` wrapper                            |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Find hotels    | `Search` labelled, `Tile`, `Tag` | Result as **research gate** (drop = success, no Book slot)                                                    | `ResearchGate`                               |
| Dual inventory | Two `ClickableTile`s             | Mainstream vs specialist as **one protocol object** with measures                                             | `AccessProtocol`                             |
| Sign in        | `Form`, `TextInput`, `Button` lg | —                                                                                                             | **No new folder** — use Carbon Form properly |
| Document pair  | `RadioButtonGroup`               | Radios are **one column of equal choices**; near-miss needs position, size, label, confirmation (anti-HMW #4) | `DocumentPair`                               |
| Share plan     | `Button` + `Link`                | No share/copy primitive; Button-as-href is not a URL                                                          | `ItineraryShare`                             |
| Airport        | `ProgressIndicator`              | ProgressIndicator = **task completion toward a goal** (usually pay). Wrong metaphor                           | `AirportSequence`                            |
| Concierge      | `HeaderPanel` + `Switcher`       | Switcher = **product switch**, not “route me into a job”                                                      | `ConciergeLayer`                             |
| Home jobs      | `ClickableTile`                  | Tile default is **commerce card**                                                                             | `JobDoor`                                    |
| Empty / error  | `InlineNotification`             | Adequate if copy is specific                                                                                  | No new folder                                |

---

## Heuristics (Nielsen) on P1 — failures that drive P2

| Screen       | Worst misses | Why it feels cheap                                                                     |
| ------------ | ------------ | -------------------------------------------------------------------------------------- |
| Home         | N2, N8       | Four tiles could be Expedia. No anti-promise.                                          |
| Hotels       | N1, N5, N6   | Magic search; drop vanishes from memory; measures buried in paragraph                  |
| Tickets pair | N2, N5, N6   | User must bind tiles **and** radios; colour/order help exists but control is the radio |
| Itinerary    | N2, N7       | Share does not produce a shareable artifact                                            |
| Airport      | N2, N8       | Progress steps look like “complete booking”                                            |
| Concierge    | N2, N4       | IBM switcher list                                                                      |
| Activities   | N8, N6       | Placeholder, not a stop on a trip                                                      |

P1 **passes** N5 on Book (absent) and N4 on Header landmarks.

---

## Visual / UX direction for P2 (Operate)

- Bone page, ink type, coral **only** on lg primary that is **not** Book (Sign
  in, Confirm this leg, Copy link).
- Unpublished: outline Tag + ghost **Drop** — never a greyed Book.
- Document pair: outbound **first and larger**; return second, heading “Do not
  present until 25 Sep”.
- Airport: numbered **places in the building**, not a progress bar of a
  purchase.
- Concierge: short verbs (Check hotel access, Open the right pass, Walk the
  airport).
- Recipient itinerary: still Header jobs, **no** sign-in modal.

---

## Out of P2 (still)

Assistance live, chair photos, group attribution, real IdP, Figma reactions if
time-boxed after React, eight unprofiled competitors as “coverage”.
