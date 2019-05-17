### HTML

The `form` component has been simplified. `.bx--form` has been removed since it
was not providing anything significant. Your forms should still be contained in
a `<form>` element but the `.bx--form` class is unneeded. The `.bx--form__row`
and `.bx--form__row--column` classes for form layout have been removed. Form
styles will no longer dictate default layouts. See HTML docs for more details

The form component supplies 3 classes.

- `.bx--form-item`
- `.bx--label`
- `.bx--form-requirement`

Styles for form components such as `text-input` are contained in their own
component files.

For full usage guidelines of the new HTML see the component README file.

### SCSS

The `_form.scss` file is now located at `src/components/form/_form.scss`. You
will need to update any `@import` statements for this file to reflect this
change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/form/form';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/form/form';
```

Quite a few class names have changed. See table below.

| Old Class                | New Class            | Note    |
| ------------------------ | -------------------- | ------- |
| bx--form\_\_row-item     | bx--form-item        | Changed |
| bx--form\_\_label        | bx--label            | Changed |
| bx--form\_\_requirements | bx--form-requirement | Changed |
| bx--form\_\_row          | N/A                  | Removed |
| bx--form\_\_row--column  | N/A                  | Removed |
|                          | bx--fieldset         | Added   |
