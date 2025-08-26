# makeDraggable

The `makeDraggable` is a framework-agnostic javaScript utility that can be used
to drag any HTML element by using either mouse or keyboard interactions. It
allows developers to specify an HTML element as a required attribute to be
moved, optional HTML element to initiate the drag(e.g., a header), optional HTML
element to focus on drag for keyboard interaction (e.g., an icon) and an
optional pixel value that defines the distance to move when dragging with arrow
keys (default: 8px) and shift arrow keys (default: 32px).

## Getting started

Here's a quick example to get you started.

```html
<div id="draggableDialog" class="draggable__div">
  <div id="dialogHeader" class="draggable__div-header">
    <button id="dragButton" aria-describedby="drag-instructions">Drag</button>
    <span id="drag-instructions" class="sr-only">
      To pick up the draggable item, press Enter. While dragging, use the arrow
      keys to move the item. Press Enter again to drop.
    </span>
  </div>
  <div class="draggable__div-body">
    <p>This server has 150 GB of block storage remaining.</p>
  </div>
</div>
```

```ts
import { makeDraggable } from '@carbon/utilities';

const dialogEle = document.getElementById('draggableDialog');
const headerEle = document.getElementById('dialogHeader');
const dragBtn = document.getElementById('dragButton');

makeDraggable({
  el: dialogEle,
  dragHandle: headerEle,
  focusableDragHandle: dragBtn,
});

// Add visual and accessibility support
dialogEle.addEventListener('dragstart', () => {
  dialogEle.classList.add('is-dragging');
  dialogEle.setAttribute('aria-label', 'Picked up the draggable Dialog');
});

dialogEle.addEventListener('dragend', () => {
  dialogEle.classList.remove('is-dragging');
  dialogEle.setAttribute('aria-label', 'Draggable Dialog was dropped');
});
```

## React Example implementation

For react implementation, please refer to the example code in
[Storybook](https://ibm-products.carbondesignsystem.com/?path=/docs/utilities-makedraggable--overview).
