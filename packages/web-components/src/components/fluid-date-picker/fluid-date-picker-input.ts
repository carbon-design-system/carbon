/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSDatePickerInput from '../date-picker/date-picker-input';
import styles from './fluid-date-picker.scss?lit';

/**
 * Fluid date picker input.
 *
 * @element cds-fluid-date-picker-input
 */
@customElement(`${prefix}-fluid-date-picker-input`)
class CDSFluidDatePickerInput extends CDSDatePickerInput {
  render() {
    return html` ${super.render()} `;
  }

  static get selectorParent() {
    return `${prefix}-fluid-date-picker`;
  }

  static styles = [CDSDatePickerInput.styles, styles];
}

export default CDSFluidDatePickerInput;
