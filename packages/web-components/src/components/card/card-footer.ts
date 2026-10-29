/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
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
 * Card footer — bottom content/action bar.
 *
 * Must not be used inside a `clickable` card. When placed inside one,
 * this element renders nothing and logs a console.error — a clickable
 * card renders its own built-in footer affordance automatically.
 *
 * Reflects `has-actions` when any `cds-card-action` element is slotted,
 * enabling CSS rule [17] to apply zero-padding / border-top layout without
 * any cross-boundary `:has(> .cds--card__action)`.
 *
 * @element cds-card-footer
 * @slot - Default slot for footer content or cds-card-action elements.
 */
@customElement(`${prefix}-card-footer`)
class CDSCardFooter extends LitElement {
  @consume({ context: cardContext, subscribe: true })
  @state()
  private _cardContext: CardContextValue = cardDefaultContext;

  // ─── Slot handlers ──────────────────────────────────────────────────────

  /**
   * Reflects `has-actions` attribute when at least one `cds-card-action`
   * is present in the default slot. CSS rule [17] keys off this attribute
   * to switch the footer to its action-set layout (padding:0, border-top).
   */
  private _handleDefaultSlotChange({ target }: Event) {
    const slot = target as HTMLSlotElement;
    const hasActions = slot
      .assignedElements({ flatten: true })
      .some((el) => el.matches(`${prefix}-card-action`));

    if (hasActions) {
      this.setAttribute('has-actions', '');
    } else {
      this.removeAttribute('has-actions');
    }
  }

  render() {
    if (this._cardContext.clickable) {
      // eslint-disable-next-line no-console
      console.error(
        `[cds-card-footer] Cannot be used inside a clickable card. ` +
          `A clickable card renders its own footer affordance automatically. ` +
          `Use the \`footer-icon\` slot on \`cds-card\` to customise the icon.`
      );
      return nothing;
    }

    return html`
      <div class="${prefix}--card__footer">
        <slot @slotchange=${this._handleDefaultSlotChange}></slot>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSCardFooter;
