import { createOverflowHandler } from './overflowHandler';

describe('createOverflowHandler', () => {
  let container;
  let items;
  let handler;
  let mockOnChange;

  const setContainerWidth = (width) => {
    Object.defineProperty(container, 'clientWidth', {
      value: width,
      configurable: true,
      writable: true,
    });
  };

  beforeEach(() => {
    container = document.createElement('div');
    mockOnChange = jest.fn();
  });

  describe('Should validate hidden items when they are equal width 40px', () => {
    beforeEach(() => {
      items = Array.from({ length: 10 }, () => {
        const item = document.createElement('div');
        Object.defineProperty(item, 'getBoundingClientRect', {
          value: () => ({ width: 40 }), // Each item is 40px wide
        });
        return item;
      });
      container.append(...items);
    });

    test.each([
      [500, 10, 0], // All items fit
      [400, 10, 0], // All items fit perfectly
      [200, 4, 6], // 4 items fit, 6 hidden, taking offsetSize into account
      [80, 1, 9], // 1 item fits, 9 hidden, taking offsetSize into account
      [0, 0, 10], // No items fit, all hidden
    ])(
      'When container width is %ipx show %i items and hide %i items',
      (width, expectedVisible, expectedHidden) => {
        setContainerWidth(width);
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

    test('Should verify maxVisible', () => {
      setContainerWidth(500);
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

    test('Should verify if calculation accounts for variation in offsetSize', () => {
      setContainerWidth(300);
      handler = createOverflowHandler({
        container,
        items,
        offsetSize: 20,
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      expect(visible.length).toBe(7); // (40*7)+20 = 300
      expect(hidden.length).toBe(3);
    });
  });

  describe('Should validate hidden items when they are varying in widths (40-60px)', () => {
    beforeEach(() => {
      const widths = [40, 50, 60, 40, 50, 60, 40, 50, 60, 40]; // Mixed widths total 490 tag set example
      items = widths.map((width) => {
        const item = document.createElement('div');
        Object.defineProperty(item, 'getBoundingClientRect', {
          value: () => ({ width }),
        });
        return item;
      });
      container.append(...items);
    });

    test.each([
      [500, 10, 0], // All items fit
      [400, 7, 3], // Fits first 7 items along with offsetSize
      [200, 3, 7], // Fits first 3 items along with offsetSize
      [80, 1, 9],
      [0, 0, 10],
    ])(
      'When container width is %ipx show %i items and hide %i items',
      (width, expectedVisible, expectedHidden) => {
        setContainerWidth(width);
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

    test('Should verify maxVisible', () => {
      setContainerWidth(500);
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

    test('Should verify if calculation accounts for variation in offsetSize', () => {
      setContainerWidth(300);
      handler = createOverflowHandler({
        container,
        items,
        offsetSize: 20,
        onChange: mockOnChange,
      });
      expect(mockOnChange).toHaveBeenCalled();
      const [visible, hidden] = mockOnChange.mock.calls[0];
      expect(visible.length).toBe(6); // 40+50+60+40+50+60+20 = 300
      expect(hidden.length).toBe(4);
    });
  });

  afterEach(() => {
    handler.disconnect();
  });
});
