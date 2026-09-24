/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import CDSButton from '../button/button';
import buttonStyles from '../button/button.scss?lit';
import styles from './modal.scss?lit';

/**
 * Modal footer button.
 *
 * @element cds-modal-footer-button
 */
class CDSModalFooterButton extends CDSButton {
  static is = `${prefix}-modal-footer-button`;

  static styles = [buttonStyles, styles];
}

export default CDSModalFooterButton;
