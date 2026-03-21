/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (typeof Element.prototype.closest !== 'function') {
  Element.prototype.closest = function closestElement(
    this: Element,
    selector: string
  ) {
    const doc = this.ownerDocument;
    const findClosest = (traverse: Node | null): Element | null => {
      if (!traverse || traverse === doc) {
        return null;
      }

      if (
        traverse.nodeType === Node.ELEMENT_NODE &&
        (traverse as Element).matches(selector)
      ) {
        return traverse as Element;
      }

      return findClosest(traverse.parentNode);
    };

    return findClosest(this);
  };
}
