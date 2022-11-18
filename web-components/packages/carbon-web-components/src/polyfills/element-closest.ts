/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (typeof Element.prototype.closest !== 'function') {
  Element.prototype.closest = function closestElement(selector: string) {
    const doc = this.ownerDocument;
    for (
      let traverse: Node | null = this;
      traverse && traverse !== doc;
      traverse = traverse.parentNode
    ) {
      if (
        traverse.nodeType === Node.ELEMENT_NODE &&
        (traverse as Element).matches(selector)
      ) {
        return traverse as Element;
      }
    }
    return null;
  };
}
