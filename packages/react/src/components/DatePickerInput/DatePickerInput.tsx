/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Calendar, WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { warning } from '../../internal/warning';
import cx from 'classnames';
import PropTypes, { ReactElementLike } from 'prop-types';
import React, {
  cloneElement,
  useContext,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { useId } from '../../internal/useId';
import { Text } from '../Text';
import { deprecate } from '../../prop-types/deprecate';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import { useNormalizedInputProps } from '../../internal/useNormalizedInputProps';

type ExcludedAttributes = 'value' | 'onChange' | 'locale' | 'children';
export type ReactNodeLike =
  | ReactElementLike
  | ReadonlyArray<ReactNode>
  | string
  | number
  | boolean
  | null
  | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
export type func = (...args: any[]) => any;
let didWarnAboutDatePickerInputValue = false;

export interface DatePickerInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, ExcludedAttributes> {
  /**
   * The type of the date picker:
   *
   * * `simple` - Without calendar dropdown.
   * * `single` - With calendar dropdown and single date.
   * * `range` - With calendar dropdown and a date range.
   */
  datePickerType?: 'simple' | 'single' | 'range';

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `DatePickerInput` component
   */
  decorator?: ReactNode;

  /**
   * Specify whether or not the input should be disabled
   */
  disabled?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: ReactNodeLike;

  /**
   * Specify if the label should be hidden
   */
  hideLabel?: boolean;

  /**
   * Specify an id that uniquely identifies the `<input>`
   */
  id: string;

  /**
   * Specify whether or not the input should be invalid
   */
  invalid?: boolean;

  /**
   * Specify the text to be rendered when the input is invalid
   */
  invalidText?: ReactNodeLike;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: ReactNodeLike;

  /**
   * Specify an `onChange` handler that is called whenever a change in the
   * input field has occurred
   */
  onChange?: func;

  /**
   * Provide a function to be called when the input field is clicked
   */
  onClick?: func;

  /**
   * Provide a regular expression that the input value must match
   * TODO:need to be rewritten
   */
  pattern?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    props: { [key: string]: any },
    propName: string,
    componentName: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  ) => null | any | Error;

  /**
   * Specify the placeholder text
   */
  placeholder?: string;

  /**
   * whether the DatePicker is to be readOnly
   */
  readOnly?: boolean;

  /**
   * Specify the size of the Date Picker Input. Currently supports either `sm`, `md`, or `lg` as an option.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `DatePickerInput` component
   */
  slug?: ReactNodeLike;

  /**
   * Specify the type of the `<input>`
   */
  type?: string;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNodeLike;
}

const DatePickerInput = React.forwardRef(function DatePickerInput(
  props: DatePickerInputProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    datePickerType,
    decorator,
    disabled = false,
    helperText,
    hideLabel,
    id,
    invalid = false,
    invalidText,
    labelText,
    onClick = () => {},
    onChange = () => {},
    pattern = '\\d{1,2}\\/\\d{1,2}\\/\\d{4}',
    placeholder,
    size = 'md',
    slug,
    type = 'text',
    warn = false,
    warnText,
    readOnly,
    ...rest
  } = props;
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const datePickerInputInstanceId = useId();

  const normalizedProps = useNormalizedInputProps({
    id,
    readOnly,
    disabled,
    invalid,
    invalidText,
    warn,
    warnText,
  });
  const datePickerInputProps = {
    id,
    onChange: (event) => {
      if (!disabled) {
        onChange(event);
      }
    },
    onClick: (event) => {
      if (!disabled) {
        onClick(event);
      }
    },
    pattern,
    placeholder,
    type,
  };

  if (
    process.env.NODE_ENV !== 'production' &&
    'value' in rest &&
    !didWarnAboutDatePickerInputValue
  ) {
    warning(
      false,
      `The 'value' prop is not supported on the DatePickerInput component. ` +
        `For DatePicker components with 'datePickerType="range"', please ` +
        `pass the 'value' prop (as an array of dates) to the parent ` +
        `DatePicker component instead.`
    );
    didWarnAboutDatePickerInputValue = true;
  }
  const wrapperClasses = cx(`${prefix}--date-picker-input__wrapper`, {
    [`${prefix}--date-picker-input__wrapper--invalid`]: normalizedProps.invalid,
    [`${prefix}--date-picker-input__wrapper--warn`]: normalizedProps.warn,
    [`${prefix}--date-picker-input__wrapper--slug`]: slug,
    [`${prefix}--date-picker-input__wrapper--decorator`]: decorator,
  });
  const labelClasses = cx(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: normalizedProps.disabled,
    [`${prefix}--label--readonly`]: readOnly,
  });
  const helperTextClasses = cx(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: normalizedProps.disabled,
  });
  const inputClasses = cx(`${prefix}--date-picker__input`, {
    [`${prefix}--date-picker__input--${size}`]: size,
    [`${prefix}--date-picker__input--invalid`]: normalizedProps.invalid,
    [`${prefix}--date-picker__input--warn`]: normalizedProps.warn,
  });
  const containerClasses = cx(`${prefix}--date-picker-container`, {
    [`${prefix}--date-picker--nolabel`]: !labelText,
    [`${prefix}--date-picker--fluid--invalid`]:
      isFluid && normalizedProps.invalid,
    [`${prefix}--date-picker--fluid--warn`]: isFluid && normalizedProps.warn,
  });

  const datePickerInputHelperId = !helperText
    ? undefined
    : `datepicker-input-helper-text-${datePickerInputInstanceId}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const inputProps: any = {
    ...rest,
    ...datePickerInputProps,
    className: inputClasses,
    disabled: normalizedProps.disabled,
    ref,
    ['aria-describedby']: helperText ? datePickerInputHelperId : undefined,
  };
  if (normalizedProps.invalid) {
    inputProps['data-invalid'] = true;
  }
  const input = <input {...inputProps} />;

  // AILabel always size `mini`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'mini' })
    : candidate;

  return (
    <div className={containerClasses}>
      {labelText && (
        <Text as="label" htmlFor={id} className={labelClasses}>
          {labelText}
        </Text>
      )}
      <div className={wrapperClasses}>
        <span>
          {input}
          {slug ? (
            normalizedDecorator
          ) : decorator ? (
            <div
              className={`${prefix}--date-picker-input-inner-wrapper--decorator`}>
              {normalizedDecorator}
            </div>
          ) : (
            ''
          )}
          {isFluid && <DatePickerIcon datePickerType={datePickerType} />}
          <DatePickerIcon
            datePickerType={datePickerType}
            invalid={normalizedProps.invalid}
            warn={normalizedProps.warn}
            disabled={normalizedProps.disabled}
            readOnly={readOnly}
          />
        </span>
      </div>
      {normalizedProps.validation}
      {helperText && !normalizedProps.invalid && !normalizedProps.warn && (
        <Text
          as="div"
          id={datePickerInputHelperId}
          className={helperTextClasses}>
          {helperText}
        </Text>
      )}
    </div>
  );
});

DatePickerInput.propTypes = {
  /**
   * The type of the date picker:
   *
   * * `simple` - Without calendar dropdown.
   * * `single` - With calendar dropdown and single date.
   * * `range` - With calendar dropdown and a date range.
   */
  datePickerType: PropTypes.oneOf(['simple', 'single', 'range']),

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `RadioButton` component
   */
  decorator: PropTypes.node,

  /**
   * Specify whether or not the input should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify if the label should be hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify an id that uniquely identifies the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether or not the input should be invalid
   */
  invalid: PropTypes.bool,

  /**
   * Specify the text to be rendered when the input is invalid
   */
  invalidText: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Specify an `onChange` handler that is called whenever a change in the
   * input field has occurred
   */
  onChange: PropTypes.func,

  /**
   * Provide a function to be called when the input field is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide a regular expression that the input value must match
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  pattern: (props, propName, componentName): null | any | Error => {
    if (props[propName] === undefined) {
      return;
    }
    try {
      new RegExp(props[propName]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    } catch (e) {
      return new Error(
        `Invalid value of prop '${propName}' supplied to '${componentName}', it should be a valid regular expression`
      );
    }
  },

  /**
   * Specify the placeholder text
   */
  placeholder: PropTypes.string,

  /**
   * whether the DatePicker is to be readOnly
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Date Picker Input. Currently supports either `sm`, `md`, or `lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

interface DatePickerIconProps {
  datePickerType: 'simple' | 'single' | 'range' | undefined;
  invalid?: boolean;
  warn?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

function DatePickerIcon({
  datePickerType,
  invalid,
  warn,
  disabled,
  readOnly,
}: DatePickerIconProps) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);

  if (datePickerType === 'simple' && !invalid && !warn) {
    if (!isFluid) {
      return null;
    }
  }

  // Don't show invalid/warn icons when disabled or readonly
  if (disabled || readOnly) {
    return (
      <Calendar
        className={`${prefix}--date-picker__icon`}
        role="img"
        aria-hidden="true"></Calendar>
    );
  }

  if (invalid) {
    return (
      <WarningFilled
        className={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--invalid`}
      />
    );
  }

  if (!invalid && warn) {
    return (
      <WarningAltFilled
        className={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--warn`}
      />
    );
  }

  return (
    <Calendar
      className={`${prefix}--date-picker__icon`}
      role="img"
      aria-hidden="true"></Calendar>
  );
}

DatePickerIcon.propTypes = {
  /**
   * The type of the date picker:
   *
   * * `simple` - Without calendar dropdown.
   * * `single` - With calendar dropdown and single date.
   * * `range` - With calendar dropdown and a date range.
   */
  datePickerType: PropTypes.oneOf(['simple', 'single', 'range']),

  /**
   * Specify whether or not the input should be invalid
   */
  invalid: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Specify whether or not the input should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the input is readonly
   */
  readOnly: PropTypes.bool,
};

export default DatePickerInput;
