import React, {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import PropTypes, { ReactNodeLike } from 'prop-types';
import { View, ViewOff } from '@carbon/icons-react';
import { useNormalizedInputProps } from '../../internal/useNormalizedInputProps';
import { textInputProps } from './util';
import { FormContext } from '../FluidForm';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';

type ExcludedAttributes = 'size';

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes> {
  /**
   * Provide a custom className that is applied directly to the underlyling `<input>` node
   */
  className?: string;

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Specify whether to display the character counter
   */
  enableCounter?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: ReactNodeLike;

  /**
   * Specify whether or not the underlying label is visually hidden
   */
  hideLabel?: boolean;

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  hidePasswordLabel?: string;

  /**
   * Provide a unique identifier for the input field
   */
  id: string;

  /**
   * `true` to use the inline version
   */
  inline?: boolean;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: ReactNodeLike;

  /**
   * Provide the text that will be read by a screen reader when visiting this control
   */
  labelText: ReactNodeLike;

  /**
   * @deprecated The `light` prop for `PasswordInput` has been deprecated in favor of the new `Layer` component. It will be removed in the next major release.
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light?: boolean;

  /**
   * Max character count allowed for the input. This is needed in order for enableCounter to display
   */
  maxCount?: number;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>` is updated
   * @param evt Change event triggered by `<input>`
   * @returns {void}
   */
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Optionally provide an `onClick` handler that is called whenever the `<input>` is returned
   * @param evt Mouse event triggered by `<input>`
   * @returns {void}
   */
  onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;

  /**
   * Callback function that is called whenever the toggle password visibility button is clicked
   * @param evt Mouse event triggered by the password visibility `<button>`
   * @returns {void}
   */
  onTogglePasswordVisibility?: (
    evt: React.MouseEvent<HTMLButtonElement>
  ) => void;

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder?: string;

  /**
   * Whether the input should be read-only
   */
  readOnly?: boolean;

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel?: string;

  /**
   * Specify the size of the Text Input. Supports `sm`, `md`, or `lg`.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: `start`, `center`, or `end`.
   */
  tooltipAlignment?: 'start' | 'center' | 'end';

  /**
   * Specify the direction of the tooltip for the icon-only button.
   * Can be either `top`, `right`, `bottom`, or `left`
   */
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * The input type, either `password` or `text`
   */
  type?: 'password' | 'text';

  /**
   * Provide the current value of the `<input>`
   */
  value?: string | number;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNodeLike;
}

const PasswordInput = React.forwardRef(function PasswordInput(
  {
    className,
    disabled = false,
    helperText,
    hideLabel,
    hidePasswordLabel = 'Hide password',
    id,
    inline,
    invalid = false,
    invalidText,
    labelText,
    light,
    onChange = () => {},
    onClick = () => {},
    onTogglePasswordVisibility,
    placeholder,
    readOnly,
    size = 'md',
    showPasswordLabel = 'Show password',
    tooltipPosition = 'bottom',
    tooltipAlignment = 'center',
    type = 'password',
    warn = false,
    warnText,
    ...rest
  }: PasswordInputProps,
  ref
) {
  const [inputType, setInputType] = useState(type);
  const prefix = usePrefix();
  const normalizedProps = useNormalizedInputProps({
    id,
    invalid,
    invalidText,
    warn,
    warnText,
    readOnly,
    disabled,
  });

  const { isFluid } = useContext(FormContext);

  const handleTogglePasswordVisibility = (event) => {
    setInputType(inputType === 'password' ? 'text' : 'password');
    onTogglePasswordVisibility && onTogglePasswordVisibility(event);
  };
  const textInputClasses = classNames(
    `${prefix}--text-input`,
    `${prefix}--password-input`,
    className,
    {
      [`${prefix}--text-input--light`]: light,
      [`${prefix}--text-input--invalid`]: normalizedProps.invalid,
      [`${prefix}--text-input--warning`]: normalizedProps.warn,
      [`${prefix}--text-input--${size}`]: size,
    }
  );
  const sharedTextInputProps = {
    id,
    onChange: (evt) => {
      if (!disabled) {
        onChange(evt);
      }
    },
    onClick: (evt) => {
      if (!disabled) {
        onClick(evt);
      }
    },
    placeholder,
    type: inputType,
    className: textInputClasses,
    ref,
    ...rest,
  };
  const inputWrapperClasses = classNames(
    `${prefix}--form-item`,
    `${prefix}--text-input-wrapper`,
    `${prefix}--password-input-wrapper`,
    {
      [`${prefix}--text-input-wrapper--light`]: light,
      [`${prefix}--text-input-wrapper--inline`]: inline,
      [`${prefix}--text-input--fluid`]: isFluid,
    }
  );
  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--label--inline`]: inline,
    [`${prefix}--label--inline--${size}`]: inline && !!size,
  });
  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
    [`${prefix}--form__helper-text--inline`]: inline,
  });
  const fieldOuterWrapperClasses = classNames(
    `${prefix}--text-input__field-outer-wrapper`,
    {
      [`${prefix}--text-input__field-outer-wrapper--inline`]: inline,
    }
  );
  const fieldWrapperClasses = classNames(
    `${prefix}--text-input__field-wrapper`,
    {
      [`${prefix}--text-input__field-wrapper--warning`]: normalizedProps.warn,
    }
  );
  const iconClasses = classNames({
    [`${prefix}--text-input__invalid-icon`]:
      normalizedProps.invalid || normalizedProps.warn,
    [`${prefix}--text-input__invalid-icon--warning`]: normalizedProps.warn,
  });

  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;
  const helper = helperText ? (
    <div id={normalizedProps.helperId} className={helperTextClasses}>
      {helperText}
    </div>
  ) : null;

  const passwordIsVisible = inputType === 'text';
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
      [`${prefix}--btn--disabled`]: disabled,
      [`${prefix}--tooltip--${tooltipPosition}`]: tooltipPosition,
      [`${prefix}--tooltip--align-${tooltipAlignment}`]: tooltipAlignment,
    }
  );
  const input = (
    <>
      <input
        {...textInputProps({
          sharedTextInputProps,
          invalid: normalizedProps.invalid,
          invalidId: normalizedProps.invalidId,
          warn: normalizedProps.warn,
          warnId: normalizedProps.warnId,
          hasHelper: Boolean(
            helperText &&
              !isFluid &&
              (inline || (!inline && !normalizedProps.validation))
          ),
          helperId: normalizedProps.helperId,
        })}
        disabled={disabled}
        data-toggle-password-visibility={inputType === 'password'}
      />
      {isFluid && <hr className={`${prefix}--text-input__divider`} />}
      <button
        type="button"
        className={passwordVisibilityToggleClasses}
        disabled={disabled}
        onClick={handleTogglePasswordVisibility}>
        {!disabled && (
          <span className={`${prefix}--assistive-text`}>
            {passwordIsVisible ? hidePasswordLabel : showPasswordLabel}
          </span>
        )}
        {passwordVisibilityIcon}
      </button>
    </>
  );

  useEffect(() => {
    setInputType(type);
  }, [type]);

  const Icon = normalizedProps.icon as typeof React.Component;

  return (
    <div className={inputWrapperClasses}>
      {!inline ? (
        label
      ) : (
        <div className={`${prefix}--text-input__label-helper-wrapper`}>
          {label}
          {!isFluid && helper}
        </div>
      )}
      <div className={fieldOuterWrapperClasses}>
        <div
          className={fieldWrapperClasses}
          data-invalid={normalizedProps.invalid || null}>
          {Icon && <Icon className={iconClasses} />}
          {input}
          {isFluid && !inline && normalizedProps.validation}
        </div>
        {!isFluid && !inline && (normalizedProps.validation || helper)}
      </div>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
PasswordInput.propTypes = {
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
   * `true` to use the inline version.
   */
  inline: PropTypes.bool,

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
    'The `light` prop for `PasswordInput` has ' +
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
   * Callback function that is called whenever the toggle password visibility
   * button is clicked
   */
  onTogglePasswordVisibility: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel: PropTypes.string,

  /**
   * Specify the size of the Text Input. Supports `sm`, `md`, or `lg`.
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
   * The input type, either password or text
   */
  type: PropTypes.oneOf(['password', 'text']),

  /**
   * Provide the current value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default PasswordInput;
