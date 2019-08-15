import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { settings } from 'carbon-components';

const { prefix } = settings;

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

  /** By default, the grid has a max width set. You can remove this by using a grid modifier class. */
  fullWidth: PropTypes.bool,

  /** Remove horizontal padding on the Grid */
  noGutter: PropTypes.oneOf(true, false, 'left', 'right'),

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

  /** Remove horizontal padding on the Grid Row */
  noGutter: PropTypes.oneOf(true, false, 'left', 'right'),

  /** Specify a custom className to be applied to the Grid Row */
  className: PropTypes.string,

  /** Pass in content that will be rendered within the Grid Row */
  children: PropTypes.node,
};

export const GridCol = ({
  sm = '',
  md = '',
  lg = '',
  xlg = '',
  max = '',
  smOffset = '',
  mdOffset = '',
  lgOffset = '',
  xlgOffset = '',
  maxOffset = '',
  noGutter = false,
  className = '',
  children = null,
}) => (
  <div
    className={classNames(
      `${prefix}--col`,
      sm && `${prefix}--col-sm-${sm === 'auto' ? '-' : ''}${sm}`,
      md && `${prefix}--col-md-${md === 'auto' ? '-' : ''}${md}`,
      lg && `${prefix}--col-lg-${lg === 'auto' ? '-' : ''}${lg}`,
      xlg && `${prefix}--col-xlg-${xlg === 'auto' ? '-' : ''}${xlg}`,
      max && `${prefix}--col-max-${max === 'auto' ? '-' : ''}${max}`,
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
  sm: PropTypes.oneOf(['auto', '0', '1', '2', '3', '4']),

  /**
   * Specify column span at this width.
   *
   * Only supports width of 8 total columns
   *
   * Screen size >= 672px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  md: PropTypes.oneOf(['auto', '0', '1', '2', '3', '4', '5', '6', '7', '8']),

  /**
   * Specify column span at this width.
   *
   * Screen size >= 1056px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  lg: PropTypes.oneOf([
    'auto',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]),

  /**
   * Specify column span at this width.
   *
   * Screen size >= 1312px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  xlg: PropTypes.oneOf([
    'auto',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]),

  /**
   * Specify column span at this width.
   *
   * Screen size >= 1584px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  max: PropTypes.oneOf([
    'auto',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  smOffset: PropTypes.oneOf(['0', '1', '2', '3']),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  mdOffset: PropTypes.oneOf(['0', '1', '2', '3', '4', '5', '6', '7']),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  lgOffset: PropTypes.oneOf([
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ]),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  xlgOffset: PropTypes.oneOf([
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ]),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  maxOffset: PropTypes.oneOf([
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ]),

  /** Remove horizontal padding on the Grid Col */
  noGutter: PropTypes.oneOf([false, true, 'left', 'right']),

  /** Specify a custom className to be applied to the Grid Col */
  className: PropTypes.string,

  /** Pass in content that will be rendered within the Grid Col */
  children: PropTypes.node,
};

Grid.Row = GridRow;
Grid.Col = GridCol;

export default Grid;
