/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './dropdown.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton version of dropdown.
 */
@customElement(`${prefix}-dropdown-skeleton`)
class CDSDropdownSkeleton extends LitElement {
  render() {
    return html`
      <div
        class="${prefix}--skeleton ${prefix}--dropdown-v2 ${prefix}--list-box ${prefix}--form-item">
        <div class="${prefix}--list-box__field">
          <span class="${prefix}--list-box__label"></span>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSDropdownSkeleton;
