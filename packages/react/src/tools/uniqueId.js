/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

let lastId = 0;

export default function uniqueId(prefix = 'id') {
  lastId++;
  return `${prefix}${lastId}`;
}
