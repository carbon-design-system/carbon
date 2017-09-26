export default class DemoSwitcher {
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
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.demoSwitcher !== undefined) {
      this.create(target);
    } else {
      [...target.querySelectorAll('[data-demo-switcher]')].forEach(element => this.create(element));
    }
  }

  handleClick(event) {
    event.preventDefault();
    const demoContainer = document.querySelector('.demo--container');
    const flexRow = document.querySelector('#flex-row');
    const flexCol = document.querySelector('#flex-col');

    if (event.target.dataset.demoCol !== undefined) {
      demoContainer.classList.add('flex-col');
      demoContainer.classList.remove('flex-row');
      flexCol.checked = true;
      flexRow.checked = false;
    } else {
      demoContainer.classList.add('flex-row');
      demoContainer.classList.remove('flex-col');
      flexCol.checked = false;
      flexRow.checked = true;
    }
  }
}

DemoSwitcher.components = new WeakMap();
