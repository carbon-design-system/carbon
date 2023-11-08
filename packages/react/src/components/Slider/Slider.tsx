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

import * as keys from '../../internal/keyboard/keys';
import { matches } from '../../internal/keyboard';
import { PrefixContext } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { FeatureFlagContext } from '../FeatureFlags';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { Text } from '../Text';

const LowerHandle = () => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--lower`}>
        <path d="M15.08 6.46H16v11.08h-.92zM4.46 17.54c-.25 0-.46-.21-.46-.46V6.92a.465.465 0 0 1 .69-.4l8.77 5.08a.46.46 0 0 1 0 .8l-8.77 5.08c-.07.04-.15.06-.23.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);

const LowerHandleFocus = () => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--lower ${prefix}--slider__thumb-icon--focus`}>
        <path d="M15.08 6.46H16v11.08h-.92zM4.46 17.54c-.25 0-.46-.21-.46-.46V6.92a.465.465 0 0 1 .69-.4l8.77 5.08a.46.46 0 0 1 0 .8l-8.77 5.08c-.07.04-.15.06-.23.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
        <path d="M15.08 0H16v6.46h-.92z" />
        <path d="M0 0h.92v24H0zM15.08 0H16v24h-.92z" />
        <path d="M0 .92V0h16v.92zM0 24v-.92h16V24z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);

const UpperHandle = () => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--upper`}>
        <path d="M0 6.46h.92v11.08H0zM11.54 6.46c.25 0 .46.21.46.46v10.15a.465.465 0 0 1-.69.4L2.54 12.4a.46.46 0 0 1 0-.8l8.77-5.08c.07-.04.15-.06.23-.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);

const UpperHandleFocus = () => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--upper ${prefix}--slider__thumb-icon--focus`}>
        <path d="M0 6.46h.92v11.08H0zM11.54 6.46c.25 0 .46.21.46.46v10.15a.465.465 0 0 1-.69.4L2.54 12.4a.46.46 0 0 1 0-.8l8.77-5.08c.07-.04.15-.06.23-.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
        <path d="M.92 24H0v-6.46h.92z" />
        <path d="M16 24h-.92V0H16zM.92 24H0V0h.92z" />
        <path d="M16 23.08V24H0v-.92zM16 0v.92H0V0z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);

const translationIds = {
  autoCorrectAnnouncement: 'carbon.slider.auto-correct-announcement',
};

function translateWithId(
  translationId,
  translationState?: { correctedValue?: string }
) {
  if (
    translationId === translationIds.autoCorrectAnnouncement &&
    translationState?.correctedValue
  ) {
    const { correctedValue } = translationState;
    return `The inputted value "${correctedValue}" was corrected to the nearest allowed digit.`;
  }
  return '';
}

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

/**
 * Distinguish two handles by lower and upper positions.
 */
enum HandlePosition {
  LOWER = 'lower',
  UPPER = 'upper',
}

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
   * The `ariaLabel` for the upper bound `<input>` and handle when there are two handles.
   */
  unstable_ariaLabelInputUpper?: string;

  /**
   * The child nodes.
   */
  children?: ReactNodeLike;

  /**
   * The CSS class name for the slider, set on the wrapping div.
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
   * `Specify whether the Slider is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the Slider is in an invalid state
   */
  invalidText?: React.ReactNode;

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
   * The `name` attribute of the upper bound `<input>` when there are two handles.
   */
  unstable_nameUpper?: string;

  /**
   * Provide an optional function to be called when the input element
   * loses focus
   */
  onBlur?: (data: {
    value: string;
    handlePosition: HandlePosition | undefined;
  }) => void;

  /**
   * The callback to get notified of change in value.
   * `({ value: number, valueUpper?: number }) => void`
   */
  onChange?: (data: {
    value: SliderProps['value'];
    valueUpper: SliderProps['unstable_valueUpper'];
  }) => void;

  /**
   * Provide an optional function to be called when a key is pressed in the number input. When there are two handles, you can obtain the relevant handle position by using `event.target.dataset.handlePosition`.
   */
  onInputKeyUp?: KeyboardEventHandler<HTMLInputElement>;

  /**
   * The callback to get notified of value on handle release.
   */
  onRelease?: (data: {
    value: SliderProps['value'];
    valueUpper: SliderProps['unstable_valueUpper'];
  }) => void;

  /**
   * Whether the slider should be read-only
   */
  readOnly?: boolean;

  /**
   * `true` to specify if the control is required.
   */
  required?: boolean;

  /**
   * A value determining how much the value should increase/decrease by moving the thumb by mouse. If a value other than 1 is provided and the input is *not* hidden, the new step requirement should be added to a visible label. Values outside the `step` increment will be considered invalid.
   */
  step?: number;

  /**
   * A value determining how much the value should increase/decrease by Shift+arrow keys,
   * which will be `(max - min) / stepMultiplier`.
   */
  stepMultiplier?: number;

  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are available on the `translationIds` field for
   * this component.
   */
  translateWithId?: (
    translationId: string,
    translationState: { correctedValue?: string }
  ) => string;

  /**
   * The value of the slider. When there are two handles, value is the lower
   * bound.
   */
  value: number;

  /**
   * The upper bound when there are two handles.
   */
  unstable_valueUpper?: number;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

interface CalcValueProps {
  clientX?: number;
  value?: number;
  useRawValue?: boolean;
}

interface CalcLeftPercentProps {
  clientX?: number;
  value?: number;
  range?: number;
}

class Slider extends PureComponent<SliderProps> {
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
     * `Specify whether the Slider is currently invalid
     */
    invalid: PropTypes.bool,

    /**
     * Provide the text that is displayed when the Slider is in an invalid state
     */
    invalidText: PropTypes.node,

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
     * A value determining how much the value should increase/decrease by moving the thumb by mouse. If a value other than 1 is provided and the input is *not* hidden, the new step requirement should be added to a visible label. Values outside the `step` increment will be considered invalid.
     */
    step: PropTypes.number,

    /**
     * A value determining how much the value should increase/decrease by Shift+arrow keys,
     * which will be `(max - min) / stepMultiplier`.
     */
    stepMultiplier: PropTypes.number,

    /**
     * Supply a method to translate internal strings with your i18n tool of
     * choice. Translation keys are available on the `translationIds` field for
     * this component.
     */
    translateWithId: PropTypes.func,

    /**
     * The `ariaLabel` for the upper bound `<input>` when there are two handles.
     */
    unstable_ariaLabelInputUpper: PropTypes.string,

    /**
     * The `name` attribute of the upper bound `<input>` when there are two handles.
     */
    unstable_nameUpper: PropTypes.string,

    /**
     * The upper bound when there are two handles.
     */
    unstable_valueUpper: PropTypes.number,

    /**
     * The value of the slider. When there are two handles, value is the lower
     * bound.
     */
    value: PropTypes.number.isRequired,

    /**
     * `Specify whether the Slider is in a warn state
     */
    warn: PropTypes.bool,

    /**
     * Provide the text that is displayed when the Slider is in a warn state
     */
    warnText: PropTypes.node,
  };

  static contextType = FeatureFlagContext;

  state = {
    value: this.props.value,
    valueUpper: this.props.unstable_valueUpper,
    left: 0,
    leftUpper: 0,
    needsOnRelease: false,
    isValid: true,
    isValidUpper: true,
    activeHandle: null,
    correctedValue: null,
    correctedPosition: null,
    isRtl: false,
  };

  thumbRef: React.RefObject<HTMLDivElement>;
  thumbRefUpper: React.RefObject<HTMLDivElement>;
  filledTrackRef: React.RefObject<HTMLDivElement>;
  element: HTMLDivElement | null = null;
  inputId = '';
  track: HTMLDivElement | null | undefined;

  constructor(props) {
    super(props);
    this.thumbRef = React.createRef<HTMLDivElement>();
    this.thumbRefUpper = React.createRef<HTMLDivElement>();
    this.filledTrackRef = React.createRef<HTMLDivElement>();
  }

  /**
   * Sets up initial slider position and value in response to component mount.
   */
  componentDidMount() {
    if (this.element) {
      const isRtl = document?.dir === 'rtl';
      if (this.hasTwoHandles()) {
        const { value, left } = this.calcValue({
          value: this.state.value,
          useRawValue: true,
        });
        const { value: valueUpper, left: leftUpper } = this.calcValue({
          value: this.state.valueUpper,
          useRawValue: true,
        });
        this.setState({ isRtl, value, left, valueUpper, leftUpper });
      } else {
        const { value, left } = this.calcValue({
          value: this.state.value,
          useRawValue: true,
        });
        this.setState({ isRtl, value, left });
      }
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
    if (this.hasTwoHandles()) {
      if (this.thumbRef.current) {
        this.thumbRef.current.style.insetInlineStart = `${this.state.left}%`;
        if (this.state.isRtl) {
          this.thumbRef.current.style.transform = `translate(100%, -50%)`;
        }
      }
      if (this.thumbRefUpper.current) {
        this.thumbRefUpper.current.style.insetInlineStart = `${this.state.leftUpper}%`;
      }
      if (this.filledTrackRef.current) {
        this.filledTrackRef.current.style.transform = this.state.isRtl
          ? `translate(${100 - this.state.leftUpper}%, -50%) scaleX(${
              (this.state.leftUpper - this.state.left) / 100
            })`
          : `translate(${this.state.left}%, -50%) scaleX(${
              (this.state.leftUpper - this.state.left) / 100
            })`;
      }
    } else {
      if (this.thumbRef.current) {
        this.thumbRef.current.style.insetInlineStart = this.state.isRtl
          ? `calc(${this.state.left}% - 14px)`
          : `${this.state.left}%`;
      }
      if (this.filledTrackRef.current) {
        this.filledTrackRef.current.style.transform = this.state.isRtl
          ? `translate(100%, -50%) scaleX(-${this.state.left / 100})`
          : `translate(0%, -50%) scaleX(${this.state.left / 100})`;
      }
    }
    if (
      (prevState.value !== this.state.value ||
        prevState.valueUpper !== this.state.valueUpper) &&
      typeof this.props.onChange === 'function'
    ) {
      this.props.onChange({
        value: this.state.value,
        valueUpper: this.state.valueUpper,
      });
    }

    // Fire onRelease event handler if present and if needed
    if (
      this.state.needsOnRelease &&
      typeof this.props.onRelease === 'function'
    ) {
      this.props.onRelease({
        value: this.state.value,
        valueUpper: this.state.valueUpper,
      });
      // Reset the flag
      this.setState({ needsOnRelease: false });
    }

    // If value from props does not change, do nothing here.
    // Otherwise, do prop -> state sync without "value capping".
    if (
      prevProps.value === this.props.value &&
      prevProps.unstable_valueUpper === this.props.unstable_valueUpper &&
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
    if (this.props.unstable_valueUpper !== undefined) {
      const { value: valueUpper, left: leftUpper } = this.calcValue({
        value: this.props.unstable_valueUpper,
        useRawValue: true,
      });
      this.setState({
        valueUpper,
        leftUpper,
      });
    } else {
      this.setState({ valueUpper: undefined, leftUpper: undefined });
    }
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
   * Takes a value and ensures it fits to the steps of the range
   * @param value
   * @returns value of the nearest step
   */
  nearestStepValue(value) {
    const tempInput = document.createElement('input');

    tempInput.type = 'range';
    tempInput.min = `${this.props.min}`;
    tempInput.max = `${this.props.max}`;
    tempInput.step = `${this.props.step}`;
    tempInput.value = `${value}`;

    return parseFloat(tempInput.value);
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

    const clientX = this.getClientXFromEvent(evt);

    let activeHandle;
    if (this.hasTwoHandles()) {
      const distanceToLower = this.calcDistanceToHandle(
        HandlePosition.LOWER,
        clientX
      );
      const distanceToUpper = this.calcDistanceToHandle(
        HandlePosition.UPPER,
        clientX
      );
      if (distanceToLower <= distanceToUpper) {
        activeHandle = HandlePosition.LOWER;
      } else {
        activeHandle = HandlePosition.UPPER;
      }
    }
    this.setState({ activeHandle });

    // Perform first recalculation since we probably didn't click exactly in the
    // middle of the thumb.
    this.onDrag(evt, activeHandle);
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

    // Set needsOnRelease flag so event fires on next update.
    this.setState({
      needsOnRelease: true,
      isValid: true,
      isValidUpper: true,
    });
  };

  /**
   * Handles a "drag" event by recalculating the value/thumb and setting state
   * accordingly.
   *
   * @param {Event} evt The event.
   * @param activeHandle
   *   The first drag event call, we may have an explicit activeHandle value,
   *   which is to be used before state is used.
   */
  _onDrag = (evt, activeHandle: HandlePosition | null = null) => {
    activeHandle = activeHandle ?? this.state.activeHandle;
    // Do nothing if component is disabled, or we have no event.
    if (this.props.disabled || this.props.readOnly || !evt) {
      return;
    }

    const clientX = this.getClientXFromEvent(evt);

    const { value, left } = this.calcValue({
      clientX,
      value: this.state.value,
    });
    // If we're set to two handles, negotiate which drag handle is closest to
    // the users' interaction.
    if (this.hasTwoHandles() && activeHandle) {
      this.setValueLeftForHandle(activeHandle, {
        value: this.nearestStepValue(value),
        left,
      });
    } else {
      this.setState({
        value: this.nearestStepValue(value),
        left,
        isValid: true,
      });
    }
    this.setState({ correctedValue: null, correctedPosition: null });
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
    // Do nothing if component is disabled, or we don't have a valid event
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    const { step = 1, stepMultiplier = 4 } = this.props;

    let delta = 0;
    if (matches(evt, [keys.ArrowDown, keys.ArrowLeft])) {
      delta = -step;
    } else if (matches(evt, [keys.ArrowUp, keys.ArrowRight])) {
      delta = step;
    } else {
      // Ignore keys we don't want to handle
      return;
    }

    // If shift was held, account for the stepMultiplier
    if (evt.shiftKey) {
      delta *= stepMultiplier;
    }

    if (this.hasTwoHandles() && this.state.activeHandle) {
      const currentValue =
        this.state.activeHandle === HandlePosition.LOWER
          ? this.state.value
          : this.state.valueUpper;
      const { value, left } = this.calcValue({
        value: this.calcValueForDelta(currentValue, delta, this.props.step),
      });
      this.setValueLeftForHandle(this.state.activeHandle, {
        value: this.nearestStepValue(value),
        left,
      });
    } else {
      const { value, left } = this.calcValue({
        // Ensures custom value from `<input>` won't cause skipping next stepping
        // point with right arrow key, e.g. Typing 51 in `<input>`, moving focus
        // onto the thumb and the hitting right arrow key should yield 52 instead
        // of 54.
        value: this.calcValueForDelta(this.state.value, delta, this.props.step),
      });
      this.setState({
        value: this.nearestStepValue(value),
        left,
        isValid: true,
      });
    }

    this.setState({ correctedValue: null, correctedPosition: null });
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

    // Avoid calling calcValue for invalid numbers, but still update the state.
    const activeHandle =
      evt.target.dataset.handlePosition ?? HandlePosition.LOWER;
    const targetValue = Number.parseFloat(evt.target.value);

    if (this.hasTwoHandles()) {
      if (isNaN(targetValue)) {
        this.setValueForHandle(activeHandle, evt.target.value);
      } else if (
        this.isValidValueForPosition({
          handle: activeHandle,
          value: targetValue,
          min: this.props.min,
          max: this.props.max,
        })
      ) {
        this.processNewInputValue(evt.target);
      } else {
        this.setValueForHandle(activeHandle, targetValue);
      }
    } else {
      if (isNaN(targetValue)) {
        this.setState({ value: evt.target.value });
      } else if (
        this.isValidValue({
          value: targetValue,
          min: this.props.min,
          max: this.props.max,
        })
      ) {
        this.processNewInputValue(evt.target);
      } else {
        this.setState({ value: targetValue });
      }
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

    const { value: targetValue } = evt.target;

    this.processNewInputValue(evt.target);

    this.props.onBlur?.({
      value: targetValue,
      handlePosition: evt.target?.dataset?.handlePosition as
        | HandlePosition
        | undefined,
    });
  };

  onInputKeyDown = (evt) => {
    // Do nothing if component is disabled, or we don't have a valid event.
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    // Do nothing if we have no valid event, target, or value.
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    if (matches(evt, [keys.Enter])) {
      this.processNewInputValue(evt.target);
    }
  };

  processNewInputValue = (input: HTMLInputElement) => {
    const targetValue = Number.parseFloat(input.value);
    const validity = !isNaN(targetValue);

    // When there are two handles, we'll also have the data-handle-position
    // attribute to consider the other value before settling on the validity to
    // set.
    const handlePosition = input?.dataset?.handlePosition as
      | HandlePosition
      | undefined;

    if (handlePosition === HandlePosition.LOWER) {
      this.setState({ isValid: validity });
    } else if (handlePosition === HandlePosition.UPPER) {
      this.setState({ isValidUpper: validity });
    }
    this.setState({ isValid: validity });

    if (validity) {
      const adjustedValue = handlePosition
        ? this.getAdjustedValueForPosition({
            handle: handlePosition,
            value: targetValue,
            min: this.props.min,
            max: this.props.max,
          })
        : this.getAdjustedValue({
            value: targetValue,
            min: this.props.min,
            max: this.props.max,
          });

      if (adjustedValue !== targetValue) {
        this.setState({
          correctedValue: targetValue,
          correctedPosition: handlePosition,
        });
      } else {
        this.setState({ correctedValue: null, correctedPosition: null });
      }

      const { value, left } = this.calcValue({
        value: adjustedValue,
        useRawValue: true,
      });

      if (handlePosition) {
        this.setValueLeftForHandle(handlePosition, { value, left });
      } else {
        this.setState({
          value,
          left,
        });
      }
    }
  };

  calcLeftPercent = ({ clientX, value, range }: CalcLeftPercentProps) => {
    const boundingRect = this.element?.getBoundingClientRect?.();
    let width = boundingRect ? boundingRect.right - boundingRect.left : 0;

    // Enforce a minimum width of at least 1 for calculations
    if (width <= 0) {
      width = 1;
    }

    // If a clientX is specified, use it to calculate the leftPercent. If not,
    // use the provided value to calculate it instead.
    if (clientX) {
      const leftOffset = this.state.isRtl
        ? (boundingRect?.right ?? 0) - clientX
        : clientX - (boundingRect?.left ?? 0);
      return leftOffset / width;
    } else if (value && range) {
      // Prevent NaN calculation if the range is 0.
      return range === 0 ? 0 : (value - this.props.min) / range;
    }
    // We should never end up in this scenario, but in case we do, and to
    // re-assure Typescript, return 0.
    return 0;
  };

  calcSteppedValuePercent = ({ leftPercent, range }) => {
    const { step = 1 } = this.props;
    const totalSteps = range / step;

    let steppedValue = Math.round(leftPercent * totalSteps) * step;
    const steppedPercent = this.clamp(steppedValue / range, 0, 1);

    steppedValue = this.clamp(
      steppedValue + this.props.min,
      this.props.min,
      this.props.max
    );

    return [steppedValue, steppedPercent];
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

    // @todo solve for rtl.
    const leftPercent = this.calcLeftPercent({
      clientX,
      value,
      range,
    });

    if (useRawValue) {
      // Adjusts only for min/max of thumb position
      return {
        value,
        left: Math.min(1, Math.max(0, leftPercent)) * 100,
      };
    }

    const [steppedValue, steppedPercent] = this.calcSteppedValuePercent({
      leftPercent,
      range,
    });

    return { value: steppedValue, left: steppedPercent * 100 };
  };

  calcDistanceToHandle = (handle: HandlePosition, clientX) => {
    const handleBoundingRect = this.getHandleBoundingRect(handle);
    // x co-ordinate of the midpoint.
    const handleX = handleBoundingRect.left + handleBoundingRect.width / 2;
    return Math.abs(handleX - clientX);
  };

  /**
   * Given the current value, delta and step, calculate the new value.
   *
   * @param {number} currentValue
   *   Current value user is moving from.
   * @param {number} delta
   *   Movement from the current value. Can be positive or negative.
   * @param {number} step
   *   A value determining how much the value should increase/decrease by moving
   *   the thumb by mouse.
   */
  calcValueForDelta = (currentValue, delta, step = 1) => {
    return (
      (delta > 0 ? Math.floor(currentValue / step) * step : currentValue) +
      delta
    );
  };

  /**
   * Sets state relevant to the given handle position.
   *
   * Guards against setting either lower or upper values beyond its counterpart.
   */
  setValueLeftForHandle = (
    handle: HandlePosition,
    { value: newValue, left: newLeft }
  ) => {
    const { value, valueUpper, left, leftUpper } = this.state;
    if (handle === HandlePosition.LOWER) {
      // Don't allow higher than the upper handle.
      this.setState({
        value: valueUpper && newValue > valueUpper ? valueUpper : newValue,
        left: valueUpper && newValue > valueUpper ? leftUpper : newLeft,
        isValid: true,
      });
    } else {
      this.setState({
        valueUpper: value && newValue < value ? value : newValue,
        leftUpper: value && newValue < value ? left : newLeft,
        isValidUpper: true,
      });
    }
  };

  setValueForHandle = (handle: HandlePosition, value) => {
    if (handle === HandlePosition.LOWER) {
      this.setState({
        value,
        isValid: true,
      });
    } else {
      this.setState({
        valueUpper: value,
        isValidUpper: true,
      });
    }
  };

  isValidValueForPosition = ({ handle, value: newValue, min, max }) => {
    const { value, valueUpper } = this.state;

    if (!this.isValidValue({ value: newValue, min, max })) {
      return false;
    }

    if (handle === HandlePosition.LOWER) {
      return !valueUpper || newValue <= valueUpper;
    } else if (handle === HandlePosition.UPPER) {
      return !value || newValue >= value;
    }

    return false;
  };

  isValidValue = ({ value, min, max }) => {
    return !(value < min || value > max);
  };

  getAdjustedValueForPosition = ({ handle, value: newValue, min, max }) => {
    const { value, valueUpper } = this.state;

    newValue = this.getAdjustedValue({ value: newValue, min, max });

    // Next adjust to the opposite handle.
    if (handle === HandlePosition.LOWER && valueUpper) {
      newValue = newValue > valueUpper ? valueUpper : newValue;
    } else if (handle === HandlePosition.UPPER && value) {
      newValue = newValue < value ? value : newValue;
    }
    return newValue;
  };

  getAdjustedValue = ({ value, min, max }) => {
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    return value;
  };

  /**
   * Get the bounding rect for the requested handles' DOM element.
   *
   * If the bounding rect is not available, a new, empty DOMRect is returned.
   */
  getHandleBoundingRect = (handle: HandlePosition): DOMRect => {
    let boundingRect;
    if (handle === HandlePosition.LOWER) {
      boundingRect = this?.thumbRef?.current?.getBoundingClientRect();
    } else {
      boundingRect = this?.thumbRefUpper?.current?.getBoundingClientRect();
    }
    return boundingRect ?? new DOMRect();
  };

  getClientXFromEvent(event: MouseEvent | TouchEvent) {
    let clientX;
    if ('clientX' in event) {
      clientX = event.clientX;
    } else if (
      'touches' in event &&
      0 in event.touches &&
      'clientX' in event.touches[0]
    ) {
      clientX = event.touches[0].clientX;
    }
    return clientX;
  }

  hasTwoHandles() {
    return this.state.valueUpper !== undefined;
  }

  // syncs invalid state and prop
  static getDerivedStateFromProps(props, state) {
    const { isValid, isValidUpper } = state;
    let derivedState = {};

    // Will override state in favor of invalid prop
    if (props.invalid === true) {
      if (isValid === true) {
        derivedState = {
          ...derivedState,
          isValid: false,
        };
      }
      if (isValid === true) {
        derivedState = {
          ...derivedState,
          isValid: false,
        };
      }
      if (isValidUpper === true) {
        derivedState = {
          ...derivedState,
          isValidUpper: false,
        };
      }
    } else if (props.invalid === false) {
      if (isValid === false) {
        derivedState = {
          ...derivedState,
          isValid: true,
        };
      }
      if (isValid === false) {
        derivedState = {
          ...derivedState,
          isValid: true,
        };
      }
      if (isValidUpper === false) {
        derivedState = {
          ...derivedState,
          isValidUpper: true,
        };
      }
    }
    return Object.entries(derivedState).length > 0 ? derivedState : null;
  }

  render() {
    const {
      ariaLabelInput,
      unstable_ariaLabelInputUpper: ariaLabelInputUpper,
      className,
      hideTextInput = false,
      id = (this.inputId =
        this.inputId ||
        `__carbon-slider_${Math.random().toString(36).substr(2)}`),
      min,
      minLabel = '',
      max,
      maxLabel = '',
      formatLabel = defaultFormatLabel,
      labelText,
      step = 1,
      stepMultiplier: _stepMultiplier,
      inputType = 'number',
      invalidText,
      required,
      disabled = false,
      name,
      unstable_nameUpper: nameUpper,
      light,
      readOnly = false,
      warn,
      warnText,
      translateWithId: t = translateWithId,
      ...other
    } = this.props;
    const twoHandles = this.hasTwoHandles();

    delete other.onRelease;
    delete other.invalid;
    delete other.unstable_valueUpper;

    const {
      value,
      valueUpper,
      isValid,
      isValidUpper,
      correctedValue,
      correctedPosition,
      isRtl,
    } = this.state;

    const showWarning =
      (!readOnly && warn && isValid) ||
      (typeof correctedValue !== null &&
        correctedPosition === HandlePosition.LOWER);
    const showWarningUpper =
      (!readOnly && warn && (twoHandles ? isValidUpper : isValid)) ||
      (typeof correctedValue !== null &&
        correctedPosition ===
          (twoHandles ? HandlePosition.UPPER : HandlePosition.LOWER));

    return (
      <PrefixContext.Consumer>
        {(prefix) => {
          const labelId = `${id}-label`;
          const labelClasses = classNames(`${prefix}--label`, {
            [`${prefix}--label--disabled`]: disabled,
          });

          const containerClasses = classNames(`${prefix}--slider-container`, {
            [`${prefix}--slider-container--two-handles`]: twoHandles,
            [`${prefix}--slider-container--disabled`]: disabled,
            [`${prefix}--slider-container--readonly`]: readOnly,
          });
          const sliderClasses = classNames(`${prefix}--slider`, {
            [`${prefix}--slider--disabled`]: disabled,
            [`${prefix}--slider--readonly`]: readOnly,
          });

          const fixedInputClasses = [
            `${prefix}--text-input`,
            `${prefix}--slider-text-input`,
          ];
          const conditionalInputClasses = {
            [`${prefix}--text-input--light`]: light,
            [`${prefix}--slider-text-input--hidden`]: hideTextInput,
          };
          const lowerInputClasses = classNames([
            ...fixedInputClasses,
            `${prefix}--slider-text-input--lower`,
            conditionalInputClasses,
            {
              [`${prefix}--text-input--invalid`]: !readOnly && !isValid,
              [`${prefix}--slider-text-input--warn`]: showWarning,
            },
          ]);
          const upperInputClasses = classNames([
            ...fixedInputClasses,
            `${prefix}--slider-text-input--upper`,
            conditionalInputClasses,
            {
              [`${prefix}--text-input--invalid`]:
                !readOnly && (twoHandles ? !isValidUpper : !isValid),
              [`${prefix}--slider-text-input--warn`]: showWarningUpper,
            },
          ]);
          const lowerInputWrapperClasses = classNames([
            `${prefix}--text-input-wrapper`,
            `${prefix}--slider-text-input-wrapper`,
            `${prefix}--slider-text-input-wrapper--lower`,
            {
              [`${prefix}--text-input-wrapper--readonly`]: readOnly,
            },
          ]);
          const upperInputWrapperClasses = classNames([
            `${prefix}--text-input-wrapper`,
            `${prefix}--slider-text-input-wrapper`,
            `${prefix}--slider-text-input-wrapper--upper`,
            {
              [`${prefix}--text-input-wrapper--readonly`]: readOnly,
            },
          ]);
          const lowerThumbClasses = classNames(`${prefix}--slider__thumb`, {
            [`${prefix}--slider__thumb--lower`]: twoHandles,
          });
          const upperThumbClasses = classNames(`${prefix}--slider__thumb`, {
            [`${prefix}--slider__thumb--upper`]: twoHandles,
          });

          return (
            <div className={classNames(`${prefix}--form-item`, className)}>
              <Text
                as="label"
                htmlFor={twoHandles ? undefined : id}
                className={labelClasses}
                id={labelId}>
                {labelText}
              </Text>
              <div className={containerClasses}>
                {twoHandles ? (
                  <div className={lowerInputWrapperClasses}>
                    <input
                      type={hideTextInput ? 'hidden' : inputType}
                      id={`${id}-lower-input-for-slider`}
                      name={name}
                      className={lowerInputClasses}
                      value={value}
                      aria-label={ariaLabelInput}
                      disabled={disabled}
                      required={required}
                      min={min}
                      max={max}
                      step={step}
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      onKeyUp={this.props.onInputKeyUp}
                      onKeyDown={this.onInputKeyDown}
                      data-invalid={!isValid && !readOnly ? true : null}
                      data-handle-position={HandlePosition.LOWER}
                      aria-invalid={!isValid && !readOnly ? true : undefined}
                      readOnly={readOnly}
                    />
                    {!readOnly && !isValid && (
                      <WarningFilled
                        className={`${prefix}--slider__invalid-icon`}
                      />
                    )}

                    {showWarning && (
                      <WarningAltFilled
                        className={`${prefix}--slider__invalid-icon ${prefix}--slider__invalid-icon--warning`}
                      />
                    )}
                  </div>
                ) : null}
                <Text className={`${prefix}--slider__range-label`}>
                  {formatLabel(min, minLabel)}
                </Text>
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
                  data-invalid={
                    (twoHandles ? !isValid || !isValidUpper : !isValid) &&
                    !readOnly
                      ? true
                      : null
                  }
                  {...other}>
                  <div
                    className={lowerThumbClasses}
                    role="slider"
                    id={twoHandles ? undefined : id}
                    tabIndex={!readOnly ? 0 : -1}
                    aria-valuemax={twoHandles ? valueUpper : max}
                    aria-valuemin={min}
                    aria-valuenow={value}
                    aria-labelledby={twoHandles ? undefined : labelId}
                    aria-label={twoHandles ? ariaLabelInput : undefined}
                    ref={this.thumbRef}
                    onFocus={() =>
                      this.setState({ activeHandle: HandlePosition.LOWER })
                    }>
                    {twoHandles && !isRtl && <LowerHandle />}
                    {twoHandles && !isRtl && <LowerHandleFocus />}
                    {twoHandles && isRtl && <UpperHandle />}
                    {twoHandles && isRtl && <UpperHandleFocus />}
                  </div>
                  {twoHandles ? (
                    <div
                      className={upperThumbClasses}
                      role="slider"
                      tabIndex={!readOnly ? 0 : -1}
                      aria-valuemax={max}
                      aria-valuemin={value}
                      aria-valuenow={valueUpper}
                      aria-label={ariaLabelInputUpper}
                      ref={this.thumbRefUpper}
                      onFocus={() =>
                        this.setState({ activeHandle: HandlePosition.UPPER })
                      }>
                      {twoHandles && !isRtl && <UpperHandle />}
                      {twoHandles && !isRtl && <UpperHandleFocus />}
                      {twoHandles && isRtl && <LowerHandle />}
                      {twoHandles && isRtl && <LowerHandleFocus />}
                    </div>
                  ) : null}
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
                <Text className={`${prefix}--slider__range-label`}>
                  {formatLabel(max, maxLabel)}
                </Text>

                <div className={upperInputWrapperClasses}>
                  <input
                    type={hideTextInput ? 'hidden' : inputType}
                    id={`${id}-${twoHandles ? 'upper-' : ''}input-for-slider`}
                    name={twoHandles ? nameUpper : name}
                    className={upperInputClasses}
                    value={twoHandles ? valueUpper : value}
                    aria-labelledby={
                      !ariaLabelInput && !twoHandles ? labelId : undefined
                    }
                    aria-label={
                      twoHandles
                        ? ariaLabelInputUpper
                        : ariaLabelInput
                        ? ariaLabelInput
                        : undefined
                    }
                    disabled={disabled}
                    required={required}
                    min={min}
                    max={max}
                    step={step}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onKeyDown={this.onInputKeyDown}
                    onKeyUp={this.props.onInputKeyUp}
                    data-invalid={
                      (twoHandles ? !isValidUpper : !isValid) && !readOnly
                        ? true
                        : null
                    }
                    data-handle-position={
                      twoHandles ? HandlePosition.UPPER : null
                    }
                    aria-invalid={
                      (twoHandles ? !isValidUpper : !isValid) && !readOnly
                        ? true
                        : undefined
                    }
                    readOnly={readOnly}
                  />
                  {!readOnly && (twoHandles ? !isValidUpper : !isValid) && (
                    <WarningFilled
                      className={`${prefix}--slider__invalid-icon`}
                    />
                  )}

                  {showWarningUpper && (
                    <WarningAltFilled
                      className={`${prefix}--slider__invalid-icon ${prefix}--slider__invalid-icon--warning`}
                    />
                  )}
                </div>
              </div>
              {!readOnly && (!isValid || !isValidUpper) && (
                <Text
                  as="div"
                  className={classNames(
                    `${prefix}--slider__validation-msg`,
                    `${prefix}--slider__validation-msg--invalid`,
                    `${prefix}--form-requirement`
                  )}>
                  {invalidText}
                </Text>
              )}
              {!readOnly && warn && isValid && isValidUpper && (
                <Text
                  as="div"
                  className={classNames(
                    `${prefix}--slider__validation-msg`,
                    `${prefix}--form-requirement`
                  )}>
                  {warnText}
                </Text>
              )}
              {correctedValue && (
                <Text
                  as="div"
                  role="alert"
                  className={classNames(
                    `${prefix}--slider__status-msg`,
                    `${prefix}--form-requirement`
                  )}>
                  {t(translationIds.autoCorrectAnnouncement, {
                    correctedValue,
                  })}
                </Text>
              )}
            </div>
          );
        }}
      </PrefixContext.Consumer>
    );
  }
}

(Slider as any).translationIds = Object.values(translationIds);

export default Slider;
