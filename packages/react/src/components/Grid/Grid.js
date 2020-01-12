/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { settings } from 'carbon-components';
import { breakpoints } from '@carbon/layout';

const { prefix } = settings;

/**
 * helper to define valid column widths for prop checking
 *
 * @param {object} params - inclusive edge markers
 * @param {number} params.start
 * @param {number} params.end
 * @returns {number[]} arr with each item having val of its index
 */
export const range = ({ start = 0, end }) =>
  [...Array(end - start + 1)].map((_, i) => i);

// getter functions needed due to error in storybook
// addons knobs that requires a copy of this object to avoid
const getValidColWidths = () => ({
  sm: [false, true, 'auto', ...range({ end: breakpoints.sm.columns })],
  md: [false, true, 'auto', ...range({ end: breakpoints.md.columns })],
  lgPlus: [false, true, 'auto', ...range({ end: breakpoints.lg.columns })],
});

const getValidColOffsets = () => ({
  sm: range({ end: breakpoints.sm.columns - 1 }),
  md: range({ end: breakpoints.md.columns - 1 }),
  lgPlus: range({ end: breakpoints.lg.columns - 1 }),
});

const VALID_COL_WIDTHS = getValidColWidths();
const VALID_COL_OFFSETS = getValidColOffsets();

export const Grid = ({
  as: BaseComponent = 'div',
  condensed = false,
  fullWidth = false,
  className: containerClassName,
  children,
  ...rest
}) => {
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
};

Grid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

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
   * Specify a custom className to be applied to the Grid
   */
  className: PropTypes.string,

  /**
   * Pass in content that will be rendered within the Grid Row
   */
  children: PropTypes.node,
};

export const Row = ({
  as: BaseComponent = 'div',
  condensed = false,
  className: containerClassName,
  children,
  ...rest
}) => {
  const className = cx(containerClassName, {
    [`${prefix}--row`]: true,
    [`${prefix}--row--condensed`]: condensed,
  });

  return (
    <BaseComponent className={className} {...rest}>
      {children}
    </BaseComponent>
  );
};

Row.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Specify a single row as condensed.Rows that are adjacent
   * and are condensed will have 2px of margin between them to match gutter.
   */
  condensed: PropTypes.bool,

  /**
   * Specify a custom className to be applied to the Grid Row
   */
  className: PropTypes.string,

  /**
   * Pass in content that will be rendered within the Grid Row
   */
  children: PropTypes.node,
};

/**
 * // helper typedefs to make raw jsdoc easier to read
 * @typedef {number | boolean | "auto"} span non-object version of breakpoint def
 * @typedef {span | { span: span, offset: number }} breakPtRaw complete (wide) def according to prop
 * @typedef {{ span: number | "-auto", offset: number }} breakPt processed to common obj format
 */

/**
 * process wide variety of accepted values of Grid.Col breakpoint props (sm, lg, etc.)
 * into standard obj format to greatly simplify syntax of Grid.Col component definition
 *
 * @param {breakPtRaw} breakpoint - raw def as allowed by Grid.Col breakpoint props
 * @returns {breakPt} processed to common obj format
 */
const standardize = breakpoint => {
  const obj =
    typeof breakpoint !== 'object' ? { span: breakpoint } : breakpoint;

  // vastly improves component readability by converting to format of CSS classNames
  if (obj.span === 'auto' || obj.span === true) obj.span = '-auto';

  return obj;
};

export const Col = ({
  as: BaseComponent = 'div',
  sm: smRaw,
  md: mdRaw,
  lg: lgRaw,
  xlg: xlgRaw,
  max: maxRaw,
  className: containerClassName,
  children,
  ...rest
}) => {
  // map list of raw breakpoints into obj format to simplify below className definition
  // extra arr created and destructured since same transformation's applied to each bp
  const [sm, md, lg, xlg, max] = [smRaw, mdRaw, lgRaw, xlgRaw, maxRaw].map(
    breakPt => standardize(breakPt)
  );

  const className = cx(containerClassName, {
    [`${prefix}--col`]: true,
    [`${prefix}--col-sm-${sm.span}`]: sm.span,
    [`${prefix}--col-md-${md.span}`]: md.span,
    [`${prefix}--col-lg-${lg.span}`]: lg.span,
    [`${prefix}--col-xlg-${xlg.span}`]: xlg.span,
    [`${prefix}--col-max-${max.span}`]: max.span,

    [`${prefix}--offset-sm-${sm.offset}`]: sm.offset,
    [`${prefix}--offset-md-${md.offset}`]: md.offset,
    [`${prefix}--offset-lg-${lg.offset}`]: lg.offset,
    [`${prefix}--offset-xlg-${xlg.offset}`]: xlg.offset,
    [`${prefix}--offset-max-${max.offset}`]: max.offset,
  });

  return (
    <BaseComponent className={className} {...rest}>
      {children}
    </BaseComponent>
  );
};

Col.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Specify column span at this width.
   *
   * Only supports width of 4 total columns.
   *
   * Screen size >= 320px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  sm: PropTypes.oneOfType([
    PropTypes.oneOf(VALID_COL_WIDTHS.sm),
    PropTypes.shape({
      span: PropTypes.oneOf(VALID_COL_WIDTHS.sm),
      offset: PropTypes.oneOf(VALID_COL_OFFSETS.sm),
    }),
  ]),

  /**
   * Specify column span at this width.
   *
   * Only supports width of 8 total columns
   *
   * Screen size >= 672px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  md: PropTypes.oneOfType([
    PropTypes.oneOf(VALID_COL_WIDTHS.md),
    PropTypes.shape({
      span: PropTypes.oneOf(VALID_COL_WIDTHS.md),
      offset: PropTypes.oneOf(VALID_COL_OFFSETS.md),
    }),
  ]),

  /**
   * Specify column span at this width.
   *
   * Screen size >= 1056px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  lg: PropTypes.oneOfType([
    PropTypes.oneOf(VALID_COL_WIDTHS.lgPlus),
    PropTypes.shape({
      span: PropTypes.oneOf(VALID_COL_WIDTHS.lgPlus),
      offset: PropTypes.oneOf(VALID_COL_OFFSETS.lgPlus),
    }),
  ]),

  /**
   * Specify column span at this width.
   *
   * Screen size >= 1312px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  xlg: PropTypes.oneOfType([
    PropTypes.oneOf(VALID_COL_WIDTHS.lgPlus),
    PropTypes.shape({
      span: PropTypes.oneOf(VALID_COL_WIDTHS.lgPlus),
      offset: PropTypes.oneOf(VALID_COL_OFFSETS.lgPlus),
    }),
  ]),

  /**
   * Specify column span at this width.
   *
   * Screen size >= 1584px
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  max: PropTypes.oneOfType([
    PropTypes.oneOf(VALID_COL_WIDTHS.lgPlus),
    PropTypes.shape({
      span: PropTypes.oneOf(VALID_COL_WIDTHS.lgPlus),
      offset: PropTypes.oneOf(VALID_COL_OFFSETS.lgPlus),
    }),
  ]),

  /**
   * Offset content by a given column span,
   * largest offset is 1 less than number of columns.
   *
   * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
   */
  smOffset: PropTypes.oneOf(VALID_COL_OFFSETS.sm),

  /**
   * Specify a custom className to be applied to the Grid Col
   */
  className: PropTypes.string,

  /**
   * Pass in content that will be rendered within the Grid Col
   */
  children: PropTypes.node,
};

Grid.getValidColWidths = getValidColWidths;
Grid.getValidColOffsets = getValidColOffsets;
Grid.Row = Row;
Grid.Col = Col;

export default Grid;
