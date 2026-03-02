/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSDatePickerInput from '../date-picker/date-picker-input';
import { html } from 'lit';
import styles from './fluid-date-picker.scss?lit';
// import { classMap } from 'lit/directives/class-map.js';

/**
 * Fluid date picker input.
 *
 * @element cds-fluid-date-picker-input
 */
@customElement(`${prefix}-fluid-date-picker-input`)
class CDSFluidDatePickerInput extends CDSDatePickerInput {
  connectedCallback() {
    this.setAttribute('isFluid', 'true');
    super.connectedCallback();
  }

  updated() {
    super.updated();
  }

  render() {
    //  const wrapperClasses = classMap({
    //    [`${prefix}--date-picker--fluid`]: true,
    //  });

    return html`${super.render()}`;
  }

  static styles = [CDSDatePickerInput.styles, styles];
}

export default CDSFluidDatePickerInput;
