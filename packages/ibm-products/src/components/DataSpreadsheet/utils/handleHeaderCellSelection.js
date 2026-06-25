/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deepCloneObject } from '../../../global/js/utils/deepCloneObject';
import uuidv4 from '../../../global/js/utils/uuidv4';
import { removeCellSelections } from './removeCellSelections';
import { checkActiveHeaderCell } from './checkActiveHeaderCell';

const getSelectedItemIndexList = ({ indexList, newIndex, activeCellIndex }) => {
  const lowestIndex =
    newIndex > activeCellIndex
      ? activeCellIndex
      : Math.min(...indexList, newIndex);
  const highestIndex =
    newIndex < activeCellIndex
      ? activeCellIndex
      : Math.max(...indexList, newIndex);
  const newIndexList = [];
  for (let i = lowestIndex; i <= highestIndex; i++) {
    newIndexList.push(i);
  }
  return [...newIndexList];
};

export const handleHeaderCellSelection = ({
  type,
  activeCellCoordinates,
  rows,
  columns,
  currentMatcher,
  setActiveCellCoordinates,
  setCurrentMatcher,
  setSelectionAreas,
  spreadsheetRef,
  index,
  isKeyboard,
  setSelectionAreaData,
  isHoldingCommandKey,
  isHoldingShiftKey,
}) => {
  if (!isHoldingCommandKey) {
    setSelectionAreaData([]);
    removeCellSelections({ spreadsheetRef });
  }
  const rowValue = isKeyboard ? activeCellCoordinates?.row : index;
  const columnValue = isKeyboard ? activeCellCoordinates?.column : index;
  const point1 = {
    row: type === 'column' ? 0 : rowValue,
    column: type === 'column' ? columnValue : 0,
  };
  const point2 = {
    row: type === 'column' ? rows.length - 1 : rowValue, // going to always be the last row
    column: type === 'column' ? columnValue : columns.length - 1,
  };
  const tempMatcher = uuidv4();
  if (!isHoldingShiftKey) {
    setActiveCellCoordinates({
      row: type === 'column' ? 0 : rowValue,
      column: type === 'column' ? columnValue : 0,
    });
    setCurrentMatcher(tempMatcher);
  }
  const newSelectionArea = {
    point1,
    point2,
    areaCreated: false,
    matcher: tempMatcher,
    header: {
      type,
      selectedIndexList: [type === 'column' ? columnValue : rowValue],
    },
  };
  setSelectionAreas((prev) => {
    const selectionsClone = deepCloneObject(prev);
    if (isHoldingCommandKey) {
      const selectionsFromHeaderCell = selectionsClone.filter(
        (item) => item.header?.type
      );
      const previouslyCreatedHeaderSelection = selectionsFromHeaderCell.filter(
        (item) => item.header?.type === type
      );
      const isHeaderPartOfPreviousSelection = checkActiveHeaderCell(
        index,
        previouslyCreatedHeaderSelection,
        type
      );
      // Prevents row/column header selections from being created multiple times
      if (
        previouslyCreatedHeaderSelection.length &&
        isHeaderPartOfPreviousSelection
      ) {
        return prev;
      }
      return [...prev, newSelectionArea];
    }
    if (isHoldingShiftKey) {
      const selectionsFromHeaderCell = selectionsClone.filter(
        (item) => item.header?.type
      );
      // Shift/click behavior should not occur unless there are activeCellCoordinates set
      const currentSelectionArea = selectionsFromHeaderCell.filter(
        (item) => item.matcher === currentMatcher
      )[0];
      const originalAreaIndex = Math.max(
        currentSelectionArea?.point1[type],
        currentSelectionArea?.point2[type],
        activeCellCoordinates?.[type]
      );
      const newIndexValue = type === 'column' ? columnValue : rowValue;
      const newPoint = {
        row: originalAreaIndex < newIndexValue ? rows.length - 1 : 0,
        column: columnValue,
      };
      const selectionAreasClone = deepCloneObject(prev);
      const indexOfCurrentArea = selectionAreasClone.findIndex(
        (item) => item.matcher === currentMatcher
      );
      const newIndexList = getSelectedItemIndexList({
        indexList: selectionAreasClone[indexOfCurrentArea]?.header
          ?.selectedIndexList || [type === 'column' ? columnValue : rowValue],
        newIndex: newIndexValue,
        activeCellIndex: activeCellCoordinates?.[type],
      });
      const setPoint1 = (value) => {
        return value < newIndexValue
          ? {
              row: type === 'column' ? 0 : Math.min(...newIndexList),
              column: type === 'column' ? Math.min(...newIndexList) : 0,
            }
          : newPoint;
      };
      const setPoint2 = (value) => {
        return value < newIndexValue
          ? newPoint
          : {
              row:
                type === 'column' ? rows.length - 1 : Math.max(...newIndexList),
              column:
                type === 'column'
                  ? Math.max(...newIndexList)
                  : columns.length - 1,
            };
      };
      // If there is no active cell set and shift is clicked on a header cell
      if (
        !activeCellCoordinates ||
        typeof activeCellCoordinates === 'undefined'
      ) {
        // Need to set positioning of active cell because it doesn't exist yet
        setCurrentMatcher(tempMatcher);
        const firstSelectionArea = {
          point1: setPoint1(type === 'column' ? columnValue : rowValue),
          point2: setPoint2(type === 'column' ? columnValue : rowValue),
          areaCreated: false,
          matcher: tempMatcher,
          header: {
            type,
            selectedIndexList: [type === 'column' ? columnValue : rowValue],
          },
        };
        setActiveCellCoordinates({
          row: type === 'column' ? 0 : rowValue,
          column: type === 'column' ? columnValue : 0,
        });
        return [firstSelectionArea];
      }
      selectionAreasClone[indexOfCurrentArea].point1 = setPoint1(
        activeCellCoordinates?.[type]
      );
      selectionAreasClone[indexOfCurrentArea].point2 = setPoint2(
        activeCellCoordinates?.[type]
      );
      selectionAreasClone[indexOfCurrentArea].areaCreated = false;
      selectionAreasClone[indexOfCurrentArea].header.selectedIndexList =
        newIndexList;
      return selectionAreasClone;
    }
    return [newSelectionArea];
  });
};
