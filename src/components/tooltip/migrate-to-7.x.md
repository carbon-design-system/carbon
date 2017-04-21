### HTML

There are now two major variations of this component. The original tooltip is now in `tooltip--simple.html`. You should only use this variation if the contents of tooltip are text and limited to a single line. Multi-line is not supported. Previously `[data-tooltip]` contained the tooltip's text. It's been renamed to `[data-tooltip-text]`.

`tooltip.html` contains the new and improved component. This variation not only supports multi-line content but also icons and other elements. For full details on usage see the tooltip README and `tooltip.html` files.

### SCSS

The `_tooltip.scss` file is now located at `src/components/tooltip/_tooltip.scss`. You will need to update any `@import` statements for this file to reflect this change.

**New**: 
```scss
@import 'path_to_node_modules/carbon-components/src/components/tooltip/tooltip';
```

**Old**: 
```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/tooltip/tooltip;
```

`.bx--tooltip__top` and `.bx--tooltip__bottom` are now `.bx--tooltip--simple__top` and `.bx--tooltip--simple__bottom`

### JavaScript

The old tooltip variation, which is now `tooltip--simple.html`, did not have any JavaScript. However, the new version does. This includes `show()`, `hide()`, and `release()` methods.
