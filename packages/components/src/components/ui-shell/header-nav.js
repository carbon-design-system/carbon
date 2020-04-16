/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';
import settings from '../../globals/js/settings';

const toArray = arrayLike => Array.prototype.slice.call(arrayLike);

class HeaderNav extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * Header nav.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as an header nav.
   * @param {object} [options] The component options.
   * @param {string} [options.selectorSubmenu] The CSS selector to find sub menus.
   * @param {string} [options.selectorSubmenuLink] The CSS selector to find the trigger buttons of sub menus.
   * @param {string} [options.selectorSubmenuItem] The CSS selector to find the sub menu items.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(on(this.element, 'keydown', this._handleKeyDown));
  }

  /**
   * The map associating DOM element and Header instance.
   * @member HeaderNav.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * @returns {Element} Currently highlighted element.
   */
  getCurrentNavigation = () => {
    const focused = this.element.ownerDocument.activeElement.closest(
      this.options.selectorSubmenu
    );
    return focused && focused.nodeType === Node.ELEMENT_NODE
      ? focused.querySelector(this.options.selectorSubmenuLink)
      : null;
  };

  /**
   * Moves the focus up/down.
   * @param {number} direction The direction of navigating.
   */
  navigate = direction => {
    const items = toArray(
      this.element.querySelectorAll(this.options.selectorSubmenuLink)
    );
    const start = this.getCurrentNavigation();
    const getNextItem = old => {
      const handleUnderflow = (index, length) =>
        index + (index >= 0 ? 0 : length);
      const handleOverflow = (index, length) =>
        index - (index < length ? 0 : length);

      // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
      const index = Math.max(items.indexOf(old) + direction, -1);
      return items[
        handleUnderflow(handleOverflow(index, items.length), items.length)
      ];
    };
    getNextItem(start).focus();
  };

  /**
   * Handles keydown event.
   * @param {Event} event The event triggering this method.
   */
  _handleKeyDown = event => {
    const keyCodes = {
      37: this.constructor.NAVIGATE.BACKWARD, // left arrow
      39: this.constructor.NAVIGATE.FORWARD, // right arrow
    };
    const keyCodeMatches = keyCodes[event.which];
    if (keyCodeMatches) {
      this.navigate(keyCodeMatches);
    }
  };

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode HeaderNav.create .create()}, or
   * {@linkcode HeaderNav.init .init()},
   * properties in this object are overriden for the instance being create and
   * how {@linkcode HeaderNav.init .init()} works.
   * @member HeaderNav.options
   * @type {object}
   * @property {string} selectorInit The data attribute to find side navs.
   * @property {string} [selectorSubmenu] The CSS selector to find sub menus.
   * @property {string} [selectorSubmenuLink] The CSS selector to find the trigger buttons of sub menus.
   * @property {string} [selectorSubmenuItem] The CSS selector to find the sub menu items.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-header-nav]',
      selectorNavKind: '[data-header-nav-kind]',
      selectorSubmenu: `.${prefix}--header__submenu`,
      selectorSubmenuLink: `.${prefix}--header__menu-title`,
      selectorSubmenuItem: `.${prefix}--header__menu-title > .${prefix}--header__menu-item`,
    };
  }

  /**
   * Enum for navigating backward/forward.
   * @readonly
   * @member Header.NAVIGATE
   * @type {object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE /* #__PURE_CLASS_PROPERTY__ */ = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}

export default HeaderNav;
