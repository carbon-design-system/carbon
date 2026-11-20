/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { mapToSrgbGamut, oklchToHex } from '../../src/theme-generator/color';
import {
  findLightnessForContrast,
  findLightnessForContrastAgainstAll,
  getContrastRatio,
  getHexContrastRatio,
  getRelativeLuminance,
} from '../../src/theme-generator/contrast';

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

describe('findLightnessForContrast — rounding and hex fallback', () => {
  const chroma = 0.004;
  const hue = 262;
  const solve = (background, target, direction) =>
    findLightnessForContrast({ background, target, direction, chroma, hue });
  const hexOf = (lightness) =>
    oklchToHex(mapToSrgbGamut({ lightness, chroma, hue }));
  const hexOfBackground = (background) =>
    oklchToHex(mapToSrgbGamut(background));

  it.each([
    ['darker', 0.97, 4.5],
    ['darker', 0.94, 3],
    ['lighter', 0.2, 4.5],
    ['lighter', 0.16, 3],
  ])(
    'rounds %s results to 4 decimals without losing contrast (surface L=%s, %s:1)',
    (direction, lightness, target) => {
      const background = { lightness, chroma, hue };
      const result = solve(background, target, direction);

      expect(Number(result.lightness.toFixed(4))).toBe(result.lightness);
      expect(getContrastRatio(result, background)).toBeGreaterThanOrEqual(
        target
      );
    }
  );

  it('rounds toward higher contrast, never to the nearest value', () => {
    // Unrounded solutions: 0.526181 (darker) and 0.619018 (lighter).
    // Nearest-rounding gives 0.5262 / 0.6190, both of which LOWER contrast
    // below the target; rounding toward higher contrast gives 0.5261 / 0.6191.
    const darker = solve({ lightness: 0.94, chroma, hue }, 4.5, 'darker');
    const lighter = solve({ lightness: 0.24, chroma, hue }, 4.5, 'lighter');

    expect(darker.lightness).toBeLessThanOrEqual(0.5261);
    expect(lighter.lightness).toBeGreaterThanOrEqual(0.6191);
  });

  it('nudges past a value that meets the target in OKLCH but not in hex', () => {
    // Light surface 0.97 at 4.5:1: the rounded OKLCH solution (L=0.5472)
    // renders as 4.4949:1 after 8-bit quantisation, so the solver must go
    // darker. Pins the documented reason the hex-aware nudge exists.
    const background = { lightness: 0.97, chroma, hue };
    const backgroundHex = hexOfBackground(background);

    expect(getHexContrastRatio(hexOf(0.5472), backgroundHex)).toBeLessThan(4.5);

    const result = solve(background, 4.5, 'darker');

    expect(result.lightness).toBeLessThan(0.5472);
    expect(
      getHexContrastRatio(hexOf(result.lightness), backgroundHex)
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('meets the target in hex for every default surface, both directions', () => {
    for (const [direction, lightnesses] of [
      ['darker', [0.97, 1, 0.94]],
      ['lighter', [0.2, 0.24, 0.16]],
    ]) {
      for (const target of [3, 4.5]) {
        for (const lightness of lightnesses) {
          const background = { lightness, chroma, hue };
          const result = solve(background, target, direction);
          expect(
            getHexContrastRatio(
              hexOf(result.lightness),
              hexOfBackground(background)
            )
          ).toBeGreaterThanOrEqual(target);
        }
      }
    }
  });

  it('is deterministic and normalises the hue it returns', () => {
    const background = { lightness: 0.97, chroma, hue };
    const first = solve(background, 4.5, 'darker');

    expect(solve(background, 4.5, 'darker')).toEqual(first);
    expect(
      findLightnessForContrast({
        background,
        target: 4.5,
        direction: 'darker',
        chroma,
        hue: hue + 360,
      })
    ).toEqual(first);
    expect(first.hue).toBe(hue);
  });

  it('throws when even black or white cannot reach the target', () => {
    expect(() => solve({ lightness: 0.5, chroma, hue }, 30, 'darker')).toThrow(
      /Unable to reach a 30:1 contrast ratio by making the color darker/
    );
    // Going lighter than white is impossible on a near-white surface.
    expect(() =>
      solve({ lightness: 0.97, chroma, hue }, 4.5, 'lighter')
    ).toThrow(
      /Unable to reach a 4\.5:1 contrast ratio by making the color lighter/
    );
  });

  it('throws instead of returning a hex fallback that misses the target', () => {
    // Black reaches this target against the exact background, but the 8-bit
    // background differs slightly, so no foreground satisfies it in hex.
    const background = { lightness: 0.5, chroma, hue };
    const target = getContrastRatio({ lightness: 0, chroma, hue }, background);

    expect(() => solve(background, target, 'darker')).toThrow(
      /in the 8-bit hex fallback/
    );
  });
});

describe('findLightnessForContrastAgainstAll — shared multi-background solve', () => {
  const chroma = 0.004;
  const hue = 262;
  const bg = (name, lightness) => ({
    name,
    color: { lightness, chroma, hue },
  });
  const hexOf = (lightness) =>
    oklchToHex(mapToSrgbGamut({ lightness, chroma, hue }));

  it.each([
    ['darker', [0.94, 0.97, 0.91]],
    ['lighter', [0.16, 0.2, 0.12]],
  ])(
    'returns one %s colour meeting the target on every background (OKLCH and hex)',
    (direction, lightnesses) => {
      const backgrounds = lightnesses.map((l, i) => bg(`field-0${i + 1}`, l));
      const result = findLightnessForContrastAgainstAll({
        backgrounds,
        target: 4.5,
        direction,
        chroma,
        hue,
      });

      for (const background of backgrounds) {
        expect(
          getContrastRatio(result, background.color)
        ).toBeGreaterThanOrEqual(4.5);
        expect(
          getHexContrastRatio(
            hexOf(result.lightness),
            oklchToHex(mapToSrgbGamut(background.color))
          )
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  );

  it('equals the most restrictive single-background solution', () => {
    const lightnesses = [0.94, 0.97, 0.91];
    const shared = findLightnessForContrastAgainstAll({
      backgrounds: lightnesses.map((l, i) => bg(`f${i}`, l)),
      target: 4.5,
      direction: 'darker',
      chroma,
      hue,
    });
    const hardest = findLightnessForContrast({
      background: { lightness: 0.91, chroma, hue },
      target: 4.5,
      direction: 'darker',
      chroma,
      hue,
    });

    expect(shared).toEqual(hardest);
  });

  it('matches findLightnessForContrast for a single background', () => {
    const background = { lightness: 0.97, chroma, hue };
    expect(
      findLightnessForContrastAgainstAll({
        backgrounds: [{ color: background }],
        target: 4.5,
        direction: 'darker',
        chroma,
        hue,
      })
    ).toEqual(
      findLightnessForContrast({
        background,
        target: 4.5,
        direction: 'darker',
        chroma,
        hue,
      })
    );
  });

  it('names every background with required and achievable ratios when unsatisfiable', () => {
    // 0.5 and 0.97 cannot both reach 7:1 going darker: against L=0.5 even
    // black is below 7:1.
    expect(() =>
      findLightnessForContrastAgainstAll({
        backgrounds: [bg('field-01', 0.97), bg('field-02', 0.5)],
        target: 7,
        direction: 'darker',
        chroma,
        hue,
      })
    ).toThrow(
      /field-01 \(L=0\.9700\): required 7:1, best achievable [\d.]+:1; field-02 \(L=0\.5000\): required 7:1, best achievable [\d.]+:1 \[FAILS\]/
    );
  });

  it('rejects an empty background list', () => {
    expect(() =>
      findLightnessForContrastAgainstAll({
        backgrounds: [],
        target: 4.5,
        direction: 'darker',
        chroma,
        hue,
      })
    ).toThrow(/no backgrounds/);
  });
});
