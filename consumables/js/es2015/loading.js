import toggleClass from '../polyfills/toggle-class';
import '../polyfills/element-matches';

export default class Loading {
  /**
   * Spinner indicating loading state.
   * @implements Component
   * @param {HTMLElement} element The element working as a spinner.
   * @param {Object} [options] The component options.
   * @param {boolean} [options.active] `true` if this spinner should roll.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.options = Object.assign(Object.create(this.constructor.options), options);
    this.active = this.options.active;
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
   * If the given element indicates that it's an spinner, instantiates it.
   * Otherwise, instantiates spinners by searching for spinners in the given node.
   * @param {Node} target The DOM node to instantiate spinners in. Should be a document or an element.
   * @param {Object} [options] The component options.
   * @param {boolean} [options.selectorInit] The CSS selector to find spinners.
   * @param {boolean} [options.active] `true` if this spinner should roll.
   */
  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target, effectiveOptions);
    } else {
      [... target.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element, effectiveOptions));
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

/**
 * The component options.
 * If `options` is specified in the constructor, {@linkcode Loading.create .create()}, or {@linkcode Loading.init .init()},
 * properties in this object are overriden for the instance being create and how {@linkcode Loading.init .init()} works.
 * @property {string} selectorInit The CSS selector to find spinners.
 */
Loading.options = {
  selectorInit: '[data-loading]',
  active: true,
};
