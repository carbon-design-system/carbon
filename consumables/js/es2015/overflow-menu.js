import '../polyfills/array-from';

export default class OverflowMenu {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.constructor.components.set(this.element, this);

    this.element.addEventListener('click', (event) => this.openMenu(event));
  }

  static init() {
    [... document.querySelectorAll('[data-overflow-menu]')].forEach(element => this.create(element));
  }

  openMenu(event) {
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    if (this.element.classList.contains('open')) {
      this.element.classList.remove('open');
    } else {
      [... this.element.ownerDocument.querySelectorAll('[data-overflow-menu].open')].forEach((element) => {
        element.classList.remove('open');
      });

      this.element.classList.add('open');
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }
}

OverflowMenu.components = new WeakMap();
