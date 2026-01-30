/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './fluid-dropdown.scss?lit';
import CDSDropdownSkeleton from '../dropdown/dropdown-skeleton';

/**
 * Fluid dropdown skeleton.
 *
 * @element cds-fluid-dropdown-skeleton
 */
@customElement(`${prefix}-fluid-dropdown-skeleton`)
class CDSFluidDropdownSkeleton extends CDSDropdownSkeleton {
  render() {
    return html`
      <div class="${prefix}--list-box__wrapper--fluid">
        <div class="${prefix}--skeleton ${prefix}--list-box">
          <span class="${prefix}--list-box__label"></span>
          <div class="${prefix}--list-box__field" />
        </div>
      </div>
    `;
  }
  static styles = styles;
}

export default CDSFluidDropdownSkeleton;
