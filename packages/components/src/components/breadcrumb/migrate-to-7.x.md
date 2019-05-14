### HTML

The `bx--breadcrumb--lg` modifier class has been removed in `7.x` and is no
longer in use.

### SCSS

The `_breadcrumb.scss` file is now located at
`src/components/breadcrumb/_breadcrumb.scss`. You will need to update any
`@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/breadcrumb/breadcrumb';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/breadcrumb/breadcrumb';
```
