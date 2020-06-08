/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../globals/js/settings';
import eventMatches from '../../globals/js/misc/event-matches';
import ContentSwitcher from '../content-switcher/content-switcher';
import on from '../../globals/js/misc/on';

const toArray = (arrayLike) => Array.prototype.slice.call(arrayLike);

class Tab extends ContentSwitcher {
  /**
   * Container of tabs.
   * @extends ContentSwitcher
   * @param {HTMLElement} element The element working as a container of tabs.
   * @param {object} [options] The component options.
   * @param {string} [options.selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
   * @param {string} [options.selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
   * @param {string} [options.selectorTriggerText]
   *   The CSS selector to find the element used in narrow mode showing the selected tab item.
   * @param {string} [options.selectorButton] The CSS selector to find tab containers.
   * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected tab.
   * @param {string} [options.selectorLink] The CSS selector to find the links in tabs.
   * @param {string} [options.classActive] The CSS class for tab's selected state.
   * @param {string} [options.classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a tab is selected.
   *   Cancellation of this event stops selection of tab.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a tab is selected.
   */
  constructor(element, options) {
    super(element, options);

    this.manage(
      on(this.element, 'keydown', (event) => {
        this._handleKeyDown(event);
      })
    );
    this.manage(
      on(this.element.ownerDocument, 'click', (event) => {
        this._handleDocumentClick(event);
      })
    );

    const selected = this.element.querySelector(
      this.options.selectorButtonSelected
    );
    if (selected) {
      this._updateTriggerText(selected);
    }
  }

  /**
   * Internal method of {@linkcode Tab#setActive .setActive()}, to select a tab item.
   * @private
   * @param {object} detail The detail of the event trigging this action.
   * @param {HTMLElement} detail.item The tab item to be selected.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(detail, callback) {
    super._changeState(detail, (error, ...data) => {
      if (!error) {
        this._updateTriggerText(detail.item);
      }
      callback(error, ...data);
    });
  }

  /**
   * Handles click on tab container.
   * * If the click is on a tab, activates it.
   * * If the click is on the button to open the drop down menu, does so.
   * @param {Event} event The event triggering this method.
   */
  _handleClick(event) {
    const button = eventMatches(event, this.options.selectorButton);
    const trigger = eventMatches(event, this.options.selectorTrigger);
    if (
      button &&
      !button.classList.contains(this.options.classButtonDisabled)
    ) {
      super._handleClick(event);
      this._updateMenuState(false);
    }
    if (trigger) {
      this._updateMenuState();
    }
  }

  /**
   * Handles click on document.
   * @param {Event} event The triggering event.
   * @private
   */
  _handleDocumentClick(event) {
    const { element } = this;
    const isOfSelf = element.contains(event.target);
    if (isOfSelf) {
      return;
    }
    this._updateMenuState(false);
  }

  /**
   * Handles arrow keys on tab container.
   * * Left keys are used to go to previous tab.
   * * Right keys are used to go to next tab.
   * @param {Event} event The event triggering this method.
   */
  _handleKeyDown(event) {
    const triggerNode = eventMatches(event, this.options.selectorTrigger);
    if (triggerNode) {
      if (event.which === 13) {
        this._updateMenuState();
      }
      return;
    }

    const direction = {
      37: this.constructor.NAVIGATE.BACKWARD,
      39: this.constructor.NAVIGATE.FORWARD,
    }[event.which];

    if (direction) {
      const buttons = toArray(
        this.element.querySelectorAll(this.options.selectorButtonEnabled)
      );
      const button = this.element.querySelector(
        this.options.selectorButtonSelected
      );
      const nextIndex = Math.max(
        buttons.indexOf(button) + direction,
        -1 /* For `button` not found in `buttons` */
      );
      const nextIndexLooped =
        nextIndex >= 0 && nextIndex < buttons.length
          ? nextIndex
          : nextIndex - Math.sign(nextIndex) * buttons.length;
      this.setActive(buttons[nextIndexLooped], (error, item) => {
        if (item) {
          const link = item.querySelector(this.options.selectorLink);
          if (link) {
            link.focus();
          }
        }
      });
      event.preventDefault();
    }
  }

  /**
   * Shows/hides the drop down menu used in narrow mode.
   * @param {boolean} [force] `true` to show the menu, `false` to hide the menu, otherwise toggles the menu.
   */
  _updateMenuState(force) {
    const menu = this.element.querySelector(this.options.selectorMenu);
    const trigger = this.element.querySelector(this.options.selectorTrigger);
    if (menu) {
      menu.classList.toggle(
        this.options.classHidden,
        typeof force === 'undefined' ? force : !force
      );
      if (menu.classList.contains(this.options.classHidden)) {
        trigger.classList.remove(this.options.classOpen);
      } else {
        trigger.classList.add(this.options.classOpen);
      }
    }
  }

  /**
   * Updates the text indicating the currently selected tab item.
   * @param {HTMLElement} target The newly selected tab item.
   */
  _updateTriggerText(target) {
    const triggerText = this.element.querySelector(
      this.options.selectorTriggerText
    );
    if (triggerText) {
      triggerText.textContent = target.textContent;
    }
  }

  /**
   * The map associating DOM element and tab container instance.
   * @member Tab.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode ContentSwitcher.create .create()}, or {@linkcode Tab.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Tab.init .init()} works.
   * @member Tab.options
   * @type {object}
   * @property {string} selectorInit The CSS selector to find tab containers.
   * @property {string} [selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
   * @property {string} [selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
   * @property {string} [selectorTriggerText]
   *   The CSS selector to find the element used in narrow mode showing the selected tab item.
   * @property {string} [selectorButton] The CSS selector to find tab containers.
   * @property {string} [selectorButtonSelected] The CSS selector to find the selected tab.
   * @property {string} [selectorLink] The CSS selector to find the links in tabs.
   * @property {string} [classActive] The CSS class for tab's selected state.
   * @property {string} [classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
   * @property {string} [eventBeforeSelected]
   *   The name of the custom event fired before a tab is selected.
   *   Cancellation of this event stops selection of tab.
   * @property {string} [eventAfterSelected] The name of the custom event fired after a tab is selected.
   */
  static get options() {
    const { prefix } = settings;
    return Object.assign(Object.create(ContentSwitcher.options), {
      selectorInit: '[data-tabs]',
      selectorMenu: `.${prefix}--tabs__nav`,
      selectorTrigger: `.${prefix}--tabs-trigger`,
      selectorTriggerText: `.${prefix}--tabs-trigger-text`,
      selectorButton: `.${prefix}--tabs__nav-item`,
      selectorButtonEnabled: `.${prefix}--tabs__nav-item:not(.${prefix}--tabs__nav-item--disabled)`,
      selectorButtonSelected: `.${prefix}--tabs__nav-item--selected`,
      selectorLink: `.${prefix}--tabs__nav-link`,
      classActive: `${prefix}--tabs__nav-item--selected`,
      classHidden: `${prefix}--tabs__nav--hidden`,
      classOpen: `${prefix}--tabs-trigger--open`,
      classButtonDisabled: `${prefix}--tabs__nav-item--disabled`,
      eventBeforeSelected: 'tab-beingselected',
      eventAfterSelected: 'tab-selected',
    });
  }

  /**
   * Enum for navigating backward/forward.
   * @readonly
   * @member Tab.NAVIGATE
   * @type {object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE /* #__PURE_CLASS_PROPERTY__ */ = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}

export default Tab;
