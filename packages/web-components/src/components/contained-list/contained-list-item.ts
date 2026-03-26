/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import styles from './contained-list.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Contained list item.
 *
 * @element cds-contained-list-item
 * @slot - The content of the list item
 * @slot icon - The icon slot for rendering an icon
 * @slot action - The action slot for interactive elements
 * @fires cds-contained-list-item-click - Fires when clickable item is clicked
 */
@customElement(`${prefix}-contained-list-item`)
class CDSContainedListItem extends LitElement {
  /**
   * Whether this item is clickable
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * Whether this item is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Handles slot change for icon
   */
  private _handleIconSlotChange({ target }: Event) {
    const slot = target as HTMLSlotElement;
    const hasIcon = slot.assignedElements().length > 0;
    this._hasIcon = hasIcon;
    this.requestUpdate();
  }

  private _hasIcon = false;

  /**
   * Handles click event
   */
  private _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    const { eventClick } = this.constructor as typeof CDSContainedListItem;
    this.dispatchEvent(
      new CustomEvent(eventClick, {
        bubbles: true,
        composed: true,
        detail: { item: this },
      })
    );
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
  }

  render() {
    const { disabled, clickable, _hasIcon } = this;

    const classes = classMap({
      [`${prefix}--contained-list-item`]: true,
      [`${prefix}--contained-list-item--clickable`]: clickable,
      [`${prefix}--contained-list-item--with-icon`]: _hasIcon,
    });

    const contentClasses = `${prefix}--contained-list-item__content`;

    const content = html`
      ${_hasIcon
        ? html`
            <div class="${prefix}--contained-list-item__icon">
              <slot
                name="icon"
                @slotchange="${this._handleIconSlotChange}"></slot>
            </div>
          `
        : html`<slot
            name="icon"
            @slotchange="${this._handleIconSlotChange}"></slot>`}
      <div><slot></slot></div>
    `;

    return html`
      <div class="${classes}">
        ${clickable
          ? html`
              <button
                class="${contentClasses}"
                type="button"
                ?disabled="${disabled}"
                @click="${this._handleClick}">
                ${content}
              </button>
            `
          : html`<div class="${contentClasses}">${content}</div>`}
        <div class="${prefix}--contained-list-item__action">
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }

  /**
   * The name of the custom event fired when a clickable item is clicked
   */
  static get eventClick() {
    return `${prefix}-contained-list-item-click`;
  }

  static styles = styles;
}

export default CDSContainedListItem;
