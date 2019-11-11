/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { settings } from 'carbon-components';

import { range } from '../../tools/array';

const { prefix } = settings;

// getter functions needed due to error in storybook
// addons knobs that requires a copy of this object to avoid
const getValidColWidths = () => ({
  sm: ['auto', ...range({ end: 4 })],
  md: ['auto', ...range({ end: 8 })],
  lgPlus: ['auto', ...range({ end: 12 })],
});

const getValidColOffsets = () => ({
  sm: range({ end: 4 - 1 }),
  md: range({ end: 8 - 1 }),
  lgPlus: range({ end: 12 - 1 }),
});

const VALID_COL_WIDTHS = getValidColWidths();
const VALID_COL_OFFSETS = getValidColOffsets();

export const Grid = ({
  condensed = false,
  fullWidth = false,
  noGutter = false,
  className = '',
  children = null,
}) => (
  <div
    className={classNames(
      `${prefix}--grid`,
      condensed && `${prefix}--grid--condensed`,
      fullWidth && `${prefix}--grid--full-width`,
      noGutter === true && `${prefix}--no-gutter`, // `true` === both
      noGutter !== true && noGutter && `${prefix}--no-gutter--${noGutter}`, // `left` || `right`
      className
    )}>
    {children}
  </div>
);

Grid.propTypes = {
  /** Collapse the gutter to 2px. Useful for fluid layouts. Rows have 2px of margin between them to match gutter. */
  condensed: PropTypes.bool,

  /** Remove the default max width that the grid has set */
  fullWidth: PropTypes.bool,

  /** Remove horizontal padding on the Grid */
  noGutter: PropTypes.oneOf([true, false, 'left', 'right']),

  /** Specify a custom className to be applied to the Grid */
  className: PropTypes.string,

  /** Pass in content that will be rendered within the Grid */
  children: PropTypes.node,
};

export const GridRow = ({
  condensed = false,
  noGutter = false,
  className = '',
  children = null,
}) => (
  <div
    className={classNames(
      `${prefix}--row`,
      condensed && `${prefix}--row--condensed`,
      noGutter === true && `${prefix}--no-gutter`, // `true` === both
      noGutter !== true && noGutter && `${prefix}--no-gutter--${noGutter}`, // `left` || `right`
      className
    )}>
    {children}
  </div>
);

GridRow.propTypes = {
  /** Specify a single row as condensed. Rows that are adjacent and are condensed will have 2px of margin between them to match gutter. */
  condensed: PropTypes.bool,

  /** Remove horizontal padding on the Grid Row AND all child Grid Cols */
  noGutter: PropTypes.oneOf([true, false, 'left', 'right']),

  /** Specify a custom className to be applied to the Grid Row */
  className: PropTypes.string,

  /** Pass in content that will be rendered within the Grid Row */
  children: PropTypes.node,
};

export const GridCol = ({
  sm,
  md,
  lg,
  xlg,
  max,
  smOffset,
  mdOffset,
  lgOffset,
  xlgOffset,
  maxOffset,
  noGutter = false,
  className = '',
  children = null,
}) => (
  <div
    className={classNames(
      `${prefix}--col`,
      sm !== undefined && `${prefix}--col-sm-${sm === 'auto' ? '-' : ''}${sm}`,
      md !== undefined && `${prefix}--col-md-${md === 'auto' ? '-' : ''}${md}`,
      lg !== undefined && `${prefix}--col-lg-${lg === 'auto' ? '-' : ''}${lg}`,
      xlg !== undefined &&
        `${prefix}--col-xlg-${xlg === 'auto' ? '-' : ''}${xlg}`,
      max !== undefined &&
        `${prefix}--col-max-${max === 'auto' ? '-' : ''}${max}`,
      smOffset && `${prefix}--offset-sm-${smOffset}`,
      mdOffset && `${prefix}--offset-md-${mdOffset}`,
      lgOffset && `${prefix}--offset-lg-${lgOffset}`,
      xlgOffset && `${prefix}--offset-xlg-${xlgOffset}`,
      maxOffset && `${prefix}--offset-max-${maxOffset}`,
      noGutter === true && `${prefix}--no-gutter`, // `true` === both
      noGutter !== true && noGutter && `${prefix}--no-gutter--${noGutter}`, // `left` || `right`
      className
    )}>
    {children}
  </div>
);

GridCol.propTypes = {
  /**
   * Specify column span at this width.
   *
   * Only supports width of 4 total columns.
   *
   * Screen size >= 320px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  sm: PropTypes.oneOf(VALID_COL_WIDTHS.sm),

  /**
   * Specify column span at this width.
   *
   * Only supports width of 8 total columns
   *
   * Screen size >= 672px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  md: PropTypes.oneOf(VALID_COL_WIDTHS.md),

  /**
   * Specify column span at this width.
   *
   * Screen size >= 1056px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  lg: PropTypes.oneOf(VALID_COL_WIDTHS.lgPlus),

  /**
   * Specify column span at this width.
   *
   * Screen size >= 1312px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  xlg: PropTypes.oneOf(VALID_COL_WIDTHS.lgPlus),

  /**
   * Specify column span at this width.
   *
   * Screen size >= 1584px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  max: PropTypes.oneOf(VALID_COL_WIDTHS.lgPlus),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  smOffset: PropTypes.oneOf(VALID_COL_OFFSETS.sm),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  mdOffset: PropTypes.oneOf(VALID_COL_OFFSETS.md),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  lgOffset: PropTypes.oneOf(VALID_COL_OFFSETS.lgPlus),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  xlgOffset: PropTypes.oneOf(VALID_COL_OFFSETS.lgPlus),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  maxOffset: PropTypes.oneOf(VALID_COL_OFFSETS.lgPlus),

  /** Remove horizontal padding on the Grid Col */
  noGutter: PropTypes.oneOf([false, true, 'left', 'right']),

  /** Specify a custom className to be applied to the Grid Col */
  className: PropTypes.string,

  /** Pass in content that will be rendered within the Grid Col */
  children: PropTypes.node,
};

Grid.getValidColWidths = getValidColWidths;
Grid.getValidColOffsets = getValidColOffsets;
Grid.Row = GridRow;
Grid.Col = GridCol;

export default Grid;
