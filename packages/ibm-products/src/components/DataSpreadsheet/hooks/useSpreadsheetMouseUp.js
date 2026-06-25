/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react';
import { px } from '@carbon/layout';

import { pkg } from '../../../settings';
import { deepCloneObject } from '../../../global/js/utils/deepCloneObject';

export const useSpreadsheetMouseUp = ({
  currentMatcher,
  setSelectionAreas,
  selectedHeaderReorderActive,
  setSelectedHeaderReorderActive,
  setClickAndHoldActive,
  setValidStartingPoint,
  validStartingPoint,
  blockClass = `${pkg.prefix}--data-spreadsheet`,
  ref,
  setHeaderCellHoldActive,
  setColumnOrder,
  visibleColumns,
  setActiveCellCoordinates,
  activeCellCoordinates,
  rows,
  defaultColumn,
  selectionAreas,
}) => {
  useEffect(() => {
    const handleMouseUp = (event) => {
      // Only handle mouseup if it occurred within this instance
      if (!ref.current?.contains(event.target)) {
        return;
      }
      let isHoldingColumn = false;
      if (
        selectionAreas?.[0]?.header &&
        selectionAreas[0].header.type === 'column'
      ) {
        isHoldingColumn = true;
      }
      // Remove the cloned selection area on mouse up
      if (!validStartingPoint && isHoldingColumn) {
        setHeaderCellHoldActive(false);
        const selectionAreaElement = ref.current.querySelector(
          `.${blockClass}__selection-area--element`
        );
        const selectionAreaCloneElement = ref.current.querySelector(
          `.${blockClass}__selection-area--element-cloned`
        );
        if (!selectionAreaCloneElement) {
          return;
        }
        // Mouse up while a cloned selection area exists/a column is being reordered
        if (selectionAreaCloneElement) {
          const closestCell = event.target.closest(
            `.${blockClass}--interactive-cell-element`
          );
          const newColumnIndex = parseInt?.(
            closestCell?.getAttribute('data-column-index')
          );
          const originalColumnIndex = parseInt?.(
            selectionAreaCloneElement?.getAttribute(
              'data-column-index-original'
            )
          );
          const selectionAreaToClone = selectionAreas.filter(
            (item) => item?.matcher === currentMatcher
          );
          const selectionAreaIndexArray =
            selectionAreaToClone[0].header.selectedIndexList;
          const columnToMoveToElement = ref.current.querySelector(
            `[data-row-index="header"][data-column-index="${newColumnIndex}"]`
          );
          // Mouse up element was not part of the spreadsheet component
          if (!columnToMoveToElement) {
            return;
          }
          const selectionAreaToMove = ref.current.querySelector(
            `[data-matcher-id="${currentMatcher}"]`
          );
          const spreadsheetPosition = ref.current.getBoundingClientRect();
          const listContainer = ref.current.querySelector(
            `.${blockClass}__list--container`
          );
          const leftScrollAmount = listContainer.scrollLeft;
          const newIndexLessThanStarting = newColumnIndex < originalColumnIndex;
          const newIndexGreater = newColumnIndex > originalColumnIndex;
          const differenceBetweenOldNewIndex = newIndexGreater
            ? newColumnIndex - originalColumnIndex
            : originalColumnIndex - newColumnIndex;
          setSelectionAreas((prev) => {
            const selectionAreaClone = deepCloneObject(prev);
            if (originalColumnIndex === newColumnIndex) {
              return prev;
            }
            const indexOfItemToUpdate = selectionAreaClone.findIndex(
              (item) => item.matcher === currentMatcher
            );
            if (indexOfItemToUpdate === -1) {
              return prev;
            }
            if (!selectionAreaIndexArray.includes(newColumnIndex)) {
              // We need to not add just the newColumnIndex, but an array of indexes
              // if there are multiple columns
              const newIndexArray = newIndexGreater
                ? selectionAreaIndexArray.map(
                    (num) => num + differenceBetweenOldNewIndex
                  )
                : selectionAreaIndexArray.map(
                    (num) => num - differenceBetweenOldNewIndex
                  );
              selectionAreaClone[indexOfItemToUpdate].header.selectedIndexList =
                newIndexArray;
              selectionAreaClone[indexOfItemToUpdate].point1.column = Math.min(
                ...newIndexArray
              );
              selectionAreaClone[indexOfItemToUpdate].point2.column = Math.max(
                ...newIndexArray
              );
            }
            selectionAreaClone[indexOfItemToUpdate].areaCreated = false;
            return selectionAreaClone;
          });
          // Only reorder columns if the new index is _not_ part of the
          // selectionAreaIndexArray, meaning the new placement is outside
          // of the current selection area. Similarly, the active cell position
          // should only be changed under the same condition.
          if (!selectionAreaIndexArray.includes(newColumnIndex)) {
            const deleteCount = selectionAreaIndexArray.length;
            const startIndex = Math.min(...selectionAreaIndexArray);
            const columnIdArray = visibleColumns.map((column) => column.id);
            const columnIdArrayClone = [...columnIdArray];
            const getNewColumnOrder = () => {
              const newColumnList = [];
              selectionAreaIndexArray.map((index) => {
                return newColumnList.push(columnIdArray[index]);
              });
              return newColumnList;
            };
            // Remove one element at the original index
            columnIdArrayClone.splice(startIndex, deleteCount);
            const originalPointIndex = selectionAreaIndexArray.findIndex(
              (item) => item === originalColumnIndex
            );
            const updatedNewIndexWithNewOrder =
              newColumnIndex - originalPointIndex;
            // Add one element at the new index
            columnIdArrayClone.splice(
              updatedNewIndexWithNewOrder,
              0,
              ...getNewColumnOrder()
            );
            setColumnOrder(columnIdArrayClone); // Function provided by useTable (react-table) hook to reorder columns
            const newCellCoords = {
              ...activeCellCoordinates,
              column: newIndexGreater
                ? activeCellCoordinates.column + differenceBetweenOldNewIndex
                : activeCellCoordinates.column - differenceBetweenOldNewIndex,
            };
            setActiveCellCoordinates(newCellCoords);
            const firstSelectedHeader = Array.from(
              ref.current.querySelectorAll(
                `.${blockClass}__th--selected-header`
              )
            )[0];
            const firstSelectedHeaderCoords =
              firstSelectedHeader.getBoundingClientRect();
            const newRelativePosition =
              firstSelectedHeaderCoords.left -
              spreadsheetPosition.left +
              leftScrollAmount;
            // console.log(firstSelectedHeaderCoords.left - spreadsheetPosition.left + leftScrollAmount);
            const updatedSelectionAreaPlacement = newIndexLessThanStarting
              ? newRelativePosition
              : newColumnIndex === originalColumnIndex
                ? selectionAreaToMove.style.left
                : newRelativePosition;
            selectionAreaToMove.style.left = px(updatedSelectionAreaPlacement);
          }
          // Remove the cloned column and indicator elements
          const indicatorLineElement = ref.current.querySelector(
            `.${blockClass}__reorder-indicator-line`
          );
          indicatorLineElement?.remove();
          selectionAreaCloneElement?.remove();
          selectionAreaElement?.classList?.remove(
            `${blockClass}__selection-area--element`
          );
          setSelectedHeaderReorderActive(false);
        }
      }
      // Mouse up was on a spreadsheet body cell which is a valid
      // start/end point for creating a selection area
      if (validStartingPoint || event.type === 'mouseup') {
        setClickAndHoldActive(false);
        setValidStartingPoint(false);
        const cellButton = event.target.closest(`.${blockClass}__body--td`);
        if (cellButton) {
          const endCellCoordinates = {
            row: Number(cellButton.getAttribute('data-row-index')),
            column: Number(cellButton.getAttribute('data-column-index')),
          };
          setSelectionAreas((prev) => {
            const selectionAreaClone = deepCloneObject(prev);
            const indexOfItemToUpdate = selectionAreaClone.findIndex(
              (item) => item.matcher === currentMatcher
            );
            // No items in the array have an object that matches the value of currentMatcher
            if (indexOfItemToUpdate === -1) {
              return prev;
            }
            selectionAreaClone[indexOfItemToUpdate].point2 = endCellCoordinates;
            selectionAreaClone[indexOfItemToUpdate].areaCreated = false;
            return selectionAreaClone;
          });
        }
      }
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    blockClass,
    currentMatcher,
    setSelectionAreas,
    setClickAndHoldActive,
    setValidStartingPoint,
    validStartingPoint,
    selectedHeaderReorderActive,
    setSelectedHeaderReorderActive,
    ref,
    setHeaderCellHoldActive,
    setColumnOrder,
    visibleColumns,
    setActiveCellCoordinates,
    activeCellCoordinates,
    rows,
    defaultColumn,
    selectionAreas,
  ]);
};
