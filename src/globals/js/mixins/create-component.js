export default function (ToMix) {
  class CreateComponent extends ToMix {
    /**
     * Mix-in class to manage lifecycle of component.
     * The constructor sets up this component's effective options,
     * and registers this component't instance associated to an element.
     * @implements Handle
     * @param {HTMLElement} element The element working as this component.
     * @param {Object} [options] The component options.
     */
    constructor(element, options = {}) {
      super(element, options);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;
      this.options = Object.assign(Object.create(this.constructor.options), options);
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
      this.constructor.components.delete(this.element);
      return null;
    }
  }
  return CreateComponent;
}
