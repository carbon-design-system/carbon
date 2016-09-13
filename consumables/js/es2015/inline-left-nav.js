export default class InlineLeftNav {
  /**
   * Spinner indicating loading state.
   * @implements Component
   * @param {HTMLElement} element The element working as a spinner.
   * @param {Object} options The component options.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.options = Object.assign({
      // Data Attribute selectors
      selectorLeftNavListItem: '[data-left-nav-item]',
      selectorLeftNavListItemLink: '[data-left-nav-item-link]',
      // CSS Class Selectors
      classActiveLeftNavListItem: 'left-nav-list__item--active',
    }, options);

    this.element = element;

    this.constructor.components.set(this.element, this);

    this.hookListItemEvents();
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
    if (target.nodeType === Node.ELEMENT_NODE) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-inline-left-nav]')].forEach(element => this.create(element, options));
    }
  }

  hookListItemEvents() {
    const listItems = [... this.element.querySelectorAll(this.options.selectorLeftNavListItem)];
    listItems.forEach(item => {
      item.addEventListener('click', () => {
        this.addActiveListItem(item);
      });
    });
  }

  addActiveListItem(item) {
    const listItems = [... this.element.querySelectorAll(this.options.selectorLeftNavListItem)];
    listItems.forEach(currentItem => {
      if (currentItem === item) {
        currentItem.classList.add(this.options.classActiveLeftNavListItem);
      } else {
        currentItem.classList.remove(this.options.classActiveLeftNavListItem);
      }
    });
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

/**
 * The map associating DOM element and spinner instance.
 * @type {WeakMap}
 */
InlineLeftNav.components = new WeakMap();
