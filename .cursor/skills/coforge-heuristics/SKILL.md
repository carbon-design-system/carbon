---
name: coforge-heuristics
description: >-
  Nielsen usability heuristics plus anti-HMW checks for Luma Operate screens.
  Use when auditing Prototype 1/2 UX, scoring stages, or claiming a screen is
  desirable and usable.
---

# CoForge heuristics

Score every **shipped** screen. Skipped ≠ Pass. Gate A unsigned.

## Nielsen (10)

| #   | Heuristic                       | Luma test                                                                                                                |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| N1  | Visibility of system status     | Current job in Header; P14 which leg is selected; P12 which step                                                         |
| N2  | Match the real world            | Hotels = research not checkout; airport = physical sequence not wizard-to-pay; documents = two papers not one radio list |
| N3  | User control and freedom        | Back to shortlist / Home; drop unpublished is reversible until leave; wrong-leg can reselect                             |
| N4  | Consistency and standards       | Carbon Header, labelled Search, ink focus; coral **lg** primary only                                                     |
| N5  | Error prevention                | Wrong pair **blocked** before print; unpublished has no Book                                                             |
| N6  | Recognition rather than recall  | Protocol numbers on the card; outbound vs return labelled by date and direction                                          |
| N7  | Flexibility and efficiency      | Concierge deep-links; Header always available; no sitewide OTA search                                                    |
| N8  | Aesthetic and minimalist design | Operate: one h1, 2x grid, no decorative coral, no glass                                                                  |
| N9  | Recognize, diagnose, recover    | Empty search; blocked pair copy names the return date; recovery stub labelled ASSUMPTION                                 |
| N10 | Help and documentation          | How-verified; TSA link-out (authority), not a fake help centre                                                           |

## Anti-HMW (must fail the build if violated)

See `coforge-ux/references/anti-hmw.md`. Especially: no Book on Hotels; no seat
sale; no “simplified for elderly”; concierge does not Book; recipients need no
account.

## Desirability (Operate, not delight-theme)

Desirable here means **trustworthy and scannable**, not playful. Impeccable
Operate only. No `bolder` / `delight` / glass.

## Report

Table: Screen · Heuristic · P1 result · P2 change · Evidence.
