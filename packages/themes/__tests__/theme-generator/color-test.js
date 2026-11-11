/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import {
  clampLightness,
  formatOklch,
  hexToOklch,
  isInSrgbGamut,
  mapToSrgbGamut,
  normalizeHue,
  oklchToHex,
  srgbToOklch,
} from '../../src/theme-generator/color';

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

  it.each([
    [0, 0],
    [262, 262],
    [360, 0],
    [390, 30],
    [720, 0],
    [-45, 315],
    [-360, 0],
  ])('normalizes hue %s to %s', (hue, expected) => {
    expect(normalizeHue(hue)).toBe(expected);
  });

  it('clamps lightness to [0, 1] and removes floating-point drift', () => {
    expect(clampLightness(-0.1)).toBe(0);
    expect(clampLightness(1.2)).toBe(1);
    expect(clampLightness(0.97 - 0.03)).toBe(0.94);
  });

  it('maps out-of-gamut colors by reducing chroma only', () => {
    const outside = { lightness: 0.7, chroma: 0.4, hue: 140 };
    const mapped = mapToSrgbGamut(outside);

    expect(isInSrgbGamut(mapped)).toBe(true);
    expect(mapped.lightness).toBe(outside.lightness);
    expect(mapped.hue).toBe(outside.hue);
    expect(mapped.chroma).toBeLessThan(outside.chroma);
    expect(mapToSrgbGamut(mapped)).toBe(mapped);
  });

  it('detects colors outside the sRGB gamut', () => {
    expect(isInSrgbGamut({ lightness: 0.7, chroma: 0.4, hue: 140 })).toBe(
      false
    );
    expect(isInSrgbGamut({ lightness: 0.7, chroma: 0.004, hue: 262 })).toBe(
      true
    );
  });

  it('converts hex colors to OKLCH with accurate roundtripping', () => {
    const hex = '#da1e28';
    const oklch = hexToOklch(hex);
    expect(oklch.lightness).toBeCloseTo(0.5692, 2);
    expect(oklch.hue).toBeCloseTo(25.93, 1);
    expect(oklchToHex(oklch)).toBe(hex);
  });

  it('accepts hex without a leading # and surrounding whitespace', () => {
    expect(hexToOklch(' da1e28 ')).toEqual(hexToOklch('#da1e28'));
  });

  it.each(['#fff', '#gggggg', '', '#da1e28ff'])(
    'rejects malformed hex %p instead of returning NaN components',
    (hex) => {
      expect(() => hexToOklch(hex)).toThrow(/6-digit hex/);
    }
  );

  it('converts sRGB to OKLCH', () => {
    const oklch = srgbToOklch({ red: 0, green: 0, blue: 0 });
    expect(oklch.lightness).toBe(0);
    expect(oklch.chroma).toBe(0);
  });
});
