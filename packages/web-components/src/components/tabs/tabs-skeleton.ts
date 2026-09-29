/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './tabs.scss?lit';
import { property } from 'lit/decorators.js';

/**
 * Skeleton of tabs.
 *
 * @element cds-tabs-skeleton
 */
export default class CDSTabsSkeleton extends LitElement {
  static is = `${prefix}-tabs-skeleton`;

  /**
   * Provide the type of Tab
   */
  @property({ type: Boolean, reflect: true })
  contained = false;
  render() {
    return html`
      <ul class="${prefix}--tabs__nav">
        <slot></slot>
      </ul>
    `;
  }

  static styles = styles;
}
