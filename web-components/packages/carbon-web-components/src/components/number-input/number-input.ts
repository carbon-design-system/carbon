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
import { prefix } from '../../globals/settings';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16';
import Add16 from '@carbon/icons/lib/add/16';
import Subtract16 from '@carbon/icons/lib/subtract/16';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import { NUMBER_INPUT_VALIDATION_STATUS } from './defs';
import styles from './number-input.scss';
import CDSInput, { INPUT_SIZE } from '../input/input';

export { NUMBER_INPUT_VALIDATION_STATUS };

/**
 * Number input.
 *
 * @element cds-number-input
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-number-input`)
class CDSNumberInput extends CDSInput {
  /**
   * Handles `input` event on the `<input>` in the shadow DOM.
   */
  protected _handleInput(event: Event) {
    const { target } = event;
    const { value } = target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSNumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value,
        },
      })
    );
    super._handleInput(event);
  }

  /**
   * Handles `click` event on the up button in the shadow DOM.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _handleUserInitiatedStepDown(_: Event) {
    const { _input: input } = this;
    this.stepDown();
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSNumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: input.value,
        },
      })
    );
  }

  /**
   * Handles `click` event on the down button in the shadow DOM.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _handleUserInitiatedStepUp(_: Event) {
    const { _input: input } = this;
    this.stepUp();
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSNumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: input.value,
        },
      })
    );
  }

  /**
   * The underlying input element
   */
  @query('input')
  protected _input!: HTMLInputElement;

  _getInputValidity() {
    if (this.invalid) {
      return false;
    }
    if (
      this._input?.valueAsNumber > Number(this.max) ||
      this._input?.valueAsNumber < Number(this.min)
    ) {
      return false;
    }
    if (this.value === '') {
      return this.allowEmpty;
    }
    return true;
  }

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
   * The input box size.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.MEDIUM;

  /**
   * Handles incrementing the value in the input
   */
  stepUp() {
    this._input.stepUp();
  }

  /**
   * Handles decrementing the value in the input
   */
  stepDown() {
    this._input.stepDown();
  }

  render() {
    const {
      _handleInput: handleInput,
      _handleUserInitiatedStepDown: handleUserInitiatedStepDown,
      _handleUserInitiatedStepUp: handleUserInitiatedStepUp,
    } = this;

    const isValid = this._getInputValidity();

    const invalidIcon = WarningFilled16({
      class: `${prefix}--number__invalid`,
    });

    const warnIcon = WarningAltFilled16({
      class: `${prefix}--number__invalid ${prefix}--number__invalid--warning`,
    });

    let normalizedProps = {
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

    const incrementButton = html`
      <button
        class="${prefix}--number__control-btn up-icon"
        aria-label="${this.incrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${normalizedProps.disabled}
        @click=${handleUserInitiatedStepUp}>
        ${Add16()}
      </button>
      <div class="${prefix}--number__rule-divider"></div>
    `;
    const decrementButton = html`
      <button
        class="${prefix}--number__control-btn down-icon"
        aria-label="${this.decrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${normalizedProps.disabled}
        @click=${handleUserInitiatedStepDown}>
        ${Subtract16()}
      </button>
      <div class="${prefix}--number__rule-divider"></div>
    `;

    const input = html`
      <input
        ?autocomplete="${this.autocomplete}"
        ?autofocus="${this.autofocus}"
        ?data-invalid="${normalizedProps.invalid}"
        ?disabled="${normalizedProps.disabled}"
        id="input"
        name="${ifNonEmpty(this.name)}"
        pattern="${ifNonEmpty(this.pattern)}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        type="number"
        .value="${this._value}"
        @input="${handleInput}"
        min="${ifNonEmpty(this.min)}"
        max="${ifNonEmpty(this.max)}"
        step="${ifNonEmpty(this.step)}"
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

    return html`
      <div class="${wrapperClasses}" ?data-invalid=${normalizedProps.invalid}>
        <label class="${labelClasses}" for="input">
          <slot name="label-text"> ${this.label} </slot>
        </label>
        <div class="${inputWrapperClasses}">
          ${normalizedProps.icon} ${input}
          <div class="${prefix}--number__controls">
            ${!this.hideSteppers
              ? html`${decrementButton} ${incrementButton}`
              : null}
          </div>
        </div>
        <div
          class="${helperTextClasses}"
          ?hidden="${normalizedProps.invalid || normalizedProps.warn}">
          <slot name="helper-text"> ${this.helperText} </slot>
        </div>
        <div
          class="${prefix}--form-requirement"
          ?hidden="${!normalizedProps.invalid && !normalizedProps.warn}">
          <slot name="${normalizedProps['slot-name']}">
            ${normalizedProps['slot-text']}
          </slot>
        </div>
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
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSNumberInput;
