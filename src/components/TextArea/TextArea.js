import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TextArea = ({
  className,
  id,
  labelText,
  hideLabel,
  onChange,
  onClick,
  invalid,
  invalidText,
  helperText,
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

  const errorId = id + '-error-msg';
  const textareaClasses = classNames(`${prefix}--text-area`, className, {
    [`${prefix}--text-area--light`]: light,
  });
  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
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

  const input = invalid ? (
    <textarea
      {...other}
      {...textareaProps}
      aria-invalid
      aria-describedby={errorId}
      className={textareaClasses}
      data-invalid
    />
  ) : (
    <textarea {...other} {...textareaProps} className={textareaClasses} />
  );

  const helper = helperText ? (
    <div className={`${prefix}--form__helper-text`}>{helperText}</div>
  ) : null;

  return (
    <div className={`${prefix}--form-item`}>
      {label}
      {input}
      {helper}
      {error}
    </div>
  );
};

TextArea.propTypes = {
  /**
   * Provide a custom className that is applied directly to the underlying
   * <textarea> node
   */
  className: PropTypes.string,

  /**
   * Specify the `cols` attribute for the underlying <textarea> node
   */
  cols: PropTypes.number,

  /**
   * Optionally provide the default value of the <textarea>
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide a unique identifier for the control
   */
  id: PropTypes.string,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Optionally provide an `onChange` handler that is called whenever <textarea>
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * <textarea> is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the <textarea>
   */
  placeholder: PropTypes.string,

  /**
   * Specify the rows attribute for the <textarea>
   */
  rows: PropTypes.number,

  /**
   * Provide the current value of the <textarea>
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.string,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify whether you want the light version of this control
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
  helperText: '',
  light: false,
};

export default TextArea;
