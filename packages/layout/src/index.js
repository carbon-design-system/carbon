/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
    margin: 0,
  },
  md: {
    width: rem(672),
    columns: 8,
    margin: rem(16),
  },
  lg: {
    width: rem(1056),
    columns: 16,
    margin: rem(16),
  },
  xlg: {
    width: rem(1312),
    columns: 16,
    margin: rem(16),
  },
  max: {
    width: rem(1584),
    columns: 16,
    margin: rem(16),
  },
};

export function breakpointUp(name) {
  return `@media (min-width: ${breakpoints[name].width})`;
}

export function breakpointDown(name) {
  return `@media (max-width: ${breakpoints[name].width})`;
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
