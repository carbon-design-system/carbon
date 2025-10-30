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
import { property } from 'lit/decorators.js';

/**
 * Fluid number input.
 *
 * @element cds-fluid-number-input
 */
@customElement(`${prefix}-fluid-number-input`)
class CDSFluidNumberInput extends CDSNumberInput {
  @property({ type: Boolean })
  isFluid = true;

  render() {
    return html` ${super.render()} `;
  }

  static styles = [CDSNumberInput.styles, styles];
}

export default CDSFluidNumberInput;
