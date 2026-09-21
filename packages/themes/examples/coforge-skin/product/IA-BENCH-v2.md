# IA v2 bench — tickets / hotels / activities / itinerary / concierge

**Date:** 2026-09-18  
**Trigger:** Stakeholder: not “Venues”; tickets (airplane for now), activities,
hotels; full itinerary + agentic support; travel concierge is a **horizontal
layer**; `/documents` requires an account.  
**Skills:** `coforge-ux`, RAG ART-030/034/035/038/039, ART-012 market findings
(via ART-039), `anti-hmw.md`.  
**This is a bench, not a Figma build.** Previous Header (Venues · Documents ·
Plan · Airport) is **superseded as labels** if v2 is accepted; HMW tests stay.

Pain → ART-030. Opportunity → ART-039. Stakeholder chrome → **ASSUMPTION** until
Gate A.

---

## Claim-by-claim

| Stakeholder claim                      | RAG                                                                                                                                                                                                                                           | Verdict                                   | Product test if we adopt                                                                                                                                                               |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rename Venues → **Hotels**             | P09 actions are hotel room, bathroom, entrance, hoist cm. “Venue” was our IA word.                                                                                                                                                            | **Pass as rename**                        | Same P09 gate. **No Book / hold / pay** on Hotels (finding #5)                                                                                                                         |
| **Tickets** (airplane first)           | P14 books flights himself; P12 books via agency. Market findings: selling transport tickets is a **deliberate wall**, not white space. Boarding-pass **pair** is the HMW (travel day).                                                        | **Pass as object, fail as OTA store**     | Tickets = flight **on the itinerary** + (after auth) **document pair**. Do not sell the seat in this prototype                                                                         |
| **Activities** as a Header job         | No ART-034 HMW. Destination activities + “cluster to cut walking” is a family routing need, not aggregation. Finding #2: do not make destination-arrival the primary job. P09 “venues” can include attractions **if** access protocol applies | **Conditional**                           | Activities = access-gated places **or** itinerary line items. **Not** an experiences marketplace with Book                                                                             |
| **Full itinerary**                     | P04 evidenced. Confirmations forwarded to an aggregator **because it does not own the booking** (ART-030 personas).                                                                                                                           | **Pass**                                  | `/itinerary` replaces `/plan`. Recipients still **zero adoption**                                                                                                                      |
| **Agentic support / travel concierge** | Conversational & AI cluster exists in ART-012; Tripadvisor-style AI planner is commoditising. Finding #6: not one app for everything. P09 needs Access Lead / protocol, not a bot that books. P12 needs sequence, not “help me book”          | **Pass as layer, fail as fifth mega-job** | Concierge = Carbon `cds-header-global-action` + panel. It **routes into** Hotels / Tickets / Itinerary / sequence. It does **not** complete Book for P09 or replace the agency for P12 |
| Concierge is **horizontal**            | Matches UI Shell (global action), not `cf-nav-rail`, not a Header menu item                                                                                                                                                                   | **Pass**                                  | Always present. Not a destination in the menu                                                                                                                                          |
| **Documents require an account**       | P14 failure is at the airport under time pressure. P04 recipients must not create accounts. P12 explainer is **pre-booking**                                                                                                                  | **Split**                                 | Account **yes** for _stored_ boarding passes / planner itinerary. Account **no** for: hotel access research, recipient itinerary URL, airport sequence, concierge _first question_     |
| Cold start (previous fork)             | Overturned by this instruction for documents only                                                                                                                                                                                             | **Revise, don’t global-auth**             | Home still cold. Auth wall only on `/tickets/documents` (and saved planner itinerary)                                                                                                  |

---

## Anti-HMW if v2 is built naively

| Finding              | Naive v2                                                        | Required shape                                                                            |
| -------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| #5 P09               | Hotels + Book                                                   | Hotels = research/protocol only                                                           |
| #6 one app           | Tickets + hotels + activities + itinerary + AI that does it all | Jobs stay separate; concierge is a layer; no sitewide OTA search                          |
| #4 near-miss         | Account wall on the commitment moment                           | Documents already in session after check-in; login **before** travel day, not at the desk |
| #3 P12               | Concierge “simplifies booking”                                  | Sequence stays primary content; concierge may open `/airport`                             |
| #1 planning pleasure | Agentic “I’ll plan it for you”                                  | Concierge does not take planning off Reuben; it **distributes** the plan                  |
| Sell tickets         | Tickets menu = checkout                                         | Out of prototype (market wall + P12 agency + P14 independence)                            |

---

## Proposed chrome (if you accept the bench)

**Header menu (vertical jobs):** Tickets · Hotels · Activities · Itinerary

**Header global (horizontal):** Concierge (agentic) · Account

**Not in the menu:** Documents, Airport, Venues, Plan (renamed into the above).

| Menu       | Owns                                                                                                               | Persona                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Tickets    | Flight on itinerary; after account: outbound vs return pair; recovery                                              | P14                                                                        |
| Hotels     | Access shortlist, protocol, how-verified; no Book                                                                  | P09                                                                        |
| Activities | ASSUMPTION: access-gated activity **or** itinerary stops — same no-Book rule as Hotels until a TASK says otherwise | —                                                                          |
| Itinerary  | Full trip, share URL/print, recipients without login                                                               | P04                                                                        |
| Concierge  | Cross-cutting: jump to a job, explain a step, never Book for P09                                                   | All                                                                        |
| `/airport` | Sequence (TSA link, passport, gate)                                                                                | P12 — open from Itinerary / Tickets / Concierge, **not** a fifth menu item |

---

## Session

```
Cold → Home
  → Hotels, Activities (research), Itinerary (recipient link), Airport sequence, Concierge ask
Auth → Tickets / documents, planner’s saved itinerary, concierge memory (ASSUMPTION)
```

---

## Objects (ORCA stub v2)

| Object          | Account                                               | Book CTA                              |
| --------------- | ----------------------------------------------------- | ------------------------------------- |
| Hotel           | No                                                    | Forbidden                             |
| Activity        | No                                                    | Forbidden until TASK                  |
| Flight          | No to view on itinerary; Yes to stored tickets/passes | Forbidden in prototype                |
| DocumentSet     | Yes                                                   | N/A — confirm/print this **leg** only |
| Itinerary       | Planner yes to edit/save; recipient **no**            | N/A                                   |
| AirportSequence | No                                                    | N/A                                   |
| ConciergeThread | Optional                                              | Must not emit Book for P09            |

---

## What we will not do without a new TASK

- Sell airplane seats or activity SKUs
- Sitewide search across tickets+hotels+activities
- Force login to read hotel access facts
- Force login on the recipient itinerary
- Concierge as the only UI (no Header jobs)
- Keep the old labels Venues / Documents / Plan / Airport as the **menu** if v2
  is accepted

Human: accept v2 chrome, or keep v1 labels. Gate A still unsigned.
