/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export function useAnnouncer(textCount, maxCount, entityName = 'characters') {
  const remaining = maxCount - textCount;

  if (remaining <= 10 && remaining > 0) {
    const entity = remaining === 1 ? entityName.slice(0, -1) : entityName;
    return `${remaining} ${entity} left.`;
  }

  if (remaining <= 0) {
    return `Maximum ${entityName} reached.`;
  }

  return null;
}
