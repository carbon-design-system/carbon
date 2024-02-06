/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { ReactAttr } from '../../types/common';

interface TableCellProps extends ReactAttr<HTMLTableCellElement> {
  /**
   * Pass in children that will be embedded in the table header label
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify if the table cell is in an AI column
   */
  hasSlugHeader?: boolean;
}

const TableCell = React.forwardRef(function TableCell(
  { children, className, hasSlugHeader, ...rest }: TableCellProps,
  ref: React.Ref<HTMLTableCellElement>
) {
  const prefix = usePrefix();

  const tableCellClassNames = classNames(className, {
    [`${prefix}--table-cell--column-slug`]: hasSlugHeader,
  });
  return (
    <td
      className={tableCellClassNames ? tableCellClassNames : undefined}
      ref={ref}
      {...rest}>
      {children}
    </td>
  );
});

TableCell.displayName = 'TableCell';
export default TableCell;
