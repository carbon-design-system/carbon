/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './dialog.scss?lit';

/**
 * Dialog header.
 *
 * @element cds-dialog-header
 */
class CDSDialogHeader extends LitElement {
  static is = `${prefix}-dialog-header`;

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default CDSDialogHeader;
