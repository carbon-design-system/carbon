/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { forEach } from '../../globals/internal/collection-helpers';
import Handle from '../../globals/internal/handle';
import { SIDE_NAV_COLLAPSE_MODE, SIDE_NAV_USAGE_MODE } from './defs';
import BXHeaderMenuButton from './header-menu-button';
import BXSideNavMenu from './side-nav-menu';
import styles from './side-nav.scss';

export { SIDE_NAV_COLLAPSE_MODE, SIDE_NAV_USAGE_MODE };

const { prefix } = settings;

/**
 * Side nav.
 *
 * @element bx-side-nav
 */
@customElement(`${prefix}-side-nav`)
class BXSideNav extends HostListenerMixin(LitElement) {
  /**
   * `true` if this side nav is hovered.
   */
  private _hovered = false;

  /**
   * The handle for `transitionend` event listener.
   */
  private _hTransition: Handle | null = null;

  /**
   * A promise that is resolved when the transition is complete.
   */
  private _transitionPromise = Promise.resolve();

  /**
   * A promise that is resolved when the transition upon proprety update is complete.
   */
  private get _updateAndTransitionPromise() {
    return this.updateComplete.then(() => this._transitionPromise);
  }

  /**
   * Cleans the handle for `transitionend` event listener.
   */
  private _cleanHTransition() {
    if (this._hTransition) {
      this._hTransition = this._hTransition.release();
    }
  }

  /**
   * Handles `${prefix}-header-menu-button-toggle` event on the document.
   */
  @HostListener('parentRoot:eventButtonToggle')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleButtonToggle = async (event: CustomEvent) => {
    this.expanded = event.detail.active;
    if (this.expanded) {
      await this._updateAndTransitionPromise;
      // Checks if the side nav is not collapsed during the animation
      if (this.expanded) {
        (this.querySelector((this.constructor as typeof BXSideNav).selectorNavItems) as HTMLElement)?.focus();
      }
    }
  };

  /**
   * Force child side nav menus collapsed upon the hover/expanded state of this side nav.
   */
  private _updatedSideNavMenuForceCollapsedState() {
    const { expanded, _hovered: hovered } = this;
    forEach(this.querySelectorAll((this.constructor as typeof BXSideNav).selectorMenu), item => {
      (item as BXSideNavMenu).forceCollapsed = !expanded && !hovered;
    });
  }

  /**
   * Handles `mouseover` event handler.
   */
  @HostListener('mouseover')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleMouseover() {
    this._hovered = true;
    this._updatedSideNavMenuForceCollapsedState();
  }

  /**
   * Handles `mouseout` event handler.
   */
  @HostListener('mouseout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleMouseout() {
    this._hovered = false;
    this._updatedSideNavMenuForceCollapsedState();
  }

  /**
   * Collapse mode of the side nav.
   */
  @property({ reflect: true, attribute: 'collapse-mode' })
  collapseMode = SIDE_NAV_COLLAPSE_MODE.RESPONSIVE;

  /**
   * `true` to expand the side nav.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * Usage mode of the side nav.
   */
  @property({ reflect: true, attribute: 'usage-mode' })
  usageMode = SIDE_NAV_USAGE_MODE.REGULAR;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'navigation');
    }
    super.connectedCallback();
  }

  disconnectedCallback() {
    this._cleanHTransition();
    super.disconnectedCallback();
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('expanded')) {
      this._transitionPromise = new Promise(resolve => {
        this._cleanHTransition();
        this._hTransition = on(this, 'transitionend', () => {
          this._cleanHTransition();
          resolve();
        });
      });
    }
    return true;
  }

  updated(changedProperties) {
    if (changedProperties.has('collapseMode') || changedProperties.has('usageMode')) {
      const { collapseMode, usageMode } = this;
      if (
        (collapseMode === SIDE_NAV_COLLAPSE_MODE.FIXED || collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL) &&
        usageMode === SIDE_NAV_USAGE_MODE.HEADER_NAV
      ) {
        console.warn('Fixed/rail modes of side nav cannot be used with header nav mode.'); // eslint-disable-line no-console
      }
    }
    const doc = this.getRootNode() as Document;
    if (changedProperties.has('collapseMode')) {
      forEach(doc.querySelectorAll((this.constructor as typeof BXSideNav).selectorButtonToggle), item => {
        (item as BXHeaderMenuButton).collapseMode = this.collapseMode;
      });
    }
    if (changedProperties.has('expanded')) {
      this._updatedSideNavMenuForceCollapsedState();
      forEach(doc.querySelectorAll((this.constructor as typeof BXSideNav).selectorButtonToggle), item => {
        (item as BXHeaderMenuButton).active = this.expanded;
      });
    }
    if (changedProperties.has('usageMode')) {
      forEach(doc.querySelectorAll((this.constructor as typeof BXSideNav).selectorButtonToggle), item => {
        (item as BXHeaderMenuButton).usageMode = this.usageMode;
      });
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  /**
   * A selector that will return the toggle buttons.
   */
  static get selectorButtonToggle() {
    return `${prefix}-header-menu-button`;
  }

  /**
   * A selector that will return side nav focusable items.
   */
  static get selectorNavItems() {
    return `${prefix}-side-nav-menu, ${prefix}-side-nav-menu-item, ${prefix}-side-nav-link`;
  }

  /**
   * A selector that will return side nav menus.
   */
  static get selectorMenu() {
    return `${prefix}-side-nav-menu`;
  }

  /**
   * The name of the custom event fired after the header menu button in the document is toggled upon a user gesture.
   */
  static get eventButtonToggle() {
    return `${prefix}-header-menu-button-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXSideNav;
