### HTML

Structure stays the same but some class names have been changed. See below.

### SCSS

The `_overflow-menu.scss` file is now located at
`src/components/overflow-menu/_overflow-menu.scss`. You will need to update any
`@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/overflow-menu/overflow-menu';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/overflow-menu/overflow-menu';
```

`.bx--overflow-menu__options` is now `.bx--overflow-menu-options` Any `<li>`
inside `.bx--overflow-menu-options` should now have the
`.bx--overflow-menu-options__option` class. `.bx--overflow-menu__btn` is now
`.bx--overflow-menu-options__btn` If you would like to display the menu in the
other direction add `.bx--overflow-menu--flip` to the
`.bx--overflow-menu-options` element.

### JavaScript

Initializing new instances of `OverflowMenu` automatically moves the
`.bx--overflow-menu-options` HTML so that it is appended to the `<body>`. It is
then positioned relative to `.bx--overflow-menu`. This will not change the
visual appearance of the component. However this is extremely useful when an
`overflow-menu` is inside a component with `overflow: hidden;` set. A good
example is the `data-table` component.

If you are targeting `.bx--overflow-menu-options` via it's parent
`.bx--overflow-menu` you'll need to update your code to target the
`.bx--overflow-menu-options` element directly.

This new functionality gives you a new group of options for the `overflow-menu`
component including scope and offset amount. Full documentation is contained in
the component README file.
