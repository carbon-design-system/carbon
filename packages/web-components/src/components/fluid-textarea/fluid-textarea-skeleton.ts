/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSTextareaSkeleton from '../textarea/textarea-skeleton';
import styles from './fluid-textarea.scss?lit';

/**
 * Fluid text area input.
 *
 * @element cds-fluid-textarea
 */
@customElement(`${prefix}-fluid-textarea-skeleton`)
class CDSFluidTextareaSkeleton extends CDSTextareaSkeleton {
  render() {
    return html`
      <div class="${prefix}--text-area--fluid__skeleton ${prefix}--form-item">
        ${super.render()}
      </div>
    `;
  }

  static styles = [CDSTextareaSkeleton.styles, styles];
}

export default CDSFluidTextareaSkeleton;
