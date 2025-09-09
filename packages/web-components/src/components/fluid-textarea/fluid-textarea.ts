/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSTextarea from '../textarea/textarea';
import styles from './fluid-textarea.scss?lit';

/**
 * Fluid text area input.
 *
 * @element cds-fluid-textarea
 */
@customElement(`${prefix}-fluid-textarea`)
class CDSFluidTextArea extends CDSTextarea {
  connectedCallback() {
    this.setAttribute('isFluid', 'true');
    super.connectedCallback();
  }
  render() {
    return html`
      <div class="${prefix}--text-area--fluid ${prefix}--form-item">
        ${super.render()}
      </div>
    `;
  }

  static styles = [CDSTextarea.styles, styles];
}

export default CDSFluidTextArea;
