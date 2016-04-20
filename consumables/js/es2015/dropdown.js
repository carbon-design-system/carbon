import '../polyfills/array-from';

export default class Dropdown {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.element.dataset.dropdown = '';
    this.element.dataset.state = 'closed';
    this.constructor.components.set(this.element, this);

    this.element.ownerDocument.addEventListener('click', (event) => this.toggle(event));
    this.element.addEventListener('keypress', (event) => this.toggle(event));
    this.element.addEventListener('click', (event) => this.selected(event));
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }

  static init(target = document) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.loading !== undefined) {
      this.create(target);
    } else {
      [... target.querySelectorAll('[data-dropdown]')].forEach(element => this.create(element));
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  // Open and close dropdown menu
  toggle() {
    const isOfSelf = this.element.contains(event.target);
    const shouldBeOpen = isOfSelf && this.element.dataset.state !== 'open';

    this.element.dataset.state = shouldBeOpen ? 'open' : 'closed';
  }

  // Handles clicking on dropdown options.
  // * Change Dropdown text to selected option
  // * Remove selected option from options when selected.
  selected(event) {
    if (event.target.parentElement.dataset.option !== undefined) {
      this.element.firstElementChild.textContent = event.target.textContent;
      this.element.dataset.value = event.target.dataset.value;

      if (this.selectedItem) {
        this.selectedItem.classList.remove('bx--dropdown--selected');
      }

      event.target.classList.add('bx--dropdown--selected');
      this.selectedItem = event.target;
    }
  }
}

Dropdown.components = new WeakMap();
