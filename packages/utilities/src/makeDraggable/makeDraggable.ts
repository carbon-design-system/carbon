/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
interface DraggableProps {
  /**
   * HTML element to move.
   */
  el: HTMLElement;
  /**
   * HTML element to initiate the drag (e.g., header).
   */
  dragHandle?: HTMLElement;
  /**
   * HTML element to focus on drag for keyboard interaction (e.g., Drag Icon).
   */
  focusableDragHandle?: HTMLElement;
  /**
   * Pixel value that defines the distance to move when dragging with arrow
   * keys.
   */
  dragStep?: number;
  /**
   * Pixel value that defines the distance to move when dragging with
   * shift+arrow keys.
   */
  shiftDragStep?: number;
}

interface EventDetail {
  dragstart: { keyboard?: boolean; mouse?: boolean };
  dragend: { keyboard?: boolean; mouse?: boolean };
}

/**
 * Makes a given element draggable using a handle element.
 *@param draggable - object which accepts el and optional attributes handle,focusableInHandle,dragStep and shiftDragStep
 */
export const makeDraggable = ({
  el,
  dragHandle,
  focusableDragHandle,
  dragStep,
  shiftDragStep,
}: DraggableProps) => {
  if (dragHandle) {
    dragHandle.style.cursor = 'move';
    el.style.cursor = 'default';
  } else {
    el.style.cursor = 'move';
  }

  let isDragging = false;
  let currentX = 0;
  let currentY = 0;
  let initialMouseX = 0;
  let initialMouseY = 0;
  let otherTransforms = '';

  // Initialize current position from computed style
  const initialStyle = window.getComputedStyle(el);
  const initialMatrix = new DOMMatrix(initialStyle.transform);
  currentX = initialMatrix.m41;
  currentY = initialMatrix.m42;

  // Helper function to extract non-translate transforms from inline style
  const extractOtherTransforms = (transformString: string): string => {
    if (!transformString || transformString === 'none') {
      return '';
    }
    const withoutTranslate = transformString.replace(
      /translate(3d|X|Y)?\([^)]+\)\s*/g,
      ''
    );
    return withoutTranslate.trim();
  };

  // Helper function to apply transform with preserved other transforms
  const applyTransform = (x: number, y: number) => {
    const translatePart = `translate(${x}px, ${y}px)`;
    el.style.transform = otherTransforms
      ? `${translatePart} ${otherTransforms}`
      : translatePart;
  };

  const dispatch = <T extends keyof EventDetail>(
    type: T,
    detail: EventDetail[T]
  ) => {
    const eventInit: CustomEventInit<EventDetail[T]> = {
      detail,
      bubbles: true,
    };
    el.dispatchEvent(new CustomEvent(type, eventInit));
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      isDragging = !isDragging;
      if (isDragging) {
        otherTransforms = extractOtherTransforms(el.style.transform);
        dispatch('dragstart', { keyboard: true });
      } else {
        dispatch('dragend', { keyboard: true });
      }
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
        currentX -= distance;
        applyTransform(currentX, currentY);
        break;
      case 'ArrowRight':
        currentX += distance;
        applyTransform(currentX, currentY);
        break;
      case 'ArrowUp':
        currentY -= distance;
        applyTransform(currentX, currentY);
        break;
      case 'ArrowDown':
        currentY += distance;
        applyTransform(currentX, currentY);
        break;
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    const target = e.target;
    if (!(target instanceof Node)) {
      return;
    }

    const isTargetInHandle = dragHandle
      ? dragHandle.contains(target)
      : el.contains(target);

    if (!isTargetInHandle) {
      return;
    }

    // Extract other transforms before starting drag
    otherTransforms = extractOtherTransforms(el.style.transform);

    // Store the mouse position at the start of the drag
    initialMouseX = e.clientX;
    initialMouseY = e.clientY;
    isDragging = true;
    dispatch('dragstart', { mouse: true });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, { once: true });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }

    // Calculate the change in mouse position from the start
    const dx = e.clientX - initialMouseX;
    const dy = e.clientY - initialMouseY;

    // Add that change to the element's original translation
    applyTransform(currentX + dx, currentY + dy);
  };

  const onMouseUp = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }

    // Update current position to final position after drag
    const dx = e.clientX - initialMouseX;
    const dy = e.clientY - initialMouseY;
    currentX += dx;
    currentY += dy;

    isDragging = false;
    dispatch('dragend', { mouse: true });

    document.removeEventListener('mousemove', onMouseMove);
  };
  if (dragHandle) {
    dragHandle.addEventListener('mousedown', onMouseDown);
  } else {
    el.addEventListener('mousedown', onMouseDown);
  }
  focusableDragHandle?.addEventListener('keydown', onKeyDown);

  const draggableCleanup = () => {
    if (dragHandle) {
      dragHandle.removeEventListener('mousedown', onMouseDown);
    } else {
      el.removeEventListener('mousedown', onMouseDown);
    }
    focusableDragHandle?.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  return {
    cleanup: draggableCleanup,
  };
};
