/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import ErrorFilled16 from '@carbon/icons/lib/error--filled/16';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16';
import {
  PROGRESS_BAR_SIZE,
  PROGRESS_BAR_STATUS,
  PROGRESS_BAR_TYPE,
} from './defs';
import { prefix } from '../../globals/settings';
import styles from './progress-bar.scss';

export { PROGRESS_BAR_SIZE, PROGRESS_BAR_STATUS, PROGRESS_BAR_TYPE };

/**
 * Progress bar.
 *
 * @element cds-progress-bar
 */
@customElement(`${prefix}-progress-bar`)
class CDSProgressBar extends LitElement {
  /**
   * The current progress as a textual representation.
   */
  @property({ type: String, attribute: 'helper-text', reflect: true })
  helperText;

  /**
   * Whether the label should be visually hidden.
   */
  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel;

  /**
   * A label describing the progress bar.
   */
  @property({ type: String })
  label;

  /**
   * The maximum value.
   */
  @property({ type: Number, reflect: true })
  max = 100;

  /**
   * Specify the size of the ProgressBar.
   */
  @property({ type: String, reflect: true })
  size = PROGRESS_BAR_SIZE.BIG;

  /**
   * Specify the status.
   */
  @property({ type: String, reflect: true })
  status = PROGRESS_BAR_STATUS.ACTIVE;

  /**
   * Defines the alignment variant of the progress bar.
   */
  @property({ type: String, reflect: true })
  type = PROGRESS_BAR_TYPE.DEFAULT;

  /**
   * The current value.
   */
  @property({ type: Number, reflect: true })
  value;

  protected get _cappedValue() {
    const { value, max, status } = this;

    let cappedValue = value;
    if (cappedValue > max) {
      cappedValue = max;
    }
    if (cappedValue < 0) {
      cappedValue = 0;
    }
    if (status === PROGRESS_BAR_STATUS.ERROR) {
      cappedValue = 0;
    } else if (status === PROGRESS_BAR_STATUS.FINISHED) {
      cappedValue = max;
    }

    return cappedValue;
  }

  updated(changedProperties) {
    if (
      changedProperties.has('value') ||
      changedProperties.has('max') ||
      changedProperties.has('status')
    ) {
      const { _cappedValue: cappedValue, max, status } = this;

      const percentage: number = cappedValue / max;

      const bar = this.shadowRoot!.querySelector(
        `.${prefix}--progress-bar__bar`
      ) as HTMLElement;

      if (
        status != PROGRESS_BAR_STATUS.ERROR &&
        status != PROGRESS_BAR_STATUS.FINISHED
      ) {
        bar.style.transform = `scaleX(${percentage})`;
      } else {
        bar.style.transform = 'none';
      }
    }
  }

  render() {
    const {
      _cappedValue: cappedValue,
      helperText,
      hideLabel,
      label,
      max,
      size,
      status,
      type,
      value,
    } = this;

    const isFinished = status === PROGRESS_BAR_STATUS.FINISHED;
    const isError = status === PROGRESS_BAR_STATUS.ERROR;

    const indeterminate =
      !isFinished && !isError && (value === null || value === undefined);

    let statusIcon = null;

    if (isError) {
      statusIcon = ErrorFilled16({
        class: `${prefix}--progress-bar__status-icon`,
      });
    } else if (isFinished) {
      statusIcon = CheckmarkFilled16({
        class: `${prefix}--progress-bar__status-icon`,
      });
    }

    const wrapperClasses = classMap({
      [`${prefix}--progress-bar`]: true,
      [`${prefix}--progress-bar--${size}`]: true,
      [`${prefix}--progress-bar--${type}`]: true,
      [`${prefix}--progress-bar--indeterminate`]: indeterminate,
      [`${prefix}--progress-bar--finished`]: isFinished,
      [`${prefix}--progress-bar--error`]: isError,
    });

    const labelClasses = classMap({
      [`${prefix}--progress-bar__label`]: true,
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    return html` <div class="${wrapperClasses}">
      <div class="${labelClasses}">
        <span class="${prefix}--progress-bar__label-text">${label}</span>
        ${statusIcon}
      </div>
      <div
        class="${prefix}--progress-bar__track"
        role="progressbar"
        aria-busy="${!isFinished}"
        aria-invalid="${isError}"
        aria-valuemin="${!indeterminate ? 0 : null}"
        aria-valuemax="${!indeterminate ? max : null}"
        aria-valuenow="${!indeterminate ? cappedValue : null}">
        <div class="${prefix}--progress-bar__bar"></div>
      </div>
      ${helperText
        ? html`<div class="${prefix}--progress-bar__helper-text">
            ${helperText}
            <div class="${prefix}--visually-hidden" aria-live="polite">
              ${isFinished ? 'Done' : 'Loading'}
            </div>
          </div>`
        : null}
    </div>`;
  }

  static styles = styles;
}

export default CDSProgressBar;
