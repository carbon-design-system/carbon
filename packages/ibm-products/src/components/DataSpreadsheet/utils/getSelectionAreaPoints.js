/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const getSelectionAreaPoints = (area) => {
  const greatestRowIndex = Math.max(area.point1.row, area.point2.row);
  const greatestColumnIndex = Math.max(area.point1.column, area.point2.column);
  const lowestRowIndex = Math.min(area.point1.row, area.point2.row);
  const lowestColumnIndex = Math.min(area.point1.column, area.point2.column);
  return {
    greatestRowIndex,
    greatestColumnIndex,
    lowestColumnIndex,
    lowestRowIndex,
  };
};
