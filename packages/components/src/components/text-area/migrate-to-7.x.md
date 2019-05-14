### HTML

Text Area and other form components now make use of common form HTML and CSS.
See form README for details.

### SCSS

The `_text-area.scss` file is now located at
`src/components/text-area/_text-area.scss`. You will need to update any
`@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/text-area/text-area';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/text-area/text-area';
```

| Old Class             | New Class     | Note    |
| --------------------- | ------------- | ------- |
| bx--textarea\_\_input | bx--text-area | Changed |
