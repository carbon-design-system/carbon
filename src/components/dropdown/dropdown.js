import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponent from '../../globals/js/mixins/init-component-by-search';
import eventMatches from '../../../demo/polyfills/event-matches';
import '../../../demo/polyfills/array-from';
import '../../../demo/polyfills/element-matches';
import '../../../demo/polyfills/object-assign';
import '../../../demo/polyfills/custom-event';
import on from '../../globals/js/misc/on';

class Dropdown extends mixin(createComponent, initComponent) {
  /**
   * A selector with drop downs.
   * @extends CreateComponent
   * @extends InitComponentBySearch
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
  constructor(element, options) {
    super(element, options);

    if (this.element.dataset.dropdown !== 'navigation') {
      this.element.dataset.dropdown = '';
    }

    /**
     * The handle to release click event listener on document object.
     * @member {Handle}
     */
    this.hDocumentClick = on(this.element.ownerDocument, 'click', (event) => { this.toggle(event); });

    this.setCloseOnBlur();

    this.element.addEventListener('keypress', (event) => { this.toggle(event); });
    this.element.addEventListener('click', (event) => {
      const item = eventMatches(event, this.options.selectorItem);
      if (item) {
        this.select(item);
      }
    });
  }

  /**
   * Cleans up stuffs specific to this widget.
   */
  release() {
    if (this.hFocusIn) {
      this.hFocusIn = this.hFocusIn.release();
    }
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    super.release();
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
   * @param {HTMLElement} itemToSelect The element to be activated.
   */
  select(itemToSelect) {
    const eventStart = new CustomEvent(this.options.eventBeforeSelected, {
      bubbles: true,
      cancelable: true,
      detail: { item: itemToSelect },
    });

    if (this.element.dispatchEvent(eventStart)) {
      if (this.element.dataset.dropdownType !== 'navigation') {
        this.element.firstElementChild.innerHTML = itemToSelect.innerHTML;
        itemToSelect.classList.add(this.options.classSelected);
      }
      this.element.dataset.value = itemToSelect.parentElement.dataset.value;

      [...this.element.querySelectorAll(this.options.selectorItemSelected)].forEach((item) => {
        if (itemToSelect !== item) {
          item.classList.remove(this.options.classSelected);
        }
      });

      itemToSelect.classList.add(this.options.classSelected);

      this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
        bubbles: true,
        cancelable: true,
        detail: { item: itemToSelect },
      }));
    }
  }

  /**
   * Sets an event handler to document for "close on blur" behavior.
   */
  setCloseOnBlur() {
    const hasFocusin = 'onfocusin' in window;
    const focusinEventName = hasFocusin ? 'focusin' : 'focus';
    this.hFocusIn = on(this.element.ownerDocument, focusinEventName, (event) => {
      if (!this.element.contains(event.target)) {
        this.element.classList.remove('bx--dropdown--open');
      }
    }, !hasFocusin);
  }

  /**
   * The map associating DOM element and selector instance.
   * @member Dropdown.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Dropdown.create .create()}, or {@linkcode Dropdown.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Dropdown.init .init()} works.
   * @member Dropdown.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find selectors.
   * @property {string} [selectorItem] The CSS selector to find clickable areas in dropdown items.
   * @property {string} [selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
   * @property {string} [classSelected] The CSS class for the selected dropdown item.
   * @property {string} [eventBeforeSelected]
   *   The name of the custom event fired before a drop down item is selected.
   *   Cancellation of this event stops selection of drop down item.
   * @property {string} [eventAfterSelected] The name of the custom event fired after a drop down item is selected.
   */
  static options = {
    selectorInit: '[data-dropdown]',
    selectorItem: '[data-option] > .bx--dropdown__link',
    selectorItemSelected: '[data-option] > .bx--dropdown__link.bx--dropdown--selected',
    classSelected: 'bx--dropdown--selected',
    eventBeforeSelected: 'dropdown-beingselected',
    eventAfterSelected: 'dropdown-selected',
  };
}

export default Dropdown;
