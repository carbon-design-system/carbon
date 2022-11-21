/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './structured-list.scss';

const { prefix } = settings;

/**
 * Skeleton of structured list header cell.
 */
@customElement(`${prefix}-structured-list-header-cell-skeleton`)
class BXStructuredListHeaderCellSkeleton extends LitElement {
  render() {
    return html` <span></span> `;
  }

  static styles = styles;
}

export default BXStructuredListHeaderCellSkeleton;
