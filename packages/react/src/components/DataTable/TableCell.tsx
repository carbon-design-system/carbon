/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import PropTypes from 'prop-types';

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
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
  hasAILabelHeader?: boolean;

  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  headers?: string;
}

const frFn = forwardRef<HTMLTableCellElement, TableCellProps>;

const TableCell = frFn((props, ref) => {
  const { children, className, hasAILabelHeader, colSpan, ...rest } = props;
  const prefix = usePrefix();

  const tableCellClassNames = classNames(className, {
    [`${prefix}--table-cell--column-slug`]: hasAILabelHeader,
  });
  return (
    <td
      className={tableCellClassNames ? tableCellClassNames : undefined}
      ref={ref}
      colSpan={colSpan}
      {...rest}>
      {children}
    </td>
  );
});

TableCell.displayName = 'TableCell';
TableCell.propTypes = {
  /**
   * Pass in children that will be embedded in the table header label
   */
  children: PropTypes.node,
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
  /**
   * The width of the expanded row's internal cell
   */
  colSpan: PropTypes.number,
  /**
   * Specify if the table cell is in an AI column
   */
  hasAILabelHeader: PropTypes.bool,
  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  headers: PropTypes.string,
};

export default TableCell;
