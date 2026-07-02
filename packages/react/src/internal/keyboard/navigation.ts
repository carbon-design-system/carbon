/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight } from './keys';
import { match } from './match';

/**
 * A "ring buffer" function that takes an array and, depending on an ArrowRight
 * or ArrowLeft key input, loops from last index to first or first index to last.
 *
 * @param key - the left or right arrow key (KeyboardEvent, number, or string)
 * @param index - the current index in the array
 * @param arrayLength - the total length of the array
 *
 * @example
 *  getNextIndex(keyCodes.RIGHT, 0, 4)
 */
export const getNextIndex = (
  key: KeyboardEvent | number | string,
  index: number,
  arrayLength: number
) => {
  if (match(key, ArrowRight)) {
    return (index + 1) % arrayLength;
  }

  if (match(key, ArrowLeft)) {
    return (index + arrayLength - 1) % arrayLength;
  }

  return;
};

/**
 * CSS selector that selects major nodes that are sequentially focusable.
 */
export const selectorTabbable = `
  a[href], area[href], input:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  iframe, object, embed, *[tabindex]:not([tabindex='-1']):not([disabled]), *[contenteditable=true]
`;

/**
 * CSS selector that selects major nodes that are click focusable.
 */
export const selectorFocusable = `
  a[href], area[href], input:not([disabled]),
  button:not([disabled]),select:not([disabled]),
  textarea:not([disabled]),
  iframe, object, embed, *[tabindex]:not([disabled]), *[contenteditable=true]
`;
