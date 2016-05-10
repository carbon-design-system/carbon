import '../polyfills/array-from';
import '../polyfills/object-assign';
import '../polyfills/custom-event';

export default class Dropdown {
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign({
      selectorItem: '[data-option] > .bx--dropdown__link',
      selectorItemSelected: '[data-option] > .bx--dropdown__link.bx--dropdown--selected',
      classSelected: 'bx--dropdown--selected',
      eventBeforeSelected: 'dropdown-beingselected',
      eventAfterSelected: 'dropdown-selected',
    }, options);

    this.element.dataset.dropdown = '';
    this.constructor.components.set(this.element, this);

    this.element.ownerDocument.addEventListener('click', (event) => this.toggle(event));
    this.element.addEventListener('keypress', (event) => this.toggle(event));
    this.element.addEventListener('click', (event) => this.selected(event));
  }

  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.loading !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-dropdown]')].forEach(element => this.create(element, options));
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  // Open and close dropdown menu
  toggle(event) {
    const isOfSelf = this.element.contains(event.target);

    if (isOfSelf) {
      this.element.classList.toggle('bx--dropdown--open');
    } else if (!isOfSelf && this.element.classList.contains('bx--dropdown--open')) {
      this.element.classList.remove('bx--dropdown--open');
    }
  }

  // Handles clicking on dropdown options.
  // * Change Dropdown text to selected option.
  // * Remove selected option from options when selected.
  // * Emit custom events.
  selected(event) {
    const activatedElement = event.target;
    if (activatedElement.parentElement.dataset.option !== undefined) {
      const eventStart = new CustomEvent(this.options.eventBeforeSelected, {
        bubbles: true,
        cancelable: true,
        detail: { item: activatedElement },
      });

      if (this.element.dispatchEvent(eventStart)) {
        this.element.firstElementChild.textContent = activatedElement.textContent;
        this.element.dataset.value = activatedElement.parentElement.dataset.value;

        [... this.element.querySelectorAll(this.options.selectorItemSelected)].forEach((item) => {
          if (activatedElement !== item) {
            item.classList.remove(this.options.classSelected);
          }
        });

        activatedElement.classList.add(this.options.classSelected);

        this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
          bubbles: true,
          cancelable: true,
          detail: { item: activatedElement },
        }));
      }
    }
  }
}

Dropdown.components = new WeakMap();
