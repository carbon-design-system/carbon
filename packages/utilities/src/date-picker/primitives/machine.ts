/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  DatePickerState,
  DatePickerEvent as DatePickerEventEnum,
} from './states.js';
import { checkGuard } from './guards.js';
import { executeAction } from './actions.js';
import { executeEffect } from './effects.js';
import type {
  DatePickerContext,
  DatePickerEvent,
  StateTransition,
  TransitionListener,
  TransitionMap,
} from './types.js';

/**
 * State transition configuration
 * Maps the current state + event type to the next state
 */
const stateTransitions: TransitionMap = {
  [DatePickerState.IDLE]: {
    [DatePickerEventEnum.INPUT_FOCUS]: DatePickerState.FOCUSED,
    [DatePickerEventEnum.CALENDAR_ICON_CLICK]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.DISABLE]: DatePickerState.DISABLED,
    [DatePickerEventEnum.SET_READONLY]: DatePickerState.READONLY,
  },
  [DatePickerState.FOCUSED]: {
    [DatePickerEventEnum.INPUT_BLUR]: DatePickerState.IDLE,
    [DatePickerEventEnum.CALENDAR_OPEN]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.CALENDAR_ICON_CLICK]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.DISABLE]: DatePickerState.DISABLED,
  },
  [DatePickerState.CALENDAR_OPEN]: {
    [DatePickerEventEnum.DATE_SELECT]: DatePickerState.DATE_SELECTED,
    [DatePickerEventEnum.RANGE_START_SELECT]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.OUTSIDE_CLICK]: DatePickerState.IDLE,
    [DatePickerEventEnum.ESCAPE_KEY]: DatePickerState.FOCUSED,
    [DatePickerEventEnum.TAB_KEY]: DatePickerState.IDLE,
    [DatePickerEventEnum.CALENDAR_CLOSE]: DatePickerState.FOCUSED,
    [DatePickerEventEnum.PREV_MONTH]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.NEXT_MONTH]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.PREV_YEAR]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.NEXT_YEAR]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.GO_TO_TODAY]: DatePickerState.CALENDAR_OPEN,
    // Keyboard navigation
    [DatePickerEventEnum.ARROW_UP]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.ARROW_DOWN]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.ARROW_LEFT]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.ARROW_RIGHT]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.PAGE_UP]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.PAGE_DOWN]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.HOME_KEY]: DatePickerState.CALENDAR_OPEN,
    [DatePickerEventEnum.END_KEY]: DatePickerState.CALENDAR_OPEN,
    // ENTER_KEY is handled by guards - will dispatch DATE_SELECT or RANGE_START_SELECT
  },
  [DatePickerState.SELECTING_START]: {
    [DatePickerEventEnum.RANGE_START_SELECT]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.OUTSIDE_CLICK]: DatePickerState.IDLE,
    [DatePickerEventEnum.ESCAPE_KEY]: DatePickerState.FOCUSED,
  },
  [DatePickerState.SELECTING_END]: {
    [DatePickerEventEnum.RANGE_END_SELECT]: DatePickerState.DATE_SELECTED,
    [DatePickerEventEnum.RANGE_START_SELECT]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.OUTSIDE_CLICK]: DatePickerState.IDLE,
    [DatePickerEventEnum.ESCAPE_KEY]: DatePickerState.FOCUSED,
    [DatePickerEventEnum.TAB_KEY]: DatePickerState.IDLE,
    // Keyboard navigation
    [DatePickerEventEnum.ARROW_UP]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.ARROW_DOWN]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.ARROW_LEFT]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.ARROW_RIGHT]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.PAGE_UP]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.PAGE_DOWN]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.HOME_KEY]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.END_KEY]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.ENTER_KEY]: DatePickerState.DATE_SELECTED,
    [DatePickerEventEnum.PREV_MONTH]: DatePickerState.SELECTING_END,
    [DatePickerEventEnum.NEXT_MONTH]: DatePickerState.SELECTING_END,
  },
  [DatePickerState.DATE_SELECTED]: {
    [DatePickerEventEnum.CALENDAR_CLOSE]: DatePickerState.IDLE,
    [DatePickerEventEnum.INPUT_FOCUS]: DatePickerState.FOCUSED,
    [DatePickerEventEnum.CALENDAR_ICON_CLICK]: DatePickerState.CALENDAR_OPEN,
  },
  [DatePickerState.DISABLED]: {
    [DatePickerEventEnum.ENABLE]: DatePickerState.IDLE,
  },
  [DatePickerState.READONLY]: {
    [DatePickerEventEnum.UNSET_READONLY]: DatePickerState.IDLE,
  },
  [DatePickerState.ERROR]: {
    [DatePickerEventEnum.VALUE_CHANGE]: DatePickerState.IDLE,
    [DatePickerEventEnum.CLEAR_ERROR]: DatePickerState.IDLE,
  },
};

/**
 * Date picker state machine
 * Manages state transitions and context updates for the date picker
 */
export class DatePickerStateMachine {
  private currentState: DatePickerState;
  private context: DatePickerContext;
  private listeners: Set<TransitionListener> = new Set();

  /**
   * Create a new date picker state machine
   *
   * @param {Partial<DatePickerContext>} initialContext - Initial context values
   */
  constructor(initialContext: Partial<DatePickerContext> = {}) {
    this.currentState = DatePickerState.IDLE;
    this.context = this.createInitialContext(initialContext);
  }

  /**
   * Create initial context with defaults
   *
   * @param {Partial<DatePickerContext>} partial - Partial context to merge with defaults
   * @returns Complete context object
   */
  private createInitialContext(
    partial: Partial<DatePickerContext>
  ): DatePickerContext {
    return {
      mode: 'single',
      value: '',
      startDate: null,
      endDate: null,
      isOpen: false,
      isFocused: false,
      isDisabled: false,
      isReadonly: false,
      isInvalid: false,
      lastFocusedInput: null,
      restoreFocusTo: null,
      shouldRestoreFocus: false,
      minDate: null,
      maxDate: null,
      dateFormat: 'm/d/Y',
      allowInput: true,
      closeOnSelect: true,
      viewDate: null,
      focusedDate: null,
      ...partial,
    };
  }

  /**
   * Send an event to the state machine
   * This is the primary method for triggering state transitions
   *
   * @param {string} eventType - The type of event to send
   * @param {unknown} payload - Optional event payload
   * @returns The updated context
   */
  public send(eventType: string, payload?: unknown): DatePickerContext {
    const event: DatePickerEvent = {
      type: eventType,
      payload,
      timestamp: Date.now(),
    };

    const nextState = this.getNextState(this.currentState, event);

    if (!nextState) {
      // No valid transition, return current context
      return this.context;
    }

    // Check guards
    if (!checkGuard(nextState, event.type, this.context, event)) {
      return this.context;
    }

    // Execute actions to update context
    // Actions are defined for the current state, not the next state
    const contextUpdates = executeAction(
      this.currentState,
      event.type,
      this.context,
      event
    );

    const newContext = {
      ...this.context,
      ...contextUpdates,
    };

    // Create a transition object
    const stateTransition: StateTransition = {
      from: this.currentState,
      to: nextState,
      event,
      context: newContext,
    };

    // Update state
    // const _previousState = this.currentState; <-- this is never used, remove ?
    this.currentState = nextState;
    this.context = newContext;

    // Execute side effects
    executeEffect(nextState, event.type, this.context, event);

    // Notify listeners
    this.notifyListeners(stateTransition);

    return this.context;
  }

  /**
   * Get the current state
   *
   * @returns The current state
   */
  public getState(): DatePickerState {
    return this.currentState;
  }

  /**
   * Get the current context
   *
   * @returns A copy of the current context
   */
  public getContext(): DatePickerContext {
    return { ...this.context };
  }

  /**
   * Update context directly (use sparingly)
   *
   * @param {Partial<DatePickerContext>} updates - Partial context updates
   * @returns The updated context
   */
  public updateContext(updates: Partial<DatePickerContext>): DatePickerContext {
    this.context = {
      ...this.context,
      ...updates,
    };
    return this.context;
  }

  /**
   * Subscribe to state transitions
   *
   * @param {TransitionListener} listener - Function to call on each transition
   * @returns Unsubscribe function
   */
  public subscribe(listener: TransitionListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Check if a transition is valid from the current state
   *
   * @param {string} eventType - The event type to check
   * @returns True if the transition is valid
   */
  public canTransition(eventType: string): boolean {
    const event: DatePickerEvent = { type: eventType, timestamp: Date.now() };
    const nextState = this.getNextState(this.currentState, event);
    if (!nextState) {
      return false;
    }
    return checkGuard(nextState, eventType, this.context, event);
  }

  /**
   * Get the next state for a given event
   *
   * @param {DatePickerState} from - Current state
   * @param {DatePickerEvent} event - The event
   * @returns Next state or null if no transition exists
   */
  private getNextState(
    from: DatePickerState,
    event: DatePickerEvent
  ): DatePickerState | null {
    const transitions = stateTransitions[from];
    if (!transitions) {
      return null;
    }

    const nextState = transitions[event.type];
    if (!nextState) {
      return null;
    }

    return nextState as DatePickerState | null;
  }

  /**
   * Notify all listeners of a state transition
   *
   * @param {StateTransition} transition - The state transition
   */
  private notifyListeners(transition: StateTransition): void {
    this.listeners.forEach((listener) => listener(transition));
  }

  /**
   * Reset the state machine to initial state
   *
   * @param {Partial<DatePickerContext>} initialContext - Optional new initial context
   */
  public reset(initialContext?: Partial<DatePickerContext>): void {
    this.currentState = DatePickerState.IDLE;
    this.context = this.createInitialContext(initialContext || {});
  }
}
