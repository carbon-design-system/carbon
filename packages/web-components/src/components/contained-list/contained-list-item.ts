/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './contained-list.scss?lit';

/**
 * Contained list item component
 *
 * @element cds-contained-list-item
 * @fires cds-contained-list-item-click - Fired when a clickable item is clicked
 * @slot - The default slot for item content
 * @slot icon - The slot for icon component
 * @slot action - The slot for item action elements
 */
@customElement(`${prefix}-contained-list-item`)
class CDSContainedListItem extends LitElement {
  /**
   * Whether this item is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether this item is clickable (renders as button)
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  /**
   * Check if icon slot has content
   */
  private _hasIcon(): boolean {
    const iconSlot = this.shadowRoot?.querySelector(
      'slot[name="icon"]'
    ) as HTMLSlotElement;
    return iconSlot?.assignedElements().length > 0;
  }

  /**
   * Check if action slot has content
   */
  private _hasAction(): boolean {
    const actionSlot = this.shadowRoot?.querySelector(
      'slot[name="action"]'
    ) as HTMLSlotElement;
    return actionSlot?.assignedElements().length > 0;
  }

  /**
   * Handle click on clickable item
   */
  private _handleClick() {
    if (!this.disabled) {
      const event = new CustomEvent('cds-contained-list-item-click', {
        bubbles: true,
        composed: true,
        detail: { item: this },
      });
      this.dispatchEvent(event);
    }
  }

  /**
   * Update classes when slots change
   */
  private _handleSlotChange() {
    this.requestUpdate();
  }

  render() {
    const classes = classMap({
      [`${prefix}--contained-list-item`]: true,
      [`${prefix}--contained-list-item--clickable`]: this.clickable,
      [`${prefix}--contained-list-item--with-icon`]: this._hasIcon(),
      [`${prefix}--contained-list-item--with-action`]: this._hasAction(),
    });

    const content = html`
      <slot name="icon" @slotchange="${this._handleSlotChange}"></slot>
      <div><slot></slot></div>
    `;

    return html`
      <div class="${classes}">
        ${this.clickable
          ? html`
              <button
                class="${prefix}--contained-list-item__content"
                type="button"
                ?disabled="${this.disabled}"
                @click="${this._handleClick}">
                ${content}
              </button>
            `
          : html`
              <div class="${prefix}--contained-list-item__content">
                ${content}
              </div>
            `}
        <div class="${prefix}--contained-list-item__action">
          <slot name="action" @slotchange="${this._handleSlotChange}"></slot>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSContainedListItem;
