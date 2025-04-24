/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Generates a unique cell ID by combining the row ID and header.
 *
 * Generic helper used to consolidate all call sites for getting a cell ID into
 * one method.
 */
export const getCellId = (rowId: string, header: string) =>
  `${rowId}:${header}`;
