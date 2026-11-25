/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
import { prefix } from '../../globals/settings';
import styles from './page-header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Page header Content Text.
 * @element cds-page-header-content-text
 */
@customElement(`${prefix}-page-header-content-text`)
class CDSPageHeaderContentText extends LitElement {
  /**
   * Subtitle text of the page-header-content
   */
  @property()
  subtitle = '';

  /**
   * Heading level for the subtitle (h2-h6).
   */
  @property({ type: String, attribute: 'subtitle-level' })
  subtitleLevel: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';

  /**
   * Whether the `subtitle-content` slot has content assigned to it.
   */
  @state()
  private _hasSubtitleSlotContent = false;

  /**
   * Handles `slotchange` for the subtitle-content slot.
   */
  protected _handleSubtitleSlotChange({ target }: Event) {
    this._hasSubtitleSlotContent =
      (target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    const {
      subtitle,
      subtitleLevel,
      _hasSubtitleSlotContent: hasSubtitleSlotContent,
    } = this;
    const subtitleTag = unsafeStatic(subtitleLevel);

    const showSubtitle = subtitle || hasSubtitleSlotContent;

    return html`
      ${showSubtitle
        ? staticHtml`<${subtitleTag} class="${prefix}--page-header__content__subtitle">
            <slot
              name="subtitle-content"
              @slotchange=${this._handleSubtitleSlotChange}
            ></slot>
            ${!hasSubtitleSlotContent && subtitle ? subtitle : null}
          </${subtitleTag}>`
        : html`<slot
            name="subtitle-content"
            @slotchange=${this._handleSubtitleSlotChange}
            style="display:none"></slot>`}
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default CDSPageHeaderContentText;
