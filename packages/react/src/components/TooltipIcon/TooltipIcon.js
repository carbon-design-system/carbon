/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import { composeEventHandlers } from '../../tools/events';
import { keys, matches } from '../../internal/keyboard';
import toggleClass from '../../tools/toggleClass';
import { usePrefix } from '../../internal/usePrefix';

const getInstanceId = setupGetInstanceId();
const TooltipIcon = ({
  id,
  className,
  children,
  direction,
  disabled,
  align,
  onClick,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  renderIcon: IconElement,
  tooltipText,
  ...rest
}) => {
  const prefix = usePrefix();
  const [allowTooltipVisibility, setAllowTooltipVisibility] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const tooltipRef = useRef(null);
  const tooltipTimeout = useRef(null);
  const tooltipId = id || `icon-tooltip-${getInstanceId()}`;
  const tooltipTriggerClasses = cx(
    `${prefix}--tooltip__trigger`,
    `${prefix}--tooltip--a11y`,
    className,
    {
      [`${prefix}--tooltip--${direction}`]: direction,
      [`${prefix}--tooltip--align-${align}`]: align,
      [`${prefix}--tooltip--hidden`]: !allowTooltipVisibility || disabled,
      [`${prefix}--tooltip--visible`]: isHovered,
    }
  );

  const closeTooltips = (evt) => {
    const tooltipNode = document?.querySelectorAll(`.${prefix}--tooltip--a11y`);
    [...tooltipNode].map((node) => {
      toggleClass(
        node,
        `${prefix}--tooltip--hidden`,
        node !== evt.currentTarget
      );
    });
  };

  const handleFocus = (evt) => {
    closeTooltips(evt);
    setIsFocused(true);
    setAllowTooltipVisibility(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
    setIsFocused(false);
    setAllowTooltipVisibility(false);
  };

  const handleMouseEnter = (evt) => {
    if (!disabled) {
      tooltipTimeout.current && clearTimeout(tooltipTimeout.current);

      if (evt.target === tooltipRef.current) {
        setAllowTooltipVisibility(true);
        return;
      }

      closeTooltips(evt);

      setAllowTooltipVisibility(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isFocused) {
      tooltipTimeout.current = setTimeout(() => {
        setAllowTooltipVisibility(false);
        setIsHovered(false);
      }, 100);
    }
  };

  const handleClick = (evt) => {
    setAllowTooltipVisibility(false);
    // Prevent clicks on the tooltip from triggering the button click event
    if (evt.target === tooltipRef.current) {
      evt.preventDefault();
      return;
    }
  };

  useEffect(() => {
    const handleEscKeyDown = (event) => {
      if (matches(event, [keys.Escape])) {
        setAllowTooltipVisibility(false);
        setIsHovered(false);
      }
    };
    document.addEventListener('keydown', handleEscKeyDown);
    return () => document.removeEventListener('keydown', handleEscKeyDown);
  }, []);

  let cursorStyle;
  if (disabled) {
    cursorStyle = 'not-allowed';
  } else {
    cursorStyle = onClick ? 'pointer' : 'default';
  }

  return (
    <button
      disabled={disabled}
      style={{ cursor: cursorStyle }}
      {...rest}
      type="button"
      className={tooltipTriggerClasses}
      aria-describedby={tooltipId}
      onMouseEnter={composeEventHandlers([onMouseEnter, handleMouseEnter])}
      onMouseLeave={composeEventHandlers([onMouseLeave, handleMouseLeave])}
      onFocus={composeEventHandlers([onFocus, handleFocus])}
      onBlur={composeEventHandlers([onBlur, handleBlur])}
      onClick={composeEventHandlers([handleClick, onClick])}>
      <span
        ref={tooltipRef}
        onMouseEnter={handleMouseEnter}
        className={`${prefix}--assistive-text`}
        id={tooltipId}>
        {tooltipText}
      </span>
      {IconElement && <IconElement />}
      {!IconElement && children}
    </button>
  );
};

TooltipIcon.propTypes = {
  /**
   * Specify the alignment (to the trigger button) of the tooltip.
   * Can be one of: start, center, or end.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Specify an icon as children that will be used as the tooltip trigger. This
   * can be an icon from our Icon component, or a custom SVG element.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the trigger node
   */
  className: PropTypes.string,

  /**
   * Specify the direction of the tooltip. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'right', 'left', 'bottom']),

  /**
   * Specify whether the `<TooltipIcon>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Optionally specify a custom id for the tooltip. If one is not provided, we
   * generate a unique id for you.
   */
  id: PropTypes.string,

  /**
   * The event handler for the `blur` event.
   */
  onBlur: PropTypes.func,

  /**
   * The event handler for the `click` event.
   */
  onClick: PropTypes.func,

  /**
   * The event handler for the `focus` event.
   */
  onFocus: PropTypes.func,

  /**
   * The event handler for the `mouseenter` event.
   */
  onMouseEnter: PropTypes.func,

  /**
   * The event handler for the `mouseleave` event.
   */
  onMouseLeave: PropTypes.func,

  /**
   * Function called to override icon rendering.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Provide the ARIA label for the tooltip.
   * TODO: rename this prop (will be a breaking change)
   */
  tooltipText: PropTypes.node.isRequired,
};

TooltipIcon.defaultProps = {
  direction: 'bottom',
  align: 'center',
};

export default TooltipIcon;
