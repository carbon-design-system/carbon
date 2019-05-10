### HTML

No changes.

### SCSS

The `_select.scss` file is now located at `src/components/select/_select.scss`.
You will need to update any `@import` statements for this file to reflect this
change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/select/select';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/select/select';
```

Quite a few class names have changed. See table below.

| Old Class              | New Class           | Note    |
| ---------------------- | ------------------- | ------- |
| bx--select\_\_optgroup | bx--select-optgroup | Changed |
| bx--select\_\_option   | bx--select-option   | Changed |
