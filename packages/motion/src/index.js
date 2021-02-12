/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const fast01 = '70ms';
export const fast02 = '110ms';
export const moderate01 = '150ms';
export const moderate02 = '240ms';
export const slow01 = '400ms';
export const slow02 = '700ms';

export const unstable_tokens = [
  'fast01',
  'fast02',
  'moderate01',
  'moderate02',
  'slow01',
  'slow02',
];

export const easings = {
  standard: {
    productive: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
    expressive: 'cubic-bezier(0.4, 0.14, 0.3, 1)',
  },
  entrance: {
    productive: 'cubic-bezier(0, 0, 0.38, 0.9)',
    expressive: 'cubic-bezier(0, 0, 0.3, 1)',
  },
  exit: {
    productive: 'cubic-bezier(0.2, 0, 1, 0.9)',
    expressive: 'cubic-bezier(0.4, 0.14, 1, 1)',
  },
};

export function motion(name, mode) {
  if (!easings[name]) {
    throw new Error(
      `Unable to find easing \`${name}\` in our supported easings. Expected ` +
        `One of: ${Object.keys(easings).join(', ')}`
    );
  }

  const easing = easings[name];
  if (!easing[mode]) {
    throw new Error(
      `Unable to find a mode for the easing \`${name}\` called: \`${mode}\``
    );
  }

  return easing[mode];
}
