/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Date picker state machine states
 */
export enum DatePickerState {
  /**
   * Initial state - calendar closed, no focus
   */
  IDLE = 'idle',

  /**
   * Input has focus, calendar closed
   */
  FOCUSED = 'focused',

  /**
   * Calendar dropdown is open
   */
  CALENDAR_OPEN = 'calendar_open',

  /**
   * User is selecting the start date (range mode)
   */
  SELECTING_START = 'selecting_start',

  /**
   * User is selecting the end date (range mode)
   */
  SELECTING_END = 'selecting_end',

  /**
   * Date(s) have been selected
   */
  DATE_SELECTED = 'date_selected',

  /**
   * Component is disabled
   */
  DISABLED = 'disabled',

  /**
   * Component is read-only
   */
  READONLY = 'readonly',

  /**
   * Component is in an error state
   */
  ERROR = 'error',
}

/**
 * Date picker events
 */
export enum DatePickerEvent {
  // Input events
  INPUT_FOCUS = 'INPUT_FOCUS',
  INPUT_BLUR = 'INPUT_BLUR',
  INPUT_CHANGE = 'INPUT_CHANGE',

  // Calendar events
  CALENDAR_ICON_CLICK = 'CALENDAR_ICON_CLICK',
  CALENDAR_OPEN = 'CALENDAR_OPEN',
  CALENDAR_CLOSE = 'CALENDAR_CLOSE',

  // Calendar navigation events
  PREV_MONTH = 'PREV_MONTH',
  NEXT_MONTH = 'NEXT_MONTH',
  PREV_YEAR = 'PREV_YEAR',
  NEXT_YEAR = 'NEXT_YEAR',
  GO_TO_TODAY = 'GO_TO_TODAY',

  // Date selection events
  DATE_SELECT = 'DATE_SELECT',
  RANGE_START_SELECT = 'RANGE_START_SELECT',
  RANGE_END_SELECT = 'RANGE_END_SELECT',

  // User interaction events
  OUTSIDE_CLICK = 'OUTSIDE_CLICK',
  ESCAPE_KEY = 'ESCAPE_KEY',
  TAB_KEY = 'TAB_KEY',
  SHIFT_TAB_KEY = 'SHIFT_TAB_KEY',
  ENTER_KEY = 'ENTER_KEY',

  // Arrow key navigation
  ARROW_UP = 'ARROW_UP',
  ARROW_DOWN = 'ARROW_DOWN',
  ARROW_LEFT = 'ARROW_LEFT',
  ARROW_RIGHT = 'ARROW_RIGHT',

  // Page navigation
  PAGE_UP = 'PAGE_UP',
  PAGE_DOWN = 'PAGE_DOWN',

  // Week navigation
  HOME_KEY = 'HOME_KEY',
  END_KEY = 'END_KEY',

  // State change events
  DISABLE = 'DISABLE',
  ENABLE = 'ENABLE',
  SET_READONLY = 'SET_READONLY',
  UNSET_READONLY = 'UNSET_READONLY',
  VALUE_CHANGE = 'VALUE_CHANGE',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',

  // Configuration events
  SET_MIN_DATE = 'SET_MIN_DATE',
  SET_MAX_DATE = 'SET_MAX_DATE',
  SET_DATE_FORMAT = 'SET_DATE_FORMAT',
}
