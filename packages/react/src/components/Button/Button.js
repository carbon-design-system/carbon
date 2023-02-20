/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import classNames from 'classnames';
import { ButtonKinds } from '../../prop-types/types';
import { IconButton } from '../IconButton';
import { composeEventHandlers } from '../../tools/events';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';

const Button = React.forwardRef(function Button(
  {
    as,
    children,
    className,
    dangerDescription = 'danger',
    disabled = false,
    hasIconOnly = false,
    href,
    iconDescription,
    isExpressive = false,
    isSelected,
    kind = 'primary',
    onBlur,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    renderIcon: ButtonImageElement,
    size = 'lg',
    tabIndex = 0,
    tooltipAlignment = 'center',
    tooltipPosition = 'top',
    type = 'button',
    ...rest
  },
  ref
) {
  const tooltipRef = useRef(null);
  const prefix = usePrefix();

  const handleClick = (evt) => {
    // Prevent clicks on the tooltip from triggering the button click event
    if (evt.target === tooltipRef.current) {
      evt.preventDefault();
      return;
    }
  };

  const buttonClasses = classNames(className, {
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--sm`]: size === 'sm' && !isExpressive,
    [`${prefix}--btn--md`]: size === 'md' && !isExpressive,
    [`${prefix}--btn--xl`]: size === 'xl',
    [`${prefix}--btn--2xl`]: size === '2xl',
    [`${prefix}--btn--${kind}`]: kind,
    [`${prefix}--btn--disabled`]: disabled,
    [`${prefix}--btn--expressive`]: isExpressive,
    [`${prefix}--btn--icon-only`]: hasIconOnly,
    [`${prefix}--btn--selected`]: hasIconOnly && isSelected && kind === 'ghost',
  });

  const commonProps = {
    tabIndex,
    className: buttonClasses,
    ref,
  };

  const buttonImage = !ButtonImageElement ? null : (
    <ButtonImageElement
      aria-label={iconDescription}
      className={`${prefix}--btn__icon`}
      aria-hidden="true"
    />
  );

  const iconOnlyImage = !ButtonImageElement ? null : <ButtonImageElement />;

  const dangerButtonVariants = ['danger', 'danger--tertiary', 'danger--ghost'];

  let component = 'button';
  const assistiveId = useId('danger-description');
  let otherProps = {
    disabled,
    type,
    'aria-describedby': dangerButtonVariants.includes(kind)
      ? assistiveId
      : null,
    'aria-pressed': hasIconOnly && kind === 'ghost' ? isSelected : null,
  };
  const anchorProps = {
    href,
  };

  let assistiveText;
  if (dangerButtonVariants.includes(kind)) {
    assistiveText = (
      <span id={assistiveId} className={`${prefix}--visually-hidden`}>
        {dangerDescription}
      </span>
    );
  } else {
    assistiveText = null;
  }

  if (as) {
    component = as;
    otherProps = {
      ...otherProps,
      ...anchorProps,
    };
  } else if (href && !disabled) {
    component = 'a';
    otherProps = anchorProps;
  }

  const Button = React.createElement(
    component,
    {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onClick,
      ...rest,
      ...commonProps,
      ...otherProps,
    },
    assistiveText,
    children,
    buttonImage
  );

  if (hasIconOnly) {
    let align;

    if (tooltipPosition === 'top' || tooltipPosition === 'bottom') {
      if (tooltipAlignment === 'center') {
        align = tooltipPosition;
      }
      if (tooltipAlignment === 'end') {
        align = `${tooltipPosition}-right`;
      }
      if (tooltipAlignment === 'start') {
        align = `${tooltipPosition}-left`;
      }
    }

    if (tooltipPosition === 'right' || tooltipPosition === 'left') {
      align = tooltipPosition;
    }

    return (
      <IconButton
        as={as}
        align={align}
        label={iconDescription}
        kind={kind}
        size={size}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={composeEventHandlers([onClick, handleClick])}
        {...rest}
        {...commonProps}
        {...otherProps}>
        {iconOnlyImage ? iconOnlyImage : children}
      </IconButton>
    );
  }
  return Button;
});

Button.displayName = 'Button';
Button.propTypes = {
  /**
   * Specify how the button itself should be rendered.
   * Make sure to apply all props to the root node and render children appropriately
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Specify the content of your Button
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Button
   */
  className: PropTypes.string,

  /**
   * Specify the message read by screen readers for the danger button variant
   */
  dangerDescription: PropTypes.string,

  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Specify if the button is an icon-only button
   */
  hasIconOnly: PropTypes.bool,

  /**
   * Optionally specify an href for your Button to become an `<a>` element
   */
  href: PropTypes.string,

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
   * Specify whether the Button is currently selected. Only applies to the Ghost variant.
   */
  isSelected: PropTypes.bool,

  /**
   * Specify the kind of Button you want to create
   */
  kind: PropTypes.oneOf(ButtonKinds),

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
   * Optional prop to specify the role of the Button
   */
  role: PropTypes.string,

  /**
   * Specify the size of the button, from the following list of sizes:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),

  /**
   * Optional prop to specify the tabIndex of the Button
   */
  tabIndex: PropTypes.number,

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

  /**
   * Optional prop to specify the type of the Button
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

export default Button;
