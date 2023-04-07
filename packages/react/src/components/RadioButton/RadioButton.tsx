/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { useRef } from 'react';
import classNames from 'classnames';
import { Text } from '../Text';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import mergeRefs from '../../tools/mergeRefs';

type ExcludedAttributes = 'onChange';

export interface RadioButtonProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ExcludedAttributes
  > {
  /**
   * Specify whether the `<RadioButton>` is currently checked
   */
  checked?: boolean;

  /**
   * Provide an optional className to be applied to the containing node
   */
  className?: string;

  /**
   * Specify whether the `<RadioButton>` should be checked by default
   */
  defaultChecked?: boolean;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id?: string;

  /**
   * Provide where label text should be placed
   * NOTE: `top`/`bottom` are deprecated
   */
  labelPosition?: 'left' | 'right';

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText: ReactNodeLike;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange?: (
    value: string | number,
    name: string | undefined,
    event: any
  ) => void;

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;

  /**
   * Specify the value of the `<RadioButton>`
   */
  value?: string | number;
}

const RadioButton = React.forwardRef((props: RadioButtonProps, ref) => {
  const {
    className,
    disabled,
    hideLabel,
    id,
    labelPosition = 'right',
    labelText = '',
    name,
    onChange = () => {},
    value = '',
    ...rest
  } = props;

  const prefix = usePrefix();
  const uid = useId('radio-button');
  const uniqueId = id || uid;

  function handleOnChange(event) {
    onChange(value, name, event);
  }

  const innerLabelClasses = classNames(`${prefix}--radio-button__label-text`, {
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

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={wrapperClasses}>
      <input
        {...rest}
        type="radio"
        className={`${prefix}--radio-button`}
        onChange={handleOnChange}
        id={uniqueId}
        ref={mergeRefs(inputRef, ref)}
        disabled={disabled}
        value={value}
        name={name}
      />
      <label htmlFor={uniqueId} className={`${prefix}--radio-button__label`}>
        <span className={`${prefix}--radio-button__appearance`} />
        {labelText && <Text className={innerLabelClasses}>{labelText}</Text>}
      </label>
    </div>
  );
});

RadioButton.displayName = 'RadioButton';

RadioButton.propTypes = {
  /**
   * Specify whether the `<RadioButton>` is currently checked
   */
  checked: PropTypes.bool,

  /**
   * Provide an optional className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether the `<RadioButton>` should be checked by default
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
   * Specify the value of the `<RadioButton>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default RadioButton;
