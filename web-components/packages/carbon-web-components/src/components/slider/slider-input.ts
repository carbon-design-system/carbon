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
import { property, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import { SLIDER_INPUT_COLOR_SCHEME } from './defs';
import styles from './slider.scss';

export { SLIDER_INPUT_COLOR_SCHEME };

/**
 * The `<input>` box for slider.
 *
 * @element cds-slider-input
 * @fires cds-slider-input-changed - The custom event fired after the value is changed by user gesture.
 */
@customElement(`${prefix}-slider-input`)
class BXSliderInput extends FocusMixin(LitElement) {
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
      new CustomEvent((this.constructor as typeof BXSliderInput).eventChange, {
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
      new CustomEvent((this.constructor as typeof BXSliderInput).eventChange, {
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
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = SLIDER_INPUT_COLOR_SCHEME.REGULAR;

  /**
   * `true` if the check box should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

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

  render() {
    const {
      colorScheme,
      disabled,
      max,
      min,
      step,
      type,
      value,
      _handleChange: handleChange,
      _handleInput: handleInput,
    } = this;
    // NOTE: Our React variant has an option to add `invalid` option here,
    // but there doesn't seem a corresponding style to the thumb.
    // Because of that, in addition to the mininum/maximum constraint enforced,
    // the code here start without `invalid` styling option for now.
    const classes = classMap({
      [`${prefix}--text-input`]: true,
      [`${prefix}--slider-text-input`]: true,
      [`${prefix}--text-input--${colorScheme}`]: colorScheme,
    });
    return html`
      <input
        ?disabled="${disabled}"
        type="${ifDefined(type)}"
        class="${classes}"
        max="${max}"
        min="${min}"
        step="${step}"
        .value="${value}"
        @change="${handleChange}"
        @input="${handleInput}" />
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

export default BXSliderInput;
