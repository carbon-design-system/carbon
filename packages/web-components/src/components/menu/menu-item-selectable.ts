/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './menu-item.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { consume } from '@lit/context';
import { MenuContext } from './menu-context';
/**
 * Menu Item.
 *
 * @element cds-menu-item
 */
@customElement(`${prefix}-menu-item-selectable`)
class CDSmenuItemSelectable extends LitElement {
  @consume({ context: MenuContext })
  context;
  /**
   * Label for the menu item selectable.
   */
  @property({ type: String })
  label;
  /**
   * Whether the menu item is selected or not.
   */
  @property({ type: Boolean })
  selected = false;

  /**
   * The name of the custom event fired when the selection state changes.
   */
  static get eventOnChange() {
    return `${prefix}-item-changed`;
  }

  /**
   * Automatically forwards focus to the first focusable element inside the shadow root (helps with focus styles when wrapped in menu-item-group)
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Sets the menu item's icon.
   */
  @property()
  renderIcon?: () => void;

  @property()
  shortcut;

  _handleClick = (e) => {
    this.selected = !this.selected;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy: e.target,
      },
    };
    if (
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSmenuItemSelectable).eventOnChange,
          init
        )
      )
    ) {
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSmenuItemSelectable).eventOnChange,
          init
        )
      );
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeydown);
  }

  firstUpdated() {
    const menuItemSelectable = this.shadowRoot?.querySelector(
      `${prefix}-menu-item`
    ) as HTMLElement | null;
    if (menuItemSelectable) {
      menuItemSelectable.addEventListener('keydown', this._handleKeydown);
    }

    this.setAttribute('tabindex', '-1');
    this.context.updateFromChild({ hasSelectableItems: true });
  }

  _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this._handleClick(e);
    }
  };

  render() {
    const { label, selected, _handleClick: handleClick } = this;

    return html`
      <cds-menu-item
        label="${label}"
        class="${prefix}--menu-item-selectable--selected"
        role="menuitemcheckbox"
        shortcut=${this.shortcut}
        aria-checked="${selected}"
        @click="${handleClick}">
        <slot slot="render-icon" name="render-icon"></slot>
      </cds-menu-item>
    `;
  }
  static styles = styles;
}
export default CDSmenuItemSelectable;
