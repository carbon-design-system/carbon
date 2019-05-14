### HTML

No changes.

### SCSS

The `_list.scss` file is now located at `src/components/list/_list.scss`. You
will need to update any `@import` statements for this file to reflect this
change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/list/list';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/list/list';
```
