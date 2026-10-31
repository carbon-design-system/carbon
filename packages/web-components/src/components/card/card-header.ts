/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import {
  cardContext,
  cardDefaultContext,
  type CardContextValue,
} from './card-context';
import styles from './card.scss?lit';

/**
 * Card header — header section of the card.
 *
 * The header is a flexbox. Without `header-media` the title and the actions
 * share a single row and the title fills whatever space the actions don't use.
 * With `header-media` the media and the actions share the first row and the
 * title drops to a full-width second row. No JS measurement is involved.
 *
 * @element cds-card-header
 * @slot - Default slot for cds-card-title.
 * @slot header-media - Icon, avatar, tag, or other media rendered above the title.
 * @slot actions - A cds-card-actions element, placed end-aligned in the header.
 * @slot decorator - Slot for cds-ai-label or other decorator element.
 */
@customElement(`${prefix}-card-header`)
class CDSCardHeader extends LitElement {
  @consume({ context: cardContext, subscribe: true })
  @state()
  private _cardContext: CardContextValue = cardDefaultContext;

  @state()
  private _hasHeaderMedia = false;

  @state()
  private _hasActions = false;

  /**
   * Re-evaluates which named slots are populated. Every render branch keeps
   * both named slots wired to this handler so a change is always observed.
   */
  private _handleNamedSlotChange() {
    this._hasHeaderMedia = this._hasSlotted('header-media');
    this._hasActions = this._hasSlotted('actions');
  }

  private _hasSlotted(name: string) {
    return Array.from(this.children).some(
      (el) => el.getAttribute('slot') === name
    );
  }

  private _handleDecoratorInteraction(e: Event) {
    e.stopPropagation();
  }

  private _renderMedia() {
    const slot = html`<slot
      name="header-media"
      @slotchange=${this._handleNamedSlotChange}></slot>`;
    return this._hasHeaderMedia
      ? html`<div class="${prefix}--card__header-media">${slot}</div>`
      : slot;
  }

  private _renderActions() {
    const slot = html`<slot
      name="actions"
      @slotchange=${this._handleNamedSlotChange}></slot>`;
    return this._hasActions
      ? html`<div class="${prefix}--card__actions-slot">${slot}</div>`
      : slot;
  }

  render() {
    const { hasAILabel } = this._cardContext;

    return html`
      <div
        class="${prefix}--card__header"
        ?data-has-ai-label=${hasAILabel}
        ?data-has-actions=${this._hasActions}>
        ${this._hasHeaderMedia
          ? html`
              <div class="${prefix}--card__header-top-row">
                ${this._renderMedia()}${this._renderActions()}
              </div>
              <slot></slot>
            `
          : html`${this._renderMedia()}<slot></slot>${this._renderActions()}`}
        <div
          class="${prefix}--card__decorator"
          role="presentation"
          @click=${this._handleDecoratorInteraction}
          @keydown=${this._handleDecoratorInteraction}>
          <slot name="decorator"></slot>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSCardHeader;
