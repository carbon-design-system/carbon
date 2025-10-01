/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ChangeEvent,
  type ComponentProps,
  type CSSProperties,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { throttle } from 'es-toolkit/compat';

import * as keys from '../../internal/keyboard/keys';
import { matches } from '../../internal/keyboard';
import { PrefixContext } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import {
  LowerHandle,
  LowerHandleFocus,
  UpperHandle,
  UpperHandleFocus,
} from './SliderHandles';
import type { TFunc, TranslateWithId } from '../../types/common';
import { clamp } from '../../internal/clamp';

interface ThumbWrapperProps
  extends Omit<
    ComponentProps<typeof Tooltip>,
    'children' | 'className' | 'style'
  > {
  hasTooltip: boolean;
  className: string;
  style: CSSProperties;
  children: ComponentProps<typeof Tooltip>['children'];
}

const ThumbWrapper = ({
  hasTooltip,
  className,
  style,
  children,
  ...rest
}: ThumbWrapperProps) => {
  if (hasTooltip) {
    return (
      <Tooltip className={className} style={style} {...rest}>
        {children}
      </Tooltip>
    );
  } else {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
};

const translationIds = {
  'carbon.slider.auto-correct-announcement':
    'carbon.slider.auto-correct-announcement',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.slider.auto-correct-announcement']]:
    'The inputted value "{correctedValue}" was corrected to the nearest allowed digit.',
};

type TranslationArgs = { correctedValue?: string };

const defaultTranslateWithId: TFunc<TranslationKey, TranslationArgs> = (
  messageId,
  args
) => {
  const template = defaultTranslations[messageId];

  if (args?.correctedValue) {
    return template.replace('{correctedValue}', args.correctedValue);
  }

  return template;
};

const defaultFormatLabel: NonNullable<SliderProps['formatLabel']> = (
  value,
  label
) => {
  return `${value}${label ?? ''}`;
};

// TODO: Assuming a 16ms throttle corresponds to 60 FPS, should it be halved,
// since many systems can handle 120 FPS? If it doesn't correspond to 60 FPS,
// what does it correspond to?
/**
 * Minimum time between processed "drag" events in milliseconds.
 */
const EVENT_THROTTLE = 16;

const DRAG_EVENT_TYPES = new Set<keyof DocumentEventMap>([
  'mousemove',
  'touchmove',
]);

const DRAG_STOP_EVENT_TYPES = new Set<keyof DocumentEventMap>([
  'mouseup',
  'touchend',
  'touchcancel',
]);

enum HandlePosition {
  LOWER = 'lower',
  UPPER = 'upper',
}

type ExcludedAttributes = 'onChange' | 'onBlur';

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes>,
    TranslateWithId<TranslationKey, TranslationArgs> {
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
  children?: ReactNode;

  /**
   * The CSS class name for the slider, set on the wrapping div.
   */
  className?: string;

  /**
   * `true` to disable this slider.
   */
  disabled?: boolean;

  /**
   * The callback to format the label associated with the minimum/maximum value and the value tooltip when hideTextInput is true.
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
  invalidText?: ReactNode;

  /**
   * The label for the slider.
   */
  labelText?: ReactNode;

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

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
   */
  onChange?: (data: {
    value: SliderProps['value'];
    valueUpper: SliderProps['unstable_valueUpper'];
  }) => void;

  /**
   * Provide an optional function to be called when a key is pressed in the number input.
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

  // TODO: This JSDoc comment isn't accurate. Evaluate all others.
  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

// TODO: Delete this type and directory type the properties in the function.
interface CalcLeftPercentProps {
  clientX?: number;
  value?: number;
  range?: number;
}

type State = {
  value: ComponentProps<typeof Slider>['value'];
  valueUpper: ComponentProps<typeof Slider>['unstable_valueUpper'];
  left: number;
  leftUpper: number;
  needsOnRelease: boolean;
  isValid: boolean;
  isValidUpper: boolean;
  activeHandle: HandlePosition | undefined;
  correctedValue: string | null;
  correctedPosition: HandlePosition | null;
  isRtl: boolean;
};

export const Slider = (props: SliderProps) => {
  // TODO: Move destructured `props` from the IIFE to here.

  const initialState: State = {
    value: props.value,
    valueUpper: props.unstable_valueUpper,
    left: 0,
    leftUpper: 0,
    needsOnRelease: false,
    isValid: true,
    isValidUpper: true,
    activeHandle: undefined,
    correctedValue: null,
    correctedPosition: null,
    isRtl: false,
  };

  // TODO: Investigate using generics on the hook.
  const [state, setState] = useReducer(
    (prev: State, args: Partial<State>) => ({ ...prev, ...args }),
    initialState
  );

  // TODO: Investigate getting rid of these references.
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const propsRef = useRef(props);

  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  const thumbRef = useRef<HTMLDivElement>(null);
  const thumbRefUpper = useRef<HTMLDivElement>(null);
  const filledTrackRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inputIdRef = useRef('');

  // TODO: Delete this function and set its return value as the value of
  // `twoHandles`.
  const hasTwoHandles = () => {
    return typeof state.valueUpper !== 'undefined';
  };

  const twoHandles = hasTwoHandles();

  /**
   * Sets up initial slider position and value in response to component mount.
   */
  useEffect(() => {
    if (elementRef.current) {
      const isRtl = document?.dir === 'rtl';
      if (hasTwoHandles()) {
        const { value, left } = calcValue({
          value: stateRef.current.value,
          useRawValue: true,
        });
        const { value: valueUpper, left: leftUpper } = calcValue({
          value: stateRef.current.valueUpper,
          useRawValue: true,
        });
        setState({ isRtl, value, left, valueUpper, leftUpper });
      } else {
        const { value, left } = calcValue({
          value: stateRef.current.value,
          useRawValue: true,
        });
        setState({ isRtl, value, left });
      }
    }

    return () => {
      DRAG_STOP_EVENT_TYPES.forEach((element) =>
        elementRef.current?.ownerDocument.removeEventListener(
          element,
          onDragStop
        )
      );

      DRAG_EVENT_TYPES.forEach((element) =>
        elementRef.current?.ownerDocument.removeEventListener(
          element,
          handleDrag
        )
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // TODO: Uncomment this code and delete all of the `filledTrackRef.current`
    // checks.
    // const el = filledTrackRef.current;
    //
    // if (!el) return;

    // Fire onChange event handler if present, if there's a usable value, and
    // if the value is different from the last one
    if (hasTwoHandles()) {
      if (filledTrackRef.current) {
        filledTrackRef.current.style.transform = state.isRtl
          ? `translate(${100 - state.leftUpper}%, -50%) scaleX(${
              (state.leftUpper - state.left) / 100
            })`
          : `translate(${state.left}%, -50%) scaleX(${
              (state.leftUpper - state.left) / 100
            })`;
      }
    } else {
      if (filledTrackRef.current) {
        filledTrackRef.current.style.transform = state.isRtl
          ? `translate(100%, -50%) scaleX(-${state.left / 100})`
          : `translate(0%, -50%) scaleX(${state.left / 100})`;
      }
    }
    // TODO: Investigate whether the missing dependency should be added.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.left, state.leftUpper, state.isRtl]);

  // Fire onChange when value(s) change
  const prevValsRef = useRef<{
    value: State['value'];
    valueUpper: State['valueUpper'];
  }>(null);

  useEffect(() => {
    const prev = prevValsRef.current;

    if (
      prev &&
      (prev.value !== state.value || prev.valueUpper !== state.valueUpper) &&
      typeof props.onChange === 'function'
    ) {
      props.onChange({
        value: state.value,
        valueUpper: state.valueUpper,
      });
    }

    prevValsRef.current = { value: state.value, valueUpper: state.valueUpper };
    // TODO: Investigate whether the missing dependency should be added.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.value, state.valueUpper, props.onChange]);

  useEffect(() => {
    // Fire onRelease event handler if present and if needed
    if (state.needsOnRelease && typeof props.onRelease === 'function') {
      props.onRelease({
        value: state.value,
        valueUpper: state.valueUpper,
      });
      // Reset the flag
      setState({ needsOnRelease: false });
    }
    // TODO: Investigate whether the missing dependency should be added.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.needsOnRelease, state.value, state.valueUpper, props.onRelease]);

  const prevSyncKeysRef = useRef<
    [number, number | undefined, number, number] | null
  >(null);

  useEffect(() => {
    const prev = prevSyncKeysRef.current;
    const next: [number, number | undefined, number, number] = [
      props.value,
      props.unstable_valueUpper,
      props.max,
      props.min,
    ];

    // If value from props does not change, do nothing here.
    // Otherwise, do prop -> state sync without "value capping".
    if (
      !prev ||
      prev[0] !== next[0] ||
      prev[1] !== next[1] ||
      prev[2] !== next[2] ||
      prev[3] !== next[3]
    ) {
      setState(
        calcValue({
          value: props.value,
          useRawValue: true,
        })
      );
      if (typeof props.unstable_valueUpper !== 'undefined') {
        const { value: valueUpper, left: leftUpper } = calcValue({
          value: props.unstable_valueUpper,
          useRawValue: true,
        });
        setState({
          valueUpper,
          leftUpper,
        });
      } else {
        setState({ valueUpper: undefined, leftUpper: undefined });
      }

      prevSyncKeysRef.current = next;
    }
    // TODO: Investigate whether the missing dependency should be added.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, props.unstable_valueUpper, props.max, props.min]);

  /**
   * Rounds a given value to the nearest step defined by the slider's `step`
   * prop.
   *
   * @param value - The value to adjust to the nearest step. Defaults to `0`.
   * @returns The value rounded to the precision determined by the step.
   */
  const nearestStepValue = (value = 0) => {
    // TODO: Use a nullish coalescing operator.
    const decimals = (props.step?.toString().split('.')[1] || '').length;

    return Number(value.toFixed(decimals));
  };

  const handleDrag = (event: Event) => {
    if (
      event instanceof globalThis.MouseEvent ||
      event instanceof globalThis.TouchEvent
    ) {
      onDrag(event);
    }
  };

  /**
   * Sets up "drag" event handlers and calls `onDrag` in case dragging
   * started on somewhere other than the thumb without a corresponding "move"
   * event.
   */
  const onDragStart = (
    evt: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    // Do nothing if component is disabled
    if (props.disabled || props.readOnly) {
      return;
    }

    // We're going to force focus on one of the handles later on here, b/c we're
    // firing on a mousedown event, we need to call event.preventDefault() to
    // keep the focus from leaving the HTMLElement.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#notes
    evt.preventDefault();

    // TODO: Abstract `elementRef.current?.ownerDocument` to a variable that can
    // be used here and everywhere else in this file.

    // Add drag stop handlers
    DRAG_STOP_EVENT_TYPES.forEach((element) => {
      elementRef.current?.ownerDocument.addEventListener(element, onDragStop);
    });

    // Add drag handlers
    DRAG_EVENT_TYPES.forEach((element) => {
      elementRef.current?.ownerDocument.addEventListener(element, handleDrag);
    });

    const clientX = getClientXFromEvent(evt.nativeEvent);

    let activeHandle: HandlePosition | undefined;
    if (hasTwoHandles()) {
      if (evt.target == thumbRef.current) {
        activeHandle = HandlePosition.LOWER;
      } else if (evt.target == thumbRefUpper.current) {
        activeHandle = HandlePosition.UPPER;
      } else if (clientX) {
        const distanceToLower = calcDistanceToHandle(
          HandlePosition.LOWER,
          clientX
        );
        const distanceToUpper = calcDistanceToHandle(
          HandlePosition.UPPER,
          clientX
        );
        if (distanceToLower <= distanceToUpper) {
          activeHandle = HandlePosition.LOWER;
        } else {
          activeHandle = HandlePosition.UPPER;
        }
      }
    }

    // Force focus to the appropriate handle.
    const focusOptions = {
      preventScroll: true,
    };
    if (hasTwoHandles()) {
      if (thumbRef.current && activeHandle === HandlePosition.LOWER) {
        thumbRef.current.focus(focusOptions);
      } else if (
        thumbRefUpper.current &&
        activeHandle === HandlePosition.UPPER
      ) {
        thumbRefUpper.current.focus(focusOptions);
      }
    } else if (thumbRef.current) {
      thumbRef.current.focus(focusOptions);
    }
    setState({ activeHandle });

    // Perform first recalculation since we probably didn't click exactly in the
    // middle of the thumb.
    onDrag(evt.nativeEvent, activeHandle);
  };

  /**
   * Removes "drag" and "drag stop" event handlers and calls sets the flag
   * indicating that the `onRelease` callback should be called.
   */
  const onDragStop = () => {
    // Do nothing if component is disabled
    if (props.disabled || props.readOnly) {
      return;
    }

    // TODO: Rename parameters in `DRAG_*` loops to `type`.
    // Remove drag stop handlers
    DRAG_STOP_EVENT_TYPES.forEach((element) => {
      elementRef.current?.ownerDocument.removeEventListener(
        element,
        onDragStop
      );
    });

    // Remove drag handlers
    DRAG_EVENT_TYPES.forEach((element) => {
      elementRef.current?.ownerDocument.removeEventListener(
        element,
        handleDrag
      );
    });

    // Set needsOnRelease flag so event fires on next update.
    setState({
      needsOnRelease: true,
      isValid: true,
      isValidUpper: true,
    });
  };

  // TODO: Rename this reference.
  /**
   * Handles a "drag" event by recalculating the value/thumb and setting state
   * accordingly.
   *
   * @param evt The event.
   * @param activeHandle The first drag event call, we may have an explicit
   * activeHandle value, which is to be used before state is used.
   */
  const _onDragRef =
    useRef<
      (
        evt: globalThis.MouseEvent | globalThis.TouchEvent,
        activeHandle?: HandlePosition
      ) => void
    >(null);

  _onDragRef.current = (evt, activeHandle) => {
    activeHandle = activeHandle ?? stateRef.current.activeHandle;
    // Do nothing if component is disabled, or we have no event.
    if (propsRef.current.disabled || propsRef.current.readOnly || !evt) {
      return;
    }

    const clientX = getClientXFromEvent(evt);

    const { value, left } = calcValue({
      clientX,
      value: stateRef.current.value,
    });
    // If we're set to two handles, negotiate which drag handle is closest to
    // the users' interaction.
    if (hasTwoHandles() && activeHandle) {
      setValueLeftForHandle(activeHandle, {
        value: nearestStepValue(value),
        left,
      });
    } else {
      setState({
        value: nearestStepValue(value),
        left,
        isValid: true,
      });
    }
    // TODO: Investigate if it would be better to not call `setState`
    // back-to-back here and in other places.
    setState({ correctedValue: null, correctedPosition: null });
  };

  /**
   * Throttles calls to `_onDrag` by limiting events to being processed at
   * most once every `EVENT_THROTTLE` milliseconds.
   */
  const onDrag = useMemo(
    () =>
      throttle(
        (
          evt: globalThis.MouseEvent | globalThis.TouchEvent,
          activeHandle?: HandlePosition
        ) => {
          _onDragRef.current?.(evt, activeHandle);
        },
        EVENT_THROTTLE,
        { leading: true, trailing: false }
      ),
    []
  );

  /**
   * Handles a `keydown` event by recalculating the value/thumb and setting
   * state accordingly.
   */
  const onKeyDown = (evt: KeyboardEvent<HTMLDivElement>) => {
    // Do nothing if component is disabled, or we don't have a valid event
    if (props.disabled || props.readOnly) {
      return;
    }

    const { step = 1, stepMultiplier = 4 } = props;

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

    if (hasTwoHandles() && state.activeHandle) {
      const currentValue =
        state.activeHandle === HandlePosition.LOWER
          ? state.value
          : state.valueUpper;
      const { value, left } = calcValue({
        value: calcValueForDelta(currentValue ?? props.min, delta, props.step),
      });
      setValueLeftForHandle(state.activeHandle, {
        value: nearestStepValue(value),
        left,
      });
    } else {
      const { value, left } = calcValue({
        // Ensures custom value from `<input>` won't cause skipping next stepping
        // point with right arrow key, e.g. Typing 51 in `<input>`, moving focus
        // onto the thumb and the hitting right arrow key should yield 52 instead
        // of 54.
        value: calcValueForDelta(state.value, delta, props.step),
      });
      setState({
        value: nearestStepValue(value),
        left,
        isValid: true,
      });
    }
    setState({ correctedValue: null, correctedPosition: null });
  };

  /**
   * Provides the two-way binding for the input field of the Slider. It also
   * Handles a change to the input field by recalculating the value/thumb and
   * setting state accordingly.
   */
  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    // Do nothing if component is disabled
    if (props.disabled || props.readOnly) {
      return;
    }

    // Do nothing if we have no valid event, target, or value
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    // Avoid calling calcValue for invalid numbers, but still update the state.
    const activeHandle =
      (evt.target.dataset.handlePosition as HandlePosition | undefined) ??
      HandlePosition.LOWER;
    const targetValue = Number.parseFloat(evt.target.value);

    if (hasTwoHandles()) {
      if (isNaN(targetValue)) {
        setValueForHandle(activeHandle, evt.target.value);
      } else if (
        isValidValueForPosition({
          handle: activeHandle,
          value: targetValue,
          min: props.min,
          max: props.max,
        })
      ) {
        processNewInputValue(evt.target);
      } else {
        setValueForHandle(activeHandle, targetValue);
      }
    } else {
      if (isNaN(targetValue)) {
        // TODO: Address this error
        //
        // @ts-expect-error - Passing a string to something that expects a
        // number.
        setState({ value: evt.target.value });
      } else if (
        isValidValue({
          value: targetValue,
          min: props.min,
          max: props.max,
        })
      ) {
        processNewInputValue(evt.target);
      } else {
        setState({ value: targetValue });
      }
    }
  };

  /**
   * Checks for validity of input value after clicking out of the input. It also
   * Handles state change to isValid state.
   */
  const onBlurInput = (evt: FocusEvent<HTMLInputElement>) => {
    // Do nothing if we have no valid event, target, or value
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    const { value: targetValue } = evt.target;

    processNewInputValue(evt.target);

    props.onBlur?.({
      value: targetValue,
      handlePosition: evt.target.dataset.handlePosition as
        | HandlePosition
        | undefined,
    });
  };

  const onInputKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    // Do nothing if component is disabled, or we don't have a valid event.
    if (
      props.disabled ||
      props.readOnly ||
      !(evt.target instanceof HTMLInputElement)
    ) {
      return;
    }

    // Do nothing if we have no valid event, target, or value.
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    if (matches(evt, [keys.Enter])) {
      processNewInputValue(evt.target);
    }
  };

  const processNewInputValue = (input: HTMLInputElement) => {
    setState({ correctedValue: null, correctedPosition: null });
    const targetValue = Number.parseFloat(input.value);
    const validity = !isNaN(targetValue);

    // When there are two handles, we'll also have the data-handle-position
    // attribute to consider the other value before settling on the validity to
    // set.
    const handlePosition = input.dataset.handlePosition as
      | HandlePosition
      | undefined;

    if (handlePosition === HandlePosition.LOWER) {
      setState({ isValid: validity });
    } else if (handlePosition === HandlePosition.UPPER) {
      setState({ isValidUpper: validity });
    }
    setState({ isValid: validity });

    if (validity) {
      const adjustedValue = handlePosition
        ? getAdjustedValueForPosition({
            handle: handlePosition,
            value: targetValue,
            min: props.min,
            max: props.max,
          })
        : getAdjustedValue({
            value: targetValue,
            min: props.min,
            max: props.max,
          });

      if (adjustedValue !== targetValue) {
        setState({
          correctedValue: targetValue.toString(),
          correctedPosition: handlePosition ?? null,
        });
      } else {
        setState({ correctedValue: null, correctedPosition: null });
      }

      const { value, left } = calcValue({
        value: adjustedValue,
        useRawValue: true,
      });

      if (handlePosition) {
        setValueLeftForHandle(handlePosition, {
          value: nearestStepValue(value),
          left,
        });
      } else {
        setState({
          value,
          left,
        });
      }
    }
  };

  const calcLeftPercent = ({ clientX, value, range }: CalcLeftPercentProps) => {
    // TODO: Delete the optional chaining operator after `getBoundingClientRect`.
    const boundingRect = elementRef.current?.getBoundingClientRect?.();
    let width = boundingRect ? boundingRect.right - boundingRect.left : 0;

    // Enforce a minimum width of at least 1 for calculations
    if (width <= 0) {
      width = 1;
    }

    // If a clientX is specified, use it to calculate the leftPercent. If not,
    // use the provided value to calculate it instead.
    if (clientX) {
      const leftOffset = state.isRtl
        ? (boundingRect?.right ?? 0) - clientX
        : clientX - (boundingRect?.left ?? 0);
      return leftOffset / width;
    } else if (value !== null && typeof value !== 'undefined' && range) {
      // Prevent NaN calculation if the range is 0.
      return range === 0 ? 0 : (value - props.min) / range;
    }
    // We should never end up in this scenario, but in case we do, and to
    // re-assure Typescript, return 0.
    return 0;
  };

  /**
   * Calculates the discrete value (snapped to the nearest step) along
   * with the corresponding handle position percentage.
   */
  const calcDiscreteValueAndPercent = ({
    leftPercent,
  }: {
    leftPercent: number;
  }) => {
    const { step = 1, min, max } = props;
    const numSteps =
      Math.floor((max - min) / step) + ((max - min) % step === 0 ? 1 : 2);
    /** Index of the step that corresponds to `leftPercent`. */
    const stepIndex = Math.round(leftPercent * (numSteps - 1));
    const discreteValue =
      stepIndex === numSteps - 1 ? max : min + step * stepIndex;
    /** Percentage corresponding to the step index. */
    const discretePercent = stepIndex / (numSteps - 1);

    return { discreteValue, discretePercent };
  };

  /**
   * Calculates the slider's value and handle position based on either a
   * mouse/touch event or an explicit value.
   */
  const calcValue = ({
    clientX,
    value,
    useRawValue,
  }: {
    /** The x-coordinate from a mouse/touch event. */
    clientX?: number;
    /** Value to base the calculations on (if no `clientX`). */
    value?: number;
    /** Whether to bypass the stepping logic and use the raw value. */
    useRawValue?: boolean;
  }) => {
    const range = props.max - props.min;
    const leftPercentRaw = calcLeftPercent({
      clientX,
      value,
      range,
    });
    /** `leftPercentRaw` clamped between 0 and 1. */
    const leftPercent = clamp(leftPercentRaw, 0, 1);

    if (useRawValue) {
      return {
        value,
        left: leftPercent * 100,
      };
    }

    // Use the discrete value and percentage for snapping.
    const { discreteValue, discretePercent } = calcDiscreteValueAndPercent({
      leftPercent,
    });

    return { value: discreteValue, left: discretePercent * 100 };
  };

  const calcDistanceToHandle = (handle: HandlePosition, clientX: number) => {
    const handleBoundingRect = getHandleBoundingRect(handle);
    /** x-coordinate of the midpoint. */
    const handleX = handleBoundingRect.left + handleBoundingRect.width / 2;
    return Math.abs(handleX - clientX);
  };

  /**
   * Calculates a new slider value based on the current value, a change delta,
   * and a step.
   *
   * @param currentValue - The starting value from which the slider is moving.
   * @param delta - The amount to adjust the current value by.
   * @param step - The step. Defaults to `1`.
   * @returns The new slider value, rounded to the same number of decimal places
   *          as the step.
   */
  const calcValueForDelta = (currentValue: number, delta: number, step = 1) => {
    const base =
      delta > 0 ? Math.floor(currentValue / step) * step : currentValue;
    const newValue = base + delta;
    // TODO: Why is the logical OR needed here?
    const decimals = (step.toString().split('.')[1] || '').length;

    return Number(newValue.toFixed(decimals));
  };

  /**
   * Sets state relevant to the given handle position.
   *
   * Guards against setting either lower or upper values beyond its counterpart.
   */
  const setValueLeftForHandle = (
    handle: HandlePosition,
    { value: newValue, left: newLeft }: { value: number; left: number }
  ) => {
    const { value, valueUpper, left, leftUpper } = state;
    if (handle === HandlePosition.LOWER) {
      // Don't allow higher than the upper handle.
      setState({
        value: valueUpper && newValue > valueUpper ? valueUpper : newValue,
        left: valueUpper && newValue > valueUpper ? leftUpper : newLeft,
        isValid: true,
      });
    } else {
      setState({
        valueUpper: value && newValue < value ? value : newValue,
        leftUpper: value && newValue < value ? left : newLeft,
        isValidUpper: true,
      });
    }
  };

  const setValueForHandle = (
    handle: HandlePosition,
    value: number | string
  ) => {
    if (handle === HandlePosition.LOWER) {
      setState({
        // TODO: Address this error
        //
        // @ts-expect-error - Passing a string to something that expects a
        // number.
        value,
        isValid: true,
      });
    } else {
      setState({
        // TODO: Address this error
        //
        // @ts-expect-error - Passing a string to something that expects a
        // number.
        valueUpper: value,
        isValidUpper: true,
      });
    }
  };

  const isValidValueForPosition = ({
    handle,
    value: newValue,
    min,
    max,
  }: {
    handle: HandlePosition;
    value: number;
    min: number;
    max: number;
  }) => {
    const { value, valueUpper } = state;

    if (!isValidValue({ value: newValue, min, max })) {
      return false;
    }

    if (handle === HandlePosition.LOWER) {
      return !valueUpper || newValue <= valueUpper;
    } else if (handle === HandlePosition.UPPER) {
      return !value || newValue >= value;
    }

    return false;
  };

  const isValidValue = ({
    value,
    min,
    max,
  }: {
    value: number;
    min: number;
    max: number;
  }) => {
    return !(value < min || value > max);
  };

  const getAdjustedValueForPosition = ({
    handle,
    value: newValueInput,
    min,
    max,
  }: {
    handle: HandlePosition;
    value: number;
    min: number;
    max: number;
  }) => {
    const { value, valueUpper } = state;
    let newValue = getAdjustedValue({ value: newValueInput, min, max });

    // TODO: Just return the value.
    // Next adjust to the opposite handle.
    if (handle === HandlePosition.LOWER && valueUpper) {
      newValue = newValue > valueUpper ? valueUpper : newValue;
    } else if (handle === HandlePosition.UPPER && value) {
      newValue = newValue < value ? value : newValue;
    }
    return newValue;
  };

  const getAdjustedValue = ({
    value,
    min,
    max,
  }: {
    value: number;
    min: number;
    max: number;
  }) => {
    // TODO: Just return the value.
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
  const getHandleBoundingRect = (handle: HandlePosition): DOMRect => {
    let boundingRect: DOMRect | undefined;
    if (handle === HandlePosition.LOWER) {
      boundingRect = thumbRef.current?.getBoundingClientRect();
    } else {
      boundingRect = thumbRefUpper.current?.getBoundingClientRect();
    }
    return boundingRect ?? new DOMRect();
  };

  const getClientXFromEvent = (
    event: globalThis.MouseEvent | globalThis.TouchEvent
  ) => {
    let clientX: number | undefined;
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
  };

  useEffect(() => {
    const { isValid, isValidUpper } = stateRef.current;
    const derivedState: Partial<State> = {};

    // Will override state in favor of invalid prop
    if (props.invalid === true) {
      if (isValid === true) derivedState.isValid = false;
      if (isValidUpper === true) derivedState.isValidUpper = false;
    } else if (props.invalid === false) {
      if (isValid === false) derivedState.isValid = true;
      if (isValidUpper === false) derivedState.isValidUpper = true;
    }

    if (Object.keys(derivedState).length) {
      setState(derivedState);
    }
  }, [props.invalid]);

  // TODO: Delete this IIFE. It was added to maintain whitespace and to make it clear
  // what exactly has changed.
  return (() => {
    const {
      ariaLabelInput,
      unstable_ariaLabelInputUpper: ariaLabelInputUpper,
      className,
      hideTextInput = false,
      id = (inputIdRef.current =
        inputIdRef.current ||
        // TODO:
        // 1. Why isn't `inputId` just set to this value instead of an empty
        //    string?
        // 2. Why this value instead of something else, like
        //    `crypto.randomUUID()` or `useId()`?
        `__carbon-slider_${Math.random().toString(36).substr(2)}`),
      min,
      minLabel,
      max,
      maxLabel,
      formatLabel = defaultFormatLabel,
      labelText,
      hideLabel,
      step = 1,
      // TODO: Other properties are deleted below. Why isn't this one?
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
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
      translateWithId: t = defaultTranslateWithId,
      ...other
    } = props;

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
    } = state;

    const showWarning =
      (!readOnly && warn) ||
      // TODO: https://github.com/carbon-design-system/carbon/issues/18991#issuecomment-2795709637
      // eslint-disable-next-line valid-typeof , no-constant-binary-expression -- https://github.com/carbon-design-system/carbon/issues/20452
      (typeof correctedValue !== null &&
        correctedPosition === HandlePosition.LOWER &&
        isValid);
    const showWarningUpper =
      (!readOnly && warn) ||
      // TODO: https://github.com/carbon-design-system/carbon/issues/18991#issuecomment-2795709637
      // eslint-disable-next-line valid-typeof, no-constant-binary-expression -- https://github.com/carbon-design-system/carbon/issues/20452
      (typeof correctedValue !== null &&
        correctedPosition ===
          (twoHandles ? HandlePosition.UPPER : HandlePosition.LOWER) &&
        (twoHandles ? isValidUpper : isValid));

    return (
      <PrefixContext.Consumer>
        {(prefix) => {
          const labelId = `${id}-label`;
          const labelClasses = classNames(`${prefix}--label`, {
            [`${prefix}--visually-hidden`]: hideLabel,
            [`${prefix}--label--disabled`]: disabled,
          });

          const containerClasses = classNames(`${prefix}--slider-container`, {
            [`${prefix}--slider-container--two-handles`]: twoHandles,
            [`${prefix}--slider-container--disabled`]: disabled,
            [`${prefix}--slider-container--readonly`]: readOnly,
            [`${prefix}--slider-container--rtl`]: isRtl,
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
              [`${prefix}--slider-text-input-wrapper--hidden`]: hideTextInput,
            },
          ]);
          const upperInputWrapperClasses = classNames([
            `${prefix}--text-input-wrapper`,
            `${prefix}--slider-text-input-wrapper`,
            `${prefix}--slider-text-input-wrapper--upper`,
            {
              [`${prefix}--text-input-wrapper--readonly`]: readOnly,
              [`${prefix}--slider-text-input-wrapper--hidden`]: hideTextInput,
            },
          ]);
          const lowerThumbClasses = classNames(`${prefix}--slider__thumb`, {
            [`${prefix}--slider__thumb--lower`]: twoHandles,
          });
          const upperThumbClasses = classNames(`${prefix}--slider__thumb`, {
            [`${prefix}--slider__thumb--upper`]: twoHandles,
          });
          const lowerThumbWrapperClasses = classNames([
            `${prefix}--icon-tooltip`,
            `${prefix}--slider__thumb-wrapper`,
            {
              [`${prefix}--slider__thumb-wrapper--lower`]: twoHandles,
            },
          ]);
          const upperThumbWrapperClasses = classNames([
            `${prefix}--icon-tooltip`,
            `${prefix}--slider__thumb-wrapper`,
            {
              [`${prefix}--slider__thumb-wrapper--upper`]: twoHandles,
            },
          ]);
          const lowerThumbWrapperProps = {
            style: {
              insetInlineStart: `${state.left}%`,
            },
          };
          const upperThumbWrapperProps = {
            style: { insetInlineStart: `${state.leftUpper}%` },
          };

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
                      onChange={onChangeInput}
                      onBlur={onBlurInput}
                      onKeyUp={props.onInputKeyUp}
                      onKeyDown={onInputKeyDown}
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
                {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452 */
                /* @ts-ignore onBlur + onChange types are incompatible*/}
                <div
                  className={sliderClasses}
                  ref={(node) => {
                    elementRef.current = node;
                  }}
                  onMouseDown={onDragStart}
                  onTouchStart={onDragStart}
                  onKeyDown={onKeyDown}
                  role="presentation"
                  tabIndex={-1}
                  data-invalid={
                    (twoHandles ? !isValid || !isValidUpper : !isValid) &&
                    !readOnly
                      ? true
                      : null
                  }
                  {...other}>
                  <ThumbWrapper
                    hasTooltip={hideTextInput}
                    className={lowerThumbWrapperClasses}
                    label={formatLabel(value, undefined)}
                    align="top"
                    {...lowerThumbWrapperProps}>
                    <div
                      className={lowerThumbClasses}
                      role="slider"
                      id={twoHandles ? undefined : id}
                      tabIndex={readOnly || disabled ? undefined : 0}
                      aria-valuetext={formatLabel(value, undefined)}
                      aria-valuemax={twoHandles ? valueUpper : max}
                      aria-valuemin={min}
                      aria-valuenow={value}
                      aria-labelledby={twoHandles ? undefined : labelId}
                      aria-label={twoHandles ? ariaLabelInput : undefined}
                      ref={thumbRef}
                      onFocus={() =>
                        setState({ activeHandle: HandlePosition.LOWER })
                      }>
                      {twoHandles && !isRtl ? (
                        <>
                          <LowerHandle aria-label={ariaLabelInput} />
                          <LowerHandleFocus aria-label={ariaLabelInput} />
                        </>
                      ) : twoHandles && isRtl ? (
                        <>
                          <UpperHandle aria-label={ariaLabelInputUpper} />
                          <UpperHandleFocus aria-label={ariaLabelInputUpper} />
                        </>
                      ) : undefined}
                    </div>
                  </ThumbWrapper>
                  {twoHandles ? (
                    <ThumbWrapper
                      hasTooltip={hideTextInput}
                      className={upperThumbWrapperClasses}
                      label={formatLabel(valueUpper ?? 0, undefined)}
                      align="top"
                      {...upperThumbWrapperProps}>
                      <div
                        className={upperThumbClasses}
                        role="slider"
                        tabIndex={readOnly || disabled ? undefined : 0}
                        aria-valuemax={max}
                        aria-valuemin={value}
                        aria-valuenow={valueUpper}
                        aria-label={ariaLabelInputUpper}
                        ref={thumbRefUpper}
                        onFocus={() =>
                          setState({ activeHandle: HandlePosition.UPPER })
                        }>
                        {twoHandles && !isRtl ? (
                          <>
                            <UpperHandle aria-label={ariaLabelInputUpper} />
                            <UpperHandleFocus
                              aria-label={ariaLabelInputUpper}
                            />
                          </>
                        ) : twoHandles && isRtl ? (
                          <>
                            <LowerHandle aria-label={ariaLabelInput} />
                            <LowerHandleFocus aria-label={ariaLabelInput} />
                          </>
                        ) : undefined}
                      </div>
                    </ThumbWrapper>
                  ) : null}
                  <div
                    className={`${prefix}--slider__track`}
                    ref={(node) => {
                      trackRef.current = node;
                    }}
                  />
                  <div
                    className={`${prefix}--slider__filled-track`}
                    ref={filledTrackRef}
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
                    onChange={onChangeInput}
                    onBlur={onBlurInput}
                    onKeyDown={onInputKeyDown}
                    onKeyUp={props.onInputKeyUp}
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
                  {t(
                    translationIds['carbon.slider.auto-correct-announcement'],
                    { correctedValue }
                  )}
                </Text>
              )}
            </div>
          );
        }}
      </PrefixContext.Consumer>
    );
  })();
};

Slider.propTypes = {
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
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

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
   * Provide an optional function to be called when a key is pressed in the number input.
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
