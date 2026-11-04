/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { provide } from '@lit/context';
import { prefix } from '../../globals/settings';
import CDSLink from '../link/link';
import ArrowRight16 from '@carbon/icons/es/arrow--right/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import {
  cardContext,
  cardDefaultContext,
  type CardContextValue,
} from './card-context';
import { CARD_DENSITY, CARD_MEDIA_POSITION } from './defs';
import styles from './card.scss?lit';

export { CARD_DENSITY, CARD_MEDIA_POSITION };

/**
 * Card — composable container component.
 *
 * @element cds-card
 * @slot - Default slot for cds-card-header, cds-card-body, cds-card-footer, cds-card-media.
 * @slot decorator - Slot for cds-ai-label. Sets `has-ai-label` attribute when populated.
 * @slot footer-icon - Override the default ArrowRight icon in the clickable footer.
 */
@customElement(`${prefix}-card`)
class CDSCard extends CDSLink {
  // ─── Context ──────────────────────────────────────────────────────────────

  @provide({ context: cardContext })
  @property({ attribute: false })
  cardContext: CardContextValue = cardDefaultContext;

  // ─── Internal state ───────────────────────────────────────────────────────

  /** Set to true when a cds-ai-label is found in the decorator slot. */
  @state()
  private _hasAILabel = false;

  // ─── Properties / Attributes ──────────────────────────────────────────────

  /**
   * Makes the entire card surface interactive.
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * Mutes all interaction.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Controls heading typography inside the card.
   */
  @property({ type: String, reflect: true })
  density: CARD_DENSITY = CARD_DENSITY.PRODUCTIVE;

  /**
   * Side-by-side layout: cds-card-media on one side, other content stacked.
   */
  @property({ type: Boolean, reflect: true })
  horizontal = false;

  /**
   * Position of the media column when `horizontal` is true.
   * @default 'start'
   */
  @property({ attribute: 'media-position', reflect: true })
  mediaPosition: CARD_MEDIA_POSITION = CARD_MEDIA_POSITION.START;

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();

    // Accessible name requirement for clickable (non-link) cards.
    if (
      this.clickable &&
      !this.href &&
      !this.getAttribute('aria-label') &&
      !this.getAttribute('aria-labelledby')
    ) {
      // eslint-disable-next-line no-console
      console.error(
        `[cds-card] A clickable card must have an accessible name. ` +
          `Set \`aria-label\` or \`aria-labelledby\` on the element.`
      );
    }
  }

  willUpdate(changed: PropertyValues) {
    super.willUpdate?.(changed);

    if (
      changed.has('clickable') ||
      changed.has('disabled') ||
      changed.has('horizontal') ||
      changed.has('_hasAILabel')
    ) {
      this.cardContext = {
        clickable: this.clickable,
        disabled: this.disabled,
        horizontal: this.horizontal,
        hasAILabel: this._hasAILabel,
      };
    }
  }

  // ─── Slot handlers ────────────────────────────────────────────────────────

  private _handleDecoratorSlotChange({ target }: Event) {
    const slot = target as HTMLSlotElement;
    const hasAILabel = slot
      .assignedElements()
      .some((el) => el.matches(`${prefix}-ai-label`));

    this._hasAILabel = hasAILabel;

    if (hasAILabel) {
      this.setAttribute('has-ai-label', '');
    } else {
      this.removeAttribute('has-ai-label');
    }
  }

  private _handleDefaultSlotChange({ target }: Event) {
    const slot = target as HTMLSlotElement;
    const hasActions = slot
      .assignedElements({ flatten: true })
      .some((el) => el.matches(`${prefix}-card-actions`));

    if (hasActions) {
      this.setAttribute('has-actions', '');
    } else {
      this.removeAttribute('has-actions');
    }
  }

  // ─── Event handlers (non-link clickable mode) ─────────────────────────────

  private _handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // prevent Space from scrolling
      (e.currentTarget as HTMLElement).click();
    }
  }

  // ─── Render helpers ───────────────────────────────────────────────────────

  /** The BEM class map for the root card div/anchor. */
  private get _cardClasses() {
    const { clickable, disabled, density, _hasAILabel, horizontal } = this;
    return classMap({
      [`${prefix}--card`]: true,
      [`${prefix}--card--clickable`]: clickable && !disabled,
      [`${prefix}--card--disabled`]: disabled,
      [`${prefix}--card--${density}`]: true,
      [`${prefix}--card--has-ai-label`]: _hasAILabel,
      [`${prefix}--card--horizontal`]: horizontal,
    });
  }

  /**
   * The card's inner content layout.
   */
  private _renderContent() {
    const { horizontal, mediaPosition } = this;

    if (!horizontal) {
      return html`<slot @slotchange=${this._handleDefaultSlotChange}></slot>`;
    }

    const mediaSlot = html`<slot name="media"></slot>`;
    const contentDiv = html`
      <div class="${prefix}--card__content">
        <slot @slotchange=${this._handleDefaultSlotChange}></slot>
      </div>
    `;

    return mediaPosition === CARD_MEDIA_POSITION.END
      ? html`${contentDiv}${mediaSlot}`
      : html`${mediaSlot}${contentDiv}`;
  }

  /** Clickable-footer affordance (aria-hidden, purely decorative). */
  private _renderClickableFooter() {
    return html`
      <div class="${prefix}--card__clickable-footer" aria-hidden="true">
        <slot name="footer-icon">
          ${iconLoader(ArrowRight16, { 'aria-hidden': 'true' })}
        </slot>
      </div>
    `;
  }

  // ─── CDSLink overrides ────────────────────────────────────────────────────
  protected _renderInner() {
    const { clickable } = this;
    return html`
      <div class=${this._cardClasses}>
        ${this._renderContent()}
        ${clickable ? this._renderClickableFooter() : nothing}
        <div class="${prefix}--card__decorator">
          <slot
            name="decorator"
            @slotchange=${this._handleDecoratorSlotChange}></slot>
        </div>
      </div>
    `;
  }

  render() {
    return this._renderLink();
  }

  protected _renderLink() {
    const { href, clickable, disabled } = this;

    // Link card — delegate to CDSLink's implementation, but render a <p>
    // (via _renderDisabledLink) when disabled to suppress navigation.
    if (href) {
      return disabled ? this._renderDisabledLink() : super._renderLink();
    }

    // Non-link clickable card — div with button semantics.
    if (clickable) {
      return html`
        <div
          role="button"
          tabindex=${disabled ? -1 : 0}
          aria-disabled=${disabled}
          @click=${this._handleClick}
          @keydown=${this._handleKeydown}>
          ${this._renderInner()}
        </div>
      `;
    }

    // Static card — plain div, no interaction semantics.
    return html`<div>${this._renderInner()}</div>`;
  }

  // ─── Static ───────────────────────────────────────────────────────────────

  /**
   * Selector matching the AI Label element.
   */
  static get aiLabelItem() {
    return `${prefix}-ai-label`;
  }

  static styles = styles;
}

export default CDSCard;
