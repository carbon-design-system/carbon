/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface OklchColor {
  lightness: number;
  chroma: number;
  hue: number;
}

export interface SrgbColor {
  red: number;
  green: number;
  blue: number;
}

function normalizeHue(hue: number) {
  return ((hue % 360) + 360) % 360;
}

export function clampLightness(lightness: number) {
  return Number(Math.min(1, Math.max(0, lightness)).toFixed(12));
}

export function formatOklch({ lightness, chroma, hue }: OklchColor) {
  return `oklch(${formatNumber(lightness)} ${formatNumber(chroma)} ${formatNumber(
    normalizeHue(hue)
  )})`;
}

export function oklchToLinearSrgb({
  lightness,
  chroma,
  hue,
}: OklchColor): SrgbColor {
  const hueRadians = (normalizeHue(hue) * Math.PI) / 180;
  const a = chroma * Math.cos(hueRadians);
  const b = chroma * Math.sin(hueRadians);
  const lPrime = lightness + 0.3963377774 * a + 0.2158037573 * b;
  const mPrime = lightness - 0.1055613458 * a - 0.0638541728 * b;
  const sPrime = lightness - 0.0894841775 * a - 1.291485548 * b;
  const l = lPrime ** 3;
  const m = mPrime ** 3;
  const s = sPrime ** 3;

  return {
    red: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    green: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    blue: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

export function isInSrgbGamut(color: OklchColor) {
  return Object.values(oklchToLinearSrgb(color)).every(
    (channel) => channel >= 0 && channel <= 1
  );
}

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

export function oklchToSrgb(color: OklchColor): SrgbColor {
  const linear = oklchToLinearSrgb(color);
  return {
    red: encodeSrgb(linear.red),
    green: encodeSrgb(linear.green),
    blue: encodeSrgb(linear.blue),
  };
}

export function oklchToHex(color: OklchColor) {
  const { red, green, blue } = oklchToSrgb(color);
  return `#${toHexByte(red)}${toHexByte(green)}${toHexByte(blue)}`;
}

function encodeSrgb(channel: number) {
  const clamped = Math.min(1, Math.max(0, channel));
  return clamped <= 0.0031308
    ? 12.92 * clamped
    : 1.055 * clamped ** (1 / 2.4) - 0.055;
}

function toHexByte(channel: number) {
  return Math.round(channel * 255)
    .toString(16)
    .padStart(2, '0');
}

function formatNumber(value: number) {
  return Number(value.toFixed(6));
}
