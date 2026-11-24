/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './time-picker.scss?lit';
import '../text-input/text-input-skeleton';
import '../select/select-skeleton';

/**
 * Time picker skeleton.
 *
 * @element cds-time-picker-skeleton
 */
@customElement(`${prefix}-time-picker-skeleton`)
class CDSTimePickerSkeleton extends LitElement {
  /**
   * Specify if there are only two TimePicker elements.
   */
  @property({ type: Boolean, attribute: 'is-only-two', reflect: true })
  isOnlyTwo = false;

  render() {
    const wrapperClasses = classMap({
      [`${prefix}--time-picker--skeleton`]: true,
      [`${prefix}--time-picker--equal-width`]: this.isOnlyTwo,
    });

    return html`
      <div class="${wrapperClasses}">
        <cds-text-input-skeleton></cds-text-input-skeleton>
        <cds-select-skeleton hide-label></cds-select-skeleton>
        ${this.isOnlyTwo
          ? null
          : html`<cds-select-skeleton hide-label></cds-select-skeleton>`}
      </div>
    `;
  }

  static styles = styles;
}

export default CDSTimePickerSkeleton;
