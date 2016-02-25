import '../../global/js/array-from';

export default class OverflowMenu {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    OverflowMenu.components.set(this.element, this);

    this.element.addEventListener('click', (event) => this.openMenu(event));
  }

  openMenu(event) {
    if (event.currentTarget.tagName === 'A' || event.currentTarget.querySelector('a')) {
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
    OverflowMenu.components.delete(this.element);
  }

  static create(element) {
    return OverflowMenu.components.get(element) || new OverflowMenu(element);
  }
}

OverflowMenu.components = new WeakMap();
