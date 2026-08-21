/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DatePickerState } from './states.js';
import type {
  DatePickerContext,
  DatePickerEvent,
  SideEffect,
} from './types.js';

/**
 * Effect map - performs side effects after transitions
 */
type EffectMap = Record<DatePickerState, Partial<Record<string, SideEffect>>>;

/**
 * Side effects for state transitions
 * These are executed after the state transition is complete
 */
export const effects: EffectMap = {
  [DatePickerState.IDLE]: {},

  [DatePickerState.FOCUSED]: {},

  [DatePickerState.CALENDAR_OPEN]: {
    /**
     * Focus on the calendar when it opens
     */
    CALENDAR_OPEN: () => {
      // This will be implemented by the adapter
      //  can hook into this to focus the calendar element
    },
    /**
     * Focus the calendar when opened via a Tab key
     */
    TAB_KEY: () => {
      // This will be implemented by the adapter
    },
  },

  [DatePickerState.SELECTING_START]: {},

  [DatePickerState.SELECTING_END]: {},

  [DatePickerState.DATE_SELECTED]: {
    /**
     * Dispatch custom event when a date is selected
     */
    DATE_SELECT: () => {
      // This will be implemented by the adapter
      //  can dispatch a custom event here
    },
    /**
     * Dispatch custom event when the range end is selected
     */
    RANGE_END_SELECT: () => {
      // This will be implemented by the adapter
    },
  },

  [DatePickerState.DISABLED]: {},

  [DatePickerState.READONLY]: {},

  [DatePickerState.ERROR]: {
    /**
     * Log validation errors
     * @param {DatePickerContext} _context - Current context
     * @param {DatePickerEvent} event - The event
     */
    VALIDATION_ERROR: (_context, event) => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('DatePicker validation error:', event.payload);
      }
    },
  },
};

/**
 * Get effect for a specific state and event
 *
 * @param {DatePickerState} state - The current state
 * @param {string} eventType - The event type
 * @returns The effect function or undefined
 */
export function getEffect(
  state: DatePickerState,
  eventType: string
): SideEffect | undefined {
  return effects[state]?.[eventType];
}

/**
 * Execute an effect
 *
 * @param {DatePickerState} state - The current state
 * @param {string} eventType - The event type
 * @param {DatePickerContext} context - The current context
 * @param {DatePickerEvent} event - The event
 */
export function executeEffect(
  state: DatePickerState,
  eventType: string,
  context: DatePickerContext,
  event: DatePickerEvent
): void {
  const effect = getEffect(state, eventType);
  if (effect) {
    effect(context, event);
  }
}
