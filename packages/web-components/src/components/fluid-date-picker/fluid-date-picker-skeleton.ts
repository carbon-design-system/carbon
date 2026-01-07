/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './fluid-date-picker.scss?lit';
import CDSDatePickerInputSkeleton from '../date-picker/date-picker-input-skeleton';

/**
 * Fluid number input.
 *
 * @element cds-fluid-number-input-skeleton
 */
@customElement(`${prefix}-fluid-date-picker-input-skeleton`)
class CDSFluidDatePickerInputSkeleton extends CDSDatePickerInputSkeleton {
  render() {
    return html` ${super.render()} `;
  }

  static styles = [CDSDatePickerInputSkeleton.styles, styles];
}

export default CDSFluidDatePickerInputSkeleton;
