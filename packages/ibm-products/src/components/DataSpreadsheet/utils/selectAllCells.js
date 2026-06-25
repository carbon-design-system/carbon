/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { removeCellSelections } from './removeCellSelections';
import uuidv4 from '../../../global/js/utils/uuidv4';

export const selectAllCells = ({
  activeCellCoordinates,
  columns,
  setCurrentMatcher,
  setSelectionAreas,
  ref,
  rows,
  updateActiveCellCoordinates,
}) => {
  removeCellSelections({ spreadsheetRef: ref });
  const selectionPoint1 = {
    row: 0,
    column: 0,
  };
  const selectionPoint2 = {
    row: rows.length - 1,
    column: columns.length - 1,
  };
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
      column: 0,
      row: 0,
    },
  });
  setCurrentMatcher(tempMatcher);
  return setSelectionAreas([newSelectionArea]);
};
