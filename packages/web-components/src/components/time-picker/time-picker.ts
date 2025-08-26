/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import ValidityMixin from '../../globals/mixins/validity';
import FormMixin from '../../globals/mixins/form';
import { prefix } from '../../globals/settings';
import styles from './time-picker.scss?lit';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import { TIME_PICKER_SIZE } from './defs';

/**
 * Time Picker component.
 * @element cds-time-picker
 * @slot label-text - The label text.
 * @slot time-picker-select - Slot for time picker select components.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-time-picker`)
class CDSTimePicker extends ValidityMixin(FormMixin(LitElement)) {
  /**
   * The underlying input element
   */
  @query('input')
  protected _input!: HTMLInputElement;

  /**
   * The internal value.
   */
  protected _value = '';

  protected _handleInput({ target }: Event) {
    this.value = (target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  /**
   * Handle slotchange event for time-picker-select slot
   * to propagate properties to child elements
   */
  protected _handleSlotChange() {
    this.requestUpdate();
  }

  _handleFormdata(event: Event) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
    const { formData } = event as any;
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * Specify whether the control is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify whether the control is currently invalid
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  @property({ attribute: 'invalid-text' })
  invalidText = 'Invalid time format.';

  /**
   * Specify whether the control is in warning state
   */
  @property({ type: Boolean, reflect: true })
  warning = false;

  /**
   * Provide the text that is displayed when the control is in a warning state
   */
  @property({ attribute: 'warning-text' })
  warningText = 'Warning message.';

  /**
   * Specify whether the label should be hidden
   */
  @property({ attribute: 'hide-label', type: Boolean, reflect: true })
  hideLabel = false;

  /**
   * Name for the input in FormData
   */
  @property()
  name = '';

  /**
   * Provide label text to be read by screen readers
   */
  @property({ attribute: 'label-text' })
  labelText = 'Select a time';

  /**
   * Placeholder text for the input
   */
  @property({ reflect: true })
  placeholder = 'hh:mm';

  /**
   * Specify whether the control should be read-only
   */
  @property({ type: Boolean, reflect: true })
  readOnly = false;

  /**
   * Specify the maximum length of the input value
   */
  @property({ type: Number, attribute: 'max-length', reflect: true })
  maxLength = 5;

  /**
   * Pattern for input validation
   */
  @property()
  pattern = '(1[012]|[1-9]):[0-5][0-9](\\s)?';

  /**
   * Size of the time picker
   */
  @property({ reflect: true })
  size = TIME_PICKER_SIZE.MEDIUM;

  /**
   * Input type
   */
  @property({ reflect: true })
  type = 'text';

  /**
   * Validity message
   */
  @property({ attribute: 'validity-message' })
  validityMessage = '';

  /**
   * Whether the input is required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Custom message for required validation
   */
  @property({ attribute: 'required-validity-message' })
  requiredValidityMessage = 'Please fill out this field.';

  /**
   * Value of the input
   */
  @property({ reflect: true })
  get value() {
    return this._input ? this._input.value : this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = value;
    this.requestUpdate('value', oldValue);
    if (this._input) {
      this._input.value = value;
    }
  }

  render() {
    const {
      className,
      disabled,
      hideLabel,
      invalid,
      invalidText,
      warning,
      warningText,
      labelText,
      placeholder,
      readOnly,
      maxLength,
      pattern,
      size,
      type,
      value,
      _handleInput: handleInput,
      _handleSlotChange: handleSlotChange,
    } = this;

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: disabled,
    });

    const timePickerClasses = classMap({
      [`${prefix}--time-picker`]: true,
      [`${prefix}--time-picker--invalid`]: invalid,
      [`${prefix}--time-picker--warning`]: warning,
      [`${prefix}--time-picker--readonly`]: readOnly,
      [`${prefix}--time-picker--${size}`]: size,
      ...(className && { [className]: true }),
    });

    const inputClasses = classMap({
      [`${prefix}--time-picker__input-field`]: true,
      [`${prefix}--text-input`]: true,
      [`${prefix}--time-picker__input-field-error`]: invalid || warning,
      ...(className && { [className]: true }),
    });
    const label = labelText
      ? html`<label class="${labelClasses}">${labelText}</label>`
      : null;

    return html`
      <div class="${prefix}--form-item ">
        ${label}
        <div class="${timePickerClasses}">
          <div class="${prefix}--time-picker__input">
            <input
              class="${inputClasses}"
              ?data-invalid="${invalid}"
              ?disabled="${disabled}"
              maxlength="${ifNonEmpty(maxLength)}"
              name="${ifNonEmpty(this.name)}"
              pattern="${ifNonEmpty(pattern)}"
              placeholder="${ifNonEmpty(placeholder)}"
              ?readonly="${readOnly}"
              type="${ifNonEmpty(type)}"
              .value="${value}"
              @input="${handleInput}" />
            ${invalid || warning
              ? html`
                  <div class="${prefix}--time-picker__error__icon">
                    ${invalid
                      ? WarningFilled16({
                          class: `${prefix}--checkbox__invalid-icon`,
                        })
                      : WarningAltFilled16({
                          class: `${prefix}--text-input__invalid-icon--warning`,
                        })}
                  </div>
                `
              : null}
          </div>
          <slot @slotchange="${handleSlotChange}"></slot>
        </div>
        ${invalid || warning
          ? html`
              <div class="${prefix}--form-requirement">
                ${invalid ? invalidText : warningText}
              </div>
            `
          : null}
      </div>
    `;
  }
  updated(changedProperties) {
    super.updated(changedProperties);

    const { selectorTimePickerSelect } = this
      .constructor as typeof CDSTimePicker;
    const timePickerSelects = this.querySelectorAll(selectorTimePickerSelect);

    ['disabled', 'readOnly', 'size'].forEach((name) => {
      if (changedProperties.has(name)) {
        const { [name as keyof CDSTimePicker]: value } = this;
        // Propagate the property to descendants
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        timePickerSelects.forEach((elem: any) => {
          elem[name] = value;
        });
      }
    });
  }
  static get selectorTimePickerSelect() {
    return `${prefix}-time-picker-select`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}

export default CDSTimePicker;
