# Consumables

This is a folder for everything a user would consume/import/require in their own projects.

```
consumables
├── assets
│   └── fonts
├── css
├── js
│   ├── es2015
│   ├── es5
│   └── polyfills
└── scss
    ├── base-elements
    ├── components
    ├── global
    ├── _utils.scss
    └── styles.scss

11 directories, 7 files
```

### `assets`

Keep media files here (i.e. fonts images and icons).

### `css`

This is where we keep CSS files for prototyping.

* `bluemix-components.css` is a ready-built stylesheet compiled from `styles.scss`.
* `bluemix-components.css` is a minified version of the above CSS file.

To use this, include it as an external stylesheet in your own prototypes like this:

```html
<link rel="stylesheet" href="bluemix-components.css" charset="utf-8">
```

Using these CSS files assume that you follow the same file structure to reference the relative paths for font files (see [File Structure](#consumables) above).

### `js`

This is where we keep all consumable scripts.
* `es5`: ES5-compatible JavaScript files for prototyping.
* `es2015`: Consumable scripts written with ES2015 - use these in production (recommended).
* `polyfills`: Polyfills written for cross-browser compatibility.

### `scss`

This is where we keep all consumable SCSS files.

`base-elements`:
- SCSS files for base-elements.

`components`:
- SCSS files for components.

`global`:
- SCSS files for global styles.

`_utils.scss`:
- `@import`s all SCSS **partials** (`_vars.scss`, `_extends.scss`)
- things that don't output CSS.

`styles.scss`:
- `@import`s all SCSS files for global, base-elements and components
- things that do output CSS.
