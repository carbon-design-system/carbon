import toggleClass from '../polyfills/toggle-class';

export default class Loading {
  /**
   * Spinner indicating loading state.
   * @implements Component
   * @param {HTMLElement} element The element working as a spinner.
   * @param {Object} options The component options.
   * @param {boolean} options.active `true` if this spinner should roll.
   */
  constructor(element, options = { active: true }) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.active = 'active' in options ? options.active : true;
    this.ie = false;

    // Check if browser is Internet Explorer
    if (options.ie || window.ActiveXObject || 'ActiveXObject' in window) {
      this.ie = true;
      this.element.classList.add('bx--loading--ie');
    }

    this.constructor.components.set(this.element, this);

    // Initialize spinner
    this.set(this.active);
  }

  /**
   * Instantiates spinner of the given element.
   * @param {HTMLElement} element The element.
   */
  static create(element) {
    return this.components.get(element) || new this(element);
  }

  /**
   * Instantiates spinner in the given node.
   * If the given element indicates that it's an spinner (having `data-loading` attribute), instantiates it.
   * Otherwise, instantiates spinners by searching for spinners in the given node.
   * @param {Node} target The DOM node to instantiate spinners in. Should be a document or an element.
   */
  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.loading !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-loading]')].forEach(element => this.create(element, options));
    }
  }

  /**
   * Sets active/inactive state.
   * @param {boolean} active `true` if this spinner should roll.
   */
  set(active) {
    if (typeof active !== 'boolean') {
      throw new TypeError('set expects a boolean.');
    }

    this.active = active;

    if (this.ie) {
      toggleClass(this.element, 'bx--loading--stop--ie', !this.active);
    }
    toggleClass(this.element, 'bx--loading--stop', !this.active);

    return this;
  }

  /**
   * Toggles active/inactive state.
   * @param {boolean} active `true` if this spinner should roll.
   */
  toggle() {
    return this.set(!this.active);
  }

  /**
   * @returns {boolean} `true` if this spinner is rolling roll.
   */
  isActive() {
    return this.active;
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

/**
 * The map associating DOM element and spinner instance.
 * @type {WeakMap}
 */
Loading.components = new WeakMap();
