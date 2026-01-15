/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './textarea.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * @element cds-textarea-skeleton
 *
 * Skeleton of text area.
 */
@customElement(`${prefix}-textarea-skeleton`)
class CDSTextareaSkeleton extends LitElement {
  /**
   * Specify whether the label should be hidden, or not
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  render() {
    const { hideLabel } = this;
    return html`
      ${hideLabel
        ? ''
        : html`<span class="${prefix}--label ${prefix}--skeleton"></span>`}
      <div class="${prefix}--skeleton ${prefix}--text-area"></div>
    `;
  }

  static styles = styles;
}

export default CDSTextareaSkeleton;
