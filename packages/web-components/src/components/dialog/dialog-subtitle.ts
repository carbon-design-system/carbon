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
import CDSModalLabel from '../modal/modal-label';

/**
 * Dialog subtitle.
 *
 * @element cds-dialog-subtitle
 */
class CDSDialogSubtitle extends CDSModalLabel {
  static is = `${prefix}-dialog-subtitle`;

  /**
   * Specify an optional id for the subtitle element
   */
  @property({ type: String, reflect: true })
  id = `${prefix}--dialog-subtitle--id-${Math.random().toString(16).slice(2)}`;

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default CDSDialogSubtitle;
