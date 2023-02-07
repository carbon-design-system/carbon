/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';

export function Toggle({
  'aria-labelledby': ariaLabelledby,
  className,
  defaultToggled = false,
  disabled = false,
  hideLabel = false,
  id,
  labelA = 'Off',
  labelB = 'On',
  labelText,
  onClick,
  onToggle,
  readOnly,
  size = 'md',
  toggled,
  ...other
}) {
  const prefix = usePrefix();
  const buttonElement = useRef(null);
  const [checked, setChecked] = useControllableState({
    value: toggled,
    onChange: onToggle,
    defaultValue: defaultToggled,
  });

  function handleClick(e) {
    if (!readOnly) {
      setChecked(!checked);
    }
    if (onClick) {
      onClick(e);
    }
  }

  const isSm = size === 'sm';
  const sideLabel = hideLabel ? labelText : checked ? labelB : labelA;
  const renderSideLabel = !(hideLabel && ariaLabelledby);
  const LabelComponent = ariaLabelledby ? 'div' : 'label';

  const wrapperClasses = classNames(
    `${prefix}--toggle`,
    {
      [`${prefix}--toggle--disabled`]: disabled,
      [`${prefix}--toggle--readonly`]: readOnly,
    },
    className
  );

  const labelTextClasses = classNames(`${prefix}--toggle__label-text`, {
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  const appearanceClasses = classNames(`${prefix}--toggle__appearance`, {
    [`${prefix}--toggle__appearance--sm`]: isSm,
  });

  const switchClasses = classNames(`${prefix}--toggle__switch`, {
    [`${prefix}--toggle__switch--checked`]: checked,
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={wrapperClasses}
      onClick={
        ariaLabelledby
          ? (e) => {
              // the underlying <button> can only be activated by keyboard as it is visually hidden;
              // therefore, if this event's target is the <button>, it had to be triggered by
              // the keyboard event which already calls handleClick. if we wouldn't catch this, the
              // onClick and onToggle functions would be called twice whenever the user activates the
              // toggle by keyboard and props['aria-labelledby'] is passed.
              if (buttonElement.current && e.target !== buttonElement.current) {
                handleClick(e);
                buttonElement.current.focus();
              }
            }
          : null
      }>
      <button
        {...other}
        ref={buttonElement}
        id={id}
        className={`${prefix}--toggle__button`}
        role="switch"
        type="button"
        aria-checked={checked}
        aria-labelledby={ariaLabelledby}
        disabled={disabled}
        onClick={handleClick}
      />
      <LabelComponent
        htmlFor={ariaLabelledby ? null : id}
        className={`${prefix}--toggle__label`}>
        {labelText && <span className={labelTextClasses}>{labelText}</span>}
        <div className={appearanceClasses}>
          <div className={switchClasses}>
            {isSm && (
              <svg
                className={`${prefix}--toggle__check`}
                width="6px"
                height="5px"
                viewBox="0 0 6 5">
                <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z" />
              </svg>
            )}
          </div>
          {renderSideLabel && (
            <span className={`${prefix}--toggle__text`} aria-hidden="true">
              {sideLabel}
            </span>
          )}
        </div>
      </LabelComponent>
    </div>
  );
}

Toggle.propTypes = {
  /**
   * Specify another element's id to be used as the label for this toggle
   */
  'aria-labelledby': PropTypes.string,

  /**
   * Specify a custom className to apply to the form-item node
   */
  className: PropTypes.string,

  /**
   * Specify whether the toggle should be on by default
   */
  defaultToggled: PropTypes.bool,

  /**
   * Whether this control should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * If true, the side labels (props.labelA and props.labelB) will be replaced by
   * props.labelText, so that the toggle doesn't render a top label. In order to fully
   * hide any labels, you can use props['aria-labelledby'] to refer to another element
   * that labels the toggle. props.labelText would no longer be required in that case
   * and can therefore be omitted.
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide an id that unique represents the underlying `<button>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify the label for the "off" position
   */
  labelA: PropTypes.node,

  /**
   * Specify the label for the "on" position
   */
  labelB: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control. This is required unless 'aria-labelledby' is provided instead
   */
  labelText: (props, ...rest) => {
    if (!props['aria-labelledby'] && !props.labelText) {
      return new Error(
        'labelText property is required if no aria-labelledby is provided.'
      );
    }

    return PropTypes.node(props, ...rest);
  },

  /**
   * Provide an event listener that is called when the control is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an event listener that is called when the control is toggled
   */
  onToggle: PropTypes.func,

  /**
   * Whether the toggle should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Toggle. Currently only supports 'sm' or 'md' (default)
   */
  size: PropTypes.oneOf(['sm', 'md']),

  /**
   * Specify whether the control is toggled
   */
  toggled: PropTypes.bool,
};

export default Toggle;
