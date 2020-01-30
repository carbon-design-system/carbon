/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const { prefix } = settings;

function Grid({
  as: BaseComponent = 'div',
  condensed = false,
  fullWidth = false,
  className: containerClassName,
  children,
  ...rest
}) {
  const className = cx(containerClassName, {
    [`${prefix}--grid`]: true,
    [`${prefix}--grid--condensed`]: condensed,
    [`${prefix}--grid--full-width`]: fullWidth,
  });

  return (
    <BaseComponent className={className} {...rest}>
      {children}
    </BaseComponent>
  );
}

Grid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Collapse the gutter to 2px. Useful for fluid layouts.
   * Rows have 2px of margin between them to match gutter.
   */
  condensed: PropTypes.bool,

  /**
   * Remove the default max width that the grid has set
   */
  fullWidth: PropTypes.bool,

  /**
   * Specify a custom className to be applied to the `Grid`
   */
  className: PropTypes.string,

  /**
   * Pass in content that will be rendered within the `Grid`
   */
  children: PropTypes.node,
};

export default Grid;
