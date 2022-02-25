/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CheckmarkFilled16 as CheckmarkFilled } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { keys, matches } from '../../internal/keyboard';
import deprecate from '../../prop-types/deprecate';
import { useFallbackId } from '../../internal/useId';
import { useFeatureFlag } from '../FeatureFlags';
import { usePrefix } from '../../internal/usePrefix';

function RadioTile({
  children,
  className: customClassName,
  disabled,
  // eslint-disable-next-line no-unused-vars
  iconDescription,
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
  const enabled = useFeatureFlag('enable-v11-release');
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
  const inputProps = enabled ? {} : rest;
  const labelProps = enabled ? rest : {};

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
        {...inputProps}
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
      <label {...labelProps} htmlFor={inputId} className={className}>
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
   * `true` if the `<input>` should be checked at initialization.
   */
  defaultChecked: PropTypes.bool,

  /**
   * Specify whether the RadioTile should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * The description of the tile checkmark icon.
   */
  iconDescription: deprecate(
    PropTypes.string,
    'The `iconDescription` prop for `RadioTile` is no longer needed and has ' +
      'been deprecated. It will be moved in the next major release.'
  ),

  /**
   * The ID of the `<input>`.
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: PropTypes.bool,

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
  light: false,
};

export default RadioTile;
