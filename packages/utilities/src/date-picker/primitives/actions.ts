/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DatePickerState } from './states.js';
import { plainDateToISOString, comparePlainDates } from './temporal-utils.js';
import type {
  DatePickerContext,
  DatePickerEvent,
  StateAction,
  DateSelectPayload,
  InputFocusPayload,
  ValidationErrorPayload,
} from './types.js';

/**
 * Action map - updates context during transitions
 */
type ActionMap = Record<DatePickerState, Partial<Record<string, StateAction>>>;

// A Temporal duration accepted by `PlainDate.add`
type DateDuration = { days?: number; months?: number; years?: number };

// Which configured limit constrains a move
type DateBound = 'min' | 'max';

// Derives the next date from the one navigation started at
type DateStep = (date: Temporal.PlainDate) => Temporal.PlainDate;

/*
 * Date helpers
 */

/**
 * Resolve the date keyboard navigation should move from. Falls back through the
 * selection and the visible month before landing on today.
 *
 * @param {DatePickerContext} context - Current context
 * @returns {Temporal.PlainDate} The date to navigate from
 */
function focusAnchor(context: DatePickerContext): Temporal.PlainDate {
  return (
    context.focusedDate ||
    context.startDate ||
    context.viewDate ||
    Temporal.Now.plainDateISO()
  );
}

/**
 * Clamp a date to the limit it is travelling toward. Only the bound in the
 * direction of travel applies, so moving backward can never be pushed past
 * `maxDate` and vice versa.
 *
 * @param {Temporal.PlainDate} date - The candidate date
 * @param {DatePickerContext} context - Current context
 * @param {DateBound} [bound] - Limit to respect, or none
 * @returns {Temporal.PlainDate} The clamped date
 */
function clampToBound(
  date: Temporal.PlainDate,
  context: DatePickerContext,
  bound?: DateBound
): Temporal.PlainDate {
  if (!bound) {
    return date;
  }
  const limit = bound === 'min' ? context.minDate : context.maxDate;
  if (!limit) {
    return date;
  }
  const order = comparePlainDates(date, limit);
  const outOfBounds = bound === 'min' ? order < 0 : order > 0;
  return outOfBounds ? limit : date;
}

/**
 * Day of the week for a date, 0 = Sunday through 6 = Saturday.
 *
 * @param {Temporal.PlainDate} date - The date to inspect
 * @returns {number} The day of the week
 */
function dayOfWeek(date: Temporal.PlainDate): number {
  return new Date(date.year, date.month - 1, date.day).getDay();
}

// Step to the Sunday that starts the date's week (US calendar)
const toStartOfWeek: DateStep = (date) => date.add({ days: -dayOfWeek(date) });

// Step to the Saturday that ends the date's week (US calendar)
const toEndOfWeek: DateStep = (date) => date.add({ days: 6 - dayOfWeek(date) });

/**
 * Build a step that shifts a date by a fixed number of days.
 *
 * @param {number} days - Days to add, negative to go backward
 * @returns {DateStep} The step function
 */
function byDays(days: number): DateStep {
  return (date) => date.add({ days });
}

/*
 * Shared action builders
 */

/**
 * Move keyboard focus within the grid. The visible month follows only when the
 * move crosses into a different month, keeping the calendar still for
 * within-month navigation.
 *
 * @param {DateStep} step - How to derive the next focused date
 * @param {DateBound} bound - Limit the move travels toward
 * @returns {StateAction} The action
 */
function moveFocus(step: DateStep, bound: DateBound): StateAction {
  return (context) => {
    const anchor = focusAnchor(context);
    const focusedDate = clampToBound(step(anchor), context, bound);

    return {
      focusedDate,
      viewDate:
        focusedDate.month !== anchor.month ? focusedDate : context.viewDate,
    };
  };
}

/**
 * Page keyboard focus by whole months, taking the visible month with it.
 *
 * @param {number} months - Months to add, negative to go backward
 * @param {DateBound} bound - Limit the move travels toward
 * @returns {StateAction} The action
 */
function pageFocusByMonth(months: number, bound: DateBound): StateAction {
  return (context) => {
    const focusedDate = clampToBound(
      focusAnchor(context).add({ months }),
      context,
      bound
    );

    return { focusedDate, viewDate: focusedDate };
  };
}

/**
 * Shift the visible month or year. With `carryFocus` the focused date moves by
 * the same duration; without it focus stays where it is. No-ops until a month
 * is in view.
 *
 * @param {DateDuration} duration - How far to shift the calendar
 * @param {object} [options] - Focus handling
 * @param {boolean} [options.carryFocus] - Drag the focused date along
 * @param {DateBound} [options.bound] - Limit the carried focus travels toward
 * @returns {StateAction} The action
 */
function shiftView(
  duration: DateDuration,
  options: { carryFocus?: boolean; bound?: DateBound } = {}
): StateAction {
  return (context) => {
    if (!context.viewDate) {
      return {};
    }
    const viewDate = context.viewDate.add(duration);
    if (!options.carryFocus) {
      return { viewDate };
    }

    return {
      viewDate,
      focusedDate: context.focusedDate
        ? clampToBound(
            context.focusedDate.add(duration),
            context,
            options.bound
          )
        : null,
    };
  };
}

/**
 * Open the calendar on the month already in view, falling back to the selection
 * and then today.
 *
 * @param {Function} resolveFocus - Picks what the grid focuses on arrival
 * @returns {StateAction} The action
 */
function openCalendar(
  resolveFocus: (
    context: DatePickerContext,
    viewDate: Temporal.PlainDate
  ) => Temporal.PlainDate | null
): StateAction {
  return (context) => {
    const viewDate =
      context.viewDate || context.startDate || Temporal.Now.plainDateISO();

    return {
      isOpen: true,
      viewDate,
      focusedDate: resolveFocus(context, viewDate),
    };
  };
}

// Keep the existing focus, leaving the grid unfocused on a first open
const preserveFocus = (context: DatePickerContext) =>
  context.focusedDate || context.startDate || null;

// Focus the selection, or fall back to the month on display
const focusSelectionOrView = (
  context: DatePickerContext,
  viewDate: Temporal.PlainDate
) => context.startDate || viewDate;

/**
 * Commit a single date. Honours `closeOnSelect` and queues focus back to the
 * input the user came from.
 *
 * @param {DatePickerContext} context - Current context
 * @param {Temporal.PlainDate} date - The selected date
 * @returns {Partial<DatePickerContext>} Updated context
 */
function commitSingleDate(
  context: DatePickerContext,
  date: Temporal.PlainDate
): Partial<DatePickerContext> {
  return {
    startDate: date,
    value: plainDateToISOString(date),
    isOpen: context.closeOnSelect ? false : context.isOpen,
    restoreFocusTo: context.lastFocusedInput || 'from',
    shouldRestoreFocus: context.closeOnSelect,
  };
}

/**
 * Start a new range. The new start date clears any previously selected end.
 *
 * @param {Temporal.PlainDate} startDate - The selected start date
 * @returns {Partial<DatePickerContext>} Updated context
 */
function beginRange(startDate: Temporal.PlainDate): Partial<DatePickerContext> {
  return {
    startDate,
    endDate: null,
    value: plainDateToISOString(startDate),
    restoreFocusTo: 'from',
    shouldRestoreFocus: false,
  };
}

/**
 * Commit a start/end pair, swapping them when the user picked the earlier date
 * second.
 *
 * @param {Temporal.PlainDate} startDate - The pending start date
 * @param {Temporal.PlainDate} endDate - The selected end date
 * @returns {Partial<DatePickerContext>} Updated context
 */
function commitRange(
  startDate: Temporal.PlainDate,
  endDate: Temporal.PlainDate
): Partial<DatePickerContext> {
  const swap = comparePlainDates(endDate, startDate) < 0;
  const finalStartDate = swap ? endDate : startDate;
  const finalEndDate = swap ? startDate : endDate;

  return {
    startDate: finalStartDate,
    endDate: finalEndDate,
    value: `${plainDateToISOString(finalStartDate)}/${plainDateToISOString(
      finalEndDate
    )}`,
  };
}

// Record which input took focus
const focusInput: StateAction = (_context, event: DatePickerEvent) => {
  const payload = event.payload as InputFocusPayload;

  return {
    isFocused: true,
    lastFocusedInput: payload?.inputType || 'from',
  };
};

// Close the calendar
const closeCalendar: StateAction = () => ({ isOpen: false });

// Close the calendar and drop any queued focus restoration
const closeCalendarAndCancelRestore: StateAction = () => ({
  isOpen: false,
  restoreFocusTo: null,
  shouldRestoreFocus: false,
});

// Dismiss on an outside click: closed, blurred, nothing to restore
const dismissCalendar: StateAction = () => ({
  isOpen: false,
  isFocused: false,
  restoreFocusTo: null,
  shouldRestoreFocus: false,
});

// Close the calendar, honouring a restore target queued by a selection
const closeCalendarRestoringFocus: StateAction = (context) => ({
  isOpen: false,
  restoreFocusTo: context.shouldRestoreFocus ? context.restoreFocusTo : null,
  shouldRestoreFocus: context.shouldRestoreFocus,
});

/*
 * Shared event groups
 */

// Grid navigation - identical wherever the calendar grid holds focus
const gridNavigation: Record<string, StateAction> = {
  ARROW_UP: moveFocus(byDays(-7), 'min'),
  ARROW_DOWN: moveFocus(byDays(7), 'max'),
  ARROW_LEFT: moveFocus(byDays(-1), 'min'),
  ARROW_RIGHT: moveFocus(byDays(1), 'max'),
  HOME_KEY: moveFocus(toStartOfWeek, 'min'),
  END_KEY: moveFocus(toEndOfWeek, 'max'),
};

// Month paging from the calendar header controls
const monthNavigation: Record<string, StateAction> = {
  PREV_MONTH: shiftView({ months: -1 }, { carryFocus: true }),
  NEXT_MONTH: shiftView({ months: 1 }, { carryFocus: true }),
};

/*
 * State map
 */

/**
 * Actions for state transitions
 */
export const actions: ActionMap = {
  [DatePickerState.IDLE]: {
    CALENDAR_ICON_CLICK: openCalendar(preserveFocus),
    INPUT_FOCUS: focusInput,
    INPUT_BLUR: () => ({ isFocused: false }),
    OUTSIDE_CLICK: dismissCalendar,
    CALENDAR_CLOSE: closeCalendarRestoringFocus,
  },

  [DatePickerState.FOCUSED]: {
    INPUT_FOCUS: focusInput,
    /**
     * Opening from a focused input jumps straight to the selection, or today,
     * rather than to whatever month was last in view.
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    CALENDAR_OPEN: (context) => {
      const focusedDate = context.startDate || Temporal.Now.plainDateISO();

      return {
        isOpen: true,
        viewDate: focusedDate,
        focusedDate,
      };
    },
    CALENDAR_ICON_CLICK: openCalendar(preserveFocus),
  },

  [DatePickerState.CALENDAR_OPEN]: {
    CALENDAR_OPEN: openCalendar(focusSelectionOrView),
    CALENDAR_ICON_CLICK: openCalendar(focusSelectionOrView),
    OUTSIDE_CLICK: dismissCalendar,
    /**
     * Selecting a range start keeps the calendar open, and moves both the view
     * and the grid focus to it, ready for the end date.
     *
     * @param {DatePickerContext} _context - Current context (unused)
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    RANGE_START_SELECT: (_context, event) => {
      const startDate = (event.payload as DateSelectPayload)?.date;
      if (!startDate) {
        return {};
      }

      return {
        ...beginRange(startDate),
        viewDate: startDate,
        focusedDate: startDate,
        isOpen: true,
      };
    },
    /**
     * Action for DATE_SELECT event (single mode)
     *
     * @param {DatePickerContext} context - Current context
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    DATE_SELECT: (context, event) => {
      const date = (event.payload as DateSelectPayload)?.date;

      return date ? commitSingleDate(context, date) : {};
    },
    /**
     * Enter selects the focused date, exactly as clicking it would.
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ENTER_KEY: (context) =>
      context.focusedDate ? commitSingleDate(context, context.focusedDate) : {},
    ...monthNavigation,
    PREV_YEAR: shiftView({ years: -1 }),
    NEXT_YEAR: shiftView({ years: 1 }),
    GO_TO_TODAY: () => ({ viewDate: Temporal.Now.plainDateISO() }),
    ESCAPE_KEY: closeCalendar,
    TAB_KEY: closeCalendar,
    ...gridNavigation,
    PAGE_UP: shiftView({ months: -1 }, { carryFocus: true, bound: 'min' }),
    PAGE_DOWN: shiftView({ months: 1 }, { carryFocus: true, bound: 'max' }),
  },

  [DatePickerState.SELECTING_START]: {
    /**
     * Action for CALENDAR_OPEN event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    CALENDAR_OPEN: (context) => {
      if (context.mode === 'range') {
        return {
          isOpen: true,
          startDate: null,
          endDate: null,
        };
      }
      return { isOpen: true };
    },
  },

  [DatePickerState.SELECTING_END]: {
    /**
     * Picking a start date again restarts the range in place - the calendar is
     * already open and positioned.
     *
     * @param {DatePickerContext} _context - Current context (unused)
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    RANGE_START_SELECT: (_context, event) => {
      const startDate = (event.payload as DateSelectPayload)?.date;

      return startDate ? beginRange(startDate) : {};
    },
    /**
     * Action for RANGE_END_SELECT event
     *
     * @param {DatePickerContext} context - Current context
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    RANGE_END_SELECT: (context, event) => {
      const endDate = (event.payload as DateSelectPayload)?.date;
      const { startDate } = context;
      if (!endDate || !startDate) {
        return {};
      }

      return {
        ...commitRange(startDate, endDate),
        isOpen: false,
        lastFocusedInput: 'to',
        restoreFocusTo: 'to',
        shouldRestoreFocus: true,
      };
    },
    /**
     * Enter commits the focused date as the range end.
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ENTER_KEY: (context) => {
      const { focusedDate, startDate } = context;
      if (!focusedDate || !startDate) {
        return {};
      }

      return {
        ...commitRange(startDate, focusedDate),
        isOpen: false,
        restoreFocusTo: 'to',
        shouldRestoreFocus: true,
      };
    },
    ESCAPE_KEY: closeCalendarAndCancelRestore,
    TAB_KEY: closeCalendarAndCancelRestore,
    ...gridNavigation,
    PAGE_UP: pageFocusByMonth(-1, 'min'),
    PAGE_DOWN: pageFocusByMonth(1, 'max'),
    ...monthNavigation,
  },

  [DatePickerState.DATE_SELECTED]: {
    /**
     * Action for DATE_SELECT event
     *
     * @param {DatePickerContext} context - Current context
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    DATE_SELECT: (context, event) => {
      const date = (event.payload as DateSelectPayload)?.date;
      if (!date || context.mode !== 'single') {
        return {};
      }

      return commitSingleDate(context, date);
    },
    /**
     * Re-picking an end date after a selection respects `closeOnSelect`
     *
     * @param {DatePickerContext} context - Current context
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    RANGE_END_SELECT: (context, event) => {
      const endDate = (event.payload as DateSelectPayload)?.date;
      const { startDate } = context;
      if (!endDate || !startDate) {
        return {};
      }

      return {
        ...commitRange(startDate, endDate),
        isOpen: context.closeOnSelect ? false : context.isOpen,
        restoreFocusTo: 'to',
        shouldRestoreFocus: context.closeOnSelect,
      };
    },
    CALENDAR_CLOSE: closeCalendarRestoringFocus,
  },

  [DatePickerState.DISABLED]: {
    // Action for a DISABLE event
    DISABLE: () => ({
      isDisabled: true,
      isOpen: false,
    }),
    // Action for ENABLE event
    ENABLE: () => ({
      isDisabled: false,
    }),
  },

  [DatePickerState.READONLY]: {
    // Action for SET_READONLY event
    SET_READONLY: () => ({
      isReadonly: true,
      isOpen: false,
    }),
    // Action for UNSET_READONLY event
    UNSET_READONLY: () => ({
      isReadonly: false,
    }),
  },

  [DatePickerState.ERROR]: {
    /**
     * Action for VALIDATION_ERROR event
     *
     * @param {DatePickerContext} _context - Current context (unused)
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    VALIDATION_ERROR: (_context, event) => {
      const payload = event.payload as ValidationErrorPayload;
      return {
        isInvalid: true,
        errorMessage: payload?.message || 'Invalid date',
      };
    },
    // Action for CLEAR_ERROR event
    CLEAR_ERROR: () => ({
      isInvalid: false,
      errorMessage: undefined,
    }),
    // Action for VALUE_CHANGE event
    VALUE_CHANGE: () => ({
      isInvalid: false,
      errorMessage: undefined,
    }),
  },
};

/**
 * Get action for a specific state and event
 *
 * @param {DatePickerState} state - The current state
 * @param {string} eventType - The event type
 * @returns {StateAction | undefined} The action function or undefined
 */
export function getAction(
  state: DatePickerState,
  eventType: string
): StateAction | undefined {
  return actions[state]?.[eventType];
}

/**
 * Execute an action and return context updates
 *
 * @param {DatePickerState} state - The current state
 * @param {string} eventType - The event type
 * @param {DatePickerContext} context - The current context
 * @param {DatePickerEvent} event - The event
 * @returns {Partial<DatePickerContext>} Partial context updates
 */
export function executeAction(
  state: DatePickerState,
  eventType: string,
  context: DatePickerContext,
  event: DatePickerEvent
): Partial<DatePickerContext> {
  const action = getAction(state, eventType);
  if (!action) {
    return {};
  }
  return action(context, event);
}
