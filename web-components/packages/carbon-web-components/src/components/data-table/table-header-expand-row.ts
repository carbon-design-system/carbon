/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { customElement } from 'lit-element';
import BXTableExpandRow from './table-expand-row';

const { prefix } = settings;

/**
 * Data table header row.
 *
 * @element bx-table-header-expand-row
 */
@customElement(`${prefix}-table-header-expand-row`)
class BXTableHeaderExpandRow extends BXTableExpandRow {
  /**
   * The name of the custom event fired before this row is selected/unselected upon a user gesture.
   * Cancellation of this event stops the user-initiated change in selection.
   */
  static get eventBeforeChangeSelection() {
    return `${prefix}-table-change-selection-all`;
  }

  /**
   * The name of the custom event fired before the expanded state this row is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling the expanded state.
   */
  static get eventBeforeExpandoToggle() {
    return `${prefix}-table-row-expando-beingtoggled-all`;
  }

  /**
   * The name of the custom event fired after the expanded state this row is toggled upon a user gesture.
   */
  static get eventExpandoToggle() {
    return `${prefix}-table-row-expando-toggled-all`;
  }
}

export default BXTableHeaderExpandRow;
