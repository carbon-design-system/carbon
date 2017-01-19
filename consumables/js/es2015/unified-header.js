import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/custom-event';

export default class UnifiedHeader {

  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign(this.constructor.options, options);
    this.constructor.components.set(this.element, this);
  }

  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target, effectiveOptions);
    } else {
      [...target.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element, effectiveOptions));
    }
  }

  release() {
    if (this.handleDocumentClick) {
      this.element.ownerDocument.removeEventListener('click', (evt) => { this.handleDocumentClick(evt); });
    }
    this.constructor.components.delete(this.element);
  }

  /**
   * The map associating DOM element and left navigation instance.
   * @member UnifiedHeader.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode UnifiedHeader.create .create()}, or {@linkcode UnifiedHeader.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode UnifiedHeader.init .init()} works.
   * @member UnifiedHeader.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find unified headers.
   */
  static options = {
    selectorInit: '[data-unified-header]',
    // Data Attribute selectors
    // CSS Class Selectors
  };
}
