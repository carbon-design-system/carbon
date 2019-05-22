/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function groupByKey(collection, sorter) {
  const result = {};

  for (let i = 0; i < collection.length; i++) {
    const element = collection[i];
    const key = sorter(element, i);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(element);
  }

  return result;
}
