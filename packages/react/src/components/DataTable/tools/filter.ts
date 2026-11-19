/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Cross-realm `Object.prototype.toString` functions have different identities.
const defaultObjectToStringSource = Function.prototype.toString.call(
  Object.prototype.toString
);

// Ignore inherited `Object.prototype.toString`, but keep built-in overrides.
const usesDefaultObjectToString = (value: object) => {
  let owner: object | null = value;

  while (owner) {
    const descriptor = Object.getOwnPropertyDescriptor(owner, 'toString');

    if (descriptor) {
      return (
        owner !== value &&
        Object.getPrototypeOf(owner) === null &&
        typeof descriptor.value === 'function' &&
        Function.prototype.toString.call(descriptor.value) ===
          defaultObjectToStringSource
      );
    }

    owner = Object.getPrototypeOf(owner);
  }

  return false;
};

/**
 * Converts a cell value to searchable text. Objects using the default object
 * string form are ignored, while objects with a meaningful string form are
 * supported. Returns `null` when a value cannot be converted safely.
 */
const getFilterableText = (value: unknown): string | null => {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'bigint'
  ) {
    return String(value);
  }

  if (typeof value !== 'object' || value === null) return null;

  try {
    const toString: unknown = value.toString;

    if (typeof toString !== 'function') return null;

    if (usesDefaultObjectToString(value)) return null;

    const text = Reflect.apply(toString, value, []);

    return typeof text === 'string' ? text : null;
  } catch {
    return null;
  }
};

/**
 * Filters row IDs based on whether any of the cell values in the row include
 * the input value as a substring. Cell values without filterable text are
 * ignored.
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
      const text = getFilterableText(cellsById[cellId]?.value);

      return text?.toLowerCase().includes(normalizedInput) ?? false;
    })
  );
};
