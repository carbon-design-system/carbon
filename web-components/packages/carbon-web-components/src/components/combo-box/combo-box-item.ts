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
import BXDropdownItem from '../dropdown/dropdown-item';
import styles from './combo-box.scss';

/**
 * Combo box item.
 *
 * @element cds-combo-box-item
 */
@customElement(`${prefix}-combo-box-item`)
class BXComboBoxItem extends BXDropdownItem {
  static styles = styles;
}

export default BXComboBoxItem;
