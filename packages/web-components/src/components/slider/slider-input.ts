/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import FocusMixin from '../../globals/mixins/focus';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import styles from './slider.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * The `<input>` box for slider.
 *
 * @element cds-slider-input
 * @fires cds-slider-input-changed - The custom event fired after the value is changed by user gesture.
 */
@customElement(`${prefix}-slider-input`)
class CDSSliderInput extends FocusMixin(LitElement) {
  /**
   * The internal value of `max` property.
   */
  private _max = '100';

  /**
   * The internal value of `min` property.
   */
  private _min = '0';

  /**
   * The internal value of `step` property.
   */
  private _step = '1';

  /**
   * Handles `change` event to fire a normalized custom event.
   */
  private _handleChange({ target }: Event) {
    const min = Number(this.min);
    const max = Number(this.max);
    const intermediate = this.value;
    const newValue = (target as HTMLInputElement).value;
    const newValueNumber = Number(newValue);
    if (newValueNumber >= min && newValueNumber <= max && newValue !== '') {
      this.value = newValueNumber;
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSSliderInput).eventChange,
          {
            bubbles: true,
            composed: true,
            detail: {
              value: this.value,
              intermediate,
            },
          }
        )
      );
    } else {
      this.invalid = newValue === '';
      this.warn =
        (newValueNumber < min || newValueNumber > max) && newValue !== '';
      const intermediate = this.value;
      if (newValue !== '') {
        this.value = newValueNumber < min ? min : max;
      } else {
        this.value = '';
      }
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSSliderInput).eventChange,
          {
            bubbles: true,
            composed: true,
            detail: {
              value: this.value,
              intermediate,
            },
          }
        )
      );
    }
  }

  /**
   * Handles `input` event to fire a normalized custom event.
   */
  private _handleInput({ target }: Event) {
    const newValue = (target as HTMLInputElement).value;
    if (newValue) {
      this.value = Number(newValue);
      this.invalid = false;
      if (this.value >= Number(this.min) && this.value <= Number(this.max)) {
        this.warn = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSSliderInput).eventChange,
            {
              bubbles: true,
              composed: true,
              detail: {
                value: this.value,
                intermediate: true,
              },
            }
          )
        );
      }
    }
  }

  /**
   * `true` if the input should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * true to specify if the control is invalid.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * true to specify if the control should display warn icon and text.
   */
  @property({ type: Boolean, reflect: true })
  warn = false;

  /**
   * true to specify if the control should display warn icon and text.
   */
  @property({ type: Boolean })
  hideTextInput = false;

  /**
   * The maximum value.
   */
  @property({ type: Number, reflect: true })
  get max() {
    return this._max.toString();
  }

  set max(value) {
    const { max: oldMax } = this;
    this._max = value;
    this.requestUpdate('max', oldMax);
  }

  /**
   * The minimum value.
   */
  @property({ type: Number, reflect: true })
  get min() {
    return this._min.toString();
  }

  set min(value) {
    const { min: oldMin } = this;
    this._min = value;
    this.requestUpdate('min', oldMin);
  }

  /**
   * The snapping step of the value.
   */
  @property({ type: Number, reflect: true })
  get step() {
    return this._step.toString();
  }

  set step(value) {
    const { step: oldStep } = this;
    this._step = value;
    this.requestUpdate('step', oldStep);
  }

  /**
   * The type of the `<input>`.
   */
  @property()
  type = 'number';

  /**
   * The value.
   */
  @property({ type: Number })
  value;

  /**
   * true` if the input should be readonly.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  render() {
    const {
      disabled,
      hideTextInput,
      max,
      min,
      readonly,
      step,
      type,
      value,
      invalid,
      warn,
      _handleChange: handleChange,
      _handleInput: handleInput,
    } = this;

    const isInteractive = !readonly && !disabled;

    const normalizedProps: {
      invalid: boolean;
      warn: boolean;
    } = {
      invalid: isInteractive && invalid,
      warn: isInteractive && !invalid && warn,
    };

    const classes = classMap({
      [`${prefix}--text-input`]: true,
      [`${prefix}--slider-text-input`]: true,
      [`${prefix}--text-input--invalid`]: normalizedProps.invalid,
      [`${prefix}--slider-text-input--warn`]: normalizedProps.warn,
    });

    const invalidIcon = iconLoader(WarningFilled16, {
      class: `${prefix}--slider__invalid-icon`,
    });

    const warnIcon = iconLoader(WarningAltFilled16, {
      class: `${prefix}--slider__invalid-icon ${prefix}--slider__invalid-icon--warning`,
    });
    return html`
      ${!hideTextInput
        ? html`
            <input
              ?disabled="${disabled}"
              ?data-invalid="${normalizedProps.invalid}"
              type="${ifDefined(type)}"
              class="${classes}"
              max="${max}"
              min="${min}"
              ?readonly="${ifDefined(readonly)}"
              step="${step}"
              .value="${value}"
              @change="${handleChange}"
              @input="${handleInput}" />
            ${normalizedProps.invalid ? html`${invalidIcon}` : null}
            ${normalizedProps.warn ? html`${warnIcon}` : null}
          `
        : null}
    `;
  }

  /**
   * A selector that will return the parent slider.
   */
  static get selectorParent() {
    return `${prefix}-slider`;
  }

  /**
   * The name of the custom event fired after the value is changed by user gesture.
   */
  static get eventChange() {
    return `${prefix}-slider-input-changed`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSSliderInput;
