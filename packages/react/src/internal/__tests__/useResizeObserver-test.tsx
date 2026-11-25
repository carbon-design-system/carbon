/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import React, { StrictMode, useRef } from 'react';
import { render, screen, act } from '@testing-library/react';
import { useResizeObserver } from '../useResizeObserver';

const ResizeTest = ({
  onResize,
  onRender,
}: {
  onResize?: (size: DOMRectReadOnly) => void;
  onRender?: () => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { width, height } = useResizeObserver({ ref, onResize });
  onRender?.();
  return (
    <div ref={ref} data-testid="observed-element">
      width: {width}, height: {height}
    </div>
  );
};

const defaultSize = 100;
describe('useResizeObserver', () => {
  const originalRequestAnimationFrame = requestAnimationFrame;
  const originalCancelAnimationFrame = cancelAnimationFrame;
  let savedObserverCb: ResizeObserverCallback | undefined;
  let resizeObserver: ResizeObserver | undefined;
  let observeMock: ReturnType<typeof jest.fn<ResizeObserver['observe']>>;
  let disconnectMock: ReturnType<typeof jest.fn<ResizeObserver['disconnect']>>;

  const notifyResize = (entries: ResizeObserverEntry[]) => {
    if (!savedObserverCb || !resizeObserver) {
      throw new Error('Expected a ResizeObserver callback to be registered.');
    }

    savedObserverCb(entries, resizeObserver);
  };

  const createResizeEntry = (
    target: Element,
    width: number,
    height: number
  ) => ({
    target,
    borderBoxSize: [],
    contentBoxSize: [],
    devicePixelContentBoxSize: [],
    contentRect: DOMRectReadOnly.fromRect({ width, height }),
  });

  beforeEach(() => {
    observeMock = jest.fn<ResizeObserver['observe']>();
    disconnectMock = jest.fn<ResizeObserver['disconnect']>();

    class MockResizeObserver implements ResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        savedObserverCb = callback;
        resizeObserver = this;
      }

      observe = observeMock;
      unobserve = jest.fn<ResizeObserver['unobserve']>();
      disconnect = disconnectMock;
    }

    window.ResizeObserver = MockResizeObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
    globalThis.requestAnimationFrame = originalRequestAnimationFrame;
    globalThis.cancelAnimationFrame = originalCancelAnimationFrame;
  });

  /** Triggers resize from the saved resize observer callback */
  const triggerResize = async (
    element: Element,
    width = defaultSize,
    height = defaultSize
  ) =>
    act(() => {
      notifyResize([createResizeEntry(element, width, height)]);
    });

  it('returns the initial size of the component', () => {
    render(<ResizeTest />);
    expect(screen.getByText('width: 0, height: 0')).toBeInTheDocument();
  });

  it('returns the updated sizes from hook upon resizing', async () => {
    render(<ResizeTest />);
    const element = screen.getByTestId('observed-element');
    expect(screen.getByText('width: 0, height: 0')).toBeInTheDocument();

    await triggerResize(element);
    expect(
      screen.getByText(`width: ${defaultSize}, height: ${defaultSize}`)
    ).toBeInTheDocument();

    await triggerResize(element, defaultSize * 2, defaultSize * 3);
    expect(
      screen.getByText(`width: ${defaultSize * 2}, height: ${defaultSize * 3}`)
    ).toBeInTheDocument();
  });

  it('calls the provided onResize function', async () => {
    const resizeFn = jest.fn();
    render(<ResizeTest onResize={resizeFn} />);
    const element = screen.getByTestId('observed-element');

    await triggerResize(element, defaultSize * 2, defaultSize * 3);
    expect(
      screen.getByText(`width: ${defaultSize * 2}, height: ${defaultSize * 3}`)
    ).toBeInTheDocument();
    expect(resizeFn).toHaveBeenCalledTimes(1);

    await triggerResize(element, defaultSize * 3, defaultSize * 4);
    expect(
      screen.getByText(`width: ${defaultSize * 3}, height: ${defaultSize * 4}`)
    ).toBeInTheDocument();
    expect(resizeFn).toHaveBeenCalledTimes(2);

    await triggerResize(element, defaultSize, defaultSize);
    expect(
      screen.getByText(`width: ${defaultSize}, height: ${defaultSize}`)
    ).toBeInTheDocument();
    expect(resizeFn).toHaveBeenCalledTimes(3);
  });

  it('does not update state or call onResize when dimensions are unchanged', async () => {
    const resizeFn = jest.fn();
    const renderFn = jest.fn();
    render(<ResizeTest onResize={resizeFn} onRender={renderFn} />);
    const element = screen.getByTestId('observed-element');

    await triggerResize(element);
    expect(resizeFn).toHaveBeenCalledTimes(1);
    const renderCount = renderFn.mock.calls.length;

    await triggerResize(element);
    expect(resizeFn).toHaveBeenCalledTimes(1);
    expect(renderFn).toHaveBeenCalledTimes(renderCount);
  });

  it('calls onResize for the first observed size even when dimensions are unchanged', async () => {
    const resizeFn = jest.fn();
    render(<ResizeTest onResize={resizeFn} />);
    const element = screen.getByTestId('observed-element');

    await triggerResize(element, 0, 0);

    expect(resizeFn).toHaveBeenCalledTimes(1);
    expect(resizeFn).toHaveBeenLastCalledWith(
      expect.objectContaining({ width: 0, height: 0 })
    );
  });

  it('coalesces multiple resize entries into one animation frame', () => {
    const animationFrameCallbacks: FrameRequestCallback[] = [];
    globalThis.requestAnimationFrame = jest.fn<typeof requestAnimationFrame>(
      (callback) => {
        animationFrameCallbacks.push(callback);
        return animationFrameCallbacks.length;
      }
    );
    globalThis.cancelAnimationFrame = jest.fn();

    const resizeFn = jest.fn();
    render(<ResizeTest onResize={resizeFn} />);
    const element = screen.getByTestId('observed-element');

    act(() => {
      notifyResize([createResizeEntry(element, 200, 300)]);
      notifyResize([createResizeEntry(element, 400, 500)]);
    });

    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(resizeFn).not.toHaveBeenCalled();

    act(() => {
      animationFrameCallbacks[0](0);
    });

    expect(screen.getByText('width: 400, height: 500')).toBeInTheDocument();
    expect(resizeFn).toHaveBeenCalledTimes(1);
    expect(resizeFn).toHaveBeenLastCalledWith(
      expect.objectContaining({ width: 400, height: 500 })
    );
  });

  it('schedules a new animation frame after cleanup cancels a pending frame', () => {
    const animationFrameCallbacks: FrameRequestCallback[] = [];
    globalThis.requestAnimationFrame = jest.fn<typeof requestAnimationFrame>(
      (callback) => {
        animationFrameCallbacks.push(callback);
        return animationFrameCallbacks.length;
      }
    );
    globalThis.cancelAnimationFrame = jest.fn();
    observeMock.mockImplementation((element) => {
      notifyResize([createResizeEntry(element, 200, 300)]);
    });

    render(
      <StrictMode>
        <ResizeTest />
      </StrictMode>
    );

    expect(disconnectMock).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(1);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
  });
});
