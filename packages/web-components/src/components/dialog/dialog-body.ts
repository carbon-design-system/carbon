/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import styles from './dialog.scss?lit';
import CDSModalBody from '../modal/modal-body';

/**
 * Dialog body.
 *
 * @element cds-dialog-body
 */
class CDSDialogBody extends CDSModalBody {
  static is = `${prefix}-dialog-body`;

  protected _getAriaLabelledBy() {
    const dialog = this.closest(`${prefix}-dialog`);
    if (!dialog) return null;

    const subTitleEl = dialog.querySelector(`${prefix}-dialog-subtitle`);
    if (subTitleEl?.id) return subTitleEl.id;

    const titleEl = dialog.querySelector(`${prefix}-dialog-title`);
    if (titleEl?.id) return titleEl.id;

    return null;
  }

  protected _parentHasScrollingContent() {
    const dialog = this.closest(`${prefix}-dialog`);
    return dialog?.hasAttribute('has-scrolling-content') ?? false;
  }
  static styles = styles;
}

export default CDSDialogBody;
