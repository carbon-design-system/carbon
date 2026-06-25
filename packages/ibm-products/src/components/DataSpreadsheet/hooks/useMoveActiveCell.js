/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect } from 'react';

// Moves the placement of the active cell
export const useMoveActiveCell = ({
  spreadsheetRef,
  activeCellCoordinates,
  containerHasFocus,
  createActiveCell,
  activeCellContent,
  isActiveHeaderCellChanged,
}) => {
  let performCreateActiveCell;
  //new active cell is created when the activeCellContent changes or navigate through headers
  // Otherwise new active cell will display the old value in a glance
  useEffect(() => {
    performCreateActiveCell();
  }, [activeCellContent, performCreateActiveCell, isActiveHeaderCellChanged]);

  performCreateActiveCell = useCallback(() => {
    const activeCellPlacementElement = spreadsheetRef?.current.querySelector(
      `[data-row-index="${activeCellCoordinates?.row}"][data-column-index="${activeCellCoordinates?.column}"]`
    );
    const shouldPlaceActiveCellInHeader =
      activeCellCoordinates?.row === 'header' && true;
    const selectAllElement = spreadsheetRef?.current.querySelector(
      `[data-row-index="header"][data-column-index="header"]`
    );
    if (containerHasFocus) {
      createActiveCell({
        placementElement: activeCellCoordinates
          ? activeCellPlacementElement
          : selectAllElement,
        coords: activeCellCoordinates,
        addToHeader: shouldPlaceActiveCellInHeader,
      });
    }
  }, [
    spreadsheetRef,
    activeCellCoordinates,
    containerHasFocus,
    createActiveCell,
  ]);
};
