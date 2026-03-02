/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import Add16 from '@carbon/icons/es/add/16.js';
import Subtract16 from '@carbon/icons/es/subtract/16.js';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import { NUMBER_INPUT_VALIDATION_STATUS } from './defs';
import styles from './number-input.scss?lit';
import CDSTextInput, { INPUT_SIZE } from '../text-input/text-input';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { NumberFormatter, NumberParser } from '@carbon/utilities';

export { NUMBER_INPUT_VALIDATION_STATUS };

/**
 * Number input type
 */
export enum NUMBER_INPUT_TYPE {
  /**
   * Number type - uses native number input
   */
  NUMBER = 'number',
  /**
   * Text type - uses text input with locale-based formatting
   */
  TEXT = 'text',
}

/**
 * Number input.
 *
 * @element cds-number-input
 * @fires cds-number-input
 *   The name of the custom event fired after the value is changed upon a user gesture.
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-number-input`)
class CDSNumberInput extends CDSTextInput {
  /**
   * The underlying input element
   */
  @query('input')
  protected _input!: HTMLInputElement;

  /**
   * The current number value (used for type="text")
   */
  @state()
  protected _numberValue: number = NaN;

  /**
   * The previous number value (used for type="text")
   */
  @state()
  protected _previousNumberValue: number = NaN;

  /**
   * The current input text value (used for type="text")
   */
  @state()
  protected _inputValue: string = '';

  /**
   * NumberFormatter instance for locale-based formatting
   */
  protected _numberFormatter: NumberFormatter | null = null;

  /**
   * NumberParser instance for locale-based parsing
   */
  protected _numberParser: NumberParser | null = null;

  /**
   * Handles `input` event on the `input` in the shadow DOM.
   */
  protected _handleInput(event: Event) {
    const { target } = event;
    const { value } = target as HTMLInputElement;

    if (this.type === NUMBER_INPUT_TYPE.NUMBER) {
      const direction =
        this._value !== undefined && Number(value) > Number(this._value)
          ? 'up'
          : 'down';

      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSNumberInput).eventInput,
          {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
              value,
              direction,
            },
          }
        )
      );
      this._value = value;
    } else if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      const _value = this.allowEmpty && value === '' ? '' : value;
      const parsedValue = this._numberParser?.parse(_value) ?? NaN;

      this._numberValue = parsedValue;
      this._inputValue = _value;
      // onChange is called on blur for type="text"
    }
  }

  /**
   * Handles `click` event on the down button in the shadow DOM.
   */
  protected _handleUserInitiatedStepDown(event: Event) {
    const { _input: input } = this;
    this._handleStep(event, 'down');

    const newValue =
      this.type === NUMBER_INPUT_TYPE.TEXT ? this._inputValue : input.value;

    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSNumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: newValue,
          direction: 'down',
        },
      })
    );
  }

  /**
   * Handles `click` event on the up button in the shadow DOM.
   */
  protected _handleUserInitiatedStepUp(event: Event) {
    const { _input: input } = this;
    this._handleStep(event, 'up');

    const newValue =
      this.type === NUMBER_INPUT_TYPE.TEXT ? this._inputValue : input.value;

    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSNumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: newValue,
          direction: 'up',
        },
      })
    );
  }

  /**
   * Handles `focus` event on the `input` in the shadow DOM.
   */
  protected _handleFocus(event: FocusEvent) {
    if (this.disableWheel) {
      (event.target as HTMLInputElement).addEventListener(
        'wheel',
        this._preventWheel,
        { passive: false }
      );
    }
  }

  /**
   * Handles `blur` event on the `input` in the shadow DOM.
   */
  protected _handleBlur(event: FocusEvent) {
    if (this.disableWheel) {
      (event.target as HTMLInputElement).removeEventListener(
        'wheel',
        this._preventWheel
      );
    }

    if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      const rawValue = (event.target as HTMLInputElement).value;

      // Validate raw input
      const isValid = this.validate
        ? this.validate(rawValue, this.locale)
        : true;

      if (isValid) {
        const formattedValue = isNaN(this._numberValue)
          ? ''
          : (this._numberFormatter?.format(this._numberValue) ?? '');

        this._inputValue = formattedValue;

        // Re-parse the formatted value to ensure consistency
        const parsedFormattedValue =
          this._numberParser?.parse(formattedValue) ?? NaN;

        // Dispatch change event if value changed
        if (
          !(isNaN(this._previousNumberValue) && isNaN(parsedFormattedValue)) &&
          this._previousNumberValue !== parsedFormattedValue
        ) {
          const direction =
            this._previousNumberValue < parsedFormattedValue ? 'up' : 'down';

          this.dispatchEvent(
            new CustomEvent(
              (this.constructor as typeof CDSNumberInput).eventInput,
              {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: {
                  value: parsedFormattedValue,
                  direction,
                },
              }
            )
          );
        }

        this._numberValue = parsedFormattedValue;
        this._previousNumberValue = parsedFormattedValue;
      } else {
        // Keep the invalid input as-is
        this._inputValue = rawValue;
      }

      this.requestUpdate();
    }
  }

  /**
   * Handles keyboard events for arrow up/down when type="text"
   */
  protected _handleKeyDown(event: KeyboardEvent) {
    if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        this._handleStep(event, 'up');
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        this._handleStep(event, 'down');
      }
    }
  }

  /**
   * Prevents wheel events from changing the input value.
   */
  protected _preventWheel = (event: WheelEvent) => {
    event.preventDefault();
  };

  protected _min = '';
  protected _max = '';
  protected _step = '1';

  /**
   * The minimum value allowed in the input
   */
  @property({ reflect: true })
  get min() {
    return this._min.toString();
  }

  set min(value) {
    const oldValue = this.min;
    this._min = value;
    this.requestUpdate('min', oldValue);
  }

  /**
   * The maximum value allowed in the input
   */
  @property({ reflect: true })
  get max() {
    return this._max.toString();
  }

  set max(value) {
    const oldValue = this.max;
    this._max = value;
    this.requestUpdate('max', oldValue);
  }

  /**
   * The amount the value should increase or decrease by
   */
  @property({ reflect: true })
  get step() {
    return this._step.toString();
  }

  set step(value) {
    const oldValue = this.step;
    this._step = value;
    this.requestUpdate('step', oldValue);
  }

  /**
   * Provide a description for up/down icons that can be read by screen readers
   */
  @property({ attribute: 'icon-description' })
  iconDescription = '';

  /**
   * Aria text for the button that increments the value
   */
  @property({ attribute: 'increment-button-assistive-text' })
  incrementButtonAssistiveText = 'increase number input';

  /**
   * Aria text for the button that decrements the value
   */
  @property({ attribute: 'decrement-button-assistive-text' })
  decrementButtonAssistiveText = 'decrease number input';

  /**
   * Specify whether you want the steppers to be hidden
   */
  @property({ type: Boolean, attribute: 'hide-steppers', reflect: true })
  hideSteppers = false;

  /**
   * `true` to allow empty string.
   */
  @property({ type: Boolean, attribute: 'allow-empty', reflect: true })
  allowEmpty = false;

  /**
   * Optional starting value for uncontrolled state
   */
  @property({ attribute: 'default-value' })
  defaultValue = '';

  /**
   * Specify if the wheel functionality for the input should be disabled, or not
   */
  @property({ type: Boolean, attribute: 'disable-wheel', reflect: true })
  disableWheel = false;

  /**
   * Set to true to use the fluid variant.
   */
  @property({ type: Boolean })
  isFluid = false;

  /**
   * The input box size.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.MEDIUM;

  /**
   * Specify if the input should be of type text or number.
   * Use type="text" with locale and formatOptions for locale-based formatting.
   */
  @property({ reflect: true })
  // @ts-expect-error - Override parent type property with number-specific types
  type: 'number' | 'text' = NUMBER_INPUT_TYPE.NUMBER;

  /**
   * Specify a BCP47 language code for parsing and formatting.
   * Use with type="text".
   */
  @property({ reflect: true })
  locale = 'en-US';

  /**
   * Specify Intl.NumberFormat options for formatting.
   * Use with type="text".
   */
  @property({ type: Object, attribute: 'format-options' })
  formatOptions: Intl.NumberFormatOptions = {};

  /**
   * When type="text", provide an optional pattern to restrict user input.
   */
  @property({ reflect: true })
  pattern = '[0-9]*';

  /**
   * Instruct the browser which keyboard to display on mobile devices.
   */
  @property({ reflect: true, attribute: 'input-mode' })
  inputMode:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search' = 'decimal';

  /**
   * Provide the value stepping should begin at when the input is empty
   */
  @property({ type: Number, attribute: 'step-start-value' })
  stepStartValue = 0;

  /**
   * Optional validation function for type="text".
   * Should return false to fail validation, true to pass, or undefined to defer to built-in validation.
   */
  validate?: (value: string, locale: string) => boolean | undefined;

  /**
   * Initialize formatters when component connects
   */
  connectedCallback() {
    super.connectedCallback();
    this._initializeFormatters();

    // Initialize from defaultValue if no value is set
    if (
      this.type === NUMBER_INPUT_TYPE.TEXT &&
      !this.value &&
      this.defaultValue
    ) {
      const parsed = this._numberParser?.parse(this.defaultValue) ?? NaN;
      this._numberValue = parsed;
      this._previousNumberValue = parsed;
      this._inputValue = isNaN(parsed)
        ? ''
        : (this._numberFormatter?.format(parsed) ?? '');
    }
  }

  /**
   * Update formatters when properties change
   */
  // @ts-expect-error - Override to accept changedProperties parameter
  updated(changedProperties: Map<string, unknown>) {
    super.updated?.();

    if (
      changedProperties.has('locale') ||
      changedProperties.has('formatOptions') ||
      changedProperties.has('type')
    ) {
      this._initializeFormatters();

      // Re-format the current value if type is text
      if (this.type === NUMBER_INPUT_TYPE.TEXT && !isNaN(this._numberValue)) {
        this._inputValue =
          this._numberFormatter?.format(this._numberValue) ?? '';
      }
    }

    // Initialize number value from value attribute changes
    if (changedProperties.has('value') && this.value) {
      if (this.type === NUMBER_INPUT_TYPE.TEXT) {
        const parsed = this._numberParser?.parse(this.value) ?? NaN;
        this._numberValue = parsed;
        this._previousNumberValue = parsed;
        this._inputValue = isNaN(parsed)
          ? ''
          : (this._numberFormatter?.format(parsed) ?? '');
      }
    }
  }

  /**
   * Initialize NumberFormatter and NumberParser instances
   */
  protected _initializeFormatters() {
    if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      try {
        this._numberFormatter = new NumberFormatter(
          this.locale,
          this.formatOptions
        );
        this._numberParser = new NumberParser(this.locale, this.formatOptions);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[NumberInput] Failed to initialize formatters:', error);
      }
    }
  }

  /**
   * Get input validity
   */
  _getInputValidity() {
    if (this.invalid) {
      return false;
    }

    // Determine which value to validate based on type and validate function
    // Match React's logic: validate ? inputValue : (type === 'number' ? value : numberValue)
    const valueToCheck =
      this.validate && this.type === NUMBER_INPUT_TYPE.TEXT
        ? this._inputValue
        : this.type === NUMBER_INPUT_TYPE.TEXT
          ? this._numberValue
          : this.value;

    // Skip validation if value is empty and allowEmpty is true
    if (valueToCheck === '') {
      const result = this.allowEmpty;
      return result;
    }

    // Normalize the value to a number
    let numericValue: number;
    if (typeof valueToCheck === 'string') {
      // For type="number", use simple Number() conversion
      // For type="text", use NumberParser to handle formatted numbers like "1,234"
      if (this.type === NUMBER_INPUT_TYPE.NUMBER) {
        numericValue = Number(valueToCheck);
      } else {
        numericValue = this._numberParser?.parse(valueToCheck) ?? NaN;
      }
    } else if (typeof valueToCheck === 'number') {
      numericValue = valueToCheck;
    } else {
      numericValue = NaN;
    }

    // If value is NaN, check allowEmpty
    if (isNaN(numericValue)) {
      const result = this.allowEmpty;
      return result;
    }

    // Use custom validate ONLY for formatting validation (only for type="text")
    if (this.validate && this.type === NUMBER_INPUT_TYPE.TEXT) {
      const isFormatValid = this.validate(this._inputValue, this.locale);
      if (isFormatValid === false) {
        return false; // invalid format
      }
    }

    // Check min/max bounds on the numeric value
    if (this.max !== '' && numericValue > Number(this.max)) {
      return false;
    }
    if (this.min !== '' && numericValue < Number(this.min)) {
      return false;
    }
    return true;
  }

  /**
   * Get decimal places from a number
   */
  getDecimalPlaces = (num: number) => {
    const parts = num.toString().split('.');
    return parts[1] ? parts[1].length : 0;
  };

  /**
   * Clamp a value between min and max
   */
  protected _clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Handle stepping up or down
   */
  protected _handleStep(_event: Event, direction: 'up' | 'down') {
    const currentValue =
      this.type === NUMBER_INPUT_TYPE.NUMBER
        ? Number(this._input.value)
        : this._numberValue;

    let rawValue: number;

    if (Number.isNaN(currentValue) || !currentValue) {
      if (typeof this.stepStartValue === 'number' && this.stepStartValue) {
        rawValue = this.stepStartValue;
      } else if (
        (this.min &&
          Number(this.min) < 0 &&
          this.max &&
          Number(this.max) > 0) ||
        (!this.max && !this.min) ||
        this.max
      ) {
        rawValue = direction === 'up' ? 1 : -1;
      } else if (
        (this.min &&
          Number(this.min) > 0 &&
          this.max &&
          Number(this.max) > 0) ||
        this.min
      ) {
        rawValue = Number(this.min);
      } else {
        rawValue = 0;
      }
    } else if (direction === 'up') {
      rawValue = currentValue + Number(this.step);
    } else {
      rawValue = currentValue - Number(this.step);
    }

    const precision = Math.max(
      this.getDecimalPlaces(currentValue),
      this.getDecimalPlaces(Number(this.step))
    );

    const floatValue = parseFloat(Number(rawValue).toFixed(precision));
    const newValue = this._clamp(
      floatValue,
      this.min !== '' ? Number(this.min) : -Infinity,
      this.max !== '' ? Number(this.max) : Infinity
    );

    if (this.type === NUMBER_INPUT_TYPE.NUMBER) {
      this._value = String(newValue);
      this.value = this._value;
    } else if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      // Format the new value
      const formattedNewValue =
        this._numberFormatter?.format(newValue) ?? String(newValue);
      const parsedFormattedNewValue =
        this._numberParser?.parse(formattedNewValue) ?? newValue;

      this._numberValue = parsedFormattedNewValue;
      this._inputValue = formattedNewValue;
      this._previousNumberValue = parsedFormattedNewValue;
      this.requestUpdate();
    }
  }

  /**
   * Handles incrementing the value in the input
   */
  stepUp() {
    this._handleStep(new Event('step'), 'up');
  }

  /**
   * Handles decrementing the value in the input
   */
  stepDown() {
    this._handleStep(new Event('step'), 'down');
  }

  render() {
    const {
      _handleInput: handleInput,
      _handleUserInitiatedStepDown: handleUserInitiatedStepDown,
      _handleUserInitiatedStepUp: handleUserInitiatedStepUp,
      _handleFocus: handleFocus,
      _handleBlur: handleBlur,
      _handleKeyDown: handleKeyDown,
    } = this;

    const isValid = this._getInputValidity();
    const invalidIcon = iconLoader(WarningFilled16, {
      class: `${prefix}--number__invalid`,
    });

    const warnIcon = iconLoader(WarningAltFilled16, {
      class: `${prefix}--number__invalid ${prefix}--number__invalid--warning`,
    });

    const normalizedProps: {
      disabled: boolean;
      invalid: boolean;
      warn: boolean;
      'slot-name': string;
      'slot-text': string;
      icon: ReturnType<typeof iconLoader>;
    } = {
      disabled: !this.readonly && this.disabled,
      invalid: !this.readonly && !isValid,
      warn: !this.readonly && isValid && this.warn,
      'slot-name': '',
      'slot-text': '',
      icon: null,
    };

    const wrapperClasses = classMap({
      [`${prefix}--number`]: true,
      [`${prefix}--number--${this.size}`]: this.size,
      [`${prefix}--number--nosteppers`]: this.hideSteppers,
      [`${prefix}--number--readonly`]: this.readonly,
    });

    const inputWrapperClasses = classMap({
      [`${prefix}--number__input-wrapper`]: true,
      [`${prefix}--number__input-wrapper--warning`]: normalizedProps.warn,
      [`${prefix}--number__input-wrapper--decorator`]: this._hasAILabel,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: normalizedProps.disabled,
      [`${prefix}--visually-hidden`]: this.hideLabel,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: normalizedProps.disabled,
    });

    // Determine the input value based on type
    let inputValue: string;
    if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      inputValue = this._inputValue;
    } else {
      inputValue = this.hasAttribute('value')
        ? this._value
        : this.defaultValue || this._value;
    }

    const incrementButton = html`
      <button
        class="${prefix}--number__control-btn up-icon"
        aria-label="${this.iconDescription ||
        this.incrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${normalizedProps.disabled}
        @click=${handleUserInitiatedStepUp}>
        ${iconLoader(Add16)}
      </button>
      <div class="${prefix}--number__rule-divider"></div>
    `;

    const decrementButton = html`
      <button
        class="${prefix}--number__control-btn down-icon"
        aria-label="${this.iconDescription ||
        this.decrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${normalizedProps.disabled}
        @click=${handleUserInitiatedStepDown}>
        ${iconLoader(Subtract16)}
      </button>
      <div class="${prefix}--number__rule-divider"></div>
    `;

    const input = html`
      <input
        autocomplete="${ifNonEmpty(this.autocomplete)}"
        ?autofocus="${this.autofocus}"
        ?data-invalid="${normalizedProps.invalid}"
        ?disabled="${normalizedProps.disabled}"
        id="input"
        name="${ifNonEmpty(this.name)}"
        pattern="${this.type === NUMBER_INPUT_TYPE.TEXT
          ? ifNonEmpty(this.pattern)
          : ''}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        type="${this.type}"
        inputmode="${this.type === NUMBER_INPUT_TYPE.TEXT
          ? this.inputMode
          : ''}"
        .value="${inputValue}"
        @input="${handleInput}"
        @focus="${handleFocus}"
        @blur="${handleBlur}"
        @keydown="${handleKeyDown}"
        min="${this.type === NUMBER_INPUT_TYPE.NUMBER
          ? ifNonEmpty(this.min)
          : ''}"
        max="${this.type === NUMBER_INPUT_TYPE.NUMBER
          ? ifNonEmpty(this.max)
          : ''}"
        step="${this.type === NUMBER_INPUT_TYPE.NUMBER
          ? ifNonEmpty(this.step)
          : ''}"
        role="alert"
        aria-atomic="true" />
    `;

    if (normalizedProps.invalid) {
      normalizedProps.icon = invalidIcon;
      normalizedProps['slot-name'] = 'invalid-text';
      normalizedProps['slot-text'] = this.invalidText;
    } else if (normalizedProps.warn) {
      normalizedProps.icon = warnIcon;
      normalizedProps['slot-name'] = 'warn-text';
      normalizedProps['slot-text'] = this.warnText;
    }

    const validationMessage =
      normalizedProps.invalid || normalizedProps.warn
        ? html`<div
            class="${prefix}--form-requirement"
            ?hidden="${!normalizedProps.invalid && !normalizedProps.warn}">
            <slot name="${normalizedProps['slot-name']}">
              ${normalizedProps['slot-text']}
            </slot>
          </div>`
        : null;

    const helper = this.helperText
      ? html`<div
          class="${helperTextClasses}"
          id="helper-text"
          ?hidden="${normalizedProps.invalid || normalizedProps.warn}">
          <slot name="helper-text"> ${this.helperText} </slot>
        </div>`
      : null;

    return html`
      <div class="${wrapperClasses}" ?data-invalid=${normalizedProps.invalid}>
        <label class="${labelClasses}" for="input">
          <slot name="label-text"> ${this.label} </slot>
        </label>
        <div class="${inputWrapperClasses}">
          ${normalizedProps.icon} ${input}
          <slot name="ai-label" @slotchange="${this._handleSlotChange}"></slot>
          <slot name="slug" @slotchange="${this._handleSlotChange}"></slot>
          <div class="${prefix}--number__controls">
            ${!this.hideSteppers
              ? html`${decrementButton} ${incrementButton}`
              : null}
          </div>
        </div>
        ${this.isFluid
          ? html`<hr class="${prefix}--number-input__divider" />`
          : null}
        ${validationMessage ? validationMessage : helper}
      </div>
    `;
  }

  /**
   * The name of the custom event fired after the value is changed upon a user gesture.
   */
  static get eventInput() {
    return `${prefix}-number-input`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSNumberInput;
