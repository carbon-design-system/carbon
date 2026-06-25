/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { px } from '@carbon/layout';
import { deepCloneObject } from '../../../global/js/utils/deepCloneObject';
import { getSelectionAreaPoints } from './getSelectionAreaPoints';

export const createCellSelectionArea = ({
  ref,
  area,
  blockClass,
  defaultColumn,
  selectionAreas,
  setSelectionAreas,
  setActiveCellInsideSelectionArea,
  visibleColumns,
}) => {
  const {
    lowestColumnIndex,
    lowestRowIndex,
    greatestColumnIndex,
    greatestRowIndex,
  } = getSelectionAreaPoints(area);
  if (
    greatestRowIndex - lowestRowIndex > 0 ||
    greatestColumnIndex - lowestColumnIndex > 0
  ) {
    setActiveCellInsideSelectionArea(true);
    const activeCellElement = ref.current.querySelector(
      `.${blockClass}__active-cell--highlight`
    );
    activeCellElement.setAttribute('data-selection-id', area.matcher);
  }
  let selectionAreaVariableWidth = 0;
  visibleColumns.forEach((item, index) => {
    if (index >= lowestColumnIndex && index <= greatestColumnIndex) {
      selectionAreaVariableWidth += item?.width || defaultColumn?.width;
    }
  });

  const spreadsheetSelector = ref.current ?? document;
  const point1Element =
    spreadsheetSelector.querySelector(
      `[data-row-index="${area.point1.row}"][data-column-index="${area.point1.column}"]`
    ) || spreadsheetSelector.querySelector(`.${blockClass}__body--td`);
  // if we can't find the point1 element (this can happen in the case where a virtualized row is not present anymore in the DOM), we get the default height of the first body cell we find

  const selectionAreaCellHeight = point1Element.offsetHeight;
  const selectionAreaTotalHeight =
    selectionAreaCellHeight * (greatestRowIndex - lowestRowIndex + 1);

  const bodyContainer = spreadsheetSelector.querySelector(
    `.${blockClass}__list--container`
  ).firstElementChild;
  const placementElement = bodyContainer.querySelector(
    `[data-row-index="${lowestRowIndex}"][data-column-index="${lowestColumnIndex}"]`
  );
  const relativePosition = {
    top: placementElement
      ? placementElement.getBoundingClientRect().top -
        bodyContainer.getBoundingClientRect().top
      : lowestRowIndex === 0
        ? 0
        : selectionAreaCellHeight * lowestRowIndex, // calculate top value here if virtualized row is not in DOM
    left: placementElement
      ? placementElement.getBoundingClientRect().left -
        bodyContainer.getBoundingClientRect().left
      : lowestColumnIndex === 0
        ? 0 + (defaultColumn.rowHeaderWidth - 4)
        : defaultColumn.width * lowestColumnIndex +
          (defaultColumn.rowHeaderWidth - 4), // calculate left value here if virtualized row is not in DOM, accounting for row header cell width (including borders)
  };
  const selectionAreaElement =
    (ref
      ? ref.current.querySelector(`[data-matcher-id="${area.matcher}"]`)
      : document.querySelector(`[data-matcher-id="${area.matcher}"]`)) ||
    document.createElement('div');
  selectionAreaElement.classList.add(`${blockClass}__selection-area--element`);
  selectionAreaElement.setAttribute('data-matcher-id', area.matcher);
  selectionAreaElement.style.width = px(selectionAreaVariableWidth);
  selectionAreaElement.style.height = px(selectionAreaTotalHeight);
  selectionAreaElement.style.left = px(relativePosition.left);
  selectionAreaElement.style.top = px(relativePosition.top);
  bodyContainer.appendChild(selectionAreaElement);
  const selectionAreasClone = deepCloneObject(selectionAreas);
  const indexOfCurrentArea = selectionAreasClone.findIndex(
    (item) => item.matcher === area.matcher
  );
  // We need to add another property to the selectionAreas object array to
  // let us know if an area has been created for each item already, ie createdArea: true
  selectionAreasClone[indexOfCurrentArea].areaCreated = true;
  setSelectionAreas(selectionAreasClone);
};
