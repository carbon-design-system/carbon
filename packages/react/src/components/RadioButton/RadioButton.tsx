/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ReactElement, ReactNode, useRef } from 'react';
import classNames from 'classnames';
import { Text } from '../Text';
import deprecate from '../../prop-types/deprecate';
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
   * **Experimental**: Provide a `decorator` component to be rendered inside the `RadioButton` component
   */
  decorator?: ReactNode;

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
  labelText: ReactNode;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange?: (
    value: RadioButtonProps['value'],
    name: RadioButtonProps['name'],
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioButton` component
   */
  slug?: ReactNode;

  /**
   * Specify the value of the `<RadioButton>`
   */
  value?: string | number;

  /**
   * `true` to specify if the input is required.
   */
  required?: boolean;
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, ref) => {
    const {
      className,
      decorator,
      disabled,
      hideLabel,
      id,
      labelPosition = 'right',
      labelText = '',
      name,
      onChange = () => {},
      value = '',
      slug,
      required,
      ...rest
    } = props;

    const prefix = usePrefix();
    const uid = useId('radio-button');
    const uniqueId = id || uid;

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
      onChange(value, name, event);
    }

    const innerLabelClasses = classNames(
      `${prefix}--radio-button__label-text`,
      {
        [`${prefix}--visually-hidden`]: hideLabel,
      }
    );

    const wrapperClasses = classNames(
      className,
      `${prefix}--radio-button-wrapper`,
      {
        [`${prefix}--radio-button-wrapper--label-${labelPosition}`]:
          labelPosition !== 'right',
        [`${prefix}--radio-button-wrapper--slug`]: slug,
        [`${prefix}--radio-button-wrapper--decorator`]: decorator,
      }
    );

    const inputRef = useRef<HTMLInputElement>(null);

    let normalizedDecorator = React.isValidElement(slug ?? decorator)
      ? (slug ?? decorator)
      : null;
    if (
      normalizedDecorator &&
      normalizedDecorator['type']?.displayName === 'AILabel'
    ) {
      const size =
        (normalizedDecorator as ReactElement<any>).props?.['kind'] === 'inline'
          ? 'md'
          : 'mini';
      normalizedDecorator = React.cloneElement(
        normalizedDecorator as React.ReactElement<any>,
        {
          size,
        }
      );
    }

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
          required={required}
        />
        <label htmlFor={uniqueId} className={`${prefix}--radio-button__label`}>
          <span className={`${prefix}--radio-button__appearance`} />
          {labelText && (
            <Text className={innerLabelClasses}>
              {labelText}
              {slug ? (
                normalizedDecorator
              ) : decorator ? (
                <div
                  className={`${prefix}--radio-button-wrapper-inner--decorator`}>
                  {normalizedDecorator}
                </div>
              ) : (
                ''
              )}
            </Text>
          )}
        </label>
      </div>
    );
  }
);

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
   * **Experimental**: Provide a decorator component to be rendered inside the `RadioButton` component
   */
  decorator: PropTypes.node,

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
   * `true` to specify if the control is required.
   */
  required: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioButton` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Specify the value of the `<RadioButton>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default RadioButton;
