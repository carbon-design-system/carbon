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

export { Layout };
