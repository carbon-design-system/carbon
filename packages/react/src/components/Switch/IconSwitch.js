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

const noopFn = () => {};

const IconSwitch = React.forwardRef(function Switch(props, tabRef) {
  const {
    align,
    children,
    className,
    disabled,
    enterDelayMs,
    index,
    leaveDelayMs = 0,
    name,
    onClick = noopFn,
    onKeyDown = noopFn,
    selected = false,
    size,
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

  const iconButtonClasses = classNames(
    `${prefix}--content-switcher-popover__wrapper`,
    {
      [`${prefix}--content-switcher-popover--selected`]: selected,
      [`${prefix}--content-switcher-popover--disabled`]: disabled,
    }
  );

  const commonProps = {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    className: classes,
    disabled,
    align,
    enterDelayMs,
    leaveDelayMs,
    size,
  };

  return (
    <IconButton
      label={text}
      type="button"
      ref={tabRef}
      role="tab"
      tabIndex={selected || isHovered ? 0 : -1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-selected={selected}
      aria-label={text}
      wrapperClasses={iconButtonClasses}
      {...other}
      {...commonProps}>
      {children}
    </IconButton>
  );
});

IconSwitch.displayName = 'IconSwitch';

IconSwitch.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'right',
  ]),

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
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs: PropTypes.number,

  /**
   * The index of your Switch in your ContentSwitcher that is used for event handlers.
   * Reserved for usage in ContentSwitcher
   */
  index: PropTypes.number,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,

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
   * Passed in from `ContentSwitcher` to render icon-only variant
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Provide the visible text displayed by the Tooltip
   */
  text: PropTypes.string,
};

export default IconSwitch;
