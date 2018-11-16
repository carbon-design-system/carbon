import { baseFontSize, px } from '@carbon/layout';

// Font family fallbacks for: IBM Plex Mono, IBM Plex Sans, IBM Plex Sans
// Condensed, IBM Plex Sans Hebrew, and IBM Plex Serif
export const fontFamilies = {
  mono:
    "'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace",
  sans: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  sansCondensed:
    "'IBM Plex Sans Condensed', 'Helvetica Neue', Arial, sans-serif",
  sansHebrew:
    "'IBM Plex Sans Hebrew', 'Helvetica Hebrew', 'Arial Hebrew', sans-serif",
  serif: "'IBM Plex Serif', 'Georgia', Times, serif",
};

export function fontFamily(name) {
  if (!fontFamilies[name]) {
    throw new Error(
      `Unable to find font family: \`${name}\`. Expected one of: ` +
        `[${Object.keys(fontFamilies).join(', ')}]`
    );
  }
  return {
    fontFamily: fontFamilies[name],
  };
}

export const fontWeights = {
  light: 300,
  regular: 400,
  semibold: 600,
};

export function fontWeight(weight) {
  if (!fontWeights[weight]) {
    throw new Error(
      `Unable to find font weight: \`${weight}\`. Expected one of: ` +
        `[${Object.keys(fontWeights).join(', ')}]`
    );
  }
  return {
    fontWeight: fontWeights[weight],
  };
}

// Reset
export function reset() {
  return {
    html: {
      fontSize: px(baseFontSize),
    },
    body: {
      fontFamily: fontFamilies.sans,
      fontWeight: fontWeights.regular,
      textRendering: 'optimizeLegibility',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    },
  };
}

// Scale
export function getTypeSize(step) {
  if (step === 1) {
    return 12;
  }
  return getTypeSize(step - 1) + Math.floor((step - 2) / 4 + 1) * 2;
}

export const typeScale = Array.from({ length: 16 }, (_, i) =>
  getTypeSize(i + 1)
);

// Tokens
export const component01 = {
  fontFamily: fontFamilies.sans,
  fontSize: typeScale(2),
  fontWeight: fontWeights.regular,
  lineHeight: rem(18),
  letterSpacing: px(0.16),
};

export const componentBody01 = {
  fontFamily: fontFamilies.sans,
  fontSize: typeScale(2),
  fontWeight: fontWeights.regular,
  lineHeight: rem(20),
  letterSpacing: px(0.16),
};

export const componentHeader01 = {
  fontFamily: fontFamilies.sans,
  fontSize: typeScale(2),
  fontWeight: fontWeights.semibold,
  lineHeight: rem(18),
  letterSpacing: px(0.16),
};

export const component02 = {
  fontFamily: fontFamilies.sans,
  fontSize: typeScale(3),
  fontWeight: fontWeights.regular,
  lineHeight: rem(22),
  letterSpacing: px(0),
};

export const componentBody02 = {
  fontFamily: fontFamilies.sans,
  fontSize: typeScale(3),
  fontWeight: fontWeights.regular,
  lineHeight: rem(24),
  letterSpacing: px(0),
};

export const label01 = {
  fontFamily: fontFamilies.sans,
  fontSize: typeScale(1),
  fontWeight: fontWeights.regular,
  lineHeight: rem(16),
  letterSpacing: px(0.32),
};

export const helperText01 = {
  fontFamily: fontFamilies.sans,
  fontSize: typeScale(1),
  fontWeight: fontWeights.regular,
  fontStyle: 'italic',
  lineHeight: rem(16),
  letterSpacing: px(0.32),
};

export const code01 = {
  fontFamily: fontFamilies.mono,
  fontWeight: fontWeights.regular,
  fontSize: typeScale(1),
  lineHeight: rem(16),
  letterSpacing: px(0.32),
};

export const code02 = {
  fontFamily: fontFamilies.mono,
  fontWeight: fontWeights.regular,
  fontSize: typeScale(2),
  lineHeight: rem(20),
  letterSpacing: px(0.32),
};

export const heading01 = {
  fontFamily: fontFamilies.sans,
  fontSize: typeScale(5),
  fontWeight: fontWeights.regular,
  lineHeight: rem(26),
  letterSpacing: px(0),
};

export const heading02 = {
  fontFamily: fontFamilies.sans,
  fontSize: typeScale(6),
  fontWeight: fontWeights.regular,
  lineHeight: rem(30),
  letterSpacing: px(0),
};

export const heading03 = {
  fontFamily: fontFamilies.sans,
  fontSize: typeScale(8),
  fontWeight: fontWeights.regular,
  lineHeight: rem(40),
  letterSpacing: px(0),
};

export const body01 = {
  fontFamily: fontFamilies.sans,
  fontWeight: fontWeights.regular,
  fontSize: typeScale(1),
  lineHeight: rem(16),
  letterSpacing: px(0.32),
};

export const body02 = {
  fontFamily: fontFamilies.sans,
  fontWeight: fontWeights.regular,
  fontSize: typeScale(2),
  lineHeight: rem(20),
  letterSpacing: px(0.16),
};

export const body03 = {
  fontFamily: fontFamilies.sans,
  fontWeight: fontWeights.regular,
  fontSize: typeScale(3),
  lineHeight: rem(24),
  letterSpacing: px(0),
};

// Spacing
export const spacing = {
  margin01: rem(16),
  margin02: rem(24),
  margin03: rem(32),
  layout01: rem(48),
  layout02: rem(64),
  layout03: rem(80),
};
