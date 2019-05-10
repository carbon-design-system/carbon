### SCSS

The `_button.scss` file is now located at `src/components/button/_button.scss`.
You will need to update any `@import` statements for this file to reflect this
change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/button/button';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/button/button';
```

The `.bx--sets-of-buttons` class has been removed and is no longer in use.
Secondary and Primary buttons are meant to be paired together in that order
according to UX guidelines. When paired as siblings, Primary buttons will have a
`margin-left: 1rem` or `16px`.

The `.bx--btn--right-icon__icon` class has been replaced by `.bx--btn__icon`.

SCSS Extends for buttons have been removed and are no longer in use. SCSS
Variables specific to Button have been removed and are no longer in use.

SCSS Mixins have been reduced. The following mixins have been removed:

- @mixin btn--browser-fixes (CSS browser fixes applied directly to element and
  class selectors)
- @mixin btn--primary (replaced by @mixin button-theme)
- @mixin btn--secondary (replaced by @mixin button-theme)
- @mixin btn--danger (replaced by @mixin button-theme)
