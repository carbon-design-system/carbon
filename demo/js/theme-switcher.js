export default class ThemeSwitcher {

  constructor(element = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.constructor.components.set(this.element, this);
    this.element.addEventListener('click', event => this.handleClick(event));
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
      [...target.querySelectorAll('[data-theme-switcher]')].forEach(element => this.create(element));
    }
  }

  handleClick(event) {
    event.preventDefault();
    const body = document.querySelector('body');
    body.classList.toggle('bx--global-light-ui');
  }
}

ThemeSwitcher.components = new WeakMap();
