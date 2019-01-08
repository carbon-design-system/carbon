### SCSS

#### Modifiers

Modifier classes for Data Tables are used with various classes.

| Selector                     | Description                                                                                                                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bx--responsive-table--tall` | Makes tables taller. Specifically, rendered height of a table row will be `44px` (by default, table rows are `32px` without this modifier). Apply this class to `div.bx--responsive-tabler-container` element |
| `bx--parent-row--even`       | The class for even parent rows                                                                                                                                                                                |
| `bx--expandable-row`         | The class for expandable rows                                                                                                                                                                                 |
| `bx--expandable-row--even`   | The class for even expandable rows                                                                                                                                                                            |
| `bx--expandable-row--hidden` | The class for hidden expandable rows                                                                                                                                                                          |
| `bx--table-sort--ascending`  | The class modifier for sorting columns in ascending order                                                                                                                                                     |

### JavaScript

#### Public Methods

| Name        | Params | Description                                                                  |
| ----------- | ------ | ---------------------------------------------------------------------------- |
| release     |        | Deletes the instance and removes document event listeners                    |
| refreshRows |        | When adding in new table rows, use this method to correctly re-apply stripes |

#### Options

| Option                   | Default Selector                         | Description                                                                         |
| ------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| selectorInit             | `[data-responsive-table]`                | The selector to find instances of the component                                     |
| selectorExpandCells      | `.bx--table-expand`                      | The selector to find expanded cells                                                 |
| selectorExpandableRows   | `.bx--expandable-row`                    | The selector to find expandable rows                                                |
| selectorParentRows       | `.bx--parent-row`                        | The selector to find parent rows                                                    |
| selectorTableBody        | `.bx--table-body`                        | The selector to find table body                                                     |
| selectorCheckbox         | `.bx--checkbox`                          | The selector to find checkboxes                                                     |
| classParentRowEven       | `bx--parent-row--even`                   | The class for even parent rows                                                      |
| classExpandableRow       | `bx--expandable-row`                     | The class for expandable rows                                                       |
| classExpandableRowEven   | `bx--expandable-row--even`               | The class for even expandable rows                                                  |
| classExpandableRowHidden | `bx--expandable-row--hidden`             | The class for hidden expandable rows                                                |
| classTableSortAscending  | `bx--table-sort--ascending`              | The class modifier for sorting columns in ascending order                           |
| eventBeforeExpand        | `responsive-table-beforetoggleexpand`    | Event triggered before expanding a table row                                        |
| eventAfterExpand         | `responsive-table-aftertoggleexpand`     | Event triggered after expanding a table row                                         |
| eventBeforeSort          | `responsive-table-beforetogglesort`      | Event triggered before toggling a sort action                                       |
| eventAfterSort           | `responsive-table-aftertogglesort`       | Event triggered after toggling a sort action                                        |
| eventBeforeSelectAll     | `responsive-table-beforetoggleselectall` | Event triggered before selecting all rows with checkbox                             |
| eventAfterSelectAll      | `responsive-table-aftertoggleselectall`  | Event triggered after selecting all rows with checkbox                              |
| eventTrigger             | `[data-event]`                           | Used for listing describing the event type on HTML (`expand`, `sort`, `select-all`) |
| eventParentContainer     | `[data-parent-row]`                      | Indicates the parent row of an event target                                         |

#### Events

| Option               | Default Selector                         | Description                                                                         |
| -------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| eventBeforeExpand    | `responsive-table-beforetoggleexpand`    | Event triggered before expanding a table row                                        |
| eventAfterExpand     | `responsive-table-aftertoggleexpand`     | Event triggered after expanding a table row                                         |
| eventBeforeSort      | `responsive-table-beforetogglesort`      | Event triggered before toggling a sort action                                       |
| eventAfterSort       | `responsive-table-aftertogglesort`       | Event triggered after toggling a sort action                                        |
| eventBeforeSelectAll | `responsive-table-beforetoggleselectall` | Event triggered before selecting all rows with checkbox                             |
| eventAfterSelectAll  | `responsive-table-aftertoggleselectall`  | Event triggered after selecting all rows with checkbox                              |
| eventTrigger         | `[data-event]`                           | Used for listing describing the event type on HTML (`expand`, `sort`, `select-all`) |
| eventParentContainer | `[data-parent-row]`                      | Indicates the parent row of an event target                                         |
