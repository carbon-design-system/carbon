# overflowHandler

`overflowHandler` is a framework-agnostic utility for handling the truncation of
a list of items.

## Getting started

Here's a quick example to get you started.

```js
import { createOverflowHandler } from '@carbon/utilities';

createOverflowHandler({
  container, // The document node that holds the items. HTMLElement
  maxVisibleItems, // Maximum number of visible items. If provided, only this number of items will be shown. number | undefined
  onChange: (visibleItems: HTMLElement[], hiddenItems: HTMLElement[]) => void, // Callback function invoked when the visible and hidden items change.
  dimension, // The dimension to consider for overflow calculations. "width" | "height" | undefined
});
```

The only required argument necessary to consume this utility is `container`.
Once the handler has been instantiated, an event handler is created that checks
the width of the container when it's rendered or resized. The handler adds the
necessary `data-hidden` attributes to the items that should be hidden. These
items can then be hidden using the following style in the implementation.

```css
[data-hidden]:not([data-fixed]) { // scope if needed
  display: none;
}
```

## Attribute definitions

- `data-hidden` - Added by the handler on the items that are meant to be hidden.
- `data-fixed` - Items that have this attribute added will opt out of all
  overflow activities and will be outside the scope of the handler.
- `data-offset` - Is added to the offset element that contains all the
  overflowing elements within it, such as popovers, overflow menus, tooltips,
  modals, etc.

Using the `onChange` callback, you have access to an array holding the visible
and hidden elements. This gives you the flexibility to access the hidden items
and render them elsewhere, such as a modal or popover.

The handler needs to be re-initialized whenever items are added or removed, when
an item changes its width dynamically, or when the offset changes its width
dynamically, to update the overflow with the new sizes.

For example implementation, please refer to the example code in
[Storybook](https://ibm-products-web-components.netlify.app/?path=/docs/experimental-utilities-overflowhandler--docs).
