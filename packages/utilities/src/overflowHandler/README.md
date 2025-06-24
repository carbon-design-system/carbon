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

## Custom Handling via `onChange`

Using the `onChange` callback, you have access to an array holding the visible
and hidden elements. This gives you the flexibility to access the hidden items
and render them elsewhere, such as a modal or popover.

## Re-initialization guidelines

The handler needs to be re-initialized whenever items are added or removed, when
an item changes its width dynamically, or when the offset element's width
changes dynamically, to update the overflow with the new sizes.

## Example implementation

For example implementation, please refer to the example code in
[Storybook](https://ibm-products-web-components.netlify.app/?path=/docs/experimental-utilities-overflowhandler--docs).
