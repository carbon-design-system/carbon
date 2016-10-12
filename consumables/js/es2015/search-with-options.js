import '../polyfills/array-from';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import toggleClass from '../polyfills/toggle-class';

export default class SearchWithOptions {
  /**
   * Search with Options.
   * @implements Component
   * @param {HTMLElement} element The element working as the search component.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorToggleLayoutBtn] The data attribute selector for the button that toggles between the layouts.
   * @param {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
   * @param {string} [options.classHiddenContainer] The class selector for a hidden container.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign(this.constructor.options, options);

    this.constructor.components.set(this.element, this);

    this.element.querySelector(this.options.selectorToggleLayoutBtn).addEventListener('click', (evt) => this.toggleLayout(evt));
  }

  /**
   * Instantiates a search component of the given element.
   * @param {HTMLElement} element The element working as the search component.
   * @param {Object} [options] The component options
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Instantiates a search component in the given node.
   * If the given element indicates that it's a search component (having `data-search-with-options` attribute), instantiates it.
   * Otherwise, instantiates the search component by searching for the search component in the given node.
   * @param {Node} target The DOM node to instantiate the search component in. Should be a document or an element..
   * @param {Object} [options] The component options
   * @param {string} [options.selectorInit] The CSS selector to find unified headers.
   */
  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE) {
      this.create(target, effectiveOptions);
    } else {
      [... target.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element, effectiveOptions));
    }
  }

  /**
   * Toggles between the grid and list layout.
   * @param {Event} event The event triggering this method.
   */
  toggleLayout(evt) {
    const btn = evt.currentTarget;
    const iconContainers = [... btn.querySelectorAll(this.options.selectorIconContainer)];
    iconContainers.forEach(container => {
      const isHidden = container.classList.contains(this.options.classHiddenContainer);
      toggleClass(container, this.options.classHiddenContainer, !isHidden);
    });
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

SearchWithOptions.components = new WeakMap();

/**
 * The component options.
 * If `options` is specified in the constructor, {@linkcode SearchWithOptions.create .create()}, or {@linkcode SearchWithOptions.init .init()},
 * properties in this object are overriden for the instance being create and how {@linkcode SearchWithOptions.init .init()} works.
 * @property {string} selectorInit The CSS selector to find search UIs with options.
 */
SearchWithOptions.options = {
  selectorInit: '[data-search-with-options]',
  selectorToggleLayoutBtn: '[data-search-toggle-btn]',
  selectorIconContainer: '[data-search-toggle-layout]',
  classHiddenContainer: 'bx--search__toggle-layout__container--hidden',
};
