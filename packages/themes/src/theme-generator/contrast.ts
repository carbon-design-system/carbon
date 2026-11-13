/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  decodeSrgb,
  hexToSrgb,
  mapToSrgbGamut,
  normalizeHue,
  oklchToHex,
  oklchToSrgb,
  type OklchColor,
  type SrgbColor,
} from './color';

/**
 * Computes WCAG 2.x relative luminance for a gamma-encoded sRGB color.
 * The coefficients (0.2126 / 0.7152 / 0.0722) are the ITU-R BT.709 primaries
 * linearized via the sRGB inverse transfer function.
 *
 * Reference: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function getRelativeLuminance({ red, green, blue }: SrgbColor) {
  return (
    0.2126 * decodeSrgb(red) +
    0.7152 * decodeSrgb(green) +
    0.0722 * decodeSrgb(blue)
  );
}

function contrastFromLuminance(first: number, second: number) {
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

/**
 * Computes the WCAG 2.x contrast ratio between two OKLCH colors.
 * Returns a value ≥ 1 (identical colors) up to 21 (black vs white).
 *
 * Reference: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function getContrastRatio(
  foreground: OklchColor,
  background: OklchColor
) {
  return contrastFromLuminance(
    getRelativeLuminance(oklchToSrgb(foreground)),
    getRelativeLuminance(oklchToSrgb(background))
  );
}

/**
 * Computes the WCAG 2.x contrast ratio between two 8-bit hex colors. This is
 * the ratio browsers without OKLCH support actually render from the
 * `@supports not (color: oklch(0 0 0))` fallback, which can differ slightly
 * from the ratio of the unquantized OKLCH colors.
 */
export function getHexContrastRatio(foreground: string, background: string) {
  return contrastFromLuminance(
    getRelativeLuminance(hexToSrgb(foreground)),
    getRelativeLuminance(hexToSrgb(background))
  );
}

/** A background a foreground must contrast with. `name` is used in errors only. */
export interface ContrastBackground {
  name?: string;
  color: OklchColor;
}

/**
 * Binary-searches for the OKLCH lightness that achieves at least `target`:1
 * WCAG contrast against `background`, moving in the specified `direction`.
 *
 * Single-background form of {@link findLightnessForContrastAgainstAll}; see
 * that function for the algorithm and failure modes.
 */
export function findLightnessForContrast({
  background,
  target,
  direction,
  chroma,
  hue,
}: {
  background: OklchColor;
  target: number;
  direction: 'lighter' | 'darker';
  chroma: number;
  hue: number;
}): OklchColor {
  return findLightnessForContrastAgainstAll({
    backgrounds: [{ color: background }],
    target,
    direction,
    chroma,
    hue,
  });
}

/**
 * Finds one OKLCH lightness that achieves at least `target`:1 WCAG contrast
 * against **every** background in `backgrounds`, moving in the specified
 * `direction`. Use this for a single shared token that is rendered on several
 * backgrounds (e.g. placeholder text on `field-01`/`-02`/`-03`).
 *
 * Hue and chroma are held constant; only lightness varies. The search starts
 * from the background that is hardest to satisfy (the darkest one for
 * `'darker'`, the lightest for `'lighter'`) and requires all backgrounds to
 * pass at each step. Within that range contrast against every background only
 * grows as lightness moves in `direction`, so the shared solution is the same
 * as the most restrictive individual solution.
 * 40 iterations achieve ~1e-12 lightness precision — well beyond perceptible
 * differences and far below any 8-bit display quantization.
 *
 * The OKLCH result is then nudged (0.0001 per step, in the contrast-increasing
 * direction) until the 8-bit hex fallbacks of foreground and every background
 * also meet `target`. Without this, quantizing to hex can drop a 4.5:1 token
 * to ~4.49:1 in browsers that use the `@supports not (color: oklch())`
 * fallback.
 *
 * Throws if the absolute boundary (L=0 or L=1) cannot meet `target` for every
 * background, or if the hex fallbacks cannot all meet it. The message lists
 * each background with the required and best achievable ratio so conflicting
 * backgrounds are explicit; the caller in `generate-theme.ts` catches and
 * re-throws with an actionable message.
 */
export function findLightnessForContrastAgainstAll({
  backgrounds,
  target,
  direction,
  chroma,
  hue,
}: {
  backgrounds: ContrastBackground[];
  target: number;
  direction: 'lighter' | 'darker';
  chroma: number;
  hue: number;
}): OklchColor {
  if (backgrounds.length === 0) {
    throw new Error('findLightnessForContrastAgainstAll: no backgrounds given');
  }
  const normHue = normalizeHue(hue);
  const lightnesses = backgrounds.map(({ color }) => color.lightness);
  let passing = direction === 'lighter' ? 1 : 0;
  let failing =
    direction === 'lighter'
      ? Math.max(...lightnesses)
      : Math.min(...lightnesses);
  const boundaryColor = { lightness: passing, chroma, hue: normHue };

  const describeBackgrounds = (ratioOf: (b: ContrastBackground) => number) =>
    backgrounds
      .map((background, index) => {
        const ratio = ratioOf(background);
        return (
          `${background.name ?? `background ${index + 1}`} ` +
          `(L=${background.color.lightness.toFixed(4)}): required ${target}:1, ` +
          `best achievable ${ratio.toFixed(4)}:1${ratio < target ? ' [FAILS]' : ''}`
        );
      })
      .join('; ');

  if (
    backgrounds.some(
      ({ color }) => getContrastRatio(boundaryColor, color) < target
    )
  ) {
    throw new Error(
      `Unable to reach a ${target}:1 contrast ratio by making the color ${direction}` +
        (backgrounds.length > 1 || backgrounds[0].name
          ? ` against ${describeBackgrounds(({ color }) => getContrastRatio(boundaryColor, color))}`
          : '')
    );
  }

  const meetsTarget = (lightness: number) =>
    backgrounds.every(
      ({ color }) =>
        getContrastRatio({ lightness, chroma, hue: normHue }, color) >= target
    );

  for (let index = 0; index < 40; index++) {
    const candidateLightness = (passing + failing) / 2;

    if (meetsTarget(candidateLightness)) {
      passing = candidateLightness;
    } else {
      failing = candidateLightness;
    }
  }

  // Round lightness to 4 decimal places in the direction that increases contrast.
  // For 'lighter', round UP (ceil); for 'darker', round DOWN (floor).
  const roundedLightness =
    direction === 'lighter'
      ? Math.min(1, Math.ceil(passing * 10000) / 10000)
      : Math.max(0, Math.floor(passing * 10000) / 10000);

  const backgroundHexes = backgrounds.map(({ color }) =>
    oklchToHex(mapToSrgbGamut(color))
  );
  const step = direction === 'lighter' ? 0.0001 : -0.0001;
  let lightness = roundedLightness;
  // 0.02 of lightness spans several 8-bit quantization steps; if the hex pair
  // still misses the target past that, the target is not reachable in hex.
  for (let attempt = 0; attempt <= 200; attempt++) {
    const hex = oklchToHex(mapToSrgbGamut({ lightness, chroma, hue: normHue }));
    if (
      backgroundHexes.every(
        (backgroundHex) => getHexContrastRatio(hex, backgroundHex) >= target
      )
    ) {
      return { lightness, chroma, hue: normHue };
    }
    const next = Number((lightness + step).toFixed(4));
    if (next < 0 || next > 1) {
      break;
    }
    lightness = next;
  }

  const lastHex = oklchToHex(
    mapToSrgbGamut({ lightness, chroma, hue: normHue })
  );
  throw new Error(
    `Unable to reach a ${target}:1 contrast ratio in the 8-bit hex fallback by making the color ${direction}` +
      (backgrounds.length > 1 || backgrounds[0].name
        ? ` against ${describeBackgrounds((background) =>
            getHexContrastRatio(
              lastHex,
              backgroundHexes[backgrounds.indexOf(background)]
            )
          )}`
        : '')
  );
}
