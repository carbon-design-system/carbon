/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16';
import { prefix } from '../../globals/settings';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import { ifDefined } from 'lit/directives/if-defined.js';
import CDSInput from '../input/input';
import styles from './textarea.scss';

/**
 * Text area.
 *
 * @element cds-textarea
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-textarea`)
class CDSTextarea extends CDSInput {
  /**
   * Handles `oninput` event on the `<input>`.
   *
   * @param event The event.
   */
  protected _handleInput({ target }: Event) {
    this.value = (target as HTMLTextAreaElement).value;
  }

  /**
   * The number of columns for the stextarea to show by default
   */
  @property({ type: Number })
  cols;

  /**
   * ID to link the `label` and `textarea`
   */
  @property()
  id = '';

  /**
   * Pattern to validate the textarea against for HTML validity checking
   */
  @property()
  pattern = '';

  /**
   * Boolean property to set the required status
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * The number of rows for the textarea to show by default
   */
  @property()
  rows = 4;

  /**
   * Get a reference to the underlying textarea so we can directly apply values.
   * This lets us fixe a bug where after a user would clear text, the value wouldn't update programmatically
   */
  @query('textarea')
  protected _textarea!: HTMLTextAreaElement;

  render() {
    const { enableCounter, maxCount } = this;

    const textCount = this.value?.length;

    const invalidIcon = WarningFilled16({
      class: `${prefix}--text-area__invalid-icon`,
    });

    const warnIcon = WarningAltFilled16({
      class: `${prefix}--text-area__invalid-icon ${prefix}--text-area__invalid-icon--warning`,
    });

    const textareaClasses = classMap({
      [`${prefix}--text-area`]: true,
      [`${prefix}--text-area--warn`]: this.warn,
      [`${prefix}--text-area--invalid`]: this.invalid,
    });

    const textareaWrapperClasses = classMap({
      [`${prefix}--text-area__wrapper`]: true,
      [`${prefix}--text-area__wrapper--warn`]: this.warn,
      [`${prefix}--text-area__wrapper--readonly`]: this.readonly,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: this.disabled,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: this.disabled,
    });

    const counter =
      enableCounter && maxCount
        ? html` <label class="${labelClasses}">
            <slot name="label-text">${textCount}/${maxCount}</slot>
          </label>`
        : null;

    const icon = () => {
      if (this.invalid) {
        return invalidIcon;
      } else if (this.warn && !this.invalid) {
        return warnIcon;
      }
      return null;
    };

    return html`
      <div class="${prefix}--text-area__label-wrapper">
        <label class="${labelClasses}" for="input">
          <slot name="label-text"> ${this.label} </slot>
        </label>
        ${counter}
      </div>
      <div class="${textareaWrapperClasses}" ?data-invalid="${this.invalid}">
        ${icon()}
        <textarea
          ?autocomplete="${this.autocomplete}"
          ?autofocus="${this.autofocus}"
          class="${textareaClasses}"
          cols="${ifDefined(this.cols)}"
          ?data-invalid="${this.invalid}"
          ?disabled="${this.disabled}"
          id="input"
          name="${ifNonEmpty(this.name)}"
          pattern="${ifNonEmpty(this.pattern)}"
          placeholder="${ifNonEmpty(this.placeholder)}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          rows="${ifDefined(this.rows)}"
          .value="${this.value}"
          maxlength="${ifNonEmpty(this.maxCount)}"
          @input="${this._handleInput}"></textarea>
      </div>
      <div class="${helperTextClasses}" ?hidden="${this.invalid || this.warn}">
        <slot name="helper-text"> ${this.helperText} </slot>
      </div>
      <div
        class="${prefix}--form-requirement"
        ?hidden="${!this.invalid && !this.warn}">
        <slot name="${this.invalid ? 'invalid-text' : 'warn-text'}">
          ${this.invalid ? this.invalidText : this.warnText}
        </slot>
      </div>
    `;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSTextarea;
