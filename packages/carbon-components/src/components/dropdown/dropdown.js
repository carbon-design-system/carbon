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

const toArray = (arrayLike) => Array.prototype.slice.call(arrayLike);

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
      on(this.element.ownerDocument, 'click', (event) => {
        this._toggle(event);
      })
    );
    this.manage(
      on(this.element, 'keydown', (event) => {
        this._handleKeyDown(event);
      })
    );
    this.manage(
      on(this.element, 'click', (event) => {
        const item = eventMatches(event, this.options.selectorItem);
        if (item) {
          this.select(item);
        }
      })
    );

    // When using the active descendant approach we use a class to give focus styles during keyboard (up/down arrows)
    // navigation instead of relying on the :focus selector. This leaves the potential to have multiple items when
    // switching interactions between keyboard and mouse users. To more closely align with Carbon React implementation,
    // we want the focus class to move as the user hovers over items. This also updates the location of focus based on
    // the last hovered item if the user switches back to using the keyboard.
    if (
      // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
      this.element.querySelector(this.options.selectorTrigger) &&
      this.element.querySelector(this.options.selectorMenu)
    ) {
      // Using the latest HTML structure that supports the aria-activedescendant attribute
      this.manage(
        on(this.element, 'mouseover', (event) => {
          const item = eventMatches(event, this.options.selectorItem);
          if (item) {
            this._updateFocus(item);
          }
        })
      );
    }
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
      // get selected item
      // in v10.0, the anchor elements fire click events on Enter keypress when a dropdown item is selected
      // in v10.5 (#3586), focus is no longer placed on the dropdown items and is instead kept fixed on the ul menu
      // so we need to manually call getCurrentNavigation and select the item
      const item = this.getCurrentNavigation();
      if (
        item &&
        isOpen &&
        (event.which === 13 || event.which === 32) &&
        !this.element.ownerDocument.activeElement.matches(
          this.options.selectorItem
        )
      ) {
        event.preventDefault();
        this.select(item);
      }
      this._toggle(event);
    }
  }

  /**
   * When using aria-activedescendant we want to make sure attributes and classes
   * are properly cleaned up when the dropdown is closed
   * @private
   */
  _focusCleanup() {
    // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
    const triggerNode = this.element.querySelector(
      this.options.selectorTrigger
    );

    // only want to grab the listNode IF it's using the latest a11y HTML structure
    const listNode = triggerNode
      ? this.element.querySelector(this.options.selectorMenu)
      : null;

    if (listNode) {
      listNode.removeAttribute('aria-activedescendant');
      const focusedItem = this.element.querySelector(
        this.options.selectorItemFocused
      );
      if (focusedItem) {
        focusedItem.classList.remove(this.options.classFocused);
      }
    }
  }

  /**
   * Update focus using aria-activedescendant HTML structure
   * @param {HTMLElement} itemToFocus The element to be focused.
   */
  _updateFocus(itemToFocus) {
    // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
    const triggerNode = this.element.querySelector(
      this.options.selectorTrigger
    );

    // only want to grab the listNode IF it's using the latest a11y HTML structure
    const listNode = triggerNode
      ? this.element.querySelector(this.options.selectorMenu)
      : null;

    const previouslyFocused = listNode.querySelector(
      this.options.selectorItemFocused
    );
    itemToFocus.classList.add(this.options.classFocused);
    listNode.setAttribute('aria-activedescendant', itemToFocus.id);
    if (previouslyFocused) {
      previouslyFocused.classList.remove(this.options.classFocused);
    }
  }

  /**
   * Opens and closes the dropdown menu.
   * @param {Event} [event] The event triggering this method.
   *
   * @todo https://github.com/carbon-design-system/carbon/issues/3641
   */
  _toggle(event) {
    const isDisabled = this.element.classList.contains(
      this.options.classDisabled
    );

    if (isDisabled) {
      return;
    }

    // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
    const triggerNode = this.element.querySelector(
      this.options.selectorTrigger
    );

    if (
      // User presses down arrow
      (event.which === 40 &&
        !event.target.matches(this.options.selectorItem)) ||
      // User presses space or enter and the trigger is not a button OR event is not fired by trigger
      ((!triggerNode || !triggerNode.contains(event.target)) &&
        [13, 32].indexOf(event.which) >= 0 &&
        !event.target.matches(this.options.selectorItem)) ||
      // User presses esc
      event.which === 27 ||
      // User clicks
      event.type === 'click'
    ) {
      const isOpen = this.element.classList.contains(this.options.classOpen);
      const isOfSelf = this.element.contains(event.target);
      // Determine if the open className should be added, removed, or toggled
      const actions = {
        add: isOfSelf && event.which === 40 && !isOpen,
        remove: (!isOfSelf || event.which === 27) && isOpen,
        toggle: isOfSelf && event.which !== 27 && event.which !== 40,
      };
      let changedState = false;
      Object.keys(actions).forEach((action) => {
        if (actions[action]) {
          changedState = true;
          this.element.classList[action](this.options.classOpen);
        }
      });

      const listItems = toArray(
        this.element.querySelectorAll(this.options.selectorItem)
      );
      // only want to grab the listNode IF it's using the latest a11y HTML structure
      const listNode = triggerNode
        ? this.element.querySelector(this.options.selectorMenu)
        : null;

      // @todo remove conditionals for elements existing once legacy structure is depreciated
      if (
        changedState &&
        this.element.classList.contains(this.options.classOpen)
      ) {
        // toggled open
        if (triggerNode) {
          triggerNode.setAttribute('aria-expanded', 'true');
        }
        (listNode || this.element).focus();
        if (listNode) {
          const selectedNode = listNode.querySelector(
            this.options.selectorLinkSelected
          );

          listNode.setAttribute(
            'aria-activedescendant',
            (selectedNode || listItems[0]).id
          );
          (selectedNode || listItems[0]).classList.add(
            this.options.classFocused
          );
        }
      } else if (changedState && (isOfSelf || actions.remove)) {
        // toggled close
        // timer is used to call focus AFTER the click event on
        // trigger button (which is caused by keypress e.g. during keyboard navigation)
        setTimeout(() => (triggerNode || this.element).focus(), 0);
        if (triggerNode) {
          triggerNode.setAttribute('aria-expanded', 'false');
        }
        this._focusCleanup();
      }

      // @todo remove once legacy structure is depreciated
      if (!triggerNode) {
        listItems.forEach((item) => {
          if (this.element.classList.contains(this.options.classOpen)) {
            item.tabIndex = 0;
          } else {
            item.tabIndex = -1;
          }
        });
      }

      const menuListNode = this.element.querySelector(
        this.options.selectorMenu
      );
      if (menuListNode) {
        menuListNode.tabIndex = this.element.classList.contains(
          this.options.classOpen
        )
          ? '0'
          : '-1';
      }
    }
  }

  /**
   * @returns {Element} Currently highlighted element.
   */
  getCurrentNavigation() {
    let focusedNode;

    // Using the latest semantic markup structure where trigger is a button
    // @todo remove conditional once legacy structure is depreciated
    // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
    if (this.element.querySelector(this.options.selectorTrigger)) {
      const listNode = this.element.querySelector(this.options.selectorMenu);
      const focusedId = listNode.getAttribute('aria-activedescendant');
      focusedNode = focusedId ? listNode.querySelector(`#${focusedId}`) : null;
    } else {
      const focused = this.element.ownerDocument.activeElement;
      focusedNode =
        focused.nodeType === Node.ELEMENT_NODE &&
        focused.matches(this.options.selectorItem)
          ? focused
          : null;
    }

    return focusedNode;
  }

  /**
   * Moves up/down the focus.
   * @param {number} direction The direction of navigating.
   */
  // @todo create issue it's a better UX to move the focus when the user hovers so they stay in sync
  navigate(direction) {
    const items = toArray(
      this.element.querySelectorAll(this.options.selectorItem)
    );
    const start =
      this.getCurrentNavigation() ||
      this.element.querySelector(this.options.selectorLinkSelected);
    const getNextItem = (old) => {
      const handleUnderflow = (i, l) => i + (i >= 0 ? 0 : l);
      const handleOverflow = (i, l) => i - (i < l ? 0 : l);
      // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
      const index = Math.max(items.indexOf(old) + direction, -1);
      return items[
        handleUnderflow(handleOverflow(index, items.length), items.length)
      ];
    };
    const isShowSelected = this.element.classList.contains(
      this.options.classShowSelected
    );
    for (
      let current = getNextItem(start);
      current && current !== start;
      current = getNextItem(current)
    ) {
      if (
        !current.matches(this.options.selectorItemHidden) &&
        !current.parentNode.matches(this.options.selectorItemHidden) &&
        (isShowSelected ||
          (!isShowSelected &&
            !current.parentElement.matches(this.options.selectorItemSelected)))
      ) {
        // Using the latest semantic markup structure where trigger is a button
        // @todo remove conditional once legacy structure is depreciated
        // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
        if (this.element.querySelector(this.options.selectorTrigger)) {
          this._updateFocus(current);
        } else {
          current.focus();
        }
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
        // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
        const selectorText =
          !this.element.querySelector(this.options.selectorTrigger) &&
          this.element.dataset.dropdownType !== 'inline'
            ? this.options.selectorText
            : this.options.selectorTextInner;
        const text = this.element.querySelector(selectorText);
        if (text) {
          text.innerHTML = itemToSelect.innerHTML;
        }
        itemToSelect.parentElement.classList.add(this.options.classSelected);
      }
      this.element.dataset.value = itemToSelect.parentElement.dataset.value;

      toArray(
        this.element.querySelectorAll(this.options.selectorLinkSelected)
      ).forEach((item) => {
        if (itemToSelect !== item) {
          item.parentElement.classList.remove(this.options.classSelected);
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
    this._focusCleanup();
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
   * properties in this object are overridden for the instance being create and how {@linkcode Dropdown.init .init()} works.
   * @member Dropdown.options
   * @type {object}
   * @property {string} selectorInit The CSS selector to find selectors.
   * @property {string} [selectorTrigger]
   *   The CSS selector to find the trigger button when using a11y compliant markup.
   *   NOTE: Does NOT match the trigger button in older markup.
   * @property {string} [selectorMenu] The CSS selector to find menu list when using a11y compliant markup.
   * @property {string} [selectorText] The CSS selector to find the element showing the selected item.
   * @property {string} [selectorTextInner] The CSS selector to find the element showing the selected item, used for inline mode.
   * @property {string} [selectorItem] The CSS selector to find clickable areas in dropdown items.
   * @property {string} [selectorItemHidden]
   *   The CSS selector to find hidden dropdown items.
   *   Used to skip dropdown items for keyboard navigation.
   * @property {string} [selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
   * @property {string} [selectorItemFocused] The CSS selector to find the clickable area in the focused dropdown item.
   * @property {string} [selectorLinkSelected] The CSS selector to target the link node of the selected dropdown item.
   * @property {string} [classShowSelected] The CSS class for the show selected modifier of the dropdown.
   * @property {string} [classSelected] The CSS class for the selected dropdown item.
   * @property {string} [classFocused] The CSS class for the focused dropdown item.
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
      selectorTrigger: `button.${prefix}--dropdown-text`, // NOTE: Does NOT match the trigger button in older markup.
      selectorMenu: `.${prefix}--dropdown-list`,
      selectorText: `.${prefix}--dropdown-text`,
      selectorTextInner: `.${prefix}--dropdown-text__inner`,
      selectorItem: `.${prefix}--dropdown-link`,
      selectorItemSelected: `.${prefix}--dropdown--selected`,
      selectorItemFocused: `.${prefix}--dropdown--focused`,
      selectorItemHidden: `[hidden],[aria-hidden="true"]`,
      selectorLinkSelected: `.${prefix}--dropdown--selected .${prefix}--dropdown-link`,
      classShowSelected: `${prefix}--dropdown--show-selected`,
      classSelected: `${prefix}--dropdown--selected`,
      classFocused: `${prefix}--dropdown--focused`,
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
   * @type {object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE /* #__PURE_CLASS_PROPERTY__ */ = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}

export default Dropdown;
