/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const checkForHoldingKey = (event, key) => {
  // possible key inputs: altKey,ctrlKey,metaKey,shiftKey
  if (key == 'cmd') {
    return event.metaKey || event.ctrlKey;
  } else {
    return event[key];
  }
};
