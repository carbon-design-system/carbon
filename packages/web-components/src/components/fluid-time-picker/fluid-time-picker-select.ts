/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSFluidSelect from '../fluid-select/fluid-select';
import styles from './fluid-time-picker.scss?lit';

/**
 * Fluid time picker select.
 *
 * @element cds-fluid-time-picker-select
 */
@customElement(`${prefix}-fluid-time-picker-select`)
class CDSFluidTimePickerSelect extends CDSFluidSelect {
  /**
   * Optionally provide the default value of the select.
   */
  @property({ attribute: 'default-value' })
  defaultValue = '';

  updated(changedProperties) {
    super.updated(changedProperties);
    if (
      changedProperties.has('defaultValue') &&
      this.defaultValue &&
      !this.value
    ) {
      this.value = this.defaultValue;
    }
  }

  static styles = [...CDSFluidSelect.styles, styles];
}

export default CDSFluidTimePickerSelect;
