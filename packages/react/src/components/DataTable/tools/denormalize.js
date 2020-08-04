/*
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
*/
const denormalize = (rowIds, rowsById, cellsById) => {
  return rowIds.map((id) => ({
    ...rowsById[id],
    cells: rowsById[id].cells.map((cellId) => cellsById[cellId]),
  }));
};

export default denormalize;
