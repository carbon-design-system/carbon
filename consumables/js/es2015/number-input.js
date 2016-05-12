import '../polyfills/array-from';

export default class NumberInput {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.constructor.components.set(this.element, this);
    this.element.addEventListener('click', (event) => this.handleClick(event));
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }

  static init(target = document) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.numberinput !== undefined) {
      this.create(target);
    } else {
      [... target.querySelectorAll('[data-numberinput]')].forEach(element => this.create(element));
    }
  }

  handleClick(event) {
    const state = event.target.classList;
    const numberInput = this.element.querySelector('.bx--number__input');

    if (state.contains('bx--number__arrow--icon-up')) {
      numberInput.stepUp();
    } else if (state.contains('bx--number__arrow--icon-down')) {
      numberInput.stepDown();
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

NumberInput.components = new WeakMap();
