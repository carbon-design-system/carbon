import '../polyfills/array-from';
import '../polyfills/custom-event';
import '../polyfills/element-matches';
import '../polyfills/object-assign';

export default class CopyBtn {
  /**
   * CopyBtn UI.
   * @implements Component
   * @param {HTMLElement} element The element working as a copy button UI.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.constructor.components.set(this.element, this);

    this.options = Object.assign(Object.create(this.constructor.options), options);
    this.element.addEventListener('click', () => this.handleClick());
  }

  /**
   * Instantiates copy button UI of the given element.
   * @param {HTMLElement} element The element.
   */
  static create(element) {
    return this.components.get(element) || new this(element);
  }

  /**
   * Instantiates copy button UI in the given node.
   * If the given element indicates that it's an copy button UI, instantiates it.
   * Otherwise, instantiates copy button UIs by searching for copy button UIs in the given node.
   * @param {Node} target The DOM node to instantiate copy button UIs in. Should be a document or an element.
   * @param {Object} [options] The component options.
   * @param {boolean} [options.selectorInit] The CSS selector to find copy button UIs.
   */
  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target);
    } else {
      [... target.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element));
    }
  }

  /**
   * Show the feedback tooltip on click. Hide the feedback tooltip after specified timeout value.
   */
  handleClick() {
    const feedback = this.element.querySelector(this.options.feedbackTooltip);
    feedback.classList.add(this.options.classShowFeedback);
    setTimeout(() => {
      feedback.classList.remove(this.options.classShowFeedback);
    }, this.options.timeoutValue);
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  /**
   * The map associating DOM element and copy button UI instance.
   * @member CopyBtn.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode CopyBtn.create .create()}, or {@linkcode CopyBtn.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode CopyBtn.init .init()} works.
   * @member CopyBtn.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find copy button UIs.
   * @property {string} feedbackTooltip The data attribute to find feedback tooltip.
   * @property {string} classShowFeedback The CSS selector for showing the feedback tooltip.
   * @property {number} timeoutValue The specified timeout value before the feedback tooltip is hidden.
   */
  static options = {
    selectorInit: '[data-copy-btn]',
    feedbackTooltip: '[data-feedback]',
    classShowFeedback: 'bx--btn--copy__feedback--displayed',
    timeoutValue: 2000,
  };
}
