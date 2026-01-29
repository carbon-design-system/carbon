/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { LitElement, html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './fluid-multi-select.scss?lit';

/**
 * Fluid multi select.
 *
 * @element cds-fluid-multi-select-skeleton
 */
@customElement(`${prefix}-fluid-multi-select-skeleton`)
class CDSFluidMultiSelectSkeleton extends LitElement {
  render() {
    return html`
      <div class="${prefix}--list-box__wrapper--fluid">
        <div class="${prefix}--skeleton ${prefix}--list-box">
          <span class="${prefix}--list-box__label" />
          <div class="${prefix}--list-box__field" />
        </div>
      </div>
    `;
  }
  static styles = styles;
}

export default CDSFluidMultiSelectSkeleton;
