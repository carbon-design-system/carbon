## Grid

| v9                         | v10                                                 |
| -------------------------- | --------------------------------------------------- |
| `$max-width`               | Deprecated, access from `$carbon--grid-breakpoints` |
| `$columns`                 | Deprecated, access from `$carbon--grid-breakpoints` |
| `$grid-breakpoints`        | Replaced with `$carbon--grid-breakpoints`           |
| `$gutter-breakpoints`      | Deprecated                                          |
| `$grid-gutter-breakpoints` | Deprecated                                          |
| `grid` mixin               | Replaced with `carbon--grid`                        |
| `breakpoint` function      | Replaced with `carbon--breakpoint`                  |
| `gutter` function          | Deprecated                                          |
| `grid-gutter` function     | Deprecated                                          |
| `column-size` mixin        | Replaced with `carbon--make-col`                    |

## Breakpoints

| v9  | v10     |
| --- | ------- |
| xs  | sm      |
| sm  | md      |
| md  | lg      |
| lg  | xlg     |
| xl  | max     |
| xxl | Removed |

## Classes

| v9                               | v10                                              |
| -------------------------------- | ------------------------------------------------ |
| `bx--grid`                       | No change                                        |
| `bx--row`                        | No change                                        |
| `bx--col-<breakpoint>-<span>`    | Minimal change, replace breakpoint with new name |
| `bx--offset-<breakpoint>-<span>` | Minimal change, replace breakpoint with new name |
