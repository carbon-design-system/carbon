/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { usePrefix } from '../../internal/usePrefix';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const densities = ['condensed', 'normal'];

const Layout = React.forwardRef(function Layout(
  { as: BaseComponent = 'div', children, className, density, size, ...rest },
  forwardRef
) {
  const prefix = usePrefix();

  const classes = cx(className, `${prefix}--layout`, {
    [`${prefix}--layout--size-${size}`]: sizes.includes(size),
    [`${prefix}--layout--density-${density}`]: densities.includes(density),
  });

  return (
    <BaseComponent {...rest} ref={forwardRef} className={classes}>
      {children}
    </BaseComponent>
  );
});

Layout.propTypes = {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements to be rendered inside of `Layout`
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className: PropTypes.string,

  /**
   * Specify the desired density of components within this layout
   */
  density: PropTypes.oneOf(densities),

  /**
   * Specify the desired size of components within this layout
   */
  size: PropTypes.oneOf(sizes),
};

const LayoutConstraint = React.forwardRef(function Layout(
  { as: BaseComponent = 'div', children, className, density, size, ...rest },
  forwardRef
) {
  const prefix = usePrefix();

  const classes = cx(
    className,
    Object.entries({
      size,
      density,
    }).map(([group, constraints]) => ({
      [`${prefix}--layout-constraint--${group}:default-${constraints?.default}`]:
        constraints?.default,
      [`${prefix}--layout-constraint--${group}:min-${constraints?.min}`]:
        constraints?.min,
      [`${prefix}--layout-constraint--${group}:max-${constraints?.max}`]:
        constraints?.max,
    }))
  );

  return (
    <BaseComponent {...rest} ref={forwardRef} className={classes}>
      {children}
    </BaseComponent>
  );
});

LayoutConstraint.propTypes = {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements to be rendered inside of `LayoutConstraint`
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className: PropTypes.string,

  /**
   * Specify the desired layout density constraints of this element's children
   */
  density: PropTypes.shape({
    min: PropTypes.oneOf(densities),
    default: PropTypes.oneOf(densities),
    max: PropTypes.oneOf(densities),
  }),

  /**
   * Specify the desired layout size constraints of this element's children
   */
  size: PropTypes.shape({
    min: PropTypes.oneOf(sizes),
    default: PropTypes.oneOf(sizes),
    max: PropTypes.oneOf(sizes),
  }),
};

export { Layout, LayoutConstraint };
