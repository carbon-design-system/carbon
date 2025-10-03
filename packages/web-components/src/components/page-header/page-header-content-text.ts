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

  render() {
    const { subtitle } = this;

    return html`
      ${subtitle &&
      html`<h3 class="${prefix}--page-header__content__subtitle">
        ${subtitle}
      </h3>`}
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default CDSPageHeaderContentText;
