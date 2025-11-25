/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './fluid-password-input.scss?lit';
import CDSPasswordInput from '../password-input/password-input';

/**
 * Fluid text select.
 *
 * @element cds-fluid-select
 */
@customElement(`${prefix}-fluid-password-input`)
class CDSFluidPasswordInput extends CDSPasswordInput {
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
    return html`${super.render()}`;
  }

  static styles = [CDSPasswordInput.styles, styles];
}

export default CDSFluidPasswordInput;
