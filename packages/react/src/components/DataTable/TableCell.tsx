/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { TdHTMLAttributes } from 'react';
import classNames from 'classnames';
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
import { usePrefix } from '../../internal/usePrefix';

const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  hasSlugHeader,
  ...rest
}) => {
  const prefix = usePrefix();

  const tableCellClassNames = classNames(
    {
      [`${prefix}--table-cell--column-slug`]: hasSlugHeader,
    },
    className
  );
  return (
    <td className={tableCellClassNames} {...rest}>
      {children}
    </td>
  );
};

TableCell.displayName = 'TableCell';
export default TableCell;
