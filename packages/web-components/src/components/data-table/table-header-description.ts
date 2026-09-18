/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './data-table.scss?lit';

/**
 * Data table header description
 *
 * @element cds-table-header-description
 */
class CDSTableHeaderDescription extends LitElement {
  static is = `${prefix}-table-header-description`;

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default CDSTableHeaderDescription;
