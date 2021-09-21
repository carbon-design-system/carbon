/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function (ToMix) {
  /**
   * Mix-in class to instantiate components by searching for their root elements.
   * @class InitComponentBySearch
   */
  class InitComponentBySearch extends ToMix {
    /**
     * Instantiates component in the given node.
     * If the given element indicates that it's an component of this class, instantiates it.
     * Otherwise, instantiates components by searching for components in the given node.
     * @param {Node} target The DOM node to instantiate components in. Should be a document or an element.
     * @param {object} [options] The component options.
     * @param {boolean} [options.selectorInit] The CSS selector to find components.
     */
    static init(target = document, options = {}) {
      const effectiveOptions = Object.assign(
        Object.create(this.options),
        options
      );
      if (
        !target ||
        (target.nodeType !== Node.ELEMENT_NODE &&
          target.nodeType !== Node.DOCUMENT_NODE)
      ) {
        throw new TypeError(
          'DOM document or DOM element should be given to search for and initialize this widget.'
        );
      }
      if (
        target.nodeType === Node.ELEMENT_NODE &&
        target.matches(effectiveOptions.selectorInit)
      ) {
        this.create(target, options);
      } else {
        Array.prototype.forEach.call(
          target.querySelectorAll(effectiveOptions.selectorInit),
          (element) => this.create(element, options)
        );
      }
    }
  }
  return InitComponentBySearch;
}
