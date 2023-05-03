import React, { useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, ViewOff, WarningFilled } from '@carbon/icons-react';
import { textInputProps } from './util';
import { warning } from '../../internal/warning';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const getInstanceId = setupGetInstanceId();

let didWarnAboutDeprecation = false;

const ControlledPasswordInput = React.forwardRef(
  function ControlledPasswordInput(
    {
      labelText,
      className,
      id,
      placeholder,
      onChange,
      onClick,
      hideLabel,
      invalid,
      invalidText,
      helperText,
      light,
      // eslint-disable-next-line react/prop-types
      type = 'password',
      // eslint-disable-next-line react/prop-types
      togglePasswordVisibility,
      tooltipPosition = 'bottom',
      tooltipAlignment = 'center',
      hidePasswordLabel = 'Hide password',
      showPasswordLabel = 'Show password',
      size,
      ...other
    },
    ref
  ) {
    const prefix = usePrefix();
    const { current: controlledPasswordInstanceId } = useRef(getInstanceId());

    if (__DEV__) {
      warning(
        didWarnAboutDeprecation,
        '`<TextInput.ControlledPasswordInput>` has been deprecated in favor of `<TextInput.PasswordInput />` and will be removed in the next major release of `carbon-components-react`'
      );
      didWarnAboutDeprecation = true;
    }

    const errorId = id + '-error-msg';
    const textInputClasses = classNames(
      `${prefix}--text-input`,
      `${prefix}--password-input`,
      className,
      {
        [`${prefix}--text-input--light`]: light,
        [`${prefix}--text-input--invalid`]: invalid,
        [`${prefix}--text-input--${size}`]: size,
      }
    );
    const sharedTextInputProps = {
      id,
      onChange: (evt) => {
        if (!other.disabled) {
          onChange(evt);
        }
      },
      onClick: (evt) => {
        if (!other.disabled) {
          onClick(evt);
        }
      },
      placeholder,
      type,
      ref,
      className: textInputClasses,
      ...other,
    };
    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: other.disabled,
    });
    const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: other.disabled,
    });
    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;
    const error = invalid ? (
      <div className={`${prefix}--form-requirement`} id={errorId}>
        {invalidText}
      </div>
    ) : null;
    const passwordIsVisible = type === 'text';
    const passwordVisibilityIcon = passwordIsVisible ? (
      <ViewOff className={`${prefix}--icon-visibility-off`} />
    ) : (
      <View className={`${prefix}--icon-visibility-on`} />
    );
    const passwordVisibilityToggleClasses = classNames(
      `${prefix}--text-input--password__visibility__toggle`,
      `${prefix}--btn`,
      `${prefix}--btn--icon-only`,
      `${prefix}--tooltip__trigger`,
      `${prefix}--tooltip--a11y`,
      {
        [`${prefix}--tooltip--${tooltipPosition}`]: tooltipPosition,
        [`${prefix}--tooltip--align-${tooltipAlignment}`]: tooltipAlignment,
      }
    );

    const helperId = !helperText
      ? undefined
      : `controlled-password-helper-text-${controlledPasswordInstanceId}`;

    const input = (
      <>
        <input
          {...textInputProps({
            invalid,
            sharedTextInputProps,
            invalidId: errorId,
            hasHelper: !error && helperText,
            helperId,
          })}
          data-toggle-password-visibility={type === 'password'}
        />
        <button
          type="button"
          className={passwordVisibilityToggleClasses}
          onClick={togglePasswordVisibility}>
          <span className={`${prefix}--assistive-text`}>
            {passwordIsVisible ? hidePasswordLabel : showPasswordLabel}
          </span>
          {passwordVisibilityIcon}
        </button>
      </>
    );

    const helper = helperText ? (
      <div id={helperId} className={helperTextClasses}>
        {helperText}
      </div>
    ) : null;

    return (
      <div
        className={`${prefix}--form-item ${prefix}--text-input-wrapper ${prefix}--password-input-wrapper`}>
        {label}
        <div
          className={`${prefix}--text-input__field-wrapper`}
          data-invalid={invalid || null}>
          {invalid && (
            <WarningFilled className={`${prefix}--text-input__invalid-icon`} />
          )}
          {input}
        </div>
        {error ? error : helper}
      </div>
    );
  }
);

ControlledPasswordInput.displayName = 'ControlledPasswordInput';
ControlledPasswordInput.propTypes = {
  /**
   * Provide a custom className that is applied directly to the underlying
   * `<input>` node
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether or not the underlying label is visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  hidePasswordLabel: PropTypes.string,

  /**
   * Provide a unique identifier for the input field
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `ControlledPasswordInput` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel: PropTypes.string,

  /**
   * Specify the size of the Text Input.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * Provide the current value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ControlledPasswordInput.defaultProps = {
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  invalid: false,
  invalidText: '',
  helperText: '',
  size: '',
};

export default ControlledPasswordInput;
