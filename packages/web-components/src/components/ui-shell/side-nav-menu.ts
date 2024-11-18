/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import ChevronDown20 from '@carbon/icons/lib/chevron--down/20.js';
import { prefix } from '../../globals/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import FocusMixin from '../../globals/mixins/focus';
import styles from './side-nav.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Side nav menu.
 *
 * @element cds-side-nav-menu
 * @fires cds-side-nav-menu-beingtoggled
 *   The name of the custom event fired before this side nav menu is being toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of toggling this side nav menu.
 * @fires cds-side-nav-menu-toggled
 *   The name of the custom event fired after this side nav menu is toggled upon a user gesture.
 * @slot title-icon - The icon.
 * @csspart expando The expando.
 * @csspart expando-icon-container The expando icon container.
 * @csspart expando-icon The expando icon.
 * @csspart title The title.
 * @csspart title-icon-container The title icon container.
 * @csspart menu-body The menu body.
 */
@customElement(`${prefix}-side-nav-menu`)
class CDSSideNavMenu extends FocusMixin(LitElement) {
  /**
   * `true` if this menu has an icon.
   */
  private _hasIcon = false;

  /**
   * The container for the title icon.
   */
  @query('#title-icon-container')
  private _titleIconContainerNode!: HTMLDivElement;

  /**
   * Handles user-initiated toggle request of this side nav menu.
   *
   * @param expanded The new expanded state.
   */
  private _handleUserInitiatedToggle(expanded = !this.expanded) {
    const { eventBeforeToggle, eventToggle } = this
      .constructor as typeof CDSSideNavMenu;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        expanded,
      },
    };
    if (this.dispatchEvent(new CustomEvent(eventBeforeToggle, init))) {
      this.expanded = expanded;
      this.dispatchEvent(new CustomEvent(eventToggle, init));
    }
  }

  /**
   * Handler for the `click` event on the expando button.
   */
  private _handleClickExpando() {
    this._handleUserInitiatedToggle();
  }

  /**
   * Handles `slotchange` event on the non-named `<slot>`.
   */
  private _handleSlotChange({ target }) {
    const { _hasIcon: hasIcon } = this;
    forEach(target.assignedNodes(), (item) => {
      if (item.nodeType === Node.ELEMENT_NODE) {
        item.toggleAttribute(
          (this.constructor as typeof CDSSideNavMenu).attribItemHasIcon,
          hasIcon
        );
      }
    });
  }

  /**
   * Handles `slotchange` event on the `<slot>` for the title icon.
   */
  private _handleSlotChangeTitleIcon({ target }) {
    const constructor = this.constructor as typeof CDSSideNavMenu;
    const hasIcon = target.assignedNodes().length > 0;
    this._hasIcon = hasIcon;
    this._titleIconContainerNode?.toggleAttribute('hidden', !hasIcon);
    forEach(this.querySelectorAll(constructor.selectorItem), (item) => {
      item.toggleAttribute(constructor.attribItemHasIcon, hasIcon);
    });
  }

  /**
   * `true` if the menu has active menu item.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * `true` if the menu should be open.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * Specify if this is a large variation of the side nav menu
   */
  @property({ type: Boolean, reflect: true })
  large = false;

  /**
   * `true` if the menu should be forced collapsed upon side nav's expanded state.
   */
  @property({ type: Boolean, reflect: true, attribute: 'force-collapsed' })
  forceCollapsed = false;

  /**
   * The title text.
   */
  @property()
  title = '';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('expanded')) {
      const { selectorItem } = this.constructor as typeof CDSSideNavMenu;
      const { expanded } = this;
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        (elem as HTMLElement).tabIndex = expanded ? 0 : -1;
      });
    }
  }

  render() {
    const {
      expanded,
      forceCollapsed,
      title,
      _handleClickExpando: handleClickExpando,
      _handleSlotChange: handleSlotChange,
      _handleSlotChangeTitleIcon: handleSlotChangeTitleIcon,
    } = this;
    return html`
      <button
        type="button"
        part="expando"
        aria-haspopup="true"
        aria-expanded="${String(Boolean(expanded && !forceCollapsed))}"
        class="${prefix}--side-nav__submenu"
        @click=${handleClickExpando}>
        <div
          id="title-icon-container"
          part="title-icon-container"
          hidden
          class="${prefix}--side-nav__icon">
          <slot
            name="title-icon"
            @slotchange=${handleSlotChangeTitleIcon}></slot>
        </div>
        <span part="title" class="${prefix}--side-nav__submenu-title"
          >${title}</span
        >
        <div
          part="expando-icon-container"
          class="${prefix}--side-nav__icon ${prefix}--side-nav__icon--small ${prefix}--side-nav__submenu-chevron">
          ${ChevronDown20({ part: 'expando-icon' })}
        </div>
      </button>
      <ul part="menu-body" class="${prefix}--side-nav__menu">
        <slot @slotchange=${handleSlotChange}></slot>
      </ul>
    `;
  }

  /**
   * The attribute name of the menu items, that is set if this menu has an icon.
   */
  static attribItemHasIcon = 'parent-has-icon';

  /**
   * A selector that will return the menu items.
   */
  static get selectorItem() {
    return `${prefix}-side-nav-menu-item`;
  }

  /**
   * The name of the custom event fired before this side nav menu is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this side nav menu.
   */
  static get eventBeforeToggle() {
    return `${prefix}-side-nav-menu-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this side nav menu is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${prefix}-side-nav-menu-toggled`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

export default CDSSideNavMenu;
