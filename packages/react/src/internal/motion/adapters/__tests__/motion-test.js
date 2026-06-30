/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { animate } from 'motion/mini';
import { createMotionAdapter, createMotionAdapterConfig } from '../motion';

jest.mock('motion/mini', () => ({
  animate: jest.fn(),
}));

describe('Motion surface adapter', () => {
  beforeEach(() => {
    animate.mockReturnValue({
      finished: Promise.resolve(),
      stop: jest.fn(),
    });
  });

  // Convert Carbon tokens into the values used by Motion.
  it('converts Carbon expand tokens into Motion transition options', () => {
    const config = createMotionAdapterConfig('expand');

    expect(config.enter).toEqual({
      duration: 0.4,
      ease: [0, 0, 0.3, 1],
    });
    expect(config.exit).toEqual({
      duration: 0.4,
      ease: [0.4, 0.14, 1, 1],
    });
    expect(config.contentEnter).toMatchObject({
      delay: 0.07,
      duration: 0.24,
    });
    expect(config.contentExit).toMatchObject({ duration: 0.11 });
  });

  // Start the Modal at the same position and size as the clicked Tile.
  it('calculates an inverse FLIP transform from source and target geometry', () => {
    const config = createMotionAdapterConfig('expand');

    expect(
      config.getTransform(
        { left: 10, top: 20, width: 100, height: 50 },
        { left: 30, top: 40, width: 200, height: 100 }
      )
    ).toBe('translate3d(-20px, -20px, 0) scale(0.5, 0.5)');
  });

  // Remove the large movement when the user asks for reduced motion.
  it('uses a shorter fade for reduced motion', () => {
    const config = createMotionAdapterConfig('expand', true);

    expect(config.shouldReduceMotion).toBe(true);
    expect(config.enter).toMatchObject({ duration: 0.24 });
    expect(config.exit).toMatchObject({ duration: 0.24 });
  });

  // Stop early when either surface cannot be measured.
  it('requires measurable source and target geometry', () => {
    const config = createMotionAdapterConfig('expand');
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

  // Let Motion own the transform, then restore the Carbon transition.
  it('restores the target transition after the animation finishes', async () => {
    const origin = document.createElement('a');
    const target = document.createElement('div');
    origin.getBoundingClientRect = () => ({
      height: 100,
      left: 0,
      top: 0,
      width: 100,
    });
    target.getBoundingClientRect = () => ({
      height: 200,
      left: 100,
      top: 100,
      width: 200,
    });
    target.style.transformOrigin = 'center';
    target.style.transition = 'transform 150ms';
    target.style.willChange = 'opacity';

    const adapter = createMotionAdapter('expand', false);
    const run = adapter.enter({
      content: [],
      fromOrigin: true,
      origin,
      target,
    });

    expect(target.style.transition).toBe('none');
    await run.finished;
    expect(target.style.transformOrigin).toBe('center');
    expect(target.style.transition).toBe('transform 150ms');
    expect(target.style.willChange).toBe('opacity');
  });
});
