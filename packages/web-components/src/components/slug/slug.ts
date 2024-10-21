/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSToggleTip from '../toggle-tip/toggletip';
import styles from './slug.scss?lit';
import Undo16 from '@carbon/icons/lib/undo/16';
import { SLUG_SIZE, SLUG_KIND } from './defs';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Basic slug.
 *
 * @deprecated This component has been deprecated, please use the <cds-ai-label> component instead.
 * @element cds-slug
 */
@customElement(`${prefix}-slug`)
export default class CDSSlug extends CDSToggleTip {
  @property({ reflect: true })
  slot = 'slug';
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

  /**
   * Specify the type of Slug, from the following list of types: (default, inline)
   */
  @property({ reflect: true })
  kind = SLUG_KIND.DEFAULT;

  /**
   * Specify whether the revert button should be visible
   */
  @property({ type: Boolean, attribute: 'revert-active' })
  revertActive = false;

  /**
   * Specify whether the revert button should be visible
   */
  @property({ attribute: 'revert-label' })
  revertLabel = 'Revert to AI input';

  /**
   * Slug size should be mini, 2xs, xs, sm, md, lg, xl.
   */
  @property({ reflect: true })
  size = SLUG_SIZE.EXTRA_SMALL;

  /**
   * Specify the text that will be provided to the aria-label of the `Slug` button
   */
  @property({ attribute: 'slug-label' })
  slugLabel = 'Show information';

  @property()
  previousValue;

  protected _handleClick = () => {
    if (this.revertActive) {
      this.revertActive = false;
      this.removeAttribute('revert-active');
    } else {
      this.open = !this.open;
    }
  };

  protected _renderToggleTipLabel = () => {
    return html``;
  };

  protected _renderTooltipButton = () => {
    const { size, kind, aiText, aiTextLabel, slugLabel } = this;
    const ariaLabel = `${aiText} - ${slugLabel}`;
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
        @click="${this._handleClick}"
        class=${classes}
        aria-label="${ariaLabel}">
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

  protected _renderInnerContent = () => {
    const { autoalign, revertActive, revertLabel } = this;
    return html`
      ${revertActive
        ? html`
            <cds-icon-button
              ?autoalign=${autoalign}
              kind="ghost"
              size="sm"
              @click="${this._handleClick}">
              <span slot="tooltip-content"> ${revertLabel} </span>
              ${Undo16({ slot: 'icon' })}
            </cds-icon-button>
          `
        : html`
            ${this._renderTooltipButton()} ${this._renderTooltipContent()}
          `}
    `;
  };

  attributeChangedCallback(name, old, newValue) {
    super.attributeChangedCallback(name, old, newValue);

    //@ts-ignore typescript does not think requestUpdate() exists on parentElement
    name === 'revert-active' ? this.parentElement?.requestUpdate() : ``;
  }

  static styles = styles;
}
