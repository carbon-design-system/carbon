/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './tabs.scss';

const { prefix } = settings;

/**
 * Skeleton of tab.
 */
@customElement(`${prefix}-tab-skeleton`)
class BXTabSkeleton extends LitElement {
  render() {
    return html` <div class="${prefix}--tabs__nav-link"></div> `;
  }

  static styles = styles;
}

export default BXTabSkeleton;
