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
      constructor(init) {
        [this.a, this.b, this.c, this.d, this._e, this._f] = Array.isArray(init)
          ? init
          : typeof init === 'string' && init.startsWith('matrix')
            ? init
                .match(/matrix.*\((.+)\)/)[1]
                .split(',')
                .map(parseFloat)
            : [1, 0, 0, 1, 0, 0];
      }
      get e() {
        return this._e;
      }
      set e(v) {
        this._e = v;
      }
      get f() {
        return this._f;
      }
      set f(v) {
        this._f = v;
      }
      get m41() {
        return this._e;
      }
      set m41(v) {
        this._e = v;
      }
      get m42() {
        return this._f;
      }
      set m42(v) {
        this._f = v;
      }
      multiply(m) {
        const r = new global.DOMMatrix();
        r.a = this.a * m.a + this.c * m.b;
        r.b = this.b * m.a + this.d * m.b;
        r.c = this.a * m.c + this.c * m.d;
        r.d = this.b * m.c + this.d * m.d;
        r._e = this.a * m.e + this.c * m.f + this.e;
        r._f = this.b * m.e + this.d * m.f + this.f;
        return r;
      }
      toString() {
        return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`;
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

    // Start with a matrix that represents a 45deg rotation with 1.5 scaling.
    // matrix(a, b, c, d, e, f), where e and f are translation, so `0, 0` means
    // no offset. Dragging should preserve the existing rotation and scale terms
    // and only update translation.
    el.style.transform = 'matrix(1.06066, 1.06066, -1.06066, 1.06066, 0, 0)';

    // Start dragging
    fireEvent.mouseDown(handle, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 50, clientY: 30 });

    // The transform should preserve the base matrix (a,b,c,d) and add translation (e,f)
    // Expected: matrix(1.06066, 1.06066, -1.06066, 1.06066, 50, 30)
    expect(el.style.transform).toBe(
      'matrix(1.06066, 1.06066, -1.06066, 1.06066, 50, 30)'
    );

    fireEvent.mouseUp(handle);
  });
});
