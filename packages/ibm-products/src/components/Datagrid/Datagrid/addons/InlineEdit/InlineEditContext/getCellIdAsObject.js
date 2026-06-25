/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Turns activeCellId into an object to be able to
// update cell coordinates more easily
export const getCellIdAsObject = (oldId) => {
  const oldIdArr = oldId.split('-');
  const updatedOldValuesArray = oldIdArr.map((item) => {
    if (isNaN(item)) {
      return item;
    }
    return Number(item);
  });
  const indexArray = updatedOldValuesArray.filter(Number.isFinite);
  const keyArray = updatedOldValuesArray.filter(
    (item) => typeof item === 'string'
  );
  const activeCellCoords = {};
  keyArray.forEach((element, index) => {
    activeCellCoords[element] = indexArray[index];
  });
  return activeCellCoords;
};
