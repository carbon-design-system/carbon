/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { makeDraggable } from '../makeDraggable';
import { fireEvent } from '@testing-library/react';

function createDraggableElement(options = {}) {
  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.left = '0px';
  el.style.top = '0px';

  const handle = document.createElement('div');
  const focusableHandle = document.createElement('button');

  el.appendChild(handle);
  el.appendChild(focusableHandle);
  document.body.appendChild(el);

  makeDraggable({
    el,
    dragHandle: handle,
    focusableDragHandle: focusableHandle,
    dragStep: options.dragStep,
    shiftDragStep: options.shiftDragStep,
  });

  return { el, handle, focusableHandle };
}

describe('makeDraggable', () => {
  it('should set cursor style on handle', () => {
    const { el, handle } = createDraggableElement();
    expect(handle.style.cursor).toBe('move');
    expect(el.style.cursor).toBe('default');
  });

  it('should keep position as absolute when already absolute', () => {
    const { el } = createDraggableElement();
    expect(el.style.position).toBe('absolute');
  });

  it('should move element with arrowRight with default dragStep value', () => {
    const { el, focusableHandle } = createDraggableElement();
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight' })
    );
    expect(el.style.left).toBe('8px');
    expect(el.style.top).toBe('0px');
  });

  it('should move element with arrowUp with default dragStep value', () => {
    const { el, focusableHandle } = createDraggableElement();
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp' })
    );
    expect(el.style.left).toBe('0px');
    expect(el.style.top).toBe('-8px');
  });

  it('should move element with arrowLeft with default dragStep value', () => {
    const { el, focusableHandle } = createDraggableElement();
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft' })
    );
    expect(el.style.left).toBe('-8px');
    expect(el.style.top).toBe('0px');
  });

  it('should move element with arrowDown with default shiftDragStep value', () => {
    const { el, focusableHandle } = createDraggableElement();
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true })
    );
    expect(el.style.left).toBe('32px');
    expect(el.style.top).toBe('0px');
  });

  it('should move element with arrow keys(dragStep)', () => {
    const { el, focusableHandle } = createDraggableElement({ dragStep: 10 });
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight' })
    );
    expect(el.style.left).toBe('10px');
    expect(el.style.top).toBe('0px');

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      );
      expect(el.style.left).toBe('0px');
      expect(el.style.top).toBe('0px');
    }, 0);

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown' })
      );
      expect(el.style.top).toBe('10px');
      expect(el.style.left).toBe('0px');
    }, 0);

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp' })
      );
      expect(el.style.top).toBe('0px');
      expect(el.style.left).toBe('0px');
    }, 0);
  });

  it('should move element with shift + arrow keys (shiftDragStep)', () => {
    const { el, focusableHandle } = createDraggableElement({
      shiftDragStep: 20,
    });
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true })
    );
    expect(el.style.top).toBe('20px');
    expect(el.style.left).toBe('0px');

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true })
      );
      expect(el.style.top).toBe('0px');
      expect(el.style.left).toBe('0px');
    }, 0);

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true })
      );
      expect(el.style.top).toBe('0px');
      expect(el.style.left).toBe('20px');
    }, 0);

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true })
      );
      expect(el.style.top).toBe('0px');
      expect(el.style.left).toBe('0px');
    }, 0);
  });

  it('should move element with mouse drag', () => {
    const { el, handle } = createDraggableElement();
    fireEvent.mouseDown(handle, { clientX: 50, clientY: 50 });
    fireEvent.mouseMove(document, { clientX: 100, clientY: 120 });

    expect(el.style.left).toBe('50px');
    expect(el.style.top).toBe('70px');

    fireEvent.mouseUp(handle);

    fireEvent.mouseMove(document, { clientX: 100, clientY: 120 });

    expect(el.style.left).toBe('50px');
    expect(el.style.top).toBe('70px');
  });
});
