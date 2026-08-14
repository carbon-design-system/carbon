/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html, LitElement } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './fluid-combo-box.scss?lit';

/**
 * Fluid combo box skeleton.
 *
 * @element cds-fluid-combo-box-skeleton
 */
@customElement(`${prefix}-fluid-combo-box-skeleton`)
class CDSFluidComboBoxSkeleton extends LitElement {
  render() {
    return html`
      <div class="${prefix}--list-box__wrapper--fluid">
        <div class="${prefix}--skeleton ${prefix}--list-box">
          <span class="${prefix}--list-box__label"></span>
          <div class="${prefix}--list-box__field"></div>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSFluidComboBoxSkeleton;
