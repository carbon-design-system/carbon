/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Table color scheme.
 */
export enum TABLE_COLOR_SCHEME {
  /**
   * Regular color scheme.
   */
  REGULAR = '',

  /**
   * Color scheme with zebra stripe.
   */
  ZEBRA = 'zebra',
}

/**
 * Table size.
 */
export enum TABLE_SIZE {
  /**
   * Compact size.
   */
  COMPACT = 'compact',

  /**
   * Short size.
   */
  SHORT = 'short',

  /**
   * Regular size.
   */
  REGULAR = '',

  /**
   * Tall size.
   */
  TALL = 'tall',
}

/**
 * Table sort state.
 */
export enum TABLE_SORT_DIRECTION {
  /**
   * Not sorted.
   */
  NONE = 'none',

  /**
   * Sorted ascendingly.
   */
  ASCENDING = 'ascending',

  /**
   * Sorted descendingly.
   */
  DESCENDING = 'descending',
}

/**
 * Table sort cycle.
 */
export enum TABLE_SORT_CYCLE {
  BI_STATES_FROM_ASCENDING = 'bi-states-from-ascending',
  BI_STATES_FROM_DESCENDING = 'bi-states-from-descending',
  TRI_STATES_FROM_ASCENDING = 'tri-states-from-ascending',
  TRI_STATES_FROM_DESCENDING = 'tri-states-from-descending',
}

/**
 * Mapping of table sort cycles to table sort states.
 */
export const TABLE_SORT_CYCLES = {
  [TABLE_SORT_CYCLE.BI_STATES_FROM_ASCENDING]: [TABLE_SORT_DIRECTION.ASCENDING, TABLE_SORT_DIRECTION.DESCENDING],
  [TABLE_SORT_CYCLE.BI_STATES_FROM_DESCENDING]: [TABLE_SORT_DIRECTION.DESCENDING, TABLE_SORT_DIRECTION.ASCENDING],
  [TABLE_SORT_CYCLE.TRI_STATES_FROM_ASCENDING]: [
    TABLE_SORT_DIRECTION.NONE,
    TABLE_SORT_DIRECTION.ASCENDING,
    TABLE_SORT_DIRECTION.DESCENDING,
  ],
  [TABLE_SORT_CYCLE.TRI_STATES_FROM_DESCENDING]: [
    TABLE_SORT_DIRECTION.NONE,
    TABLE_SORT_DIRECTION.DESCENDING,
    TABLE_SORT_DIRECTION.ASCENDING,
  ],
};
