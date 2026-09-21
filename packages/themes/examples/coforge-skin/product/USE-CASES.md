# Luma use cases v2

Chrome: Tickets · Hotels · Activities · Itinerary. Concierge = horizontal layer.
Documents = auth. Gate A unsigned.

| ID           | Actor         | Product?        | Path                                                                                      |
| ------------ | ------------- | --------------- | ----------------------------------------------------------------------------------------- |
| UC-SHELL-1   | Anyone        | In              | Cold → `/`                                                                                |
| UC-SHELL-2   | Anyone        | In              | Home / menu → Tickets, Hotels, Activities, Itinerary                                      |
| UC-SHELL-3   | Anyone        | In              | Switch job or Home                                                                        |
| UC-CONC-1    | Anyone        | In              | Concierge panel → deep-link a job (never P09 Book)                                        |
| UC-ACCT-1    | Planner / P14 | In              | Sign in before stored documents                                                           |
| UC-P09-1     | Halina        | In              | `/hotels` unpublished → drop (success)                                                    |
| UC-P09-2     | Halina        | In              | In-job search; empty                                                                      |
| UC-P09-3     | Halina        | In              | `/hotels/:id` protocol — **mainstream facts and specialist measured room** (ART-039 both) |
| UC-P09-4     | Halina        | In              | `/hotels/how-verified`                                                                    |
| UC-P09-5     | Halina        | **Out**         | Book hotel                                                                                |
| UC-P09-6/7/9 | Halina        | Later           | Assistance live; chair photos; return assist                                              |
| UC-P14-0     | Bernard       | In              | `/tickets` flight on itinerary (no checkout)                                              |
| UC-P14-1     | Bernard       | In              | Auth → outbound vs return pair                                                            |
| UC-P14-2     | Bernard       | In              | Wrong pair blocked                                                                        |
| UC-P14-3     | Bernard       | In              | Recovery ASSUMPTION                                                                       |
| UC-P14-SELL  | —             | **Out**         | Sell the seat                                                                             |
| UC-P04-1     | Reuben        | In              | `/itinerary` (save may need auth)                                                         |
| UC-P04-2     | Reuben        | In              | Share URL / print                                                                         |
| UC-P04-3     | Recipients ×7 | In              | Open share **without** account                                                            |
| UC-P04-4     | Reuben        | Later           | Attribute decisions to group                                                              |
| UC-ACT-1     | —             | In / ASSUMPTION | `/activities` access-gated or itinerary lines; no Book                                    |
| UC-P12-1–5   | Jaden         | In              | `/airport` from itinerary / tickets / concierge                                           |
| UC-P12-6     | Jaden         | **Out**         | Luma agency-style checkout                                                                |

P01–P03 and remaining ART-030 personas stay out of this prototype.

Stage mapping (Prototype 2): Shell → `JobDoor`; Concierge → `ConciergeLayer`;
P09 → `ResearchGate` + `AccessProtocol`; P14 → Carbon Form + `DocumentPair`; P04
→ `ItineraryShare`; P12 → `AirportSequence`. See `Plans/prototype-agentic-2.md`.
