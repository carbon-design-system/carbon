/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { breakpoints as gridBreakpoints } from '@carbon/layout';
import { settings } from 'carbon-components';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const { prefix } = settings;

function unstable_Column({
  as = 'div',
  className: customClassName,
  offset = [],
  span = [],
  noGutter,
  noGutterLeft,
  noGutterRight,
  ...rest
}) {
  const columnsPerBreakpoint = mapBreakpointsToArray(span).map(
    (columnCount, i) => {
      return `${prefix}--col-${breakpoints[i]}-${columnCount}`;
    }
  );
  const offsetsPerBreakpoint = mapBreakpointsToArray(offset).map(
    (offsetCount, i) => {
      return `${prefix}--offset-${breakpoints[i]}-${offsetCount}`;
    }
  );
  const className = cx(
    {
      [`${prefix}--col`]:
        columnsPerBreakpoint.length === 0 && offsetsPerBreakpoint.length === 0,
      [`${prefix}--no-gutter`]: noGutter,
      [`${prefix}--no-gutter--left`]: noGutterLeft,
      [`${prefix}--no-gutter--right`]: noGutterRight,
    },
    ...columnsPerBreakpoint,
    ...offsetsPerBreakpoint,
    customClassName
  );

  return React.createElement(as, {
    ...rest,
    className,
  });
}

const breakpointPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.number),
  PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xlg: PropTypes.number,
    max: PropTypes.number,
  }),
]);

unstable_Column.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Provide a custom className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify the number of columns to offset in either an object syntax or in an
   * array syntax
   */
  offset: breakpointPropType,

  /**
   * Specify the number of columns to span in either an object syntax or in an
   * array syntax
   */
  span: breakpointPropType,

  /**
   * Specify if the column should have no gutter
   */
  noGutter: PropTypes.bool,

  /**
   * Specify if the column should have no left gutter
   */
  noGutterLeft: PropTypes.bool,

  /**
   * Specify if the column should have no right gutter
   */
  noGutterRight: PropTypes.bool,
};

const breakpoints = Object.keys(gridBreakpoints);

function mapBreakpointsToArray(object) {
  if (Array.isArray(object)) {
    return object;
  }
  return Object.keys(object).reduce((acc, key) => {
    const index = breakpoints.indexOf(key);
    acc[index] = object[key];
    return acc;
  }, []);
}

export default unstable_Column;
