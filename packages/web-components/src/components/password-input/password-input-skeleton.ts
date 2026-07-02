/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './password-input.scss?lit';

/**
 * @element cds-password-input-skeleton
 *
 * Skeleton of password input.
 */
@customElement(`${prefix}-password-input-skeleton`)
class CDSPasswordInputSkeleton extends LitElement {
  /**
   * Specify whether the label should be hidden, or not
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  render() {
    const { hideLabel } = this;
    return html`
      ${!hideLabel &&
      html` <span class="${prefix}--label ${prefix}--skeleton"></span> `}
      <div class="${prefix}--text-input ${prefix}--skeleton"></div>
    `;
  }

  static styles = styles;
}

export default CDSPasswordInputSkeleton;
