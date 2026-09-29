/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import CDSTableRow from './table-row';

/**
 * Data table header row.
 *
 * @element cds-table-header-row
 * @fires cds-table-change-selection-all
 *   The name of the custom event fired before this row is selected/unselected upon a user gesture.
 *   Cancellation of this event stops the user-initiated change in selection.
 */
class CDSTableHeaderRow extends CDSTableRow {
  static is = `${prefix}-table-header-row`;

  /**
   * The name of the custom event fired before this row is selected/unselected upon a user gesture.
   * Cancellation of this event stops the user-initiated change in selection.
   */
  static get eventBeforeChangeSelection() {
    return `${prefix}-table-change-selection-all`;
  }
}

export default CDSTableHeaderRow;
