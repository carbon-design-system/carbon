export default class Toolbars {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.searchFieldNode = this.element.ownerDocument.querySelector(this.element.dataset.listIconsSearchActionTarget);

    this.constructor.components.set(this.element, this);

    this.element.addEventListener('click', (event) => this.handleActionClick(event));
  }

  static init(target = document) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.listIconsSearchActionTarget !== undefined) {
      this.create(target);
    } else {
      [... target.querySelectorAll('[data-list-icons-search-action-target]')].forEach(element => this.create(element));
    }
  }

  handleActionClick(event) {
    const searchActionNode = event.currentTarget;

    if (searchActionNode.tagName === 'A') {
      event.preventDefault();
    }

    this.element.classList.toggle('show-search');
    if (this.searchFieldNode) {
      this.searchFieldNode.classList.toggle('show-search');
      this.searchFieldNode.value = '';
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }
}

Toolbars.components = new WeakMap();
