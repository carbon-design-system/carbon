### HTML

Checkbox HTML that does not use SVG is no longer supported and has been removed.
All checkboxes must use SVG icons to ensure browser compatibility.

### SCSS

The `_checkbox.scss` file is now located in __src/components/checkbox__. You'll need to update any `@import` statements for this file to reflect this change.

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/checkbox/checkbox';
```

Almost all checkbox classes have been changed to use less BEM underscore syntax.
To use the newest checkbox styles, it will be best to copy and paste the latest checkbox HTML provided by the design-system.
