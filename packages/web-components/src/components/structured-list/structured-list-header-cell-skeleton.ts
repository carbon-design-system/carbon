/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './structured-list.scss?lit';

/**
 * Skeleton of structured list header cell.
 */
class CDSStructuredListHeaderCellSkeleton extends LitElement {
  static is = `${prefix}-structured-list-header-cell-skeleton`;

  render() {
    return html` <span></span> `;
  }

  static styles = styles;
}

export default CDSStructuredListHeaderCellSkeleton;
