### HTML

We have introduced following new features:

- "Optional" label
- Tooltip for overflowed content

Those new features require the corresponding markup, and some markup structure changes:

**Old structure**:

```
progress indicator
└── progress step
    ├── svg
    ├── progress label
    └── progress line
```

**New structure**:

```
progress indicator
└── progress step
    ├── svg
    ├── progress label
    ├── tooltip container
    ├── optional label
    └── progress line
```

Also icon from [`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used. Vanilla markup should be migrated to one shown in [carbondesignsystem.com](https://next.carbondesignsystem.com/components/progress-indicator/code) site. React and other framework variants should reflect the change automatically.

### SCSS

| Class                   | Note | Remarks                                                                                              |
| ----------------------- | ---- | ---------------------------------------------------------------------------------------------------- |
| `bx--progress-optional` | New  | Differentiates styles between a single line tooltip or multi line tooltip for progress step overflow |
| `bx--tooltip_multi`     | New  | Used as an addition to regular tooltip class                                                         |
