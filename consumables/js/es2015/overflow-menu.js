import '../polyfills/array-from';

export default class OverflowMenu {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.element.dataset.state = 'closed';
    this.constructor.components.set(this.element, this);
    this.element.ownerDocument.addEventListener('click', (event) => this.handleDocumentClick(event));
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }

  static init(target = document) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.overflowMenu !== undefined) {
      this.create(target);
    } else {
      [... target.querySelectorAll('[data-overflow-menu]')].forEach(element => this.create(element));
    }
  }

  handleDocumentClick(event) {
    const isOfSelf = this.element.contains(event.target);
    const shouldBeOpen = isOfSelf && this.element.dataset.state !== 'open';

    if (isOfSelf && this.element.tagName === 'A') {
      event.preventDefault();
    }

    this.element.dataset.state = shouldBeOpen ? 'open' : 'closed';
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

OverflowMenu.components = new WeakMap();
