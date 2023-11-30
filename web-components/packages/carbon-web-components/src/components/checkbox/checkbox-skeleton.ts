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
import { prefix } from '../../globals/settings';
import styles from './checkbox.scss';

/**
 * Skeleton of number input.
 */
@customElement(`${prefix}-checkbox-skeleton`)
class CDSCheckboxSkeleton extends LitElement {
  render() {
    return html`
      <label class="${prefix}--checkbox-label" for="checkbox" part="label">
        <span class="${prefix}--checkbox-label-text ${prefix}--skeleton"
          ><slot></slot
        ></span>
      </label>
    `;
  }

  static styles = styles;
}

export default CDSCheckboxSkeleton;
