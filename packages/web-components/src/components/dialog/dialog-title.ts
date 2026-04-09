/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './dialog.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSModalHeading from '../modal/modal-heading';

/**
 * Dialog title.
 *
 * @element cds-dialog-title
 */
@customElement(`${prefix}-dialog-title`)
class CDSDialogTitle extends CDSModalHeading {
  /**
   * Specify an optional id for the title element
   */
  @property({ type: String, reflect: true })
  id = `${prefix}--dialog-title--id-${Math.random().toString(16).slice(2)}`;

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default CDSDialogTitle;
