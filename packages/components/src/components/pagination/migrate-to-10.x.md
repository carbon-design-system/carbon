### HTML

There are several structural changes and new icons from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package. Please see
the new structure below and reference the
[pagination page](https://next.carbondesignsystem.com/components/pagination/code)
in our site to copy the specified new markup. React and other framework variants
should reflect the change automatically.

**Things to note**:

- Both left and right pagination containers now have two `bx—pagination__text`'s
  each.
- Visually hidden markup and input has been removed from the right pagination.
- There are now selects on both right and left pagination.
- Button and select icons have new paths and svg attributes.
- Button icon class names have changed.

**New Structure**:

```bash
bx--pagination
├── bx--pagination__left
│   ├── bx--pagination__text
│   ├── bx--select
│   │   ├── bx--select-input
│   │   │   └── bx--select-option
│   │   └── bx--select__arrow
│   └── bx--pagination__text
└── bx--pagination__right
    ├── bx--pagination__text
    ├── bx--select
    │   ├── bx--select-input
    │   │   └── bx--select-option
    │   └── bx--select__arrow
    ├── bx--pagination__text
    ├── bx--pagination__button bx--pagination__button--backward
    │   └── bx--pagination__nav-arrow
    └── bx--pagination__button bx--pagination__button--forward
        └── bx--pagination__nav-arrow
```

**Old Structure**:

```bash
bx--pagination
├── bx--pagination__left
│   ├── bx--select
│   │   ├── bx--select-input
│   │   │   └── bx--select-option
│   │   └── bx--select__arrow
│   └── bx--pagination__text
└── bx--pagination__right
    ├── bx--pagination__text
    ├── bx--pagination__button bx--pagination__button--backward
    │   └── bx--pagination__button-icon
    ├── bx--visually-hidden
    ├── bx--text-input
    └── bx--pagination__button bx--pagination__button--forward
        └── bx--pagination__button-icon
```

### SCSS

There is _one_ change to an existing selector, the remaining selectors are
unchanged.

| v9                            | v10                         | Note           |
| ----------------------------- | --------------------------- | -------------- |
| `bx--pagination__button-icon` | `bx--pagination__nav-arrow` | :eyes: Changed |
