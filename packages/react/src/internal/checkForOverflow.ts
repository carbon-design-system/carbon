//
// Copyright IBM Corp. 2024, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

/**
 * used to calculate if a element is overflowing the width or height of an area
 */

export const checkWidthOverflow = (el: HTMLElement | null): boolean => {
  if (el) {
    return el?.offsetWidth < el?.scrollWidth;
  }
  return false;
};

export const checkHeightOverflow = (el: HTMLElement | null): boolean => {
  if (el) {
    return el?.offsetHeight < el?.scrollHeight;
  }
  return false;
};
