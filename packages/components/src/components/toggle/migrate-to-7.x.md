### HTML

Toggle and other form components are wrapped with the `.bx--form-item` element.

### SCSS

The `_toggle.scss` file is now located at `src/components/toggle/_toggle.scss`.
You will need to update any `@import` statements for this file to reflect this
change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/toggle/toggle';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/toggle/toggle';
```

All classes are the same.
