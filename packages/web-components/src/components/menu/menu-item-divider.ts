/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './menu-item.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
/**
 * Menu Item.
 *
 * @element cds-menu-item-divider
 */
@customElement(`${prefix}-menu-item-divider`)
class CDSmenuItemDivider extends LitElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'separator');
    }
    super.connectedCallback();
  }
  static styles = styles;
}
export default CDSmenuItemDivider;
