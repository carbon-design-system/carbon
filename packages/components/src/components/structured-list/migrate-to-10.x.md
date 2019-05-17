### HTML

Icon from [`carbon-elements`](https://github.com/IBM/carbon-elements) package is
now used. Also design change around selection involves markup change. Please see
the new structure below and reference the
[structured list page](https://next.carbondesignsystem.com/components/structured-list/code)
in our site to copy the specified new markup. React and other framework variants
should reflect the change automatically.

**Things to note**:

- `bx--structured-list-input` withing the tbody rows has moved.
- Selectable rows' SVG `td` has moved to the end of the row.
- New icon is being used.

**New structure**:

```bash
bx--structured-list
├── bx--structured-list-thead
│   └── bx--structured-list-row
│       └── bx--structured-list-th
└── bx--structured-list-tbody
    └── bx--structured-list-row
        ├── bx--structured-list-td
        ├── bx--structured-list-input
        └── bx--structured-list-td (selectable)
            └── bx--structured-list-svg (selectable)
```

**Old structure**:

```bash
bx--structured-list
├── bx--structured-list-thead
│   └── bx--structured-list-row
│       └── bx--structured-list-th
└── bx--structured-list-tbody
    └── bx--structured-list-row
        ├── bx--structured-list-input
        ├── bx--structured-list-td (selectable)
        │   └── bx--structured-list-svg (selectable)
        └── bx--structured-list-td
```

### SCSS

No selector changes.
