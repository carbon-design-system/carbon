/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const isEllipsisActive = (element: any) => {
  if (element) {
    return element?.offsetWidth < element?.scrollWidth;
  }
  return false;
};
