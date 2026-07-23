/**
 * Copyright IBM Corp. 2016, 2026
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

/**
 * Grid component.
 *
 * @featureFlag enable-css-grid - Switches the grid implementation from
 * Flexbox (`FlexGrid`) to CSS Grid (`CSSGrid`).
 *
 * Enable in your app:
 * ```tsx
 * import { FeatureFlags } from '@carbon/react';
 *
 * <FeatureFlags flags={{ 'enable-css-grid': true }}>
 *   <Grid>
 *     <Column lg={4}>Content</Column>
 *   </Grid>
 * </FeatureFlags>
 * ```
 *
 * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
 */
function Grid<T extends React.ElementType>(props: GridProps<T>) {
  const enableCSSGrid = useFeatureFlag('enable-css-grid');
  if (enableCSSGrid) {
    return <CSSGrid {...props} />;
  }
  return <FlexGrid {...props} />;
}

Grid.propTypes = {
  /**
   * Specify grid alignment. Default is center
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),

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

  /**
   * Add a row gap to the grid that matches the current gutter size.
   * This is useful when you want consistent vertical spacing between rows.
   */
  withRowGap: PropTypes.bool,
};

const GridAsGridComponent = Grid as GridComponent;

export { GridAsGridComponent as Grid };
