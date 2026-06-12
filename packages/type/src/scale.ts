/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const getTypeSize = (step: number): number => {
  if (step <= 1) {
    return 12;
  }
  // Yn = Yn-1 + {FLOOR[(n - 2) / 4] + 1} * 2
  return getTypeSize(step - 1) + Math.floor((step - 2) / 4 + 1) * 2;
};

/**
 * Default type scale with 23 steps.
 *
 * Generated with:
 * ```ts
 * Array.from({ length: 23 }, (_, i) => getTypeSize(i + 1))
 * ```
 */
export const scale = [
  12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92, 102, 112,
  122, 132, 144, 156,
];
