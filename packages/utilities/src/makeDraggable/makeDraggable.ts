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

  let baseMatrix: DOMMatrix | null = null;

  /**
   * Syncs position and extracts base matrix from computed style.
   * Reads from getComputedStyle() to include all transform sources (inline, classes, etc.).
   */
  const syncTransformState = () => {
    const computedStyle = window.getComputedStyle(el);
    const transformString = computedStyle.transform;

    if (!transformString || transformString === 'none') {
      currentX = 0;
      currentY = 0;
      baseMatrix = null;
      return;
    }

    const matrix = new DOMMatrix(transformString);

    currentX = matrix.m41;
    currentY = matrix.m42;

    const isIdentityMatrix =
      matrix.a === 1 &&
      matrix.b === 0 &&
      matrix.c === 0 &&
      matrix.d === 1 &&
      matrix.e === 0 &&
      matrix.f === 0;

    if (isIdentityMatrix) {
      baseMatrix = null;
    } else {
      baseMatrix = new DOMMatrix([
        matrix.a,
        matrix.b,
        matrix.c,
        matrix.d,
        0,
        0,
      ]);
    }
  };

  syncTransformState();

  /**
   * Applies transform by combining translation with base matrix using matrix multiplication.
   */
  const applyTransform = (x: number, y: number) => {
    if (baseMatrix) {
      const translationMatrix = new DOMMatrix();
      translationMatrix.m41 = x;
      translationMatrix.m42 = y;

      const combined = translationMatrix.multiply(baseMatrix);
      el.style.transform = combined.toString();
    } else {
      el.style.transform = `translate(${x}px, ${y}px)`;
    }
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
        syncTransformState();
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

    syncTransformState();

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

    const dx = e.clientX - initialMouseX;
    const dy = e.clientY - initialMouseY;

    applyTransform(currentX + dx, currentY + dy);
  };

  const onMouseUp = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }

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

  /**
   * Re-initialize the draggable position from the element's current computed transform.
   * Call this if the element has been repositioned externally (e.g., via CSS animation,
   * class changes, or other scripts) to prevent position jumps on the next drag.
   */
  const init = () => {
    syncTransformState();
  };

  return {
    cleanup: draggableCleanup,
    init,
  };
};
