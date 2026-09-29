/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './header.scss?lit';

/**
 * A divider in switcher.
 *
 * @element cds-switcher-divider
 */
class CDSSwitcherDivider extends LitElement {
  static is = `${prefix}-switcher-divider`;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'separator');
    }
    super.connectedCallback();
  }

  static styles = styles;
}

export default CDSSwitcherDivider;
