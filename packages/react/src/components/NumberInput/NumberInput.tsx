/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Add, Subtract } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode, useContext, useRef, useState } from 'react';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useNormalizedInputProps as normalize } from '../../internal/useNormalizedInputProps';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { FormContext } from '../FluidForm';

export const translationIds = {
  'increment.number': 'increment.number',
  'decrement.number': 'decrement.number',
};

const defaultTranslations = {
  [translationIds['increment.number']]: 'Increment number',
  [translationIds['decrement.number']]: 'Decrement number',
};

type ExcludedAttributes =
  | 'defaultValue'
  | 'id'
  | 'min'
  | 'max'
  | 'onChange'
  | 'onClick'
  | 'size'
  | 'step'
  | 'value';

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ExcludedAttributes
  > {
  /**
   * `true` to allow empty string.
   */
  allowEmpty?: boolean;

  /**
   * Specify an optional className to be applied to the wrapper node
   */
  className?: string;

  /**
   * Optional starting value for uncontrolled state
   */
  defaultValue?: number | string;

  /**
   * Specify if the wheel functionality for the input should be disabled, or not
   */
  disableWheel?: boolean;

  /**
   * Specify if the control should be disabled, or not
   */
  disabled?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: ReactNode;

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

  /**
   * Specify whether you want the steppers to be hidden
   */
  hideSteppers?: boolean;

  /**
   * Provide a description for up/down icons that can be read by screen readers
   */
  iconDescription?: string;

  /**
   * Specify a custom `id` for the input
   */
  id: string;

  /**
   * Specify if the currently value is invalid.
   */
  invalid?: boolean;

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText?: ReactNode;

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label?: ReactNode;

  /**
   * `true` to use the light version.
   *
   * @deprecated The `light` prop for `NumberInput` is no longer needed and has
   *     been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.
   */
  light?: boolean;

  /**
   * The maximum value.
   */
  max?: number;

  /**
   * The minimum value.
   */
  min?: number;

  /**
   * Provide an optional handler that is called when the internal state of
   * NumberInput changes. This handler is called with event and state info.
   * `(event, { value, direction }) => void`
   */
  onChange?: (
    event: React.MouseEvent<HTMLButtonElement>,
    state: { value: number | string; direction: string }
  ) => void;

  /**
   * Provide an optional function to be called when the up/down button is clicked
   */
  onClick?: (
    event: React.MouseEvent<HTMLElement>,
    state?: { value: number | string; direction: string }
  ) => void;

  /**
   * Provide an optional function to be called when a key is pressed in the number input
   */
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;

  /**
   * Specify if the component should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify the size of the Number Input.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify how much the values should increase/decrease upon clicking on up/down button
   */
  step?: number;

  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId?: (id: string) => string;

  /**
   * Specify the value of the input
   */
  value?: number | string;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(props: NumberInputProps, forwardRef) {
    const {
      allowEmpty = false,
      className: customClassName,
      disabled = false,
      disableWheel: disableWheelProp = false,
      defaultValue,
      helperText = '',
      hideLabel = false,
      hideSteppers,
      iconDescription,
      id,
      label,
      invalid = false,
      invalidText,
      light,
      max,
      min,
      onChange,
      onClick,
      onKeyUp,
      readOnly,
      size = 'md',
      step = 1,
      translateWithId: t = (id) => defaultTranslations[id],
      warn = false,
      warnText = '',
      value: controlledValue,
      ...rest
    } = props;
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(() => {
      if (controlledValue !== undefined) {
        return controlledValue;
      }
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      return 0;
    });
    const [prevControlledValue, setPrevControlledValue] =
      useState(controlledValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const ref = useMergedRefs<HTMLInputElement>([forwardRef, inputRef]);
    const numberInputClasses = cx({
      [`${prefix}--number`]: true,
      [`${prefix}--number--helpertext`]: true,
      [`${prefix}--number--readonly`]: readOnly,
      [`${prefix}--number--light`]: light,
      [`${prefix}--number--nolabel`]: hideLabel,
      [`${prefix}--number--nosteppers`]: hideSteppers,
      [`${prefix}--number--${size}`]: size,
    });
    const isInputValid = getInputValidity({
      allowEmpty,
      invalid,
      value,
      max,
      min,
    });
    const normalizedProps = normalize({
      id,
      readOnly,
      disabled,
      invalid: !isInputValid,
      invalidText,
      warn,
      warnText,
    });
    const [incrementNumLabel, decrementNumLabel] = [
      t('increment.number'),
      t('decrement.number'),
    ];
    const wrapperClasses = cx(`${prefix}--number__input-wrapper`, {
      [`${prefix}--number__input-wrapper--warning`]: normalizedProps.warn,
    });
    const iconClasses = cx({
      [`${prefix}--number__invalid`]:
        normalizedProps.invalid || normalizedProps.warn,
      [`${prefix}--number__invalid--warning`]: normalizedProps.warn,
    });

    if (controlledValue !== prevControlledValue) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setValue(controlledValue!);
      setPrevControlledValue(controlledValue);
    }

    let ariaDescribedBy: string | undefined = undefined;
    if (normalizedProps.invalid) {
      ariaDescribedBy = normalizedProps.invalidId;
    }
    if (normalizedProps.warn) {
      ariaDescribedBy = normalizedProps.warnId;
    }
    if (!normalizedProps.validation) {
      ariaDescribedBy = helperText ? normalizedProps.helperId : undefined;
    }

    function handleOnChange(event) {
      if (disabled) {
        return;
      }

      const state = {
        value: event.target.value,
        direction: value < event.target.value ? 'up' : 'down',
      };
      setValue(state.value);

      if (onChange) {
        onChange(event, state);
      }
    }

    const handleFocus: React.FocusEventHandler<
      HTMLInputElement | HTMLDivElement
    > = (evt) => {
      if ('type' in evt.target && evt.target.type === 'button') {
        setIsFocused(false);
      } else {
        setIsFocused(evt.type === 'focus' ? true : false);
      }
    };

    const outerElementClasses = cx(`${prefix}--form-item`, {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      [customClassName!]: !!customClassName,
      [`${prefix}--number-input--fluid--invalid`]:
        isFluid && normalizedProps.invalid,
      [`${prefix}--number-input--fluid--focus`]: isFluid && isFocused,
      [`${prefix}--number-input--fluid--disabled`]: isFluid && disabled,
    });

    const Icon = normalizedProps.icon as any;

    function handleStepperClick(event, direction) {
      if (inputRef.current) {
        direction === 'up'
          ? inputRef.current.stepUp()
          : inputRef.current.stepDown();

        const state = {
          value: Number(inputRef.current.value),
          direction: direction,
        };
        setValue(state.value);

        if (onChange) {
          onChange(event, state);
        }

        if (onClick) {
          onClick(event, state);
        }
      }
    }

    return (
      <div
        className={outerElementClasses}
        onFocus={isFluid ? handleFocus : undefined}
        onBlur={isFluid ? handleFocus : undefined}>
        <div
          className={numberInputClasses}
          data-invalid={normalizedProps.invalid ? true : undefined}>
          <Label
            disabled={normalizedProps.disabled}
            hideLabel={hideLabel}
            id={id}
            label={label}
          />
          <div className={wrapperClasses}>
            <input
              {...rest}
              data-invalid={normalizedProps.invalid ? true : undefined}
              aria-invalid={normalizedProps.invalid}
              aria-describedby={ariaDescribedBy}
              disabled={normalizedProps.disabled}
              ref={ref}
              id={id}
              max={max}
              min={min}
              onClick={onClick}
              onChange={handleOnChange}
              onKeyUp={onKeyUp}
              onFocus={(e) => {
                if (disableWheelProp) {
                  e.target.addEventListener('wheel', disableWheel);
                }

                if (rest.onFocus) {
                  rest.onFocus(e);
                }
              }}
              onBlur={(e) => {
                if (disableWheelProp) {
                  e.target.removeEventListener('wheel', disableWheel);
                }

                if (rest.onBlur) {
                  rest.onBlur(e);
                }
              }}
              pattern="[0-9]*"
              readOnly={readOnly}
              step={step}
              type="number"
              value={value}
            />
            {Icon ? <Icon className={iconClasses} /> : null}
            {!hideSteppers && (
              <div className={`${prefix}--number__controls`}>
                <button
                  aria-label={decrementNumLabel || iconDescription}
                  className={`${prefix}--number__control-btn down-icon`}
                  disabled={disabled || readOnly}
                  onClick={(event) => handleStepperClick(event, 'down')}
                  tabIndex={-1}
                  title={decrementNumLabel || iconDescription}
                  type="button">
                  <Subtract className="down-icon" />
                </button>
                <div className={`${prefix}--number__rule-divider`} />
                <button
                  aria-label={incrementNumLabel || iconDescription}
                  className={`${prefix}--number__control-btn up-icon`}
                  disabled={disabled || readOnly}
                  onClick={(event) => handleStepperClick(event, 'up')}
                  tabIndex={-1}
                  title={incrementNumLabel || iconDescription}
                  type="button">
                  <Add className="up-icon" />
                </button>
                <div className={`${prefix}--number__rule-divider`} />
              </div>
            )}
          </div>
          {isFluid && <hr className={`${prefix}--number-input__divider`} />}
          {normalizedProps.validation ? (
            normalizedProps.validation
          ) : (
            <HelperText
              id={normalizedProps.helperId}
              disabled={disabled}
              description={helperText}
            />
          )}
        </div>
      </div>
    );
  }
);

NumberInput.propTypes = {
  /**
   * `true` to allow empty string.
   */
  allowEmpty: PropTypes.bool,

  /**
   * Specify an optional className to be applied to the wrapper node
   */
  className: PropTypes.string,

  /**
   * Optional starting value for uncontrolled state
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Specify if the wheel functionality for the input should be disabled, or not
   */
  disableWheel: PropTypes.bool,

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify whether you want the steppers to be hidden
   */
  hideSteppers: PropTypes.bool,

  /**
   * Provide a description for up/down icons that can be read by screen readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify if the currently value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.node,

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node,

  /**
   * `true` to use the light version.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `NumberInput` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.'
  ),

  /**
   * The maximum value.
   */
  max: PropTypes.number,

  /**
   * The minimum value.
   */
  min: PropTypes.number,

  /**
   * Provide an optional handler that is called when the internal state of
   * NumberInput changes. This handler is called with event and state info.
   * `(event, { value, direction }) => void`
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional function to be called when the up/down button is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional function to be called when a key is pressed in the number input
   */
  onKeyUp: PropTypes.func,

  /**
   * Specify if the component should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Number Input.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify how much the values should increase/decrease upon clicking on up/down button
   */
  step: PropTypes.number,

  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func,

  /**
   * Specify the value of the input
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

interface Label {
  disabled?: boolean;
  hideLabel?: boolean;
  id?: string;
  label?: ReactNode;
}
function Label({ disabled, id, hideLabel, label }: Label) {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--label`]: true,
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  if (label) {
    return (
      <label htmlFor={id} className={className}>
        {label}
      </label>
    );
  }
  return null;
}

Label.propTypes = {
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
};

interface HelperTextProps {
  id?: string;
  description?: ReactNode;
  disabled?: boolean;
}
function HelperText({ disabled, description, id }: HelperTextProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  if (description) {
    return (
      <div id={id} className={className}>
        {description}
      </div>
    );
  }
  return null;
}

HelperText.propTypes = {
  description: PropTypes.node,
  disabled: PropTypes.bool,
  id: PropTypes.string,
};

/**
 * Determine if the given value is invalid based on the given max, min and
 * conditions like `allowEmpty`. If `invalid` is passed through, it will default
 * to false.
 *
 * @param {object} config
 * @param {boolean} config.allowEmpty
 * @param {boolean} config.invalid
 * @param {number} config.value
 * @param {number} config.max
 * @param {number} config.min
 * @returns {boolean}
 */
function getInputValidity({ allowEmpty, invalid, value, max, min }) {
  if (invalid) {
    return false;
  }

  if (value === '') {
    return allowEmpty;
  }

  if (value > max || value < min) {
    return false;
  }

  return true;
}

/**
 * It prevents any wheel event from emitting.
 *
 * We want to prevent this input field from changing by the user accidentally
 * when the user scrolling up or down in a long form. So we prevent the default
 * behavior of wheel events when it is focused.
 *
 * Because React uses passive event handler by default, we can't just call
 * `preventDefault` in the `onWheel` event handler. So we have to get the input
 * ref and add our event handler manually.
 *
 * @see https://github.com/facebook/react/pull/19654
 * @param {WheelEvent} e A wheel event.
 */
function disableWheel(e) {
  e.preventDefault();
}

export { NumberInput };
