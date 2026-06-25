/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { px } from '@carbon/layout';
import { pkg } from '../../../settings';
import { usePreviousValue } from '../../../global/js/hooks';

export const useSpreadsheetEdit = ({
  isEditing,
  rows,
  activeCellCoordinates,
  activeCellRef,
  cellEditorRef,
  cellEditorRulerRef,
  visibleColumns,
  defaultColumn,
  cellEditorValue,
  blockClass = `${pkg.prefix}--data-spreadsheet`,
}) => {
  const [nextIndex, setNextIndex] = useState(null);
  const previousState = usePreviousValue({
    nextIndex,
  });
  useEffect(() => {
    if (!previousState?.nextIndex) {
      setNextIndex(activeCellCoordinates?.column);
    }
  }, [previousState?.nextIndex, activeCellCoordinates]);
  useEffect(() => {
    const rulerWidth = cellEditorRulerRef.current.offsetWidth;
    const cellEditorCurrentWidth = parseInt(cellEditorRef.current.style.width);
    if (isEditing) {
      const cellProps =
        rows[activeCellCoordinates?.row]?.cells[activeCellCoordinates?.column];
      const activeCellLeftPosition = activeCellRef?.current.style.left;
      const activeCellTopPosition = activeCellRef?.current.style.top;
      cellEditorRef.current.style.left = activeCellLeftPosition;
      cellEditorRef.current.style.top = activeCellTopPosition;
      cellEditorRef.current.style.display = 'block';
      cellEditorRef.current.style.height = activeCellRef?.current.style.height;
      cellEditorRef.current.style.paddingTop = `${
        (parseInt(activeCellRef?.current.style.height) - 16) / 2 - 1
      }px`; // calculate paddingTop based on cellHeight which could be variable depending on the cellSize prop
      cellEditorRef.current.style.textAlign =
        cellProps?.column?.placement === 'right' ? 'right' : 'left';
      cellEditorRef.current?.focus();

      if (rulerWidth < cellEditorCurrentWidth) {
        const currentColumnWidth =
          visibleColumns[nextIndex]?.width || defaultColumn?.width;
        // If the contents of the cell editor is deleted past the point of the next column
        if (rulerWidth < cellEditorCurrentWidth - currentColumnWidth) {
          cellEditorRef.current.style.width = px(
            parseInt(cellEditorRef.current.style.width) - currentColumnWidth
          );
          setNextIndex((prev) => {
            if (prev === 0) {
              return prev;
            }
            return prev - 1;
          });
        }
        // Decrease cell editor width by increment of current column width
      }
      if (rulerWidth >= cellEditorCurrentWidth) {
        setNextIndex((prev) => {
          if (prev === visibleColumns.length - 1) {
            return prev;
          }
          return prev + 1;
        });
        const onLastColumnIndex = nextIndex + 1 === visibleColumns.length;
        const nextColumnWidth = onLastColumnIndex
          ? 0
          : visibleColumns[nextIndex + 1]?.width || defaultColumn?.width;
        const startingRowPosition = activeCellCoordinates?.row;
        const totalRows = rows.length;
        const totalCellEditorMaxHeight =
          (totalRows - startingRowPosition) * defaultColumn.rowHeight;
        cellEditorRef.current.style.maxHeight = px(totalCellEditorMaxHeight);
        cellEditorRef.current.style.width = px(
          nextColumnWidth + cellEditorCurrentWidth
        );
        cellEditorRef.current.style.height = px(
          cellEditorRef.current.scrollHeight
        ); // adds dynamic height to cell editor
        // Cell editor has reached max height, we need to add the scrolling back.
        // We also need to subtract 1 to account for the fact that the cell editor
        // is placed one pixel below the cell being edited to account for the border
        if (
          cellEditorRef.current.clientHeight ===
          totalCellEditorMaxHeight - 1
        ) {
          cellEditorRef.current.style.overflow = 'auto';
        } else {
          cellEditorRef.current.style.overflow = 'hidden';
        }
      }
    }
    if (!isEditing) {
      cellEditorRef.current.style.overflow = 'hidden';
      cellEditorRef.current.style.display = 'none';
      cellEditorRef.current.blur();
      activeCellRef.current.focus();
      setNextIndex(activeCellCoordinates?.column);
    }
  }, [
    isEditing,
    activeCellCoordinates,
    rows,
    cellEditorValue,
    defaultColumn,
    activeCellRef,
    cellEditorRef,
    cellEditorRulerRef,
    visibleColumns,
    blockClass,
    previousState?.cellEditorValue,
    nextIndex,
  ]);
};
