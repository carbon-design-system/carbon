# Plan — iterate HF agentic concierge (Figma Section 1 + Make zip)

**Date:** 2026-09-19  
**Status:** Built in `book/` + `new/`. Do not merge `new/` to `main` until Gate
A.  
**Host:** `packages/themes/examples/coforge-skin/book/` (existing Carbon
booker). Never `packages/react/src`. Never `cf-*`.

---

## 0. Sources (audited)

| Source                                                                                                                                                         | What it is                                                               | Use                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------- |
| Figma [Agentic Design test — Claude](https://www.figma.com/design/ip2wZ3UUQ5sbFc3r902kYK/Agentic-Design-test---Claude?node-id=98-1275) **Section 1** `98:1275` | 16 iPhone frames: welcome → trip-complete, accessibility-first companion | **Interaction + object template** for after-book + agent tools |
| `product/prototype-build-figma-make.zip`                                                                                                                       | Skill 15: Make brief + prompt, not an app                                | **Source only.** Do not spawn a second Make app in-repo        |
| `Plans/luma-agentic-hf.md` + live `book/`                                                                                                                      | Carbon OTA + mock tools, MAD→KRK ×8, Pay lock                            | **Keep and iterate**                                           |
| Existing `new/` research packets                                                                                                                               | AirportSequence, AccessProtocol, DocumentPair, ItineraryShare            | **Reuse / extend** where the job matches                       |

### What we do **not** copy from Figma

- Fake iPhone chrome (status bar, home indicator, 390px device). This prototype
  stays **web + Carbon UI Shell**.
- Tailwind / 16px radius / Unsplash as DS.
- A second city lock that fights the live booker. Book funnel stays **MAD→KRK ·
  18–25 Sep 2026 · 8**. Figma **jobs** (airport sequence, wallet, assistance,
  guest share, access scores) map onto that trip. Lisbon/OPO copy is the
  **reference script**, rewritten to MAD/KRK + Hotel Stary unless a later tool
  `open_companion_lisbon` is approved.

---

## 1. Product decision (this iteration)

The booker is no longer “search → pay → thin itinerary.” After confirmation the
concierge **operates the trip**:

```
book funnel (keep)
  home → results → basket → passengers → extras → payment → confirmation
companion (add, Figma jobs on web)
  itinerary · documents · checklist · airport · assistance · share · access · close
```

- **Store** still Books and Pays. Concierge still **never** `confirm_pay`.
- **Companion** is unsigned Gate A research+operate on the **same** session.
  Anti-HMW “no Book on hotels” stays overridden **only** on `book/`.
- Header chrome: **Luma** + basket count + **Ask**. Companion screens add a
  **ContainedList or SideNav-in-content** of trip jobs (not a fourth IBM theme,
  not `cf-nav-rail`). Optional Header menu items: Trip · Documents · Airport —
  only if they stay Carbon `HeaderNavigation`.
- Persona for companion copy: the eight booked travellers (María lead). Not a
  new Halina account wall.

---

## 2. Shelf vs `new/` (disclose)

Carbon first. A folder exists only when the **job** cannot be composed from the
map.

### Shelf — do not invent

| Carbon                                               | Figma job                                                                           |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Header, HeaderName, HeaderGlobalBar, HeaderPanel     | Chrome + Ask                                                                        |
| ContentSwitcher                                      | Flights / Stays / Activities; Share View only / Can suggest                         |
| Form, ComboBox, DatePicker, Select, RadioButtonGroup | Search (already in)                                                                 |
| DataTable                                            | Flights                                                                             |
| Accordion + Checkbox                                 | Checklist 66%                                                                       |
| ProgressIndicator                                    | Funnel Search→Trip→Pax→Pay **and** airport “step 2 of 5” track (not the step cards) |
| ContainedList                                        | Wallet supporting docs, order lines                                                 |
| Tag                                                  | Access A+, CURRENT, GUEST MODE, Verified                                            |
| Tile, Link, Button lg                                | Cards, CTAs                                                                         |
| InlineNotification                                   | Assistance reassurance, errors                                                      |
| StructuredList                                       | Facility rows (entrance / restrooms)                                                |
| AILabel                                              | Concierge-suggested access score                                                    |

### Reuse existing `new/` (iterate in place — same folder names)

| Folder                                                   | Figma screens it now carries         | Change                                                                                          |
| -------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| **TripSearch**                                           | —                                    | Keep ComboBox + stay DatePicker                                                                 |
| **ConciergeAgent**                                       | Ask on every screen                  | New tools (below). Still no Pay                                                                 |
| **StayOffer / ActivityOffer / TripBasket / FareCompare** | Book funnel                          | Keep                                                                                            |
| **TripTimeline**                                         | planner, at-destination diary        | Add time + access Tag on items                                                                  |
| **AirportSequence**                                      | airport-guide                        | Bind 5 physical steps + CURRENT tag; wrap ProgressIndicator for 40%                             |
| **AccessProtocol**                                       | detail report + accessibility-detail | Scores, verified, facilities, sources. **Still forbids live assistance**                        |
| **DocumentPair**                                         | wallet + booking passes              | Two boarding-pass tiles + EHIC line. Still no print-both                                        |
| **ItineraryShare**                                       | share-plan                           | Add ContentSwitcher View only / Can suggest + member list. Recipients still need **no account** |

### New folders (only these)

| Folder                | Why the map + reuse fail                                                                                                                                                   | Wraps                                                             | Forbidden                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------- |
| **`AssistanceTrack`** | Figma assistance is a **request→gate timeline** with airline/airport states. `AccessProtocol` **forbids** `assistance-live`. ProgressIndicator is checkout, not a liaison. | ContainedList or OrderedList, Tag, Tile, InlineNotification, Link | Auto-dispatch, fake live GPS, confirm_pay |
| **`GroupTrip`**       | Guest / read-only roster + “joining” dots is not TripTimeline (diary) and not ItineraryShare (invite).                                                                     | Tile, Tag, Stack, Link                                            | Force-account, edit-in-guest-mode         |

**Not new (compose on screens):**

- Welcome / Get Started → existing Home hero + Tag `trip planner`
- Local map + 112 → Tile + labeled placeholder + Link (no map SDK)
- Trip complete stats + emoji row → Tile + Button + Tag
- Checklist → Accordion + Checkbox + ProgressIndicator

---

## 3. Agentic tools (patch `coforge-agentic-concierge`)

Keep existing book tools. Add companion tools. Still **no** `confirm_pay`.

| Tool                                                      | Effect                               | Screens                  |
| --------------------------------------------------------- | ------------------------------------ | ------------------------ |
| _(existing)_ `fill_trip_search` … `go_payment`, `explain` | Unchanged                            |                          |
| `open_itinerary`                                          | After confirm, go diary              | confirmation, any booked |
| `open_documents`                                          | Wallet / DocumentPair                | booked                   |
| `open_checklist`                                          | Accordion checklist                  | booked                   |
| `open_airport`                                            | AirportSequence + step 2 CURRENT     | booked                   |
| `advance_airport_step`                                    | Next physical step (not Pay)         | airport                  |
| `open_assistance`                                         | AssistanceTrack                      | booked                   |
| `explain_access`                                          | AccessProtocol for KRK / Hotel Stary | any                      |
| `share_plan`                                              | ItineraryShare view-only link        | booked                   |
| `open_group`                                              | GroupTrip read-only                  | booked                   |
| `close_trip`                                              | Trip-complete compose                | booked                   |

Chips stay visible. Undo = Back / uncheck / remove — except Pay and confirmed
booking.

---

## 4. Screens to add (web, Carbon)

All under `app-book/screens/`. Hash or screen-state, same `BookingApp` machine.

| Screen id    | Figma twin           | Composition          |
| ------------ | -------------------- | -------------------- |
| `documents`  | wallet               | DocumentPair         |
| `checklist`  | checklist            | Accordion + Checkbox |
| `airport`    | airport-guide        | AirportSequence      |
| `assistance` | assistance           | **AssistanceTrack**  |
| `share`      | share                | ItineraryShare       |
| `group`      | group-trip           | **GroupTrip**        |
| `access`     | accessibility-detail | AccessProtocol       |
| `close`      | trip-complete        | compose Tile/Button  |

Itinerary screen stays; it becomes the hub that links these jobs.

Flow file: `product/flows/book-companion-krk.json`.

---

## 5. Skills (who writes what)

| Skill                            | This iteration                                                           |
| -------------------------------- | ------------------------------------------------------------------------ |
| **`coforge-new-component`**      | Law for the two new folders. Booker may Book; no `cf-*`                  |
| **`coforge-agentic-concierge`**  | **Patch** tool table with companion tools + Pay lock                     |
| **`coforge-ui`**                 | Bone/ink, coral **lg** only, 0-radius overlay, no glass                  |
| **`coforge-frontend`**           | `book/` Vite 5182, carbon.js barrel only                                 |
| **`coforge-heuristics`**         | N1 airport CURRENT; N2 sequence ≠ wizard; N6 outbound vs return          |
| **`coforge-prototype`**          | proto-spec + validate-proto.py on `book-companion-krk.json`              |
| **`coforge-ux`**                 | Companion slice on `book/` only. Do not rewrite research `IA.md` to Book |
| **`coforge-screen-design`**      | Optional screen-specs after code                                         |
| **`prototype-build-figma-make`** | Audit / brief history **only**. Do not Make again                        |
| **Figma `figma-design-to-code`** | Already used to read Section 1. Re-fetch a node only if a screen stalls  |

**Do not write with:** Vercel shadcn, Impeccable delight, `refine` glass, Figma
Make as the merge surface.

---

## 6. Agents

| Agent                                   | Use                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| **This parent**                         | Owns the tree: `new/` packets, screens, tools, Vite, browser verify             |
| **`coforge-product-architect`**         | Do **not** auto-run as written (bans Make + P09 Book). Parent follows this plan |
| **`coforge-screen-designer`**           | After code, if we hand frames to Community `mnPFHuLUzXItWQimrWQEvV`             |
| **`explore` / `cavecrew-investigator`** | Carbon Accordion/Checkbox/StructuredList APIs                                   |
| **`impeccable-*`**                      | Off                                                                             |

No commit or `main` merge unless asked. Review unit = the two new folders +
iterated packets.

---

## 7. Build order (after accept)

1. Patch `coforge-agentic-concierge` tool table.
2. `AssistanceTrack` + `GroupTrip` packets (`README.md`, `spec.json`, jsx).
3. Iterate AirportSequence, AccessProtocol, DocumentPair, ItineraryShare,
   TripTimeline to Figma jobs / KRK copy.
4. Add companion screens + itinerary hub links.
5. Wire tools; chips; no autopay.
6. Browser: book MAD→KRK through Pay, then airport CURRENT, assistance timeline,
   share view-only, guest group.
7. `validate-proto.py` on the new flow. Human Gate A.

---

## 8. Excellence bar

- Same CoForge overlay as the live booker.
- Every field and every airport step labelled.
- Access scores cite a source line (N10).
- Guest mode cannot edit.
- Concierge actions have chips and are reversible except Pay / confirmed book.
- No iOS device frame. No `cf-*`. No new files in `packages/react/src`.
