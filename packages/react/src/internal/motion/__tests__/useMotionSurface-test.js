/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from '@testing-library/react';
import { useMotionEnabled } from '../useMotionEnabled';
import { useMotionSurface } from '../useMotionSurface';

jest.mock('../useMotionEnabled', () => ({
  useMotionEnabled: jest.fn(() => true),
}));

describe('useMotionSurface', () => {
  afterEach(() => {
    useMotionEnabled.mockReturnValue(true);
  });

  it('resolves shared-element surfaces into Motion transitions', () => {
    const { result } = renderHook(() => useMotionSurface('expand'));

    expect(result.current.kind).toBe('shared-element');
    expect(result.current.enabled).toBe(true);
    expect(result.current.origin).toBeUndefined();
    expect(result.current.enterTransition).toEqual({
      duration: 0.24,
      ease: [0.2, 0, 0.38, 0.9],
    });
    expect(result.current.exitTransition).toEqual({
      duration: 0.24,
      ease: [0.2, 0, 0.38, 0.9],
    });
    expect(result.current.animate).toEqual({
      opacity: 1,
      transform: 'scale(1)',
      transition: { duration: 0.24, ease: [0.2, 0, 0.38, 0.9] },
    });
    expect(result.current.exit).toEqual({
      opacity: 0,
      transform: 'scale(0.96)',
      transition: { duration: 0.24, ease: [0.2, 0, 0.38, 0.9] },
    });
  });

  it('keeps the trigger origin of the invoke surface', () => {
    const { result } = renderHook(() => useMotionSurface('invoke'));

    expect(result.current.kind).toBe('shared-element');
    expect(result.current.origin).toBe('trigger');
    // standard/expressive
    expect(result.current.enterTransition.ease).toEqual([0.4, 0.14, 0.3, 1]);
    // invoke has no enter/exit keyframes - morph timing only
    expect(result.current.animate).toBeUndefined();
    expect(result.current.exit).toBeUndefined();
  });

  it('resolves reveal surfaces into enter/exit targets', () => {
    const { result } = renderHook(() => useMotionSurface('contextual'));

    expect(result.current.kind).toBe('reveal');
    expect(result.current.initial).toEqual({
      opacity: 0,
      clipPath: 'inset(50% 0 50% 0)',
    });
    expect(result.current.animate).toEqual({
      opacity: 1,
      clipPath: 'inset(0 0 0 0)',
      // fast-02 = 110ms, entrance/expressive
      transition: { duration: 0.11, ease: [0, 0, 0.3, 1] },
    });
    expect(result.current.exit).toEqual({
      opacity: 0,
      clipPath: 'inset(50% 0 50% 0)',
      // exit/expressive
      transition: { duration: 0.11, ease: [0.4, 0.14, 1, 1] },
    });
  });

  it('reports the accessibility gate', () => {
    useMotionEnabled.mockReturnValue(false);

    const { result } = renderHook(() => useMotionSurface('expand'));

    expect(result.current.enabled).toBe(false);
  });
});
