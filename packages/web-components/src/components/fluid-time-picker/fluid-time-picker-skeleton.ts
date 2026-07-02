/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './fluid-time-picker.scss?lit';
import '../fluid-text-input/fluid-text-input-skeleton';
import '../fluid-select/fluid-select-skeleton';

/**
 * Fluid time picker skeleton.
 *
 * @element cds-fluid-time-picker-skeleton
 */
@customElement(`${prefix}-fluid-time-picker-skeleton`)
class CDSFluidTimePickerSkeleton extends LitElement {
  /**
   * Specify if there are only two TimePicker elements.
   */
  @property({ type: Boolean, attribute: 'is-only-two', reflect: true })
  isOnlyTwo = false;

  render() {
    const wrapperClasses = classMap({
      [`${prefix}--time-picker--fluid--skeleton`]: true,
      [`${prefix}--time-picker--equal-width`]: this.isOnlyTwo,
    });

    return html`
      <div class="${wrapperClasses}">
        <cds-fluid-text-input-skeleton></cds-fluid-text-input-skeleton>
        <cds-fluid-select-skeleton></cds-fluid-select-skeleton>
        ${this.isOnlyTwo
          ? null
          : html`<cds-fluid-select-skeleton></cds-fluid-select-skeleton>`}
      </div>
    `;
  }

  static styles = styles;
}

export default CDSFluidTimePickerSkeleton;
