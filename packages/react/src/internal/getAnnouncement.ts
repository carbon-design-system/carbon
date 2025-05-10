/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** Returns an announcement message when the remaining count is low. */
export const getAnnouncement = (
  count: number,
  maxCount?: number,
  singularEntityName = 'character',
  pluralEntityName = 'characters'
) => {
  if (typeof maxCount === 'undefined') return null;

  const remaining = maxCount - count;

  if (remaining <= 10 && remaining > 0) {
    const entityName = remaining === 1 ? singularEntityName : pluralEntityName;
    return `${remaining} ${entityName} left.`;
  }

  if (remaining <= 0) {
    return `Maximum ${pluralEntityName} reached.`;
  }

  return null;
};
