### HTML

No changes.

### SCSS

The `_tabs.scss` file is now located at `src/components/tabs/_tabs.scss`. You
will need to update any `@import` statements for this file to reflect this
change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/tabs/tabs';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/tabs/tabs';
```

No class changes.

### JavaScript

All methods for Tab class have been changed to private methods.
