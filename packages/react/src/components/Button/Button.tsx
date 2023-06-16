/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import classNames from 'classnames';
import { IconButton } from '../IconButton';
import { composeEventHandlers } from '../../tools/events';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { PolymorphicProps } from '../../types/common';
import { PopoverAlignment } from '../Popover';

export const ButtonKinds = [
  'primary',
  'secondary',
  'danger',
  'ghost',
  'danger--primary',
  'danger--ghost',
  'danger--tertiary',
  'tertiary',
] as const;

export type ButtonKind = (typeof ButtonKinds)[number];

export const ButtonSizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

export type ButtonSize = (typeof ButtonSizes)[number];

export const ButtonTooltipAlignments = ['start', 'center', 'end'] as const;

export type ButtonTooltipAlignment = (typeof ButtonTooltipAlignments)[number];

export const ButtonTooltipPositions = ['top', 'right', 'bottom', 'left'];

export type ButtonTooltipPosition = (typeof ButtonTooltipPositions)[number];

interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify the message read by screen readers for the danger button variant
   */
  dangerDescription?: string;

  /**
   * Specify if the button is an icon-only button
   */
  hasIconOnly?: boolean;

  /**
   * Optionally specify an href for your Button to become an `<a>` element
   */
  href?: string;

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription?: string;

  /**
   * Specify whether the Button is expressive, or not
   */
  isExpressive?: boolean;

  /**
   * Specify whether the Button is currently selected. Only applies to the Ghost variant.
   */
  isSelected?: boolean;

  /**
   * Specify the kind of Button you want to create
   */
  kind?: ButtonKind;

  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  renderIcon?: React.ElementType;

  /**
   * Specify the size of the button, from the following list of sizes:
   */
  size?: ButtonSize;

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment?: ButtonTooltipAlignment;

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition?: ButtonTooltipPosition;
}

export type ButtonProps<T extends React.ElementType> = PolymorphicProps<
  T,
  ButtonBaseProps
>;

export interface ButtonComponent {
  <T extends React.ElementType>(
    props: ButtonProps<T>,
    context?: any
  ): React.ReactElement<any, any> | null;
}

const Button = React.forwardRef(function Button<T extends React.ElementType>(
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
    size,
    tabIndex,
    tooltipAlignment = 'center',
    tooltipPosition = 'top',
    type = 'button',
    ...rest
  }: ButtonProps<T>,
  ref: React.Ref<unknown>
) {
  const tooltipRef = useRef(null);
  const prefix = usePrefix();

  const handleClick = (evt: React.MouseEvent) => {
    // Prevent clicks on the tooltip from triggering the button click event
    if (evt.target === tooltipRef.current) {
      evt.preventDefault();
      return;
    }
  };

  const buttonClasses = classNames(className, {
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--sm`]: size === 'sm' && !isExpressive, // TODO: V12 - Remove this class
    [`${prefix}--btn--md`]: size === 'md' && !isExpressive, // TODO: V12 - Remove this class
    [`${prefix}--btn--xl`]: size === 'xl', // TODO: V12 - Remove this class
    [`${prefix}--btn--2xl`]: size === '2xl', // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
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

  let component: React.ElementType = 'button';
  const assistiveId = useId('danger-description');
  const { 'aria-pressed': ariaPressed } = rest;
  let otherProps: Partial<ButtonBaseProps> = {
    disabled,
    type,
    'aria-describedby': dangerButtonVariants.includes(kind)
      ? assistiveId
      : undefined,
    'aria-pressed':
      ariaPressed ?? (hasIconOnly && kind === 'ghost' ? isSelected : undefined),
  };
  const anchorProps = {
    href,
  };

  let assistiveText: JSX.Element | null = null;
  if (dangerButtonVariants.includes(kind)) {
    assistiveText = (
      <span id={assistiveId} className={`${prefix}--visually-hidden`}>
        {dangerDescription}
      </span>
    );
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
    let align: PopoverAlignment | undefined = undefined;

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
    return null;
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

export default Button as ButtonComponent;
