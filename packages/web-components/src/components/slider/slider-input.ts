/**
 * @license
 *
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
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16.js';
import FocusMixin from '../../globals/mixins/focus';
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
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSSliderInput).eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          value: Number((target as HTMLInputElement).value),
        },
      })
    );
  }

  /**
   * Handles `input` event to fire a normalized custom event.
   */
  private _handleInput({ target }: Event) {
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSSliderInput).eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          value: Number((target as HTMLInputElement).value),
          intermediate: true,
        },
      })
    );
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
  value!: number;

  /**
   * true` if the input should be readonly.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  render() {
    const {
      disabled,
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

    const classes = classMap({
      [`${prefix}--text-input`]: true,
      [`${prefix}--slider-text-input`]: true,
      [`${prefix}--text-input--invalid`]: invalid,
      [`${prefix}--slider-text-input--warn`]: warn,
    });

    const invalidIcon = WarningFilled16({
      class: `${prefix}--slider__invalid-icon`,
    });

    const warnIcon = WarningAltFilled16({
      class: `${prefix}--slider__invalid-icon ${prefix}--slider__invalid-icon--warning`,
    });

    return html`
      <input
        ?disabled="${disabled}"
        ?data-invalid="${invalid}"
        type="${ifDefined(type)}"
        class="${classes}"
        max="${max}"
        min="${min}"
        ?readonly="${ifDefined(readonly)}"
        step="${step}"
        .value="${value}"
        @change="${handleChange}"
        @input="${handleInput}" />
      ${invalid ? html`${invalidIcon}` : null}
      ${warn ? html`${warnIcon}` : null}
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
