/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { useControllableState } from '../../../internal/useControllableState';

const { prefix } = settings;

export function Toggle({
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
  size = 'md',
  toggled,
  ...other
}) {
  const [checked, setChecked] = useControllableState(
    toggled,
    onToggle,
    defaultToggled
  );

  function handleClick(e) {
    setChecked(!checked);

    if (onClick) {
      onClick(e);
    }
  }

  const isSm = size === 'sm';
  const sideLabel = hideLabel ? labelText : checked ? labelB : labelA;

  const wrapperClasses = classNames(
    `${prefix}--toggle`,
    {
      [`${prefix}--toggle--disabled`]: disabled,
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
    <div className={wrapperClasses}>
      <button
        {...other}
        id={id}
        className={`${prefix}--toggle__button`}
        role="switch"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
      />
      <label htmlFor={id} className={`${prefix}--toggle__label`}>
        <span className={labelTextClasses}>{labelText}</span>
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
          <span className={`${prefix}--toggle__text`} aria-hidden="true">
            {sideLabel}
          </span>
        </div>
      </label>
    </div>
  );
}

Toggle.propTypes = {
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
   * Specify whether the label should be hidden, or not
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
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Provide an event listener that is called when the control is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an event listener that is called when the control is toggled
   */
  onToggle: PropTypes.func,

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
