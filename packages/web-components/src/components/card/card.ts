/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { provide } from '@lit/context';
import { prefix } from '../../globals/settings';
import CDSLink from '../link/link';
import ArrowRight16 from '@carbon/icons/es/arrow--right/16.js';
import Error16 from '@carbon/icons/es/error/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSCardHeader from './card-header';
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
 * @slot footer-icon - Override the default ArrowRight icon in the clickable footer. Ignored while the card is disabled, which always shows the error icon.
 */
@customElement(`${prefix}-card`)
class CDSCard extends CDSLink {
  // ─── Context ──────────────────────────────────────────────────────────────

  @provide({ context: cardContext })
  @property({ attribute: false })
  cardContext: CardContextValue = cardDefaultContext;

  // ─── Internal state ───────────────────────────────────────────────────────

  /** Set to true when a cds-ai-label is found in the header's decorator slot. */
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

  /**
   * The accessible name of the card. It is applied to the interactive element
   * inside the card (`role="button"`, the anchor, or the disabled group),
   * because `aria-label` on `cds-card` does not reach it.
   */
  @property({ attribute: 'aria-label' })
  ariaLabel: string | null = null;

  /**
   * The id of the element that names the card. Looked up in the card's own
   * tree and resolved to text; see `aria-label`.
   */
  @property({ attribute: 'aria-labelledby' })
  ariaLabelledby?: string;

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      CDSCardHeader.eventAILabelChange,
      this._handleHeaderAILabelChange
    );

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

  disconnectedCallback() {
    this.removeEventListener(
      CDSCardHeader.eventAILabelChange,
      this._handleHeaderAILabelChange
    );
    super.disconnectedCallback();
  }

  willUpdate(changed: PropertyValues) {
    super.willUpdate?.(changed);

    if (
      changed.has('clickable') ||
      changed.has('disabled') ||
      changed.has('horizontal') ||
      changed.has('density') ||
      changed.has('_hasAILabel')
    ) {
      this.cardContext = {
        clickable: this.clickable,
        disabled: this.disabled,
        horizontal: this.horizontal,
        hasAILabel: this._hasAILabel,
        density: this.density,
      };
    }
  }

  // ─── Slot handlers ────────────────────────────────────────────────────────

  /**
   * The AI label lives in the header's `decorator` slot, like React's
   * `CardHeader`. The header reports it; the card keeps the `has-ai-label`
   * attribute and the AI treatment in sync.
   */
  private _handleHeaderAILabelChange = (e: Event) => {
    this._setHasAILabel((e as CustomEvent).detail.hasAILabel);
  };

  /**
   * Re-checks for an AI label when the card's children change, so removing a
   * header that holds the label clears the AI treatment.
   */
  private _handleDefaultSlotChange() {
    this._setHasAILabel(
      !!this.querySelector(
        `:scope > ${prefix}-card-header > ${prefix}-ai-label[slot="decorator"]`
      )
    );
  }

  private _setHasAILabel(hasAILabel: boolean) {
    this._hasAILabel = hasAILabel;

    if (hasAILabel) {
      this.setAttribute('has-ai-label', '');
    } else {
      this.removeAttribute('has-ai-label');
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

  /**
   * The accessible name of the host, for the interactive element inside the
   * card. `aria-label` and `aria-labelledby` set on `cds-card` do not reach an
   * element inside its shadow root, so the name is resolved here.
   * `aria-labelledby` ids are looked up in the host's own tree.
   */
  private _getHostAccessibleName() {
    const label = this.ariaLabel;
    if (label) {
      return label;
    }
    const root = this.getRootNode() as Document | ShadowRoot;
    const text = (this.ariaLabelledby ?? '')
      .split(/\s+/)
      .map((id) => (id ? root.getElementById?.(id)?.textContent?.trim() : ''))
      .filter(Boolean)
      .join(' ');
    return text || undefined;
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

  /**
   * Clickable-footer affordance (aria-hidden, purely decorative). A disabled
   * card always shows the error icon, whatever the `footer-icon` slot holds.
   */
  private _renderClickableFooter() {
    return html`
      <div class="${prefix}--card__clickable-footer" aria-hidden="true">
        ${this.disabled
          ? iconLoader(Error16, { 'aria-hidden': 'true' })
          : html`<slot name="footer-icon">
              ${iconLoader(ArrowRight16, { 'aria-hidden': 'true' })}
            </slot>`}
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
      </div>
    `;
  }

  render() {
    return this._renderLink();
  }

  updated(changed: PropertyValues) {
    super.updated?.(changed);

    // The anchor is rendered by CDSLink, so its name is set here.
    const anchor = this.shadowRoot?.querySelector('a[part="link"]');
    const name = this._getHostAccessibleName();
    if (anchor) {
      if (name) {
        anchor.setAttribute('aria-label', name);
      } else {
        anchor.removeAttribute('aria-label');
      }
    }
  }

  protected _renderLink() {
    const { href, clickable, disabled } = this;

    // Link card — delegate to CDSLink's implementation. A disabled link card
    // renders no anchor, so navigation is suppressed; it falls through to the
    // static branch below and is announced as a disabled group.
    if (href && !disabled) {
      return super._renderLink();
    }

    // Non-link clickable card — div with button semantics.
    if (clickable && !href) {
      return html`
        <div
          role="button"
          aria-label=${ifDefined(this._getHostAccessibleName())}
          tabindex=${disabled ? -1 : 0}
          aria-disabled=${disabled}
          @click=${this._handleClick}
          @keydown=${this._handleKeydown}>
          ${this._renderInner()}
        </div>
      `;
    }

    // Static card (or disabled link card) — plain div, no interaction
    // semantics. A disabled one is still announced as disabled, like the React
    // card. `aria-disabled` is not exposed on a role-less div, so a disabled
    // card is a named group.
    return html`<div
      role=${ifDefined(disabled ? 'group' : undefined)}
      aria-label=${ifDefined(
        disabled ? this._getHostAccessibleName() : undefined
      )}
      aria-disabled=${ifDefined(disabled ? 'true' : undefined)}>
      ${this._renderInner()}
    </div>`;
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
