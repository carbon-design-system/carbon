/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSToggleTip from '../toggle-tip/toggletip';
import styles from './slug.scss';
import { SLUG_SIZE, SLUG_KIND, SLUG_DOT_TYPE } from './defs';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Basic slug.
 *
 * @element cds-slug
 */
@customElement(`${prefix}-slug`)
export default class CDSSlug extends CDSToggleTip {
  /**
   * Slug size should be mini, 2xs, xs, sm, md, lg, xl.
   */
  @property({ reflect: true })
  size = SLUG_SIZE.MEDIUM;

  /**
   * Specify the type of Slug, from the following list of types: (default, hollow, inline)
   */
  @property({ reflect: true })
  kind = SLUG_KIND.DEFAULT;

  /**
   * Specify the type of dot that should be rendered in front of the inline variant: (default, hollow)
   */
  @property({ reflect: true, attribute: 'dot-type' })
  dotType = SLUG_DOT_TYPE.DEFAULT;

  /**
   * Specify the correct translation of the AI text
   */
  @property({ attribute: 'ai-text' })
  aiText = 'AI';

  /**
   * Specify additional text to be rendered next to the AI label in the inline variant
   */
  @property({ attribute: 'ai-text-label' })
  aiTextLabel = '';

  protected _renderToggleTipLabel = () => {
    return html``;
  };

  protected _renderTooltipButton = () => {
    const { size, kind, aiText, aiTextLabel } = this;
    const classes = classMap({
      [`${prefix}--toggletip-button`]: true,
      [`${prefix}--slug__button`]: true,
      [`${prefix}--slug__button--${size}`]: size,
      [`${prefix}--slug__button--${kind}`]: kind,
      [`${prefix}--slug__button--inline-with-content`]:
        kind === SLUG_KIND.INLINE && aiTextLabel,
    });
    return html`
      <button
        aria-controls="${this.id}"
        @click=${this._handleClick}
        class=${classes}
        aria-label="Show information">
        <span class="${prefix}--slug__text">${aiText}</span>
        ${aiTextLabel && kind === SLUG_KIND.INLINE
          ? html`
              <span class="${prefix}--slug__additional-text">
                ${aiTextLabel}
              </span>
            `
          : ``}
      </button>
    `;
  };

  updated(changedProperties) {
    super.updated(changedProperties);
    if (
      this.kind !== SLUG_KIND.HOLLOW &&
      this.dotType !== SLUG_DOT_TYPE.HOLLOW
    ) {
      this.setAttribute('enabled', '');
    } else {
      this.removeAttribute('enabled');
    }
  }

  static styles = styles;
}
