/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './column-hang.scss?lit';

/**
 * The column component.
 *
 * @element cds-column-hang
 */
class CDSColumnHang extends LitElement {
  static is = `${prefix}-column-hang`;

  render() {
    // Grid styling added to contained components, allowing CSS Grid
    // to affect its own slot content.
    return html`<div part="column-hang">
      <slot></slot>
    </div>`;
  }

  static styles = styles;
}

export default CDSColumnHang;
