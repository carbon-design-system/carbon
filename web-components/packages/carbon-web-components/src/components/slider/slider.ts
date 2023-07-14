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
import throttle from 'lodash-es/throttle';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import FormMixin from '../../globals/mixins/form';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import CDSSliderInput from './slider-input';
import styles from './slider.scss';

interface Cancelable {
  cancel(): void;
}

/**
 * The direction to move the thumb, associated with key symbols.
 */
const THUMB_DIRECTION = {
  Left: -1,
  ArrowLeft: -1,
  Up: -1,
  ArrowUp: -1,
  Right: 1,
  ArrowRight: 1,
  Down: 1,
  ArrowDown: 1,
};

/**
 * Slider.
 *
 * @element cds-slider
 * @slot label-text - The label text.
 * @slot max-text - The text for maximum value.
 * @slot min-text - The text for minimum value.
 * @fires cds-slider-changed - The custom event fired after the value is changed by user gesture.
 */
@customElement(`${prefix}-slider`)
class CDSSlider extends HostListenerMixin(FormMixin(FocusMixin(LitElement))) {
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
   * The internal value of `stepMultiplier` property.
   */
  private _stepMultiplier = '4';

  /**
   * The handle for the throttled listener of `pointermove` event.
   */
  private _throttledHandlePointermoveImpl:
    | (((event: PointerEvent) => void) & Cancelable)
    | null = null;

  /**
   * `true` if dragging of thumb is in progress.
   */
  private _dragging = false;

  /**
   * The rate of the thumb position in the track.
   * When we try to set a new value, we adjust the value considering `step` property.
   */
  private get _rate() {
    const { max, min, value } = this;
    // Copes with out-of-range value coming programmatically or from `<cds-slider-input>`
    return (
      (Math.min(Number(max), Math.max(Number(min), value)) - Number(min)) /
      (Number(max) - Number(min))
    );
  }

  private set _rate(rate: number) {
    const { max, min, step } = this;
    this.value =
      Number(min) +
      Math.round(
        ((Number(max) - Number(min)) * Math.min(1, Math.max(0, rate))) /
          Number(step)
      ) *
        Number(step);
  }

  /**
   * The DOM element of the thumb.
   */
  @query('#thumb')
  private _thumbNode!: HTMLDivElement;

  /**
   * The DOM element of the track.
   */
  @query('#track')
  private _trackNode!: HTMLDivElement;

  /**
   * Handles `click` event on the `<label>` to focus on the thumb.
   */
  _handleClickLabel() {
    this._thumbNode?.focus();
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, String(value));
    }
  }

  /**
   * Handles `keydown` event on the thumb to increase/decrease the value.
   */
  private _handleKeydown({ key, shiftKey }: KeyboardEvent) {
    if (!this.disabled) {
      if (key in THUMB_DIRECTION) {
        const {
          max: rawMax,
          min: rawMin,
          step: rawStep,
          stepMultiplier: rawstepMultiplier,
          value,
        } = this;
        const max = Number(rawMax);
        const min = Number(rawMin);
        const step = Number(rawStep);
        const stepMultiplier = Number(rawstepMultiplier);
        const diff =
          (!shiftKey ? step : (max - min) / stepMultiplier) *
          THUMB_DIRECTION[key];
        const stepCount = (value + diff) / step;
        // Snaps to next
        this.value = Math.min(
          max,
          Math.max(
            min,
            (diff >= 0 ? Math.floor(stepCount) : Math.ceil(stepCount)) * step
          )
        );
        this.dispatchEvent(
          new CustomEvent((this.constructor as typeof CDSSlider).eventChange, {
            bubbles: true,
            composed: true,
            detail: {
              value: this.value,
              intermediate: false,
            },
          })
        );
      }
    }
  }

  /**
   * Handles `pointerdown` event on the thumb to start dragging.
   */
  private _startDrag() {
    this._dragging = true;
    this._thumbNode.style.touchAction = 'none';
  }

  /**
   * Handles `pointerdown` event on the track to update the thumb position and the value as necessary.
   */
  private _handleClick(event: PointerEvent) {
    if (!this.disabled) {
      const { _trackNode: trackNode } = this;
      const isRtl =
        trackNode
          .ownerDocument!.defaultView!.getComputedStyle(trackNode)
          .getPropertyValue('direction') === 'rtl';
      const thumbPosition = event.clientX;
      const { left: trackLeft, width: trackWidth } =
        trackNode.getBoundingClientRect();
      this._rate =
        (isRtl
          ? trackLeft + trackWidth - thumbPosition
          : thumbPosition - trackLeft) / trackWidth;
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof CDSSlider).eventChange, {
          bubbles: true,
          composed: true,
          detail: {
            value: this.value,
          },
        })
      );
    }
  }

  /**
   * Handles `pointermove` to update the thumb position and the value as necessary.
   *
   * @param event The event.
   */
  @HostListener('document:pointermove')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handlePointermove = (event: PointerEvent) => {
    const { disabled, _dragging: dragging } = this;
    if (!disabled && dragging) {
      this._throttledHandlePointermoveImpl!(event);
    }
  };

  /**
   * Updates thumb position and value upon user's `pointermove` gesture.
   *
   * @param event The event.
   */
  private _handlePointermoveImpl(event: PointerEvent) {
    const { disabled, _dragging: dragging, _trackNode: trackNode } = this;
    if (!disabled && dragging) {
      const isRtl =
        trackNode
          .ownerDocument!.defaultView!.getComputedStyle(trackNode)
          .getPropertyValue('direction') === 'rtl';
      const thumbPosition = event.clientX;
      const { left: trackLeft, width: trackWidth } =
        this._trackNode.getBoundingClientRect();
      this._rate =
        (isRtl
          ? trackLeft + trackWidth - thumbPosition
          : thumbPosition - trackLeft) / trackWidth;
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof CDSSlider).eventChange, {
          bubbles: true,
          composed: true,
          detail: {
            value: this.value,
            intermediate: true,
          },
        })
      );
    }
  }

  /**
   * Handles `pointerup` and `pointerleave` event to finishing dragging.
   */
  private _endDrag = () => {
    if (this._dragging) {
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof CDSSlider).eventChange, {
          bubbles: true,
          composed: true,
          detail: {
            value: this.value,
          },
        })
      );
      this._dragging = false;
      this._thumbNode.style.touchAction = '';
    }
  };

  /**
   * Handles `${prefix}-slider-input-changed` event to update the value.
   */
  @HostListener('eventChangeInput')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleChangeInput = ({ detail }: CustomEvent) => {
    const { intermediate, value } = detail;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSSlider).eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          value,
          intermediate,
        },
      })
    );
  };

  /**
   * `true` if the check box should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * 	true to specify if the control is required.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * 	Whether the slider should be read-only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The label associated with the maximum value.
   */
  @property({ attribute: 'max-label', reflect: true })
  maxLabel = '';

  /**
   * The label associated with the minimum value.
   */
  @property({ attribute: 'min-label', reflect: true })
  minLabel = '';

  /**
   * The formatter for the text for maximum value.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatMaxText = (max: string, maxLabel: string | undefined) =>
    `${max}${maxLabel}`;

  /**
   * The formatter for the text for min/max value.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatMinText = (min: string, minLabel: string | undefined) =>
    `${min}${minLabel}`;

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
   * The form name.
   */
  @property()
  name!: string;

  /**
   * true to specify if the control is invalid.
   */
  @property({ type: Boolean })
  invalid = false;

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
   * A value determining how much the value should increase/decrease by Shift+arrow keys,
   * which will be `(max - min) / stepMultiplier`.
   */
  @property({ type: Number, reflect: true, attribute: 'step-multiplier' })
  get stepMultiplier() {
    return this._stepMultiplier.toString();
  }

  set stepMultiplier(value) {
    const { stepMultiplier: oldstepMultiplier } = this;
    this._stepMultiplier = value;
    this.requestUpdate('stepMultiplier', oldstepMultiplier);
  }

  /**
   * The value.
   */
  @property({ type: Number })
  value;

  connectedCallback() {
    super.connectedCallback();
    if (!this._throttledHandlePointermoveImpl) {
      this._throttledHandlePointermoveImpl = throttle(
        this._handlePointermoveImpl,
        10
      );
    }
  }

  disconnectedCallback() {
    if (this._throttledHandlePointermoveImpl) {
      this._throttledHandlePointermoveImpl.cancel();
      this._throttledHandlePointermoveImpl = null;
    }
    super.disconnectedCallback();
  }

  shouldUpdate(changedProperties) {
    const input = this.querySelector(
      (this.constructor as typeof CDSSlider).selectorInput
    ) as CDSSliderInput;
    if (changedProperties.has('disabled')) {
      if (input) {
        input.disabled = this.disabled;
      }
      if (this.disabled) {
        this._dragging = false;
      }
    }
    if (changedProperties.has('readonly')) {
      if (input) {
        input.readonly = this.readonly;
      }
      if (this.readonly) {
        this._dragging = false;
      }
    }
    if (input) {
      ['max', 'min', 'step', 'value'].forEach((name) => {
        if (changedProperties.has(name)) {
          input[name] = this[name];
        }
      });

      if (changedProperties.has('value') || changedProperties.has('invalid')) {
        if (this.value < this.min || this.value > this.max || this.invalid) {
          input.invalid = true;
        } else {
          input.invalid = false;
        }
      }
    }
    return true;
  }

  render() {
    const {
      disabled,
      formatMaxText,
      formatMinText,
      labelText,
      max,
      min,
      maxLabel,
      minLabel,
      value,
      readonly,
      _rate: rate,
      _handleClickLabel: handleClickLabel,
      _handleKeydown: handleKeydown,
      _handleClick: handleClick,
      _startDrag: startDrag,
      _endDrag: endDrag,
    } = this;
    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: disabled,
    });
    const sliderClasses = classMap({
      [`${prefix}--slider`]: true,
      [`${prefix}--slider--disabled`]: disabled,
      [`${prefix}--slider--readonly`]: readonly,
    });
    return html`
      <label class="${labelClasses}" @click="${handleClickLabel}">
        <slot name="label-text">${labelText}</slot>
      </label>
      <div class="${prefix}--slider-container">
        <span class="${prefix}--slider__range-label">
          <slot name="min-text">${formatMinText(min, minLabel)}</slot>
        </span>
        <div
          @keydown="${handleKeydown}"
          @click="${handleClick}"
          @pointerup="${endDrag}"
          @pointerleave="${endDrag}"
          class="${sliderClasses}"
          tabindex="-1"
          role="presentation">
          <div
            id="thumb"
            class="${prefix}--slider__thumb"
            role="slider"
            tabindex="${!readonly ? 0 : -1}"
            aria-valuemax="${max}"
            aria-valuemin="${min}"
            aria-valuenow="${value}"
            style="left: ${rate * 100}%"
            @pointerdown="${startDrag}"></div>
          <div id="track" class="${prefix}--slider__track"></div>
          <div class="${prefix}-ce--slider__filled-track-container">
            <div
              class="${prefix}--slider__filled-track"
              style="transform: translate(0%, -50%) scaleX(${rate})"></div>
          </div>
        </div>
        <span class="${prefix}--slider__range-label">
          <slot name="max-text">${formatMaxText(max, maxLabel)}</slot>
        </span>
        <slot></slot>
      </div>
    `;
  }

  /**
   * A selector that will return the `<input>` box got entering the value directly.
   */
  static get selectorInput() {
    return `${prefix}-slider-input`;
  }

  /**
   * The name of the custom event fired after the value is changed by user gesture.
   */
  static get eventChange() {
    return `${prefix}-slider-changed`;
  }

  /**
   * The name of the custom event fired after the value is changed in `<cds-slider-input>` by user gesture.
   */
  static get eventChangeInput() {
    return `${prefix}-slider-input-changed`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSSlider;
