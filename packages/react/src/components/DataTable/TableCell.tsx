/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TdHTMLAttributes } from 'react';
import wrapComponent from '../../tools/wrapComponent';

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

const TableCell: React.FC<TableCellProps> = wrapComponent({
  name: 'TableCell',
  type: 'td',
});

export default TableCell;
