# makeDraggable

`makeDraggable` is a framework-agnostic utility that enables dragging an HTML
element via mouse or keyboard. Developers can specify the target element, a drag
handle, a focusable element for keyboard interaction, and pixel values for
movement with arrow or Shift + arrow keys.

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

const draggableElement = () => {
  let draggable = makeDraggable({
    el: dialogEle,
    dragHandle: headerEle,
    focusableDragHandle: dragBtn,
  });

  // Add visual and accessibility support
  const onDragStart = () => {
    dialogEle.classList.add('is-dragging');
    dialogEle.setAttribute('aria-label', 'Picked up the draggable Dialog');
  };

  const onDragEnd = () => {
    dialogEle.classList.remove('is-dragging');
    dialogEle.setAttribute('aria-label', 'Draggable Dialog was dropped');
  };

  dialogEle.addEventListener('dragstart', onDragStart);
  dialogEle.addEventListener('dragend', onDragEnd);

  // Clean up attached event listeners
  return () => {
    dialogEle.removeEventListener('dragstart', onDragStart);
    dialogEle.removeEventListener('dragend', onDragEnd);
    draggable.cleanup();
  };
};
```

## React Example implementation

For React implementation, please refer to the example code in
[Storybook](https://ibm-products.carbondesignsystem.com/?path=/docs/utilities-makedraggable--overview).
