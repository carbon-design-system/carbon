/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createMotionSurfaceConfig } from './useMotionSurface.featureflag';

jest.mock('motion/react', () => ({
  useReducedMotion: jest.fn(),
}));

describe('useMotionSurface', () => {
  it('converts Carbon expand tokens into Motion transition options', () => {
    const config = createMotionSurfaceConfig('expand');

    expect(config.enter).toEqual({
      duration: 0.4,
      ease: [0, 0, 0.3, 1],
    });
    expect(config.exit).toEqual({
      duration: 0.4,
      ease: [0.4, 0.14, 1, 1],
    });
  });

  it('calculates an inverse FLIP transform from source and target geometry', () => {
    const config = createMotionSurfaceConfig('expand');

    expect(
      config.getTransform(
        { left: 10, top: 20, width: 100, height: 50 },
        { left: 30, top: 40, width: 200, height: 100 }
      )
    ).toBe('translate3d(-20px, -20px, 0) scale(0.5, 0.5)');
  });

  it('uses a shorter fade and retains no layout requirement for reduced motion', () => {
    const config = createMotionSurfaceConfig('expand', true);

    expect(config.shouldReduceMotion).toBe(true);
    expect(config.enter).toMatchObject({ duration: 0.24 });
    expect(config.exit).toMatchObject({ duration: 0.24 });
  });

  it('requires measurable source and target geometry', () => {
    const config = createMotionSurfaceConfig('expand');
    const validRect = { left: 0, top: 0, width: 100, height: 100 };

    expect(() => config.getTransform(null, validRect)).toThrow(
      'The expand motion surface requires a measurable source element.'
    );
    expect(() =>
      config.getTransform(validRect, { ...validRect, height: 0 })
    ).toThrow(
      'The expand motion surface requires a measurable target element.'
    );
  });
});
