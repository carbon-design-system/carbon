/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { GridSettings } from './GridContext';

function FlexGrid({
  as: BaseComponent = 'div',
  condensed = false,
  narrow = false,
  fullWidth = false,
  className: containerClassName,
  children,
  ...rest
}) {
  const prefix = usePrefix();
  const className = cx(containerClassName, {
    [`${prefix}--grid`]: true,
    [`${prefix}--grid--condensed`]: condensed,
    [`${prefix}--grid--narrow`]: narrow,
    [`${prefix}--grid--full-width`]: fullWidth,
  });
  return (
    <GridSettings mode="flexbox" subgrid={false}>
      <BaseComponent className={className} {...rest}>
        {children}
      </BaseComponent>
    </GridSettings>
  );
}

FlexGrid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `FlexGrid`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `FlexGrid`
   */
  className: PropTypes.string,

  /**
   * Collapse the gutter to 1px. Useful for fluid layouts.
   * Rows have 1px of margin between them to match gutter.
   */
  condensed: PropTypes.bool,

  /**
   * Remove the default max width that the grid has set
   */
  fullWidth: PropTypes.bool,

  /**
   * Container hangs 16px into the gutter. Useful for
   * typographic alignment with and without containers.
   */
  narrow: PropTypes.bool,
};

export { FlexGrid };
