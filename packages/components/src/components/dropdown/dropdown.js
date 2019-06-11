/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import trackBlur from '../../globals/js/mixins/track-blur';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

const toArray = arrayLike => Array.prototype.slice.call(arrayLike);

class Dropdown extends mixin(
  createComponent,
  initComponentBySearch,
  trackBlur
) {
  /**
   * A selector with drop downs.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends TrackBlur
   * @param {HTMLElement} element The element working as a selector.
   * @param {object} [options] The component options.
   * @param {string} [options.selectorItem] The CSS selector to find clickable areas in dropdown items.
   * @param {string} [options.selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
   * @param {string} [options.classSelected] The CSS class for the selected dropdown item.
   * @param {string} [options.classOpen] The CSS class for the open state.
   * @param {string} [options.classDisabled] The CSS class for the disabled state.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a drop down item is selected.
   *   Cancellation of this event stops selection of drop down item.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a drop down item is selected.
   */
  constructor(element, options) {
    super(element, options);

    this.manage(
      on(this.element.ownerDocument, 'click', event => {
        this._toggle(event);
      })
    );
    this.manage(
      on(this.element, 'keydown', event => {
        this._handleKeyDown(event);
      })
    );
    this.manage(
      on(this.element, 'click', event => {
        const item = eventMatches(event, this.options.selectorItem);
        if (item) {
          this.select(item);
        }
      })
    );
  }

  /**
   * Handles keydown event.
   * @param {Event} event The event triggering this method.
   */
  _handleKeyDown(event) {
    const isOpen = this.element.classList.contains(this.options.classOpen);
    const direction = {
      38: this.constructor.NAVIGATE.BACKWARD,
      40: this.constructor.NAVIGATE.FORWARD,
    }[event.which];
    if (isOpen && direction !== undefined) {
      this.navigate(direction);
      event.preventDefault(); // Prevents up/down keys from scrolling container
    } else {
      this._toggle(event);
    }
  }

  /**
   * Opens and closes the dropdown menu.
   * @param {Event} [event] The event triggering this method.
   */
  _toggle(event) {
    const isDisabled = this.element.classList.contains(
      this.options.classDisabled
    );

    if (isDisabled) {
      return;
    }

    if (
      ([13, 32, 40].indexOf(event.which) >= 0 &&
        !event.target.matches(this.options.selectorItem)) ||
      event.which === 27 ||
      event.type === 'click'
    ) {
      const isOpen = this.element.classList.contains(this.options.classOpen);
      const isOfSelf = this.element.contains(event.target);
      const actions = {
        add: isOfSelf && event.which === 40 && !isOpen,
        remove: (!isOfSelf || event.which === 27) && isOpen,
        toggle: isOfSelf && event.which !== 27 && event.which !== 40,
      };
      Object.keys(actions).forEach(action => {
        if (actions[action]) {
          this.element.classList[action](this.options.classOpen);
          this.element.focus();
        }
      });
      const listItems = toArray(
        this.element.querySelectorAll(this.options.selectorItem)
      );
      listItems.forEach(item => {
        if (this.element.classList.contains(this.options.classOpen)) {
          item.tabIndex = 0;
        } else {
          item.tabIndex = -1;
        }
      });
    }
  }

  /**
   * @returns {Element} Currently highlighted element.
   */
  getCurrentNavigation() {
    const focused = this.element.ownerDocument.activeElement;
    return focused.nodeType === Node.ELEMENT_NODE &&
      focused.matches(this.options.selectorItem)
      ? focused
      : null;
  }

  /**
   * Moves up/down the focus.
   * @param {number} direction The direction of navigating.
   */
  navigate(direction) {
    const items = toArray(
      this.element.querySelectorAll(this.options.selectorItem)
    );
    const start =
      this.getCurrentNavigation() ||
      this.element.querySelector(this.options.selectorItemSelected);
    const getNextItem = old => {
      const handleUnderflow = (i, l) => i + (i >= 0 ? 0 : l);
      const handleOverflow = (i, l) => i - (i < l ? 0 : l);
      // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
      const index = Math.max(items.indexOf(old) + direction, -1);
      return items[
        handleUnderflow(handleOverflow(index, items.length), items.length)
      ];
    };
    for (
      let current = getNextItem(start);
      current && current !== start;
      current = getNextItem(current)
    ) {
      if (
        !current.matches(this.options.selectorItemHidden) &&
        !current.parentNode.matches(this.options.selectorItemHidden) &&
        !current.matches(this.options.selectorItemSelected)
      ) {
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
        const selectorText =
          this.element.dataset.dropdownType !== 'inline'
            ? this.options.selectorText
            : this.options.selectorTextInner;
        const text = this.element.querySelector(selectorText);
        if (text) {
          text.innerHTML = itemToSelect.innerHTML;
        }
        itemToSelect.classList.add(this.options.classSelected);
      }
      this.element.dataset.value = itemToSelect.parentElement.dataset.value;

      toArray(
        this.element.querySelectorAll(this.options.selectorItemSelected)
      ).forEach(item => {
        if (itemToSelect !== item) {
          item.classList.remove(this.options.classSelected);
        }
      });

      this.element.dispatchEvent(
        new CustomEvent(this.options.eventAfterSelected, {
          bubbles: true,
          cancelable: true,
          detail: { item: itemToSelect },
        })
      );
    }
  }

  /**
   * Closes the dropdown menu if this component loses focus.
   */
  handleBlur() {
    this.element.classList.remove(this.options.classOpen);
  }

  /**
   * The map associating DOM element and selector instance.
   * @member Dropdown.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Dropdown.create .create()}, or {@linkcode Dropdown.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Dropdown.init .init()} works.
   * @member Dropdown.options
   * @type {object}
   * @property {string} selectorInit The CSS selector to find selectors.
   * @property {string} [selectorText] The CSS selector to find the element showing the selected item.
   * @property {string} [selectorTextInner] The CSS selector to find the element showing the selected item, used for inline mode.
   * @property {string} [selectorItem] The CSS selector to find clickable areas in dropdown items.
   * @property {string} [selectorItemHidden]
   *   The CSS selector to find hidden dropdown items.
   *   Used to skip dropdown items for keyboard navigation.
   * @property {string} [selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
   * @property {string} [classSelected] The CSS class for the selected dropdown item.
   * @property {string} [classOpen] The CSS class for the open state.
   * @property {string} [classDisabled] The CSS class for the disabled state.
   * @property {string} [eventBeforeSelected]
   *   The name of the custom event fired before a drop down item is selected.
   *   Cancellation of this event stops selection of drop down item.
   * @property {string} [eventAfterSelected] The name of the custom event fired after a drop down item is selected.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-dropdown]',
      selectorText: `.${prefix}--dropdown-text`,
      selectorTextInner: `.${prefix}--dropdown-text__inner`,
      selectorItem: `.${prefix}--dropdown-link`,
      selectorItemSelected: `.${prefix}--dropdown--selected`,
      selectorItemHidden: `[hidden],[aria-hidden="true"]`,
      classSelected: `${prefix}--dropdown--selected`,
      classOpen: `${prefix}--dropdown--open`,
      classDisabled: `${prefix}--dropdown--disabled`,
      eventBeforeSelected: 'dropdown-beingselected',
      eventAfterSelected: 'dropdown-selected',
    };
  }

  /**
   * Enum for navigating backward/forward.
   * @readonly
   * @member Dropdown.NAVIGATE
   * @type {Object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE /* #__PURE_CLASS_PROPERTY__ */ = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}

export default Dropdown;
