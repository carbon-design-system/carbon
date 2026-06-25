/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getSelectionAreaPoints } from './getSelectionAreaPoints';

export const handleActiveCellInSelectionTab = ({
  activeCellInsideSelectionArea,
  activeCellCoordinates,
  activeCellRef,
  selectionAreas,
  updateActiveCellCoordinates,
}) => {
  if (!activeCellInsideSelectionArea) {
    return;
  }
  const activeCellSelectionId =
    activeCellRef.current.getAttribute('data-selection-id');
  const activeCellIndexInSelectionAreas = selectionAreas.findIndex(
    (item) => item.matcher === activeCellSelectionId
  );
  const selectionAreaToNavigate =
    selectionAreas[activeCellIndexInSelectionAreas];
  const {
    lowestColumnIndex,
    lowestRowIndex,
    greatestColumnIndex,
    greatestRowIndex,
  } = getSelectionAreaPoints(selectionAreaToNavigate);
  // Move active cell to next column in selection area
  if (activeCellCoordinates?.column < greatestColumnIndex) {
    updateActiveCellCoordinates({
      updatedValue: { column: activeCellCoordinates?.column + 1 },
      optOutOfSelectionAreaUpdate: true,
    });
  }
  // Move active cell to next row of selection area if it exists
  // If not, find the next selection area and update active cell to
  // be the first cell in that selection
  if (activeCellCoordinates?.column === greatestColumnIndex) {
    if (activeCellCoordinates?.row < greatestRowIndex) {
      updateActiveCellCoordinates({
        updatedValue: {
          column: lowestColumnIndex,
          row: activeCellCoordinates?.row + 1,
        },
        optOutOfSelectionAreaUpdate: true,
      });
    }
    // Move to next selection area if there is on, or back to
    // the beginning of the current selection
    if (activeCellCoordinates?.row === greatestRowIndex) {
      if (selectionAreas.length > 1) {
        if (selectionAreas[activeCellIndexInSelectionAreas + 1]) {
          // Update activeCellRef data-selection-id attribute to the matcher of the next selection area
          activeCellRef.current.setAttribute(
            'data-selection-id',
            selectionAreas[activeCellIndexInSelectionAreas + 1].matcher
          );
          const nextSelectionArea =
            selectionAreas[activeCellIndexInSelectionAreas + 1];
          const { lowestColumnIndex, lowestRowIndex } =
            getSelectionAreaPoints(nextSelectionArea);
          updateActiveCellCoordinates({
            updatedValue: {
              column: lowestColumnIndex,
              row: lowestRowIndex,
            },
            optOutOfSelectionAreaUpdate: true,
          });
          return;
        } else {
          // There are multiple selection areas and the active cell is in the last one
          // So we need to move the active cell to the first cell in the first selection area
          activeCellRef.current.setAttribute(
            'data-selection-id',
            selectionAreas[0].matcher
          );
          const firstSelectionArea = selectionAreas[0];
          const { lowestColumnIndex, lowestRowIndex } =
            getSelectionAreaPoints(firstSelectionArea);
          updateActiveCellCoordinates({
            updatedValue: {
              column: lowestColumnIndex,
              row: lowestRowIndex,
            },
            optOutOfSelectionAreaUpdate: true,
          });
        }
      }
      // Only one selection area, go back to first cell in the selection
      if (selectionAreas.length === 1) {
        return updateActiveCellCoordinates({
          updatedValue: {
            column: lowestColumnIndex,
            row: lowestRowIndex,
          },
          optOutOfSelectionAreaUpdate: true,
        });
      }
    }
  }
};
