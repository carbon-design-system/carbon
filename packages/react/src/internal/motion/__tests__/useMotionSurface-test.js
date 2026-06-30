/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, renderHook } from '@testing-library/react';
import * as matchMedia from '../../useMatchMedia';
import { createMotionAdapter } from '../adapters/motion';
import { useMotionSurface } from '../useMotionSurface';

jest.mock('../adapters/motion', () => ({
  createMotionAdapter: jest.fn(),
}));

const createRun = (finished = Promise.resolve()) => {
  const animation = { stop: jest.fn() };
  return {
    animation,
    run: { animations: [animation], finished },
  };
};

describe('useMotionSurface', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  // Pass the user preference to the animation engine.
  it('passes the reduced-motion media query preference to the adapter', () => {
    jest.spyOn(matchMedia, 'useMatchMedia').mockReturnValue(true);
    createMotionAdapter.mockReturnValue({
      enter: jest.fn(),
      exit: jest.fn(),
    });

    renderHook(() =>
      useMotionSurface('expand', {
        open: false,
        originRef: { current: null },
        targetRef: { current: null },
      })
    );

    expect(createMotionAdapter).toHaveBeenCalledWith('expand', true);
  });

  // Stop the old animation when open changes before it can finish.
  it('coordinates controlled state and interrupted animations', async () => {
    jest.spyOn(matchMedia, 'useMatchMedia').mockReturnValue(false);
    let resolveEnter;
    const enter = createRun(
      new Promise((resolve) => {
        resolveEnter = resolve;
      })
    );
    const exit = createRun();
    const motionAdapter = {
      enter: jest.fn(() => enter.run),
      exit: jest.fn(() => exit.run),
    };
    createMotionAdapter.mockReturnValue(motionAdapter);

    const origin = {
      focus: jest.fn(),
      style: {
        transition: 'color 1s',
        visibility: 'visible',
      },
    };
    const refs = {
      contentRef: { current: [] },
      originRef: { current: origin },
      overlayRef: { current: { style: {} } },
      targetRef: { current: { style: {} } },
    };
    const onExitComplete = jest.fn();
    const { result, rerender } = renderHook(
      ({ open }) =>
        useMotionSurface('expand', {
          adapter: 'motion',
          onExitComplete,
          open,
          ...refs,
        }),
      { initialProps: { open: false } }
    );

    expect(result.current.isPresent).toBe(false);
    rerender({ open: true });
    expect(result.current.isPresent).toBe(true);
    expect(origin.style.transition).toBe('none');
    expect(origin.style.visibility).toBe('hidden');
    expect(motionAdapter.enter).toHaveBeenCalledWith(
      expect.objectContaining({ fromOrigin: true, origin })
    );

    rerender({ open: false });
    expect(enter.animation.stop).toHaveBeenCalled();
    expect(motionAdapter.exit).toHaveBeenCalled();

    await act(async () => {
      await exit.run.finished;
    });
    expect(result.current.isPresent).toBe(false);
    expect(onExitComplete).toHaveBeenCalledTimes(1);
    expect(origin.focus).not.toHaveBeenCalled();
    expect(origin.style.transition).toBe('color 1s');
    expect(origin.style.visibility).toBe('visible');

    await act(async () => {
      resolveEnter();
    });
  });

  // Restore the Tile when React removes the component during an animation.
  it('stops animations and restores origin styles on unmount', () => {
    jest.spyOn(matchMedia, 'useMatchMedia').mockReturnValue(false);
    const enter = createRun(new Promise(() => {}));
    createMotionAdapter.mockReturnValue({
      enter: jest.fn(() => enter.run),
      exit: jest.fn(),
    });

    const origin = {
      style: {
        transition: 'color 1s',
        visibility: 'visible',
      },
    };
    const refs = {
      contentRef: { current: [] },
      originRef: { current: origin },
      overlayRef: { current: { style: {} } },
      targetRef: { current: { style: {} } },
    };
    const { rerender, unmount } = renderHook(
      ({ open }) =>
        useMotionSurface('expand', {
          open,
          ...refs,
        }),
      { initialProps: { open: false } }
    );

    rerender({ open: true });
    expect(origin.style.transition).toBe('none');
    expect(origin.style.visibility).toBe('hidden');

    unmount();
    expect(enter.animation.stop).toHaveBeenCalledTimes(1);
    expect(origin.style.transition).toBe('color 1s');
    expect(origin.style.visibility).toBe('visible');
  });
});
