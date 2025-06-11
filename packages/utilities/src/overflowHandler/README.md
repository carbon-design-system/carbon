# overflowHandler

`overflowHandler` is a framework-agnostic utility for handling the truncation of
a list of items.

## Getting started

Here's a quick example to get you started.

```js
import { createOverflowHandler } from '@carbon/utilities';

createOverflowHandler({
  container: HTMLElement,
  maxVisibleItems?: number,
  onChange: (visibleItems: HTMLElement[], hiddenItems: HTMLElement[]) => void,
  dimension: 'width': 'height',
});
```

Once the handler has been instantiated, an event handler is created that checks
the width of the container when it's rendered or resized. The handler adds the
necessary `data-hidden` attributes to the items that should be hidden. These
items can then be hidden using the following style in the implementation.

```css
/* Scope if necessary */
[data-hidden]:not([data-fixed]) {
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

## Custom Handling via `onChange`

Using the `onChange` callback, you have access to an array holding the visible
and hidden elements. This gives you the flexibility to access the hidden items
and render them elsewhere, such as a modal or popover.

## Re-initialization guidelines

The handler needs to be re-initialized whenever items are added or removed, when
an item changes its width dynamically, or when the offset changes its width
dynamically, to update the overflow with the new sizes.

## Example implementation

For example implementation, please refer to the example code in
[Storybook](https://ibm-products-web-components.netlify.app/?path=/docs/experimental-utilities-overflowhandler--docs).
