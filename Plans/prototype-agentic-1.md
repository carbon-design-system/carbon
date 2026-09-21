# Prototype agentic 1

**Date:** 2026-09-18  
**Git:** `Coforge_skin`  
**Figma:** `mnPFHuLUzXItWQimrWQEvV`  
**Surfaces:** React HashRouter (`packages/themes/examples/coforge-skin/app`) +
Storybook `CoForge/Luma prototype` · Figma reactions follow the same
proto-spec  
**Status:** Slice 0–1 in code. Gate A unsigned. Synthetic. ADR-024.

Canonical close-out this executes:
[`coforge-luma-final.md`](coforge-luma-final.md).  
Flow spec:
`packages/themes/examples/coforge-skin/product/flows/prototype-agentic-1.json`.

---

## Joined flowchart (locked)

```mermaid
flowchart TD
  start([Cold entry]) --> home["Home /"]
  home --> tickets["Tickets /tickets"]
  home --> hotels["Hotels /hotels"]
  home --> acts["Activities /activities"]
  home --> itin["Itinerary /itinerary"]
  tickets --> home
  hotels --> home
  acts --> home
  itin --> home
  conc["Concierge — layer"] -.-> tickets
  conc -.-> hotels
  conc -.-> acts
  conc -.-> itin
  conc -.-> air

  subgraph P09["P09 — research is the gate · Hotels"]
    hotels --> vSearch["Search"]
    vSearch --> vList["Shortlist"]
    vList --> vEmpty["Empty"]
    vList --> vUnpub["Unpublished → drop = success"]
    vList --> vMain["Mainstream facts"]
    vList --> vSpec["Specialist measured room"]
    vMain --> vProto["Protocol: door / hoist / photos"]
    vSpec --> vProto
    vProto --> vHow["How verified"]
    vProto -.-> vBook["Out: Book"]
    vProto -.-> vAssist["Later: assistance live"]
  end

  subgraph P14["P14 — near-miss · Tickets"]
    tickets --> tFlight["Flight on itinerary"]
    tFlight --> auth["Account wall"]
    auth --> dPair["Outbound vs return pair"]
    dPair --> dWrong["Wrong — blocked"]
    dPair --> dRight["Outbound confirmed"]
    dRight --> dRec["Recovery — ASSUMPTION"]
    tFlight -.-> tSell["Out: sell seat"]
  end

  subgraph P04["P04 — knowledge leaves his head · Itinerary"]
    itin --> pRead["Full itinerary"]
    pRead --> pShare["URL / print"]
    pShare --> pRecip["The other 7 — no account"]
    itin --> air["/airport"]
  end

  subgraph P12["P12 — sequence is the product"]
    tickets --> air
    air --> aSeq["End-to-end sequence"]
    aSeq --> aNeed["Documents I need"]
    aSeq --> aTsa["TSA link-out"]
    aSeq --> aPass["Passport vs immigration"]
    aSeq --> aGate["To the gate"]
    aSeq -.-> aAgency["Out: agency book"]
  end

  subgraph ACT["Activities — ASSUMPTION"]
    acts --> aList["Access-gated or itinerary stops"]
    aList -.-> aMkt["Out: marketplace Book"]
  end
```

---

## Design system only (CoForge overlay on Carbon)

Query `packages/themes/src/dtcg/coforge/component-token-map.json`. No `cf-*`, no
shadcn, no Figma Make.

| Region                    | Carbon id                                       | React                                                              |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| Shell                     | `cds-header`                                    | `Header` + `HeaderName` + `HeaderNavigation` + `HeaderMenuItem`    |
| Concierge / account       | `cds-header-global-action` + `cds-header-panel` | `HeaderGlobalAction` + `HeaderPanel` + `Switcher` / `SwitcherItem` |
| Page                      | UI Shell `Content`                              | `Content` (`main`)                                                 |
| Layout                    | Carbon 2x grid                                  | `Grid` / `Column` / `Stack`                                        |
| Home / job cards          | `cds-tile`                                      | `ClickableTile`                                                    |
| Hotels search             | `cds-search`                                    | `Search` (labelled, in-job)                                        |
| Status                    | `cds-tag-readonly`                              | `Tag` gray / outline                                               |
| Links                     | `cds-link`                                      | `Link` (`--cds-link-primary` coral-text)                           |
| Primary lg                | `cds-button`                                    | `Button` kind primary **lg** (coral fill)                          |
| Small / drop              | `cds-button`                                    | `Button` ghost or primary **sm** (not coral)                       |
| Protocol list             | `cds-ordered-list`                              | `OrderedList` / `ListItem`                                         |
| Empty / blocked / success | `cds-inline-notification`                       | `InlineNotification`                                               |
| Document pair             | `cds-radio-button-group`                        | `RadioButtonGroup` / `RadioButton`                                 |
| Airport sequence          | `cds-progress-indicator`                        | `ProgressIndicator` / `ProgressStep`                               |
| Account wall              | `cds-form` + `cds-button`                       | `Form` + Sign in **lg**                                            |

**Responsive:** `HeaderMenuButton` + `SideNav` duplicate the **same four jobs**
at narrow width. This is Carbon UI Shell collapse, not a product rail and not
`cf-nav-rail`. Airport stays out of that list. Book, checkout, hold, sell seat,
marketplace Book, agency book, sitewide search, airport as a Header menu item,
`cf-nav-rail`, coral on small text, page `#ffffff`.

Skin: `data-coforge-skin=on` on light only. Bone / ink / coral per
`coforge-skin-contract`.

---

## Slice this file owns

| Slice | In this pass                                                                                      |
| ----- | ------------------------------------------------------------------------------------------------- |
| 0     | Header 4 jobs + concierge layer + account; Home tiles; HashRouter stubs                           |
| 1     | Hotels search, shortlist, empty, unpublished drop, mainstream + specialist protocol, how-verified |
| 2–4   | Tickets pair, itinerary share, airport sequence — wired so the flowchart is clickable             |
| 5     | Activities list only (ASSUMPTION, no Book)                                                        |
| Figma | Same proto-spec; reactions after React bench                                                      |

---

## How to run

Storybook `@carbon/react`, toolbar **CoForge → CoForge skin**:

`CoForge / Luma prototype / App`

Hash routes: `#/`, `#/tickets`, `#/hotels`, `#/activities`, `#/itinerary`,
`#/airport`.
