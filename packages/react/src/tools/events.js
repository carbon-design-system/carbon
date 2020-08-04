/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const composeEventHandlers = (fns) => (event, ...args) => {
  for (let i = 0; i < fns.length; i++) {
    if (event.defaultPrevented) {
      break;
    }
    if (typeof fns[i] === 'function') {
      fns[i](event, ...args);
    }
  }
};
