# Dist

Assets and built files for consuming Bluemix Components:
* `CSS` and `JavaScript (ES5)` for **prototyping only**.
* Asset files like fonts can be used for production.

## File structure

```
dist
├── assets
│   └── fonts
├── css
│   ├── bluemix-components.css
│   └── bluemix-components.min.css
├── demo
│   ├── demo.css
│   ├── demo.js
│   ├── demo.js.map
│   └── views
│       ├── demo-all.dust
│       └── demo.html
└── js
    ├── bluemix-components.js
    ├── bluemix-components.js.map
    ├── bluemix-components.min.js
    └── bluemix-components.min.js.map

7 directories
```
## Directories

### `assets`

These are where we keep and manage media files like fonts,  images and icons.

### `css`

This is where we keep CSS files for prototyping.

* `bluemix-components.css` is a ready-built stylesheet compiled from `styles.scss`.
* `bluemix-components.css` is a minified version of the above CSS file.

To use this, include it as an external stylesheet in your own prototypes like this:

```html
<link rel="stylesheet" href="bluemix-components.css" charset="utf-8">
```

Using these CSS files assume that you follow the same file structure to reference the relative paths for font files (see [File Structure](#file-structure) above).

### `demo`

These are files specifically used for demonstration purposes. These are meant to be used when running this source code locally with `npm run dev`.

* `demo.css` - extra styles for showing typography, color swatches and major-second scale.
* `demo.js` - a ready-built script that's transpiled from `app.js`
* `demo.js.map` - sourcemap file for `demo.js`, used for debugging
* `views/demo-all.dust` - HTML file that is rendered when running `npm run dev` or `npm run serve`
* `views/demo-es5.html` - HTML file that demonstrates usage of `bluemix-components.js`

### `js`

This is where we keep ES5-compatible JavaScript files for  prototyping.

* `bluemix-components.js` is transpiled from `index.js`.
* `bluemix-components.min.js` is a minified version of the above JS file.

To use this, include it as an external script in your own prototypes like this:

```html
<script type="text/javascript" src="bluemix-components.js"></script>
```
