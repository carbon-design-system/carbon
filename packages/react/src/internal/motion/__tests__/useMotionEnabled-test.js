/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from '@testing-library/react';
import { useReducedMotion } from 'motion/react';
import { useMotionEnabled } from '../useMotionEnabled';

jest.mock('motion/react', () => ({
  useReducedMotion: jest.fn(),
}));

describe('useMotionEnabled', () => {
  it('is enabled when the user has no motion preference', () => {
    useReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useMotionEnabled());

    expect(result.current).toBe(true);
  });

  it('disables motion when the user prefers reduced motion', () => {
    useReducedMotion.mockReturnValue(true);

    const { result } = renderHook(() => useMotionEnabled());

    expect(result.current).toBe(false);
  });
});
