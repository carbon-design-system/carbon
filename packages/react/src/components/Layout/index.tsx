/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ElementType, HTMLAttributes, ReactNode } from 'react';

import { usePrefix } from '../../internal/usePrefix';

const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const densities: Density[] = ['condensed', 'normal'];

/**
 * Density of components within this layout
 */
type Density = 'condensed' | 'normal';

/**
 * Size of components within this layout
 */
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface LayoutProps extends HTMLAttributes<HTMLElement> {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as?: (() => ReactNode) | string | ElementType;

  /**
   * Provide child elements to be rendered inside of `Layout`
   */
  children?: ReactNode;

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className?: string;

  /**
   * Specify the desired density of components within this layout
   */
  density?: Density;

  /**
   * Specify the desired size of components within this layout
   */
  size?: Size;
}

const Layout = React.forwardRef<ReactNode, LayoutProps>(function Layout(
  { as: BaseComponent = 'div', children, className, density, size, ...rest },
  forwardRef
) {
  const prefix = usePrefix();

  const classes = cx(className, `${prefix}--layout`, {
    [`${prefix}--layout--size-${size}`]: size && sizes.includes(size),
    [`${prefix}--layout--density-${density}`]:
      density && densities.includes(density),
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
  density: PropTypes.oneOf<Density>(densities),

  /**
   * Specify the desired size of components within this layout
   */
  size: PropTypes.oneOf<Size>(sizes),
};

export interface LayoutConstraintProps extends HTMLAttributes<HTMLElement> {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as?: (() => ReactNode) | string | ElementType;

  /**
   * Provide child elements to be rendered inside of `LayoutConstraint`
   */
  children?: ReactNode;

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className?: string;

  /**
   * Specify the desired layout density constraints of this element's children
   */
  density?: {
    min?: Density | null;
    default?: Density | null;
    max?: Density | null;
  } | null;

  /**
   * Specify the desired layout size constraints of this element's children
   */
  size?: {
    min?: Size | null;
    default?: Size | null;
    max?: Size | null;
  } | null;
}

const LayoutConstraint = React.forwardRef<ReactNode, LayoutConstraintProps>(
  function Layout(
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
        [`${prefix}--layout-constraint--${group}__default-${constraints?.default}`]:
          constraints?.default,
        [`${prefix}--layout-constraint--${group}__min-${constraints?.min}`]:
          constraints?.min,
        [`${prefix}--layout-constraint--${group}__max-${constraints?.max}`]:
          constraints?.max,
      }))
    );

    return (
      <BaseComponent {...rest} ref={forwardRef} className={classes}>
        {children}
      </BaseComponent>
    );
  }
);

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
    min: PropTypes.oneOf<Density>(densities),
    default: PropTypes.oneOf<Density>(densities),
    max: PropTypes.oneOf<Density>(densities),
  }),

  /**
   * Specify the desired layout size constraints of this element's children
   */
  size: PropTypes.shape({
    min: PropTypes.oneOf<Size>(sizes),
    default: PropTypes.oneOf<Size>(sizes),
    max: PropTypes.oneOf<Size>(sizes),
  }),
};

export { Layout, LayoutConstraint };
