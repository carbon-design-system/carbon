/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import on from '../../globals/mixins/on';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { forEach } from '../../globals/internal/collection-helpers';
import Handle from '../../globals/internal/handle';
import { SIDE_NAV_COLLAPSE_MODE, SIDE_NAV_USAGE_MODE } from './defs';
import CDSHeaderMenuButton from './header-menu-button';
import CDSSideNavMenu from './side-nav-menu';
import styles from './side-nav.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { SIDE_NAV_COLLAPSE_MODE, SIDE_NAV_USAGE_MODE };

/**
 * Side nav.
 *
 * @element cds-side-nav
 */
@customElement(`${prefix}-side-nav`)
class CDSSideNav extends HostListenerMixin(LitElement) {
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
        (
          this.querySelector(
            (this.constructor as typeof CDSSideNav).selectorNavItems
          ) as HTMLElement
        )?.focus();
      }
    }
  };

  /**
   * Force child side nav menus collapsed upon the hover/expanded state of this side nav.
   */
  private _updatedSideNavMenuForceCollapsedState() {
    const { expanded, _hovered: hovered } = this;
    forEach(
      this.querySelectorAll(
        (this.constructor as typeof CDSSideNav).selectorMenu
      ),
      (item) => {
        (item as CDSSideNavMenu).forceCollapsed = !expanded && !hovered;
      }
    );
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
   * If `true` will style the side nav to sit below the header
   */
  @property({
    type: Boolean,
    attribute: 'is-not-child-of-header',
  })
  isNotChildOfHeader = false;

  /**
   * Specify if the side-nav will be persistent above the lg breakpoint
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-not-persistent' })
  isNotPersistent = false;

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
      this._transitionPromise = new Promise((resolve) => {
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
    const doc = this.getRootNode() as Document;
    if (changedProperties.has('collapseMode')) {
      forEach(
        doc.querySelectorAll(
          (this.constructor as typeof CDSSideNav).selectorButtonToggle
        ),
        (item) => {
          (item as CDSHeaderMenuButton).collapseMode = this.collapseMode;
        }
      );
    }
    if (changedProperties.has('expanded')) {
      const headerItems = doc.querySelectorAll(
        (this.constructor as typeof CDSSideNav).selectorHeaderItems
      );
      forEach(
        doc.querySelectorAll(
          (this.constructor as typeof CDSSideNav).selectorButtonToggle
        ),
        (item) => {
          (item as CDSHeaderMenuButton).active = this.expanded;
        }
      );
      if (this.expanded) {
        forEach(headerItems, (item) => {
          item.setAttribute('tabindex', '-1');
        });
      } else {
        forEach(headerItems, (item) => {
          item.removeAttribute('tabindex');
        });
      }
    }
    if (changedProperties.has('isNotChildOfHeader')) {
      forEach(
        doc.querySelectorAll(
          (this.constructor as typeof CDSSideNav).selectorButtonToggle
        ),
        (item) => {
          (item as CDSHeaderMenuButton).isNotChildOfHeader =
            this.isNotChildOfHeader;
        }
      );
    }
  }

  /**
   * Handles `blur` event handler on this element.
   *
   * @param event The event.
   * @param event.relatedTarget The event relatedTarget.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocusOut({ relatedTarget }: FocusEvent) {
    const { collapseMode } = this;
    if (collapseMode !== SIDE_NAV_COLLAPSE_MODE.FIXED) {
      if (!this.contains(relatedTarget as Node)) {
        this.expanded = false;
      }
    }
  }

  /**
   * Handles `focus` event handler on this element.
   *
   */
  @HostListener('focusin')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocusIn() {
    const { collapseMode } = this;
    if (collapseMode !== SIDE_NAV_COLLAPSE_MODE.FIXED) {
      this.expanded = true;
    }
  }

  /**
   * Handles the `mouseover` event for the side nav in rail mode.
   *
   */
  private _handleNavMouseOver() {
    const { collapseMode } = this;
    if (collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL) {
      this.expanded = true;
      this._hovered = true;
      this._updatedSideNavMenuForceCollapsedState();
    }
  }

  /**
   * Handles the `mouseout` event for the side nav in rail mode.
   *
   */
  private _handleNavMouseOut() {
    const { collapseMode } = this;
    if (collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL) {
      this.expanded = false;
      this._hovered = false;
      this._updatedSideNavMenuForceCollapsedState();
    }
  }

  /**
   * Handles the `click` event for the side nav overlay.
   *
   */
  private _onOverlayClick() {
    this.expanded = false;
  }

  render() {
    const { collapseMode, expanded, isNotChildOfHeader, isNotPersistent } =
      this;
    const classes = classMap({
      [`${prefix}--side-nav__navigation`]: true,
      [`${prefix}--side-nav`]: true,
      [`${prefix}--side-nav--expanded`]: expanded,
      [`${prefix}--side-nav--collapsed`]:
        !expanded && collapseMode === SIDE_NAV_COLLAPSE_MODE.FIXED,
      [`${prefix}--side-nav--rail`]:
        collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL,
      [`${prefix}--side-nav--ux`]: !isNotChildOfHeader,
      [`${prefix}--side-nav--hidden`]: isNotPersistent,
    });

    const overlayClasses = classMap({
      [`${prefix}--side-nav__overlay`]: true,
      [`${prefix}--side-nav__overlay-active`]: expanded,
    });
    return html`${this.collapseMode === SIDE_NAV_COLLAPSE_MODE.FIXED
        ? null
        : html`<div
            class="${overlayClasses}"
            @click=${this._onOverlayClick}></div>`}
      <div
        class="${classes}"
        @mouseover="${this._handleNavMouseOver}"
        @mouseout="${this._handleNavMouseOut}">
        <slot></slot>
      </div>`;
  }

  /**
   * A selector that will return the toggle buttons.
   */
  static get selectorButtonToggle() {
    return `${prefix}-header-menu-button`;
  }

  /**
   * A selector that will return the header name + global action elements.
   */
  static get selectorHeaderItems() {
    return `${prefix}-header-name, ${prefix}-header-global-action`;
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

export default CDSSideNav;
