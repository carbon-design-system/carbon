/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { ButtonKinds } from '../../prop-types/types';
import deprecate from '../../prop-types/deprecate';

const { prefix } = settings;
const Button = React.forwardRef(function Button(
  {
    children,
    as,
    className,
    disabled,
    small,
    size,
    kind,
    href,
    tabIndex,
    type,
    renderIcon: ButtonImageElement,
    iconDescription,
    hasIconOnly,
    tooltipPosition,
    tooltipAlignment,
    ...other
  },
  ref
) {
  const buttonClasses = classNames(className, {
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--field`]: size === 'field',
    [`${prefix}--btn--sm`]: size === 'small' || size === 'sm' || small,
    [`${prefix}--btn--lg`]: size === 'lg',
    [`${prefix}--btn--xl`]: size === 'xl',
    [`${prefix}--btn--${kind}`]: kind,
    [`${prefix}--btn--disabled`]: disabled,
    [`${prefix}--btn--icon-only`]: hasIconOnly,
    [`${prefix}--tooltip__trigger`]: hasIconOnly,
    [`${prefix}--tooltip--a11y`]: hasIconOnly,
    [`${prefix}--tooltip--${tooltipPosition}`]: hasIconOnly && tooltipPosition,
    [`${prefix}--tooltip--align-${tooltipAlignment}`]:
      hasIconOnly && tooltipAlignment,
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

  let component = 'button';
  let otherProps = {
    disabled,
    type,
  };
  const anchorProps = {
    href,
  };
  const assistiveText = hasIconOnly ? (
    <span className={`${prefix}--assistive-text`}>{iconDescription}</span>
  ) : null;
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
  return React.createElement(
    component,
    {
      ...other,
      ...commonProps,
      ...otherProps,
    },
    assistiveText,
    children,
    buttonImage
  );
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
   * Specify the kind of Button you want to create
   */
  kind: PropTypes.oneOf(ButtonKinds).isRequired,

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
   * Specify the size of the button, from a list of available sizes.
   * For `default` buttons, this prop can remain unspecified.
   */
  size: PropTypes.oneOf(['default', 'field', 'small', 'sm', 'lg', 'xl']),

  /**
   * Deprecated in v10 in favor of `size`.
   * Specify whether the Button should be a small variant
   */
  small: deprecate(
    PropTypes.bool,
    `\nThe prop \`small\` for Button has been deprecated in favor of \`size\`. Please use \`size="sm"\` instead.`
  ),

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

Button.defaultProps = {
  tabIndex: 0,
  type: 'button',
  disabled: false,
  kind: 'primary',
  size: 'default',
  tooltipAlignment: 'center',
  tooltipPosition: 'top',
};

export default Button;
