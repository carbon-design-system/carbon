import debounce from 'lodash.debounce';

export default class DetailPageHeader {

  /**
   * The Detail Page Header.
   * @implements Component
   * @param {HTMLElement} element The element working as a page header.
   * @param {Object} [options] The component options.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign({
      slideUp: 'bx--detail-page-header--with-tabs--animated-slide-up',
    }, options);

    this.constructor.components.set(this.element, this);

    // Debounce scroll event calls to handleScroll
    const debouncedScroll = debounce(this.handleScroll.bind(this), 50);

    this.element.ownerDocument.defaultView.addEventListener('scroll', debouncedScroll);
  }

  /**
   * Instantiates detail page header of the given element.
   * @param {HTMLElement} element The element.
   * @param {Object} [options] The component options.
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Instantiates the detail page header in the given element.
   * If the given element indicates that it's a detail page header (animated) (having `data-detail-page-header` attribute), instantiates it.
   * Otherwise, instantiates detail page header by searching for detail page header in the given node.
   * @param {Node} target The DOM node to instantiate detail page header in. Should be a document or an element.
   * @param {Object} [options] The component options.
   */
  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.detailPageHeader !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-detail-page-header]')].forEach(element => this.create(element, options));
    }
  }

  /**
   * Adds class to header based on users position on the page
   */
  handleScroll() {
    if (this.element.ownerDocument.defaultView.scrollY > 101) {
      this.element.classList.add(this.options.slideUp);
    } else {
      this.element.classList.remove(this.options.slideUp);
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

/**
 * The map associating DOM element and detail page header instance.
 * @type {WeakMap}
 */
DetailPageHeader.components = new WeakMap();
