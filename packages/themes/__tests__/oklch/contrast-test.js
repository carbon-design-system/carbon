/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import {
  findLightnessForContrast,
  getContrastRatio,
  getRelativeLuminance,
} from '../../src/oklch/contrast';

describe('OKLCH contrast utilities', () => {
  it('calculates known WCAG contrast ratios', () => {
    expect(getRelativeLuminance({ red: 0, green: 0, blue: 0 })).toBe(0);
    expect(getRelativeLuminance({ red: 1, green: 1, blue: 1 })).toBe(1);
    expect(
      getContrastRatio(
        { lightness: 0, chroma: 0, hue: 0 },
        { lightness: 1, chroma: 0, hue: 0 }
      )
    ).toBeCloseTo(21);
  });

  it.each([
    ['darker', 0.97, 4.5],
    ['lighter', 0.2, 4.5],
    ['darker', 0.97, 3],
    ['lighter', 0.2, 3],
  ])(
    'finds the closest %s color meeting %s against %s',
    (direction, l, target) => {
      const background = { lightness: l, chroma: 0.004, hue: 262 };
      const foreground = findLightnessForContrast({
        background,
        target,
        direction,
        chroma: 0.004,
        hue: 262,
      });

      expect(getContrastRatio(foreground, background)).toBeGreaterThanOrEqual(
        target
      );
      expect(
        direction === 'darker'
          ? foreground.lightness < background.lightness
          : foreground.lightness > background.lightness
      ).toBe(true);
    }
  );
});
