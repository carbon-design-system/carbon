/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import BXTableCell from './table-cell';

const { prefix } = settings;

/**
 * Data table cell with skeleton content.
 * @element bx-table-cell-skeleton
 */
@customElement(`${prefix}-table-cell-skeleton`)
class BXTableCellSkeleton extends BXTableCell {
  render() {
    return html` <span></span> `;
  }
}

export default BXTableCellSkeleton;
