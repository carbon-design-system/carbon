/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
import { prefix } from '../../globals/settings';
import styles from './page-header.scss?lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

/**
 * Page header Content Text.
 * @element c4p-page-header-content-text
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

  render() {
    const { subtitle, subtitleLevel } = this;
    const subtitleTag = unsafeStatic(subtitleLevel);

    return html`
      ${subtitle &&
      staticHtml`<${subtitleTag} class="${prefix}--page-header__content__subtitle">
        ${subtitle}
      </${subtitleTag}>`}
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default CDSPageHeaderContentText;
