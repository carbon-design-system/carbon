/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Get the type size for the given step
 * @param {number} step
 * @returns {number}
 */
export function getTypeSize(step) {
  if (step <= 1) {
    return 12;
  }
  // Yn = Yn-1 + {FLOOR[(n - 2) / 4] + 1} * 2
  return getTypeSize(step - 1) + Math.floor((step - 2) / 4 + 1) * 2;
}

/**
 * The default type scale for 23 steps, where `scaleNN` is the size for step
 * `NN`. Inlined here through running the following step:
 *
 * > Array.from({ length: 23 }, (_, i) => getTypeSize(i + 1))
 *
 * The individual steps are also exported as scalars so other modules in this
 * package can reference them as plain identifiers. Member accesses like
 * `scale[0]` at module scope read as potential getter side effects to bundlers
 * and block tree shaking of otherwise-unused tokens.
 */
export const scale01 = 12;
export const scale02 = 14;
export const scale03 = 16;
export const scale04 = 18;
export const scale05 = 20;
export const scale06 = 24;
export const scale07 = 28;
export const scale08 = 32;
export const scale09 = 36;
export const scale10 = 42;
export const scale11 = 48;
export const scale12 = 54;
export const scale13 = 60;
export const scale14 = 68;
export const scale15 = 76;
export const scale16 = 84;
export const scale17 = 92;
export const scale18 = 102;
export const scale19 = 112;
export const scale20 = 122;
export const scale21 = 132;
export const scale22 = 144;
export const scale23 = 156;

export const scale = [
  scale01,
  scale02,
  scale03,
  scale04,
  scale05,
  scale06,
  scale07,
  scale08,
  scale09,
  scale10,
  scale11,
  scale12,
  scale13,
  scale14,
  scale15,
  scale16,
  scale17,
  scale18,
  scale19,
  scale20,
  scale21,
  scale22,
  scale23,
];
