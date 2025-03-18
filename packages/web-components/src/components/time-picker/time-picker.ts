/**
 * @license
 *
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
import '../select/select';

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

  protected _handleClick(event: MouseEvent) {
    if (!this.disabled && !this.readonly) {
      this.dispatchEvent(
        new CustomEvent('click', {
          bubbles: true,
          composed: true,
          detail: { event },
        })
      );
    }
  }

  protected _handleBlur(event: FocusEvent) {
    if (!this.disabled) {
      this.dispatchEvent(
        new CustomEvent('blur', {
          bubbles: true,
          composed: true,
          detail: { event },
        })
      );
    }
  }

  /**
   * Propagates properties to child elements
   * @param elements The elements to update with current properties
   */
  protected propagatePropertiesToChildren(elements: Element[]) {
    elements.forEach((element) => {
      if (element.tagName.toLowerCase() === `${prefix}-time-picker-select`) {
        // Propagate properties to children
        if (this.disabled) {
          element.setAttribute('disabled', '');
        } else {
          element.removeAttribute('disabled');
        }

        if (this.readonly) {
          element.setAttribute('readonly', '');
        } else {
          element.removeAttribute('readonly');
        }

        if (this.size) {
          element.setAttribute('size', this.size);
        }
      }
    });
  }

  /**
   * Handle slotchange event for time-picker-select slot
   * to propagate properties to child elements
   */
  protected _handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const elements = slot.assignedElements();
    this.propagatePropertiesToChildren(elements);
  }

  /**
   * Updates the properties of child elements
   * This is called whenever readonly or disabled properties change
   */
  protected updateChildProperties() {
    // Use a small timeout to ensure DOM is ready
    setTimeout(() => {
      const slot = this.shadowRoot?.querySelector(
        'slot[name="time-picker-select"]'
      );
      if (slot && slot instanceof HTMLSlotElement) {
        const elements = slot.assignedElements();
        this.propagatePropertiesToChildren(elements);
      }
    }, 0);
  }

  _handleFormdata(event: Event) {
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
  readonly = false;

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
      readonly,
      maxLength,
      pattern,
      size,
      type,
      value,
      _handleInput: handleInput,
      _handleClick: handleClick,
      _handleBlur: handleBlur,
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
      [`${prefix}--time-picker--readonly`]: readonly,
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
              ?readonly="${readonly}"
              type="${ifNonEmpty(type)}"
              .value="${value}"
              @input="${handleInput}"
              @click="${handleClick}"
              @blur="${handleBlur}" />
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
          <slot
            name="time-picker-select"
            @slotchange="${handleSlotChange}"></slot>
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
    super.updated && super.updated(changedProperties);

    // Propagate properties to children whenever readonly or disabled changes
    if (
      changedProperties.has('readonly') ||
      changedProperties.has('disabled') ||
      changedProperties.has('size')
    ) {
      this.updateChildProperties();
    }
  }
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}

export default CDSTimePicker;
