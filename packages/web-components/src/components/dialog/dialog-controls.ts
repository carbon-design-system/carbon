/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './dialog.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Dialog header controls.
 *
 * @element cds-dialog-controls
 */
@customElement(`${prefix}-dialog-controls`)
class CDSDialogControls extends LitElement {
  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default CDSDialogControls;
