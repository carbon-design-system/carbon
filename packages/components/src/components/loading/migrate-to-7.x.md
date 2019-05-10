### HTML

There are now three variations of this component. Default, with a page overlay,
and a small version. No class names have changed.

### SCSS

The `_loading.scss` file is now located at
`src/components/loading/_loading.scss`. You will need to update any `@import`
statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/loading/loading';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/loading/loading';
```

New class `.bx--loading-overlay` wraps a `.bx--loading` component and provides
an overlay for a "full screen" loading scenario.

`bx--loading--small` is a new modifier class to be added with `bx--loading`. It
provides the small version of the loading component for use inside of another
component such as a button.

### JavaScript

`end()` is a method that plays the loading finished animation and then deletes
the element from the DOM.
