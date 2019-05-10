### HTML

{ Migration details about using new HTML for a component }

### SCSS

The `_breadcrumb.scss` file is now located at
**src/components/breadcrumb/\_breadcrumb.scss**. You will need to update any
`@import` statements for this file to reflect this change.

```scss
@import 'path_to_node_modules/carbon-components/src/components/breadcrumb/breadcrumb';
```

{ Other migration details about using new SCSS for a component }

| Old Class         | New Class     | Note    |
| ----------------- | ------------- | ------- |
| bx--class         | bx--new-class | Changed |
| bx--text\_\_input |               | Removed |
|                   | bx--new-class | Added   |

### JavaScript

{ Migration details about using new SCSS for a component }
