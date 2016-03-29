# `scss` directory

This is where we keep pre-compiled stylesheets.

## File Structure
```
├── _utils.scss
├── demo
│   ├── _demo-colors.scss
│   ├── _demo-major-second.scss
│   ├── _demo-typography.scss
│   └── demo.scss
└── styles.scss

1 directory
```

## Files and Folders

### `styles.scss`

Main SCSS file that can be used in production.
This file `@import`s all SCSS files.

### `_utils.scss`

Utilities file that only `@import`s SCSS that does not output CSS.

### `demo` directory

SCSS files for demo purposes only - these should only be used with bluemix-components.

* `_demo-colors.scss.scss` - styles for color swatches
* `_demo-major-second.scss` - styles for major-second typescale
* `_demo-typography.scss` - styles for main typography scale
* `demo.scss` - manifest file that `@import`s the above SCSS files
