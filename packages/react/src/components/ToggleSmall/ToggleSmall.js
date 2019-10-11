/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { keys, match } from '../../internal/keyboard';

const { prefix } = settings;

const ToggleSmall = ({
  className,
  defaultToggled,
  toggled,
  onChange,
  onToggle,
  id,
  labelText,
  labelA,
  labelB,
  ...other
}) => {
  let input;
  const wrapperClasses = classNames(`${prefix}--form-item`, {
    [className]: className,
  });

  const checkedProps = {};

  if (typeof toggled !== 'undefined') {
    checkedProps.checked = toggled;
  } else {
    checkedProps.defaultChecked = defaultToggled;
  }
  const ariaLabel = labelText || other['aria-label'] || other.ariaLabel || null;

  return (
    <div className={wrapperClasses}>
      <input
        {...other}
        {...checkedProps}
        aria-label={null}
        type="checkbox"
        id={id}
        className={`${prefix}--toggle-input ${prefix}--toggle-input--small`}
        onChange={evt => {
          onChange && onChange(evt);
          onToggle(input.checked, id, evt);
        }}
        ref={el => {
          input = el;
        }}
        onKeyUp={evt => {
          if (match(evt, keys.Enter)) {
            input.checked = !input.checked;
            onChange(evt);
            onToggle(input.checked, id, evt);
          }
        }}
      />
      <label
        className={`${prefix}--toggle-input__label`}
        htmlFor={id}
        aria-label={ariaLabel}>
        {labelText}
        <span className={`${prefix}--toggle__switch`}>
          <svg
            className={`${prefix}--toggle__check`}
            width="6px"
            height="5px"
            viewBox="0 0 6 5">
            <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z" />
          </svg>
          <span className={`${prefix}--toggle__text--off`} aria-hidden="true">
            {labelA}
          </span>
          <span className={`${prefix}--toggle__text--on`} aria-hidden="true">
            {labelB}
          </span>
        </span>
      </label>
    </div>
  );
};

ToggleSmall.propTypes = {
  /**
   * The CSS class for the toggle
   */
  className: PropTypes.string,

  /**
   * `true` to make it toggled on by default.
   */
  defaultToggled: PropTypes.bool,

  /**
   * The event handler for the `onChange` event.
   */
  onToggle: PropTypes.func,

  /**
   * The `id` attribute for the toggle
   */
  id: PropTypes.string.isRequired,

  /**
   * `true` to make it toggled on
   */
  toggled: PropTypes.bool,

  /**
   * The `aria-label` attribute for the toggle
   */
  labelText: PropTypes.string,
  ['aria-label']: PropTypes.string.isRequired,

  /**
   * Specify the label for the "off" position
   */
  labelA: PropTypes.string.isRequired,

  /**
   * Specify the label for the "on" position
   */
  labelB: PropTypes.string.isRequired,
};

ToggleSmall.defaultProps = {
  defaultToggled: false,
  onToggle: () => {},
  labelA: 'Off',
  labelB: 'On',
};

export default ToggleSmall;
