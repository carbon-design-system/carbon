/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Filters row IDs based on whether any of the cell values in the row include
 * the input value as a substring. Boolean cell values are ignored.
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
      const cell = cellsById[cellId];

      if (typeof cell.value === 'boolean') return false;

      return String(cell.value).toLowerCase().includes(normalizedInput);
    })
  );
};
