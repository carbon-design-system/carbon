# Figma Make — paste this entire file

Use: [figma.com/make](https://www.figma.com/make) → New → paste everything below
the line.

---

You are an expert Product Designer and Front-end Engineer working **in Figma
Make**.

Build an interactive, clickable prototype. Do not invent features. Follow this
brief exactly.

This is skill **15 Prototype / Build**. Output must be suitable for usability
testing and stakeholder review. Treat it as a first prototype, not production.

## Product

**Name:** Luma  
**Type:** Travel booker like Kayak / Iberia / eDreams, with a **travel-agent
concierge on top**.  
**Platform:** Web (mobile-first 390 wide, also usable desktop).  
**Stop line:** booking confirmation. Do **not** build after-booking (boarding
passes, airport sequence, itinerary share).

## What the user does

They **land in an app**. Hero is a **search**. One search **component** with
**tabs** that switch the form:

**Flights | Accommodations | Activities**

Same grammar as Iberia / Kayak / eDreams: from–to, dates, travellers, search,
results, fare, extras, pay, **Book**.

Default trip to implement with mock data:

- Round trip **Madrid (MAD) → Kraków (KRK)**
- **18 Sep → 25 Sep**
- **8 travellers**
- Optional stay in Kraków + optional activity

## Visual

- Page ground `#eeece6` (bone). Never white page.
- Text/icons `#041222` (ink).
- Large primary buttons `#f15b40` (coral). One large primary per screen.
- Links `#b03822`.
- Type: **Anek Latin** if available, else a geometric humanist sans. Tabular
  numbers for prices and times.
- Radius 0. No glass. No IBM Carbon. No shadcn look-alike if it fights this
  palette.
- H1 on home: `Where to?`

## Search component (required)

One block on Home. Switching tabs **keeps** date range and traveller count;
**changes** fields.

| Tab               | Fields                                                            | CTA               |
| ----------------- | ----------------------------------------------------------------- | ----------------- |
| Flights (default) | Round-trip / one-way, From, To, Depart, Return, Travellers, Cabin | Search flights    |
| Accommodations    | Destination, Check-in, Check-out, Rooms/guests                    | Search stays      |
| Activities        | Destination, Date(s), Guests                                      | Search activities |

## Concierge (on top, not instead)

Persistent control (header or FAB). Opens a chat sheet. **Does not hide the
store.**

Behaviours:

- “Madrid to Krakow in September, eight of us” → switch to Flights, fill MAD,
  KRK, 18–25 Sep, 8, offer Search.
- Same payload seeds Accommodations (Kraków, those nights, 8) and Activities.
- On results: recommend one option; user still taps Select.
- “We also need a hotel” → switch Accommodations tab.
- Passenger step: “Fill the group list” can stub 8 names.
- Pay: coach only. User must tap Pay. Agent never completes payment alone.

## Screens to generate (all of them)

1. **A-00** Splash (optional short) → Home
2. **A-01** Home + search tabs (Flights)
3. **A-01H** Home Accommodations tab
4. **A-01A** Home Activities tab
5. **A-01C** Concierge open on Home (form still visible)
6. **F-01** Flight results (2–3 fake options, sort/filter)
7. **F-02** Pick outbound then return (Iberia two-step)
8. **F-03** Fare: Basic vs Flexible
9. **H-01** Stay results Kraków
10. **H-02** Stay detail with price and **Book** / Add to trip
11. **Y-01** Activity results
12. **Y-02** Activity detail Add
13. **B-01** Trip basket (flight ± stay ± activity) Continue
14. **B-02** Passenger details ×8 (validation on empty required fields)
15. **B-03** Extras: bags, seats, insurance (Skip allowed)
16. **B-04** Pay (synthetic card; error if empty)
17. **B-05** Confirmation `You’re booked` ·
    `MAD → KRK 18 Sep · KRK → MAD 25 Sep`

Empty: search with nonsense destination. Loading: short skeleton on results.
Error: payment fields.

## Happy path (must click through)

Land → Flights search MAD–KRK 18–25 Sep ×8 → pick outbound → pick return → fare
→ basket “add stay” → hotel Book → optional activity → passengers → extras skip
or add → Pay → You’re booked.

User can pay **flights only** (skip stay and activity).

## Do not build

- IBM Carbon UI Shell
- Cars / Flight+Car tab
- Real payments
- After-booking: document pair, airport places, share URL
- Collaborative trip editor
- Sitewide search besides the tabbed component

## Quality

- Interactive, consistent, clickable
- Navigation matches this flow
- Forms validate
- Components reused (search tabs, cards, primary button, concierge)
- Accessibility: labels on fields, contrast ink on bone, 44px tap targets

Do not invent new functionality. Follow this brief exactly.
