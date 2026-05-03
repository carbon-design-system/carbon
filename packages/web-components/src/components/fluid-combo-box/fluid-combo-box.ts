/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSComboBox from '../combo-box/combo-box';
import styles from './fluid-combo-box.scss?lit';

/**
 * Fluid combo box.
 *
 * @element cds-fluid-combo-box
 */
@customElement(`${prefix}-fluid-combo-box`)
class CDSFluidComboBox extends CDSComboBox {
  /**
   * Specify if the combo box should render its menu items in condensed mode.
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-condensed' })
  isCondensed = false;

  connectedCallback() {
    this.setAttribute('isFluid', 'true');
    super.connectedCallback();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (
      changedProperties.has('invalid') ||
      changedProperties.has('disabled') ||
      changedProperties.has('readOnly') ||
      changedProperties.has('warn') ||
      changedProperties.has('isCondensed')
    ) {
      this.requestUpdate();
    }
  }

  static styles = [CDSComboBox.styles, styles];
}

export default CDSFluidComboBox;
