/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import BXTableCell from './table-cell';

const { prefix } = settings;

/**
 * Data table header cell with skeleton content.
 * @element bx-table-header-cell-skeleton
 */
@customElement(`${prefix}-table-header-cell-skeleton`)
class BXTableHeaderCellSkeleton extends BXTableCell {}

export default BXTableHeaderCellSkeleton;
