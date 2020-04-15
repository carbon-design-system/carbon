/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import settings from '../../globals/js/settings';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';
import eventMatches from '../../globals/js/misc/event-matches';

const { prefix } = settings;

class SideNav extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * The map associating DOM element and copy button UI instance.
   * @member SideNav.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * Side nav.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a side nav.
   * @param {object} [options] The component options.
   * @param {string} [options.selectorSideNavToggle]
   *   The CSS selector to find the toggle button.
   * @param {string} [options.selectorSideNavSubmenu] The CSS selector to find the trigger buttons for sub nav items.
   * @param {string} [options.selectorSideNavItem] The CSS selector to find the nav items.
   * @param {string} [options.selectorSideNavLink] The CSS selector to find the interactive potions in non-nested nav items.
   * @param {string} [options.selectorSideNavLinkCurrent]
   *   The CSS selector to find the interactive potion in active non-nested nav item.
   * @param {string} [options.classSideNavExpanded] The CSS class for the expanded state.
   * @param {string} [options.classSideNavItemActive]
   *   The CSS class for the active/inactive state for nav items.
   * @param {string} [options.classSideNavLinkCurrent]
   *   The CSS class for the active/inactive state of the interactive potion in non-nested nav items.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(on(element, 'click', this._handleClick));
  }

  /**
   * Enum for toggling side nav visibility
   * @readonly
   * @member SideNav.state
   * @type {object}
   * @property {string} EXPANDED Opening/visible
   * @property {string} COLLAPSED Closing/hidden
   */
  static state /* #__PURE_CLASS_PROPERTY__ */ = {
    EXPANDED: 'expanded',
    COLLAPSED: 'collapsed',
  };

  /**
   * @returns {boolean} `true` if the nav is expanded.
   */
  isNavExpanded() {
    return this.element.classList.contains(this.options.classSideNavExpanded);
  }

  /**
   * Changes the expanded/collapsed state.
   */
  changeState(state) {
    this.element.classList.toggle(
      this.options.classSideNavExpanded,
      state === this.constructor.state.EXPANDED
    );
  }

  _handleClick = evt => {
    const matchesToggle = eventMatches(evt, this.options.selectorSideNavToggle);
    const matchesNavSubmenu = eventMatches(
      evt,
      this.options.selectorSideNavSubmenu
    );
    const matchesSideNavLink = eventMatches(
      evt,
      this.options.selectorSideNavLink
    );
    if (!matchesToggle && !matchesNavSubmenu && !matchesSideNavLink) {
      return;
    }
    if (matchesToggle) {
      this.changeState(
        !this.isNavExpanded()
          ? this.constructor.state.EXPANDED
          : this.constructor.state.COLLAPSED
      );
      return;
    }
    if (matchesNavSubmenu) {
      const isSubmenuExpanded =
        matchesNavSubmenu.getAttribute('aria-expanded') === 'true';
      matchesNavSubmenu.setAttribute('aria-expanded', `${!isSubmenuExpanded}`);
      return;
    }
    if (matchesSideNavLink) {
      [
        ...this.element.querySelectorAll(
          this.options.selectorSideNavLinkCurrent
        ),
      ].forEach(el => {
        el.classList.remove(
          this.options.classSideNavItemActive,
          this.options.classSideNavLinkCurrent
        );
        el.removeAttribute('aria-current');
      });
      matchesSideNavLink.classList.add(this.options.classSideNavLinkCurrent);
      const closestSideNavItem = matchesSideNavLink.closest(
        this.options.selectorSideNavItem
      );
      if (closestSideNavItem) {
        closestSideNavItem.classList.add(this.options.classSideNavItemActive);
      }
    }
  };

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode SideNav.create .create()}, or {@linkcode SideNav.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode SideNav.init .init()} works.
   * @member SideNav.options
   * @type {object}
   * @property {string} selectorInit The data attribute to find side navs.
   * @property {string} [selectorSideNavToggle] The CSS selector to find the toggle button.
   * @property {string} [selectorSideNavSubmenu] The CSS selector to find the trigger buttons for sub nav items.
   * @property {string} [selectorSideNavItem] The CSS selector to find the nav items.
   * @property {string} [selectorSideNavLink] The CSS selector to find the interactive portions in non-nested nav items.
   * @property {string} [selectorSideNavLinkCurrent]
   *   The CSS selector to find the interactive potion in active non-nested nav item.
   * @property {string} [classSideNavExpanded] The CSS class for the expanded state.
   * @property {string} [classSideNavItemActive] The CSS class for the active/inactive state for nav items.
   * @property {string} [classSideNavLinkCurrent]
   *   The CSS class for the active/inactive state of the interactive portion in non-nested nav items.
   */
  static options /* #__PURE_CLASS_PROPERTY__ */ = {
    selectorInit: '[data-side-nav]',
    selectorSideNavToggle: `.${prefix}--side-nav__toggle`,
    selectorSideNavSubmenu: `.${prefix}--side-nav__submenu`,
    selectorSideNavItem: `.${prefix}--side-nav__item`,
    selectorSideNavLink: `.${prefix}--side-nav__link`,
    selectorSideNavLinkCurrent: `[aria-current="page"],.${prefix}--side-nav__link--current,.${prefix}--side-nav__item--active`,
    classSideNavExpanded: `${prefix}--side-nav--expanded`,
    classSideNavItemActive: `${prefix}--side-nav__item--active`,
    classSideNavLinkCurrent: `${prefix}--side-nav__link--current`,
  };
}

export default SideNav;
