/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TABLE_SORT_DIRECTION } from '../table-header-cell';

/**
 * Example data structure of data table column.
 */
export type TDemoTableColumn = {
  id: string;
  title: string;
  sortCycle?: string;
};

/**
 * Example data structure of data table row.
 */
export type TDemoTableRow = {
  id: number;
  selected?: boolean;
  [key: string]: any;
};

/**
 * Example structure of table sorting info.
 */
export type TDemoSortInfo = {
  columnId: string;
  direction: TABLE_SORT_DIRECTION;
};
