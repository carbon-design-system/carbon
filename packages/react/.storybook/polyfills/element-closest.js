/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (typeof Element.prototype.closest !== 'function') {
  Element.prototype.closest = function closestElement(selector) {
    const doc = this.ownerDocument;
    for (
      let traverse = this;
      traverse && traverse !== doc;
      traverse = traverse.parentNode
    ) {
      if (traverse.matches(selector)) {
        return traverse;
      }
    }
    return null;
  };
}
