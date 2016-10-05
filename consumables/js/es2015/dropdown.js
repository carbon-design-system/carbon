import '../polyfills/array-from';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import on from '../misc/on';

export default class Dropdown {
  /**
   * A selector with drop downs.
   * @implements Component
   * @param {HTMLElement} element The element working as a selector.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorItem] The CSS selector to find clickable areas in dropdown items.
   * @param {string} [options.selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
   * @param {string} [options.classSelected] The CSS class for the selected dropdown item.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a drop down item is selected.
   *   Cancellation of this event stops selection of drop down item.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a drop down item is selected.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign({
      selectorItem: '[data-option] > .bx--dropdown__link',
      selectorItemSelected: '[data-option] > .bx--dropdown__link.bx--dropdown--selected',
      classSelected: 'bx--dropdown--selected',
      eventBeforeSelected: 'dropdown-beingselected',
      eventAfterSelected: 'dropdown-selected',
    }, options);

    if (this.element.dataset.dropdown !== 'navigation') {
      this.element.dataset.dropdown = '';
    }
    this.constructor.components.set(this.element, this);

    /**
     * The handle to release click event listener on document object.
     * @member {Handle}
     */
    this.hDocumentClick = on(this.element.ownerDocument, 'click', (event) => this.toggle(event));

    this.element.addEventListener('keypress', (event) => this.toggle(event));
    this.element.addEventListener('click', (event) => this.selected(event));
  }

  /**
   * Instantiates selector of the given element.
   * @param {HTMLElement} element The element working as a selector.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorItem] The CSS selector to find clickable areas in dropdown items.
   * @param {string} [options.selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
   * @param {string} [options.classSelected] The CSS class for the selected dropdown item.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a drop down item is selected.
   *   Cancellation of this event stops selection of drop down item.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a drop down item is selected.
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Instantiates selectors in the given node.
   * If the given element indicates that it's an selector (having `data-dropdown` attribute), instantiates it.
   * Otherwise, instantiates selectors by searching for selectors in the given node.
   * @param {Node} target The DOM node to instantiate selectors in. Should be a document or an element.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorItem] The CSS selector to find clickable areas in dropdown items.
   * @param {string} [options.selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
   * @param {string} [options.classSelected] The CSS class for the selected dropdown item.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a drop down item is selected.
   *   Cancellation of this event stops selection of drop down item.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a drop down item is selected.
   */
  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.loading !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-dropdown]')].forEach(element => this.create(element, options));
    }
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    this.constructor.components.delete(this.element);
  }

  /**
   * Opens and closes the dropdown menu.
   * @param {Event} event The event triggering this method.
   */
  toggle(event) {
    if (event.which === 13 || event.which === 32 || event.type === 'click') {
      const isOfSelf = this.element.contains(event.target);

      if (isOfSelf) {
        this.element.classList.toggle('bx--dropdown--open');
      } else if (!isOfSelf && this.element.classList.contains('bx--dropdown--open')) {
        this.element.classList.remove('bx--dropdown--open');
      }
    }
  }

  /**
   * Handles clicking on the dropdown options, doing the following:
   * * Change Dropdown text to selected option.
   * * Remove selected option from options when selected.
   * * Emit custom events.
   * @param {Event} event The event triggering this method.
   */
  selected(event) {
    const activatedElement = event.target;
    if (activatedElement.parentElement.dataset.option !== undefined) {
      const eventStart = new CustomEvent(this.options.eventBeforeSelected, {
        bubbles: true,
        cancelable: true,
        detail: { item: activatedElement },
      });

      if (this.element.dispatchEvent(eventStart)) {
        if (this.element.dataset.dropdown !== 'navigation') {
          this.element.firstElementChild.textContent = activatedElement.textContent;
          activatedElement.classList.add(this.options.classSelected);
        }
        this.element.dataset.value = activatedElement.parentElement.dataset.value;
        [... this.element.querySelectorAll(this.options.selectorItemSelected)].forEach((item) => {
          if (activatedElement !== item) {
            item.classList.remove(this.options.classSelected);
          }
        });

        this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
          bubbles: true,
          cancelable: true,
          detail: { item: activatedElement },
        }));
      }
    }
  }
}


/**
 * The component options.
 * @member {Object} Dropdown#options
 * @property {string} [selectorItem] The CSS selector to find clickable areas in dropdown items.
 * @property {string} [selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
 * @property {string} [classSelected] The CSS class for the selected dropdown item.
 * @property {string} [eventBeforeSelected]
 *   The name of the custom event fired before a drop down item is selected.
 *   Cancellation of this event stops selection of drop down item.
 * @property {string} [eventAfterSelected] The name of the custom event fired after a drop down item is selected.
 */

/**
 * The map associating DOM element and selector instance.
 * @type {WeakMap}
 */
Dropdown.components = new WeakMap();
