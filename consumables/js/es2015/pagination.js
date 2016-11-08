export default class Pagination {
  /**
  * Pagination component.
  * @implements Component
  * @param {HTMLElement} element The element working as a pagination component.
  * @param {Object} [options] The component options.
  * @property {string} [selectorInit] The CSS selector to find pagination components.
  * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines the number of items per page.
  * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
  * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
  * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
  * @property {string} [eventItemsPerPage]
  *   The name of the custom event fired when a user changes the number of items per page.
  *   event.detail.value contains the number of items a user wishes to see.
  * @property {string} [eventPageNumber]
  *   The name of the custom event fired when a user inputs a specific page number.
  *   event.detail.value contains the value that the user input.
  * @property {string} [eventPageChange]
  *   The name of the custom event fired when a user goes forward or backward a page.
  *   event.detail.direction contains the direction a user wishes to go.
  */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign(Object.create(this.constructor.options), options);

    this.constructor.components.set(this.element, this);

    this.element.addEventListener('click', (evt) => {
      if (evt.target.matches(this.options.selectorPageBackward)) {
        const detail = {
          initialEvt: evt,
          element: evt.target,
          direction: 'backward',
        };
        this.emitEvent(this.options.eventPageChange, detail);
      } else if (evt.target.matches(this.options.selectorPageForward)) {
        const detail = {
          initialEvt: evt,
          element: evt.target,
          direction: 'forward',
        };
        this.emitEvent(this.options.eventPageChange, detail);
      }
    });

    this.element.addEventListener('input', (evt) => {
      if (evt.target.matches(this.options.selectorItemsPerPageInput)) {
        const detail = {
          initialEvt: evt,
          element: evt.target,
          value: evt.target.value,
        };
        this.emitEvent(this.options.eventItemsPerPage, detail);
      } else if (evt.target.matches(this.options.selectorPageNumberInput)) {
        const detail = {
          initialEvt: evt,
          element: evt.target,
          value: evt.target.value,
        };
        this.emitEvent(this.options.eventPageNumber, detail);
      }
    });
  }

  /**
   * Dispatches a custom event
   * @param {String} evtName name of the event to be dispatched.
   * @param {Object} detail contains the original event and any other necessary details.
   */
  emitEvent = (evtName, detail) => {
    const event = new CustomEvent(`${evtName}`, {
      bubbles: true,
      cancelable: true,
      detail,
    });

    this.element.dispatchEvent(event);
  }

  /**
   * Instantiates a pagination component of the given element.
   * @param {HTMLElement} element The element working as a pagination component.
   * @param {Object} [options] The component options.
  * @property {string} [selectorInit] The CSS selector to find pagination components.
  * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines the number of items per page.
  * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
  * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
  * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
  * @property {string} [eventItemsPerPage]
  *   The name of the custom event fired when a user changes the number of items per page.
  *   event.detail.value contains the number of items a user wishes to see.
  * @property {string} [eventPageNumber]
  *   The name of the custom event fired when a user inputs a specific page number.
  *   event.detail.value contains the value that the user input.
  * @property {string} [eventPageChange]
  *   The name of the custom event fired when a user goes forward or backward a page.
  *   event.detail.direction contains the direction a user wishes to go.
  */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
  * Sets up the given node to instantiate a pagination component in.
  * If the given element indicates that it's an pagination component, instantiates it.
  * Otherwise, lazily instantiates pagination component when it's clicked on.
  * @param {Node} target The DOM node to instantiate pagination component in. Should be a document or an element.
  * @param {Object} [options] The component options.
  * @property {string} [selectorInit] The CSS selector to find pagination components.
  * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines the number of items per page.
  * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
  * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
  * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
  * @property {string} [eventItemsPerPage]
  *   The name of the custom event fired when a user changes the number of items per page.
  *   event.detail.value contains the number of items a user wishes to see.
  * @property {string} [eventPageNumber]
  *   The name of the custom event fired when a user inputs a specific page number.
  *   event.detail.value contains the value that the user input.
  * @property {string} [eventPageChange]
  *   The name of the custom event fired when a user goes forward or backward a page.
  *   event.detail.direction contains the direction a user wishes to go.
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
}

/**
 * The map associating DOM element and pagination instance.
 * @type {WeakMap}
 */
Pagination.components = new WeakMap();

/**
 * The component options.
 * If `options` is specified in the constructor, {@linkcode Pagination.create .create()}, or {@linkcode Pagination.init .init()},
 * properties in this object are overriden for the instance being create and how {@linkcode Pagination.init .init()} works.
 * @property {string} [selectorInit] The CSS selector to find pagination components.
 * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines the number of items per page.
 * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
 * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
 * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
 * @property {string} [eventItemsPerPage]
 *   The name of the custom event fired when a user changes the number of items per page.
 *   event.detail.value contains the number of items a user wishes to see.
 * @property {string} [eventPageNumber]
 *   The name of the custom event fired when a user inputs a specific page number.
 *   event.detail.value contains the value that the user input.
 * @property {string} [eventPageChange]
 *   The name of the custom event fired when a user goes forward or backward a page.
 *   event.detail.direction contains the direction a user wishes to go.
 */
Pagination.options = {
  selectorInit: '[data-pagination]',
  selectorItemsPerPageInput: '[data-items-per-page]',
  selectorPageNumberInput: '[data-page-number-input]',
  selectorPageBackward: '[data-page-backward]',
  selectorPageForward: '[data-page-forward]',
  eventItemsPerPage: 'itemsPerPage',
  eventPageNumber: 'pageNumber',
  eventPageChange: 'pageChange',
};
