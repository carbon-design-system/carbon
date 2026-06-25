/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deepCloneObject } from '../../../global/js/utils/deepCloneObject';
import { rangeWithCallback } from '../../../global/js/utils/rangeWithCallback';

export const handleCellDeletion = ({
  activeCellCoordinates,
  selectionAreas,
  currentMatcher,
  rows,
  setActiveCellContent,
  updateData,
}) => {
  // This means that the delete key has been pressed when the active cell is in a header,
  // not within the spreadsheet body. To delete an entire row/column, it must first be
  // selected, and then can be deleted.
  if (
    activeCellCoordinates?.column === 'header' ||
    activeCellCoordinates?.row === 'header'
  ) {
    return;
  }
  const selectionAreaClone = deepCloneObject(selectionAreas);
  const indexOfCurrentSelectionArea = selectionAreaClone.findIndex(
    (item) => item.matcher === currentMatcher
  );
  const selectionAreaToEmptyContents =
    selectionAreaClone[indexOfCurrentSelectionArea];
  const lowestColumnIndex = Math.min(
    selectionAreaToEmptyContents?.point1?.column,
    selectionAreaToEmptyContents?.point2?.column
  );
  const greatestColumnIndex = Math.max(
    selectionAreaToEmptyContents?.point1?.column,
    selectionAreaToEmptyContents?.point2?.column
  );
  const lowestRowIndex = Math.min(
    selectionAreaToEmptyContents?.point1?.row,
    selectionAreaToEmptyContents?.point2?.row
  );
  const greatestRowIndex = Math.max(
    selectionAreaToEmptyContents?.point1?.row,
    selectionAreaToEmptyContents?.point2?.row
  );
  rangeWithCallback(lowestColumnIndex, greatestColumnIndex, (columnIndex) => {
    rangeWithCallback(lowestRowIndex, greatestRowIndex, (rowIndex) => {
      const cellProps = rows[rowIndex].cells[columnIndex];
      updateData(rowIndex, cellProps?.column.id, '');
    });
  });
  setActiveCellContent(null);
};
