/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { formatOklch, isInSrgbGamut, oklchToHex } from '../../src/oklch/color';

describe('OKLCH color utilities', () => {
  it('formats OKLCH colors deterministically', () => {
    expect(formatOklch({ lightness: 0.5565, chroma: 0.243, hue: 262 })).toBe(
      'oklch(0.5565 0.243 262)'
    );
  });

  it.each([
    [{ lightness: 0, chroma: 0, hue: 0 }, '#000000'],
    [{ lightness: 1, chroma: 0, hue: 0 }, '#ffffff'],
    [{ lightness: 0.97, chroma: 0.004, hue: 262 }, '#f4f5f8'],
    [{ lightness: 0.2, chroma: 0.004, hue: 262 }, '#151618'],
  ])('converts %o to %s', (color, expected) => {
    expect(oklchToHex(color)).toBe(expected);
  });

  it('detects colors outside the sRGB gamut', () => {
    expect(isInSrgbGamut({ lightness: 0.7, chroma: 0.4, hue: 140 })).toBe(
      false
    );
    expect(isInSrgbGamut({ lightness: 0.7, chroma: 0.004, hue: 262 })).toBe(
      true
    );
  });
});
