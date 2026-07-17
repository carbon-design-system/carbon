/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { DatePickerStateMachine } from '@carbon/utilities/date-picker';
import {
  DatePickerState,
  DatePickerEvent,
} from '@carbon/utilities/date-picker';
import { dateToPlainDate } from '@carbon/utilities/date-picker';
import type {
  DatePickerContext,
  StateTransition,
  DateSelectPayload,
} from '@carbon/utilities/date-picker';
import type CDSDatePicker from '../components/date-picker';

/**
 * Adapter configuration
 */
export interface AdapterConfig {
  /** The date picker component instance */
  component: CDSDatePicker;
  /** Initial context values */
  initialContext?: Partial<DatePickerContext>;
  /** Callback when state changes */
  onStateChange?: (transition: StateTransition) => void;
  /** Callback when the calendar should open */
  onCalendarOpen?: () => void;
  /** Callback when the calendar should close */
  onCalendarClose?: () => void;
  /** Callback when the date is selected */
  onDateSelect?: (context: DatePickerContext) => void;
}

/**
 * Web Component Adapter
 * Bridges the state machine with the Web Component implementation
 */
export class WebComponentAdapter {
  private machine: DatePickerStateMachine;
  private component: CDSDatePicker;
  private config: AdapterConfig;
  private unsubscribe?: () => void;

  /**
   * Create a new adapter
   *
   * @param {AdapterConfig} config - Adapter configuration
   */
  constructor(config: AdapterConfig) {
    this.config = config;
    this.component = config.component;
    this.machine = new DatePickerStateMachine(config.initialContext);

    // Subscribe to state changes
    this.unsubscribe = this.machine.subscribe((transition) => {
      this.handleStateChange(transition);
    });
  }

  /**
   * Send an event to the state machine
   *
   * @param {string} event - Event type
   * @param {unknown} payload - Event payload
   * @returns Updated context
   */
  public send(event: string, payload?: unknown): DatePickerContext {
    return this.machine.send(event, payload);
  }

  /**
   * Get the current state
   *
   * @returns Current state
   */
  public getState(): DatePickerState {
    return this.machine.getState();
  }

  /**
   * Get the current context
   *
   * @returns Current context
   */
  public getContext(): DatePickerContext {
    return this.machine.getContext();
  }

  /**
   * Update context directly
   *
   * @param {Partial<DatePickerContext>} updates - Context updates
   * @returns Updated context
   */
  public updateContext(updates: Partial<DatePickerContext>): DatePickerContext {
    return this.machine.updateContext(updates);
  }

  /**
   * Check if a transition is valid
   *
   * @param {string} event - Event type
   * @returns True if transition is valid
   */
  public canTransition(event: string): boolean {
    return this.machine.canTransition(event);
  }

  /**
   * Handle state changes
   *
   * @param {StateTransition} transition - State transition
   */
  private handleStateChange(transition: StateTransition): void {
    const { from, to, context } = transition;

    // Sync component properties with state machine context
    this.syncComponentProperties(context);

    // Handle specific state transitions
    this.handleTransitionEffects(from, to, context);

    // Call user callback
    if (this.config.onStateChange) {
      this.config.onStateChange(transition);
    }

    // Dispatch custom event
    (this.component as unknown as HTMLElement).dispatchEvent(
      new CustomEvent('cds-date-picker-state-change', {
        detail: { transition },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Sync component properties with context
   *
   * @param {DatePickerContext} context - Current context
   */
  private syncComponentProperties(context: DatePickerContext): void {
    // Sync open state
    if (this.component.open !== context.isOpen) {
      this.component.open = context.isOpen;
    }

    // Sync value
    if (this.component.value !== context.value) {
      this.component.value = context.value;
    }

    // Sync disabled state
    if (this.component.disabled !== context.isDisabled) {
      this.component.disabled = context.isDisabled;
    }

    // Sync readonly state
    if (this.component.readonly !== context.isReadonly) {
      this.component.readonly = context.isReadonly;
    }
  }

  /**
   * Handle transition-specific effects
   *
   * @param {string} from - Previous state
   * @param {string} to - New state
   * @param {DatePickerContext} context - Current context
   */
  private handleTransitionEffects(
    from: string,
    to: string,
    context: DatePickerContext
  ): void {
    // Handle calendar opening
    if (
      to === DatePickerState.CALENDAR_OPEN &&
      from !== DatePickerState.CALENDAR_OPEN
    ) {
      if (this.config.onCalendarOpen) {
        this.config.onCalendarOpen();
      }
      // Open the calendar if available
      const calendar = (this.component as any).calendar;
      if (calendar && !calendar.isOpen) {
        calendar.open();
      }
    }

    // Handle calendar closing
    if (
      from === DatePickerState.CALENDAR_OPEN &&
      to !== DatePickerState.CALENDAR_OPEN
    ) {
      if (this.config.onCalendarClose) {
        this.config.onCalendarClose();
      }
      // Close calendar if available
      const calendar = (this.component as any).calendar;
      if (calendar && calendar.isOpen) {
        calendar.close();
      }
    }

    // Handle date selection
    if (to === DatePickerState.DATE_SELECTED) {
      if (this.config.onDateSelect) {
        this.config.onDateSelect(context);
      }
    }
  }

  /**
   * Handle calendar date selection
   * Call this from the calendar's onChange callback
   *
   * @param {Date[]} selectedDates - Selected dates from calendar
   */
  public handleCalendarChange(selectedDates: Date[]): void {
    const context = this.getContext();

    if (context.mode === 'single' && selectedDates.length > 0) {
      const date = dateToPlainDate(selectedDates[0]);
      this.send(DatePickerEvent.DATE_SELECT, {
        date,
      } as DateSelectPayload);
    } else if (context.mode === 'range') {
      if (selectedDates.length === 1) {
        const date = dateToPlainDate(selectedDates[0]);
        this.send(DatePickerEvent.RANGE_START_SELECT, {
          date,
        } as DateSelectPayload);
      } else if (selectedDates.length === 2) {
        const date = dateToPlainDate(selectedDates[1]);
        this.send(DatePickerEvent.RANGE_END_SELECT, {
          date,
        } as DateSelectPayload);
      }
    }
  }

  /**
   * Handle calendar open event
   */
  public handleCalendarOpen(): void {
    const currentState = this.getState();
    if (currentState !== DatePickerState.CALENDAR_OPEN) {
      this.send(DatePickerEvent.CALENDAR_OPEN);
    }
  }

  /**
   * Handle calendar close event
   */
  public handleCalendarClose(): void {
    const currentState = this.getState();
    if (currentState === DatePickerState.CALENDAR_OPEN) {
      this.send(DatePickerEvent.CALENDAR_CLOSE);
    }
  }

  /**
   * Handle input focus
   *
   * @param {('from' | 'to')} inputType - Type of input ('from' or 'to')
   */
  public handleInputFocus(inputType: 'from' | 'to'): void {
    this.send(DatePickerEvent.INPUT_FOCUS, { inputType });
  }

  /**
   * Handle input blur
   */
  public handleInputBlur(): void {
    this.send(DatePickerEvent.INPUT_BLUR);
  }

  /**
   * Handle outside click
   */
  public handleOutsideClick(): void {
    this.send(DatePickerEvent.OUTSIDE_CLICK);
  }

  /**
   * Handle keyboard events
   *
   * @param {string} key - Key pressed
   * @param {boolean} shiftKey - Whether shift key was pressed
   */
  public handleKeyboard(key: string, shiftKey = false): void {
    switch (key) {
      case 'Escape':
        this.send(DatePickerEvent.ESCAPE_KEY);
        break;
      case 'Tab':
        if (shiftKey) {
          this.send(DatePickerEvent.SHIFT_TAB_KEY);
        } else {
          this.send(DatePickerEvent.TAB_KEY);
        }
        break;
      case 'Enter':
        this.send(DatePickerEvent.ENTER_KEY);
        break;
      default:
        break;
    }
  }

  /**
   * Reset the state machine
   *
   * @param {Partial<DatePickerContext>} initialContext - Optional new initial context
   */
  public reset(initialContext?: Partial<DatePickerContext>): void {
    this.machine.reset(initialContext);
  }

  /**
   * Cleanup and unsubscribe
   */
  public destroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
