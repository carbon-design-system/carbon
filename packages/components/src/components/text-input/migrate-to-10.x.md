### HTML

There are some markup changes and an icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.
Please see the new structure below and reference the
[text input page](https://next.carbondesignsystem.com/components/text-input/code)
in our site to copy the specified new markup. React and other framework variants
should reflect the change automatically.

**Things to note**:

- Text input is now contained in a wrapper
- New icon for invalid state is now used

**New structure**:

```bash
bx--form-item
├── bx--label
├── bx--form__helper-text
├── bx--text-input__field-wrapper
│   ├── bx--text-input__invalid-icon (invalid only)
│   └── bx--text-input
└── bx--form-requirement (invalid only)
```

**Old structure**:

```bash
bx--form-item
├── bx--label
├── bx--form__helper-text
├── bx--text-input
└── bx--form-requirement (invalid only)
```

### SCSS

One change to an exisiting selector, two new selectors.

| v9                    | v10                                           | Note                                                                                        |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `input[data-invalid]` | `bx--text-input__field-wrapper[data-invalid]` | :eyes: Changed; Invalid attribute is now in the input container instead of the input itself |
| -                     | `bx--text-input__field-wrapper`               | :sparkles: New                                                                              |
| -                     | `bx--text-input__invalid-icon`                | :sparkles: New                                                                              |
