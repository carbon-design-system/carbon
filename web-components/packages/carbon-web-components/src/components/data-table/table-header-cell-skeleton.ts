/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import BXTableCell from './table-cell';

/**
 * Data table header cell with skeleton content.
 *
 * @element cds-table-header-cell-skeleton
 */
@customElement(`${prefix}-table-header-cell-skeleton`)
class BXTableHeaderCellSkeleton extends BXTableCell {}

export default BXTableHeaderCellSkeleton;
