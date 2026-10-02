/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import CDSButton from '../button/button';
import buttonStyles from '../button/button.scss?lit';
import styles from './dialog.scss?lit';

/**
 * Dialog footer button.
 *
 * @element cds-dialog-footer-button
 */
class CDSDialogFooterButton extends CDSButton {
  static is = `${prefix}-dialog-footer-button`;

  static styles = [buttonStyles, styles];
}

export default CDSDialogFooterButton;
