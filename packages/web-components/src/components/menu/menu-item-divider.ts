/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './menu-item.scss?lit';
/**
 * Menu Item.
 *
 * @element cds-menu-item-divider
 */
class CDSmenuItemDivider extends LitElement {
  static is = `${prefix}-menu-item-divider`;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'separator');
    }
    super.connectedCallback();
  }
  static styles = styles;
}
export default CDSmenuItemDivider;
