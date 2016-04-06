export default class Spinner {
  constructor(element, options = { active: true }) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.active = 'active' in options ? options.active : true;

    this.ie = false;

    // check if browser is Internet Explorer
    if (options.ie || window.ActiveXObject || 'ActiveXObject' in window) {
      this.ie = true;
      this.element.classList.add('is--ie');
    }

    this.constructor.components.set(this.element, this);

    // initialize spinner
    this.set(this.active);
  }

  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.spinner !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-spinner]')].forEach(element => this.create(element, options));
    }
  }

  set(active) {
    if (typeof active !== 'boolean') {
      throw new TypeError('set expects a boolean.');
    }

    this.active = active;

    if (this.active) {
      this.element.classList.remove('is-stopping--ie', 'is-stopping');
    } else {
      if (this.ie) {
        this.element.classList.add('is-stopping--ie');
      } else {
        this.element.classList.add('is-stopping');
      }
    }

    return this;
  }

  toggle() {
    return this.set(!this.active);
  }

  isActive() {
    return this.active;
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }
}

Spinner.components = new WeakMap();
