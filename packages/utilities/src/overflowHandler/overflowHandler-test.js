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
  let container, items, handler, mockOnChange;

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
      items = createItems(Array(10).fill(40), 'width');
      container.append(...items);
    });

    test.each([
      [500, 10, 0], // All items fit
      [400, 10, 0], // All items fit perfectly
      [200, 4, 6], // 4 items fit, 6 hidden, taking offsetSize into account
      [80, 1, 9], // 1 item fits, 9 hidden, taking offsetSize into account
      [0, 0, 10], // No items fit, all hidden
    ])(
      'When container width is %ipx, expect %i visible and %i hidden',
      (width, expectedVisible, expectedHidden) => {
        setContainerDimension(container, 'width', width);
        handler = createOverflowHandler({
          container,
          items,
          offsetSize: 40,
          onChange: mockOnChange,
        });
        expect(mockOnChange).toHaveBeenCalled();
        const [visible, hidden] = mockOnChange.mock.calls[0];
        expect(visible.length).toBe(expectedVisible);
        expect(hidden.length).toBe(expectedHidden);
      }
    );

    test('Respects maxVisible option', () => {
      setContainerDimension(container, 'width', 500);
      handler = createOverflowHandler({
        container,
        items,
        offsetSize: 40,
        maxVisible: 3,
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      expect(visible.length).toBe(3);
      expect(hidden.length).toBe(7);
    });

    test('Accounts for variation in offsetSize', () => {
      setContainerDimension(container, 'width', 300);
      handler = createOverflowHandler({
        container,
        items,
        offsetSize: 20,
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      // For a container width of 300px with items of 40px and offsetSize 20,
      // (7 items * 40) + 20 equals 300.
      expect(visible.length).toBe(7);
      expect(hidden.length).toBe(3);
    });
  });

  describe('Varying sized items (40-60px)', () => {
    beforeEach(() => {
      items = createItems([40, 50, 60, 40, 50, 60, 40, 50, 60, 40], 'width');
      container.append(...items);
    });

    test.each([
      [500, 10, 0], // All items fit
      [400, 7, 3], // Fits first 7 items along with offsetSize
      [200, 3, 7], // Fits first 3 items along with offsetSize
      [80, 1, 9],
      [0, 0, 10],
    ])(
      'When container width is %ipx, expect %i visible and %i hidden',
      (width, expectedVisible, expectedHidden) => {
        setContainerDimension(container, 'width', width);
        handler = createOverflowHandler({
          container,
          items,
          offsetSize: 40,
          onChange: mockOnChange,
        });
        expect(mockOnChange).toHaveBeenCalled();
        const [visible, hidden] = mockOnChange.mock.calls[0];
        expect(visible.length).toBe(expectedVisible);
        expect(hidden.length).toBe(expectedHidden);
      }
    );

    test('Respects maxVisible option', () => {
      setContainerDimension(container, 'width', 500);
      handler = createOverflowHandler({
        container,
        items,
        offsetSize: 40,
        maxVisible: 3,
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      expect(visible.length).toBe(3);
      expect(hidden.length).toBe(7);
    });

    test('Accounts for variation in offsetSize', () => {
      setContainerDimension(container, 'width', 300);
      handler = createOverflowHandler({
        container,
        items,
        offsetSize: 20,
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      // For these varying sizes, 6 items fit when accounting for offsetSize variation.
      expect(visible.length).toBe(6);
      expect(hidden.length).toBe(4);
    });
  });
});

describe('createOverflowHandler (height)', () => {
  let container, items, handler, mockOnChange;

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
      items = createItems([40, 50, 60, 40, 50, 60, 40, 50, 60, 40], 'height');
      container.append(...items);
    });

    test.each([
      [500, 10, 0],
      [400, 7, 3],
      [200, 3, 7],
      [80, 1, 9],
      [0, 0, 10],
    ])(
      'When container height is %ipx, expect %i visible and %i hidden',
      (height, expectedVisible, expectedHidden) => {
        setContainerDimension(container, 'height', height);
        handler = createOverflowHandler({
          container,
          items,
          offsetSize: 40,
          dimension: 'height',
          onChange: mockOnChange,
        });
        expect(mockOnChange).toHaveBeenCalled();
        const [visible, hidden] = mockOnChange.mock.calls[0];
        expect(visible.length).toBe(expectedVisible);
        expect(hidden.length).toBe(expectedHidden);
      }
    );

    test('Respects maxVisible option with height dimension', () => {
      setContainerDimension(container, 'height', 500);
      handler = createOverflowHandler({
        container,
        items,
        offsetSize: 40,
        maxVisible: 3,
        dimension: 'height',
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      expect(visible.length).toBe(3);
      expect(hidden.length).toBe(7);
    });

    test('Accounts for variation in offsetSize with height dimension', () => {
      setContainerDimension(container, 'height', 300);
      handler = createOverflowHandler({
        container,
        items,
        offsetSize: 20,
        dimension: 'height',
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      // For these varying heights, 6 items fit when accounting for offsetSize variation.
      expect(visible.length).toBe(6);
      expect(hidden.length).toBe(4);
    });
  });
});
