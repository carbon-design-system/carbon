/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import WarningFilled16 from '@carbon/icons-react/lib/warning--filled/16';

const { prefix } = settings;

const DefaultCharCounter = ({ disabled, count, maxLength }) => {
  const charCounterClasses = classNames(
    `${prefix}--text-area--character-counter`,
    {
      [`${prefix}--text-area--character-counter--disabled`]: disabled,
    }
  );
  return (
    <span className={charCounterClasses}>
      <span className={`${prefix}--text-area--character-counter--length`}>
        {count}
      </span>
      /
      <span className={`${prefix}--text-area--character-counter--maxlength`}>
        {maxLength}
      </span>
    </span>
  );
};

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
  charCount,
  maxLength,
  defaultValue,
  renderCharCounter: CharCounter = DefaultCharCounter,
  ...other
}) => {
  const [textareaVal, setInput] = useState(defaultValue);
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
    maxLength: maxLength || null,
  };

  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: other.disabled,
  });

  const label = (() => {
    const labelContent = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;
    if (labelContent && charCount) {
      return (
        <div className={`${prefix}--text-area__character-counter-title`}>
          {labelContent}
          <CharCounter
            disabled={other.disabled}
            count={textareaVal.length}
            maxLength={maxLength}
          />
        </div>
      );
    }
    return labelContent;
  })();

  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: other.disabled,
  });

  const helper = (() => {
    const helperContent = helperText ? (
      <div className={helperTextClasses}>{helperText}</div>
    ) : null;
    if (!labelText && charCount) {
      return (
        <div className={`${prefix}--text-area__character-counter-title`}>
          {helperContent}
          <CharCounter
            disabled={other.disabled}
            count={textareaVal.length}
            maxLength={maxLength}
          />
        </div>
      );
    }

    return helperContent;
  })();

  const errorId = id + '-error-msg';

  const error = invalid ? (
    <div className={`${prefix}--form-requirement`} id={errorId}>
      {invalidText}
    </div>
  ) : null;

  const textareaClasses = classNames(`${prefix}--text-area`, className, {
    [`${prefix}--text-area--light`]: light,
    [`${prefix}--text-area--invalid`]: invalid,
  });

  const input = (
    <textarea
      {...other}
      {...textareaProps}
      className={textareaClasses}
      aria-invalid={invalid || null}
      aria-describedby={invalid ? errorId : null}
      disabled={other.disabled}
      value={textareaVal}
      onInput={e => setInput(e.target.value)}
    />
  );

  return (
    <div className={`${prefix}--form-item`}>
      {label}
      {helper}
      <div
        className={`${prefix}--text-area__wrapper`}
        data-invalid={invalid || null}>
        {invalid && (
          <WarningFilled16 className={`${prefix}--text-area__invalid-icon`} />
        )}
        {input}
      </div>
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

  /**
   * Specify whether the character counter is shown
   */
  charCount: PropTypes.bool,

  /**
   * The maximum allowed input value length
   */
  maxLength: PropTypes.number,
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
