/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import BXTableCell from './table-cell';

/**
 * Data table cell with skeleton content.
 *
 * @element cds-table-cell-skeleton
 */
@customElement(`${prefix}-table-cell-skeleton`)
class BXTableCellSkeleton extends BXTableCell {
  render() {
    return html` <span></span> `;
  }
}

export default BXTableCellSkeleton;
