/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSButtonSet from '../button/button-set';

/**
 * Button set.
 *
 * @element cds-side-panel-button-set
 */
@customElement(`${prefix}-side-panel-button-set`)
class CDSSidePanelButtonSet extends CDSButtonSet {
  _handleSlotChange() {
    // do not re-order button set
    return;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default CDSSidePanelButtonSet;
