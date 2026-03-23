/**
 * Copyright IBM Corp. 2019, 2026
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
   * Internal validation state (used for type="text")
   */
  @state()
  protected _invalid: boolean = false;

  /**
   * Flag to track if the component has been interacted with by the user
   * Used to prevent defaultValue from overriding user-cleared input
   */
  @state()
  protected _hasUserInteraction: boolean = false;

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

      this._dispatchInputEvent(value, direction);
      this._value = value;
      // Request update to update invalid state
      this.requestUpdate();
    } else if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      const _value = this.allowEmpty && value === '' ? '' : value;
      const parsedValue = this._numberParser?.parse(_value) ?? NaN;

      // Mark that user has interacted with the input
      this._hasUserInteraction = true;

      this._numberValue = parsedValue;
      this._inputValue = _value;

      // Update _value to keep it synchronized with the current numeric value
      // This ensures locale/formatOptions changes use the current value, not stale data
      if (!isNaN(parsedValue)) {
        this._value = String(parsedValue);
      } else if (this.allowEmpty && _value === '') {
        this._value = '';
      }

      // Validate on input when validate function is provided
      if (this.validate) {
        const isValid = this.validate(_value, this.locale);
        // Set internal invalid state only if validate explicitly returns false
        // true or undefined means valid (undefined defers to built-in validation)
        this._invalid = isValid === false;
      } else {
        // Clear internal invalid state when no validation function
        this._invalid = false;
      }
    }
  }

  /**
   * Handles `click` event on the down button in the shadow DOM.
   */
  protected _handleUserInitiatedStepDown() {
    const { _input: input } = this;
    const valueChanged = this._handleStep('down');

    // Only dispatch event if value actually changed
    if (valueChanged) {
      const newValue =
        this.type === NUMBER_INPUT_TYPE.TEXT ? this._numberValue : input.value;

      this._dispatchInputEvent(newValue, 'down');
    }
  }

  /**
   * Handles `click` event on the up button in the shadow DOM.
   */
  protected _handleUserInitiatedStepUp() {
    const { _input: input } = this;
    const valueChanged = this._handleStep('up');

    // Only dispatch event if value actually changed
    if (valueChanged) {
      const newValue =
        this.type === NUMBER_INPUT_TYPE.TEXT ? this._numberValue : input.value;

      this._dispatchInputEvent(newValue, 'up');
    }
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
      const validationResult = this.validate
        ? this.validate(rawValue, this.locale)
        : true;

      // undefined means defer to built-in validation (treat as valid for custom validation)
      const isValid = validationResult !== false;

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

          this._dispatchInputEvent(parsedFormattedValue, direction);
        }

        this._numberValue = parsedFormattedValue;
        this._previousNumberValue = parsedFormattedValue;
        this._value = String(parsedFormattedValue);
        this._invalid = false;
      } else {
        this._invalid = true;
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
    if (this.readonly) {
      return;
    }
    if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        const valueChanged = this._handleStep('up');

        // Only dispatch event if value actually changed
        if (valueChanged) {
          this._dispatchInputEvent(this._numberValue, 'up');
        }
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        const valueChanged = this._handleStep('down');

        // Only dispatch event if value actually changed
        if (valueChanged) {
          this._dispatchInputEvent(this._numberValue, 'down');
        }
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
   * **Experimental**: Specify if the input should be of type text or number.
   * Use type="text" with `locale`, `formatOptions`, and guide user input with `pattern` and `inputMode`.
   * @experimental
   */
  @property({ reflect: true })
  // @ts-expect-error - Override parent type property with number-specific types
  type: 'number' | 'text' = NUMBER_INPUT_TYPE.NUMBER;

  /**
   * **Experimental:** Specify a BCP47 language code for parsing and formatting.
   * Use with `type="text"`, has no effect when `type="number"`.
   * @experimental
   */
  @property({ reflect: true })
  locale = 'en-US';

  /**
   * **Experimental:** Specify Intl.NumberFormat options applied to internal number parsing and formatting.
   * Use with `type="text"`, has no effect when `type="number"`.
   * @experimental
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
   * Note: the min and max attributes still takes priority if they are defined.
   */
  validate?: (value: string, locale: string) => boolean | undefined;

  /**
   * Override value setter to handle formatting for type="text"
   */
  @property({ reflect: true })
  override get value() {
    return super.value;
  }

  override set value(val: string) {
    const oldValue = this._value;

    if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      // Handle empty string
      if (val === '') {
        this._numberValue = NaN;
        this._previousNumberValue = NaN;
        this._inputValue = '';
        this._value = '';
        this.requestUpdate('value', oldValue);
        if (this._input) {
          this._input.value = '';
        }
        return;
      }

      // Ensure formatters are initialized before using them
      if (!this._numberFormatter || !this._numberParser) {
        this._initializeFormatters();
      }

      // Parse the value: string values are parsed, numbers are used directly
      let parsed: number;
      if (typeof val === 'string') {
        parsed = this._numberParser?.parse(val) ?? Number(val);
      } else {
        parsed = val as number;
      }

      // Synchronize all text mode state
      this._syncTextModeState(parsed, true);
      this.requestUpdate('value', oldValue);
    } else {
      // For type="number" or empty values, use parent behavior
      super.value = val;
    }
  }

  /**
   * Initialize formatters when component connects
   */
  connectedCallback() {
    super.connectedCallback();
    this._initializeFormatters();
  }

  /**
   * Called before updates to initialize default value
   */
  willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate?.(changedProperties);

    // Handle type switching before render
    if (changedProperties.has('type')) {
      this._initializeFormatters();
      this._invalid = false;

      const currentValue = this._value || this.value;
      if (currentValue) {
        const parsed = this._numberParser?.parse(currentValue) ?? NaN;

        if (!isNaN(parsed)) {
          this._numberValue = parsed;
          this._previousNumberValue = parsed;

          if (this.type === NUMBER_INPUT_TYPE.TEXT) {
            this._inputValue = this._numberFormatter?.format(parsed) ?? '';
            this._value = currentValue;
          } else {
            const plainValue = parsed.toString();
            this._value = plainValue;
            super.value = plainValue;
          }
        }
      }
    }

    // Handle locale or formatOptions changes before render
    if (
      changedProperties.has('locale') ||
      changedProperties.has('formatOptions')
    ) {
      this._initializeFormatters();

      if (this.type === NUMBER_INPUT_TYPE.TEXT) {
        // Re-format with new formatters
        if (this._value) {
          const parsed = Number(this._value);
          if (!isNaN(parsed)) {
            this._syncTextModeState(parsed, false);
          }
        } else if (!isNaN(this._numberValue)) {
          this._syncTextModeState(this._numberValue, false);
        }
      }
    }

    // Initialize from defaultValue if no value is set
    // This runs before every render, but only sets _value if it's empty
    // AND the user hasn't interacted with the input yet
    if (!this._value && this.defaultValue && !this._hasUserInteraction) {
      if (this.type === NUMBER_INPUT_TYPE.TEXT) {
        const parsed = this._numberParser?.parse(this.defaultValue) ?? NaN;
        this._syncTextModeState(parsed, false);
      } else {
        // Set the internal value to defaultValue for non-text types
        this._value = this.defaultValue;
      }
    }
  }

  /**
   * Update formatters when properties change
   */
  // @ts-expect-error - Override to accept changedProperties parameter
  updated(changedProperties: Map<string, unknown>) {
    super.updated?.();
    // Update the DOM input element if formatOptions or locale changed
    if (
      (changedProperties.has('locale') ||
        changedProperties.has('formatOptions')) &&
      this.type === NUMBER_INPUT_TYPE.TEXT &&
      this._input
    ) {
      this._input.value = this._inputValue;
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
    if (this.invalid || this._invalid) {
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
   * @returns true if the value changed, false if it was clamped to the same value
   */
  protected _handleStep(direction: 'up' | 'down'): boolean {
    const currentValue =
      this.type === NUMBER_INPUT_TYPE.NUMBER
        ? Number(this._input.value)
        : this._numberValue;

    let rawValue: number;

    if (
      Number.isNaN(currentValue) ||
      currentValue === null ||
      currentValue === undefined
    ) {
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

    // Check if value actually changed
    const valueChanged = currentValue !== newValue;

    if (this.type === NUMBER_INPUT_TYPE.NUMBER) {
      this._value = String(newValue);
      this.value = this._value;
    } else if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      // Synchronize text mode state after step operation
      this._syncTextModeState(newValue, false);
      this.requestUpdate();
    }

    return valueChanged;
  }

  /**
   * Handles incrementing the value in the input
   */
  stepUp() {
    this._handleStep('up');
  }

  /**
   * Handles decrementing the value in the input
   */
  stepDown() {
    this._handleStep('down');
  }

  protected _getInputValue() {
    if (this.type === NUMBER_INPUT_TYPE.TEXT) {
      // For type="text", use _inputValue directly without falling back to defaultValue
      // defaultValue is only used during initialization (in willUpdate)
      return this._inputValue;
    }

    return this._value || this.defaultValue || '';
  }

  protected _dispatchInputEvent(value: string | number, direction: string) {
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSNumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value,
          direction,
        },
      })
    );
  }

  /**
   * Synchronizes text mode state by formatting a numeric value and updating all related state variables.
   * This centralizes the logic for managing _numberValue, _inputValue, _previousNumberValue, and _value.
   *
   * @param numericValue - The numeric value to format and synchronize
   * @param updateInput - Whether to update the DOM input element (default: false)
   */
  protected _syncTextModeState(
    numericValue: number,
    updateInput: boolean = false
  ) {
    // Format the numeric value
    const formattedValue = isNaN(numericValue)
      ? ''
      : (this._numberFormatter?.format(numericValue) ?? String(numericValue));

    // Parse the formatted value back to ensure consistency
    // (formatting can alter the number, e.g., rounding)
    const parsedValue = formattedValue
      ? (this._numberParser?.parse(formattedValue) ?? numericValue)
      : numericValue;

    // Update all state variables
    this._numberValue = parsedValue;
    this._previousNumberValue = parsedValue;
    this._inputValue = formattedValue;
    this._value = String(parsedValue);

    // Update DOM input if requested
    if (updateInput && this._input) {
      this._input.value = formattedValue;
    }
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
      buttonsDisabled: boolean;
    } = {
      disabled: this.disabled,
      invalid: !this.readonly && !isValid,
      warn: !this.readonly && isValid && this.warn,
      'slot-name': '',
      'slot-text': '',
      icon: null,
      buttonsDisabled: this.disabled || this.readonly,
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

    const inputValue = this._getInputValue();

    const incrementButton = html`
      <button
        class="${prefix}--number__control-btn up-icon"
        aria-label="${this.iconDescription ||
        this.incrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${normalizedProps.buttonsDisabled}
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
        ?disabled=${normalizedProps.buttonsDisabled}
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
        ${validationMessage ?? helper}
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
