/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** A color in the OKLCH perceptual color space. Lightness is 0–1. */
export interface OklchColor {
  /** Perceived lightness, 0 (black) to 1 (white). */
  lightness: number;
  /** Chroma (colorfulness). 0 is achromatic; typical values are 0–0.4. */
  chroma: number;
  /** Hue angle in degrees, 0–360. */
  hue: number;
}

/** A color in the sRGB color space, channels in the range 0–1. */
export interface SrgbColor {
  red: number;
  green: number;
  blue: number;
}

/** Normalizes any hue angle into [0, 360). */
export function normalizeHue(hue: number) {
  return ((hue % 360) + 360) % 360;
}

/**
 * Clamps lightness to [0, 1] and rounds to 12 decimal places.
 * The rounding prevents floating-point drift from accumulating across
 * repeated delta operations (e.g. surface → field → accent).
 */
export function clampLightness(lightness: number) {
  return Number(Math.min(1, Math.max(0, lightness)).toFixed(12));
}

/** Formats an OklchColor as a CSS `oklch()` string with 6 significant figures. */
export function formatOklch({ lightness, chroma, hue }: OklchColor) {
  return `oklch(${formatNumber(lightness)} ${formatNumber(chroma)} ${formatNumber(
    normalizeHue(hue)
  )})`;
}

/**
 * Converts an OKLCH color to linear-light sRGB.
 *
 * The numerical constants are the standard inverse Oklab transformation matrices:
 * 1. Matrix M2^-1: Oklab (L, a, b) -> non-linear cone responses (L', M', S')
 *    [ +0.3963377774, +0.2158037573 ]
 *    [ -0.1055613458, -0.0638541728 ]
 *    [ -0.0894841775, -1.2914855480 ]
 *
 * 2. Matrix M1^-1: Linearized LMS cone space -> linear sRGB (R, G, B)
 *    [ +4.0767416621, -3.3077115913, +0.2309699292 ]
 *    [ -1.2684380046, +2.6097574011, -0.3413193965 ]
 *    [ -0.0041960863, -0.7034186147, +1.7076147010 ]
 *
 * Specifications & References:
 * - W3C CSS Color Module Level 4: https://www.w3.org/TR/css-color-4/#oklab-oklch
 * - Björn Ottosson (Oklab): https://bottosson.github.io/posts/oklab/
 */
export function oklchToLinearSrgb({
  lightness,
  chroma,
  hue,
}: OklchColor): SrgbColor {
  const hueRadians = (normalizeHue(hue) * Math.PI) / 180;
  const a = chroma * Math.cos(hueRadians);
  const b = chroma * Math.sin(hueRadians);

  // Step 1: Oklab (L, a, b) -> non-linear cone responses (L', M', S') via matrix M2^-1
  const lPrime = lightness + 0.3963377774 * a + 0.2158037573 * b;
  const mPrime = lightness - 0.1055613458 * a - 0.0638541728 * b;
  const sPrime = lightness - 0.0894841775 * a - 1.291485548 * b;

  // Step 2: Linearize cone responses (inverse cube root)
  const l = lPrime ** 3;
  const m = mPrime ** 3;
  const s = sPrime ** 3;

  // Step 3: LMS cone space -> linear sRGB channels (R, G, B) via matrix M1^-1
  return {
    red: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    green: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    blue: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

/** Returns true if all linear-sRGB channels are within [0, 1]. */
export function isInSrgbGamut(color: OklchColor) {
  return Object.values(oklchToLinearSrgb(color)).every(
    (channel) => channel >= 0 && channel <= 1
  );
}

/**
 * Returns the nearest in-gamut OKLCH color by binary-searching for the
 * highest chroma that still passes `isInSrgbGamut`. Lightness and hue are
 * preserved; only chroma is reduced.
 *
 * 40 iterations give ~1e-12 precision on chroma, which is well below the
 * 8-bit quantization step (~0.004) of the output hex.
 */
export function mapToSrgbGamut(color: OklchColor): OklchColor {
  if (isInSrgbGamut(color)) {
    return color;
  }

  let passingChroma = 0;
  let failingChroma = color.chroma;
  for (let index = 0; index < 40; index++) {
    const candidateChroma = (passingChroma + failingChroma) / 2;
    if (isInSrgbGamut({ ...color, chroma: candidateChroma })) {
      passingChroma = candidateChroma;
    } else {
      failingChroma = candidateChroma;
    }
  }

  return { ...color, chroma: passingChroma };
}

/** Converts an OKLCH color to gamma-encoded sRGB (channels 0–1). */
export function oklchToSrgb(color: OklchColor): SrgbColor {
  const linear = oklchToLinearSrgb(color);
  return {
    red: encodeSrgb(linear.red),
    green: encodeSrgb(linear.green),
    blue: encodeSrgb(linear.blue),
  };
}

/** Converts an OKLCH color to a 6-digit lowercase hex string (e.g. `#0f62fe`). */
export function oklchToHex(color: OklchColor) {
  const { red, green, blue } = oklchToSrgb(color);
  return `#${toHexByte(red)}${toHexByte(green)}${toHexByte(blue)}`;
}

/** Decodes a gamma-encoded sRGB channel (0–1) to linear-light sRGB. */
export function decodeSrgb(channel: number) {
  const clamped = Math.min(1, Math.max(0, channel));
  return clamped <= 0.04045
    ? clamped / 12.92
    : ((clamped + 0.055) / 1.055) ** 2.4;
}

/**
 * Converts a gamma-encoded sRGB color (0–1) to the OKLCH color space.
 *
 * The numerical constants are the standard forward Oklab transformation matrices:
 * 1. Matrix M1: Linear sRGB -> LMS cone space
 *    [ +0.4122214708, +0.5363325363, +0.0514459929 ]
 *    [ +0.2119034982, +0.6806995451, +0.1073969566 ]
 *    [ +0.0883024619, +0.2817188376, +0.6299787005 ]
 *
 * 2. Matrix M2: Non-linear LMS -> Oklab (L, a, b)
 *    [ +0.2104542553, +0.7936177850, -0.0040720468 ]
 *    [ +1.9779984951, -2.4285922050, +0.4505937099 ]
 *    [ +0.0259040371, +0.7827717662, -0.8086757660 ]
 *
 * Specifications & References:
 * - W3C CSS Color Module Level 4: https://www.w3.org/TR/css-color-4/#oklab-oklch
 * - Björn Ottosson (Oklab): https://bottosson.github.io/posts/oklab/
 */
export function srgbToOklch({ red, green, blue }: SrgbColor): OklchColor {
  // Step 1: Linearize sRGB channels via inverse gamma (IEC 61966-2-1)
  const lr = decodeSrgb(red);
  const lg = decodeSrgb(green);
  const lb = decodeSrgb(blue);

  // Step 2: Linear sRGB -> LMS cone space via matrix M1
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  // Step 3: Non-linear cube root response (human perceptual brightness compression)
  const lPrime = Math.cbrt(l);
  const mPrime = Math.cbrt(m);
  const sPrime = Math.cbrt(s);

  // Step 4: Non-linear LMS -> Oklab (L, a, b) via matrix M2
  const lightness =
    0.2104542553 * lPrime + 0.793617785 * mPrime - 0.0040720468 * sPrime;
  const a =
    1.9779984951 * lPrime - 2.428592205 * mPrime + 0.4505937099 * sPrime;
  const b =
    0.0259040371 * lPrime + 0.7827717662 * mPrime - 0.808675766 * sPrime;

  // Step 5: Cartesian (a, b) -> Cylindrical (Chroma, Hue)
  const chroma = Math.sqrt(a * a + b * b);
  const hue = normalizeHue((Math.atan2(b, a) * 180) / Math.PI);

  return { lightness, chroma, hue };
}

/** Parses a 6-digit `#rrggbb` hex string into gamma-encoded sRGB (0–1). */
export function hexToSrgb(hex: string): SrgbColor {
  if (!/^#[\da-f]{6}$/i.test(hex)) {
    throw new Error(
      `hexToSrgb: expected a 6-digit hex color, received "${hex}"`
    );
  }
  return {
    red: parseInt(hex.slice(1, 3), 16) / 255,
    green: parseInt(hex.slice(3, 5), 16) / 255,
    blue: parseInt(hex.slice(5, 7), 16) / 255,
  };
}

/**
 * Converts a 6-digit hex color string (e.g. `#da1e28` or `da1e28`) to an OKLCH
 * color. Throws on malformed input rather than returning NaN components.
 */
export function hexToOklch(hex: string): OklchColor {
  const trimmed = hex.trim();
  return srgbToOklch(
    hexToSrgb(trimmed.startsWith('#') ? trimmed : `#${trimmed}`)
  );
}

/**
 * Applies the IEC 61966-2-1 sRGB gamma transfer function to a single
 * linear-light channel. Values outside [0, 1] are clamped first.
 */
function encodeSrgb(channel: number) {
  const clamped = Math.min(1, Math.max(0, channel));
  return clamped <= 0.0031308
    ? 12.92 * clamped
    : 1.055 * clamped ** (1 / 2.4) - 0.055;
}

/** Converts a gamma-encoded sRGB channel (0–1) to a 2-digit hex byte. */
function toHexByte(channel: number) {
  return Math.round(channel * 255)
    .toString(16)
    .padStart(2, '0');
}

/** Rounds a number to 6 decimal places for compact CSS output. */
function formatNumber(value: number) {
  return Number(value.toFixed(6));
}
