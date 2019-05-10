## Data Table

### HTML

Aside from using new icons from the
[`carbon-elements`](https://github.com/IBM/carbon-elements) package, there are
several structural changes and new selectors in the Data Table component. Please
see the new structure below and reference the
[data table page](https://next.carbondesignsystem.com/components/data-table/code)
in our site to copy the specified new markup.

React and other framework variants should reflect the changes automatically.

**Things to note**:

- All `-v2`'s in selectors have been removed
- All SVG icons have changed to new icons.
- Structural changes and new selectors in the table title. See structure below
  and SCSS section for more details.
- Structural changes and new selectors in the table toolbar. See structure below
  and SCSS section for more details.
- Toolbar overflow menu now uses the overflow menu component `<ul>` markup
  instead of just `button.bx--batch-actions`
- `bx—search` container in toolbar no longer has the `bx--search—light` class
- Batch action buttons no longer have `bx--btn—ghost` class
- New markup/selector involving expandable features includes a
  `div.bx--child-row-inner-container` as a wrapper for content within the child
  row `td`.
- New markup/selectors involving sortable features include an additional icon
  `bx--table-sort__icon-unsorted` for non-sorted state, and a new class for
  sortable data table `bx--data-table—-sort`.
- New selectors `bx—table-column-checkbox` and `bx—table-column-menu` for
  checkbox and overflow menu `td`'s and `th`'s.
- New selector for `li` within a row overflow menu `bx--table-row--menu-option`.
  See SCSS section for more details.

**New Structure**:

```bash
bx--data-table-container
├── bx--data-table-header
│   ├── bx--data-table-header__title
│   └── bx--data-table-header__description
├── bx--table-toolbar
│   ├── bx--batch-actions
│   │   ├── bx--batch-action-list
│   │   └── bx--batch-summary
│   │       └── bx--batch-summary__para
│   └── bx--toolbar-content
│       ├── bx--toolbar-search-container-expandable (bx--toolbar-search-container-persistent)
│       ├── bx--overflow-menu bx--toolbar-action
│       └── bx--btn--primary
└── bx--data-table
    ├── thead
    └── tbody
pagination
```

### Selectors

| Category                    | v9                               | v10                                       | Notes                                                                                                      |
| --------------------------- | -------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Table container**         | `.bx--data-table-v2-container`   | `.bx--data-table-container`               | :eyes: Changed                                                                                             |
| **Table header**            | `.bx--data-table-v2-header`      | `.bx--data-table-header`                  | :eyes: Changed; Also, now a container class on a `div` instead of an `h4`                                  |
|                             | -                                | `.bx--data-table-header__title`           | :sparkles: New                                                                                             |
|                             | -                                | `.bx--data-table-header__description`     | :sparkles: New                                                                                             |
| **Toolbar**                 | `bx--toolbar-search-container`   | `bx--toolbar-search-container-expandable` | :sparkles: New; Default is expandable search                                                               |
|                             | -                                | `bx--toolbar-search-container-persistent` | :sparkles: New; Optional persistent search                                                                 |
| **Data Table**              | `.bx--data-table-v2--no-border`  | -                                         | :skull: Removed                                                                                            |
|                             | `.bx--data-table-v2--static`     | `.bx--data-table--static`                 | :eyes: Changed                                                                                             |
|                             | `.bx--data-table-v2--selected`   | `.bx--data-table--selected`               | :eyes: Changed                                                                                             |
|                             | `.bx--data-table-v2--zebra`      | `.bx--data-table--zebra`                  | :eyes: Changed                                                                                             |
|                             | -                                | `.bx--data-table—-sort`                   | :sparkles: New                                                                                             |
|                             | `.bx--data-table-v2—-small`      | `.bx--data-table—-small`                  | :eyes: Changed                                                                                             |
|                             | `.bx--data-table-v2—-compact`    | `.bx--data-table—-compact`                | :eyes: Changed                                                                                             |
|                             | `.bx--data-table-v2—-tall`       | `.bx--data-table—-tall`                   | :eyes: Changed                                                                                             |
|                             | `.bx--data-table-v2--compact`    | `.bx--data-table--compact`                | :eyes: Changed                                                                                             |
|                             | `.bx--data-table-v2--short`      | `.bx--data-table--short`                  | :eyes: Changed                                                                                             |
|                             | `.bx--data-table-v2--tall`       | `.bx--data-table--tall`                   | :eyes: Changed                                                                                             |
| **Table Rows**              | `.bx--parent-row-v2`             | `.bx--parent-row`                         | :eyes: Changed                                                                                             |
|                             | `.bx--expandable-row-v2`         | `.bx--expandable-row`                     | :eyes: Changed                                                                                             |
|                             | `.bx--expandable-row--hidden-v2` | `.bx--expandable-row--hidden`             | :eyes: Changed                                                                                             |
|                             | `.bx--expandable-row--hover-v2`  | `.bx--expandable-row--hover`              | :eyes: Changed                                                                                             |
| **Table Columns**           | -                                | `.bx—table-column-checkbox`               | :sparkles: New; Used in `th`'s and `td`'s with checkbox.                                                   |
|                             | -                                | `.bx—table-column-menu`                   | :sparkles: New; Used in `td`'s with overflow menu                                                          |
|                             | `.bx—table-expand-v2`            | `.bx—table-expand`                        | :eyes: Changed                                                                                             |
|                             | -                                | `.bx--child-row-inner-container`          | :sparkles: New; Container inside expand child row `td`, allows for motion animation                        |
| **Buttons, Icons and more** | `bx--table-sort-v2`              | `bx--table-sort`                          | :eyes: Changed                                                                                             |
|                             | `bx--table-sort-v2__icon`        | `bx--table-sort__icon`                    | :eyes: Changed                                                                                             |
|                             | -                                | `.bx--table-sort__icon-unsorted`          | :sparkles: New                                                                                             |
|                             | `bx--table-expand-v2__button`    | `bx--table-expand__button`                | :eyes: Changed                                                                                             |
|                             | `bx--table-expand-v2__svg`       | `bx--table-expand__svg`                   | :eyes: Changed                                                                                             |
|                             | -                                | `bx--table-row--menu-option`              | :sparkles: New; Addional class added to `li.bx--overflow-menu-options__option` in table row overflow menus |
