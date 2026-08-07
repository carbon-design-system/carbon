/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum BigNumberSize {
  Default = 'default',
  Large = 'lg',
  XLarge = 'xl',
}

// = 'default' | 'lg' | 'xl'
export type BigNumberSizeValues = `${BigNumberSize}`;

export enum Characters {
  Dash = '–',
  Slash = '/',
}

export const DefaultLocale = 'en-US';

export const formatValue = (
  locale: Intl.LocalesArgument,
  value: number | null | undefined,
  fractionDigits: number,
  truncate: boolean
): string | null | undefined => {
  if (value === null || value === undefined || typeof value !== 'number') {
    return null;
  }

  return truncate
    ? Intl.NumberFormat(locale, {
        notation: 'compact',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: Math.round(fractionDigits),
      }).format(value)
    : Intl.NumberFormat(locale).format(value);
};

export const getIconSize = (size: BigNumberSizeValues): number => {
  switch (size) {
    case 'lg':
      return 20;
    case 'xl':
      return 24;
    default:
      return 16;
  }
};
