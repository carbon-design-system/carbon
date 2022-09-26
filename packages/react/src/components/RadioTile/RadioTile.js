/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CheckmarkFilled } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { keys, matches } from '../../internal/keyboard';
import { useFallbackId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';

function RadioTile({
  children,
  className: customClassName,
  disabled,
  // eslint-disable-next-line no-unused-vars
  light,
  checked,
  name,
  value,
  id,
  onChange,
  tabIndex,
  ...rest
}) {
  const prefix = usePrefix();
  const inputId = useFallbackId(id);
  const className = cx(
    customClassName,
    `${prefix}--tile`,
    `${prefix}--tile--selectable`,
    {
      [`${prefix}--tile--is-selected`]: checked,
      [`${prefix}--tile--light`]: light,
      [`${prefix}--tile--disabled`]: disabled,
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
        checked={checked}
        className={`${prefix}--tile-input`}
        disabled={disabled}
        id={inputId}
        name={name}
        onChange={!disabled ? handleOnChange : null}
        onKeyDown={!disabled ? handleOnKeyDown : null}
        tabIndex={!disabled ? tabIndex : null}
        type="radio"
        value={value}
      />
      <label {...rest} htmlFor={inputId} className={className}>
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
   * The tile content.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the RadioTile should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * The ID of the `<input>`.
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `RadioTile` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.'
  ),

  /**
   * The `name` of the `<input>`.
   */
  name: PropTypes.string,

  /**
   * The handler of the massaged `change` event on the `<input>`.
   */
  onChange: PropTypes.func,

  /**
   * Specify the tab index of the wrapper element
   */
  tabIndex: PropTypes.number,

  /**
   * The `value` of the `<input>`.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

RadioTile.defaultProps = {
  onChange: () => {},
  tabIndex: 0,
};

export default RadioTile;
