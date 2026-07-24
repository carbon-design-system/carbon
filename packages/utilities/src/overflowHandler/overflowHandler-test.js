/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  getSize,
  updateOverflowHandler,
  createOverflowHandler,
} from './overflowHandler';

const createItems = (sizes, dimension) => {
  return sizes.map((size) => {
    const item = document.createElement('div');
    Object.defineProperty(item, 'getBoundingClientRect', {
      value: () => ({ [dimension]: size }),
    });
    return item;
  });
};

const setContainerDimension = (container, dimension, value) => {
  const prop = dimension === 'width' ? 'clientWidth' : 'clientHeight';
  Object.defineProperty(container, prop, {
    value,
    configurable: true,
    writable: true,
  });
};

// getComputedStyle returns zero padding/margin by default so item sizes equal
// their getBoundingClientRect value. Individual tests override this as needed.
const zeroSpacing = {
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  marginLeft: '0px',
  marginRight: '0px',
  marginTop: '0px',
  marginBottom: '0px',
  display: '',
};

beforeEach(() => {
  jest.spyOn(window, 'getComputedStyle').mockReturnValue(zeroSpacing);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('getSize', () => {
  it('should return 0 when el is falsy', () => {
    expect(getSize(null, 'width')).toBe(0);
    expect(getSize(undefined, 'width')).toBe(0);
  });

  it('should return the bounding rect width', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({ width: 100 }),
    });
    expect(getSize(el, 'width')).toBe(100);
  });

  it('should return the bounding rect height', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({ height: 80 }),
    });
    expect(getSize(el, 'height')).toBe(80);
  });

  it('should add gap to the measured width', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({ width: 100 }),
    });
    expect(getSize(el, 'width', 16)).toBe(116);
  });

  it('should add gap to the measured height', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({ height: 50 }),
    });
    expect(getSize(el, 'height', 8)).toBe(58);
  });

  it('should add horizontal padding and margin to width', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({ width: 100 }),
    });
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      ...zeroSpacing,
      paddingLeft: '10px',
      paddingRight: '10px',
      marginLeft: '5px',
      marginRight: '5px',
    });
    expect(getSize(el, 'width')).toBe(130); // 100 + 10 + 10 + 5 + 5
  });

  it('should add vertical padding and margin to height', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({ height: 60 }),
    });
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      ...zeroSpacing,
      paddingTop: '8px',
      paddingBottom: '8px',
      marginTop: '4px',
      marginBottom: '4px',
    });
    expect(getSize(el, 'height')).toBe(84); // 60 + 8 + 8 + 4 + 4
  });

  it('should combine padding, margin, and gap for width', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({ width: 100 }),
    });
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      ...zeroSpacing,
      paddingLeft: '4px',
      paddingRight: '4px',
      marginLeft: '2px',
      marginRight: '2px',
    });
    expect(getSize(el, 'width', 16)).toBe(128); // 100 + 4 + 4 + 2 + 2 + 16
  });

  it('should not add horizontal spacing when measuring height', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({ height: 50 }),
    });
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      ...zeroSpacing,
      paddingLeft: '20px',
      paddingRight: '20px',
      marginLeft: '10px',
      marginRight: '10px',
    });
    expect(getSize(el, 'height')).toBe(50);
  });

  it('should temporarily set display to inline-block for a hidden element', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'offsetParent', {
      value: null,
      configurable: true,
    });
    let capturedDisplay = '';
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => {
        capturedDisplay = el.style.display;
        return { width: 50 };
      },
    });
    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
      ...zeroSpacing,
      display: 'none',
    }));
    const size = getSize(el, 'width');
    expect(capturedDisplay).toBe('inline-block');
    expect(size).toBe(50);
    expect(el.style.display).toBe(''); // restored afterwards
  });
});

describe('createOverflowHandler', () => {
  let container, handler, mockOnChange;

  beforeEach(() => {
    container = document.createElement('div');
    mockOnChange = jest.fn();
  });

  afterEach(() => {
    handler?.disconnect();
    handler = null;
  });

  describe('error guards', () => {
    it('should throw when container is not an HTMLElement', () => {
      expect(() =>
        createOverflowHandler({
          container: 'not-an-element',
          onChange: jest.fn(),
        })
      ).toThrow('container must be an HTMLElement');
    });

    it('should throw when onChange is not a function', () => {
      expect(() =>
        createOverflowHandler({ container, onChange: 'not-a-function' })
      ).toThrow('onChange must be a function');
    });

    it('should throw when maxVisibleItems is 0', () => {
      expect(() =>
        createOverflowHandler({
          container,
          onChange: jest.fn(),
          maxVisibleItems: 0,
        })
      ).toThrow('maxVisibleItems must be a positive integer');
    });

    it('should throw when maxVisibleItems is a float', () => {
      expect(() =>
        createOverflowHandler({
          container,
          onChange: jest.fn(),
          maxVisibleItems: 1.5,
        })
      ).toThrow('maxVisibleItems must be a positive integer');
    });

    it('should throw when maxVisibleItems is negative', () => {
      expect(() =>
        createOverflowHandler({
          container,
          onChange: jest.fn(),
          maxVisibleItems: -1,
        })
      ).toThrow('maxVisibleItems must be a positive integer');
    });
  });

  describe('width dimension', () => {
    describe('equal sized items (40px each)', () => {
      beforeEach(() => {
        container.append(...createItems(Array(10).fill(40), 'width'));
      });

      test.each([
        [500, 10, 0],
        [400, 10, 0],
        [200, 5, 5],
        [80, 2, 8],
        [0, 0, 10],
      ])(
        'container %ipx → %i visible, %i hidden',
        (width, expectedVisible, expectedHidden) => {
          setContainerDimension(container, 'width', width);
          handler = createOverflowHandler({
            container,
            onChange: mockOnChange,
          });
          if (expectedHidden === 0) {
            expect(mockOnChange).not.toHaveBeenCalled();
          } else {
            const [visible, hidden] = mockOnChange.mock.calls[0];
            expect(visible.length).toBe(expectedVisible);
            expect(hidden.length).toBe(expectedHidden);
          }
        }
      );

      it('should respect maxVisibleItems', () => {
        setContainerDimension(container, 'width', 500);
        handler = createOverflowHandler({
          container,
          maxVisibleItems: 3,
          onChange: mockOnChange,
        });
        const [visible, hidden] = mockOnChange.mock.calls[0];
        expect(visible.length).toBe(3);
        expect(hidden.length).toBe(7);
      });
    });

    describe('varying sized items (40–60px)', () => {
      beforeEach(() => {
        container.append(
          ...createItems([40, 50, 60, 40, 50, 60, 40, 50, 60, 40], 'width')
        );
      });

      test.each([
        [500, 10, 0],
        [400, 8, 2],
        [200, 4, 6],
        [80, 1, 9],
        [0, 0, 10],
      ])(
        'container %ipx → %i visible, %i hidden',
        (width, expectedVisible, expectedHidden) => {
          setContainerDimension(container, 'width', width);
          handler = createOverflowHandler({
            container,
            onChange: mockOnChange,
          });
          if (expectedHidden === 0) {
            expect(mockOnChange).not.toHaveBeenCalled();
          } else {
            const [visible, hidden] = mockOnChange.mock.calls[0];
            expect(visible.length).toBe(expectedVisible);
            expect(hidden.length).toBe(expectedHidden);
          }
        }
      );

      it('should respect maxVisibleItems', () => {
        setContainerDimension(container, 'width', 500);
        handler = createOverflowHandler({
          container,
          maxVisibleItems: 3,
          onChange: mockOnChange,
        });
        const [visible, hidden] = mockOnChange.mock.calls[0];
        expect(visible.length).toBe(3);
        expect(hidden.length).toBe(7);
      });
    });

    describe('gap option', () => {
      it('should account for column-gap when determining overflow', () => {
        // 5 × (40 + 10)px = 250; available = 200 + 10 (last gap back) = 210; 4 fit
        container.append(...createItems(Array(5).fill(40), 'width'));
        setContainerDimension(container, 'width', 200);
        handler = createOverflowHandler({
          container,
          gap: 10,
          onChange: mockOnChange,
        });
        const [visible, hidden] = mockOnChange.mock.calls[0];
        expect(visible.length).toBe(4);
        expect(hidden.length).toBe(1);
      });

      it('should not overflow when container is large enough to absorb gaps', () => {
        // 3 × (40 + 8) = 144; available = 200 + 8 = 208; all fit
        container.append(...createItems(Array(3).fill(40), 'width'));
        setContainerDimension(container, 'width', 200);
        handler = createOverflowHandler({
          container,
          gap: 8,
          onChange: mockOnChange,
        });
        expect(mockOnChange).not.toHaveBeenCalled();
      });
    });

    describe('offsetValue option', () => {
      it('should reduce available space by offsetValue', () => {
        // container 190 > totalSize 200 triggers overflow branch;
        // available = 190 - 40 = 150; 3 × 40 = 120 fit, 4th would be 160 > 150
        container.append(...createItems(Array(5).fill(40), 'width'));
        setContainerDimension(container, 'width', 190);
        handler = createOverflowHandler({
          container,
          offsetValue: 40,
          onChange: mockOnChange,
        });
        const [visible, hidden] = mockOnChange.mock.calls[0];
        expect(visible.length).toBe(3);
        expect(hidden.length).toBe(2);
      });

      it('should apply gap and offsetValue together', () => {
        // 5 × (40 + 10) = 250; available = 220 - 20 + 10 = 210; 4 × 50 = 200 fit
        container.append(...createItems(Array(5).fill(40), 'width'));
        setContainerDimension(container, 'width', 220);
        handler = createOverflowHandler({
          container,
          gap: 10,
          offsetValue: 20,
          onChange: mockOnChange,
        });
        const [visible, hidden] = mockOnChange.mock.calls[0];
        expect(visible.length).toBe(4);
        expect(hidden.length).toBe(1);
      });
    });
  });

  describe('height dimension', () => {
    describe('varying sized items (40–60px)', () => {
      beforeEach(() => {
        container.append(
          ...createItems([40, 50, 60, 40, 50, 60, 40, 50, 60, 40], 'height')
        );
      });

      test.each([
        [500, 10, 0],
        [400, 8, 2],
        [200, 4, 6],
        [80, 1, 9],
        [0, 0, 10],
      ])(
        'container %ipx → %i visible, %i hidden',
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
            const [visible, hidden] = mockOnChange.mock.calls[0];
            expect(visible.length).toBe(expectedVisible);
            expect(hidden.length).toBe(expectedHidden);
          }
        }
      );

      it('should respect maxVisibleItems', () => {
        setContainerDimension(container, 'height', 500);
        handler = createOverflowHandler({
          container,
          maxVisibleItems: 3,
          dimension: 'height',
          onChange: mockOnChange,
        });
        const [visible, hidden] = mockOnChange.mock.calls[0];
        expect(visible.length).toBe(3);
        expect(hidden.length).toBe(7);
      });
    });

    describe('gap option', () => {
      it('should account for row-gap when determining overflow', () => {
        // 5 × (40 + 10) = 250; available = 200 + 10 = 210; 4 fit
        container.append(...createItems(Array(5).fill(40), 'height'));
        setContainerDimension(container, 'height', 200);
        handler = createOverflowHandler({
          container,
          dimension: 'height',
          gap: 10,
          onChange: mockOnChange,
        });
        const [visible, hidden] = mockOnChange.mock.calls[0];
        expect(visible.length).toBe(4);
        expect(hidden.length).toBe(1);
      });
    });
  });

  describe('ResizeObserver', () => {
    let observeCallback;

    beforeEach(() => {
      jest.spyOn(global, 'ResizeObserver').mockImplementation((cb) => {
        observeCallback = cb;
        return { observe: jest.fn(), disconnect: jest.fn() };
      });
    });

    it('should call onChange when ResizeObserver fires and the hidden set changes', () => {
      container.append(...createItems(Array(3).fill(40), 'width'));
      // Initial: 80px → items[2] hidden; then resize to 200px → all visible
      setContainerDimension(container, 'width', 80);
      handler = createOverflowHandler({ container, onChange: mockOnChange });
      mockOnChange.mockClear();

      container.clientWidth = 200;
      observeCallback([]);

      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      expect(visible.length).toBe(3);
      expect(hidden.length).toBe(0);
    });
  });
});

describe('updateOverflowHandler', () => {
  let container, mockOnChange;

  beforeEach(() => {
    container = document.createElement('div');
    mockOnChange = jest.fn();
    setContainerDimension(container, 'width', 200);
  });

  const makeItems = (n, size = 40) => createItems(Array(n).fill(size), 'width');

  it('should not call onChange when the hidden set is unchanged', () => {
    const items = makeItems(5);
    const sizes = Array(5).fill(40);
    setContainerDimension(container, 'width', 160); // 4 fit, 1 hidden

    const firstHidden = updateOverflowHandler({
      container,
      items,
      offset: undefined,
      sizes,
      fixedSizes: [],
      offsetSize: 0,
      dimension: 'width',
      onChange: mockOnChange,
    });

    mockOnChange.mockClear();

    updateOverflowHandler({
      container,
      items,
      offset: undefined,
      sizes,
      fixedSizes: [],
      offsetSize: 0,
      dimension: 'width',
      onChange: mockOnChange,
      previousHiddenItems: firstHidden,
    });

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should set data-hidden on the offset element when no items are hidden', () => {
    const items = makeItems(3); // 3 × 40 = 120 ≤ 200, all fit
    const offset = document.createElement('div');

    updateOverflowHandler({
      container,
      items,
      offset,
      sizes: Array(3).fill(40),
      fixedSizes: [],
      offsetSize: 0,
      dimension: 'width',
      onChange: mockOnChange,
      previousHiddenItems: [items[0]], // force change detection
    });

    expect(offset.hasAttribute('data-hidden')).toBe(true);
  });

  it('should remove data-hidden from the offset element when items are hidden', () => {
    setContainerDimension(container, 'width', 160); // 5 × 40 = 200 > 160 → overflow
    const items = makeItems(5);
    const offset = document.createElement('div');

    updateOverflowHandler({
      container,
      items,
      offset,
      sizes: Array(5).fill(40),
      fixedSizes: [],
      offsetSize: 0,
      dimension: 'width',
      onChange: mockOnChange,
    });

    expect(offset.hasAttribute('data-hidden')).toBe(false);
  });
});
