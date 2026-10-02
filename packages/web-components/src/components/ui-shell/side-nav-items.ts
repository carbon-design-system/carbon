/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './side-nav.scss?lit';

/**
 * Side nav items.
 *
 * @element cds-side-nav-items
 */
class CDSSideNavItems extends LitElement {
  static is = `${prefix}-side-nav-items`;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'list');
    }
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = styles;
}

export default CDSSideNavItems;
