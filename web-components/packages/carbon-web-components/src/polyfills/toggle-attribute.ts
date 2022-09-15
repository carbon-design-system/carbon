/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (!Element.prototype.toggleAttribute) {
  Element.prototype.toggleAttribute = function toggleAttribute(name: string, force?: boolean) {
    const oldState = Boolean(this.hasAttribute(name));
    const newState = typeof force !== 'undefined' ? Boolean(force) : !oldState;
    if (oldState !== newState) {
      if (newState) {
        this.setAttribute(name, '');
      } else {
        this.removeAttribute(name);
      }
    }
    return newState;
  };
}
