import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const TextArea = ({
  className,
  id,
  labelText,
  hideLabel,
  onChange,
  onClick,
  invalid,
  invalidText,
  light,
  ...other
}) => {
  const textareaProps = {
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
  };

  const textareaClasses = classNames('bx--text-area', className, {
    'bx--text-area--light': light,
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
    <div className="bx--form-requirement">{invalidText}</div>
  ) : null;

  const input = invalid ? (
    <textarea
      {...other}
      {...textareaProps}
      className={textareaClasses}
      data-invalid
    />
  ) : (
    <textarea {...other} {...textareaProps} className={textareaClasses} />
  );

  return (
    <div className="bx--form-item">
      {input}
      {label}
      {error}
    </div>
  );
};

TextArea.propTypes = {
  className: PropTypes.string,
  cols: PropTypes.number,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  id: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  hideLabel: PropTypes.bool,
  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,
};

TextArea.defaultProps = {
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  placeholder: '',
  rows: 4,
  cols: 50,
  invalid: false,
  invalidText: '',
  light: false,
};

export default TextArea;
