# VERIFY — luma-p09-shortlist

Frame:
[luma-p09-shortlist](https://www.figma.com/design/mnPFHuLUzXItWQimrWQEvV/Coforge_skin?node-id=13184-2991)
on page Ai Test `13172:2451`. Git: `Coforge_skin`. No Storybook twin this cut.

| Check               | Result | Evidence                                                                                                                        |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Page                | Pass   | Ai Test `13172:2451`, not Screens, not Code snippet `35:2542`                                                                   |
| Frame               | Pass   | `13184:2991` 1280×682, fill `#eeece6`                                                                                           |
| Heading             | Pass   | IBM Plex Sans SemiBold 32, ink `#041222`, copy “Venues with published access”                                                   |
| Search              | Pass   | Carbon Search Default instance, placeholder “City or venue”, label “Search venues”                                              |
| Tile verified       | Pass   | Base Tile: Hotel Stare Miasto / Door 85 cm · hoist 140 cm · room photos + Tag Gray “Verified protocol”                          |
| Tile unpublished    | Pass   | Base Tile: No published access / Treat as inaccessible. No book action. + Tag Outline “Unpublished”                             |
| Tile specialist     | Pass   | Base Tile: Specialist listing / Measured bathroom, entrance photos + Tag Gray “Verified protocol” (ASSUMPTION: tag not in spec) |
| Help                | Pass   | Carbon Link Standalone “How access is verified”. No Book CTA                                                                    |
| Colour on instances | Skip   | IBM default Figma mode. Search field IBM gray; Link IBM blue. Overlay proven in CSS (`BENCH.md`); kit not rebound               |
| Ink on bone         | Pass   | heading measured against `#eeece6` ground; bench 15.95                                                                          |
| Coral as body       | Pass   | unused (required fail path not on this screen)                                                                                  |
| Booking CTA         | Pass   | none in tree                                                                                                                    |
| Gate A              | Skip   | Human — do not self-approve. Synthetic copy                                                                                     |

Screenshot: Figma MCP `get_screenshot` node `13184:2991` after search-label
wrap.
