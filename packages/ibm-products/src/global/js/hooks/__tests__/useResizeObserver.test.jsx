/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import { render, screen, act } from '@testing-library/react';
import { useResizeObserver } from '../useResizeObserver';

const ResizeTest = ({ onResize = null }) => {
  const ref = useRef(null);
  const { width, height } = useResizeObserver(ref, onResize);
  return (
    <div ref={ref} data-testid="observed-element">
      width: {width}, height: {height}
    </div>
  );
};

const defaultSize = 100;
describe('useResizeObserver', () => {
  let savedObserverCb;

  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation((cb) => {
      savedObserverCb = cb;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Triggers resize from the saved resize observer callback
  const triggerResize = (element, width = defaultSize, height = defaultSize) =>
    act(() => {
      savedObserverCb([{ target: element, contentRect: { width, height } }]);
    });

  it('returns the initial size of the component', () => {
    render(<ResizeTest />);
    screen.getByText('width: 0, height: 0');
  });

  it('returns the updated sizes from hook upon resizing', () => {
    render(<ResizeTest />);
    const element = screen.getByTestId('observed-element');
    screen.getByText('width: 0, height: 0');

    triggerResize(element);
    screen.getByText(`width: ${defaultSize}, height: ${defaultSize}`);

    triggerResize(element, defaultSize * 2, defaultSize * 3);
    screen.getByText(`width: ${defaultSize * 2}, height: ${defaultSize * 3}`);
  });

  it('calls the provided onResize function', () => {
    const resizeFn = jest.fn();
    render(<ResizeTest onResize={resizeFn} />);
    const element = screen.getByTestId('observed-element');

    triggerResize(element, defaultSize * 2, defaultSize * 3);
    screen.getByText(`width: ${defaultSize * 2}, height: ${defaultSize * 3}`);
    expect(resizeFn).toHaveBeenCalledTimes(1);

    triggerResize(element, defaultSize * 3, defaultSize * 4);
    screen.getByText(`width: ${defaultSize * 3}, height: ${defaultSize * 4}`);
    expect(resizeFn).toHaveBeenCalledTimes(2);

    triggerResize(element, defaultSize, defaultSize);
    screen.getByText(`width: ${defaultSize}, height: ${defaultSize}`);
    expect(resizeFn).toHaveBeenCalledTimes(3);
  });
});
