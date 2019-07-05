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

const Switch = React.forwardRef(function Switch(props, tabRef) {
  const {
    className: customClassName,
    index,
    onClick,
    onFocus,
    onKeyDown,
    name,
    selected,
    text,
    ...rest
  } = props;

  const className = cx({
    [`${prefix}--content-switcher-btn`]: true,
    [`${prefix}--content-switcher--selected`]: selected,
    [customClassName]: !!customClassName,
  });

  function handleOnClick(event) {
    onClick(event, index);
  }

  function handleOnFocus(event) {
    onFocus(event, index);
  }

  return (
    <button
      aria-selected={selected}
      className={className}
      ref={tabRef}
      role="tab"
      onClick={handleOnClick}
      onKeyDown={onKeyDown}
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
   * The index of your Switch in your ContentSwitcher that is used for event handlers.
   * Reserved for usage in ContentSwitcher
   */
  index: PropTypes.number,

  /**
   * Provide the name of your Switch that is used for event handlers
   */
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * A handler that is invoked when a user clicks on the control.
   * Reserved for usage in ContentSwitcher
   */
  onClick: PropTypes.func,

  /**
   * A handler that is invoked on the key down event for the control.
   * Reserved for usage in ContentSwitcher
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

Switch.defaultProps = {
  selected: false,
};

export default Switch;
