/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deepCloneObject } from '../../../global/js/utils/deepCloneObject';
import uuidv4 from '../../../global/js/utils/uuidv4';
import { selectAllCells } from './selectAllCells';

export const includesResourceKey = (arr, usingMac) => {
  if (usingMac) {
    return includesMeta(arr);
  }
  if (!usingMac) {
    return includesControl(arr);
  }
};

export const includesShift = (arr) => {
  if (arr.includes('ShiftLeft') || arr.includes('ShiftRight')) {
    return true;
  }
  return false;
};

const includesMeta = (arr) => {
  if (arr.includes('MetaLeft') || arr.includes('MetaRight')) {
    return true;
  }
  return false;
};

const includesControl = (arr) => {
  if (arr.includes('ControlLeft') || arr.includes('ControlRight')) {
    return true;
  }
  return false;
};

export const handleMultipleKeys = ({
  activeCellCoordinates,
  event,
  keysPressedList,
  selectionAreas,
  currentMatcher,
  rows,
  setSelectionAreas,
  columns,
  updateActiveCellCoordinates,
  spreadsheetRef,
  removeCellSelections,
  blockClass,
  setCurrentMatcher,
  usingMac,
}) => {
  const selectionAreasClone = deepCloneObject(selectionAreas);
  const indexOfCurrentArea = selectionAreasClone.findIndex(
    (item) => item.matcher === currentMatcher
  );
  const pointToUpdate = selectionAreasClone[indexOfCurrentArea]?.point2
    ? selectionAreasClone[indexOfCurrentArea]?.point2
    : selectionAreasClone[indexOfCurrentArea]?.point1;
  // Down + Shift
  if (
    includesShift(keysPressedList) &&
    keysPressedList.includes('ArrowDown') &&
    keysPressedList.length === 2
  ) {
    if (
      rows.length - 1 === pointToUpdate?.row ||
      activeCellCoordinates?.row === 'header' ||
      activeCellCoordinates?.column === 'header'
    ) {
      return;
    }
    const newPoint = {
      row: pointToUpdate.row + 1,
      column: pointToUpdate.column,
    };
    selectionAreasClone[indexOfCurrentArea].point2 = newPoint;
    selectionAreasClone[indexOfCurrentArea].areaCreated = false;
    setSelectionAreas(selectionAreasClone);
  }
  // Right + Shift
  if (
    includesShift(keysPressedList) &&
    keysPressedList.includes('ArrowRight') &&
    keysPressedList.length === 2
  ) {
    if (
      columns.length - 1 === pointToUpdate?.column ||
      activeCellCoordinates?.row === 'header' ||
      activeCellCoordinates?.column === 'header'
    ) {
      return;
    }
    const newPoint = {
      row: pointToUpdate.row,
      column: pointToUpdate.column + 1,
    };
    selectionAreasClone[indexOfCurrentArea].point2 = newPoint;
    selectionAreasClone[indexOfCurrentArea].areaCreated = false;
    setSelectionAreas(selectionAreasClone);
  }
  // Up + Shift
  if (
    includesShift(keysPressedList) &&
    keysPressedList.includes('ArrowUp') &&
    keysPressedList.length === 2
  ) {
    if (
      pointToUpdate?.row === 0 ||
      activeCellCoordinates?.row === 'header' ||
      activeCellCoordinates?.column === 'header'
    ) {
      return;
    }
    const newPoint = {
      row: pointToUpdate.row - 1,
      column: pointToUpdate.column,
    };
    selectionAreasClone[indexOfCurrentArea].point2 = newPoint;
    selectionAreasClone[indexOfCurrentArea].areaCreated = false;
    setSelectionAreas(selectionAreasClone);
  }
  // Left + Shift
  if (
    includesShift(keysPressedList) &&
    keysPressedList.includes('ArrowLeft') &&
    keysPressedList.length === 2
  ) {
    if (
      pointToUpdate?.column === 0 ||
      activeCellCoordinates?.row === 'header' ||
      activeCellCoordinates?.column === 'header'
    ) {
      return;
    }
    const newPoint = {
      row: pointToUpdate.row,
      column: pointToUpdate.column - 1,
    };
    selectionAreasClone[indexOfCurrentArea].point2 = newPoint;
    selectionAreasClone[indexOfCurrentArea].areaCreated = false;
    setSelectionAreas(selectionAreasClone);
  }
  // CMD + a (select all)
  if (
    includesResourceKey(keysPressedList, usingMac) &&
    keysPressedList.includes('KeyA')
  ) {
    event.preventDefault();
    const selectionPoint1 = {
      row: 0,
      column: 0,
    };
    const selectionPoint2 = {
      row: rows.length - 1,
      column: columns.length - 1,
    };
    // If indexOfCurrentArea is -1, it means the active cell is in a cell header position
    if (indexOfCurrentArea === -1) {
      selectAllCells({
        ref: spreadsheetRef,
        setCurrentMatcher,
        setSelectionAreas,
        rows,
        columns,
        activeCellCoordinates,
        updateActiveCellCoordinates,
      });
    }
    selectionAreasClone[indexOfCurrentArea].point1 = selectionPoint1;
    selectionAreasClone[indexOfCurrentArea].point2 = selectionPoint2;
    selectionAreasClone[indexOfCurrentArea].areaCreated = false;
    setSelectionAreas(selectionAreasClone);
  }
  // CONTROL + SPACE (Select current column)
  if (includesControl(keysPressedList) && keysPressedList.includes('Space')) {
    const selectionPoint1 = {
      row: 0,
      column:
        activeCellCoordinates?.column === 'header'
          ? 0
          : activeCellCoordinates?.column,
    };
    const selectionPoint2 = {
      row: rows.length - 1,
      column:
        activeCellCoordinates?.column === 'header'
          ? 0
          : activeCellCoordinates?.column,
    };
    // If indexOfCurrentArea is -1, it means the active cell is in a cell header position
    if (indexOfCurrentArea === -1) {
      const tempMatcher = uuidv4();
      const newSelectionArea = {
        point1: selectionPoint1,
        point2: selectionPoint2,
        areaCreated: false,
        matcher: tempMatcher,
      };
      const coordinatesClone = { ...activeCellCoordinates };
      updateActiveCellCoordinates({
        coords: coordinatesClone,
        updatedValue: {
          column:
            activeCellCoordinates?.column === 'header'
              ? 0
              : activeCellCoordinates?.column,
          row:
            activeCellCoordinates?.row === 'header'
              ? 0
              : activeCellCoordinates?.row,
        },
      });
      setCurrentMatcher(tempMatcher);
      return setSelectionAreas([newSelectionArea]);
    }
    selectionAreasClone[indexOfCurrentArea].point1 = selectionPoint1;
    selectionAreasClone[indexOfCurrentArea].point2 = selectionPoint2;
    selectionAreasClone[indexOfCurrentArea].areaCreated = false;
    setSelectionAreas(selectionAreasClone);
  }
  // Shift + SPACE (Select current row)
  if (includesShift(keysPressedList) && keysPressedList.includes('Space')) {
    const selectionPoint1 = {
      row:
        activeCellCoordinates?.row === 'header'
          ? 0
          : activeCellCoordinates?.row,
      column: 0,
    };
    const selectionPoint2 = {
      row:
        activeCellCoordinates?.row === 'header'
          ? 0
          : activeCellCoordinates?.row,
      column: columns.length - 1,
    };
    // If indexOfCurrentArea is -1, it means the active cell is in a cell header position
    if (indexOfCurrentArea === -1) {
      const tempMatcher = uuidv4();
      const newSelectionArea = {
        point1: selectionPoint1,
        point2: selectionPoint2,
        areaCreated: false,
        matcher: tempMatcher,
      };
      const coordinatesClone = { ...activeCellCoordinates };
      updateActiveCellCoordinates({
        coords: coordinatesClone,
        updatedValue: {
          column:
            activeCellCoordinates?.column === 'header'
              ? 0
              : activeCellCoordinates?.column,
          row:
            activeCellCoordinates?.row === 'header'
              ? 0
              : activeCellCoordinates?.row,
        },
      });
      setCurrentMatcher(tempMatcher);
      return setSelectionAreas([newSelectionArea]);
    }
    selectionAreasClone[indexOfCurrentArea].point1 = selectionPoint1;
    selectionAreasClone[indexOfCurrentArea].point2 = selectionPoint2;
    selectionAreasClone[indexOfCurrentArea].areaCreated = false;
    setSelectionAreas(selectionAreasClone);
  }

  // CMD + HOME (Selects first cell in first row)
  if (
    includesResourceKey(keysPressedList, usingMac) &&
    keysPressedList.includes('Home')
  ) {
    const scrollElement = spreadsheetRef.current.querySelector(
      `.${blockClass}__list--container`
    );
    scrollElement.scrollTop = 0;
    const coordinatesClone = { ...activeCellCoordinates };
    removeCellSelections({ spreadsheetRef });
    updateActiveCellCoordinates({
      coords: coordinatesClone,
      updatedValue: {
        column: 0,
        row: 0,
      },
    });
  }

  // CMD + END (Selects last cell in last row)
  if (
    includesResourceKey(keysPressedList, usingMac) &&
    keysPressedList.includes('End')
  ) {
    const scrollElement = spreadsheetRef.current.querySelector(
      `.${blockClass}__list--container`
    );
    scrollElement.scrollTop = scrollElement.scrollHeight;
    const coordinatesClone = { ...activeCellCoordinates };
    removeCellSelections({ spreadsheetRef });
    const lastCellExists = !!rows[rows?.length - 1].cells[columns?.length - 1];
    const updateToLastCell = () => {
      updateActiveCellCoordinates({
        coords: coordinatesClone,
        updatedValue: {
          column: columns.length - 1,
          row: rows.length - 1,
        },
      });
    };
    // With the spreadsheet supporting virtualized data, it's possible that the last cell
    // has never been rendered yet, if that's the case we scroll to the bottom of the spreadsheet
    // and add a timeout to wait for the last row to render to the DOM before updating the active cell coordinates.
    // If we're able to verify that the last row has been rendered, no timeout is used.
    if (lastCellExists) {
      updateToLastCell();
    } else {
      setTimeout(() => {
        updateToLastCell();
      }, 1000);
    }
  }
};
