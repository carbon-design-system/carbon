/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { KeyboardEventHandler, PureComponent } from 'react';
import PropTypes, { ReactNodeLike } from 'prop-types';

import classNames from 'classnames';
import throttle from 'lodash.throttle';
import * as FeatureFlags from '@carbon/feature-flags';

import * as keys from '../../internal/keyboard/keys';
import { matches } from '../../internal/keyboard/match';
import { PrefixContext } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { FeatureFlagContext } from '../FeatureFlags';

const defaultFormatLabel = (value, label) => {
  return typeof label === 'function' ? label(value) : `${value}${label}`;
};

/**
 * Minimum time between processed "drag" events.
 */
const EVENT_THROTTLE = 16; // ms

/**
 * Event types that trigger "drags".
 */
const DRAG_EVENT_TYPES = new Set(['mousemove', 'touchmove']);

/**
 * Event types that trigger a "drag" to stop.
 */
const DRAG_STOP_EVENT_TYPES = new Set(['mouseup', 'touchend', 'touchcancel']);

type ExcludedAttributes = 'onChange' | 'onBlur';
export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ExcludedAttributes
  > {
  /**
   * The `ariaLabel` for the `<input>`.
   */
  ariaLabelInput?: string;

  /**
   * The child nodes.
   */
  children?: ReactNodeLike;

  /**
   * The CSS class name for the slider.
   */
  className?: string;

  /**
   * `true` to disable this slider.
   */
  disabled?: boolean;

  /**
   * The callback to format the label associated with the minimum/maximum value.
   */
  formatLabel?: (value: number, label: string | undefined) => string;

  /**
   * `true` to hide the number input box.
   */
  hideTextInput?: boolean;

  /**
   * The ID of the `<input>`.
   */
  id?: string;

  /**
   * The `type` attribute of the `<input>`.
   */
  inputType?: string;

  /**
   * `true` to specify if the control is invalid.
   */
  invalid?: boolean;

  /**
   * The label for the slider.
   */
  labelText?: ReactNodeLike;

  /**
   * @deprecated
   * `true` to use the light version.
   */
  light?: boolean;

  /**
   * The maximum value.
   */
  max: number;

  /**
   * The label associated with the maximum value.
   */
  maxLabel?: string;

  /**
   * The minimum value.
   */
  min: number;

  /**
   * The label associated with the minimum value.
   */
  minLabel?: string;

  /**
   * The `name` attribute of the `<input>`.
   */
  name?: string;

  /**
   * Provide an optional function to be called when the input element
   * loses focus
   */
  onBlur?: (data: { value: string }) => void;

  /**
   * The callback to get notified of change in value.
   * `({ value}) => void`
  //  * @param {{ value }}
   */
  onChange?: (data: { value: SliderProps['value'] }) => void;

  /**
   * Provide an optional function to be called when a key is pressed in the number input
   */
  onInputKeyUp?: KeyboardEventHandler<HTMLInputElement>;

  /**
   * The callback to get notified of value on handle release.
   */
  onRelease?: (data: { value: SliderProps['value'] }) => void;

  /**
   * Whether the slider should be read-only
   */
  readOnly?: boolean;

  /**
   * `true` to specify if the control is required.
   */
  required?: boolean;

  /**
   * A value determining how much the value should increase/decrease by moving the thumb by mouse. If a value other than 1 is provided and the input is *not* hidden, the new step requirement should be added to a visible label. Values outside of the `step` increment will be considered invalid.
   */
  step?: number;

  /**
   * A value determining how much the value should increase/decrease by Shift+arrow keys,
   * which will be `(max - min) / stepMultiplier`.
   */
  stepMultiplier?: number;

  /**
   * The value.
   */
  value: number;
}

interface CalcValueProps {
  clientX?: number;
  value?: number;
  useRawValue?: boolean;
}

export default class Slider extends PureComponent<SliderProps> {
  static propTypes = {
    /**
     * The `ariaLabel` for the `<input>`.
     */
    ariaLabelInput: PropTypes.string,

    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class name for the slider.
     */
    className: PropTypes.string,

    /**
     * `true` to disable this slider.
     */
    disabled: PropTypes.bool,

    /**
     * The callback to format the label associated with the minimum/maximum value.
     */
    formatLabel: PropTypes.func,

    /**
     * `true` to hide the number input box.
     */
    hideTextInput: PropTypes.bool,

    /**
     * The ID of the `<input>`.
     */
    id: PropTypes.string,

    /**
     * The `type` attribute of the `<input>`.
     */
    inputType: PropTypes.string,

    /**
     * `true` to specify if the control is invalid.
     */
    invalid: PropTypes.bool,

    /**
     * The label for the slider.
     */
    labelText: PropTypes.node,

    /**
     * `true` to use the light version.
     */
    light: deprecate(
      PropTypes.bool,
      'The `light` prop for `Slider` is no longer needed and has ' +
        'been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.'
    ),

    /**
     * The maximum value.
     */
    max: PropTypes.number.isRequired,

    /**
     * The label associated with the maximum value.
     */
    maxLabel: PropTypes.string,

    /**
     * The minimum value.
     */
    min: PropTypes.number.isRequired,

    /**
     * The label associated with the minimum value.
     */
    minLabel: PropTypes.string,

    /**
     * The `name` attribute of the `<input>`.
     */
    name: PropTypes.string,

    /**
     * Provide an optional function to be called when the input element
     * loses focus
     */
    onBlur: PropTypes.func,

    /**
     * The callback to get notified of change in value.
     */
    onChange: PropTypes.func,

    /**
     * Provide an optional function to be called when a key is pressed in the number input
     */
    onInputKeyUp: PropTypes.func,

    /**
     * The callback to get notified of value on handle release.
     */
    onRelease: PropTypes.func,

    /**
     * Whether the slider should be read-only
     */
    readOnly: PropTypes.bool,

    /**
     * `true` to specify if the control is required.
     */
    required: PropTypes.bool,

    /**
     * A value determining how much the value should increase/decrease by moving the thumb by mouse. If a value other than 1 is provided and the input is *not* hidden, the new step requirement should be added to a visible label. Values outside of the `step` increment will be considered invalid.
     */
    step: PropTypes.number,

    /**
     * A value determining how much the value should increase/decrease by Shift+arrow keys,
     * which will be `(max - min) / stepMultiplier`.
     */
    stepMultiplier: PropTypes.number,

    /**
     * The value.
     */
    value: PropTypes.number.isRequired,
  };

  static defaultProps = {
    hideTextInput: false,
    step: 1,
    stepMultiplier: 4,
    disabled: false,
    minLabel: '',
    maxLabel: '',
    inputType: 'number',
    ariaLabelInput: FeatureFlags.enabled('enable-v11-release')
      ? undefined
      : 'Slider number input',
    readOnly: false,
  };

  static contextType = FeatureFlagContext;

  state = {
    value: this.props.value,
    left: 0,
    needsOnRelease: false,
    isValid: true,
  };

  thumbRef: React.RefObject<HTMLDivElement>;
  filledTrackRef: React.RefObject<HTMLDivElement>;
  element: HTMLDivElement | null = null;
  inputId = '';
  track: HTMLDivElement | null | undefined;

  constructor(props) {
    super(props);
    this.thumbRef = React.createRef<HTMLDivElement>();
    this.filledTrackRef = React.createRef<HTMLDivElement>();
  }

  /**
   * Sets up initial slider position and value in response to component mount.
   */
  componentDidMount() {
    if (this.element) {
      const { value, left } = this.calcValue({
        useRawValue: true,
      });
      this.setState({ value, left });
    }
  }

  /**
   * Handles firing of `onChange` and `onRelease` callbacks to parent in
   * response to state changes.
   *
   * @param {*} prevProps prevProps
   * @param {*} prevState The previous Slider state, used to see if callbacks
   * should be called.
   */
  componentDidUpdate(prevProps, prevState) {
    // Fire onChange event handler if present, if there's a usable value, and
    // if the value is different from the last one

    if (this.thumbRef.current) {
      this.thumbRef.current.style.left = `${this.state.left}%`;
    }
    if (this.filledTrackRef.current) {
      this.filledTrackRef.current.style.transform = `translate(0%, -50%) scaleX(${
        this.state.left / 100
      })`;
    }
    if (
      prevState.value !== this.state.value &&
      typeof this.props.onChange === 'function'
    ) {
      this.props.onChange({ value: this.state.value });
    }

    // Fire onRelease event handler if present and if needed
    if (
      this.state.needsOnRelease &&
      typeof this.props.onRelease === 'function'
    ) {
      this.props.onRelease({ value: this.state.value });
      // Reset the flag
      this.setState({ needsOnRelease: false });
    }

    // If value from props does not change, do nothing here.
    // Otherwise, do prop -> state sync without "value capping".
    if (
      prevProps.value === this.props.value &&
      prevProps.max === this.props.max &&
      prevProps.min === this.props.min
    ) {
      return;
    }
    this.setState(
      this.calcValue({
        value: this.props.value,
        useRawValue: true,
      })
    );
  }

  /**
   * Synonymous to ECMA2017+ `Math.clamp`.
   *
   * @param {number} val
   * @param {number} min
   * @param {number} max
   *
   * @returns `val` if `max>=val>=min`; `min` if `val<min`; `max` if `val>max`.
   */
  clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
  }

  /**
   * Sets up "drag" event handlers and calls `this.onDrag` in case dragging
   * started on somewhere other than the thumb without a corresponding "move"
   * event.
   *
   * @param {Event} evt The event.
   */
  onDragStart = (evt) => {
    // Do nothing if component is disabled
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    // Register drag stop handlers
    DRAG_STOP_EVENT_TYPES.forEach((element) => {
      this.element?.ownerDocument.addEventListener(element, this.onDragStop);
    });

    // Register drag handlers
    DRAG_EVENT_TYPES.forEach((element) => {
      this.element?.ownerDocument.addEventListener(element, this.onDrag);
    });

    // Perform first recalculation since we probably didn't click exactly in the
    // middle of the thumb
    this.onDrag(evt);
  };

  /**
   * Unregisters "drag" and "drag stop" event handlers and calls sets the flag
   * indicating that the `onRelease` callback should be called.
   */
  onDragStop = () => {
    // Do nothing if component is disabled
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    // Remove drag stop handlers
    DRAG_STOP_EVENT_TYPES.forEach((element) => {
      this.element?.ownerDocument.removeEventListener(element, this.onDragStop);
    });

    // Remove drag handlers
    DRAG_EVENT_TYPES.forEach((element) => {
      this.element?.ownerDocument.removeEventListener(element, this.onDrag);
    });

    // Set needsOnRelease flag so event fires on next update
    this.setState({ needsOnRelease: true, isValid: true });
  };

  /**
   * Handles a "drag" event by recalculating the value/thumb and setting state
   * accordingly.
   *
   * @param {Event} evt The event.
   */
  _onDrag = (evt) => {
    // Do nothing if component is disabled or we have no event
    if (this.props.disabled || this.props.readOnly || !evt) {
      return;
    }

    let clientX;
    if ('clientX' in evt) {
      clientX = evt.clientX;
    } else if (
      'touches' in evt &&
      0 in evt.touches &&
      'clientX' in evt.touches[0]
    ) {
      clientX = evt.touches[0].clientX;
    } else {
      // Do nothing if we have no valid clientX
      return;
    }

    const { value, left } = this.calcValue({ clientX });
    this.setState({ value, left, isValid: true });
  };

  /**
   * Throttles calls to `this._onDrag` by limiting events to being processed at
   * most once every `EVENT_THROTTLE` milliseconds.
   */
  onDrag = throttle(this._onDrag, EVENT_THROTTLE, {
    leading: true,
    trailing: false,
  });

  /**
   * Handles a `keydown` event by recalculating the value/thumb and setting
   * state accordingly.
   *
   * @param {Event} evt The event.
   */
  onKeyDown = (evt) => {
    // Do nothing if component is disabled or we don't have a valid event
    if (this.props.disabled || this.props.readOnly || !('which' in evt)) {
      return;
    }

    let delta = 0;
    if (matches(evt.which, [keys.ArrowDown, keys.ArrowLeft])) {
      delta = -(this.props.step ?? Slider.defaultProps.step);
    } else if (matches(evt.which, [keys.ArrowUp, keys.ArrowRight])) {
      delta = this.props.step ?? Slider.defaultProps.step;
    } else {
      // Ignore keys we don't want to handle
      return;
    }

    // If shift was held, account for the stepMultiplier
    if (evt.shiftKey) {
      const stepMultiplier = this.props.stepMultiplier;
      delta *= stepMultiplier ?? Slider.defaultProps.stepMultiplier;
    }

    Math.floor(
      this.state.value / (this.props.step ?? Slider.defaultProps.step)
    ) * (this.props.step ?? Slider.defaultProps.step);
    const { value, left } = this.calcValue({
      // Ensures custom value from `<input>` won't cause skipping next stepping point with right arrow key,
      // e.g. Typing 51 in `<input>`, moving focus onto the thumb and the hitting right arrow key should yield 52 instead of 54
      value:
        (delta > 0
          ? Math.floor(
              this.state.value / (this.props.step ?? Slider.defaultProps.step)
            ) * (this.props.step ?? Slider.defaultProps.step)
          : this.state.value) + delta,
    });

    this.setState({ value, left, isValid: true });
  };

  /**
   * Provides the two-way binding for the input field of the Slider. It also
   * Handles a change to the input field by recalculating the value/thumb and
   * setting state accordingly.
   *
   * @param {Event} evt The event.
   */

  onChange = (evt) => {
    // Do nothing if component is disabled
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    // Do nothing if we have no valid event, target, or value
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    const targetValue = Number.parseFloat(evt.target.value);

    // Avoid calling calcValue for invalid numbers, but still update the state
    if (isNaN(targetValue)) {
      this.setState({ value: evt.target.value });
    } else {
      const { value, left } = this.calcValue({
        value: targetValue,
        useRawValue: true,
      });
      this.setState({
        value,
        left,
      });
    }
  };

  /**
   * Checks for validity of input value after clicking out of the input. It also
   * Handles state change to isValid state.
   *
   * @param {Event} evt The event.
   */
  onBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    // Do nothing if we have no valid event, target, or value
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    // determine validity of input change after clicking out of input
    const validity = evt.target.checkValidity();
    const { value } = evt.target;

    this.setState({ isValid: validity });
    this.props.onBlur?.({ value });
  };

  /**
   * Calculates a new Slider `value` and `left` (thumb offset) given a `clientX`,
   * `value`, or neither of those.
   * - If `clientX` is specified, it will be used in
   *   conjunction with the Slider's bounding rectangle to calculate the new
   *   values.
   * - If `clientX` is not specified and `value` is, it will be used to
   *   calculate new values as though it were the current value of the Slider.
   * - If neither `clientX` nor `value` are specified, `this.props.value` will
   *   be used to calculate the new values as though it were the current value
   *   of the Slider.
   *
   * @param {object} params
   * @param {number} [params.clientX] Optional clientX value expected to be from
   *   an event fired by one of the Slider's `DRAG_EVENT_TYPES` events.
   * @param {number} [params.value] Optional value use during calculations if
   *   clientX is not provided.
   * @param {boolean} [params.useRawValue=false] `true` to use the given value as-is.
   */

  calcValue = ({ clientX, value, useRawValue = false }: CalcValueProps) => {
    const range = this.props.max - this.props.min;
    const boundingRect = this.element?.getBoundingClientRect?.();
    const totalSteps = range / (this.props.step ?? Slider.defaultProps.step);
    let width = boundingRect ? boundingRect.right - boundingRect.left : 0;

    // Enforce a minimum width of at least 1 for calculations
    if (width <= 0) {
      width = 1;
    }

    // If a clientX is specified, use it to calculate the leftPercent. If not,
    // use the provided value or state's value to calculate it instead.
    let leftPercent;
    if (clientX != null) {
      const leftOffset = clientX - (boundingRect?.left ?? 0);
      leftPercent = leftOffset / width;
    } else {
      if (value == null) {
        value = this.state.value;
      }
      // prevent NaN calculation if the range is 0
      leftPercent = range === 0 ? 0 : (value - this.props.min) / range;
    }

    if (useRawValue) {
      // Adjusts only for min/max of thumb position
      return {
        value,
        left: Math.min(1, Math.max(0, leftPercent)) * 100,
      };
    }

    let steppedValue =
      Math.round(leftPercent * totalSteps) * (this.props.step ?? Slider.defaultProps.step);
    const steppedPercent = this.clamp(steppedValue / range, 0, 1);

    steppedValue = this.clamp(
      steppedValue + this.props.min,
      this.props.min,
      this.props.max
    );

    return { value: steppedValue, left: steppedPercent * 100 };
  };

  // syncs invalid state and prop
  static getDerivedStateFromProps(props, state) {
    const { isValid } = state;
    // will override state in favor of invalid prop
    if (props.invalid === true && isValid === true) {
      return {
        isValid: false,
      };
    }

    if (props.invalid === false && isValid === false) {
      return {
        isValid: true,
      };
    }
    //if invalid prop is not provided, state will remain the same
    return null;
  }

  render() {
    const {
      ariaLabelInput,
      className,
      hideTextInput,
      id = (this.inputId =
        this.inputId ||
        `__carbon-slider_${Math.random().toString(36).substr(2)}`),
      min,
      minLabel,
      max,
      maxLabel,
      formatLabel = defaultFormatLabel,
      labelText,
      step,
      stepMultiplier: _stepMultiplier,
      inputType,
      required,
      disabled,
      name,
      light,
      readOnly,
      ...other
    } = this.props;

    delete other.onRelease;
    delete other.invalid;

    const { value, isValid } = this.state;

    const scope = this.context;
    let enabled;

    if (scope.enabled) {
      enabled = scope.enabled('enable-v11-release');
    }

    return (
      <PrefixContext.Consumer>
        {(prefix) => {
          const labelId = `${id}-label`;
          const labelClasses = classNames(`${prefix}--label`, {
            [`${prefix}--label--disabled`]: disabled,
          });

          const sliderClasses = classNames(
            `${prefix}--slider`,
            { [`${prefix}--slider--disabled`]: disabled },
            { [`${prefix}--slider--readonly`]: readOnly },
            [enabled ? null : className]
          );

          const inputClasses = classNames(
            `${prefix}--text-input`,
            `${prefix}--slider-text-input`,
            {
              [`${prefix}--text-input--light`]: light,
              [`${prefix}--text-input--invalid`]: isValid === false,
              [`${prefix}--slider-text-input--hidden`]: hideTextInput,
            }
          );

          return (
            <div
              className={
                enabled
                  ? classNames(`${prefix}--form-item`, className)
                  : `${prefix}--form-item`
              }>
              <label htmlFor={id} className={labelClasses} id={labelId}>
                {labelText}
              </label>
              <div className={`${prefix}--slider-container`}>
                <span className={`${prefix}--slider__range-label`}>
                  {formatLabel(min, minLabel)}
                </span>
                {/* @ts-ignore onBlur + onChange types are incompatible*/}
                <div
                  className={sliderClasses}
                  ref={(node) => {
                    this.element = node;
                  }}
                  onMouseDown={this.onDragStart}
                  onTouchStart={this.onDragStart}
                  onKeyDown={this.onKeyDown}
                  role="presentation"
                  tabIndex={-1}
                  data-invalid={isValid ? null : true}
                  {...other}>
                  <div
                    className={`${prefix}--slider__thumb`}
                    role="slider"
                    id={id}
                    tabIndex={!readOnly ? 0 : -1}
                    aria-valuemax={max}
                    aria-valuemin={min}
                    aria-valuenow={value}
                    aria-labelledby={labelId}
                    ref={this.thumbRef}
                  />
                  <div
                    className={`${prefix}--slider__track`}
                    ref={(node) => {
                      this.track = node;
                    }}
                  />
                  <div
                    className={`${prefix}--slider__filled-track`}
                    ref={this.filledTrackRef}
                  />
                </div>
                <span className={`${prefix}--slider__range-label`}>
                  {formatLabel(max, maxLabel)}
                </span>
                <input
                  type={hideTextInput ? 'hidden' : inputType}
                  id={`${id}-input-for-slider`}
                  name={name}
                  className={inputClasses}
                  value={value}
                  aria-labelledby={!ariaLabelInput ? labelId : undefined}
                  aria-label={ariaLabelInput ? ariaLabelInput : undefined}
                  disabled={disabled}
                  required={required}
                  min={min}
                  max={max}
                  step={step}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  onKeyUp={this.props.onInputKeyUp}
                  data-invalid={isValid ? null : true}
                  aria-invalid={isValid ? undefined : true}
                  readOnly={readOnly}
                />
              </div>
            </div>
          );
        }}
      </PrefixContext.Consumer>
    );
  }
}