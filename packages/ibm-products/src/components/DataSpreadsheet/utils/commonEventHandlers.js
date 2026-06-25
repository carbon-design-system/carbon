/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pkg } from '../../../settings';
import { checkForHoldingKey } from './checkForHoldingKey';
import { deepCloneObject } from '../../../global/js/utils/deepCloneObject';
import uuidv4 from '../../../global/js/utils/uuidv4';
import { removeCellSelections } from './removeCellSelections';
import { handleHeaderCellSelection } from './handleHeaderCellSelection';
import {
  handleMultipleKeys,
  includesResourceKey,
  includesShift,
} from './handleMultipleKeys';
import { handleActiveCellInSelectionEnter } from './handleActiveCellInSelectionEnter';
import { handleActiveCellInSelectionTab } from './handleActiveCellInSelectionTab';
import { handleCellDeletion } from './handleCellDeletion';

const blockClass = `${pkg.prefix}--data-spreadsheet`;

// onClick fn for each cell in the data spreadsheet body,
// adds the active cell highlight

export const handleBodyCellClick = (cell, columnIndex, event, ...rest) => {
  const [
    currentMatcher,
    activeCellCoordinates,
    selectionAreas,
    setActiveCellCoordinates,
    setSelectionAreas,
    setContainerHasFocus,
    setClickAndHoldActive,
    setCurrentMatcher,
    ref,
    setSelectionAreaData,
    setActiveCellInsideSelectionArea,
    activeCellRef,
    setValidStartingPoint,
  ] = rest;

  event.preventDefault();
  const closestBodyCell = event.target.closest(`.${blockClass}__body--td`);
  const isValidSelectionAreaStart = closestBodyCell.classList.contains(
    `${blockClass}__body--td`
  );
  setValidStartingPoint(isValidSelectionAreaStart);
  const isHoldingCommandKey = checkForHoldingKey(event, 'cmd');
  const isHoldingShiftKey = checkForHoldingKey(event, 'shiftKey');
  setContainerHasFocus(true);
  const activeCoordinates = {
    row: cell.row.index,
    column: columnIndex,
  };
  const tempMatcher = uuidv4();
  setClickAndHoldActive(true);

  // prevent multiple selections unless cmd key is held
  // meaning that selectionAreas should only have one item by default
  if (isHoldingCommandKey) {
    const activeCellElement = ref.current.querySelector(
      `.${blockClass}__active-cell--highlight`
    );
    activeCellElement.setAttribute('data-selection-id', tempMatcher);
    setActiveCellInsideSelectionArea(true);
    setActiveCellCoordinates(activeCoordinates);
    setCurrentMatcher(tempMatcher);
    setSelectionAreas((prev) => [
      ...prev,
      { point1: activeCoordinates, matcher: tempMatcher },
    ]);
  } else if (isHoldingShiftKey) {
    setContainerHasFocus(true);
    const selectionAreaClone = deepCloneObject(selectionAreas);
    const indexOfItemToUpdate = selectionAreaClone.findIndex(
      (item) => item.matcher === currentMatcher
    );

    if (indexOfItemToUpdate === -1) {
      // There is always a selectionArea with a point1 object that updates
      // whenever the activeCellCoordinates update, we should always be able
      // to find an index, but if we do not for some reason we should return
      // at this point.
      return;
    } else {
      // Update the selectionArea that was found, do not update currentMatcher
      selectionAreaClone[indexOfItemToUpdate].point1 = activeCellCoordinates;
      selectionAreaClone[indexOfItemToUpdate].point2 = activeCoordinates;
      selectionAreaClone[indexOfItemToUpdate].areaCreated = false;
      selectionAreaClone[indexOfItemToUpdate].matcher = currentMatcher;
      setSelectionAreas(selectionAreaClone);
    }
  } else {
    activeCellRef.current.style.display = 'none';
    setActiveCellInsideSelectionArea(false);
    setActiveCellCoordinates(activeCoordinates);
    // remove all previous cell selections
    removeCellSelections({ spreadsheetRef: ref });
    setSelectionAreas([{ point1: activeCoordinates, matcher: tempMatcher }]);
    setCurrentMatcher(tempMatcher);
    setSelectionAreaData([]);
  }
};

export const handleBodyCellHover = (cell, columnIndex, ...rest) => {
  const [clickAndHoldActive, currentMatcher, setSelectionAreas] = rest;
  if (clickAndHoldActive) {
    const cellCoordinates = {
      row: cell.row.index,
      column: columnIndex,
    };

    setSelectionAreas((prev) => {
      const selectionAreaClone = deepCloneObject(prev);
      const indexOfItemToUpdate = selectionAreaClone.findIndex(
        (item) => item.matcher === currentMatcher
      );
      // No items in the array match up with the currentMatcher value
      if (indexOfItemToUpdate === -1) {
        return prev;
      }
      // Do not update state if you're still hovering on the same cell
      if (
        selectionAreaClone[indexOfItemToUpdate].point2?.row ===
          cellCoordinates.row &&
        selectionAreaClone[indexOfItemToUpdate].point2?.column ===
          cellCoordinates.column
      ) {
        return prev;
      }
      selectionAreaClone[indexOfItemToUpdate].point2 = cellCoordinates;
      selectionAreaClone[indexOfItemToUpdate].areaCreated = false;
      return selectionAreaClone;
    });
  }
};

export const handleRowHeaderClick = (index, event, ...rest) => {
  const [
    columns,
    ref,
    setSelectionAreas,
    setCurrentMatcher,
    setActiveCellCoordinates,
    activeCellCoordinates,
    rows,
    setSelectionAreaData,
  ] = rest;
  const isHoldingCommandKey = checkForHoldingKey(event, 'cmd');
  handleHeaderCellSelection({
    type: 'row',
    activeCellCoordinates,
    rows,
    columns,
    setActiveCellCoordinates,
    setCurrentMatcher,
    setSelectionAreas,
    spreadsheetRef: ref,
    index,
    setSelectionAreaData,
    isHoldingCommandKey,
  });
};

export const handleKeyPress = (event, ...rest) => {
  const [
    activeCellInsideSelectionArea,
    updateActiveCellCoordinates,
    activeCellCoordinates,
    removeActiveCell,
    columns,
    rows,
    spreadsheetRef,
    currentMatcher,
    removeCellEditor,
    selectionAreas,
    handleHomeEndKey,
    keysPressedList,
    usingMac,
    updateData,
    checkForReturnCondition,
    handleArrowKeyPress,
    setSelectionAreas,
    setSelectionAreaData,
    setCurrentMatcher,
    activeCellRef,
    setActiveCellCoordinates,
    setContainerHasFocus,
    setActiveCellContent,
  ] = rest;

  const { key } = event;
  // Command keys need to be returned as there is default browser behavior with these keys
  // Needs to be returned in editing mode
  if (checkForReturnCondition(key)) {
    return;
  }

  // Clear out all cell selection areas if user uses any arrow key, except if the shift key is being held
  if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].indexOf(key) > -1) {
    if (
      selectionAreas?.length &&
      keysPressedList.length < 2 &&
      !includesShift(keysPressedList)
    ) {
      setSelectionAreas([]);
      setSelectionAreaData([]);
      removeCellSelections({ spreadsheetRef });
    }
  }
  if (keysPressedList?.length > 1) {
    handleMultipleKeys({
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
    });
  }

  // Allow arrow key navigation if there are less than two activeKeys OR
  // if one of the activeCellCoordinates is in a header position
  // Prevent arrow keys, home key, and end key from scrolling the page when the data spreadsheet container has focus

  if (
    (keysPressedList.length < 2 && !includesShift(keysPressedList)) ||
    activeCellCoordinates.row === 'header' ||
    activeCellCoordinates.column === 'header'
  ) {
    switch (key) {
      case 'Backspace':
      case 'Delete': {
        const deleteParams = {
          selectionAreas,
          currentMatcher,
          rows,
          setActiveCellContent,
          updateData,
          activeCellCoordinates,
        };
        handleCellDeletion(deleteParams);
        break;
      }
      // Enter
      case 'Enter': {
        handleActiveCellInSelectionEnter({
          activeCellInsideSelectionArea,
          activeCellCoordinates,
          activeCellRef,
          selectionAreas,
          updateActiveCellCoordinates,
        });
        break;
      }
      // HOME
      case 'Home':
      case 'End': {
        event.preventDefault();
        if (includesResourceKey(keysPressedList, usingMac)) {
          return;
        }
        handleHomeEndKey({ type: key });
        break;
      }
      // Tab
      case 'Tab': {
        if (activeCellInsideSelectionArea) {
          event.preventDefault();
          return handleActiveCellInSelectionTab({
            activeCellInsideSelectionArea,
            activeCellCoordinates,
            activeCellRef,
            selectionAreas,
            updateActiveCellCoordinates,
          });
        }
        setSelectionAreas([]);
        removeActiveCell();
        removeCellEditor();
        setContainerHasFocus(false);
        setActiveCellCoordinates(null);
        break;
      }
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown': {
        handleArrowKeyPress(key);
      }
    }
  }
};
