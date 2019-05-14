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

export default class SideNav extends mixin(
  createComponent,
  initComponentBySearch,
  handles
) {
  /**
   * The map associating DOM element and copy button UI instance.
   * @member SideNav.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  constructor(element, options) {
    super(element, options);
    this.manage(on(element, 'click', this._handleClick));
  }

  /**
   * Enum for toggling side nav visibility
   * @readonly
   * @member SideNav.state
   * @type {Object}
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
   * @type {Object}
   * @property {string} selectorInit The data attribute to find side navs.
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
