/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonKinds } from '../../../prop-types/types';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import toggleClass from '../../../tools/toggleClass';
import { useId } from '../../../internal/useId';
import { composeEventHandlers } from '../../../tools/events';
import { keys, matches } from '../../../internal/keyboard';

const { prefix } = settings;

const IconButton = ({
  className,
  disabled,
  size,
  kind,
  isExpressive,
  isSelected,
  renderIcon: ButtonImageElement,
  iconDescription,
  tooltipPosition,
  tooltipAlignment,
  onClick,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  ...other
}) => {
  const [allowTooltipVisibility, setAllowTooltipVisibility] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const tooltipRef = useRef(null); //do we need this still? idk yet
  const tooltipTimeout = useRef(null); //do we need this still? idk yet

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

  //focus in - show tooltip
  const handleFocus = (evt) => {
    closeTooltips(evt);
    setIsHovered(!isHovered);
    setIsFocused(true);
    setAllowTooltipVisibility(true);
  };

  //focus out -hide tooltip
  const handleBlur = () => {
    setIsHovered(false);
    setIsFocused(false);
    setAllowTooltipVisibility(false);
  };

  //hover in - show tooltip
  const handleMouseEnter = (evt) => {
    setIsHovered(true);
    tooltipTimeout.current && clearTimeout(tooltipTimeout.current);

    if (evt.target === tooltipRef.current) {
      setAllowTooltipVisibility(true);
      return;
    }

    closeTooltips(evt);

    setAllowTooltipVisibility(true);
  };

  //hover out - hide tooltip
  const handleMouseLeave = () => {
    if (!isFocused) {
      tooltipTimeout.current = setTimeout(() => {
        setAllowTooltipVisibility(false);
        setIsHovered(false);
      }, 100);
    }
  };

  const handleClick = (evt) => {
    // Prevent clicks on the tooltip from triggering the button click event
    if (evt.target === tooltipRef.current) {
      evt.preventDefault();
      return;
    }
  };

  //hide tooltip on ESC keydown
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

  const buttonClasses = classNames(className, {
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--icon-only`]: true,
    [`${prefix}--tooltip__trigger`]: true,
    [`${prefix}--tooltip--a11y`]: true,
    [`${prefix}--btn--${kind}`]: kind,
    [`${prefix}--btn--disabled`]: disabled,
    [`${prefix}--btn--expressive`]: isExpressive,
    [`${prefix}--tooltip--hidden`]: !allowTooltipVisibility, //use popover styles
    [`${prefix}--tooltip--visible`]: isHovered, //use popover styles?
    [`${prefix}--btn--selected`]: isSelected && kind === 'ghost',
    [`${prefix}--btn--icon-only--${tooltipPosition}`]: tooltipPosition,
    [`${prefix}--tooltip--align-${tooltipAlignment}`]: tooltipAlignment,
  });

  //what does this do?????? -josefina
  const buttonImage = !ButtonImageElement ? null : (
    <ButtonImageElement
      aria-label={iconDescription}
      className={`${prefix}--btn__icon`}
      aria-hidden="true"
    />
  );

  const dangerButtonVariants = ['danger', 'danger--tertiary', 'danger--ghost'];
  const assistiveId = useId('danger-description');

  let props = {
    disabled,
    size,
    className: buttonClasses,
    'aria-describedby': dangerButtonVariants.includes(kind)
      ? assistiveId
      : null,
    'aria-pressed': kind === 'ghost' ? isSelected : null,
  };

  const assistiveText = (
    <div
      ref={tooltipRef}
      onMouseEnter={handleMouseEnter}
      className={`${prefix}--assistive-text`}>
      {iconDescription}
    </div>
  );

  return React.createElement(
    'button',
    {
      onMouseEnter: composeEventHandlers([onMouseEnter, handleMouseEnter]),
      onMouseLeave: composeEventHandlers([onMouseLeave, handleMouseLeave]),
      onFocus: composeEventHandlers([onFocus, handleFocus]),
      onBlur: composeEventHandlers([onBlur, handleBlur]),
      onClick: composeEventHandlers([handleClick, onClick]),
      ...other,
      ...props,
      type: 'button',
    },
    assistiveText,
    buttonImage
  );
};

IconButton.propTypes = {
  /**
   * Specify an optional className to be added to your Button
   */
  className: PropTypes.string,

  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription: (props) => {
    if (props.renderIcon && !props.children && !props.iconDescription) {
      return new Error(
        'renderIcon property specified without also providing an iconDescription property.'
      );
    }
    return undefined;
  },

  /**
   * Specify whether the Button is expressive, or not
   */
  isExpressive: PropTypes.bool,

  /**
   * Specify whether the Button is currently selected
   */
  isSelected: PropTypes.bool,

  /**
   * Specify the kind of Button you want to create
   */
  kind: PropTypes.oneOf(ButtonKinds).isRequired,

  /**
   * Provide an optional function to be called when the button element
   * loses focus
   */
  onBlur: PropTypes.func,

  /**
   * Provide an optional function to be called when the button element
   * is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional function to be called when the button element
   * receives focus
   */
  onFocus: PropTypes.func,

  /**
   * Provide an optional function to be called when the mouse
   * enters the button element
   */
  onMouseEnter: PropTypes.func,

  /**
   * Provide an optional function to be called when the mouse
   * leaves the button element
   */
  onMouseLeave: PropTypes.func,

  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the button, from a list of available sizes.
   * For `default` buttons, this prop can remain unspecified or use `default`.
   * In the next major release of Carbon, `default`, `field`, and `small` will be removed
   */
  size: PropTypes.oneOf([
    'default',
    'field',
    'small',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
  ]),

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

IconButton.defaultProps = {
  disabled: false,
  kind: 'primary',
  size: 'default',
  tooltipAlignment: 'center',
  tooltipPosition: 'top',
  isExpressive: false,
};

export default IconButton;
