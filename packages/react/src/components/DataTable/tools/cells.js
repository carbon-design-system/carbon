/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Generic helper used to consolidate all call sites for getting a cell id into
 * one method. The strategy currently is that a "cellId" is just the combination
 * of the row id and the header key used to access this field in a row.
 *
 * @param {string} rowId
 * @param {string} header
 * @returns {string}
 */
export const getCellId = (rowId, header) => `${rowId}:${header}`;
