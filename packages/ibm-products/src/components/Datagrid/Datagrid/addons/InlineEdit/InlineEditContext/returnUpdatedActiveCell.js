/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pkg } from '../../../../../../settings';

const blockClass = `${pkg.prefix}--datagrid`;
// This function returns the state back to the reducer after
// determining the new active cell value
export const returnUpdatedActiveCell = ({
  activeCellCoords,
  direction,
  totalVisibleColumns,
  state,
  instance,
}) => {
  const newActiveCoords = {
    ...activeCellCoords,
    column:
      direction === 'right'
        ? activeCellCoords.column < totalVisibleColumns.length - 1
          ? activeCellCoords.column + 1
          : activeCellCoords.column
        : direction === 'left'
          ? activeCellCoords.column === 0
            ? 0
            : activeCellCoords.column - 1
          : activeCellCoords.column,
    row:
      direction === 'up'
        ? activeCellCoords.row === 0
          ? 0
          : activeCellCoords.row - 1
        : direction === 'down'
          ? activeCellCoords.row < instance.rows.length - 1
            ? activeCellCoords.row + 1
            : activeCellCoords.row
          : activeCellCoords.row,
  };
  const newActiveCellId = `column-${newActiveCoords.column}-row-${newActiveCoords.row}`;
  const newCellIdButton = document.querySelector(
    `#${instance.tableId} .${blockClass}__table-with-inline-edit [data-cell-id="${newActiveCellId}"] .${blockClass}__inline-edit-button`
  );
  // Allows scrollable area to keep focused/active cell id visible
  if (newCellIdButton) {
    newCellIdButton?.focus();
  }
  return {
    ...state,
    activeCellId: newActiveCellId,
  };
};
