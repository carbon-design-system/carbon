---
name: coforge-agentic-concierge
description: >-
  Tool contract for the Luma booker concierge. Use when wiring ConciergeAgent,
  mock tools, or chat that mutates BookingContext. Pay stays on the Payment
  screen primary.
---

# Agentic concierge (booker)

The overlay **mutates booking state**. It is not a keyword FAQ. Mock tools in
v1; keep the same names if an LLM is wired later.

## Tools

| Tool                                                    | Effect                                        | Allowed screens            |
| ------------------------------------------------------- | --------------------------------------------- | -------------------------- |
| `fill_trip_search`                                      | MAD, KRK, 18–25 Sep 2026, 8 pax               | any                        |
| `search_flights` / `search_stays` / `search_activities` | Navigate + run search                         | any                        |
| `select_best_value_flight`                              | Select `isBestValue` row; then return or fare | flight-results             |
| `add_stay`                                              | Select hotel by id (default `stary`)          | hotel-results, basket, any |
| `add_activity`                                          | Select activity by id (default `salt-mine`)   | activity-results, any      |
| `fill_passengers_demo`                                  | DEMO_PASSENGERS ×8                            | passengers, any            |
| `go_basket` / `go_payment`                              | Navigate                                      | any                        |
| `open_itinerary`                                        | Diary hub                                     | confirmation, booked       |
| `open_documents`                                        | Wallet / DocumentPair                         | booked                     |
| `open_checklist`                                        | Accordion checklist                           | booked                     |
| `open_airport`                                          | AirportSequence, current step                 | booked                     |
| `advance_airport_step`                                  | Next physical place                           | airport                    |
| `open_assistance`                                       | AssistanceTrack                               | booked                     |
| `explain_access`                                        | AccessProtocol for KRK / Hotel Stary          | any                        |
| `share_plan`                                            | ItineraryShare view-only                      | booked                     |
| `open_group`                                            | GroupTrip read-only                           | booked                     |
| `close_trip`                                            | Trip-complete compose                         | booked                     |
| `explain`                                               | Copy only                                     | any                        |

## Lock

Never implement `confirm_pay`. Never auto-click Pay. Never hide Flights /
Accommodations / Activities tabs.

Show a **Tag** chip when a tool ran. User can undo via Back / remove in
TripBasket except after confirmation.

## UI

`new/ConciergeAgent` wraps HeaderGlobalAction, HeaderPanel, TextInput, Button,
Tag, InlineNotification. No `cf-*`. Coral only on **lg** primary Send if used;
otherwise ink/ghost send.

## Files

`packages/themes/examples/coforge-skin/new/ConciergeAgent/`  
`packages/themes/examples/coforge-skin/app-book/tools.js`
