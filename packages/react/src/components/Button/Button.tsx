/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, IconButtonKind, IconButtonKinds } from '../IconButton';
import { PopoverAlignment } from '../Popover';
import ButtonBase from './ButtonBase';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';

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

export interface ButtonBaseProps
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
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription?: string;

  /**
   * Specify whether the Button is expressive, or not. Only applies to the large/default button size.
   */
  isExpressive?: boolean;

  /**
   * Specify whether the Button is currently selected. Only applies to the Ghost variant.
   */
  isSelected?: boolean;

  /**
   * Specify the kind of Button you want to create
   */
  kind?: ButtonBaseProps['hasIconOnly'] extends true
    ? IconButtonKind
    : ButtonKind;

  /**
   * Optionally specify a `rel` when using an `<a>` element.
   */
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

  /**
   * Specify the size of the button, from the following list of sizes:
   */
  size?: ButtonSize;

  /**
   * Optionally specify a `target` when using an `<a>` element.
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment?: ButtonTooltipAlignment;

  /**
   * Enable drop shadow for tooltips for icon-only buttons.
   */
  tooltipDropShadow?: boolean;

  /**
   * Enable high-contrast theme for tooltips on icon-only buttons.
   * Defaults to true.
   */
  tooltipHighContrast?: boolean;

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition?: ButtonTooltipPosition;
}

export type ButtonProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, ButtonBaseProps>;

export type ButtonComponent = <T extends React.ElementType = 'button'>(
  props: ButtonProps<T>,
  context?: any
) => React.ReactElement | any;

function isIconOnlyButton(
  hasIconOnly: ButtonBaseProps['hasIconOnly'],
  _kind: ButtonBaseProps['kind']
): _kind is IconButtonKind {
  if (hasIconOnly === true) {
    return true;
  }

  return false;
}

const Button: ButtonComponent = React.forwardRef(
  <T extends React.ElementType = 'button'>(
    props: ButtonProps<T>,
    ref: React.Ref<unknown>
  ) => {
    const {
      as,
      autoAlign = false,
      children,
      hasIconOnly = false,
      tooltipHighContrast = true,
      tooltipDropShadow = false,
      iconDescription,
      kind = 'primary',
      onBlur,
      onClick,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      renderIcon: ButtonImageElement,
      size,
      tooltipAlignment = 'center',
      tooltipPosition = 'top',
      ...rest
    } = props;

    if (ButtonImageElement && !children && !iconDescription) {
      console.error(
        'Button: renderIcon property specified without also providing an iconDescription property. ' +
          'This may impact accessibility for screen reader users.'
      );
    }

    const iconOnlyImage = !ButtonImageElement ? null : <ButtonImageElement />;

    if (!isIconOnlyButton(hasIconOnly, kind)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { tooltipAlignment, ...propsWithoutTooltipAlignment } = props;
      return <ButtonBase ref={ref} {...propsWithoutTooltipAlignment} />;
    } else {
      let align: PopoverAlignment | undefined = undefined;

      if (tooltipPosition === 'top' || tooltipPosition === 'bottom') {
        if (tooltipAlignment === 'center') {
          align = tooltipPosition;
        }
        if (tooltipAlignment === 'end') {
          align = `${tooltipPosition}-end`;
        }
        if (tooltipAlignment === 'start') {
          align = `${tooltipPosition}-start`;
        }
      }

      if (tooltipPosition === 'right' || tooltipPosition === 'left') {
        align = tooltipPosition;
      }

      return (
        // @ts-expect-error - `IconButton` does not support all `size`s that
        // `Button` supports.
        //
        // TODO: What should be done here?
        // 1. Should the `IconButton` not be rendered if the `size` is not
        //    supported?
        // 2. Should an error be thrown?
        // 3. Something else?
        <IconButton
          {...rest}
          ref={ref}
          as={as}
          align={align}
          label={iconDescription}
          kind={kind}
          size={size}
          highContrast={tooltipHighContrast}
          dropShadow={tooltipDropShadow}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          autoAlign={autoAlign}
          onClick={onClick}
          renderIcon={iconOnlyImage ? null : ButtonImageElement} // avoid doubling the icon.
        >
          {iconOnlyImage ?? children}
        </IconButton>
      );
    }
  }
);

(Button as React.FC).displayName = 'Button';
(Button as React.FC).propTypes = {
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
   * **Experimental**: Will attempt to automatically align the tooltip
   */
  autoAlign: PropTypes.bool,

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
  kind: (props, propName, componentName) => {
    const { hasIconOnly } = props;
    const validKinds = hasIconOnly ? IconButtonKinds : ButtonKinds;

    if (props[propName] === undefined) {
      return null;
    }

    if (!validKinds.includes(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected one of ${validKinds.join(
          ', '
        )}.`
      );
    }

    return null;
  },

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
   * Optionally specify a `rel` when using an `<a>` element.
   */
  rel: PropTypes.string,

  /**
   * A component used to render an icon.
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
   * Optionally specify a `target` when using an `<a>` element.
   */
  target: PropTypes.string,

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Enable drop shadow for tooltips for icon-only buttons.
   */
  tooltipDropShadow: PropTypes.bool,

  /**
   * Enable high-contrast theme for tooltips for icon-only buttons.
   * Defaults to true.
   */
  tooltipHighContrast: PropTypes.bool,

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
