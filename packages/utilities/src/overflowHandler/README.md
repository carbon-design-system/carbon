# overflowHandler

`overflowHandler` is a framework-agnostic utility for handling the truncation of
a list of items.

## Getting started

Here's a quick example to get you started using web components with Lit.

```ts
// App.ts
import { html } from 'lit';
import { createOverflowHandler } from '@carbon/utilities';

let handler;

const initializeHandler = () => {
  if (handler) {
    console.log('Handler found. Removing and re-initiating...');
    document.removeEventListener('DOMContentLoaded', initializeHandler);
    handler.disconnect();
    return;
  }

  // initiate the handler only when the DOM settles and is stable, so that the items are at the correct dimensions before initialization.
  requestAnimationFrame(() => {
    handler = createOverflowHandler({
      container: document.querySelector('#visible-items'),
      maxVisibleItems: 5,
      onChange: (visibleItems, hiddenItems) => {
        console.log(visibleItems, hiddenItems);
      },
      dimension: 'width',
    });
  });
};

document.addEventListener('DOMContentLoaded', initializeHandler);

return html`
  <style>
    /* Scope if necessary */
    [data-hidden]:not([data-fixed]) {
      display: none;
    }
  </style>
  <div id="visible-items">
    <button>button 1</button>
    <button>button 2</button>
    <button>button 3</button>
    <button>button 4</button>
    <button>button 5</button>
    <button>button 6</button>
  </div>
`;
```

Once the handler has been instantiated, an event handler is created that checks
the width of the container when it's rendered or resized. The handler adds the
necessary `data-hidden` attributes to the items that should be hidden. These
items can then be hidden using the following style in the implementation.

In the above example, the `#visible-items` container will be monitored for
changes in `width`. When the container is sized smaller than the amount of
button elements capable of fitting inside, the `data-hidden` attribute will be
added to the buttons that are considered "hidden". When the size of the
container changes the number of visible items, the `onChange` handler will be
called. `onChange` provides an array of hidden and visible nodes in the callback
signature. Since the `maxVisibleItems` parameter has been set to `5` there
should only be 5 buttons visible when the handler runs.

## Attribute definitions

- `data-hidden` - Added by the handler on the items that are meant to be hidden.
- `data-fixed` - Items that have this attribute added will opt out of all
  overflow activities and will be outside the scope of the handler.
- `data-offset` - Is added to the offset element that contains all the
  overflowing elements within it, such as popovers, overflow menus, tooltips,
  modals, etc.

## Options

| Option            | Type                                  | Default   | Description                                                                                                                                                                                 |
| ----------------- | ------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `container`       | `HTMLElement`                         | —         | The container element whose children are managed for overflow.                                                                                                                              |
| `onChange`        | `(visibleItems, hiddenItems) => void` | —         | Called whenever the set of visible or hidden items changes.                                                                                                                                 |
| `dimension`       | `'width' \| 'height'`                 | `'width'` | The axis to measure overflow along.                                                                                                                                                         |
| `maxVisibleItems` | `number`                              | —         | Hard cap on the number of visible items regardless of available space.                                                                                                                      |
| `gap`             | `number`                              | `0`       | The `column-gap` (width) or `row-gap` (height) of the container in pixels. Pass this when the container uses a flex or grid gap so each item's cost includes the space after it.            |
| `offsetValue`     | `number`                              | `0`       | Pixels to reserve from the container's available space, causing overflow to trigger earlier. Useful when an element inside the container (e.g. a "show more" button) needs guaranteed room. |

## Item sizing

Each item's effective size is calculated based on the dimension:

```
effectiveSize = boundingClientRect[dimension]
              + margin (inline-start + inline-end)   ← width
              + margin (block-start + block-end)     ← height
              + gap
```

This means the `gap` and any CSS padding or margin on the item are already
factored in. Re-initialize the handler if any of these values change
dynamically.

## Using `gap`

Pass the container's `column-gap` (for `width`) or `row-gap` (for `height`) as
the `gap` option. CSS gap is only between items, so the handler does not count a
gap after the last visible item.

```ts
handler = createOverflowHandler({
  container: document.querySelector('#toolbar'),
  gap: 8, // matches gap: 8px on the flex container
  onChange: (visibleItems, hiddenItems) => { ... },
});
```

## Using `offsetValue`

Use `offsetValue` to reserve space inside the container before items are fitted.
The value is subtracted from the available space, so overflow is triggered that
many pixels earlier. This is useful when an element within the container (such
as a "show more" button or overflow indicator) must always have room even when
the container is nearly full.

```ts
handler = createOverflowHandler({
  container: document.querySelector('#toolbar-items'),
  offsetValue: 48, // reserve 48px for a "+N more" button inside the container
  onChange: (visibleItems, hiddenItems) => { ... },
});
```

## Custom Handling via `onChange`

Using the `onChange` callback, you have access to an array holding the visible
and hidden elements. This gives you the flexibility to access the hidden items
and render them elsewhere, such as a modal or popover.

## Re-initialization guidelines

The handler needs to be re-initialized whenever items are added or removed. Item
sizes are remeasured on each update, so a container resize is enough after
padding, margin, gap, or offset size changes. If those change without a resize,
call `disconnect()` and create a new handler.

## Example implementation

For example implementation, please refer to the example code in
[Storybook](https://ibm-products-web-components.netlify.app/).
