/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import { property } from 'lit/decorators.js';
import styles from './ai-skeleton.scss';
import '../skeleton-icon/skeleton-icon';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * AI skeleton icon.
 *
 * @element cds-ai-skeleton-icon
 */
@customElement(`${prefix}-ai-skeleton-icon`)
class CDSAISkeletonIcon extends LitElement {
  /**
   * Custom styles to apply to skeleton icon
   */
  @property({ attribute: 'custom-styles' })
  customStyles = '';

  render() {
    return html`<cds-skeleton-icon
      class="${prefix}--skeleton__icon--ai"
      style="${this.customStyles}"></cds-skeleton-icon>`;
  }

  static styles = styles;
}

export default CDSAISkeletonIcon;
