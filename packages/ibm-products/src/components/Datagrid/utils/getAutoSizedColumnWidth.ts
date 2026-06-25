/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Row } from 'react-table';

export const getAutoSizedColumnWidth = (
  rows: Array<Row<object>>,
  accessor: string,
  headerText: string
): number => {
  const maxWidth = 400;
  const minWidth = 58;
  const letterSpacing = 10;
  const cellLength = Math.max(
    ...rows.map((row) => (`${row[accessor]}` || '').length),
    headerText.length
  );
  if (cellLength <= 3) {
    return minWidth;
  }
  return Math.min(maxWidth, cellLength * letterSpacing + 16);
};
