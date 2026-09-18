/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './radio-button.scss?lit';

/**
 * Skeleton of radio button.
 */
class CDSRadioButtonSkeleton extends LitElement {
  static is = `${prefix}-radio-button-skeleton`;

  render() {
    return html`
      <div class="${prefix}--radio-button ${prefix}--skeleton"></div>
      <span class="${prefix}--radio-button__label ${prefix}--skeleton"></span>
    `;
  }

  static styles = styles;
}

export default CDSRadioButtonSkeleton;
