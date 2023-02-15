/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { useFeatureFlag } from '../FeatureFlags';
import { CSSGrid } from './CSSGrid';
import { FlexGrid } from './FlexGrid';
import { GridComponent, GridProps } from './GridTypes';

function Grid<T extends React.ElementType>(props: GridProps<T>) {
  const enableCSSGrid = useFeatureFlag('enable-css-grid');
  if (enableCSSGrid) {
    return <CSSGrid {...props} />;
  }
  return <FlexGrid {...props} />;
}

Grid.propTypes = {
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

const GridAsGridComponent = Grid as GridComponent;

export { GridAsGridComponent as Grid };
