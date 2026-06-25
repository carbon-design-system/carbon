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

// 'default' | 'lg' | 'xl'
export type BigNumberSizeValues = `${BigNumberSize}`;

export enum Characters {
  Dash = '–',
  Slash = '/',
  Percentage = '%',
}

export const DefaultLocale = 'en-US';
export const UNKNOWN = 'Unknown';
