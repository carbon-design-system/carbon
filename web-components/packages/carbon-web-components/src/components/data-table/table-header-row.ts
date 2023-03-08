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
import BXTableRow from './table-row';

/**
 * Data table header row.
 *
 * @element cds-table-header-row
 */
@customElement(`${prefix}-table-header-row`)
class BXTableHeaderRow extends BXTableRow {
  /**
   * The name of the custom event fired before this row is selected/unselected upon a user gesture.
   * Cancellation of this event stops the user-initiated change in selection.
   */
  static get eventBeforeChangeSelection() {
    return `${prefix}-table-change-selection-all`;
  }
}

export default BXTableHeaderRow;
