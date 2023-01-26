/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './radio-button.scss';

const { prefix } = settings;

/**
 * Skeleton of radio button.
 */
@customElement(`${prefix}-radio-button-skeleton`)
class BXRadioButtonSkeleton extends LitElement {
  render() {
    return html`
      <div class="${prefix}--radio-button ${prefix}--skeleton"></div>
      <span class="${prefix}--radio-button__label ${prefix}--skeleton"></span>
    `;
  }

  static styles = styles;
}

export default BXRadioButtonSkeleton;
