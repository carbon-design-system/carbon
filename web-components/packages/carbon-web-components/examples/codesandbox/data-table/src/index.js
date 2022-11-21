/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './demo-data-table';
import { rowsMany as rows, columns, sortInfo } from './data';

document.addEventListener('DOMContentLoaded', () => {
  const dataTable = document.getElementById('data-table');
  dataTable.rows = rows;
  dataTable.columns = columns;
  dataTable.sortInfo = sortInfo;
});
