/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { px } from '@carbon/layout';
import { pkg } from '../../../settings';

export const createActiveCellFn = ({
  placementElement,
  coords,
  addToHeader = false,
  contextRef,
  blockClass = `${pkg.prefix}--data-spreadsheet`,
  onActiveCellChange,
  activeCellValue,
  activeCellRef,
  cellEditorRef,
  defaultColumn,
}) => {
  if (!coords) {
    return;
  }
  // If the active cell is in the column header row (very first), we need to append this element
  // to `.${blockClass}__header--container`, otherwise it should be appended to `.${blockClass}__listContainer` firstElementChild
  const spreadsheetSelector = contextRef?.current ?? document;
  const point1Element =
    spreadsheetSelector.querySelector(
      `[data-row-index="${coords.row}"][data-column-index="${coords.column}"]`
    ) || spreadsheetSelector.querySelector(`.${blockClass}__body--td`);
  // if we can't find the point1 element (this can happen in the case where a virtualized row is not present anymore in the DOM), we get the default height/width of the first body cell we find

  const selectionAreaCellWidth = point1Element.offsetWidth;
  const selectionAreaCellHeight = point1Element.offsetHeight;
  const activeElementContainer = addToHeader
    ? contextRef?.current.querySelector(`.${blockClass}__header--container`)
    : contextRef?.current.querySelector(`.${blockClass}__list--container`)
        .firstElementChild;
  const relativePosition = {
    top: placementElement
      ? placementElement.getBoundingClientRect().top -
        activeElementContainer.getBoundingClientRect().top
      : coords.row === 0
        ? 0
        : selectionAreaCellHeight * coords.row, // calculate top value here if virtualized row is not in DOM
    left: placementElement
      ? placementElement.getBoundingClientRect().left -
        activeElementContainer.getBoundingClientRect().left
      : coords.column === 0
        ? 0 + (defaultColumn.rowHeaderWidth - 4)
        : selectionAreaCellWidth * coords.column +
          (defaultColumn.rowHeaderWidth - 4), // calculate left value here if virtualized row is not in DOM, accounting for row header cell width (including borders)
  };
  const activeCellButton = activeCellRef?.current;
  activeCellButton.style.width = px(
    placementElement ? placementElement?.offsetWidth : selectionAreaCellWidth
  );
  activeCellButton.style.height = px(
    placementElement ? placementElement?.offsetHeight : selectionAreaCellHeight
  );
  activeCellButton.style.left = px(relativePosition.left);
  activeCellButton.style.top = px(relativePosition.top);
  activeCellButton.style.display = 'block';
  activeCellButton.setAttribute(
    'data-active-row-index',
    typeof coords?.row === 'number' ? coords.row : 'header'
  );
  activeCellButton.setAttribute(
    'data-active-column-index',
    typeof coords?.column === 'number' ? coords.column : 'header'
  );
  activeElementContainer.appendChild(activeCellButton);
  activeCellButton.focus();
  if (!addToHeader) {
    activeElementContainer.appendChild(cellEditorRef.current);
  }
  if (typeof coords?.column === 'number' && typeof coords?.row === 'number') {
    onActiveCellChange?.(activeCellValue);
  }
};
