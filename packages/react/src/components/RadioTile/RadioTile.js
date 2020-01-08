/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import uid from '../../tools/uniqueId';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { CheckmarkFilled16 as CheckmarkFilled } from '@carbon/icons-react';
import { keys, matches } from '../../internal/keyboard';
import deprecate from '../../prop-types/deprecate';

const { prefix } = settings;

function RadioTile({
  children,
  className,
  // eslint-disable-next-line no-unused-vars
  iconDescription,
  light,
  checked,
  name,
  value,
  id,
  onChange,
  tabIndex,
  ...other
}) {
  const { current: inputId } = useRef(id || uid());
  const classes = classNames(
    className,
    `${prefix}--tile`,
    `${prefix}--tile--selectable`,
    {
      [`${prefix}--tile--is-selected`]: checked,
      [`${prefix}--tile--light`]: light,
    }
  );

  function handleOnChange(evt) {
    onChange(value, name, evt);
  }

  function handleOnKeyDown(evt) {
    if (matches(evt, [keys.Enter, keys.Space])) {
      evt.preventDefault();
      onChange(value, name, evt);
    }
  }

  return (
    <>
      <input
        {...other}
        type="radio"
        checked={checked}
        name={name}
        value={value}
        className={`${prefix}--tile-input`}
        onChange={handleOnChange}
        id={inputId}
      />
      <label
        htmlFor={inputId}
        className={classes}
        tabIndex={tabIndex}
        onKeyDown={handleOnKeyDown}>
        <span className={`${prefix}--tile__checkmark`}>
          <CheckmarkFilled />
        </span>
        <span className={`${prefix}--tile-content`}>{children}</span>
      </label>
    </>
  );
}

RadioTile.propTypes = {
  /**
   * `true` if this tile should be selected.
   */
  checked: PropTypes.bool,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * `true` if the `<input>` should be checked at initialization.
   */
  defaultChecked: PropTypes.bool,

  /**
   * The ID of the `<input>`.
   */
  id: PropTypes.string,

  /**
   * The `name` of the `<input>`.
   */
  name: PropTypes.string,

  /**
   * The description of the tile checkmark icon.
   */
  iconDescription: deprecate(
    PropTypes.string,
    'The `iconDescription` prop for `RadioTile` is no longer needed and has ' +
      'been deprecated. It will be moved in the next major release.'
  ),

  /**
   * The handler of the massaged `change` event on the `<input>`.
   */
  onChange: PropTypes.func,

  /**
   * The `value` of the `<input>`.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * Specify the tab index of the wrapper element
   */
  tabIndex: PropTypes.number,

  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,
};

RadioTile.defaultProps = {
  onChange: () => {},
  tabIndex: 0,
  light: false,
};

export default RadioTile;
