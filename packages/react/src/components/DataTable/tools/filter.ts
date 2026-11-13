/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Determines whether a cell value has text that a filter can match. Without this
 * check, empty cells and values without a meaningful string form (e.g., React
 * elements) would match on their `String()` output, such as `null`, `undefined`,
 * or `[object Object]`.
 */
const hasFilterableText = (value: unknown) => {
  if (value === null || value === undefined || typeof value === 'boolean') {
    return false;
  }

  return (
    typeof value !== 'object' || value.toString !== Object.prototype.toString
  );
};

/**
 * Filters row IDs based on whether any of the cell values in the row include
 * the input value as a substring. Cell values without filterable text, such as
 * booleans, empty cells, and React elements, are ignored.
 */
export const defaultFilterRows = ({
  rowIds,
  headers,
  cellsById,
  inputValue,
  getCellId,
}: {
  /** Table row IDs. */
  rowIds: string[];
  /** Table headers. */
  headers: { key: string }[];
  /** Mapping of cell IDs to their corresponding cells. */
  cellsById: Record<string, { value: unknown }>;
  /** Input value to search for. */
  inputValue: string;
  /** Function that returns a cell ID given a row ID and a header. */
  getCellId: (rowId: string, header: string) => string;
}): string[] => {
  const normalizedInput = inputValue.trim().toLowerCase();

  if (!normalizedInput) return rowIds;

  return rowIds.filter((rowId) =>
    headers.some(({ key }) => {
      const cellId = getCellId(rowId, key);
      const value = cellsById[cellId]?.value;

      if (!hasFilterableText(value)) return false;

      return String(value).toLowerCase().includes(normalizedInput);
    })
  );
};
