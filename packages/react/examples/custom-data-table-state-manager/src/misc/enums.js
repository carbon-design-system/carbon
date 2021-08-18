/**
 * Table size.
 */
export const TABLE_SIZE = {
  /**
   * Compact size.
   */
  COMPACT: 'compact',

  /**
   * Short size.
   */
  SHORT: 'short',

  /**
   * Regular size.
   */
  REGULAR: 'normal',

  /**
   * Tall size.
   */
  TALL: 'tall',
};

/**
 * Table sort state.
 */
export const TABLE_SORT_DIRECTION = {
  /**
   * Not sorted.
   */
  NONE: 'NONE',

  /**
   * Sorted in ascending order.
   */
  ASCENDING: 'ASC',

  /**
   * Sorted in descending order.
   */
  DESCENDING: 'DESC',
};

/**
 * Table sort cycle.
 */
export const TABLE_SORT_CYCLE = {
  BI_STATES_FROM_ASCENDING: 'bi-states-from-ascending',
  BI_STATES_FROM_DESCENDING: 'bi-states-from-descending',
  TRI_STATES_FROM_ASCENDING: 'tri-states-from-ascending',
  TRI_STATES_FROM_DESCENDING: 'tri-states-from-descending',
};

/**
 * Mapping of table sort cycles to table sort states.
 */
export const TABLE_SORT_CYCLES = {
  [TABLE_SORT_CYCLE.BI_STATES_FROM_ASCENDING]: [
    TABLE_SORT_DIRECTION.ASCENDING,
    TABLE_SORT_DIRECTION.DESCENDING,
  ],
  [TABLE_SORT_CYCLE.BI_STATES_FROM_DESCENDING]: [
    TABLE_SORT_DIRECTION.DESCENDING,
    TABLE_SORT_DIRECTION.ASCENDING,
  ],
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
