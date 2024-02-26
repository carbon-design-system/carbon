/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThHTMLAttributes } from 'react';
import wrapComponent from '../../tools/wrapComponent';

export type TableHeadProps = ThHTMLAttributes<HTMLTableSectionElement>;

const TableHead = wrapComponent({
  name: 'TableHead',
  type: 'thead',
});

export default TableHead;
