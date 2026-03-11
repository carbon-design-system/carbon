/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html, LitElement } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './fluid-date-picker.scss?lit';

/**
 * Fluid date picker
 *
 * @element cds-fluid-date-picker-skeleton
 */
@customElement(`${prefix}-fluid-date-picker-skeleton`)
class CDSFluidDatePickerSkeleton extends LitElement {
  render() {
    return html` <div class="${prefix}--date-picker--fluid__skeleton">
      <div class="${prefix}--date-picker--fluid__skeleton--container">
        <span class="${prefix}--label ${prefix}--skeleton"></span>
        <div class="${prefix}--text-input ${prefix}--skeleton"></div>
      </div>
    </div>`;
  }

  static styles = [styles];
}

export default CDSFluidDatePickerSkeleton;
