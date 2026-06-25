/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deepCloneObject } from '../../../global/js/utils/deepCloneObject';

// Determines if a row or column header cell should receive a highlight/active background color
// Check each object in selectionAreas and see if the headerIndex is between
// point1.row and point2.row, inclusive
export const checkActiveHeaderCell = (
  headerIndex,
  selectionAreas,
  headerType
) => {
  const areasCloned = deepCloneObject(selectionAreas);
  const activeRowIndexes = [];
  areasCloned.forEach((area) => {
    const greatestRowIndex = Math.max(
      area.point1?.[headerType],
      area.point2?.[headerType]
    );
    const lowestRowIndex = Math.min(
      area.point1?.[headerType],
      area.point2?.[headerType]
    );
    for (let i = lowestRowIndex; i <= greatestRowIndex; i++) {
      activeRowIndexes.push(i);
    }
  });
  const activeRowIndexesNoDuplicates = [...new Set(activeRowIndexes)];
  if (
    areasCloned?.length &&
    activeRowIndexesNoDuplicates.includes(headerIndex)
  ) {
    return true;
  }
  return false;
};
