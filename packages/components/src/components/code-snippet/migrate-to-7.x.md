### HTML

No changes.

### SCSS

The `_code-snippet.scss` file is now located at
`src/components/code-snippet/_code-snippet.scss`. You will need to update any
`@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/code-snippet/code-snippet';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/code-snippet/code-snippet';
```

No changes to classes made.
