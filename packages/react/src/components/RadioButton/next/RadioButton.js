import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';
import getUniqueId from '../../../tools/uniqueId';
import { Text } from '../../Text';

const RadioButton = React.forwardRef(function RadioButton(
  {
    className,
    hideLabel,
    id,
    labelPosition = 'right',
    labelText = '',
    name,
    onChange = () => {},
    value = '',
    ...other
  },
  ref
) {
  const prefix = usePrefix();
  const { current: uid } = useRef(getUniqueId());
  const uniqueId = id || uid;

  function handleOnChange(event) {
    onChange(value, name, event);
  }

  const innerLabelClasses = classNames({
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  const wrapperClasses = classNames(
    className,
    `${prefix}--radio-button-wrapper`,
    {
      [`${prefix}--radio-button-wrapper--label-${labelPosition}`]:
        labelPosition !== 'right',
    }
  );

  return (
    <div className={wrapperClasses}>
      <input
        {...other}
        type="radio"
        className={`${prefix}--radio-button`}
        onChange={handleChange}
        id={uniqueId}
        ref={ref}
      />
      <label htmlFor={uniqueId} className={`${prefix}--radio-button__label`}>
        <span className={`${prefix}--radio-button__appearance`} />
        {labelText && <Text className={innerLabelClasses}>{labelText}</Text>}
      </label>
    </div>
  );
});

RadioButton.propTypes = {
  /**
   * Specify whether the <RadioButton> is currently checked
   */
  checked: PropTypes.bool,

  /**
   * Provide an optional className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether the <RadioButton> should be checked by default
   */
  defaultChecked: PropTypes.bool,

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id: PropTypes.string,

  /**
   * Provide where label text should be placed
   * NOTE: `top`/`bottom` are deprecated
   */
  labelPosition: PropTypes.oneOf(['right', 'left']),

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Provide a name for the underlying `<input>` node
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange: PropTypes.func,

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick: PropTypes.func,

  /**
   * Specify the value of the <RadioButton>
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default RadioButton;
