# OOUX stub v2

Confirm before code. Gate A unsigned.

| Object          | Relationships                                | Allowed CTAs                         | Forbidden                                     |
| --------------- | -------------------------------------------- | ------------------------------------ | --------------------------------------------- |
| Hotel           | has 1 AccessProtocol                         | view, drop unpublished, how-verified | book, pay, hold                               |
| Activity        | optional AccessProtocol; item on Itinerary   | view, add to itinerary (ASSUMPTION)  | marketplace Book                              |
| Flight          | item on Itinerary; has DocumentSet           | view on itinerary                    | sell seat                                     |
| DocumentSet     | belongs to Flight / account                  | select **this leg**, confirm         | print both legs as one control                |
| Itinerary       | has Flight, Hotel, Activity, AirportSequence | view, share URL/print                | force recipient account; collab edit          |
| AirportSequence | linked from Itinerary / Tickets / Concierge  | next/back, TSA link-out              | skip passport seam; Luma checkout             |
| ConciergeThread | points at the objects above                  | open job, explain step               | emit P09 Book; take planning off Reuben       |
| Account         | owns DocumentSet, saved Itinerary            | sign in, sign out                    | required for hotel research or recipient view |
