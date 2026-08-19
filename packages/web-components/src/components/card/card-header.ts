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
 * Renders its children inside the `__header` container.
 * Click and keydown events originating from the `decorator` slot are
 * stopped here so that interactions with the AILabel popover do not
 * bubble up to a clickable card surface.
 *
 * Reflects `has-title-media` when a `cds-card-title-media` is slotted,
 * enabling CSS rule [16] to adjust title grid placement without any
 * cross-boundary `:has()`.
 *
 * @element cds-card-header
 * @slot - Default slot for cds-card-title, cds-card-title-media, cds-card-actions.
 * @slot decorator - Slot for cds-ai-label or other decorator element.
 */
@customElement(`${prefix}-card-header`)
class CDSCardHeader extends LitElement {
  @consume({ context: cardContext, subscribe: true })
  @state()
  private _cardContext: CardContextValue = cardDefaultContext;

  // ─── Slot handlers ──────────────────────────────────────────────────────

  /**
   * Reflects `has-title-media` attribute when a `cds-card-title-media`
   * element is present in the default slot. CSS rule [16] keys off this
   * attribute to shift `cds-card__title` to the second grid column without
   * needing a cross-boundary `:has(> .cds--card__title-media)`.
   */
  private _handleDefaultSlotChange({ target }: Event) {
    const slot = target as HTMLSlotElement;
    const hasTitleMedia = slot
      .assignedElements({ flatten: true })
      .some((el) => el.matches(`${prefix}-card-title-media`));

    if (hasTitleMedia) {
      this.setAttribute('has-title-media', '');
    } else {
      this.removeAttribute('has-title-media');
    }
  }

  /**
   * Stop click/keydown from the decorator slot propagating to the card's
   * interactive surface — prevents the AILabel popover open from
   * accidentally triggering the card's click handler.
   */
  private _handleDecoratorInteraction(e: Event) {
    e.stopPropagation();
  }

  render() {
    // _cardContext is consumed but the header currently only uses it as a
    // signal to stay in sync when card state changes (e.g. future density
    // or horizontal state reactions). The decorator slot isolation below is
    // the primary behaviour.
    void this._cardContext;

    return html`
      <div class="${prefix}--card__header">
        <slot @slotchange=${this._handleDefaultSlotChange}></slot>
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
