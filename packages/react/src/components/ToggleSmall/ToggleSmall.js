/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { keys, match } from '../../internal/keyboard';
import { warning } from '../../internal/warning';

const { prefix } = settings;

let didWarnAboutDeprecation = false;

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
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      '`<ToggleSmall>` has been deprecated in favor of `<Toggle size="sm" />` and will be removed in the next major release of `carbon-components-react`'
    );
    didWarnAboutDeprecation = true;
  }

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
  const ariaLabel =
    (typeof labelText === 'string' && labelText) ||
    other['aria-label'] ||
    other.ariaLabel ||
    null;

  return (
    <div className={wrapperClasses}>
      <input
        {...other}
        {...checkedProps}
        aria-label={null}
        type="checkbox"
        id={id}
        className={`${prefix}--toggle-input ${prefix}--toggle-input--small`}
        onChange={(evt) => {
          onChange && onChange(evt);
          onToggle(input.checked, id, evt);
        }}
        ref={(el) => {
          input = el;
        }}
        onKeyUp={(evt) => {
          if (match(evt, keys.Enter)) {
            input.checked = !input.checked;
            onChange && onChange(evt);
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
  ['aria-label']: PropTypes.string.isRequired,

  /**
   * The CSS class for the toggle
   */
  className: PropTypes.string,

  /**
   * `true` to make it toggled on by default.
   */
  defaultToggled: PropTypes.bool,

  /**
   * The `id` attribute for the toggle
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify the label for the "off" position
   */
  labelA: PropTypes.node.isRequired,

  /**
   * Specify the label for the "on" position
   */
  labelB: PropTypes.node.isRequired,

  /**
   * The `aria-label` attribute for the toggle
   */
  labelText: PropTypes.node,
  /**
   * Provide an optional hook that is called when the control is changed
   */
  onChange: PropTypes.func,

  /**
   * The event handler for the `onChange` event.
   */
  onToggle: PropTypes.func,

  /**
   * `true` to make it toggled on
   */
  toggled: PropTypes.bool,
};

ToggleSmall.defaultProps = {
  defaultToggled: false,
  onToggle: () => {},
  labelA: 'Off',
  labelB: 'On',
};

export default ToggleSmall;
