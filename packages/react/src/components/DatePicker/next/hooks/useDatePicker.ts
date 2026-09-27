/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type RefObject,
} from 'react';
import {
  DatePickerStateMachine,
  DatePickerEvent,
  DatePickerState,
  parseDateToPlainDate,
  plainDateToDate,
  mapKeyboardToStateMachineEvent,
  ClickOutsideHandler,
  type DatePickerContext,
  type DatePickerMode,
} from '@carbon/utilities/date-picker';

/**
 * Configuration for the useDatePicker hook
 * Maintains 100% backwards compatibility with Carbon React v11 API
 */
export interface UseDatePickerConfig {
  /**
   * The type of date picker (Carbon API uses datePickerType, not mode)
   */
  datePickerType?: 'simple' | 'single' | 'range';

  /**
   * Initial value as ISO date string
   */
  value?: string;

  /**
   * Minimum selectable date (mm/dd/yyyy format - Carbon API)
   */
  minDate?: string | null;

  /**
   * Maximum selectable date (mm/dd/yyyy format - Carbon API)
   */
  maxDate?: string | null;

  /**
   * Date format string (Flatpickr-compatible format)
   */
  dateFormat?: string;

  /**
   * Whether to allow manual input
   */
  allowInput?: boolean;

  /**
   * Whether to close calendar on date selection
   */
  closeOnSelect?: boolean;

  /**
   * Whether the picker is disabled
   */
  disabled?: boolean;

  /**
   * Whether the picker is read-only (Carbon uses readOnly, not readonly)
   */
  readOnly?: boolean;

  /**
   * Locale for date formatting
   */
  locale?: string;

  /**
   * Change handler - receives array of Date objects (Carbon API)
   */
  onChange?: (dates: Date[]) => void;

  /**
   * Open handler
   */
  onOpen?: () => void;

  /**
   * Close handler
   */
  onClose?: () => void;
}

/**
 * Return type for the useDatePicker hook
 */
export interface UseDatePickerReturn {
  /**
   * Current state machine context
   */
  context: DatePickerContext;

  /**
   * Ref to attach to the exit sentinel element in the render tree.
   * The sentinel is a visually-hidden, aria-hidden span placed just after the
   * calendar container.  It has tabindex="-1" by default and is briefly set to
   * tabindex="0" when Tab is pressed from the calendar so the browser delivers
   * focus there naturally — no DOM scan needed.
   */
  exitSentinelRef: RefObject<HTMLSpanElement | null>;

  /**
   * onFocus handler to attach to the exit sentinel element.
   * Restores tabindex="-1" on the sentinel and closes the calendar if still open.
   */
  handleExitSentinelFocus: () => void;

  /**
   * Current state
   */
  state: DatePickerState;

  /**
   * Whether the calendar is open
   */
  isOpen: boolean;

  /**
   * Send an event to the state machine
   */
  send: (eventType: string, payload?: unknown) => void;

  /**
   * Open the calendar
   */
  openCalendar: () => void;

  /**
   * Close the calendar
   */
  closeCalendar: () => void;

  /**
   * Select a date
   */
  selectDate: (date: Temporal.PlainDate) => void;

  /**
   * Handle input focus
   */
  handleInputFocus: (inputType?: 'from' | 'to') => void;

  /**
   * Handle input blur
   */
  handleInputBlur: () => void;

  /**
   * Handle input value change
   */
  handleInputChange: (value: string, inputType?: 'from' | 'to') => void;

  /**
   * Ref for the start input
   */
  startInputRef: React.RefObject<HTMLInputElement | null>;

  /**
   * Ref for the end input (range mode)
   */
  endInputRef: React.RefObject<HTMLInputElement | null>;

  /**
   * Ref for the calendar container
   */
  calendarRef: React.RefObject<HTMLDivElement | null>;
}

// Note: parseDate and temporalToDate functions removed - now using shared utilities
// from @carbon/utilities/date-picker:
// - parseDateToPlainDate() handles mm/dd/yyyy, ISO, and Date object parsing
// - plainDateToDate() converts Temporal.PlainDate to Date objects

/**
 * React hook for managing date picker state using the shared state machine
 * Maintains 100% backwards compatibility with Carbon React v11 API
 *
 * @param {UseDatePickerConfig} config - Configuration options
 * @returns {UseDatePickerReturn} Hook return object with state and handlers
 */
export function useDatePicker(
  config: UseDatePickerConfig = {}
): UseDatePickerReturn {
  const {
    datePickerType = 'single',
    value = '',
    minDate = null,
    maxDate = null,
    dateFormat = 'm/d/Y',
    closeOnSelect = true,
    disabled = false,
    readOnly = false,
    onChange,
    onOpen,
    onClose,
  } = config;

  // Refs for input elements
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  // Ref for the exit sentinel — a visually-hidden span placed just after the
  // calendar container.  See UseDatePickerReturn.exitSentinelRef for details.
  const exitSentinelRef = useRef<HTMLSpanElement>(null);

  // State machine instance (persists across renders)
  const machineRef = useRef<DatePickerStateMachine | null>(null);
  const suppressOpenOnFocusRef = useRef(false);

  // React state for triggering re-renders
  const [context, setContext] = useState<DatePickerContext>(() => {
    // Initialize state machine on first render
    const machine = new DatePickerStateMachine({
      mode: datePickerType as DatePickerMode,
      value,
      minDate: parseDateToPlainDate(minDate),
      maxDate: parseDateToPlainDate(maxDate),
      dateFormat,
      isDisabled: disabled,
      isReadonly: readOnly,
    });
    machineRef.current = machine;
    return machine.getContext();
  });

  const [state, setState] = useState<DatePickerState>(() => {
    return machineRef.current?.getState() || DatePickerState.IDLE;
  });

  // Subscribe to state machine changes
  useEffect(() => {
    const machine = machineRef.current;
    if (!machine) {
      return;
    }

    // Track whether calendar was open to detect close transitions
    let wasCalendarOpen = machine.getContext().isOpen;

    const unsubscribe = machine.subscribe((transition) => {
      setContext(transition.context);
      setState(transition.to as DatePickerState);

      // Call Carbon API callbacks
      if (transition.to === DatePickerState.CALENDAR_OPEN && onOpen) {
        onOpen();
      }

      // Call onClose when calendar closes (isOpen transitions from true to false)
      if (wasCalendarOpen && !transition.context.isOpen && onClose) {
        onClose();
      }

      wasCalendarOpen = transition.context.isOpen;
    });

    return unsubscribe;
  }, [onOpen, onClose]);

  useEffect(() => {
    if (!context.shouldRestoreFocus) {
      return;
    }

    const targetRef =
      context.restoreFocusTo === 'to' ? endInputRef : startInputRef;

    const timeoutId = window.setTimeout(() => {
      suppressOpenOnFocusRef.current = true;
      targetRef.current?.focus();

      machineRef.current?.updateContext({
        shouldRestoreFocus: false,
        restoreFocusTo: null,
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- machineRef is guaranteed non-null inside this setTimeout: it was set during initialisation and is only cleared in cleanup which runs after unmount, long after any pending timer.
      setContext(machineRef.current!.getContext());

      queueMicrotask(() => {
        suppressOpenOnFocusRef.current = false;
      });
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [context.shouldRestoreFocus, context.restoreFocusTo]);

  // Track previous dates to prevent infinite loops
  const prevDatesRef = useRef<string>('');

  // Handle onChange callback (convert Temporal.PlainDate to Date[])
  useEffect(() => {
    if (!onChange) {
      return;
    }

    const dates: Date[] = [];
    if (context.startDate) {
      const date = plainDateToDate(context.startDate);
      if (date) {
        dates.push(date);
      }
    }
    if (context.endDate) {
      const date = plainDateToDate(context.endDate);
      if (date) {
        dates.push(date);
      }
    }

    // Create a string representation of dates for comparison
    const datesKey = dates.map((d) => d.toISOString()).join(',');

    // Only call onChange if dates have actually changed
    if (dates.length > 0 && datesKey !== prevDatesRef.current) {
      prevDatesRef.current = datesKey;
      onChange(dates);
    }
  }, [context.startDate, context.endDate, onChange]);

  // Update state machine when config changes
  useEffect(() => {
    const machine = machineRef.current;
    if (!machine) {
      return;
    }

    // Update disabled state
    if (disabled !== context.isDisabled) {
      machine.send(disabled ? DatePickerEvent.DISABLE : DatePickerEvent.ENABLE);
    }

    // Update readonly state
    if (readOnly !== context.isReadonly) {
      machine.send(
        readOnly ? DatePickerEvent.SET_READONLY : DatePickerEvent.UNSET_READONLY
      );
    }

    // Update min/max dates
    const newMinDate = parseDateToPlainDate(minDate);
    const newMaxDate = parseDateToPlainDate(maxDate);
    if (newMinDate) {
      machine.send(DatePickerEvent.SET_MIN_DATE, { date: newMinDate });
    }
    if (newMaxDate) {
      machine.send(DatePickerEvent.SET_MAX_DATE, { date: newMaxDate });
    }
  }, [
    disabled,
    readOnly,
    minDate,
    maxDate,
    context.isDisabled,
    context.isReadonly,
  ]);

  // Event handlers
  const send = useCallback((eventType: string, payload?: unknown) => {
    machineRef.current?.send(eventType, payload);
  }, []);

  const openCalendar = useCallback(() => {
    // Send CALENDAR_ICON_CLICK to trigger the state transition from IDLE
    // The state machine will handle transitioning to CALENDAR_OPEN state
    send(DatePickerEvent.CALENDAR_ICON_CLICK);
  }, [send]);

  const closeCalendar = useCallback(() => {
    send(DatePickerEvent.CALENDAR_CLOSE);
  }, [send]);

  const selectDate = useCallback(
    (date: Temporal.PlainDate) => {
      if (datePickerType === 'range') {
        if (!context.startDate || context.endDate) {
          // Select start date
          send(DatePickerEvent.RANGE_START_SELECT, { date });
        } else {
          // Select end date — the RANGE_END_SELECT action sets restoreFocusTo
          // and shouldRestoreFocus; no updateContext needed here
          send(DatePickerEvent.RANGE_END_SELECT, { date });
          if (closeOnSelect) {
            send(DatePickerEvent.CALENDAR_CLOSE);
          }
        }
      } else {
        // Single date selection — the DATE_SELECT action sets restoreFocusTo
        // and shouldRestoreFocus; no updateContext needed here
        send(DatePickerEvent.DATE_SELECT, { date });
        if (closeOnSelect) {
          send(DatePickerEvent.CALENDAR_CLOSE);
        }
      }
    },
    [closeOnSelect, datePickerType, context.startDate, context.endDate, send]
  );

  const handleInputFocus = useCallback(
    (inputType: 'from' | 'to' = 'from') => {
      // Send INPUT_FOCUS to transition to FOCUSED state
      send(DatePickerEvent.INPUT_FOCUS, { inputType });

      if (suppressOpenOnFocusRef.current) {
        return;
      }

      // Then send CALENDAR_OPEN to open the calendar
      // This matches the expected state machine flow: IDLE -> FOCUSED -> CALENDAR_OPEN
      send(DatePickerEvent.CALENDAR_OPEN);
    },
    [send]
  );

  const handleInputBlur = useCallback(() => {
    send(DatePickerEvent.INPUT_BLUR);
  }, [send]);

  const handleInputChange = useCallback(
    (value: string, inputType: 'from' | 'to' = 'from') => {
      send(DatePickerEvent.VALUE_CHANGE, { value, inputType });
    },
    [send]
  );

  // Handle click outside to close calendar using shared utility
  useEffect(() => {
    if (!context.isOpen) {
      return;
    }

    const handler = new ClickOutsideHandler({
      isOpen: context.isOpen,
      /**
       * Check if a node is contained within the date picker elements
       * @param {Node} node - The node to check
       * @returns {boolean} True if the node is within the date picker
       */
      containsNode: (node: Node) => {
        const calendarEl = calendarRef.current;
        const startInputEl = startInputRef.current;
        const endInputEl = endInputRef.current;

        return (
          (calendarEl?.contains(node) ?? false) ||
          (startInputEl?.contains(node) ?? false) ||
          (endInputEl?.contains(node) ?? false)
        );
      },
      /**
       * Handle clicks outside the date picker
       */
      onOutsideClick: () => send(DatePickerEvent.OUTSIDE_CLICK),
      useCapture: true,
      attachDelay: 0,
    });

    handler.attach();

    return () => {
      handler.detach();
    };
  }, [context.isOpen, send]);

  // Handle keyboard events
  useEffect(() => {
    /**
     * Handle keyboard events for calendar navigation
     *
     * @param {KeyboardEvent} event - Keyboard event
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const target = event.target as HTMLElement;

      // Check if focus is in the calendar (not in input fields)
      const calendarEl = calendarRef.current;
      const startInputEl = startInputRef.current;
      const endInputEl = endInputRef.current;

      const isFocusInCalendar =
        calendarEl &&
        (calendarEl.contains(target) ||
          target === calendarEl ||
          target.classList?.contains('cds--date-picker__calendar'));

      const isFocusInInput =
        target === startInputEl ||
        target === endInputEl ||
        (startInputEl && startInputEl.contains(target)) ||
        (endInputEl && endInputEl.contains(target));

      // Handle Escape key - close calendar (works from anywhere)
      if (key === 'Escape' && context.isOpen) {
        event.preventDefault();
        send(DatePickerEvent.ESCAPE_KEY);
        return;
      }

      // Handle Tab key - complex focus management
      if (key === 'Tab') {
        // Case 1: Tab FROM input -> Focus the calendar container
        if (isFocusInInput && !event.shiftKey) {
          event.preventDefault();
          // Focus synchronously — no setTimeout, to avoid a pending timer that
          // would fire during a later Tab's act() flush and re-focus the calendar
          // at the wrong time.
          if (calendarEl) {
            const calendar = calendarEl.querySelector(
              '.cds--date-picker__calendar'
            ) as HTMLElement;
            calendar?.focus();
          }
          return;
        }

        // Case 2: Shift+Tab FROM calendar -> Focus input
        if (isFocusInCalendar && event.shiftKey) {
          event.preventDefault();
          // Focus the appropriate input based on mode
          if (
            datePickerType === 'range' &&
            context.lastFocusedInput === 'to' &&
            endInputEl
          ) {
            endInputEl.focus();
          } else if (startInputEl) {
            startInputEl.focus();
          }
          return;
        }

        // Case 3: Tab FROM calendar -> activate exit sentinel and let the
        // browser deliver focus to it naturally.
        //
        // The sentinel (<span tabindex="-1"> rendered just after the calendar
        // container) is briefly set to tabindex="0" here.  The browser then
        // delivers focus to it as the natural Tab destination, triggering its
        // onFocus handler which closes the calendar and restores tabindex="-1".
        //
        // This replaces the previous document.querySelectorAll walk, which
        // could not pierce shadow DOM and required manual index arithmetic.
        if (isFocusInCalendar && !event.shiftKey) {
          send(DatePickerEvent.TAB_KEY);
          // Activate sentinel — browser handles the rest, no preventDefault needed.
          if (exitSentinelRef.current) {
            exitSentinelRef.current.tabIndex = 0;
          }
          return;
        }

        // For other cases, let default Tab behavior work
        return;
      }

      if (!context.isOpen) {
        return;
      }

      // Only handle navigation keys when focus is in calendar, not in input
      if (!isFocusInCalendar || isFocusInInput) {
        return;
      }

      // Use shared keyboard mapper for navigation keys
      const mappedEvent = mapKeyboardToStateMachineEvent({
        key,
        shiftKey: event.shiftKey,
        mode: datePickerType as DatePickerMode,
        state,
        focusedDate: context.focusedDate,
      });

      if (mappedEvent) {
        if (mappedEvent.preventDefault) {
          event.preventDefault();
        }
        if (mappedEvent.eventType) {
          send(mappedEvent.eventType, mappedEvent.payload);
        }
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    context.isOpen,
    context.focusedDate,
    context.lastFocusedInput,
    state,
    datePickerType,
    send,
  ]);

  /**
   * Called when the browser delivers focus to the exit sentinel.
   * Closes the calendar (state machine already received TAB_KEY in _handleKeyDown)
   * and immediately restores tabindex="-1" so future Tab presses skip the sentinel.
   *
   * TODO (carbon monorepo migration): replace this hand-rolled sentinel with the
   * upstream Carbon wrapFocus utility, which implements the same start/end sentinel
   * pattern for focus trapping and exit.
   * Upstream location: packages/react/src/internal/wrapFocus.ts (wrapFocus /
   * wrapFocusWithoutSentinels exports).  Note that wrapFocus is designed to trap
   * focus inside a container (modal pattern) rather than release it; the exit-only
   * direction we need maps to the endTrapNode path in that utility.
   */
  const handleExitSentinelFocus = useCallback(() => {
    if (exitSentinelRef.current) {
      exitSentinelRef.current.tabIndex = -1;
    }
    // Guard: if the calendar is still open (e.g. sentinel received focus by
    // means other than our Tab handler), close it now.
    if (context.isOpen) {
      send(DatePickerEvent.TAB_KEY);
    }
  }, [context.isOpen, send]);

  return {
    context,
    state,
    isOpen: context.isOpen,
    send,
    openCalendar,
    closeCalendar,
    selectDate,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    startInputRef,
    endInputRef,
    calendarRef,
    exitSentinelRef,
    handleExitSentinelFocus,
  };
}
