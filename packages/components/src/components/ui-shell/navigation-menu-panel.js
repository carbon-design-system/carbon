/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentByLauncher from '../../globals/js/mixins/init-component-by-launcher';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import handles from '../../globals/js/mixins/handles';
import eventedState from '../../globals/js/mixins/evented-state';
import toggleAttribute from '../../globals/js/misc/toggle-attribute';
import settings from '../../globals/js/settings';

export default class NavigationMenuPanel extends mixin(
  createComponent,
  initComponentByLauncher,
  eventedShowHideState,
  handles,
  eventedState
) {
  createdByLauncher = (event) => {
    const isExpanded = !this.element.hasAttribute('hidden');
    const newState = isExpanded ? 'collapsed' : 'expanded';
    this.triggerButton = event.delegateTarget;
    this.changeState(newState);
  };

  /**
   * Determine whether or not the state should change based on comparison with
   * the current state
   * @param {string} state
   * @returns {boolean} true if given state is different from current state
   */
  shouldStateBeChanged = (state) =>
    (state === 'expanded') === this.element.hasAttribute('hidden');

  /**
   * Changes the expanded/collapsed state.
   * @private
   * @param {string} state The new state.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState = (state, callback) => {
    toggleAttribute(this.element, 'hidden', state !== 'expanded');
    if (this.triggerButton) {
      if (state === 'expanded') {
        const focusableMenuItems = this.element.querySelector(
          this.options.selectorFocusableMenuItem
        );
        if (focusableMenuItems) {
          focusableMenuItems.focus();
        }
      }
      const label =
        state === 'expanded'
          ? this.triggerButton.getAttribute(this.options.attribLabelCollapse)
          : this.triggerButton.getAttribute(this.options.attribLabelExpand);
      this.triggerButton.classList.toggle(
        this.options.classNavigationMenuPanelHeaderActionActive,
        state === 'expanded'
      );
      this.triggerButton.setAttribute('aria-label', label);
      this.triggerButton.setAttribute('title', label);
    }
    callback();
  };

  /**
   * The map associating DOM element and NavigationMenuPanel instance.
   * @member NavigationMenuPanel.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode NavigationMenuPanel.create .create()}, or
   * {@linkcode NavigationMenuPanel.init .init()},
   * properties in this object are overriden for the instance being create and
   * how {@linkcode NavigationMenuPanel.init .init()} works.
   * @member NavigationMenuPanel.options
   * @type {object}
   * @property {string} selectorInit The CSS class to find popup navs.
   * @property {string} attribInitTarget The attribute name in the launcher buttons to find target popup nav.
   * @property {string[]} initEventNames The events that the component will handles
   */
  static get options() {
    const { prefix } = settings;
    return {
      initEventNames: ['click'],
      eventBeforeExpanded: 'navigation-menu-being-expanded',
      eventAfterExpanded: 'navigation-menu-expanded',
      eventBeforeCollapsed: 'navigation-menu-being-collapsed',
      eventAfterCollapsed: 'navigation-menu-collapsed',
      selectorFocusableMenuItem: `.${prefix}--navigation__category-toggle, .${prefix}--navigation-link`,
      classNavigationMenuPanelHeaderActionActive: `${prefix}--header__action--active`,
      attribLabelExpand: 'data-navigation-menu-panel-label-expand',
      attribLabelCollapse: 'data-navigation-menu-panel-label-collapse',
    };
  }
}
