# Verify — create-request (calibration)

Human Gate A still required. Skipped ≠ Pass.

| Check                         | Result | Evidence                                                                                                                   |
| ----------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| Git `Coforge_skin`            | Pass   | `git branch --show-current`                                                                                                |
| Catalogue only                | Pass   | Button, Text input Default, Text area Default, Checkbox, Link from Carbon Community; heading is type, not a fake component |
| Figma page                    | Pass   | Existing `Screens` (`1756:1439`), frame `create-request` (`13177:44990`) — not Code snippet `35:2542`                      |
| Instances not primitives      | Pass   | Screenshot of Community instances                                                                                          |
| Page ground bone              | Pass   | Frame fill `#eeece6`                                                                                                       |
| Heading ink                   | Pass   | `#041222` on bone                                                                                                          |
| Field stays Carbon gray       | Pass   | Text input / area IBM field tokens                                                                                         |
| Primary lg coral in Figma     | Skip   | IBM default variable mode; kit still paints IBM blue. CSS overlay owns coral until Figma bind after bench                  |
| Primary lg coral in Storybook | Skip   | Not measured this run; story `CoForge/Create request` with `globals.coforgeSkin: 'on'`                                     |
| Link coral-text in Figma      | Skip   | Same IBM mode; IBM blue on screenshot                                                                                      |
| Small primary not coral       | Pass   | No sm primary on this screen                                                                                               |
| Success notification          | Skip   | State only in Storybook, not on default Figma frame                                                                        |

Figma:
https://www.figma.com/design/mnPFHuLUzXItWQimrWQEvV/branch?node-id=13177-44990
