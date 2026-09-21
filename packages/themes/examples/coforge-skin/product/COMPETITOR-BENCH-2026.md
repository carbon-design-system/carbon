# Competitor bench — travel concierge, 2026 (fresh)

**Question:** Who already walks a traveler from spark → research → plan → share
→ documents → airport → stay → return, and where is Luma allowed to exist
without becoming an OTA?

**This pass:** live web, Sep 2026. Not ART-011’s original six-only list.  
**Ceiling:** marketing pages and third-party roundups, not logged-in
walkthroughs. Label **ASSUMPTION** where the site does not prove a flow.  
**Gate A:** unsigned. No user quotes.

---

## How the market is split (2026)

Four product species. Luma is none of them, and must not become a blend of all
four.

| Species                      | What they sell                    | Typical CTA                                                    | 2026 examples                                                            |
| ---------------------------- | --------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **OTA / mega-funnel**        | Inventory                         | Book / Checkout                                                | Expedia + Romie, Booking.com AI, Tripadvisor AI Trips, Kayak, Skyscanner |
| **AI trip agent**            | Plan → partner booking            | Generate itinerary → Book via Priceline / Skyscanner / Booking | Mindtrip, Layla, Ribbit, Wonderplan, ChatGPT + Expedia                   |
| **Capture / collab planner** | Organise what you already booked  | Forward email / edit together                                  | TripIt, Wanderlog, MonkeyTravel, Stardrift                               |
| **Travel-day specialist**    | One seam of the day               | Track / wait / PreCheck                                        | Flighty, App in the Air, MyTSA, CBP Mobile Passport Control, FlightQueue |
| **Verified-access OTA**      | Accessible inventory **and** Book | Book verified room                                             | Wheel the World, accessibleGO                                            |

**Finding:** the 2026 “concierge” wave (Mindtrip, Layla, Romie, GuideGeek) is
**plan-and-book** or **chat-as-store**. Capture apps (TripIt, Wanderlog) own the
**itinerary object** but not access protocol, not wrong-leg documents, not the
airport as a sequence of places. Access specialists **book**. Nobody in this set
combines: hotel **research without Book** + boarding-pass **pair** +
**zero-account share** + **physical airport sequence** + concierge as **router,
not agent**.

---

## Fresh set (must cite; do not treat as “everyone”)

### A. AI concierges (new since prior ART pass)

| Product                                        | End-to-end claim                                                     | Hotels                  | Flights                                                                  | Activities       | Itinerary                       | Concierge                      | Travel day               | Collision with Luma                                   |
| ---------------------------------------------- | -------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------ | ---------------- | ------------------------------- | ------------------------------ | ------------------------ | ----------------------------------------------------- |
| **Mindtrip**                                   | Chat → POIs → group trip → book via Priceline / Viator / Tripadvisor | Book via partners       | In-chat checkout reported 2026 (Sabre/PayPal) — **ASSUMPTION** on modify | Viator           | Collaborative plan + group chat | The product **is** the agent   | Weak                     | Anti-model: one-stop shop                             |
| **Layla**                                      | AI + optional **human expert** plan/book/manage                      | Live Booking.com prices | Skyscanner live prices                                                   | In itinerary     | Day-by-day                      | Agent + human backup           | Weak                     | “I’ll plan and book it for you” — anti P04 / anti P09 |
| **Expedia Romie**                              | iMessage / WhatsApp concierge inside Expedia                         | Search + book           | Book                                                                     | Book             | Group chat itinerary            | Disruption hotels after cancel | Disruption, not sequence | Same doors, Book is the product                       |
| **Tripadvisor AI / GuideGeek**                 | Review-backed plan; GuideGeek on WhatsApp / IG / Messenger, no app   | Rank / book             | Weak                                                                     | Experiences Book | Pre-filled days                 | Messaging concierge            | Recs, not airport        | Concierge-as-planner                                  |
| **Google Gemini + Travel**                     | Gmail / Maps / Flights / Hotels                                      | Compare                 | Compare                                                                  | —                | Weak                            | Chat in Google                 | Maps at airport          | Compare, not protocol                                 |
| **Wonderplan / Ribbit / iPlan / MonkeyTravel** | Fast day-by-day draft                                                | No or thin              | No or thin                                                               | Ideas            | Core                            | Prompt → plan                  | No                       | Fine for spark; they do not own documents or access   |
| **Zenvoya** (vendor roundup)                   | Claims own booking + modify in-chat                                  | Book                    | Book                                                                     | Book             | Chat                            | Agent                          | —                        | Do not copy; OTA in a thread                          |

### B. Capture and group plan

| Product                      | Strength                                            | Gap vs Luma                                                                     |
| ---------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- |
| **TripIt** (SAP Concur)      | Inbox parse; Pro alerts; share                      | Auth-shaped; not view-only zero-adoption; no access protocol; no wrong-leg pair |
| **Wanderlog**                | Map days, budget, **collab edit**, Pro Gmail scan   | Collab editor = anti P04; alerts weaker than TripIt/Flighty                     |
| **MonkeyTravel / Stardrift** | Group voting / business AI around existing bookings | Consensus tools, not protocol or documents                                      |

### C. Travel day

| Product                         | Owns                                      | Does not own                                     |
| ------------------------------- | ----------------------------------------- | ------------------------------------------------ |
| **Flighty** (iOS)               | Delay prediction, aircraft, gate          | Hotels, pair confusion, immigration              |
| **App in the Air**              | Cross-platform flight + some airport info | Sequence as product                              |
| **MyTSA**                       | US **checkpoint** items, waits, PreCheck  | Passport control, immigration, gate after border |
| **CBP Mobile Passport Control** | US entry inspection receipt               | Not MAD→KRK outbound; not “which pass today”     |
| **FlightQueue**                 | Queues incl. immigration worldwide (paid) | Not Luma’s document pair; not access hotels      |

### D. Access (closest on hotels, opposite CTA)

| Product                      | Strength                                                                            | Must leave behind                                |
| ---------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Wheel the World**          | 200+ measured criteria, photos, profile match, tours + transport                    | **Book** + 24/7 inclusive-travel ops             |
| **accessibleGO**             | US hotels + staff **confirm with hotel after Book**; cars, vans, flights, equipment | Book + advocacy ops we do not have               |
| **Sociability**              | Community access for social venues (UK)                                             | Not hotels protocol; not itinerary               |
| **Booking.com a11y filters** | 18 self-report filters                                                              | Self-report ≠ protocol; Book remains the product |

### E. Classic OTA (still the gravity well)

Expedia, Booking, Kayak, Skyscanner: Tickets · Hotels · Activities · Trips.
Horizontal search. **Book** on every card. Copying this IA without copying Book
is the design.

---

## Journey coverage (who owns which hour)

| Trip hour                       | Market owner 2026                                  | Luma                                                      |
| ------------------------------- | -------------------------------------------------- | --------------------------------------------------------- |
| Spark / “where should we go”    | Mindtrip, Layla, GuideGeek, Gemini                 | **Out** of this Figma file (anti: remove planning stress) |
| Hotel **can I physically stay** | WtW / accessibleGO **after** Book; Booking filters | **In** — protocol on the card, drop unpublished = success |
| Flight **buy**                  | OTA / Layla / Mindtrip                             | **Out** — flight already on itinerary                     |
| Group plan in one head          | Wanderlog collab, Mindtrip group chat              | **In** — share URL, recipients **no account**             |
| Which boarding pass today       | Airline app / Wallet (scan-fail, not wrong-leg)    | **In** — spatial pair, wrong blocked                      |
| Checkpoint                      | MyTSA                                              | **Link-out**                                              |
| Passport vs security vs gate    | Split across MyTSA / CBP / airline                 | **In** — one sequence of **places**                       |
| Stay / activities day-of        | OTA + Google Maps                                  | Protocol still readable; activities as itinerary lines    |
| Disruption rebook               | Romie, TripIt Pro, Flighty                         | Concierge **routes**; does not Book                       |
| Wrong-leg charge                | Nobody evidenced                                   | Recovery **ASSUMPTION** stub                              |

---

## What Figma must not clone

1. Price-first hotel cards with Book.
2. Chat that emits a booked hotel for the user.
3. Collaborative editors (Wanderlog-class).
4. Progress-bar airport “checkout”.
5. “Simplified for older travelers” document UI.
6. Sitewide search across all jobs.
7. Forcing the other seven to install an app.

## What Figma must steal as **depth**, not CTA

- Wheel the World: measurements and photos **on the result**.
- accessibleGO: “confirm with the property” as **how-verified** content, not as
  our ops.
- TripIt: itinerary is the spine of the trip.
- Flighty: travel day is a first-class surface (we use **places**, not delay
  graphs).
- GuideGeek: concierge lives in a **layer** (messages), not a fifth menu tab —
  we keep the layer, change the job (route, don’t plan-for-you).
