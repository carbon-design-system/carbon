/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import wrapComponent from '../../tools/wrapComponent';
import { ReactAttr } from '../../types/common';

export type TableCellProps = ReactAttr<'td'>;

const TableCell: React.FC<TableCellProps> = wrapComponent({
  name: 'TableCell',
  type: 'td',
});

export default TableCell;
