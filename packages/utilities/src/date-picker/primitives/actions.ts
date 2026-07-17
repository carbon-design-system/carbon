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

/**
 * Actions for state transitions
 */
export const actions: ActionMap = {
  [DatePickerState.IDLE]: {
    /**
     * Action for CALENDAR_ICON_CLICK event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    CALENDAR_ICON_CLICK: (context) => {
      // Initialize viewDate to today if not set
      const viewDate =
        context.viewDate || context.startDate || Temporal.Now.plainDateISO();
      // Preserve existing focusedDate if calendar is already open (e.g., during month navigation)
      // Otherwise, set to selected date if one exists, or null (no focus box initially)
      const focusedDate = context.focusedDate || context.startDate || null;

      return {
        isOpen: true,
        viewDate,
        focusedDate,
      };
    },
    /**
     * Action for INPUT_FOCUS event
     *
     * @param {DatePickerContext} _context - The current context (unused)
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    INPUT_FOCUS: (
      _context,
      event: DatePickerEvent
    ): Partial<DatePickerContext> => {
      const payload = event.payload as InputFocusPayload;
      return {
        isFocused: true,
        lastFocusedInput: payload?.inputType || 'from',
      };
    },
    /** Action for INPUT_BLUR event */
    INPUT_BLUR: () => ({
      isFocused: false,
    }),
    /** Action for OUTSIDE_CLICK event */
    OUTSIDE_CLICK: () => ({
      isOpen: false,
      isFocused: false,
      restoreFocusTo: null,
      shouldRestoreFocus: false,
    }),
    /**
     * Action for CALENDAR_CLOSE event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    CALENDAR_CLOSE: (context) => ({
      isOpen: false,
      restoreFocusTo: context.shouldRestoreFocus
        ? context.restoreFocusTo
        : null,
      shouldRestoreFocus: context.shouldRestoreFocus,
    }),
  },

  [DatePickerState.FOCUSED]: {
    /**
     * Action for INPUT_FOCUS event
     *
     * @param {DatePickerContext} _context - The current context (unused)
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    INPUT_FOCUS: (
      _context,
      event: DatePickerEvent
    ): Partial<DatePickerContext> => {
      const payload = event.payload as InputFocusPayload;
      return {
        isFocused: true,
        lastFocusedInput: payload?.inputType || 'from',
      };
    },
    /**
     * Action for CALENDAR_OPEN event from FOCUSED state
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    CALENDAR_OPEN: (context) => {
      // Initialize focusedDate to selected date or today if no date is selected
      const focusedDate = context.startDate || Temporal.Now.plainDateISO();
      // Set viewDate to show the month containing the focused date
      const viewDate = focusedDate;

      return {
        isOpen: true,
        viewDate,
        focusedDate,
      };
    },
    /**
     * Action for CALENDAR_ICON_CLICK event from FOCUSED state
     * Behaves identically to CALENDAR_OPEN — opens the calendar preserving
     * any existing viewDate/focusedDate context.
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    CALENDAR_ICON_CLICK: (context) => {
      const viewDate =
        context.viewDate || context.startDate || Temporal.Now.plainDateISO();
      const focusedDate = context.focusedDate || context.startDate || null;
      return {
        isOpen: true,
        viewDate,
        focusedDate,
      };
    },
  },

  [DatePickerState.CALENDAR_OPEN]: {
    /**
     * Action for CALENDAR_OPEN event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    CALENDAR_OPEN: (context) => {
      // Initialize viewDate to today if not set
      const viewDate =
        context.viewDate || context.startDate || Temporal.Now.plainDateISO();
      // Initialize focusedDate for keyboard navigation
      const focusedDate = context.startDate || viewDate;
      return {
        isOpen: true,
        viewDate,
        focusedDate,
      };
    },
    /**
     * Action for OUTSIDE_CLICK event
     * Close the calendar when clicking outside
     *
     * @returns {Partial<DatePickerContext>} Updated context
     */
    OUTSIDE_CLICK: () => ({
      isOpen: false,
      isFocused: false,
      restoreFocusTo: null,
      shouldRestoreFocus: false,
    }),
    /**
     * Action for CALENDAR_ICON_CLICK event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    CALENDAR_ICON_CLICK: (context) => {
      // Initialize viewDate to today if not set
      const viewDate =
        context.viewDate || context.startDate || Temporal.Now.plainDateISO();
      // Initialize focusedDate for keyboard navigation
      const focusedDate = context.startDate || viewDate;
      return {
        isOpen: true,
        viewDate,
        focusedDate,
      };
    },
    /**
     * Action for RANGE_START_SELECT event
     *
     * @param {DatePickerContext} _context - Current context
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    RANGE_START_SELECT: (
      _context: DatePickerContext,
      event: DatePickerEvent
    ): Partial<DatePickerContext> => {
      const payload = event.payload as DateSelectPayload;
      const startDate = payload?.date;

      if (!startDate) {
        return {};
      }

      return {
        startDate,
        endDate: null, // Reset end date when selecting a new start
        value: plainDateToISOString(startDate),
        viewDate: startDate, // Set view date to show the selected month
        focusedDate: startDate, // Set focused date to the selected start date
        isOpen: true, // Keep calendar open for selecting end date
        restoreFocusTo: 'from',
        shouldRestoreFocus: false,
      };
    },
    /**
     * Action for DATE_SELECT event (single mode)
     *
     * @param {DatePickerContext} _context - Current context
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    DATE_SELECT: (
      _context: DatePickerContext,
      event: DatePickerEvent
    ): Partial<DatePickerContext> => {
      const payload = event.payload as DateSelectPayload;
      const startDate = payload?.date;

      if (!startDate) {
        return {};
      }

      return {
        startDate,
        value: plainDateToISOString(startDate),
        isOpen: _context.closeOnSelect ? false : _context.isOpen,
        restoreFocusTo: _context.lastFocusedInput || 'from',
        shouldRestoreFocus: _context.closeOnSelect,
      };
    },
    /**
     * Action for PREV_MONTH event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    PREV_MONTH: (context) => {
      if (!context.viewDate) {
        return {};
      }
      const newViewDate = context.viewDate.add({ months: -1 });
      const focusedDate = context.focusedDate
        ? context.focusedDate.add({ months: -1 })
        : null;

      return {
        viewDate: newViewDate,
        focusedDate,
      };
    },
    /**
     * Action for NEXT_MONTH event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    NEXT_MONTH: (context) => {
      if (!context.viewDate) {
        return {};
      }
      const newViewDate = context.viewDate.add({ months: 1 });
      const focusedDate = context.focusedDate
        ? context.focusedDate.add({ months: 1 })
        : null;

      return {
        viewDate: newViewDate,
        focusedDate,
      };
    },
    /**
     * Action for PREV_YEAR event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    PREV_YEAR: (context) => {
      if (!context.viewDate) {
        return {};
      }
      return {
        viewDate: context.viewDate.add({ years: -1 }),
      };
    },
    /**
     * Action for NEXT_YEAR event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    NEXT_YEAR: (context) => {
      if (!context.viewDate) {
        return {};
      }
      return {
        viewDate: context.viewDate.add({ years: 1 }),
      };
    },
    /** Action for GO_TO_TODAY event */
    GO_TO_TODAY: () => ({
      viewDate: Temporal.Now.plainDateISO(),
    }),
    /**
     * Action for ESCAPE_KEY event - close calendar
     *
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ESCAPE_KEY: () => ({
      isOpen: false,
    }),
    /**
     * Action for TAB_KEY event - close calendar
     *
     * @returns {Partial<DatePickerContext>} Updated context
     */
    TAB_KEY: () => ({
      isOpen: false,
    }),
    /**
     * Action for ENTER_KEY event - select focused date
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ENTER_KEY: (context) => {
      if (!context.focusedDate) {
        return {};
      }
      // Select the focused date (same logic as DATE_SELECT)
      return {
        startDate: context.focusedDate,
        value: plainDateToISOString(context.focusedDate),
        isOpen: context.closeOnSelect ? false : context.isOpen,
        restoreFocusTo: context.lastFocusedInput || 'from',
        shouldRestoreFocus: context.closeOnSelect,
      };
    },
    /**
     * Action for ARROW_UP event - move focus up one week
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ARROW_UP: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      const newFocusedDate = focusedDate.add({ days: -7 });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for ARROW_DOWN event - move focus down one week
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ARROW_DOWN: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      const newFocusedDate = focusedDate.add({ days: 7 });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for ARROW_LEFT event - move focus left one day
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ARROW_LEFT: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      const newFocusedDate = focusedDate.add({ days: -1 });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for ARROW_RIGHT event - move focus right one day
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ARROW_RIGHT: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      const newFocusedDate = focusedDate.add({ days: 1 });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for PAGE_UP event - move to previous month
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    PAGE_UP: (context) => {
      if (!context.viewDate) {
        return {};
      }
      const newViewDate = context.viewDate.add({ months: -1 });
      const focusedDate = context.focusedDate
        ? context.focusedDate.add({ months: -1 })
        : null;

      return {
        viewDate: newViewDate,
        focusedDate,
      };
    },
    /**
     * Action for PAGE_DOWN event - move to next month
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    PAGE_DOWN: (context) => {
      if (!context.viewDate) {
        return {};
      }
      const newViewDate = context.viewDate.add({ months: 1 });
      const focusedDate = context.focusedDate
        ? context.focusedDate.add({ months: 1 })
        : null;

      return {
        viewDate: newViewDate,
        focusedDate,
      };
    },
    /**
     * Action for HOME_KEY event - move to start of week
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    HOME_KEY: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      // Convert to JS Date to get day of week (0 = Sunday, 6 = Saturday)
      const jsDate = new Date(
        focusedDate.year,
        focusedDate.month - 1,
        focusedDate.day
      );
      const dayOfWeek = jsDate.getDay();
      // Move to Sunday (start of week in US calendar)
      const daysToSubtract = dayOfWeek;
      const newFocusedDate = focusedDate.add({ days: -daysToSubtract });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for END_KEY event - move to end of week
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    END_KEY: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      // Convert to JS Date to get day of week (0 = Sunday, 6 = Saturday)
      const jsDate = new Date(
        focusedDate.year,
        focusedDate.month - 1,
        focusedDate.day
      );
      const dayOfWeek = jsDate.getDay();
      // Move to Saturday (end of week in US calendar)
      const daysToAdd = 6 - dayOfWeek;
      const newFocusedDate = focusedDate.add({ days: daysToAdd });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
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
     * Action for RANGE_START_SELECT event
     *
     * @param {DatePickerContext} _context - Current context
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    RANGE_START_SELECT: (
      _context: DatePickerContext,
      event: DatePickerEvent
    ): Partial<DatePickerContext> => {
      const payload = event.payload as DateSelectPayload;
      const startDate = payload?.date;

      if (!startDate) {
        return {};
      }

      return {
        startDate,
        endDate: null, // Reset end date when selecting a new start
        value: plainDateToISOString(startDate),
        restoreFocusTo: 'from',
        shouldRestoreFocus: false,
      };
    },
    /**
     * Action for RANGE_END_SELECT event
     *
     * @param {DatePickerContext} context - Current context
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    RANGE_END_SELECT: (context, event) => {
      const payload = event.payload as DateSelectPayload;
      const endDate = payload?.date;
      const { startDate } = context;

      if (!endDate || !startDate) {
        return {};
      }

      // Ensure end date is after start date, swap if needed
      let finalStartDate = startDate;
      let finalEndDate = endDate;

      if (comparePlainDates(endDate, startDate) < 0) {
        finalStartDate = endDate;
        finalEndDate = startDate;
      }

      return {
        startDate: finalStartDate,
        endDate: finalEndDate,
        value: `${plainDateToISOString(finalStartDate)}/${plainDateToISOString(
          finalEndDate
        )}`,
        isOpen: false, // Always close after selecting end date in range mode
        lastFocusedInput: 'to', // Set to 'to' so the end date input gets updated
        restoreFocusTo: 'to',
        shouldRestoreFocus: true,
      };
    },
    /**
     * Action for ESCAPE_KEY event - close calendar
     *
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ESCAPE_KEY: () => ({
      isOpen: false,
      restoreFocusTo: null,
      shouldRestoreFocus: false,
    }),
    /**
     * Action for TAB_KEY event - close calendar
     *
     * @returns {Partial<DatePickerContext>} Updated context
     */
    TAB_KEY: () => ({
      isOpen: false,
      restoreFocusTo: null,
      shouldRestoreFocus: false,
    }),
    /**
     * Action for ARROW_UP event - move focus up one week
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ARROW_UP: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      const newFocusedDate = focusedDate.add({ days: -7 });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for ARROW_DOWN event - move focus down one week
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ARROW_DOWN: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      const newFocusedDate = focusedDate.add({ days: 7 });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for ARROW_LEFT event - move focus left one day
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ARROW_LEFT: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      const newFocusedDate = focusedDate.add({ days: -1 });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for ARROW_RIGHT event - move focus right one day
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ARROW_RIGHT: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      const newFocusedDate = focusedDate.add({ days: 1 });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for PAGE_UP event - move to previous month
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    PAGE_UP: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      const newFocusedDate = focusedDate.add({ months: -1 });

      return {
        focusedDate: newFocusedDate,
        viewDate: newFocusedDate,
      };
    },
    /**
     * Action for PAGE_DOWN event - move to next month
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    PAGE_DOWN: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      const newFocusedDate = focusedDate.add({ months: 1 });

      return {
        focusedDate: newFocusedDate,
        viewDate: newFocusedDate,
      };
    },
    /**
     * Action for HOME_KEY event - move to start of week
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    HOME_KEY: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      // Convert to JS Date to get day of week (0 = Sunday, 6 = Saturday)
      const jsDate = new Date(
        focusedDate.year,
        focusedDate.month - 1,
        focusedDate.day
      );
      const dayOfWeek = jsDate.getDay(); // 0 = Sunday, 6 = Saturday
      const daysToSubtract = dayOfWeek; // Move to Sunday (0 days if already Sunday)
      const newFocusedDate = focusedDate.add({ days: -daysToSubtract });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for END_KEY event - move to end of week
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    END_KEY: (context) => {
      const focusedDate =
        context.focusedDate ||
        context.startDate ||
        context.viewDate ||
        Temporal.Now.plainDateISO();
      // Convert to JS Date to get day of week (0 = Sunday, 6 = Saturday)
      const jsDate = new Date(
        focusedDate.year,
        focusedDate.month - 1,
        focusedDate.day
      );
      const dayOfWeek = jsDate.getDay(); // 0 = Sunday, 6 = Saturday
      const daysToAdd = dayOfWeek === 6 ? 0 : 6 - dayOfWeek; // Move to Saturday (0 days if already Saturday)
      const newFocusedDate = focusedDate.add({ days: daysToAdd });

      // If we moved to a different month, update viewDate
      const viewDate =
        newFocusedDate.month !== focusedDate.month
          ? newFocusedDate
          : context.viewDate;

      return {
        focusedDate: newFocusedDate,
        viewDate,
      };
    },
    /**
     * Action for ENTER_KEY event - select focused date as end date
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    ENTER_KEY: (context) => {
      if (!context.focusedDate || !context.startDate) {
        return {};
      }

      const endDate = context.focusedDate;
      const { startDate } = context;

      // Ensure end date is after start date, swap if needed
      let finalStartDate = startDate;
      let finalEndDate = endDate;

      if (comparePlainDates(endDate, startDate) < 0) {
        finalStartDate = endDate;
        finalEndDate = startDate;
      }

      return {
        startDate: finalStartDate,
        endDate: finalEndDate,
        value: `${plainDateToISOString(finalStartDate)}/${plainDateToISOString(
          finalEndDate
        )}`,
        isOpen: false, // Always close after selecting end date in range mode
        restoreFocusTo: 'to',
        shouldRestoreFocus: true,
      };
    },
    /**
     * Action for PREV_MONTH event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    PREV_MONTH: (context) => {
      if (!context.viewDate) {
        return {};
      }
      const newViewDate = context.viewDate.add({ months: -1 });
      const focusedDate = context.focusedDate
        ? context.focusedDate.add({ months: -1 })
        : null;

      return {
        viewDate: newViewDate,
        focusedDate,
      };
    },
    /**
     * Action for NEXT_MONTH event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    NEXT_MONTH: (context) => {
      if (!context.viewDate) {
        return {};
      }
      const newViewDate = context.viewDate.add({ months: 1 });
      const focusedDate = context.focusedDate
        ? context.focusedDate.add({ months: 1 })
        : null;

      return {
        viewDate: newViewDate,
        focusedDate,
      };
    },
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
      const payload = event.payload as DateSelectPayload;
      const date = payload?.date;

      if (!date) {
        return {};
      }

      if (context.mode === 'single') {
        return {
          startDate: date,
          value: plainDateToISOString(date),
          isOpen: context.closeOnSelect ? false : context.isOpen,
          restoreFocusTo: context.lastFocusedInput || 'from',
          shouldRestoreFocus: context.closeOnSelect,
        };
      }

      return {};
    },

    /**
     * Action for RANGE_END_SELECT event
     *
     * @param {DatePickerContext} context - Current context
     * @param {DatePickerEvent} event - The event
     * @returns {Partial<DatePickerContext>} Updated context
     */
    RANGE_END_SELECT: (context, event) => {
      const payload = event.payload as DateSelectPayload;
      const endDate = payload?.date;
      const { startDate } = context;

      if (!endDate || !startDate) {
        return {};
      }

      // Ensure end date is after start date, swap if needed
      let finalStartDate = startDate;
      let finalEndDate = endDate;

      if (comparePlainDates(endDate, startDate) < 0) {
        finalStartDate = endDate;
        finalEndDate = startDate;
      }

      return {
        startDate: finalStartDate,
        endDate: finalEndDate,
        value: `${plainDateToISOString(finalStartDate)}/${plainDateToISOString(
          finalEndDate
        )}`,
        isOpen: context.closeOnSelect ? false : context.isOpen,
        restoreFocusTo: 'to',
        shouldRestoreFocus: context.closeOnSelect,
      };
    },

    /**
     * Action for CALENDAR_CLOSE event
     *
     * @param {DatePickerContext} context - Current context
     * @returns {Partial<DatePickerContext>} Updated context
     */
    CALENDAR_CLOSE: (context) => ({
      isOpen: false,
      restoreFocusTo: context.shouldRestoreFocus
        ? context.restoreFocusTo
        : null,
      shouldRestoreFocus: context.shouldRestoreFocus,
    }),
  },

  [DatePickerState.DISABLED]: {
    /** Action for a DISABLE event */
    DISABLE: () => ({
      isDisabled: true,
      isOpen: false,
    }),
    /** Action for ENABLE event */
    ENABLE: () => ({
      isDisabled: false,
    }),
  },

  [DatePickerState.READONLY]: {
    /** Action for SET_READONLY event */
    SET_READONLY: () => ({
      isReadonly: true,
      isOpen: false,
    }),
    /** Action for UNSET_READONLY event */
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
    /** Action for CLEAR_ERROR event */
    CLEAR_ERROR: () => ({
      isInvalid: false,
      errorMessage: undefined,
    }),
    /** Action for VALUE_CHANGE event */
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
