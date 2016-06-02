export default class Toolbars {
  /**
   * Search button in tool bar.
   * @implements Component
   * @param {HTMLElement} element The element working as an search button.
   */
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.searchFieldNode = this.element.ownerDocument.querySelector(this.element.dataset.listIconsSearchActionTarget);

    this.constructor.components.set(this.element, this);

    this.element.addEventListener('click', (event) => this.handleActionClick(event));
  }

  /**
   * Instantiates a search button of the given element.
   * @param {HTMLElement} element The element working as a search button.
   */
  static create(element) {
    return this.components.get(element) || new this(element);
  }

  /**
   * Instantiates search buttons in the given node.
   * If the given element indicates that it's an search button (having `data-list-icons-search-action-target` attribute), instantiates it.
   * Otherwise, instantiates search buttons by searching for search buttons in the given node.
   * @param {Node} target The DOM node to instantiate search buttons in. Should be a document or an element.
   */
  static init(target = document) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.listIconsSearchActionTarget !== undefined) {
      this.create(target);
    } else {
      [... target.querySelectorAll('[data-list-icons-search-action-target]')].forEach(element => this.create(element));
    }
  }

  /**
   * Show/hide search box.
   * @param {Event} event The event triggering this method.
   */
  handleActionClick(event) {
    const searchActionNode = event.currentTarget;

    if (searchActionNode.tagName === 'A') {
      event.preventDefault();
    }

    this.element.classList.toggle('show-search');
    if (this.searchFieldNode) {
      this.searchFieldNode.classList.toggle('show-search');
      this.searchFieldNode.value = '';
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

/**
 * The map associating DOM element and search button instance.
 * @type {WeakMap}
 */
Toolbars.components = new WeakMap();
