### HTML

No structural changes. However, class names have been changed.

### SCSS

The `_dropdown.scss` file is now located at
`src/components/dropdown/_dropdown.scss`. You will need to update any `@import`
statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/dropdown/dropdown';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/dropdown/dropdown';
```

Quite a few class names have changed. See table below.

| Old Class                 | New Class         |
| ------------------------- | ----------------- |
| bx--dropdown\_\_menu-text | bx--dropdown-text |
| bx--dropdown\_\_list      | bx--dropdown-list |
| bx--dropdown\_\_list-item | bx--dropdown-item |
| bx--dropdown\_\_link      | bx--dropdown-link |

### JavaScript

No changes.
