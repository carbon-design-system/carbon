/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, ChangeEvent, KeyboardEvent, ReactNode, Ref } from 'react';
import { CheckmarkFilled } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { keys, matches } from '../../internal/keyboard';
import { useFallbackId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';

interface RadioTileProps {
  checked: boolean;
  children: ReactNode;
  className?: string;
  disabled: boolean;
  id?: string;
  light: boolean; // You may update this to match the actual type
  name: string;
  value: string | number;
  onChange: (value: string | number, name: string, event: ChangeEvent<HTMLInputElement>) => void;
  tabIndex: number | null;
}

const RadioTile = forwardRef(function RadioTile(
  {
    children,
    className: customClassName,
    disabled,
    light,
    checked,
    name,
    value,
    id,
    onChange,
    tabIndex,
    ...rest
  }: RadioTileProps,
  ref: Ref<HTMLInputElement>
) {
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

  function handleOnChange(evt: ChangeEvent<HTMLInputElement>) {
    onChange(value, name, evt);
  }

  function handleOnKeyDown(evt: KeyboardEvent<HTMLLabelElement>) {
    if (matches(evt, [keys.Enter, keys.Space])) {
      evt.preventDefault();
      onChange(value, name, evt);
    }
  }

  return (
    <div>
      <input
        checked={checked}
        className={`${prefix}--tile-input`}
        disabled={disabled}
        id={inputId}
        name={name}
        onChange={!disabled ? handleOnChange : undefined}
        onKeyDown={!disabled ? handleOnKeyDown : undefined}
        tabIndex={!disabled ? tabIndex : undefined}
        type="radio"
        value={value}
        ref={ref}
      />
      <label {...rest} htmlFor={inputId} className={className}>
        <span className={`${prefix}--tile__checkmark`}>
          <CheckmarkFilled />
        </span>
        <span className={`${prefix}--tile-content`}>{children}</span>
      </label>
    </div>
  );
});

RadioTile.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `RadioTile` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.'
  ),
  name: PropTypes.string,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

RadioTile.defaultProps = {
  onChange: () => {},
  tabIndex: 0,
};

export default RadioTile;
