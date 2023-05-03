/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function useAnnouncer(textCount, maxCount, entityName) {
  const lastTen = maxCount - 10;
  if (textCount >= lastTen) {
    if (entityName) {
      return `${maxCount - textCount} ${entityName} left.`;
    }
    return `${maxCount - textCount} characters left.`;
  }
}
