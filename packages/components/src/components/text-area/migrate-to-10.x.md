### HTML

There are some markup changes and an icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.
Please see the new structure below and reference the
[text input page](https://next.carbondesignsystem.com/components/text-input/code)
in our site to copy the specified new markup. React and other framework variants
should reflect the change automatically.

**Things to note**:

- Helper text moved to be above the textarea markup
- Textarea is now contained in a wrapper
- New icon for invalid state is now used

**New structure**:

```bash
bx--form-item
├── bx--label
├── bx--form__helper-text
├── bx--text-area__wrapper
│   ├── bx--text-area__invalid-icon (invalid only)
│   └── bx--text-area
└── bx--form-requirement (invalid only)
```

**Old structure**:

```bash
bx--form-item
├── bx--label
├── bx--text-area
├── bx--form__helper-text
└── bx--form-requirement (invalid only)
```

### SCSS

One change to an exisiting selector and two new selectors.

| v9                       | v10                                    | Note                                                                                           |
| ------------------------ | -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `textarea[data-invalid]` | `bx--text-area__wrapper[data-invalid]` | :eyes: Changed; Invalid attribute is now in the textarea container instead of the input itself |
| -                        | `bx--text-area__wrapper`               | :sparkles: New                                                                                 |
| -                        | `bx--text-area__invalid-icon`          | :sparkles: New                                                                                 |
