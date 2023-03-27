/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './tabs.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

const { prefix } = settings;

/**
 * Skeleton of tabs.
 */
@customElement(`${prefix}-tabs-skeleton`)
class BXTabsSkeleton extends LitElement {
  render() {
    return html`
      <div class="${prefix}--tabs-trigger">
        <span class="${prefix}--tabs-trigger-text"></span>
      </div>
      <ul class="${prefix}--tabs__nav">
        <slot></slot>
      </ul>
    `;
  }

  static styles = styles;
}

export default BXTabsSkeleton;
