/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import formStyles from '../form/form.scss?lit';
import checkboxStyles from '../checkbox/checkbox.scss?lit';
import radioButtonStyles from '../radio-button/radio-button.scss?lit';
import styles from './data-table.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Data table cell content.
 *
 * @element cds-table-cell-content
 */
@customElement(`${prefix}-table-cell-content`)
class CDSTableCellContent extends LitElement {
  render() {
    return html` <slot></slot> `;
  }

  static styles = [formStyles, checkboxStyles, radioButtonStyles, styles];
}

export default CDSTableCellContent;
