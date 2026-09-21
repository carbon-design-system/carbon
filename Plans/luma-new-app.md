# Plan — new app (book Madrid → Kraków)

**Date:** 2026-09-18  
**Status:** Plan. Replaces the previous “cold trip / no Book” plan.  
**Stop line:** payment confirmation. **After booking** (documents, airport day,
share URL) is a **later app**, not this flow.  
**Carbon:** out. **Anti-HMW no-Book:** out for this test — this app **sells**.  
**Pattern:** Iberia / Kayak / eDreams search + booking funnel, plus a
**concierge agent on top**.

---

## What you asked for (locked)

1. You **land in an app** (home, not a named trip already in progress).
2. Hero is a **search**.
3. Search is **one component** with **tabs** that switch the form, like those
   sites: **Flights | Accommodations | Activities**.
4. Replicate that website grammar: from–to, dates, travellers, search, results,
   fare, extras, pay.
5. A **travel-agent concierge sits on top** so it is not a cold empty “Madrid to
   Kraków” page.
6. The flow runs **until the user books** that trip. Then stop.

## What the product is

An **OTA-style booker** with a persistent concierge.

| Layer     | Does                                                                                                            |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| **Store** | Kayak/Iberia/eDreams: tabbed search, results, checkout, **Book**                                                |
| **Agent** | Overlay: fill the form, explain a fare, suggest a stay or activity, push to pay. Does **not** replace the tabs. |

Default scenario to design against: **Madrid (MAD) → Kraków (KRK), 18–25 Sep, 8
travellers, return.**

## What this plan is not

| Out of this flow                                      | When                                                           |
| ----------------------------------------------------- | -------------------------------------------------------------- |
| Boarding-pass pair, airport sequence, recipient share | **After** confirmation — next app                              |
| Research-only hotels with no Book                     | Old Luma prototype; keep that code, do not mix into this Figma |
| Carbon UI Shell                                       | This test                                                      |
| Cars / Flight+Car                                     | Not requested; omit unless you add a fourth tab later          |

## Competitor grammar we copy (not invent)

| Site        | What we take                                                                                                                                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kayak**   | Home tabs switch **one** search panel (Flights / Hotels / …). Same chrome. Results + filters. Book.                                                        |
| **Iberia**  | Flight finder: round-trip, from/to, dates, passengers, fare class → compare → extras (bag, seat) → pay → email confirmation. Tabs also **Flight + Hotel**. |
| **eDreams** | Flights \| Hotels \| Flight+Hotel. Search → select → passenger names → extras (bag, insurance) → payment → booking email.                                  |

**Ours:** tabs = Flights \| Accommodations \| Activities (your list). Concierge
can switch the tab and fill fields.

## Work order

```
1  This plan
2  User flow until Book     → product/FLOWS-NEW-APP.md
3  Figma (later)            → land, tabbed search, three funnels, basket, pay, concierge overlay
4  After-booking app        → not started
```

## Success

A designer can wire: **Land → Flights tab → MAD–KRK 18–25 Sep ×8 → pick flights
→ add a stay → optional activity → passengers → pay → “You’re booked.”**
Concierge can do the same path by chat. Switching tabs never loses the trip
dates/party.

## Open (do not block the flow)

- Payment is **synthetic** (no real PSP).
- Inventory is **fake** (one IB-style return, one hotel, one activity).
- 8 names at passenger step: allow “fill from concierge” as a shortcut.
- Access protocol on the hotel: optional badge on the stay card, **Book still
  exists**.
