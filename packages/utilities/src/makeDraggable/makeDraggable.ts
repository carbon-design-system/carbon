/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
interface DraggableProps {
  //The HTML element to move.
  el: HTMLElement;
  //Optional HTML element to initiate the drag (e.g., header).
  dragHandle?: HTMLElement;
  //Optional HTML element to focus on drag for keyboard interaction (e.g., Drag Icon).
  focusableDragHandle?: HTMLElement;
  //Optional pixel value that defines the distance to move when dragging with arrow keys. (default:8px)
  dragStep?: number;
  //Optional pixel value that defines the distance to move when dragging with shift+arrow keys. (default:32px)
  shiftDragStep?: number;
}
/**
 * Makes a given element draggable using a handle element.
 *@param draggable - object which accepts el and optional attributes handle,focusableInHandle,dragStep and shiftDragStep
 */

export function makeDraggable({
  el,
  dragHandle,
  focusableDragHandle,
  dragStep,
  shiftDragStep,
}: DraggableProps) {
  const computedStyle = window.getComputedStyle(el);
  if (dragHandle) {
    dragHandle.style.cursor = 'move';
    el.style.cursor = 'default';
  } else {
    el.style.cursor = 'move';
  }
  const position = computedStyle.position;

  if (
    position !== 'absolute' &&
    position !== 'relative' &&
    position !== 'fixed'
  ) {
    el.style.position = 'relative';
  }

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  function dispatch(type: string, detail: any = {}) {
    el.dispatchEvent(new CustomEvent(type, { detail, bubbles: true }));
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      isDragging = !isDragging;
    }
    if (isDragging) {
      dispatch('dragstart', { keyboard: true });
    } else {
      dispatch('dragend', { keyboard: true });
    }

    if (!isDragging) {
      return;
    }
    const distance = e.shiftKey ? (shiftDragStep ?? 32) : (dragStep ?? 8);
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        break;
      case 'ArrowLeft':
        el.style.left = `${el.offsetLeft - distance}px`;
        break;
      case 'ArrowRight':
        el.style.left = `${el.offsetLeft + distance}px`;
        break;
      case 'ArrowUp':
        el.style.top = `${el.offsetTop - distance}px`;
        break;
      case 'ArrowDown':
        el.style.top = `${el.offsetTop + distance}px`;
        break;
    }
  }

  function onMouseDown(e: MouseEvent) {
    const isTargetInHandle = dragHandle
      ? dragHandle.contains(e.target as Node)
      : el.contains(e.target as Node);

    if (!isTargetInHandle) {
      return;
    }

    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    isDragging = true;
    dispatch('dragstart', { mouse: true });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, { once: true });
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) {
      return;
    }
    el.style.left = `${e.clientX - offsetX}px`;
    el.style.top = `${e.clientY - offsetY}px`;
  }

  function onMouseUp() {
    if (!isDragging) {
      return;
    }
    isDragging = false;
    dispatch('dragend', { mouse: true });

    document.removeEventListener('mousemove', onMouseMove);
  }
  if (dragHandle) {
    dragHandle.addEventListener('mousedown', onMouseDown);
  } else {
    el.addEventListener('mousedown', onMouseDown);
  }
  focusableDragHandle?.addEventListener('keydown', onKeyDown);
}
