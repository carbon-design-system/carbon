/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import styles from './dialog.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSModalBody from '../modal/modal-body';

/**
 * Dialog body.
 *
 * @element cds-dialog-body
 */
@customElement(`${prefix}-dialog-body`)
class CDSDialogBody extends CDSModalBody {
  static styles = styles;
}

export default CDSDialogBody;
