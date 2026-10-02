/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { DATE_PICKER_INPUT_KIND } from './date-picker-input';
import styles from './date-picker.scss?lit';

/**
 * Skeleton version of the input box for date picker.
 */
class CDSDatePickerInputSkeleton extends LitElement {
  static is = `${prefix}-date-picker-input-skeleton`;

  /**
   * Specify whether the label should be hidden, or not
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * * @deprecated use `range` instead
   * Date picker input kind. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  kind = DATE_PICKER_INPUT_KIND.SIMPLE;

  /**
   * Specify whether the skeleton should be of range date picker.
   */
  @property({ type: Boolean, reflect: true, attribute: 'range' })
  range = false;

  render() {
    const { hideLabel, range } = this;
    return html`
      <div class="${prefix}--date-picker-input-skeleton-container">
        ${!hideLabel ? html`<span class="${prefix}--label"></span>` : null}
        <div class="${prefix}--date-picker__input ${prefix}--skeleton"></div>
      </div>
      ${range
        ? html`
            <div class="${prefix}--date-picker-input-skeleton-container">
              ${!hideLabel
                ? html`<span class="${prefix}--label"></span>`
                : null}
              <div
                class="${prefix}--date-picker__input ${prefix}--skeleton"></div>
            </div>
          `
        : null}
    `;
  }

  static styles = styles;
}

export default CDSDatePickerInputSkeleton;
