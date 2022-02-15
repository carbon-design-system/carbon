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
import { GridSettings, useGridSettings } from './GridContext';

function CSSGrid({
  as: BaseComponent = 'div',
  condensed = false,
  fullWidth = false,
  columns = 16,
  className: containerClassName,
  children,
  ...rest
}) {
  const prefix = usePrefix();
  const { subgrid } = useGridSettings();
  const className = cx(containerClassName, {
    [`${prefix}--css-grid`]: !subgrid,
    [`${prefix}--css-grid--${columns}`]: !subgrid && columns !== 16,
    [`${prefix}--css-grid--condensed`]: condensed,
    [`${prefix}--css-grid--full-width`]: fullWidth,
    [`${prefix}--subgrid`]: subgrid,
    [`${prefix}--col-span-${columns}`]:
      (subgrid && columns !== 16) || columns !== 16,
  });

  return (
    <GridSettings mode="css-grid" subgrid>
      <BaseComponent className={className} {...rest}>
        {children}
      </BaseComponent>
    </GridSettings>
  );
}

CSSGrid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `Grid`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Grid`
   */
  className: PropTypes.string,

  /**
   * Specify how many columns wide the Grid should span
   */
  columns: PropTypes.number,

  /**
   * Collapse the gutter to 1px. Useful for fluid layouts.
   * Rows have 1px of margin between them to match gutter.
   */
  condensed: PropTypes.bool,

  /**
   * Remove the default max width that the grid has set
   */
  fullWidth: PropTypes.bool,
};

export { CSSGrid };
