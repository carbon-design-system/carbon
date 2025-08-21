/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * A divider in switcher.
 *
 * @element cds-switcher-divider
 */
@customElement(`${prefix}-switcher-divider`)
class CDSSwitcherDivider extends LitElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'separator');
    }
    super.connectedCallback();
  }

  static styles = styles;
}

export default CDSSwitcherDivider;
