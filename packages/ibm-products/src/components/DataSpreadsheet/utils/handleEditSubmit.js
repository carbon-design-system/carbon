/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { removeCellSelections } from './removeCellSelections';
import uuidv4 from '../../../global/js/utils/uuidv4';

// Update the data
export const handleEditSubmit = ({
  activeCellCoordinates,
  cellEditorRulerRef,
  columns,
  previousState,
  removeCellEditor,
  rows,
  setActiveCellCoordinates,
  setCurrentMatcher,
  setSelectionAreas,
  spreadsheetRef,
  updateData,
}) => {
  return (event) => {
    const { key } = event;
    const updateSelectionAreaOnCellEditSubmit = ({ type }) => {
      const submitEditChanges = () => {
        const prevCoords = previousState?.activeCellCoordinates;
        const cellProps = rows[prevCoords?.row].cells[prevCoords?.column];
        removeCellEditor();
        updateData(prevCoords?.row, cellProps.column.id);
      };
      removeCellSelections({ spreadsheetRef });
      submitEditChanges();
      const tempMatcher = uuidv4();
      const newSelectionArea = {
        row:
          type === 'Enter'
            ? activeCellCoordinates.row === rows.length - 1
              ? activeCellCoordinates.row
              : activeCellCoordinates.row + 1
            : activeCellCoordinates.row,
        column:
          type === 'Tab'
            ? activeCellCoordinates.column === columns.length - 1
              ? activeCellCoordinates.column
              : activeCellCoordinates.column + 1
            : activeCellCoordinates.column,
      };
      setSelectionAreas([
        {
          point1: newSelectionArea,
          point2: newSelectionArea,
          matcher: tempMatcher,
          areaCreated: false,
        },
      ]);
      setCurrentMatcher(tempMatcher);
      cellEditorRulerRef.current.textContent = '';
    };
    if (key === 'Enter') {
      updateSelectionAreaOnCellEditSubmit({ type: 'Enter' });
      setActiveCellCoordinates((prev) => ({
        ...prev,
        row: prev.row === rows.length - 1 ? prev.row : prev.row + 1, // do not move to next cell below if we're already in the last row
      }));
    }
    if (key === 'Tab') {
      event.preventDefault();
      updateSelectionAreaOnCellEditSubmit({ type: 'Tab' });
      setActiveCellCoordinates((prev) => ({
        ...prev,
        column:
          prev.column === columns.length - 1 ? prev.column : prev.column + 1, // do not move to next cell below if we're already in the last column
      }));
    }
    return;
  };
};
