# Competitor model bench — who already has this chrome

**Question:** Does anyone ship Tickets + Hotels + Activities + Itinerary + a
horizontal concierge, with documents behind account, **without** becoming an
OTA?

**Sources only:** ART-011/012 (six of fourteen profiled), ART-039 (W-01–W-07).
No live walkthrough this session. Gate A unsigned. “Everyone” never means the
market.

Coverage ceiling: 6 profiled, 8 never profiled, 141/330 feature cells Unknown.
Travel-day 63% Unknown. `Evidenced [ART-012 / ART-011]`.

---

## Chrome vs our jobs

| Competitor                                                     | Flights/tickets                   | Hotels                                    | Activities  | Itinerary                                                        | AI / concierge                               | Documents / travel day            | Our collision                                                |
| -------------------------------------------------------------- | --------------------------------- | ----------------------------------------- | ----------- | ---------------------------------------------------------------- | -------------------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| Expedia                                                        | Sells                             | Sells                                     | Sells       | Saved trips, usually **auth**                                    | Not a horizontal Operate layer               | Weak / app                        | **OTA model** — same doors, opposite CTAs (Book)             |
| Booking.com                                                    | Partial                           | Sells + 18 a11y **filters** (self-report) | Attractions | —                                                                | —                                            | —                                 | Hotels **inventory**, not protocol; Book is the product      |
| Google Travel                                                  | Compare                           | Compare                                   | —           | —                                                                | —                                            | —                                 | Compare, not access gate; emissions sort only non-price axis |
| TripIt                                                         | Capture, **does not own booking** | Capture                                   | —           | Forwarded confirmations                                          | —                                            | Auth-walled prepare               | Closest to finding #6 — **capture not share-to-dependents**  |
| Hopper                                                         | Sells (results unread this run)   | —                                         | —           | —                                                                | Onboarding psych — study **refused** “works” | —                                 | Do not copy                                                  |
| Tripadvisor                                                    | —                                 | Ranked                                    | Experiences | AI planner pre-populated                                         | AI = commoditising                           | —                                 | Concierge-as-planner — **anti** P04/P09                      |
| Wheel the World / AccessibleGO                                 | —                                 | **Verified** rooms + **book**             | —           | —                                                                | —                                            | —                                 | Take verification depth; **leave Book**                      |
| Sociability protocol (W-01)                                    | —                                 | Phone/Access Lead checklist               | —           | —                                                                | —                                            | —                                 | Content of `/hotels/how-verified`, not a product             |
| Wanderlog, TripIt, Stippl, Travefy, Plan Harmony, Family Trips | —                                 | —                                         | In-plan     | **Collab editors**; Wanderlog page does not name view-only share | —                                            | Account                           | Opposite of P04 zero-adoption                                |
| MyTSA                                                          | —                                 | —                                         | —           | —                                                                | —                                            | Security checkpoint only          | Link-out; we own passport→gate                               |
| Airline apps / wallets                                         | Boarding pass                     | —                                         | —           | —                                                                | —                                            | **Auth**; scan-fail not wrong-leg | Auth yes; pair-confusion **unowned**                         |
| Apple/Google Wallet                                            | Pass                              | —                                         | —           | —                                                                | —                                            | Scan resilience                   | Does **not** fix wrong leg (ART-039)                         |

**Finding:** several products have **pieces**. **None** in the profiled or
ART-039 set combine: dual-inventory hotel **research without Book** + flight
**without checkout** + itinerary for **non-adopting** recipients + airport
**seam** + concierge as **layer not store**. Expedia-class apps have the **menu
shape**; they fail every anti-HMW. Copying that menu without copying Book is the
design, not a competitor clone.

---

## Our model vs market walls (do not “fill”)

| Market wall (ART-012)            | Our plan                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------ |
| Selling transport tickets        | Out — `/tickets` is itinerary + documents                                      |
| Return leg as own moment         | P14 recovery = experiment (ASSUMPTION); travel-day Unknown                     |
| Deep travel-day help on open web | `/airport` + auth documents; not a paid app clone                              |
| Aggregators owning failure       | We do not sell, so we do not own airline desk charges — recovery is UX not ops |
| AI meaning unsettled             | Concierge = router into jobs, not “most intelligent assistant”                 |

---

## Completeness vs our use-case list

| UC         | In graph?  | Competitor leftover?                                                                |
| ---------- | ---------- | ----------------------------------------------------------------------------------- |
| SHELL 1–3  | Yes        | Expedia-like doors — OK                                                             |
| CONC-1     | Yes        | No Operate-layer precedent in profiled six; Tripadvisor AI is a **counter-example** |
| ACCT-1     | Yes        | 6/6 saved trips behind sign-in — we **narrow** auth to documents                    |
| P09-1–4    | Yes        | Booking.com filters + WtW photos — join, no Book                                    |
| P09-5 Book | Out        | Correct                                                                             |
| P09-6/7/9  | Later      | Unowned; do not pretend Slice 1                                                     |
| P14-0–3    | Yes        | No competitor for wrong-leg; do not ship wallet-as-fix                              |
| P14-SELL   | Out        | Wall                                                                                |
| P04-1–3    | Yes        | No named view-only share on Wanderlog page                                          |
| P04-4      | Later      | —                                                                                   |
| ACT-1      | ASSUMPTION | Tripadvisor experiences = Book; we must not                                         |
| P12-1–5    | Yes        | MyTSA + airline + nobody for immigration                                            |
| P12-6      | Out        | Agency stays out                                                                    |

**Nothing material from ART-034/038/039 is missing from the joined graph**
except items already marked Later/Out/ASSUMPTION in `UNKNOWNS.md`.

---

## Leftovers (do not sneak into Slice 0–1)

1. Assistance-request object, chair photos, return-leg assistance
2. P04 post-trip attribution
3. Activities definition (access vs itinerary lines)
4. Concierge memory / IdP
5. Live competitor walkthrough (would raise ART-039 from Medium)
6. Eight unprofiled competitors (Kayak, Skyscanner, …) — may not be cited as
   current coverage
7. Type wave (Anek) — Skip
8. Figma P09 frame still titled for venues — rebase to Hotels in Slice 1

---

## Final build plan (after this bench)

See
[`Plans/coforge-luma-final.md`](../../../../../../Plans/coforge-luma-final.md).
