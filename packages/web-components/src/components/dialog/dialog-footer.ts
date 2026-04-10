/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import styles from './dialog.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSModalFooter from '../modal/modal-footer';

/**
 * Dialog footer.
 *
 * @element cds-dialog-footer
 */
@customElement(`${prefix}-dialog-footer`)
class CDSDialogFooter extends CDSModalFooter {
  /**
   * A selector that selects the child buttons.
   */
  static get selectorButtons() {
    return `${prefix}-button,${prefix}-dialog-footer-button`;
  }

  static styles = styles;
}

export default CDSDialogFooter;
