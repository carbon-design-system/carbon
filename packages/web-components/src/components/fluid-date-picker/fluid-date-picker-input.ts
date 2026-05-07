/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
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
  /**
   * Specify whether the control is currently in warning state
   */
  @property({ type: Boolean, reflect: true })
  declare warn: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  @property({ attribute: 'warn-text' })
  declare warnText: string;

  /**
   * Controls the invalid state and visibility of the `validityMessage`.
   */
  @property({ type: Boolean, reflect: true })
  declare invalid: boolean;

  /**
   * Message which is displayed if the value is invalid.
   */
  @property({ attribute: 'invalid-text' })
  declare invalidText: string;

  /**
   * Specify whether this is a fluid variant
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-fluid' })
  isFluid = true;

  render() {
    return html`${super.render()}`;
  }

  static styles = [CDSDatePickerInput.styles, styles];
}

export default CDSFluidDatePickerInput;
