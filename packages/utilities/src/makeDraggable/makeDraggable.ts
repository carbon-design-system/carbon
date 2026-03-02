/**
 * Copyright IBM Corp. 2025, 2025
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
  let offsetX = 0;
  let offsetY = 0;

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

    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    isDragging = true;
    dispatch('dragstart', { mouse: true });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, { once: true });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    el.style.left = `${e.clientX - offsetX}px`;
    el.style.top = `${e.clientY - offsetY}px`;
  };

  const onMouseUp = () => {
    if (!isDragging) {
      return;
    }
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
