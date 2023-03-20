/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames';
import { IconButton } from '../IconButton';
import { usePrefix } from '../../internal/usePrefix';

const Switch = React.forwardRef(function Switch(props, tabRef) {
  const {
    children,
    className,
    disabled,
    index,
    isIconOnly,
    name,
    onClick,
    onKeyDown,
    selected,
    text,
    ...other
  } = props;
  const prefix = usePrefix();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    onClick({ index, name, text });
  };

  const handleKeyDown = (event) => {
    const key = event.key || event.which;

    onKeyDown({ index, name, text, key });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const classes = classNames(className, `${prefix}--content-switcher-btn`, {
    [`${prefix}--content-switcher--selected`]: selected,
  });

  const commonProps = {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    className: classes,
    disabled,
  };

  return isIconOnly ? (
    <IconButton
      label={text}
      type="button"
      ref={tabRef}
      role="tab"
      tabIndex={selected || isHovered ? 0 : -1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-selected={selected}
      aria-label={isIconOnly ? text : null}
      {...other}
      {...commonProps}>
      {children}
    </IconButton>
  ) : (
    <button
      type="button"
      ref={tabRef}
      role="tab"
      tabIndex={selected ? '0' : '-1'}
      aria-selected={selected}
      aria-label={isIconOnly ? text : null}
      {...other}
      {...commonProps}>
      <span className={`${prefix}--content-switcher__label`} title={text}>
        {text !== undefined ? text : children}
      </span>
    </button>
  );
});

Switch.displayName = 'Switch';

Switch.propTypes = {
  /**
   * Provide child elements to be rendered inside of the Switch
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Switch
   */
  className: PropTypes.string,

  /**
   * Specify whether or not the Switch should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * The index of your Switch in your ContentSwitcher that is used for event handlers.
   * Reserved for usage in ContentSwitcher
   */
  index: PropTypes.number,

  /**
   * Passed in from `ContentSwitcher` to render icon-only variant
   */
  isIconOnly: PropTypes.bool,

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
  text: PropTypes.string,
};

Switch.defaultProps = {
  selected: false,
  onClick: () => {},
  onKeyDown: () => {},
};

export default Switch;
