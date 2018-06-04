import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const TextInput = ({
  labelText,
  className,
  id,
  placeholder,
  type,
  onChange,
  onClick,
  hideLabel,
  invalid,
  invalidText,
  light,
  ...other
}) => {
  const textInputProps = {
    id,
    onChange: evt => {
      if (!other.disabled) {
        onChange(evt);
      }
    },
    onClick: evt => {
      if (!other.disabled) {
        onClick(evt);
      }
    },
    placeholder,
    type,
  };

  const errorId = id + '-error-msg';
  const textInputClasses = classNames('bx--text-input', className, {
    'bx--text-input--light': light,
  });
  const labelClasses = classNames('bx--label', {
    'bx--visually-hidden': hideLabel,
  });

  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;

  const error = invalid ? (
    <div className="bx--form-requirement" id={errorId}>
      {invalidText}
    </div>
  ) : null;

  const input = invalid ? (
    <input
      {...other}
      {...textInputProps}
      data-invalid
      aria-invalid
      aria-describedby={errorId}
      className={textInputClasses}
    />
  ) : (
    <input {...other} {...textInputProps} className={textInputClasses} />
  );

  return (
    <div className="bx--form-item">
      {input}
      {label}
      {error}
    </div>
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideLabel: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,
};

TextInput.defaultProps = {
  className: 'bx--text__input',
  disabled: false,
  type: 'text',
  onChange: () => {},
  onClick: () => {},
  invalid: false,
  invalidText: '',
  light: false,
};

export default TextInput;
