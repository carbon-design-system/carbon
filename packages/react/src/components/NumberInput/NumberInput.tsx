/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Add, Subtract } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  cloneElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useNormalizedInputProps as normalize } from '../../internal/useNormalizedInputProps';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { FormContext } from '../FluidForm';
import { Text } from '../Text';
import { TranslateWithId } from '../../types/common';
import { clamp } from '../../internal/clamp';
import { useControllableState } from '../../internal/useControllableState';
import {
  NumberFormatter,
  NumberParser,
  type NumberFormatOptions,
} from '@carbon/utilities';
import { keys, match } from '../../internal/keyboard';
import { NumberFormatOptionsPropType } from './NumberFormatPropTypes';
import { AILabel, type AILabelProps } from '../AILabel';
import { isComponentElement } from '../../internal';

export const translationIds = {
  'increment.number': 'increment.number',
  'decrement.number': 'decrement.number',
} as const;

/**
 * Message ids that will be passed to translateWithId().
 */
type TranslationKey = keyof typeof translationIds;

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
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes>,
    TranslateWithId<TranslationKey> {
  /**
   * `true` to allow empty string.
   */
  allowEmpty?: boolean;

  /**
   * Specify an optional className to be applied to the wrapper node
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the
   * `TextInput` component
   */
  decorator?: ReactNode;

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
   * **Experimental:** Specify Intl.NumberFormat options applied to internal
   * number parsing and formatting. Use with `type="text"`, has no effect when
   * `type="number"`.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   */
  formatOptions?: NumberFormatOptions;

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
   * Instruct the browser which keyboard to display on mobile devices. Note that
   * standard numeric keyboards vary across devices and operating systems.
   * @see https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/
   */
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];

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
   * been deprecated in v11 in favor of the new `Layer` component. It will be
   * removed in the next major release.
   */
  light?: boolean;

  /**
   * **Experimental:** Specify a [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt)
   * language code for parsing and formatting. Use with `type="text"`, has no
   * effect when `type="number"`.
   */
  locale?: string;

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
   * When type="number", this is called on every change of the input.
   * When type="text", this is only called on blur after the number has been
   * parsed and formatted.
   * `(event, { value, direction }) => void`
   */
  onChange?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
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
   * When type="text", provide an optional pattern to restrict user input. Has
   * no effect when type="number".
   */
  pattern?: string;

  /**
   * Specify if the component should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify the size of the Number Input.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextInput` component
   */
  slug?: ReactNode;

  /**
   * Specify how much the values should increase/decrease upon clicking on up/down button
   */
  step?: number;

  /**
   * **Experimental**: Specify if the input should be of type text or number.
   * Use type="text" with `locale`, `formatOptions`, and guide user input with
   * `pattern` and `inputMode`.
   */
  type?: 'number' | 'text';

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
      decorator,
      disabled = false,
      disableWheel: disableWheelProp = false,
      defaultValue = 0,
      formatOptions,
      helperText = '',
      hideLabel = false,
      hideSteppers,
      iconDescription,
      id,
      inputMode,
      invalid = false,
      invalidText,
      label,
      light,
      locale = 'en-US',
      max,
      min,
      onChange,
      onClick,
      onKeyUp,
      pattern = '[0-9]*',
      readOnly,
      size = 'md',
      slug,
      step = 1,
      translateWithId: t = (id) => defaultTranslations[id],
      type = 'number',
      warn = false,
      warnText = '',
      value: controlledValue,
      ...rest
    } = props;
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const [isFocused, setIsFocused] = useState(false);

    /**
     * The input value, only used when type=number
     */
    const [value, setValue] = useState(() => {
      if (controlledValue !== undefined) {
        return controlledValue;
      }
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      if (allowEmpty) {
        return '';
      }
      return 0;
    });
    const [prevControlledValue, setPrevControlledValue] =
      useState(controlledValue);

    const numberParser = useMemo(
      () => new NumberParser(locale, formatOptions),
      [locale, formatOptions]
    );
    /**
     * The currently parsed number value.
     * Only used when type=text
     * Updated based on the `value` as the user types.
     */
    const [numberValue, setNumberValue, isControlled] = useControllableState({
      name: 'NumberInput',
      defaultValue:
        typeof defaultValue === 'string'
          ? numberParser.parse(defaultValue)
          : defaultValue,
      value:
        typeof controlledValue === 'string'
          ? numberParser.parse(controlledValue)
          : controlledValue,
    });

    /**
     * The current text value of the input.
     * Only used when type=text
     * Updated as the user types and formatted on blur.
     */
    const [inputValue, setInputValue] = React.useState(() =>
      isNaN(numberValue)
        ? ''
        : new NumberFormatter(locale, formatOptions).format(numberValue)
    );

    const numberingSystem = useMemo(
      () => numberParser.getNumberingSystem(inputValue),
      [numberParser, inputValue]
    );
    const numberFormatter = useMemo(
      () =>
        new NumberFormatter(locale, {
          ...formatOptions,
          numberingSystem,
        }),
      [locale, formatOptions, numberingSystem]
    );
    const format = useCallback(
      (value) =>
        isNaN(value) || value === null ? '' : numberFormatter.format(value),
      [numberFormatter]
    );

    const inputRef = useRef<HTMLInputElement>(null);
    const ref = useMergedRefs([forwardRef, inputRef]);
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
      value: type === 'number' ? value : numberValue,
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
      [`${prefix}--number__input-wrapper--slug`]: slug,
      [`${prefix}--number__input-wrapper--decorator`]: decorator,
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

      if (type === 'number') {
        const state = {
          value:
            allowEmpty && event.target.value === ''
              ? ''
              : Number(event.target.value),
          direction: value < event.target.value ? 'up' : 'down',
        };
        setValue(state.value);

        if (onChange) {
          onChange(event, state);
        }
        return;
      }

      if (type === 'text') {
        const _value =
          allowEmpty && event.target.value === '' ? '' : event.target.value;
        setNumberValue(numberParser.parse(_value));
        setInputValue(_value);
        // The onChange prop isn't called here because it will be called on blur
        // or on click of a stepper, after the number is parsed and formatted
        // according to the locale.
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

    const getDecimalPlaces = (num: number) => {
      const parts = num.toString().split('.');

      return parts[1] ? parts[1].length : 0;
    };

    const handleStep = (event, direction) => {
      if (inputRef.current) {
        const currentValue =
          type === 'number'
            ? Number(inputRef.current.value)
            : numberParser.parse(inputRef.current.value);
        const rawValue =
          direction === 'up' ? currentValue + step : currentValue - step;
        const precision = Math.max(
          getDecimalPlaces(currentValue),
          getDecimalPlaces(step)
        );
        const floatValue = parseFloat(rawValue.toFixed(precision));
        const newValue = clamp(floatValue, min ?? -Infinity, max ?? Infinity);

        let state;

        if (type === 'number') {
          state = {
            value:
              allowEmpty && inputRef.current.value === '' && step === 0
                ? ''
                : newValue,
            direction,
          };

          setValue(state.value);
        }

        if (type === 'text') {
          const formattedNewValue = format(newValue);
          state = {
            value:
              allowEmpty && inputRef.current.value === '' && step === 0
                ? ''
                : formattedNewValue,
            direction,
          };

          // newValue does not need to be parsed because it is derived from
          // currentValue, which is parsed at the beginning of this function
          setNumberValue(newValue);
          setInputValue(formattedNewValue);
        }

        if (onChange) {
          onChange(event, state);
        }

        return state;
      }
    };

    const handleStepperClick = (
      event: MouseEvent<HTMLButtonElement>,
      direction: 'up' | 'down'
    ) => {
      if (inputRef.current) {
        const { state } = handleStep(event, direction);

        if (onClick) {
          onClick(event, state);
        }
      }
    };

    // AILabel always size `mini`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'mini' })
      : null;

    // Need to update the internal value when the revert button is clicked
    let isRevertActive: AILabelProps['revertActive'];
    if (normalizedDecorator?.type === AILabel) {
      isRevertActive = normalizedDecorator.props.revertActive;
    }

    useEffect(() => {
      if (!isRevertActive && slug && defaultValue) {
        setValue(defaultValue);
      }
    }, [defaultValue, isRevertActive, slug]);

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
              aria-readonly={readOnly}
              disabled={normalizedProps.disabled}
              ref={ref}
              id={id}
              max={max}
              min={min}
              onClick={onClick}
              onChange={handleOnChange}
              onKeyUp={onKeyUp}
              onKeyDown={(e) => {
                if (type === 'text') {
                  match(e, keys.ArrowUp) && handleStep(e, 'up');
                  match(e, keys.ArrowDown) && handleStep(e, 'down');
                }

                if (rest?.onKeyDown) {
                  rest?.onKeyDown(e);
                }
              }}
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

                if (type === 'text') {
                  // When isControlled, the current inputValue needs re-parsed
                  // because the consumer's onChange hasn't been called yet and
                  // the `numberValue` we have in state is the (stale) value
                  // they've passed in.
                  const _numberValue = isControlled
                    ? numberParser.parse(inputValue)
                    : numberValue;

                  const formattedValue = isNaN(_numberValue)
                    ? ''
                    : format(_numberValue);
                  setInputValue(formattedValue);

                  if (onChange) {
                    const state = {
                      value: formattedValue,
                      direction: value < e.target.value ? 'up' : 'down',
                    };
                    onChange(e, state);
                  }
                }

                if (rest.onBlur) {
                  rest.onBlur(e);
                }
              }}
              pattern={pattern}
              inputMode={inputMode}
              readOnly={readOnly}
              step={step}
              type={type}
              value={type === 'number' ? value : inputValue}
            />
            {slug ? (
              normalizedDecorator
            ) : decorator ? (
              <div
                className={`${prefix}--number__input-inner-wrapper--decorator`}>
                {normalizedDecorator}
              </div>
            ) : (
              ''
            )}
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
   * **Experimental**: Provide a `decorator` component to be rendered inside the `NumberInput` component
   */
  decorator: PropTypes.node,

  /**
   * Optional starting value for uncontrolled state
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Specify if the wheel functionality for the input should be disabled, or no t
   */
  disableWheel: PropTypes.bool,

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * **Experimental:** Specify Intl.NumberFormat options applied to internal
   * number parsing and formatting. Use with `type="text"`, has no effect when
   * `type="number"`.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   */
  formatOptions: NumberFormatOptionsPropType,

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
   * Instruct the browser which keyboard to display on mobile devices. Note that
   * standard numeric keyboards vary across devices and operating systems.
   * @see https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/
   */
  inputMode: PropTypes.oneOf([
    'none',
    'text',
    'tel',
    'url',
    'email',
    'numeric',
    'decimal',
    'search',
  ]),

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
   * **Experimental:** Specify a [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt)
   * language code for parsing and formatting. Use with `type="text"`, has no
   * effect when `type="number"`.
   */
  locale: PropTypes.string,

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
   * When type="number", this is called on every change of the input.
   * When type="text", this is only called on blur after the number has been
   * parsed and formatted.
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
   * When type="text", provide an optional pattern to restrict user input. Has
   * no effect when type="number".
   */
  pattern: PropTypes.string,

  /**
   * Specify if the component should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Number Input.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the
   * `NumberInput` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `NumberInput` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `decorator` prop. It will be moved in the next major release.'
  ),

  /**
   * Specify how much the values should increase/decrease upon clicking on
   * up/down button
   */
  step: PropTypes.number,

  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func,

  /**
   * **Experimental**: Specify if the input should be of type text or number.
   * Use type="text" with `locale`, `formatOptions`, and guide user input with
   * `pattern` and `inputMode`.
   */
  type: PropTypes.oneOf(['number', 'text']),

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

export interface Label {
  disabled?: boolean;
  hideLabel?: boolean;
  id?: string;
  label?: ReactNode;
}
const Label: FC<Label> = ({ disabled, id, hideLabel, label }) => {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--label`]: true,
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  if (label) {
    return (
      <Text as="label" htmlFor={id} className={className}>
        {label}
      </Text>
    );
  }
  return null;
};

Label.propTypes = {
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
};

export interface HelperTextProps {
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
      <Text as="div" id={id} className={className}>
        {description}
      </Text>
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
