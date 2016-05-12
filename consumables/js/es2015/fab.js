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

  static init(target = document) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.fab !== undefined) {
      this.create(target);
    } else {
      const handler = (event) => {
        const element = eventMatches(event, '[data-fab]');
        if (element && !this.components.has(element)) {
          this.create(element).toggle(event);
        }
      };
      target.addEventListener('click', handler);
      return {
        release: () => target.removeEventListener('click', handler),
      };
    }
  }

  toggle(event) {
    if (this.element.tagName === 'A') {
      event.preventDefault();
    }

    if (this.element.dataset.state === 'closed') {
      this.element.dataset.state = 'open';
    } else {
      this.element.dataset.state = 'closed';
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }
}

FabButton.components = new WeakMap();
