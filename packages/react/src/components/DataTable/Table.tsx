/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { TableContext } from './TableContext';

interface TableProps {
  className?: string;

  /**
   * `false` If true, will apply sorting styles
   */
  isSortable?: boolean;

  /**
   * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
   */
  overflowMenuOnHover?: boolean;

  /**
   *  Change the row height of table. Currently supports `xs`, `sm`, `md`, `lg`, and `xl`.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * `false` If true, will keep the header sticky (only data rows will scroll)
   */
  stickyHeader?: boolean;

  /**
   * `false` If true, will use a width of 'auto' instead of 100%
   */
  useStaticWidth?: boolean;

  /**
   * `true` to add useZebraStyles striping.
   */
  useZebraStyles?: boolean;
}

export const Table = ({
  className,
  children,
  useZebraStyles,
  size,
  isSortable = false,
  useStaticWidth,
  stickyHeader,
  overflowMenuOnHover = true,
  ...other
}: PropsWithChildren<TableProps>) => {
  const { titleId, descriptionId } = useContext(TableContext);
  const prefix = usePrefix();
  const componentClass = cx(`${prefix}--data-table`, className, {
    [`${prefix}--data-table--${size}`]: size,
    [`${prefix}--data-table--sort`]: isSortable,
    [`${prefix}--data-table--zebra`]: useZebraStyles,
    [`${prefix}--data-table--static`]: useStaticWidth,
    [`${prefix}--data-table--sticky-header`]: stickyHeader,
    [`${prefix}--data-table--visible-overflow-menu`]: !overflowMenuOnHover,
  });
  const table = (
    <div className={`${prefix}--data-table-content`}>
      <table
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        {...other}
        className={componentClass}>
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
   *  Change the row height of table. Currently supports `xs`, `sm`, `md`, `lg`, and `xl`.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),

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
