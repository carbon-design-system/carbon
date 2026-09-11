/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Re-export individual token constants generated from src/dtcg/layout.json
// via the Style Dictionary pipeline (tasks/build.mjs → style-dictionary/sd.config.js).
// The generated file is kept in sync with the DTCG source of truth.
export * from '../js/generated/layout-tokens';

import { unstable_tokens } from './tokens';
import {
  spacing01,
  spacing02,
  spacing03,
  spacing04,
  spacing05,
  spacing06,
  spacing07,
  spacing08,
  spacing09,
  spacing10,
  spacing11,
  spacing12,
  spacing13,
  fluidSpacing01,
  fluidSpacing02,
  fluidSpacing03,
  fluidSpacing04,
  container01,
  container02,
  container03,
  container04,
  container05,
  sizeXs,
  sizeSm,
  sizeMd,
  sizeLg,
  sizeXl,
  size2xl,
  iconSize01,
  iconSize02,
  layout01,
  layout02,
  layout03,
  layout04,
  layout05,
  layout06,
  layout07,
  borderRadius00,
  borderRadius02,
  borderRadius04,
  borderRadius08,
  borderRadius16,
  borderRadius24,
  borderRadiusMax,
} from '../js/generated/layout-tokens';

export { unstable_tokens };

export type BreakpointName = 'sm' | 'md' | 'lg' | 'xlg' | 'max';
export type Breakpoint = {
  width: string;
  columns: number;
  margin: string;
};
export type SizeName =
  | 'XSmall'
  | 'Small'
  | 'Medium'
  | 'Large'
  | 'XLarge'
  | '2XLarge';
export type BorderRadiusToken =
  | 'border-radius-00'
  | 'border-radius-02'
  | 'border-radius-04'
  | 'border-radius-08'
  | 'border-radius-16'
  | 'border-radius-24'
  | 'border-radius-max';

// Convert
// Default, Use with em() and rem() functions
export const baseFontSize = 16;

export const rem = (px: number) => {
  return `${px / baseFontSize}rem`;
};

export const em = (px: number) => {
  return `${px / baseFontSize}em`;
};

export const px = (value: number) => {
  return `${value}px`;
};

// Breakpoint
// Initial map of our breakpoints and their values
export const breakpoints: Record<BreakpointName, Breakpoint> = {
  sm: {
    width: rem(320),
    columns: 4,
    margin: '0',
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
    margin: rem(24),
  },
};

export const breakpointUp = (name: BreakpointName) => {
  return `@media (min-width: ${breakpoints[name].width})`;
};

export const breakpointDown = (name: BreakpointName) => {
  return `@media (max-width: ${breakpoints[name].width})`;
};

export const breakpoint = breakpointUp;

// Mini-unit
export const miniUnit = 8;

export const miniUnits = (count: number) => {
  return rem(miniUnit * count);
};

// Spacing — aggregate array (individual tokens come from generated re-export above)
export const spacing = [
  spacing01,
  spacing02,
  spacing03,
  spacing04,
  spacing05,
  spacing06,
  spacing07,
  spacing08,
  spacing09,
  spacing10,
  spacing11,
  spacing12,
  spacing13,
];

// Fluid spacing — aggregate array
export const fluidSpacing = [
  fluidSpacing01,
  fluidSpacing02,
  fluidSpacing03,
  fluidSpacing04,
];

// Layout (deprecated) — aggregate array
export const layout = [
  layout01,
  layout02,
  layout03,
  layout04,
  layout05,
  layout06,
  layout07,
];

// Container — aggregate array
export const container = [
  container01,
  container02,
  container03,
  container04,
  container05,
];

// Size — camelCase aliases matching the existing SizeName API
export const sizeXSmall = sizeXs;
export const sizeSmall = sizeSm;
export const sizeMedium = sizeMd;
export const sizeLarge = sizeLg;
export const sizeXLarge = sizeXl;
export const size2XLarge = size2xl;
export const sizes: Record<SizeName, string> = {
  XSmall: sizeXSmall,
  Small: sizeSmall,
  Medium: sizeMedium,
  Large: sizeLarge,
  XLarge: sizeXLarge,
  '2XLarge': size2XLarge,
};

// Icon — aggregate array
export const iconSize = [iconSize01, iconSize02];

// Border radius — aggregate record keyed by CSS custom property name
export const borderRadius: Record<BorderRadiusToken, string> = {
  'border-radius-00': borderRadius00,
  'border-radius-02': borderRadius02,
  'border-radius-04': borderRadius04,
  'border-radius-08': borderRadius08,
  'border-radius-16': borderRadius16,
  'border-radius-24': borderRadius24,
  'border-radius-max': borderRadiusMax,
};
