/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

export const Table = ({
  className,
  children,
  useZebraStyles,
  size,
  isSortable,
  useStaticWidth,
  shouldShowBorder,
  stickyHeader,
  overflowMenuOnHover,
  ...other
}) => {
  const componentClass = cx(`${prefix}--data-table`, className, {
    [`${prefix}--data-table--compact`]: size === 'compact',
    [`${prefix}--data-table--short`]: size === 'short',
    [`${prefix}--data-table--tall`]: size === 'tall',
    [`${prefix}--data-table--sort`]: isSortable,
    [`${prefix}--data-table--zebra`]: useZebraStyles,
    [`${prefix}--data-table--static`]: useStaticWidth,
    [`${prefix}--data-table--no-border`]: !shouldShowBorder,
    [`${prefix}--data-table--sticky-header`]: stickyHeader,
    [`${prefix}--data-table--visible-overflow-menu`]: !overflowMenuOnHover,
  });
  const table = (
    <div className={`${prefix}--data-table-content`}>
      <table {...other} className={componentClass}>
        {children}
      </table>
    </div>
  );
  return stickyHeader ? (
    <section className={`${prefix}--data-table_inner-container`}>
      {table}
    </section>
  ) : (
    table
  );
};

Table.propTypes = {
  /**
   * Pass in the children that will be rendered within the Table
   */
  children: PropTypes.node,

  className: PropTypes.string,

  /**
   * `false` If true, will apply sorting styles
   */
  isSortable: PropTypes.bool,

  /**
   * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
   */
  overflowMenuOnHover: PropTypes.bool,

  /**
   * `false` If true, will remove the table border
   */
  shouldShowBorder: PropTypes.bool,

  /**
   * `normal` Change the row height of table
   */
  size: PropTypes.oneOf(['compact', 'short', 'normal', 'tall']),

  /**
   * `false` If true, will keep the header sticky (only data rows will scroll)
   */
  stickyHeader: PropTypes.bool,

  /**
   * `false` If true, will use a width of 'auto' instead of 100%
   */
  useStaticWidth: PropTypes.bool,

  /**
   * `true` to add useZebraStyles striping.
   */
  useZebraStyles: PropTypes.bool,
};

Table.defaultProps = {
  isSortable: false,
  overflowMenuOnHover: true,
};

export default Table;
