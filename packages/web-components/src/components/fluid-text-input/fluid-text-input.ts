/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSTextInput from '../text-input/text-input';
import styles from './fluid-text-input.scss?lit';

/**
 * Fluid text input.
 *
 * @element cds-fluid-text-input
 */
@customElement(`${prefix}-fluid-text-input`)
class CDSFluidTextInput extends CDSTextInput {
  connectedCallback() {
    this.setAttribute('isFluid', 'true');
    super.connectedCallback();
  }
  updated() {
    const formItem = this.shadowRoot?.querySelector(`.${prefix}--form-item`);
    if (formItem) {
      formItem.classList.add(`${prefix}--text-input--fluid`);
    }
  }
  render() {
    return html` ${super.render()} `;
  }

  static styles = [CDSTextInput.styles, styles];
}

export default CDSFluidTextInput;
