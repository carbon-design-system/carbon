/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './number-input.scss';

/**
 * Skeleton of number input.
 */
@customElement(`${prefix}-number-input-skeleton`)
class BXNumberInputSkeleton extends LitElement {
  /**
   * `true` if the label should be hidden. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  render() {
    const { hideLabel } = this;
    return html`
      ${!hideLabel &&
      html` <span class="${prefix}--label ${prefix}--skeleton"></span> `}
      <div class="${prefix}--number ${prefix}--skeleton"></div>
    `;
  }

  static styles = styles;
}

export default BXNumberInputSkeleton;
