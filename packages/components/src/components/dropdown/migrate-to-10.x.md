### HTML

Aside from using new icons from the
[`carbon-elements`](https://github.com/IBM/carbon-elements) package, there are
several structural changes and new selectors in the Dropdown component. Please
see the new structure below and reference the
[dropdown page](https://next.carbondesignsystem.com/components/dropdown/code) in
our site to copy the specified new markup.

React and other framework variants should reflect the changes automatically.

**Things to note**:

- Essentially, the dropdown list container
  `<li><ul class="bx--dropdown-list"> … </ul><li>` and its children are the only
  things to remain structurally the same.
- Icons have new paths and svg attributes.

**New Structure**:

```bash
bx--form-item
└── bx--dropdown__wrapper
│   ├── bx--label
│   ├── bx--form__helper-text (optional)
│   └── bx--dropdown
│       ├── bx--dropdown__invalid-icon (invalid use only)
│       ├── bx--dropdown-text
│       ├── bx--dropdown__arrow-container
│       │   └── bx--dropdown__arrow
│       └── <li>
│           └── bx--dropdown-list
│               ├── bx--dropdown-item
│               │   └── bx--dropdown-link
│               ├── bx--dropdown-item
│               │   └── bx--dropdown-link
│               └── bx--dropdown-item
│                   └── bx--dropdown-link
└── form requirement (invalid use only)
```

**Old Structure**:

```bash
bx--dropdown
├── bx--dropdown-text
│   └── bx--dropdown__arrow
└── <li>
    └── dropdown list
        ├── bx--dropdown-item
        │   └── bx--dropdown-link
        ├── bx--dropdown-item
        │   └── bx--dropdown-link
        └── bx--dropdown-item
            └── bx--dropdown-link
```

### SCSS

There is _one_ change to an _existing_ selector, as well as _four new_
selectors. The remaining selectors have no change.

| v9                           | v10                             | Note                                            |
| ---------------------------- | ------------------------------- | ----------------------------------------------- |
| `bx--dropdown[data-invalid]` | `bx--dropdown—invalid`          | :eyes: Changed; Avoid selecting data attributes |
| -                            | `bx—dropdown__wrapper`          | ✨New                                           |
| -                            | `bx--dropdown__arrow-container` | ✨New                                           |
| -                            | `bx--dropdown—disabled`         | ✨New                                           |
| -                            | `bx--dropdown__invalid-icon`    | ✨New                                           |
