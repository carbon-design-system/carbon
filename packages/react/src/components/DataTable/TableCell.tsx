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
   * The width of the expanded row's internal cell
   */
  colSpan?: number;

  /**
   * Specify if the table cell is in an AI column
   */
  hasSlugHeader?: boolean;

  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  headers?: string;
}

const TableCell = ({
  children,
  className,
  hasSlugHeader,
  colSpan,
  ...rest
}: TableCellProps) => {
  const prefix = usePrefix();

  const tableCellClassNames = classNames(className, {
    [`${prefix}--table-cell--column-slug`]: hasSlugHeader,
  });
  return (
    <td
      className={tableCellClassNames ? tableCellClassNames : undefined}
      colSpan={colSpan}
      {...rest}>
      {children}
    </td>
  );
};

TableCell.displayName = 'TableCell';
export default TableCell;
