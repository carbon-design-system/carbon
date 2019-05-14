### HTML

Icons from [`carbon-elements`](https://github.com/IBM/carbon-elements) package
are now used for the increase button, decrease button and validation error. Also
some internal changes involves changing the markup structure a bit. Please see
the new structure below and reference the
[number input page](https://next.carbondesignsystem.com/components/number-input/code)
in our site to copy the specified new markup. React and other framework variants
should reflect the changes automatically.

**Things to note**:

- Input and number controls are now inside a wrapper, so it is no longer a
  sibling of the label. The wrapper is now a sibling of the label.
- Helper text markup has now moved to be immediately below the label.
- Invalid variation now includes an invalid icon.
- Button icons have new paths and svg attributes.

**New Structure**:

```bash
bx--form-item
└── bx--number (optional: bx--number--nolabel, bx--number--helpertext)
    ├── bx--label (optional)
    ├── bx--form__helper-text (optional)
    ├── bx--number__input-wrapper
    │   ├── input
    │   ├──svg bx--number__invalid (invalid use only)
    │   └── bx--number__controls
    │       ├── bx--number__control-btn up-icon
    │       │   └──svg
    │       └── bx--number__control-btn down-icon
    │           └──svg
    └── form requirement (invalid use only)
```

**Old Structure**:

```bash
bx--form-item
└── bx--number (optional: bx--number--nolabel, bx--number--helpertext)
    ├── bx--label (optional)
    ├── input
    ├── bx--number__controls
    │   ├── bx--number__control-btn up-icon
    │   │   └──svg
    │   └── bx--number__control-btn down-icon
    │       └──svg
    ├── form requirement (invalid use only)
    └── bx--form__helper-text (optional)
```

### SCSS

No new selectors.
