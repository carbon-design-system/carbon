# `js` directory

This is where we keep pre-transpiled JavaScript (ES2015) files and polyfills.

## File Structure

```
js
├── demo
│   └── app.js
├── index.js
└── polyfills
    ├── array-from.js
    ├── custom-event.js
    ├── event-matches.js
    └── object-assign.js

2 directories
```

## Directories & Files

### `demo` directory

This contains a single manifest file, `app.js`, which `import`s modules from bluemix-components and configures the behavior of the modules for demo purposes.

### `polyfills` directory

These are a set of polyfills used for better cross-browser compatibility (IE11, Chrome, Safari, Firefox).

### `index.js`

This is the main ES2015 file that `import`s and `export`s ES2015 class modules used with base-elements and components.

This is the main entry point for our build tasks in `gulp` and `webpack` to transpile ready-built JavaScript files to use for prototyping.

This is also a practical reference file that shows users how to set up their own `index.js` files on their own projects.
