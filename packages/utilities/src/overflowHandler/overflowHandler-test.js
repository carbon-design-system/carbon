/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createOverflowHandler } from './overflowHandler';

// Helper to create items with a given size in the specified dimension ('width' or 'height')
const createItems = (sizes, dimension) => {
  return sizes.map((size) => {
    const item = document.createElement('div');
    Object.defineProperty(item, 'getBoundingClientRect', {
      value: () => ({ [dimension]: size }),
    });
    return item;
  });
};

// Helper to set container dimension (clientWidth or clientHeight)
const setContainerDimension = (container, dimension, value) => {
  const prop = dimension === 'width' ? 'clientWidth' : 'clientHeight';
  Object.defineProperty(container, prop, {
    value,
    configurable: true,
    writable: true,
  });
};

describe('createOverflowHandler (width)', () => {
  let container, handler, mockOnChange;

  beforeEach(() => {
    container = document.createElement('div');
    mockOnChange = jest.fn();
  });

  afterEach(() => {
    if (handler) {
      handler.disconnect();
      handler = null;
    }
  });

  describe('Equal sized items (40px each)', () => {
    beforeEach(() => {
      const items = createItems(Array(10).fill(40), 'width');
      container.append(...items);
    });

    test.each([
      [500, 10, 0], // All items fit
      [400, 10, 0], // All items fit perfectly
      [200, 5, 5], // 4 items fit, 6 hidden
      [80, 2, 8], // 1 item fits, 9 hidden
      [0, 0, 10], // No items fit, all hidden
    ])(
      'When container width is %ipx, expect %i visible and %i hidden',
      (width, expectedVisible, expectedHidden) => {
        setContainerDimension(container, 'width', width);
        handler = createOverflowHandler({
          container,
          onChange: mockOnChange,
        });
        if (expectedHidden === 0) {
          expect(mockOnChange).not.toHaveBeenCalled();
        } else {
          expect(mockOnChange).toHaveBeenCalled();
          const [visible, hidden] = mockOnChange.mock.calls[0];
          expect(visible.length).toBe(expectedVisible);
          expect(hidden.length).toBe(expectedHidden);
        }
      }
    );

    test('Respects maxVisibleItems option', () => {
      setContainerDimension(container, 'width', 500);
      handler = createOverflowHandler({
        container,
        maxVisibleItems: 3,
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      expect(visible.length).toBe(3);
      expect(hidden.length).toBe(7);
    });
  });

  describe('Varying sized items (40-60px)', () => {
    beforeEach(() => {
      const items = createItems(
        [40, 50, 60, 40, 50, 60, 40, 50, 60, 40],
        'width'
      );
      container.append(...items);
    });

    test.each([
      [500, 10, 0], // All items fit
      [400, 8, 2], // Fits first 7 items
      [200, 4, 6], // Fits first 3 items
      [80, 2, 8],
      [0, 0, 10],
    ])(
      'When container width is %ipx, expect %i visible and %i hidden',
      (width, expectedVisible, expectedHidden) => {
        setContainerDimension(container, 'width', width);
        handler = createOverflowHandler({
          container,
          onChange: mockOnChange,
        });

        if (expectedHidden === 0) {
          expect(mockOnChange).not.toHaveBeenCalled();
        } else {
          expect(mockOnChange).toHaveBeenCalled();
          const [visible, hidden] = mockOnChange.mock.calls[0];
          expect(visible.length).toBe(expectedVisible);
          expect(hidden.length).toBe(expectedHidden);
        }
      }
    );

    test('Respects maxVisibleItems option', () => {
      setContainerDimension(container, 'width', 500);
      handler = createOverflowHandler({
        container,
        maxVisibleItems: 3,
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      expect(visible.length).toBe(3);
      expect(hidden.length).toBe(7);
    });
  });
});

describe('createOverflowHandler (height)', () => {
  let container, handler, mockOnChange;

  beforeEach(() => {
    container = document.createElement('div');
    mockOnChange = jest.fn();
  });

  afterEach(() => {
    if (handler) {
      handler.disconnect();
      handler = null;
    }
  });

  describe('Varying sized items (40-60px)', () => {
    beforeEach(() => {
      const items = createItems(
        [40, 50, 60, 40, 50, 60, 40, 50, 60, 40],
        'height'
      );
      container.append(...items);
    });

    test.each([
      [500, 10, 0],
      [400, 8, 2],
      [200, 4, 6],
      [80, 2, 8],
      [0, 0, 10],
    ])(
      'When container height is %ipx, expect %i visible and %i hidden',
      (height, expectedVisible, expectedHidden) => {
        setContainerDimension(container, 'height', height);
        handler = createOverflowHandler({
          container,
          dimension: 'height',
          onChange: mockOnChange,
        });
        if (expectedHidden === 0) {
          expect(mockOnChange).not.toHaveBeenCalled();
        } else {
          expect(mockOnChange).toHaveBeenCalled();
          const [visible, hidden] = mockOnChange.mock.calls[0];
          expect(visible.length).toBe(expectedVisible);
          expect(hidden.length).toBe(expectedHidden);
        }
      }
    );

    test('Respects maxVisibleItems option with height dimension', () => {
      setContainerDimension(container, 'height', 500);
      handler = createOverflowHandler({
        container,
        maxVisibleItems: 3,
        dimension: 'height',
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      expect(visible.length).toBe(3);
      expect(hidden.length).toBe(7);
    });
  });
});
