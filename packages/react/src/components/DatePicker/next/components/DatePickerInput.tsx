/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, cloneElement, isValidElement } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../../../internal/usePrefix';

/**
 * DatePickerInput component props
 * Maintains 100% backwards compatibility with Carbon React v11 API
 */
export interface DatePickerInputProps {
  /**
   * The unique identifier for the input (required)
   */
  id: string;

  /**
   * The label text
   */
  labelText?: React.ReactNode;

  /**
   * The placeholder text
   */
  placeholder?: string;

  /**
   * The input size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Whether the input is invalid
   */
  invalid?: boolean;

  /**
   * The invalid text to display
   */
  invalidText?: React.ReactNode;

  /**
   * Whether the input has a warning
   */
  warn?: boolean;

  /**
   * The warning text to display
   */
  warnText?: React.ReactNode;

  /**
   * Helper text to display below the input
   */
  helperText?: React.ReactNode;

  /**
   * Whether to hide the label visually (still accessible)
   */
  hideLabel?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * The input value
   */
  value?: string;

  /**
   * Default value for uncontrolled component
   */
  defaultValue?: string;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Keydown handler
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;

  /**
   * Icon description for accessibility
   */
  iconDescription?: string;

  /**
   * Calendar icon click handler
   */
  onIconClick?: () => void;

  /**
   * Whether to show the calendar icon
   */
  hideIcon?: boolean;

  /**
   * Pattern for input validation
   */
  pattern?: string;

  /**
   * Type of input
   */
  type?: string;

  /**
   * Whether the input is read-only
   */
  readOnly?: boolean;

  /**
   * Autocomplete attribute
   */
  autoComplete?: string;

  /**
   * Name attribute
   */
  name?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Callback when calendar opens (for internal use)
   */
  onOpen?: () => void;

  /**
   * Decorator component (e.g., AI Label)
   */
  decorator?: React.ReactNode;

  /**
   * @deprecated Use `decorator` instead. Will be removed in next major version.
   */
  slug?: React.ReactNode;
}

/**
 * DatePickerInput component
 * Input field for date picker with Carbon Design System styling
 * Maintains 100% backwards compatibility with Carbon React v11
 */
export const DatePickerInput = forwardRef<
  HTMLInputElement,
  DatePickerInputProps
>(function DatePickerInput(
  {
    id,
    labelText,
    placeholder = 'mm/dd/yyyy',
    size = 'md',
    disabled = false,
    invalid = false,
    invalidText,
    warn = false,
    warnText,
    helperText,
    hideLabel = false,
    className,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onClick,
    iconDescription = 'Open calendar',
    onIconClick,
    hideIcon = false,
    pattern,
    type = 'text',
    readOnly = false,
    autoComplete = 'off',
    name,
    required = false,
    onOpen: _onOpen,
    decorator,
    slug,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  // Check if decorator/slug is an AILabel component
  const candidate = decorator || slug;
  const isAILabel =
    candidate &&
    isValidElement(candidate) &&
    (candidate.type as React.ComponentType)?.displayName === 'AILabel';

  // Clone AILabel with size='mini' if it's an AILabel
  const normalizedDecorator =
    isAILabel && isValidElement(candidate)
      ? cloneElement(candidate as React.ReactElement<{ size?: string }>, {
          size: 'mini',
        })
      : candidate;

  // Generate class names following Carbon Design System patterns
  const wrapperClasses = classNames(
    `${prefix}--date-picker-input__wrapper`,
    className,
    {
      [`${prefix}--date-picker-input__wrapper--slug`]: slug,
      [`${prefix}--date-picker-input__wrapper--decorator`]: decorator,
    }
  );

  const inputClasses = classNames(`${prefix}--date-picker__input`, {
    [`${prefix}--date-picker__input--sm`]: size === 'sm',
    [`${prefix}--date-picker__input--lg`]: size === 'lg',
    [`${prefix}--date-picker__input--invalid`]: invalid,
    [`${prefix}--date-picker__input--warn`]: warn && !invalid,
  });

  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: disabled,
  });

  // Determine which validation message to show
  const showInvalidText = invalid && invalidText;
  const showWarnText = !invalid && warn && warnText;
  const showHelperText = !invalid && !warn && helperText;

  return (
    <>
      {/* Label */}
      {labelText && (
        <label htmlFor={id} className={labelClasses}>
          {labelText}
          {required && <span className={`${prefix}--label__required`}>*</span>}
        </label>
      )}

      {/* Input wrapper with icon */}
      <div className={wrapperClasses}>
        <span>
          <input
            {...rest}
            ref={ref}
            id={id}
            name={name}
            type={type}
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            pattern={pattern}
            autoComplete={autoComplete}
            required={required}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onClick={onClick}
            aria-invalid={invalid || undefined}
            aria-describedby={
              showInvalidText
                ? `${id}-error`
                : showWarnText
                  ? `${id}-warn`
                  : showHelperText
                    ? `${id}-helper`
                    : undefined
            }
          />

          {/* Decorator (e.g., AI Label) - support both decorator and deprecated slug */}
          {slug ? (
            normalizedDecorator
          ) : decorator ? (
            <div
              className={`${prefix}--date-picker-input-inner-wrapper--decorator`}>
              {normalizedDecorator}
            </div>
          ) : null}

          {/* Calendar Icon */}
          {!hideIcon && (
            <button
              type="button"
              className={`${prefix}--date-picker__icon`}
              onClick={onIconClick}
              disabled={disabled || readOnly}
              aria-label={iconDescription}
              tabIndex={-1}>
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true">
                <path d="M26,4h-4V2h-2v2h-8V2h-2v2H6C4.9,4,4,4.9,4,6v20c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V6C28,4.9,27.1,4,26,4z M26,26H6V12h20  V26z M26,10H6V6h4v2h2V6h8v2h2V6h4V10z" />
              </svg>
            </button>
          )}
        </span>
      </div>

      {/* Validation/Helper Text */}
      {showInvalidText && (
        <div id={`${id}-error`} className={`${prefix}--form-requirement`}>
          {invalidText}
        </div>
      )}

      {showWarnText && (
        <div id={`${id}-warn`} className={`${prefix}--form-requirement`}>
          {warnText}
        </div>
      )}

      {showHelperText && (
        <div id={`${id}-helper`} className={`${prefix}--form__helper-text`}>
          {helperText}
        </div>
      )}
    </>
  );
});

DatePickerInput.displayName = 'DatePickerInput';
