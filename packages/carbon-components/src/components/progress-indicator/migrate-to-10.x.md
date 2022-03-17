### HTML

Some new markup has been introduced. Also icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.
Please see the new structure below and reference the
[progress indicator page](https://next.carbondesignsystem.com/components/progress-indicator/code)
in our site to copy the specified new markup. React and other framework variants
should reflect the change automatically.

**Things to note**:

- We have added an optional secondary label
- Tooltip for overflowed content
- Progress step SVGs now have new attributes and paths. Don't forget to copy
  those over!

**New structure**:

```bash
bx--progress
└── bx--progress-step
    ├── svg
    ├── bx--progress-label
    ├── bx--tooltip
    ├── bx--progress-optional
    └── bx--progress-line
```

**Old structure**:

```bash
bx--progress
└── bx--progress-step
    ├── svg
    ├── bx--progress-label
    └── progress line
```

### SCSS

There are two new selectors introduced to progress indicator, and three existing
classes now used as selectors for progress indicator tooltip markup. The
remaining progress indicator selectors have no changes.

| v9  | v10                     | Note                                                                                                                                              |
| --- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| -   | `bx--progress-optional` | ✨New; Used as a secondary label                                                                                                                  |
| -   | `bx--tooltip_multi`     | ✨New; Used as an addition to regular tooltip class to differentiate styles between a single line tooltip or multi line tooltip for progress step |
| -   | `bx—tooltip`            | ✨New within progress indicator, but existing an class.                                                                                           |
| -   | `bx—tooltip__caret`     | ✨New within progress indicator, but existing an class.                                                                                           |
| -   | `bx—tooltip__text`      | ✨New within progress indicator, but existing an class.                                                                                           |
