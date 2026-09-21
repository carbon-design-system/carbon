# Plan — join v1 depth onto v2 chrome

**Status:** Plan then execute in `FLOWS.md`. No Figma. Gate A unsigned.

## Why join, not pick one

Graph A (v1) is the **research-complete** task graph: every HMW step,
empty/unpublished, mainstream vs specialist, later/out.  
Graph B (v2) is the **product chrome**: Tickets · Hotels · Activities ·
Itinerary + concierge layer + account on documents.

Joining means: **B’s doors, A’s rooms.** Labels Venues/Documents/Plan as menu
items are retired. Their **use cases and goals stay**.

## Goals still locked (ART-034)

| Persona | Goal if the join is solid                             | Fail if we flatten                                                 |
| ------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| P09     | Access gate before intent; drop unpublished = success | Hotels with Book; lose empty / unpublished / how-verified          |
| P14     | Commitment: wrong pair blocked                        | Documents without account wall _or_ account wall on hotel research |
| P04     | Other 7 act without an app                            | Recipients must sign in                                            |
| P12     | Sequence is the product                               | Airport as a fifth menu _or_ missing TSA/passport/gate             |
| All     | Concierge jumps; does not Book                        | Concierge as OTA                                                   |

## Node map (A → B)

| v1                                     | v2                                                                | UC        | Keep depth?                           |
| -------------------------------------- | ----------------------------------------------------------------- | --------- | ------------------------------------- |
| Home / four returns                    | Home + Tickets/Hotels/Activities/Itinerary + returns              | SHELL-1–3 | Yes                                   |
| Venues                                 | **Hotels** `/hotels`                                              | P09       | Yes                                   |
| vSearch, vList, vEmpty, vUnpub→drop    | same under Hotels                                                 | P09-1–2   | Yes — was missing in a thin v2 sketch |
| vMain + vSpec → vProto                 | same (ART-039 both inventories)                                   | P09-3     | **Restore**                           |
| vHow                                   | `/hotels/how-verified`                                            | P09-4     | Yes                                   |
| vBook Out                              | Out                                                               | P09-5     | Yes                                   |
| vAssist Later                          | Later                                                             | P09-6     | Yes — was dropped in thin v2          |
| Documents                              | **Tickets** then **auth** then pair                               | P14-0–3   | Auth is new, required                 |
| dWrong / dRight / dRec                 | same after auth                                                   | P14-1–3   | Yes                                   |
| Plan                                   | **Itinerary**                                                     | P04       | Yes                                   |
| pRead / pShare / pRecip                | same; recip still no account                                      | P04-1–3   | Yes                                   |
| Airport menu item                      | **Not a menu item** `/airport` from itinerary, tickets, concierge | P12       | Yes, change of door only              |
| aSeq + need/tsa/pass/gate + agency Out | same inside `/airport`                                            | P12-1–6   | **Restore** aSeq + agency Out         |
| —                                      | Activities subgraph                                               | ACT-1     | v2 add                                |
| —                                      | Concierge dashed to all jobs + airport                            | CONC-1    | v2 add                                |
| —                                      | Account wall before pair                                          | ACCT-1    | v2 add                                |

## Will not merge

- Two Home graphs (one product)
- Airport as a fifth Header item
- Sitewide search
- Selling seats or hotel Book
- P01–P03 / remaining 10 personas

## Execute next

Single canonical mermaid in `FLOWS.md`. IA route table already v2. Canvas
follows that mermaid.
