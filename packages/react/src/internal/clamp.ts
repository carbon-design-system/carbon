/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Clamps a value between a minimum and maximum value (inclusive).
 *
 * @param value - The number to clamp.
 * @param [min] - The lower bound.
 * @param [max] - The upper bound.
 * @returns The clamped value.
 */
export const clamp = (value: number, min?: number, max?: number) =>
  Math.min(max ?? Infinity, Math.max(min ?? -Infinity, value));
