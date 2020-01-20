/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import NavigationMenuPanel from './navigation-menu-panel';
import on from '../../globals/js/misc/on';
import eventMatches from '../../globals/js/misc/event-matches';
import settings from '../../globals/js/settings';

export default class NavigationMenu extends NavigationMenuPanel {
  /**
   * A navigation menu
   * @extends NavigationMenuPanel
   * @param {HTMLElement} element The element working as a selector.
   * @param {object} [options] The component options.
   * @param {string} [options.selectorInit] The CSS class to find navigation
   * menus.
   * @param {string} [options.attribInitTarget] The attribute name in the
   * launcher buttons to find target navigation menu.
   * @param {string} [options.selectorShellNavSubmenu] The CSS selector for a
   * nav submenu
   * @param {string} [options.selectorShellNavLink] The CSS selector for a nav
   * link
   * @param {string} [options.selectorShellNavLinkCurrent] The CSS selector for
   * the current nav link
   * @param {string} [options.selectorShellNavItem] The CSS selector for a nav
   * item
   * @param {string} [options.selectorShellNavCategory] The CSS selector for a
   * nav category
   * @param {string} [options.classShellNavItemActive] The CSS class for the
   * active nav item
   * @param {string} [options.classShellNavLinkCurrent] The CSS class for the
   * current lav link
   * @param {string} [options.classShellNavCategoryExpanded] The CSS class
   * for an expanded nav category
   */
  constructor(element, options) {
    super(element, options);
    this.manage(on(element, 'click', this._handleClick));
    this.manage(on(element, 'keydown', this._handleKeyDown));
    this.manage(
      on(this.element.ownerDocument, 'click', event => {
        if (
          !this.element.hasAttribute('hidden') &&
          !this.triggerButton.contains(event.target) &&
          !this.element.contains(event.target)
        ) {
          this.changeState('collapsed');
        }
      })
    );
    const hasFocusOut = 'onfocusout' in window;
    this.manage(
      on(
        this.element,
        hasFocusOut ? 'focusout' : 'blur',
        this._handleFocusOut,
        !hasFocusOut
      )
    );
  }

  /**
   * @returns {Element} Currently highlighted element.
   */
  getCurrentNavigation = () => this.element.ownerDocument.activeElement;

  /**
   * Moves the focus up/down.
   * @param {number} direction The direction of navigating.
   */
  navigate = direction => {
    const items = [
      ...this.element.querySelectorAll(this.options.selectorFocusableNavItems),
    ];
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
   * Handle keydown event
   * Up/down arrow keys navigate in the menu
   * Esc closes the menu
   * @param {Event} event The event triggering this method.
   */
  _handleKeyDown = event => {
    // handle Esc
    const isExpanded = !this.element.hasAttribute('hidden');
    if (event.which === 27 && isExpanded) {
      this.changeState('collapsed');
      if (this.triggerButton) {
        this.triggerButton.focus();
      }
      return;
    }
    // handle up/down arrow keys
    const matchesNavSubmenu = eventMatches(
      event,
      this.options.selectorShellNavSubmenu
    );
    const matchesShellNavLink = eventMatches(
      event,
      this.options.selectorShellNavLink
    );
    if (!matchesNavSubmenu && !matchesShellNavLink) {
      return;
    }
    const navigationKeyCodes = {
      38: this.constructor.NAVIGATE.BACKWARD, // up arrow
      40: this.constructor.NAVIGATE.FORWARD, // down arrow
    };
    const navigationKeyCodeMatches = navigationKeyCodes[event.which];
    if (navigationKeyCodeMatches) {
      event.preventDefault(); // prevent arrow keys from scrolling
      this.navigate(navigationKeyCodeMatches);
    }
  };

  /**
   * @param {Event} event The event triggering this method
   */
  _handleFocusOut = event => {
    const nextTargetIsOfSelf =
      this.element.contains(event.relatedTarget) ||
      event.relatedTarget === this.triggerButton ||
      !event.relatedTarget;
    const oldTargetIsOfSelf = this.element.contains(event.target);
    if (oldTargetIsOfSelf && !nextTargetIsOfSelf) {
      this.changeState('collapsed');
      this.triggerButton.focus();
    }
  };

  changeNavSubmenuState = ({ matchesNavSubmenu, shouldBeCollapsed }) => {
    const shellNavCategory = matchesNavSubmenu.closest(
      this.options.selectorShellNavCategory
    );
    if (!shellNavCategory) {
      return;
    }
    matchesNavSubmenu.setAttribute('aria-expanded', !shouldBeCollapsed);
    shellNavCategory.classList.toggle(
      this.options.classShellNavCategoryExpanded
    );
    Array.prototype.forEach.call(
      shellNavCategory.querySelectorAll(this.options.selectorShellNavLink),
      item => {
        item.tabIndex = !shouldBeCollapsed ? 0 : -1;
      }
    );
  };

  /**
   * toggle the state of the nav menu on click
   * @param {Event} event The event triggering this method
   */
  _handleClick = event => {
    const matchesNavSubmenu = eventMatches(
      event,
      this.options.selectorShellNavSubmenu
    );
    const matchesShellNavLink = eventMatches(
      event,
      this.options.selectorShellNavLink
    );
    const matchesNestedShellNavLink = eventMatches(
      event,
      this.options.selectorShellNestedNavLink
    );
    if (!matchesNavSubmenu && !matchesShellNavLink) {
      return;
    }
    if (matchesNestedShellNavLink) {
      [
        ...this.element.querySelectorAll(
          this.options.selectorShellNavLinkCurrent
        ),
      ].forEach(el => {
        el.classList.remove(
          this.options.classShellNavItemActive,
          this.options.classShellNavLinkCurrent
        );
      });
      matchesNestedShellNavLink
        .closest(this.options.selectorShellNavNestedCategory)
        .classList.add(this.options.classShellNavItemActive);
      return;
    }
    if (matchesNavSubmenu) {
      const isExpanded =
        matchesNavSubmenu.getAttribute('aria-expanded') === 'true';
      this.changeNavSubmenuState({ matchesNavSubmenu, isExpanded });
      return;
    }
    if (matchesShellNavLink) {
      [
        ...this.element.querySelectorAll(
          this.options.selectorShellNavLinkCurrent
        ),
      ].forEach(el => {
        el.classList.remove(
          this.options.classShellNavItemActive,
          this.options.classShellNavLinkCurrent
        );
      });
      matchesShellNavLink
        .closest(this.options.selectorShellNavItem)
        .classList.add(this.options.classShellNavItemActive);
    }
  };

  /**
   * The map associating DOM element and NavigationMenu instance.
   * @member NavigationMenu.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode NavigationMenu.create .create()}, or
   * {@linkcode NavigationMenu.init .init()},
   * properties in this object are overriden for the instance being create and
   * how {@linkcode NavigationMenu.init .init()} works.
   * @member NavigationMenu.options
   * @type {object}
   * @property {string} selectorInit The CSS class to find navigation menus.
   * @property {string} attribInitTarget The attribute name in the
   * launcher buttons to find target navigation menu.
   * @property {string[]} initEventNames The events that the component
   * will handles
   */
  static get options() {
    const { prefix } = settings;
    return Object.assign(Object.create(NavigationMenuPanel.options), {
      selectorInit: '[data-navigation-menu]',
      attribInitTarget: 'data-navigation-menu-target',
      selectorShellNavSubmenu: `.${prefix}--navigation__category-toggle`,
      selectorShellNavLink: `.${prefix}--navigation-link`,
      selectorShellNestedNavLink: `.${prefix}--navigation__category-item > a.${prefix}--navigation-link`,
      selectorShellNavLinkCurrent: `.${prefix}--navigation-item--active,.${prefix}--navigation__category-item--active`,
      selectorFocusableNavItems: `
        .${prefix}--navigation__category-toggle,
        .${prefix}--navigation-item > .${prefix}--navigation-link,
        .${prefix}--navigation-link[tabindex="0"]
      `,
      selectorShellNavItem: `.${prefix}--navigation-item`,
      selectorShellNavCategory: `.${prefix}--navigation__category`,
      selectorShellNavNestedCategory: `.${prefix}--navigation__category-item`,
      classShellNavItemActive: `${prefix}--navigation-item--active`,
      classShellNavLinkCurrent: `${prefix}--navigation__category-item--active`,
      classShellNavCategoryExpanded: `${prefix}--navigation__category--expanded`,
    });
  }

  /**
   * Enum for navigating backward/forward.
   * @readonly
   * @member NavigationMenuPanel.NAVIGATE
   * @type {object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE /* #__PURE_CLASS_PROPERTY__ */ = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}
