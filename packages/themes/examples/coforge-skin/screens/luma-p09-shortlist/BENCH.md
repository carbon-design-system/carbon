# CoForge colour bench — P09 unlock

Git: `Coforge_skin`. Type wave: **Skip** (not this cut). Figma IBM default mode:
overlay not rebound on kit instances.

| Check                               | Result | Evidence                                                                       |
| ----------------------------------- | ------ | ------------------------------------------------------------------------------ |
| Branch                              | Pass   | `git branch --show-current` → `Coforge_skin`                                   |
| `--cds-background` bone             | Pass   | `_skin.scss` `$coforge-bone: #eeece6` → `--cds-background`                     |
| Primary lg coral                    | Pass   | `--cds-button-primary: #f15b40`; white-on-coral 3.33:1 (large-text floor only) |
| Primary sm not coral                | Pass   | `coforge-skin-small-primary` sets sm primary to ink                            |
| Link coral-text                     | Pass   | `--cds-link-primary: #b03822`                                                  |
| Field still Carbon                  | Pass   | overlay does not set `field-*`                                                 |
| Layer 01–03 IBM                     | Pass   | not remapped                                                                   |
| Syntax IBM                          | Pass   | not remapped                                                                   |
| Interactive not coral dump          | Pass   | `--cds-interactive` = ink `#041222`                                            |
| Ink on bone ≥ 15:1                  | Pass   | 15.95                                                                          |
| Coral-text on bone ≥ 4.5:1          | Pass   | 5.18                                                                           |
| Coral on bone as body               | Pass   | 2.82 **fails** (required)                                                      |
| White on coral as small             | Pass   | 3.33 < 4.5 (small fails; CTA must be large)                                    |
| Leftover `#0f62fe` on overlay roles | Pass   | none in `_skin.scss`. Storybook `manager-head.html` IBM chrome only            |
| Type (Anek / SCP)                   | Skip   | later wave; overlay mixins exist but not this job                              |

Figma writes unlocked for composition. Do not rebind Community variables.
