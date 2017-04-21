### HTML

All data-attributes containing the words `inline-left-nav` have been changed to `interior-left-nav`.

| Old                           | New                        |
|------------------------------------|------------------------------------|
| data-inline-left-nav | data-interior-left-nav |
| data-inline-left-nav-list | data-interior-left-nav-list |
| data-inline-left-nav-collapse | data-interior-left-nav-collapse |
| data-inline-left-nav-nested-item |  data-interior-left-nav-nested-item |
| data-inline-left-nav-nested-list | data-interior-left-nav-nested-list |
| data-inline-left-nav-with-children |  data-interior-left-nav-with-children |
| data-inline-left-nav-item | data-interior-left-nav-item |
| data-inline-left-nav-item-link | data-interior-left-nav-item-link |

### SCSS

The `_interior-left-nav.scss` file is now located at `src/components/interior-left-nav/_interior-left-nav.scss`. You will need to update any `@import` statements for this file to reflect this change.

**New**: 
```scss
@import 'path_to_node_modules/carbon-components/src/components/interior-left-nav/interior-left-nav';
```

**Old**: 
```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/interior-left-nav/interior-left-nav';
```

All classnames containing the words `inline-left-nav` have been changed to `interior-left-nav`.

| Old                           | New                        |
|------------------------------------|------------------------------------|
| bx--inline-left-nav | bx--interior-left-nav |
| bx--inline-left-nav--collapseable | bx--interior-left-nav--collapseable |
| bx--inline-left-nav__icon | bx--interior-left-nav__icon |
| bx--inline-left-nav-collapse |  bx--interior-left-nav-collapse |
| bx--inline-left-nav-collapse__link | bx--interior-left-nav-collapse__link |
| bx--inline-left-nav-collapse__arrow |  bx--interior-left-nav-collapse__arrow |

### JavaScript

The `InlineLeftNav` class has been renamed to `InteriorLeftNav`
