// Convert
// Default, Use with em() and rem() functions
export const baseFontSize = 16;

/**
 * Convert a given px unit to a rem unit
 * @param {number} px
 * @return {string}
 */
export function rem(px) {
  return `${px / baseFontSize}rem`;
}

/**
 * Convert a given px unit to a em unit
 * @param {number} px
 * @return {string}
 */
export function em(px) {
  return `${px / baseFontSize}em`;
}

export function px(value) {
  return `${value}px`;
}

// Breakpoint
// Initial map of our breakpoints and their values
export const breakpoints = {
  sm: {
    width: rem(320),
    columns: 4,
    gutter: rem(16),
    margin: 0,
  },
  md: {
    width: rem(672),
    columns: 8,
    gutter: rem(16),
    margin: rem(16),
  },
  lg: {
    width: rem(1056),
    columns: 16,
    gutter: rem(16),
    margin: rem(16),
  },
  xlg: {
    width: rem(1312),
    columns: 16,
    gutter: rem(16),
    margin: rem(16),
  },
  max: {
    width: rem(1584),
    columns: 16,
    gutter: rem(16),
    margin: rem(16),
  },
};

export const smallestBreakpoint = Object.keys(breakpoints)[0];

export function isSmallestBreakpoint(name) {
  return name === smallestBreakpoint;
}

/**
 * Generate a media query up to the width of the given breakpoint name
 * @param {string} name
 * @param {Object} styles
 * @return {Object}
 */
export function breakpointUp(name, styles = {}) {
  if (!breakpoints[name]) {
    throw new Error(
      `Unable to find breakpoint \`${name}\`. Expected one of: ` +
        `[${Object.keys(breakpoints).join(', ')}]`
    );
  }

  if (isSmallestBreakpoint(name)) {
    return styles;
  }

  return {
    [`@media (min-width: ${breakpoints[name].width})`]: styles,
  };
}

/**
 * Generate a media query for the maximum width of the given styles
 * @param {string} name
 * @param {Object} styles
 * @return {Object}
 */
export function breakpointDown(name, styles = {}) {
  if (!breakpoints[name]) {
    throw new Error(
      `Unable to find breakpoint \`${name}\`. Expected one of: ` +
        `[${Object.keys(breakpoints).join(', ')}]`
    );
  }

  if (isSmallestBreakpoint(name)) {
    return styles;
  }

  return {
    [`@media (max-width: ${breakpoints[name].width})`]: styles,
  };
}

export function breakpoint(...args) {
  return breakpointUp(...args);
}

// Mini-unit
export const miniUnit = 8;
export function miniUnits(count) {
  return rem(miniUnit * count);
}

// Spacing
// Supports 0, 2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 96px
export const spacing = [
  0,
  miniUnits(0.25),
  miniUnits(0.5),
  miniUnits(1),
  miniUnits(1.5),
  miniUnits(2),
  miniUnits(3),
  miniUnits(4),
  miniUnits(6),
  miniUnits(8),
  miniUnits(10),
  miniUnits(12),
];
