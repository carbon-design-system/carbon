/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { makeDraggable } from '../makeDraggable';
import { fireEvent } from '@testing-library/react';

function createDraggableElement(options = {}) {
  const el = document.createElement('div');
  el.style.position = 'absolute';

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
  let originalDOMMatrix;
  beforeAll(() => {
    originalDOMMatrix = global.DOMMatrix;
    global.DOMMatrix = class {
      constructor(transform) {
        if (typeof transform === 'string' && transform.startsWith('matrix')) {
          const values = transform
            .match(/matrix.*\((.+)\)/)[1]
            .split(',')
            .map(parseFloat);
          this.m41 = values[4];
          this.m42 = values[5];
        } else {
          this.m41 = 0;
          this.m42 = 0;
        }
      }
    };
  });
  afterAll(() => {
    global.DOMMatrix = originalDOMMatrix;
  });
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
    expect(el.style.transform).toBe('translate(8px, 0px)');
  });

  it('should move element with arrowUp with default dragStep value', () => {
    const { el, focusableHandle } = createDraggableElement();
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp' })
    );
    expect(el.style.transform).toBe('translate(0px, -8px)');
  });

  it('should move element with arrowLeft with default dragStep value', () => {
    const { el, focusableHandle } = createDraggableElement();
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft' })
    );
    expect(el.style.transform).toBe('translate(-8px, 0px)');
  });

  it('should move element with arrowDown with default shiftDragStep value', () => {
    const { el, focusableHandle } = createDraggableElement();
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true })
    );
    expect(el.style.transform).toBe('translate(32px, 0px)');
  });

  it('should move element with arrow keys(dragStep)', () => {
    const { el, focusableHandle } = createDraggableElement({ dragStep: 10 });
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
    focusableHandle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight' })
    );
    expect(el.style.transform).toBe('translate(10px, 0px)');

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      );
      expect(el.style.transform).toBe('translate(0px, 0px)');
    }, 0);

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown' })
      );
      expect(el.style.transform).toBe('translate(0px, 10px)');
    }, 0);

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp' })
      );
      expect(el.style.transform).toBe('translate(0px, 0px)');
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
    expect(el.style.transform).toBe('translate(0px, 20px)');

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true })
      );
      expect(el.style.transform).toBe('translate(0px, 0px)');
    }, 0);

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true })
      );
      expect(el.style.transform).toBe('translate(20px, 0px)');
    }, 0);

    setTimeout(() => {
      focusableHandle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', shiftKey: true })
      );
      expect(el.style.transform).toBe('translate(0px, 0px)');
    }, 0);
  });

  it('should move element with mouse drag', () => {
    const { el, handle } = createDraggableElement();
    fireEvent.mouseDown(handle, { clientX: 50, clientY: 50 });
    fireEvent.mouseMove(document, { clientX: 100, clientY: 120 });

    expect(el.style.transform).toBe('translate(50px, 70px)');

    fireEvent.mouseUp(handle);

    fireEvent.mouseMove(document, { clientX: 150, clientY: 200 });

    // After mouseup, the transform should remain unchanged
    expect(el.style.transform).toBe('translate(50px, 70px)');
  });

  it('should preserve existing non-translate transforms during drag', () => {
    const { el, handle } = createDraggableElement();

    // Set an initial transform with scale and rotate
    el.style.transform = 'scale(1.5) rotate(45deg)';

    // Start dragging
    fireEvent.mouseDown(handle, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 50, clientY: 30 });

    // The transform should include translate but preserve scale and rotate
    const transform = el.style.transform;
    expect(transform).toContain('translate(50px, 30px)');
    expect(transform).toContain('scale(1.5)');
    expect(transform).toContain('rotate(45deg)');

    fireEvent.mouseUp(handle);
  });
});
