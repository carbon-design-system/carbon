/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const { prefix } = settings;

const Switch = React.forwardRef(function Switch(
  {
    className: customClassName,
    index,
    onClick,
    onKeyDown,
    name,
    selected = false,
    text,
    ...rest
  },
  ref
) {
  const className = cx({
    [`${prefix}--content-switcher-btn`]: true,
    [`${prefix}--content-switcher--selected`]: selected,
    [customClassName]: !!customClassName,
  });

  function handleOnClick() {
    onClick({ index, name, text });
  }

  function handleOnKeyDown(event) {
    onKeyDown({
      index,
      name,
      text,
      key: event.key || event.which || event.keyCode,
    });
  }

  return (
    <button
      aria-selected={selected}
      className={className}
      ref={ref}
      role="tab"
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      tabIndex={selected ? '0' : '-1'}
      type="button"
      {...rest}>
      <span className={`${prefix}--content-switcher__label`}>{text}</span>
    </button>
  );
});

Switch.displayName = 'Switch';
Switch.propTypes = {
  /**
   * Specify an optional className to be added to your Switch
   */
  className: PropTypes.string,

  /**
   * Provide the name of your Switch that is used for event handlers
   */
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The index of your Switch in your ContentSwitcher that is used for event handlers.
   * Reserved for usage in ContentSwitcher
   */
  index: PropTypes.number,

  /**
   * A handler that is invoked when a user clicks on the control.
   */
  onClick: PropTypes.func,

  /**
   * A handler that is invoked on the key down event for the control.
   */
  onKeyDown: PropTypes.func,

  /**
   * Whether your Switch is selected. Reserved for usage in ContentSwitcher
   */
  selected: PropTypes.bool,

  /**
   * Provide the contents of your Switch
   */
  text: PropTypes.string.isRequired,
};

export default Switch;
