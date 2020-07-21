### HTML

Our internal changes involves re-ordering the markup. Please see the new
structure below and reference the
[slider page](https://next.carbondesignsystem.com/components/form/code) in our
site to copy the specified new markup. React and other framework variants should
reflect the change automatically.

**Things to note**:

- `bx—label` is the only element that has moved.
- There is no new markup.

**New structure**:

```bash
bx--form-item
├── bx--label
└── bx--slider-container
    ├── bx--slider__range-label
    ├── bx--slider
    │   ├── bx--slider__thumb
    │   ├── bx--slider__track
    │   ├── x--slider__filled-track
    │   └── bx--slider__input
    ├── bx--slider__range-label
    └── bx--text-input bx--slider-text-input
```

**Old structure**:

```bash
bx--form-item
└── bx--slider-container
    ├── bx--slider__range-label
    ├── bx--slider
    │   ├── bx--slider__thumb
    │   ├── bx--slider__track
    │   ├── x--slider__filled-track
    │   └── bx--slider__input
    ├── bx--label
    ├── bx--slider__range-label
    └── bx--text-input bx--slider-text-input
```

### SCSS

No selector changes.
