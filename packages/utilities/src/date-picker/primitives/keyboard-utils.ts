/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DatePickerEvent, DatePickerState } from './states.js';
import type { DatePickerMode } from './types.js';

/**
 * Information needed to map a keyboard event to a state machine event
 */
export interface KeyboardEventInfo {
  /** The keyboard key that was pressed */
  key: string;
  /** Whether the shift key was held */
  shiftKey: boolean;
  /** The current date picker mode */
  mode: DatePickerMode;
  /** The current state machine state */
  state: DatePickerState;
  /** The currently focused date in the calendar */
  focusedDate: Temporal.PlainDate | null;
}

/**
 * Result of mapping a keyboard event to a state machine event
 */
export interface KeyboardEventResult {
  /** The state machine event type to dispatch, or null if key not handled */
  eventType: string | null;
  /** Optional payload for the event */
  payload?: { date: Temporal.PlainDate };
  /** Whether to call preventDefault on the keyboard event */
  preventDefault: boolean;
}

/**
 * Map a keyboard event to a state machine event
 * This provides a single source of truth for keyboard shortcuts across React and Web Components
 *
 * @param {KeyboardEventInfo} info - Information about the keyboard event and current state
 * @returns {KeyboardEventResult | null} The state machine event to dispatch, or null if key not handled
 */
export function mapKeyboardToStateMachineEvent(
  info: KeyboardEventInfo
): KeyboardEventResult | null {
  const { key, mode, state, focusedDate } = info;

  // Handle Escape key - close calendar
  if (key === 'Escape') {
    return {
      eventType: DatePickerEvent.ESCAPE_KEY,
      preventDefault: true,
    };
  }

  // Handle Enter key - select focused date
  if (key === 'Enter') {
    if (!focusedDate) {
      return null; // No date focused, don't handle
    }

    // Determine event based on mode and state
    if (mode === 'range') {
      if (state === DatePickerState.SELECTING_END) {
        return {
          eventType: DatePickerEvent.RANGE_END_SELECT,
          payload: { date: focusedDate },
          preventDefault: true,
        };
      } else {
        return {
          eventType: DatePickerEvent.RANGE_START_SELECT,
          payload: { date: focusedDate },
          preventDefault: true,
        };
      }
    } else {
      // Single mode
      return {
        eventType: DatePickerEvent.DATE_SELECT,
        payload: { date: focusedDate },
        preventDefault: true,
      };
    }
  }

  // Handle arrow keys - navigate dates
  if (key === 'ArrowUp') {
    return {
      eventType: DatePickerEvent.ARROW_UP,
      preventDefault: true,
    };
  }

  if (key === 'ArrowDown') {
    return {
      eventType: DatePickerEvent.ARROW_DOWN,
      preventDefault: true,
    };
  }

  if (key === 'ArrowLeft') {
    return {
      eventType: DatePickerEvent.ARROW_LEFT,
      preventDefault: true,
    };
  }

  if (key === 'ArrowRight') {
    return {
      eventType: DatePickerEvent.ARROW_RIGHT,
      preventDefault: true,
    };
  }

  // Handle Page Up/Down - navigate months
  if (key === 'PageUp') {
    return {
      eventType: DatePickerEvent.PAGE_UP,
      preventDefault: true,
    };
  }

  if (key === 'PageDown') {
    return {
      eventType: DatePickerEvent.PAGE_DOWN,
      preventDefault: true,
    };
  }

  // Handle Home/End - navigate to start/end of week
  if (key === 'Home') {
    return {
      eventType: DatePickerEvent.HOME_KEY,
      preventDefault: true,
    };
  }

  if (key === 'End') {
    return {
      eventType: DatePickerEvent.END_KEY,
      preventDefault: true,
    };
  }

  // Key not handled by this mapper
  return null;
}
