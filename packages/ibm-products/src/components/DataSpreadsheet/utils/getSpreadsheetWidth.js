/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { px } from '@carbon/layout';

export const getSpreadsheetWidth = ({
  type,
  headerGroup,
  scrollBarSizeValue,
  totalVisibleColumns,
  defaultColumn,
  totalColumnsWidth,
  visibleColumns,
}) => {
  const additionalWidth = scrollBarSizeValue + defaultColumn.rowHeaderWidth;
  if (!totalVisibleColumns) {
    if (type === 'header') {
      return px(
        parseInt(headerGroup.getHeaderGroupProps().style.width) +
          additionalWidth
      );
    }
    if (type !== 'header') {
      return totalColumnsWidth + additionalWidth;
    }
  }
  if (totalVisibleColumns) {
    const totalVisibleColumnWidth = visibleColumns
      .map(
        (item, index) =>
          index <= totalVisibleColumns - 1 &&
          (item?.width || defaultColumn?.width)
      )
      .reduce((prev, curr) => prev + curr, 0);
    return totalVisibleColumnWidth + additionalWidth;
  }
};
