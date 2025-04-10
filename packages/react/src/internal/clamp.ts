/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Synonymous to ECMA2017+ `Math.clamp`.
 *
 * @param {number} val
 * @param {number} min
 * @param {number} max
 *
 * @returns `val` if `max>=val>=min`; `min` if `val<min`; `max` if `val>max`.
 */
export const clamp = (value: number, min?: number, max?: number) =>
  Math.min(max ?? Infinity, Math.max(min ?? -Infinity, value));
