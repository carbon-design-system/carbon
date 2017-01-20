import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import eventMatches from '../polyfills/event-matches';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import on from '../misc/on';

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

    this.element.addEventListener('keydown', (event) => { this.handleKeyDown(event); });
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
   * Handles keydown event.
   * @param {Event} event The event triggering this method.
   */
  handleKeyDown(event) {
    const isOpen = this.element.classList.contains('bx--dropdown--open');
    const direction = {
      38: this.constructor.NAVIGATE.BACKWARD,
      40: this.constructor.NAVIGATE.FORWARD,
    }[event.which];
    if (isOpen && direction !== undefined) {
      this.navigate(direction);
    } else {
      this.toggle(event);
    }
  }

  /**
   * Opens and closes the dropdown menu.
   * @param {Event} [event] The event triggering this method.
   */
  toggle(event) {
    if (([13, 32, 40].indexOf(event.which) >= 0 && !event.target.matches(this.options.selectorItem))
     || event.which === 27 || event.type === 'click') {
      const isOpen = this.element.classList.contains('bx--dropdown--open');
      const isOfSelf = this.element.contains(event.target);
      const actions = {
        add: isOfSelf && event.which === 40 && !isOpen,
        remove: (!isOfSelf || event.which === 27) && isOpen,
        toggle: isOfSelf && event.which !== 27 && event.which !== 40,
      };
      Object.keys(actions).forEach((action) => {
        if (actions[action]) {
          this.element.classList[action]('bx--dropdown--open');
          this.element.focus();
        }
      });
    }
  }

  /**
   * @returns {Element} Currently highlighted element.
   */
  getCurrentNavigation() {
    const focused = this.element.ownerDocument.activeElement;
    return focused.matches(this.options.selectorItem) ? focused : null;
  }

  /**
   * Moves up/down the focus.
   * @param {number} direction The direction of navigating.
   */
  navigate(direction) {
    const items = [...this.element.querySelectorAll(this.options.selectorItem)];
    const start = this.getCurrentNavigation() || this.element.querySelector(this.options.selectorItemSelected);
    const getNextItem = (old) => {
      const handleUnderflow = (i, l) => i + (i >= 0 ? 0 : l);
      const handleOverflow = (i, l) => i - (i < l ? 0 : l);
      // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
      const index = Math.max(items.indexOf(old) + direction, -1);
      return items[handleUnderflow(handleOverflow(index, items.length), items.length)];
    };
    for (let current = getNextItem(start); current && current !== start; current = getNextItem(current)) {
      if (!current.matches(this.options.selectorItemSelected)) {
        current.focus();
        break;
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

  /**
   * Enum for navigating backward/forward.
   * @readonly
   * @member Dropdown.NAVIGATE
   * @type {Object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}

export default Dropdown;
