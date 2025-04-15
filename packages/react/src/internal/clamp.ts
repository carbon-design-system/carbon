/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Clamps a number between a minimum and maximum value (inclusive).
 */
export const clamp = <T extends number>(num: number, min: T, max: T): T =>
  Math.min(max, Math.max(min, num)) as T;
