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
 * @element cds-card-header
 * @slot - Default slot for cds-card-title, cds-card-title-media, cds-card-actions.
 * @slot decorator - Slot for cds-ai-label or other decorator element.
 */
@customElement(`${prefix}-card-header`)
class CDSCardHeader extends LitElement {
  @consume({ context: cardContext, subscribe: true })
  @state()
  private _cardContext: CardContextValue = cardDefaultContext;

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

  private _handleDecoratorInteraction(e: Event) {
    e.stopPropagation();
  }

  render() {
    const { hasAILabel } = this._cardContext;

    return html`
      <div class="${prefix}--card__header" ?data-has-ai-label=${hasAILabel}>
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
