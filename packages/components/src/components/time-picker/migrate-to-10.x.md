### HTML

Some markup changes and icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.
Also design change around the select box involves changing the list of CSS
classes applied to the markup. Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/date-picker/code)
site. React and other framework variants should reflect the change
automatically.

**Things to note**:

- Time picker label `bx--label` is no longer a child of `bx—time-picker`, it's
  now a sibling of it
- `bx—form-requirement` is no longer a child of `bx--time-picker__input`, it's
  now a sibling of `bx--time-picker` / child of `bx—form-item`
- New icons are being used for selects

**New structure**:

```bash
bx--form-item
├── bx--label
├── bx--time-picker
│   ├── bx--time-picker__input
│   │   └── bx--time-picker__input-field (additional classes changed)
│   ├── bx--time-picker__select (additional classes changed)
│   │   ├── bx--label bx--visually-hidden
│   │   ├── bx--select-input
│   │   └── svg* (new icon)
│   └── bx--time-picker__select (additional classes changed)
│       ├── bx--label bx--visually-hidden
│       ├── bx--select-input
│       └── svg* (new icon)
└── bx--form-requirement (invalid only)
```

**Old structure**:

```bash
bx--form-item
└── bx--time-picker
    ├── bx--time-picker__input
    │   ├── bx--label
    │   ├── bx--time-picker__input-field
    │   └── bx--form-requirement
    ├── bx--time-picker__select
    │   ├── bx--label bx--visually-hidden
    │   ├── bx--select-input
    │   └── svg* (old icon)
    └── bx--time-picker__select
        ├── bx--label bx--visually-hidden
        ├── bx--select-input
        └── svg* (old icon)
```

### SCSS

The `data-invalid` attribute has been placed on the time picker wrapper div

| v9  | v10                             | Note           |
| --- | ------------------------------- | -------------- |
| -   | `bx--time-picker[data-invalid]` | :eyes: Changed |
