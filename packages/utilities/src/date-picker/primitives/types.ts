/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Temporal API type declarations
 * Using Temporal for modern date handling
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Temporal {
    interface PlainDate {
      readonly year: number;
      readonly month: number;
      readonly day: number;
      readonly daysInMonth: number;
      toString(): string;
      with(dateLike: {
        year?: number;
        month?: number;
        day?: number;
      }): PlainDate;
      add(duration: {
        days?: number;
        months?: number;
        years?: number;
      }): PlainDate;
      until(other: PlainDate): { days: number };
      toPlainYearMonth(): PlainYearMonth;
    }

    interface PlainYearMonth {
      readonly year: number;
      readonly month: number;
      readonly daysInMonth: number;
      toString(): string;
      toPlainDate(dayLike: { day: number }): PlainDate;
      add(duration: { months?: number; years?: number }): PlainYearMonth;
      subtract(duration: { months?: number; years?: number }): PlainYearMonth;
    }

    interface PlainYearMonthConstructor {
      from(item: string | { year: number; month: number }): PlainYearMonth;
      compare(one: PlainYearMonth, two: PlainYearMonth): number;
    }

    const PlainYearMonth: PlainYearMonthConstructor;

    interface PlainDateConstructor {
      from(
        item: string | { year: number; month: number; day: number }
      ): PlainDate;
      compare(one: PlainDate, two: PlainDate): number;
    }

    const PlainDate: PlainDateConstructor;

    interface Now {
      plainDateISO(): PlainDate;
    }

    const Now: Now;
  }
}

/**
 * Date picker modes
 */
export type DatePickerMode = 'simple' | 'single' | 'range';

/**
 * Input type for range mode
 */
export type InputType = 'from' | 'to';

/**
 * Input target for focus restoration
 */
export type FocusRestoreTarget = InputType | null;

/**
 * Date picker state machine context
 * Contains all the state needed to manage the datepicker
 * Uses Temporal.PlainDate for robust date handling
 */
export interface DatePickerContext {
  /** The mode of the date picker */
  mode: DatePickerMode;

  /** The current value as ISO date string(s) */
  value: string;

  /** The selected start date (using Temporal API) */
  startDate: Temporal.PlainDate | null;

  /** The selected end date (range mode only, using Temporal API) */
  endDate: Temporal.PlainDate | null;

  /** Whether the calendar dropdown is open */
  isOpen: boolean;

  /** Whether an input has focus */
  isFocused: boolean;

  /** Whether the component is disabled */
  isDisabled: boolean;

  /** Whether the component is readonly */
  isReadonly: boolean;

  /** Whether the component is in an invalid state */
  isInvalid: boolean;

  /** The last focused input (for range mode) */
  lastFocusedInput: InputType | null;

  /** The input that should receive focus after a selection-driven close */
  restoreFocusTo: FocusRestoreTarget;

  /** Whether focus should be restored after the next close/render cycle */
  shouldRestoreFocus: boolean;

  /** Minimum selectable date (using Temporal API) */
  minDate: Temporal.PlainDate | null;

  /** Maximum selectable date (using Temporal API) */
  maxDate: Temporal.PlainDate | null;

  /** Date format string */
  dateFormat: string;

  /** Whether to allow manual input */
  allowInput: boolean;

  /** Whether to close calendar on date selection */
  closeOnSelect: boolean;

  /** Error message if any */
  errorMessage?: string;

  /** The currently viewed month in the calendar (using Temporal API) */
  viewDate: Temporal.PlainDate | null;

  /** The date that currently has keyboard focus in the calendar */
  focusedDate: Temporal.PlainDate | null;
}

/**
 * Event payload types
 */
export interface DateSelectPayload {
  date: Temporal.PlainDate;
  inputType?: InputType;
}

export interface InputFocusPayload {
  inputType: InputType;
}

export interface KeyboardPayload {
  key: string;
  shiftKey?: boolean;
}

export interface ValueChangePayload {
  value: string;
}

export interface ValidationErrorPayload {
  message: string;
}

/**
 * Date picker event
 */
export interface DatePickerEvent<T = unknown> {
  type: string;
  payload?: T;
  timestamp: number;
}

/**
 * State transition information
 */
export interface StateTransition {
  from: string;
  to: string;
  event: DatePickerEvent;
  context: DatePickerContext;
}

/**
 * Guard function type - determines if a transition is allowed
 */
export type StateGuard = (
  context: DatePickerContext,
  event: DatePickerEvent
) => boolean;

/**
 * Action function type - updates context during transition
 */
export type StateAction = (
  context: DatePickerContext,
  event: DatePickerEvent
) => Partial<DatePickerContext>;

/**
 * Side effect function type - performs side effects after transition
 */
export type SideEffect = (
  context: DatePickerContext,
  event: DatePickerEvent
) => void;

/**
 * Transition listener function type
 */
export type TransitionListener = (transition: StateTransition) => void;

/**
 * State configuration
 */
export interface StateConfig {
  guards?: Record<string, StateGuard>;
  actions?: Record<string, StateAction>;
  effects?: Record<string, SideEffect>;
}

/**
 * Transition map type
 */
export type TransitionMap = Record<string, Partial<Record<string, string>>>;
