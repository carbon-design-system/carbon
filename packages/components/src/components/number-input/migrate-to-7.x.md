### HTML

Number Input and other form components now use common form HTML and CSS. See
Form README for details.

In general, it will be easiest to simply copy and paste the new HTML to replace
older Number Inputs.

### SCSS

The `_number-input.scss` file is now located at
`src/components/number-input/_number-input.scss`. You will need to update any
`@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/number-input/number-input';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/number-input/number-input';
```

| Old Class                 | New Class  | Note      |
| ------------------------- | ---------- | --------- |
| bx--number                | bx--number | Unchanged |
| bx--number\_\_arrow       |            | Removed   |
| bx--number\_\_icon        |            | Removed   |
| bx--number\_\_arrow--up   | up-icon    | Changed   |
| bx--number\_\_arrow--down | down-icon  | Changed   |
| bx--number\_\_input       |            | Removed   |

### JavaScript

The `handleClick` method is now a private method, so it has been renamed to
`_handleClick`. The `options` property now only contains a `selectorInit`
key/value pair. The `ie` property in `options` has been removed. In general, the
`NumberInput` class does not check for Internet Explorer browsers and relies on
increasing and decreasing the Number input `value` attribute directly. Changing
the `value` attribute is compatible with all browsers.
