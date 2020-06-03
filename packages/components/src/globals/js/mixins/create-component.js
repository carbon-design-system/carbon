/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function (ToMix) {
  class CreateComponent extends ToMix {
    /**
     * The component instances managed by this component.
     * Releasing this component also releases the components in `this.children`.
     * @type {Component[]}
     */
    children = [];

    /**
     * Mix-in class to manage lifecycle of component.
     * The constructor sets up this component's effective options,
     * and registers this component't instance associated to an element.
     * @implements Handle
     * @param {HTMLElement} element The element working as this component.
     * @param {object} [options] The component options.
     */
    constructor(element, options = {}) {
      super(element, options);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError(
          'DOM element should be given to initialize this widget.'
        );
      }

      /**
       * The element the component is of.
       * @type {Element}
       */
      this.element = element;

      /**
       * The component options.
       * @type {object}
       */
      this.options = Object.assign(
        Object.create(this.constructor.options),
        options
      );

      this.constructor.components.set(this.element, this);
    }

    /**
     * Instantiates this component of the given element.
     * @param {HTMLElement} element The element.
     */
    static create(element, options) {
      return this.components.get(element) || new this(element, options);
    }

    /**
     * Releases this component's instance from the associated element.
     */
    release() {
      for (
        let child = this.children.pop();
        child;
        child = this.children.pop()
      ) {
        child.release();
      }
      this.constructor.components.delete(this.element);
      return null;
    }
  }
  return CreateComponent;
}
