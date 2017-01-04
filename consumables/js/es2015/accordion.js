import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/custom-event';

export default class Accordion {
  /**
   * Accordion.
   * @implements Component
   * @param {HTMLElement} element The element working as an accordion.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.options = Object.assign(Object.create(this.constructor.options), options);
    this.constructor.components.set(this.element, this);

    [... this.element.querySelectorAll(this.options.accordionItem)].forEach(item => {
      item.addEventListener('click', (event) => this.handleClick(event));
      item.addEventListener('keypress', (event) => this.handleKeypress(event));
    });
  }

  /**
   * Instantiates accordion of the given element.
   * @param {HTMLElement} element The element.
   */
  static create(element) {
    return this.components.get(element) || new this(element);
  }

  /**
   * Instantiates accordion UI in the given node.
   * If the given element indicates that it's an accordion UI, instantiates it.
   * Otherwise, instantiates accordion UIs by searching for accordion UIs in the given node.
   * @param {Node} target The DOM node to instantiate accordion UIs in. Should be a document or an element.
   * @param {Object} [options] The component options.
   * @param {boolean} [options.selectorInit] The CSS selector to find accordion UIs.
   */
  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target);
    } else {
      [... target.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element));
    }
  }

  /**
   * Handles toggling of active state of accordion
   * @param {Event} event The event triggering this method.
   */
  handleClick(event) {
    event.currentTarget.classList.toggle('bx--accordion__item--active');
  }

  /**
   * Handles toggling of active state of accordion via keyboard
   * @param {Event} event The event triggering this method.
   */
  handleKeypress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) this.handleClick(event);
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

/**
 * The map associating DOM element and accordion UI instance.
 * @type {WeakMap}
 */
Accordion.components = new WeakMap();

/**
 * The component options.
 * If `options` is specified in the constructor, {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
 * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
 * @property {string} selectorInit The CSS selector to find accordion UIs.
 */
Accordion.options = {
  selectorInit: '[data-accordion]',
  accordionItem: '[data-accordion-item]',
};
