/**
 * Button size.
 */
export enum GRID_ALIGNMENT {
  /**
   * Align to start.
   */
  START = 'start',

  /**
   * Align in center
   */
  CENTER = 'center',

  /**
   * Align to end
   */
  END = 'end',
}

export type GridAlignmentType = Record<GRID_ALIGNMENT, string>;

/**
 * Button type.
 */
export enum SUB_GRID_MODE {
  /**
   * Default sug-grid mode.
   */
  WIDE = 'wide',

  /**
   * Condensed sub-grid (should match hosting grid).
   */
  CONDENSED = 'condensed',

  /**
   * Narrow sub-grid (should match hosting grid).
   */
  NARROW = 'narrow',
}
