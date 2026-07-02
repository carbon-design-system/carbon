/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { iconLoader } from '../../globals/internal/icon-loader';
import Calendar16 from '@carbon/icons/es/calendar/16.js';
import styles from './fluid-date-picker.scss?lit';

/**
 * Fluid date picker skeleton.
 *
 * @element cds-fluid-date-picker-skeleton
 */
@customElement(`${prefix}-fluid-date-picker-skeleton`)
class CDSFluidDatePickerSkeleton extends LitElement {
  @property({ reflect: true, attribute: 'date-picker-type' })
  datePickerType: 'simple' | 'single' | 'range' = 'single';

  private _renderContainer(showIcon: boolean) {
    return html`
      <div class="${prefix}--date-picker--fluid__skeleton--container">
        <span class="${prefix}--label ${prefix}--skeleton"></span>
        <div class="${prefix}--skeleton ${prefix}--text-input"></div>
        ${showIcon
          ? iconLoader(Calendar16, {
              class: `${prefix}--date-picker__icon`,
              role: 'img',
              'aria-hidden': 'true',
            })
          : null}
      </div>
    `;
  }

  render() {
    const { datePickerType } = this;
    const isRange = datePickerType === 'range';
    const showIcon = datePickerType !== 'simple';

    const wrapperClasses = classMap({
      [`${prefix}--date-picker--fluid__skeleton`]: true,
      [`${prefix}--date-picker--fluid__skeleton--range`]: isRange,
    });

    return html`
      <div class="${wrapperClasses}">
        ${this._renderContainer(showIcon)}
        ${isRange ? this._renderContainer(true) : null}
      </div>
    `;
  }

  static styles = [styles];
}

export default CDSFluidDatePickerSkeleton;
