/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import {
  cardContext,
  cardDefaultContext,
  type CardContextValue,
} from './card-context';
import styles from './card.scss?lit';

/**
 * Valid aspect-ratio values for the media slot.
 */
type AspectRatio =
  | '16x9'
  | '9x16'
  | '2x1'
  | '1x2'
  | '4x3'
  | '3x4'
  | '1x1'
  | string;

/**
 * Card media — aspect-ratio media slot.
 *
 * In vertical (default) mode it renders a div with the aspect-ratio BEM
 * modifier class. In horizontal mode (detected via context) it renders a
 * full-height div sized by the `media-width` CSS custom property.
 *
 * When the parent card switches to horizontal layout this element
 * reassigns itself to the `media` named slot so the card's flex layout
 * can place it correctly.
 *
 * @element cds-card-media
 * @slot - Default slot for an image, video, or other media content.
 */
@customElement(`${prefix}-card-media`)
class CDSCardMedia extends LitElement {
  @consume({ context: cardContext, subscribe: true })
  @state()
  private _cardContext: CardContextValue = cardDefaultContext;

  /**
   * Aspect ratio of the media container in vertical layout.
   * E.g. `'16x9'`, `'4x3'`, `'1x1'`. Ignored in horizontal layout.
   */
  @property({ type: String, reflect: true })
  ratio: AspectRatio = '';

  /**
   * Width of the media column in horizontal layout.
   * Accepts any valid CSS width value (e.g. `'200px'`, `'40%'`).
   * Has no effect in vertical (default) layout.
   * @default '33.33%'
   */
  @property({ attribute: 'media-width', reflect: true })
  mediaWidth = '33.33%';

  updated() {
    // Self-assign to the named `media` slot when the card is horizontal so
    // the card's two-slot flex template can position media vs content correctly.
    if (this._cardContext.horizontal) {
      this.setAttribute('slot', 'media');
    } else {
      this.removeAttribute('slot');
    }
  }

  render() {
    const blockClass = `${prefix}--card`;
    const { ratio, mediaWidth, _cardContext } = this;

    if (_cardContext.horizontal) {
      return html`
        <div
          class="${blockClass}__media ${blockClass}__media--horizontal"
          style=${styleMap({
            [`--${prefix}--card--media-width`]: mediaWidth,
          })}>
          <slot></slot>
        </div>
      `;
    }

    const classes = classMap({
      [`${blockClass}__media`]: true,
      [`${prefix}--aspect-ratio`]: Boolean(ratio),
      [`${prefix}--aspect-ratio--${ratio}`]: Boolean(ratio),
    });

    return html`<div class=${classes}><slot></slot></div>`;
  }

  static styles = styles;
}

export default CDSCardMedia;
