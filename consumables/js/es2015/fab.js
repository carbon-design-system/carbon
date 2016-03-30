import eventMatches from '../polyfills/event-matches';

export default class FabButton {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;

    this.constructor.components.set(this.element, this);

    element.addEventListener('click', (event) => this.toggle(event));
  }

  static init() {
    document.addEventListener('click', (event) => {
      const element = eventMatches(event, '[data-fab]');
      if (element && !FabButton.components.has(element)) {
        FabButton.create(element).toggle(event);
      }
    });
  }

  toggle(event) {
    if (this.element.tagName === 'A') {
      event.preventDefault();
    }
    this.element.classList.toggle('is-closed');
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }
}

FabButton.components = new WeakMap();
