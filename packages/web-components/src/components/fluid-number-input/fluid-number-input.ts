/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSNumberInput from '../number-input/number-input';
import styles from './fluid-number-input.scss?lit';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Fluid number input.
 *
 * @element cds-fluid-number-input
 */
@customElement(`${prefix}-fluid-number-input`)
class CDSFluidNumberInput extends CDSNumberInput {
  connectedCallback() {
    this.setAttribute('isFluid', 'true');
    super.connectedCallback();
  }

  updated() {
    super.updated();
  }

  render() {
    const wrapperClasses = classMap({
      [`${prefix}--number-input--fluid`]: true,
      [`${prefix}--number-input--fluid--invalid`]: this.invalid,
      [`${prefix}--number-input--fluid--warning`]: this.warn && !this.invalid,
      [`${prefix}--number-input--fluid--disabled`]: this.disabled,
      [`${prefix}--number-input--fluid--readonly`]: this.readonly,
    });

    return html`<div class="${wrapperClasses}">${super.render()}</div>`;
  }

  static styles = [CDSNumberInput.styles, styles];
}

export default CDSFluidNumberInput;
