# Plan — high-fidelity agentic concierge (after source audit)

**Date:** 2026-09-18  
**Status:** Plan. Do not merge to `main` until Gate A + `new/` review.  
**Sources audited:** `~/Downloads/Finalize High Fidelity Web Prototype/` (Figma
Make export) + Carbon-DS CoForge overlay + `component-token-map.json`.  
**Build target:** `packages/themes/examples/coforge-skin/` (example app).
**Never** `packages/react/src/components`.

---

## 1. Audit — Figma Make source

### What it is

A complete **OTA booker** (React 19, Vite 8, Tailwind v4) named
`figma-make-app`. Screen machine:

`home → flight-results → basket → passengers → extras → payment → confirmation → itinerary`

Plus hotel-results and activity-results from home tabs or basket. Concierge
panel on every screen.

### What it already does well

| Area                 | Evidence                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Land + tabbed search | `HomeScreen.tsx` Flights / Accommodations / Activities                                     |
| MAD→KRK ×8 × dates   | `DEFAULT_SEARCH` in `App.tsx`                                                              |
| Mock inventory       | `src/data/flights.ts`, `hotels.ts`, `activities.ts`, `itinerary.ts`                        |
| Funnel through pay   | Basket → passengers → extras → payment → confirmation                                      |
| Post-book itinerary  | `ItineraryScreen.tsx` (this source includes “after booking”)                               |
| CoForge colour/type  | `index.css` + `src/imports/coforge-foundations.md` (Anek, Source Code Pro, bone/ink/coral) |

### Gaps (not high-fi agentic yet)

| Gap                                    | Evidence                                                                                                                  | Severity           |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **Concierge is not agentic**           | Keyword `AUTO_REPLIES`; only tool is `fillDemoSearch` (jumps to results). Chat cannot fill passengers, add hotel, or pay. | Blocker            |
| **Not the Carbon design system**       | Tailwind utilities + `cf-*` CSS + inline hex. Zero `@carbon/react`.                                                       | Blocker for merge  |
| **Forbidden prefix**                   | `cf-btn-primary`, `cf-card`, `cf-input` — `coforge-new-component` bans `cf-*`                                             | Blocker            |
| **Radius language fights IBM overlay** | Foundations 8/16/24px; Carbon overlay is 0-radius default. Make used 16px cards, 9999px pills, 8px buttons.               | Decide in UI skill |
| **Small coral primary**                | `cf-btn-primary-sm` coral fill — overlay: small primary = ink                                                             | Fix                |
| **Coral as small UI chrome**           | Airport codes `#f15b40` on inputs; coral tags as labels                                                                   | Fix                |
| **Hotel detail / seat map**            | Plan promised expand/detail + seat map; code is select-on-card / preference radios                                        | Medium             |
| **No `new/` packets**                  | All UI inlined in screens                                                                                                 | Blocker for merge  |
| **Cannot ship as-is to main**          | Figma Make plugins, `.figma/`, Tailwind — not a Carbon package                                                            | Process            |

### What we keep from the source (behaviour + copy + data)

BookingContext shape, mock flights/hotels/activities/itinerary, passenger demo
list, screen names, happy path, concierge _copy_ (tips), wordmark “luma”.

### What we throw away

Tailwind as the DS, `cf-*` classes, Figma Make Vite plugins, Unsplash as
required chrome (optional later), keyword-only chat.

---

## 2. Product decision (locked for this build)

High-fidelity **agentic concierge on a CoForge+Carbon booker**.

- **Store:** Kayak/Iberia tabs + Book through confirmation (from Make).
- **Agent:** tools that **mutate booking state** (search, select, fill pax,
  navigate). User still taps Pay.
- **After book:** itinerary screen **in** (Make already has it).
- **Anti-HMW no-Book:** **overridden** for this app only. Old research-only Luma
  stays in `app/` HashRouter; this is a **second example** `book/` (or replace
  `local/` — see files).

---

## 3. Shelf vs `new/` (disclose)

Query: `packages/themes/src/dtcg/coforge/component-token-map.json`. Compose
first. A `new/<Name>/` folder only when the **job** cannot be expressed by
mapped Carbon even when composed. Visuals follow overlay tokens (`--cds-*` /
`--coforge-*`), not Make’s Tailwind.

### Use from the shelf (do **not** invent)

| Carbon                                                                        | Job                                            |
| ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `Header`, `HeaderName`, `HeaderGlobalBar`, `HeaderGlobalAction`               | Chrome                                         |
| `ContentSwitcher`                                                             | Flights / Accommodations / Activities **tabs** |
| `Form`, `TextInput`, `Dropdown`, `DatePicker`, `RadioButton(Group)`, `Select` | Search fields + fare + extras                  |
| `Button` (lg coral primary; sm ink/ghost)                                     | Search, Book, Pay                              |
| `DataTable`                                                                   | Flight results                                 |
| `Tag`                                                                         | Best value, neighbourhood                      |
| `Accordion`                                                                   | Passenger 1–8                                  |
| `Checkbox`                                                                    | Bags                                           |
| `ProgressIndicator`                                                           | Funnel: Search → Trip → Passengers → Pay       |
| `InlineNotification`                                                          | Errors / empty                                 |
| `ContainedList`                                                               | Order summary lines                            |
| `Modal`                                                                       | Confirm pay (optional)                         |
| `Link`                                                                        | Add stay / skip extras                         |
| `AI Label`                                                                    | Mark concierge suggestions                     |
| `Tile`                                                                        | Simple fact cards                              |

### New components (folders under `packages/themes/examples/coforge-skin/new/`)

Each: `README.md`, `spec.json` (wraps + forbidden), `<Name>.jsx`. **Merge to
main only if approved.** Not published as `@carbon/react`.

| Folder               | Why the map is not enough                                                                                                                           | Wraps                                                                    | Forbidden inside                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| **`TripSearch`**     | One control: three payloads, shared dates/party, Kayak form-in-card. ContentSwitcher + Form is the guts; the **bound trip payload** is the product. | ContentSwitcher, Form, TextInput, DatePicker, Dropdown, Button           | `cf-*`, sitewide mega-search           |
| **`ConciergeAgent`** | Chat + **tools** + screen-aware tips. HeaderPanel/Switcher is a jump list, not an agent. Replaces Make `Concierge.tsx`.                             | HeaderGlobalAction, TextInput, Button, Tag, AI Label, InlineNotification | Autopay, hide tabs                     |
| **`StayOffer`**      | Photo + nightly/total + Book. ClickableTile has no media/price contract.                                                                            | Tile, Tag, Button, Link                                                  | Unverified “accessible” as colour-only |
| **`ActivityOffer`**  | Same gap for experiences.                                                                                                                           | Tile, Tag, Button                                                        | Marketplace SKU chrome beyond Book     |
| **`TripBasket`**     | Running OTA total, remove, “add stay/activity”. Not a DataTable.                                                                                    | ContainedList, Button, Link, Tag                                         | Hidden fees                            |
| **`FareCompare`**    | Two commercial products (Basic vs Flex) with included/excluded lists. RadioTile is close; still a product wrapper.                                  | RadioTile / Tile, Button, StructuredList                                 | Colour-only difference                 |
| **`TripTimeline`**   | Post-book day/time/place. ProgressIndicator is checkout, not a diary.                                                                               | ContainedList, Tag, Link                                                 | Fake live tracking                     |

**Not new (compose):** `PassengerRoster` = Accordion+Form; `PaymentFields` =
Form+TextInput+PasswordInput; `FunnelProgress` = ProgressIndicator.

### Retired / do not port as new

Old P2 folders `JobDoor`, `ResearchGate`, `DocumentPair`, `AirportSequence`,
`ItineraryShare` stay for the **research-only** app. Do not mix into the booker.

---

## 4. Agentic concierge (what “agentic” means here)

Mock tool-caller in the prototype (no live LLM required for v1; interface ready
to swap).

| Tool                                                    | Effect                              |
| ------------------------------------------------------- | ----------------------------------- |
| `fill_trip_search`                                      | MAD, KRK, 18–25 Sep, 8              |
| `search_flights` / `search_stays` / `search_activities` | Navigate + run search               |
| `select_best_value_flight`                              | Select tagged row + prompt return   |
| `add_stay` / `add_activity`                             | Id from mock data                   |
| `fill_passengers_demo`                                  | Same list as Make `DEMO_PASSENGERS` |
| `go_basket` / `go_payment`                              | Navigate                            |
| `explain`                                               | Copy only                           |

**Never:** `confirm_pay` without the Payment screen primary.

UI: `ConciergeAgent` shows tool chips when a tool ran (“Filled search”, “Added
Hotel Stary”).

---

## 5. Skills (who writes what)

| Skill                               | Role this task                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **`coforge-new-component`**         | Law for `new/`. **Patch required:** this product **may Book**; still no `cf-*`, no `packages/react/src`.            |
| **`coforge-ui`**                    | Tokens, coral lg only, 2x grid, no glass. Radius: overlay (IBM 0) unless a `new/` spec documents a local exception. |
| **`coforge-frontend`**              | Hash or screen-state app under `examples/coforge-skin/book/` (or `local/` successor). Carbon barrel.                |
| **`coforge-heuristics`**            | N1–N10 on funnel + agent. Anti-HMW #5 **N/A this app**.                                                             |
| **`coforge-prototype`**             | Proto-spec for book flow; bench click-through.                                                                      |
| **`prototype-build-figma-make`**    | **Source only** (audit). Do not write a second Make app in-repo.                                                    |
| **NEW `coforge-agentic-concierge`** | Tool list, when the agent may act, Pay lock. Short skill (~80 lines).                                               |

**Do not use as writers:** Vercel shadcn/react-best-practices, Impeccable
delight, `refine` glass, Figma Make as the production surface.

---

## 6. Agents

| Agent                                   | Use                                                                                                                                                      |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **This parent agent**                   | Port + `new/` + Vite; owns the working tree                                                                                                              |
| **`coforge-product-architect`**         | **Do not auto-run as written** — it bans Figma Make and P09 Book. After skill patch, it can own IA for the booker. Until then, parent follows this plan. |
| **`coforge-screen-designer`**           | Optional screen-specs for Figma Community later; not blocking code                                                                                       |
| **`explore` / `cavecrew-investigator`** | Locate Carbon DatePicker / DataTable / RadioTile APIs when implementing                                                                                  |
| **`impeccable-*`**                      | Off (wrong visual world)                                                                                                                                 |

No merge to `main` unless the user asks. `new/` is the review unit.

---

## 7. File plan

```
packages/themes/examples/coforge-skin/
  book/                    # Vite entry (from current local/ + Make behaviour)
    index.html, main.jsx, vite.config.js, styles.scss
  app-book/                # screens + BookingContext (ported, Carbon)
  new/TripSearch/
  new/ConciergeAgent/
  new/StayOffer/
  new/ActivityOffer/
  new/TripBasket/
  new/FareCompare/
  new/TripTimeline/
  product/flows/book-mad-krk.json
```

Data: copy Make `src/data/*` (no Unsplash required on first Carbon pass;
optional images behind Tile).

---

## 8. Build order (after this plan is accepted)

1. Patch `coforge-new-component` + add `coforge-agentic-concierge` skill.
2. Scaffold `book/` Vite on Carbon + CoForge Sass (reuse `local/` aliases).
3. Implement seven `new/` packets (spec + jsx).
4. Wire screens with shelf components + `new/`.
5. Concierge tools against BookingContext.
6. Browser: tabs, full pay path, agent fill_search + fill_passengers, no
   autopay.
7. Human Gate A. Then discuss merge of `new/` only.

---

## 9. Excellence bar (review)

- Bone page, ink type, coral **lg** primary only.
- Every field labelled.
- Empty / loading / payment error.
- Agent actions visible (chips), reversible except Pay.
- `new/` has README + spec.json + no `cf-*`.
- Make app remains the visual _reference_, not the merge candidate.
