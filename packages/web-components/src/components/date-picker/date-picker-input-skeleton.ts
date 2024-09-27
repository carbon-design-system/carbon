/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { DATE_PICKER_INPUT_KIND } from './date-picker-input';
import styles from './date-picker.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton version of the input box for date picker.
 */
@customElement(`${prefix}-date-picker-input-skeleton`)
class CDSDatePickerInputSkeleton extends LitElement {
  /**
   * Date picker input kind. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  kind = DATE_PICKER_INPUT_KIND.SIMPLE;

  render() {
    return html`
      <span class="${prefix}--label"></span>
      <div class="${prefix}--date-picker__input ${prefix}--skeleton"></div>
    `;
  }

  static styles = styles;
}

export default CDSDatePickerInputSkeleton;
