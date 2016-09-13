import '../polyfills/array-from';
import '../polyfills/object-assign';
import '../polyfills/custom-event';

export default class UnifiedHeader {

  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign({
      // Data Attribute selectors
      // CSS Class Selectors
    }, options);
    document.body.classList.add('bx--global-light-ui');
    this.constructor.components.set(this.element, this);
  }

  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.tabs !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-unified-header]')].forEach(element => this.create(element, options));
    }
  }

  release() {
    if (this.handleDocumentClick) {
      this.element.ownerDocument.removeEventListener('click', (evt) => this.handleDocumentClick(evt));
    }
    this.constructor.components.delete(this.element);
  }
}

/**
 * The map associating DOM element and left navigation instance.
 * @type {WeakMap}
 */
UnifiedHeader.components = new WeakMap();
