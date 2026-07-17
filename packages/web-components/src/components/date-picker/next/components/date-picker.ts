/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */
import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../../../globals/settings';
import FormMixin from '../../../../globals/mixins/form';
import HostListenerMixin from '../../../../globals/mixins/host-listener';
import HostListener from '../../../../globals/decorators/host-listener';
import CDSDatePickerInput from './date-picker-input';
import { WebComponentAdapter } from '../adapters/web-component-adapter.js';
import type { StateTransition } from '@carbon/utilities/date-picker';
import {
  DatePickerState,
  DatePickerEvent,
} from '@carbon/utilities/date-picker';
import {
  parseDateToPlainDate,
  parseISOToPlainDate,
  formatPlainDate,
  mapKeyboardToStateMachineEvent,
  ClickOutsideHandler,
} from '@carbon/utilities/date-picker';
import styles from './date-picker.scss?lit';
import { carbonElement as customElement } from '../../../../globals/decorators/carbon-element';

/**
 * Date picker modes.
 */
enum DATE_PICKER_MODE {
  /**
   * Simple mode, without calendar dropdown.
   */
  SIMPLE = 'simple',

  /**
   * Single date mode.
   */
  SINGLE = 'single',

  /**
   * Range mode.
   */
  RANGE = 'range',
}

/**
 * Date picker.
 *
 * @element cds-date-picker
 * @fires cds-date-picker-changed - The custom event fired when the date selection changes.
 * @fires cds-date-picker-error - The custom event fired when an error occurs.
 */
@customElement(`${prefix}-date-picker`)
class CDSDatePicker extends HostListenerMixin(FormMixin(LitElement)) {
  /**
   * The slotted `<cds-date-input kind="from">`.
   */
  private _dateInteractNode: CDSDatePickerInput | null = null;

  /**
   * The internal placeholder for the `value` property.
   */
  private _value!: string;

  /**
   * The adapter for Web Component integration.
   */
  private _adapter: WebComponentAdapter | null = null;

  /**
   * Click outside handler for closing calendar
   */
  private _clickOutsideHandler: ClickOutsideHandler | null = null;

  /**
   * Pending input target for post-render focus restoration
   */
  private _pendingRestoreFocusTo: 'from' | 'to' | null = null;

  /**
   * Timestamp of when calendar was last closed via Tab key
   */
  private _lastTabCloseTime = 0;

  /**
   * True while programmatic focus restoration is in progress after date
   * selection. Prevents the INPUT_FOCUS handler from auto-reopening the calendar.
   */
  private _restoringFocus = false;

  /**
   * @returns The effective date picker mode, determined by the child `<cds-date-picker-input>`.
   */
  private get _mode() {
    const { selectorInputTo } = this.constructor as typeof CDSDatePicker;
    if (this.querySelector(selectorInputTo)) {
      return DATE_PICKER_MODE.RANGE;
    }
    if (this.querySelector(`${prefix}-date-picker-input[kind="single"]`)) {
      return DATE_PICKER_MODE.SINGLE;
    }
    return DATE_PICKER_MODE.SIMPLE;
  }

  /**
   * Handles `${prefix}-date-picker-changed` event on this element.
   *
   * @param {CustomEvent} root0 - The event object
   * @param {object} root0.detail - The event detail
   */
  @HostListener('eventChange')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: The decorator refers to this method, but TS thinks this method is not referred to
  private _handleChange = ({ detail }: CustomEvent) => {
    const { selectedDates } = detail;
    if (selectedDates && Array.isArray(selectedDates)) {
      this._value = selectedDates
        .filter((date) => date != null) // Filter out null/undefined values
        .map((date) => {
          if (typeof date === 'string') {
            return date;
          }
          // Handle Temporal.PlainDate
          return date.toString();
        })
        .join('/');
    }
  };

  /**
   * Handles calendar icon click event from date-picker-input
   */
  @HostListener('eventIconClick')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: The decorator refers to this method, but TS thinks this method is not referred to
  private _handleIconClick = () => {
    if (this._adapter && !this.disabled && !this.readonly) {
      this._adapter.send(DatePickerEvent.CALENDAR_ICON_CLICK);
    }
  };

  /**
   * Handles input focus event from date-picker-input
   *
   * @param {CustomEvent} event - The focus event
   */
  @HostListener('eventInputFocus')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: The decorator refers to this method, but TS thinks this method is not referred to
  private _handleInputFocus = (event: CustomEvent) => {
    if (this._adapter && !this.disabled && !this.readonly) {
      const { inputType } = event.detail || {};
      this._adapter.send(DatePickerEvent.INPUT_FOCUS, { inputType });

      // Don't auto-open calendar if focus was restored programmatically after
      // date selection, or if it was JUST closed via Tab key (within 100ms).
      const timeSinceTabClose = Date.now() - this._lastTabCloseTime;
      if (!this._restoringFocus && timeSinceTabClose >= 100) {
        this._adapter.send(DatePickerEvent.CALENDAR_OPEN);
      }
    }
  };

  /**
   * Handles input click event from date-picker-input.
   * When the input already has focus, clicking it does not fire a new focus
   * event.  This handler ensures the calendar reopens on click even when focus
   * is already on the input.
   *
   * @param {CustomEvent} event - The click event
   */
  @HostListener('eventInputClick')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: The decorator refers to this method, but TS thinks this method is not referred to
  private _handleInputClick = (event: CustomEvent) => {
    if (this._adapter && !this.disabled && !this.readonly && !this.open) {
      const { inputType } = event.detail || {};
      this._adapter.send(DatePickerEvent.INPUT_FOCUS, { inputType });
      this._adapter.send(DatePickerEvent.CALENDAR_OPEN);
    }
  };

  /**
   * Handles input blur event from date-picker-input
   *
   * @param {CustomEvent} event - The blur event
   */
  @HostListener('eventInputBlur')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: The decorator refers to this method, but TS thinks this method is not referred to
  private _handleInputBlur = (event: CustomEvent) => {
    if (this._adapter) {
      const { inputType } = event.detail || {};
      this._adapter.send(DatePickerEvent.INPUT_BLUR, { inputType });
    }
  };

  /**
   * Handles form data event
   *
   * @param {FormDataEvent} event - The form data event
   */
  _handleFormdata(event: FormDataEvent) {
    const { formData } = event;
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * Handles `slotchange` event in the `<slot>`.
   *
   * @param {Event} root0 - The event object
   * @param {EventTarget} root0.target - The event target
   */
  private _handleSlotChange({ target }: Event) {
    const { _dateInteractNode: oldDateInteractNode } = this;
    const dateInteractNode = (target as HTMLSlotElement)
      .assignedNodes()
      .find(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as HTMLElement).matches(
            (this.constructor as typeof CDSDatePicker).selectorInputFrom
          )
      );
    if (oldDateInteractNode !== dateInteractNode) {
      this._dateInteractNode =
        dateInteractNode as unknown as CDSDatePickerInput;
      this._initializeDatePicker();
    }
  }

  /**
   * Handles state machine state changes
   *
   * @param {StateTransition} transition - The state transition
   * @param {DatePickerState} transition.from - Previous state
   * @param {DatePickerState} transition.to - New state
   * @param {DatePickerContext} transition.context - Current context
   */
  private _handleStateChange = (transition: StateTransition) => {
    const { to, from, context } = transition;
    const newState = to as DatePickerState;

    // Update open property based on state
    if (newState === DatePickerState.CALENDAR_OPEN) {
      this.open = true;

      // If we're staying in CALENDAR_OPEN state (keyboard navigation),
      // trigger a re-render to update the calendar with new focusedDate/viewDate
      if (from === DatePickerState.CALENDAR_OPEN) {
        this.requestUpdate();
      }
    } else if (newState === DatePickerState.SELECTING_END) {
      // Keep calendar open while selecting end date in range mode
      this.open = true;

      // If we're staying in SELECTING_END state (keyboard navigation),
      // trigger a re-render to update the calendar with new focusedDate/viewDate
      if (from === DatePickerState.SELECTING_END) {
        this.requestUpdate();
      }
    } else if (newState === DatePickerState.IDLE) {
      this.open = false;
    } else if (newState === DatePickerState.FOCUSED) {
      // Only close calendar if not coming from CALENDAR_OPEN (Enter key)
      // When coming from CALENDAR_OPEN, the action sets context.isOpen
      if (
        from !== DatePickerState.CALENDAR_OPEN &&
        from !== DatePickerState.SELECTING_END
      ) {
        this.open = false;
      } else {
        // Use the isOpen value from context (set by ENTER_KEY action)
        this.open = context.isOpen ?? false;
      }
    } else if (newState === DatePickerState.DATE_SELECTED) {
      // Update open property based on context
      this.open = context.isOpen ?? false;
      // Trigger re-render to update the calendar visibility
      this.requestUpdate();
    }

    // Dispatch change event and update input when dates are selected
    // This handles DATE_SELECTED state, FOCUSED state (from ENTER_KEY), and SELECTING_END state (after start date selected)
    const shouldUpdateInput =
      newState === DatePickerState.DATE_SELECTED ||
      newState === DatePickerState.SELECTING_END ||
      (newState === DatePickerState.FOCUSED &&
        from === DatePickerState.CALENDAR_OPEN &&
        context.startDate);

    if (shouldUpdateInput) {
      // Only include non-null dates in selectedDates array
      const selectedDates = context.endDate
        ? [context.startDate, context.endDate].filter((date) => date != null)
        : context.startDate
          ? [context.startDate]
          : [];

      // Update input field value with formatted date using shared utility

      // For range mode, update the correct input based on state
      if (this._mode === DATE_PICKER_MODE.RANGE) {
        const { selectorInputFrom, selectorInputTo } = this
          .constructor as typeof CDSDatePicker;
        const inputFrom = this.querySelector(
          selectorInputFrom
        ) as CDSDatePickerInput;
        const inputTo = this.querySelector(
          selectorInputTo
        ) as CDSDatePickerInput;

        // If we're in DATE_SELECTED state with both dates, update both inputs
        if (
          newState === DatePickerState.DATE_SELECTED &&
          context.startDate &&
          context.endDate
        ) {
          if (inputFrom) {
            inputFrom.value = formatPlainDate(
              context.startDate,
              context.dateFormat
            );
          }
          if (inputTo) {
            inputTo.value = formatPlainDate(
              context.endDate,
              context.dateFormat
            );
          }
        } else if (
          context.lastFocusedInput === 'to' &&
          inputTo &&
          context.endDate
        ) {
          // Otherwise, update based on lastFocusedInput
          inputTo.value = formatPlainDate(context.endDate, context.dateFormat);
        } else if (inputFrom && context.startDate) {
          inputFrom.value = formatPlainDate(
            context.startDate,
            context.dateFormat
          );
        }
      } else {
        // For single mode, update the single input
        if (this._dateInteractNode && context.startDate) {
          this._dateInteractNode.value = formatPlainDate(
            context.startDate,
            context.dateFormat
          );
        }
      }

      (this as unknown as HTMLElement).dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSDatePicker).eventChange,
          {
            bubbles: true,
            composed: true,
            detail: {
              selectedDates,
              value: this._value,
            },
          }
        )
      );
    }

    if (context.shouldRestoreFocus && context.restoreFocusTo) {
      this._pendingRestoreFocusTo = context.restoreFocusTo;
      this.updateComplete.then(() => {
        const targetSelector =
          this._pendingRestoreFocusTo === 'to'
            ? (this.constructor as typeof CDSDatePicker).selectorInputTo
            : (this.constructor as typeof CDSDatePicker).selectorInputFrom;

        const targetInput = this.querySelector(
          targetSelector
        ) as CDSDatePickerInput | null;

        // Guard against the INPUT_FOCUS handler auto-reopening the calendar
        // when focus is restored programmatically after date selection.
        this._restoringFocus = true;
        targetInput?.input?.focus();
        this._restoringFocus = false;

        this._adapter?.updateContext({
          shouldRestoreFocus: false,
          restoreFocusTo: null,
        });

        this._pendingRestoreFocusTo = null;
      });
    }
  };

  /**
   * Handles calendar date selection
   *
   * @param {CustomEvent} event - The date select event
   */
  private _handleCalendarDateSelect = (event: CustomEvent) => {
    const { date } = event.detail;
    if (!this._adapter || !date) {
      return;
    }

    const { _mode: mode } = this;
    const context = this._adapter.getContext();

    if (mode === DATE_PICKER_MODE.RANGE) {
      // Range mode: select start or end date
      if (!context.startDate || context.endDate) {
        // Select start date (or restart selection)
        this._adapter.send(DatePickerEvent.RANGE_START_SELECT, { date });
      } else {
        // Select end date
        this._adapter.send(DatePickerEvent.RANGE_END_SELECT, { date });
      }
    } else {
      // Single mode: select date
      this._adapter.send(DatePickerEvent.DATE_SELECT, { date });
    }
  };

  /**
   * Handles calendar month change
   *
   * @param {CustomEvent} event - The month change event
   */
  private _handleCalendarMonthChange = (event: CustomEvent) => {
    const { month } = event.detail;
    if (!this._adapter || !month) {
      return;
    }

    // Update viewDate in context
    const firstDayOfMonth = month.toPlainDate({ day: 1 });
    this._adapter.updateContext({ viewDate: firstDayOfMonth });
  };

  /**
   * Show the calendar popover using Popover API
   */
  private _showCalendarPopover() {
    const popover = this.shadowRoot?.querySelector(
      `#${prefix}-date-picker-calendar-popover`
    ) as HTMLElement & { showPopover?: () => void };
    if (popover && typeof popover.showPopover === 'function') {
      try {
        popover.showPopover();
      } catch (e) {
        // Popover might already be showing
        console.warn('Could not show popover:', e);
      }
    }
  }

  /**
   * Hide the calendar popover using Popover API
   */
  private _hideCalendarPopover() {
    const popover = this.shadowRoot?.querySelector(
      `#${prefix}-date-picker-calendar-popover`
    ) as HTMLElement & { hidePopover?: () => void };
    if (popover && typeof popover.hidePopover === 'function') {
      try {
        popover.hidePopover();
      } catch (e) {
        // Popover might already be hidden
        console.warn('Could not hide popover:', e);
      }
    }
  }

  /**
   * Initializes the date picker with a state machine.
   */
  private _initializeDatePicker() {
    this._releaseDatePicker();
    const { _dateInteractNode: dateInteractNode, _mode: mode } = this;

    // Don't instantiate in simple mode
    if (!dateInteractNode || !dateInteractNode.input || mode === 'simple') {
      return;
    }

    // Create adapter with configuration
    this._adapter = new WebComponentAdapter({
      component: this,
      initialContext: {
        mode: mode === DATE_PICKER_MODE.RANGE ? 'range' : 'single',
        dateFormat: this.dateFormat || 'm/d/Y',
        allowInput: this.allowInput,
        closeOnSelect: this.closeOnSelect,
        value: this.value || '',
        startDate: null,
        endDate: null,
        isOpen: false,
        isFocused: false,
        isDisabled: this.disabled,
        isReadonly: this.readonly,
        isInvalid: false,
        lastFocusedInput: null,
        minDate: parseDateToPlainDate(this.minDate),
        maxDate: parseDateToPlainDate(this.maxDate),
      },
      onStateChange: this._handleStateChange,
    });

    // Set initial value if provided
    if (this.value) {
      const dates = this.value.split('/').filter(Boolean);
      if (dates.length > 0) {
        this._adapter.send(
          mode === DATE_PICKER_MODE.RANGE
            ? DatePickerEvent.RANGE_START_SELECT
            : DatePickerEvent.DATE_SELECT,
          { date: dates[0] }
        );

        if (mode === DATE_PICKER_MODE.RANGE && dates.length > 1) {
          this._adapter.send(DatePickerEvent.RANGE_END_SELECT, {
            date: dates[1],
          });
        }
      }
    }
  }

  /**
   * Releases the date picker state machine.
   */
  private _releaseDatePicker() {
    this._pendingRestoreFocusTo = null;

    if (this._adapter) {
      this._adapter.destroy();
      this._adapter = null;
    }
  }

  /**
   * Allows the user to enter a date directly into the input field
   */
  @property({ type: Boolean, reflect: true, attribute: 'allow-input' })
  allowInput = true;

  /**
   * Controls whether the calendar dropdown closes upon selection.
   */
  @property({ type: Boolean, reflect: true, attribute: 'close-on-select' })
  closeOnSelect = true;

  /**
   * The date format.
   */
  @property({ attribute: 'date-format' })
  dateFormat!: string;

  /**
   * Controls the disabled state of the input
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The date range that a user can pick in calendar dropdown.
   */
  @property({ attribute: 'enabled-range' })
  enabledRange!: string;

  /**
   * The maximum date that a user can start picking from.
   */
  @property({ attribute: 'max-date' })
  maxDate!: string;

  /**
   * The minimum date that a user can start picking from.
   */
  @property({ attribute: 'min-date' })
  minDate!: string;

  /**
   * Name for the input in the `FormData`
   */
  @property()
  name = '';

  /**
   * `true` if the date picker should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Specify if the component should be read-only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * The date(s) in ISO8601 format (date portion only), for range mode, '/' is used for separate start/end dates.
   */
  @property()
  get value() {
    return this._value;
  }

  /**
   * Sets the value
   *
   * @param {string} value - The new value
   */
  set value(value: string) {
    const { _value: oldValue } = this;
    this._value = value;
    this.requestUpdate('value', oldValue);
  }

  /**
   * Handle clicks outside the date picker to close the calendar
   *
   * @param {MouseEvent} event - The click event
   */
  // Click outside handler removed - now using shared ClickOutsideHandler utility

  /**
   * Handle keyboard events for calendar navigation
   *
   * @param {KeyboardEvent} event - The keyboard event
   */
  private _handleKeyDown = (event: KeyboardEvent) => {
    if (!this._adapter) {
      return;
    }

    const { key } = event;

    // Handle Tab key
    if (key === 'Tab') {
      const composedPath = event.composedPath();
      const target = composedPath[0] as HTMLElement;

      // Get input elements
      const { selectorInputFrom, selectorInputTo } = this
        .constructor as typeof CDSDatePicker;
      const inputFrom = this.querySelector(
        selectorInputFrom
      ) as CDSDatePickerInput;
      const inputTo = this.querySelector(selectorInputTo) as CDSDatePickerInput;

      // Check if focus is on input fields
      const isOnFirstInput = inputFrom && composedPath.includes(inputFrom);
      const isOnSecondInput = inputTo && composedPath.includes(inputTo);

      // Check if the target is the calendar element or within it
      const calendar = this.shadowRoot?.querySelector(
        'cds-date-picker-calendar'
      ) as HTMLElement;
      const isFocusInCalendar =
        target === calendar ||
        target.closest?.('cds-date-picker-calendar') !== null ||
        composedPath.includes(calendar);

      // Case 0: Tab FROM input while closed -> reopen calendar and keep focus on input
      if (
        !this.open &&
        (isOnFirstInput || isOnSecondInput) &&
        !event.shiftKey
      ) {
        event.preventDefault();
        event.stopPropagation();
        this._lastTabCloseTime = 0;
        this._adapter.send(DatePickerEvent.INPUT_FOCUS, {
          inputType: isOnSecondInput ? 'to' : 'from',
        });
        this._adapter.send(DatePickerEvent.CALENDAR_OPEN);
        this.requestUpdate();
        return;
      }

      // Case 1: Tab FROM first input -> Focus calendar (if open)
      if (this.open && isOnFirstInput && !event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        const calendarElement = this.shadowRoot?.querySelector(
          'cds-date-picker-calendar'
        );
        const calendarDiv = calendarElement?.shadowRoot?.querySelector(
          '.cds--date-picker__calendar'
        ) as HTMLElement;
        if (calendarDiv) {
          setTimeout(() => {
            calendarDiv.focus();
          }, 0);
        }
        return;
      }

      // Case 2: Tab FROM second input (range mode) -> Focus calendar (if open)
      if (
        this.open &&
        isOnSecondInput &&
        !event.shiftKey &&
        this._mode === DATE_PICKER_MODE.RANGE
      ) {
        event.preventDefault();
        event.stopPropagation(); // Prevent input from handling the event
        const calendarElement = this.shadowRoot?.querySelector(
          'cds-date-picker-calendar'
        );
        const calendarDiv = calendarElement?.shadowRoot?.querySelector(
          '.cds--date-picker__calendar'
        ) as HTMLElement;
        if (calendarDiv) {
          // Use setTimeout to ensure focus happens after event processing
          setTimeout(() => {
            calendarDiv.focus();
          }, 0);
        }
        return;
      }

      // Case 3: Shift+Tab FROM calendar -> Move to appropriate input
      if (this.open && isFocusInCalendar && event.shiftKey) {
        event.preventDefault();

        // In range mode, check which input was last focused
        if (this._mode === DATE_PICKER_MODE.RANGE) {
          const context = this._adapter?.getContext();
          const lastFocused = context?.lastFocusedInput;

          // If we were on the second input, go back to it
          if (lastFocused === 'to' && inputTo) {
            inputTo.input?.focus();
          } else if (inputFrom) {
            // Otherwise go to first input
            inputFrom.input?.focus();
          }
        } else {
          // Single mode: go to first input
          if (inputFrom) {
            inputFrom.input?.focus();
          }
        }
        return;
      }

      // Case 4: Tab FROM calendar -> Move to second input (range) or exit via sentinel
      if (this.open && isFocusInCalendar && !event.shiftKey) {
        // In range mode, move to the second input first
        if (this._mode === DATE_PICKER_MODE.RANGE) {
          const context = this._adapter?.getContext();
          const lastFocused = context?.lastFocusedInput;

          if (lastFocused === 'from' && inputTo) {
            event.preventDefault();
            inputTo.input?.focus();
            return;
          }
        }

        // Single mode (or range after second input): activate the exit sentinel
        // so the browser delivers Tab to it naturally, then the sentinel's focus
        // handler closes the calendar and removes itself from the tab order.
        // No preventDefault — the browser handles the Tab traversal.
        this._lastTabCloseTime = Date.now();
        this._adapter.send(DatePickerEvent.TAB_KEY);
        this._activateExitSentinel();
        return;
      }
    }

    // Only handle other keyboard events when calendar is open AND focus is in calendar
    if (!this.open) {
      return;
    }

    // Get the actual target from the composed path (handles shadow DOM)
    const composedPath = event.composedPath();
    const target = composedPath[0] as HTMLElement;
    const input = this.shadowRoot?.querySelector('input');

    // Only handle arrow keys, Page Up/Down, Home/End when focus is in calendar, not on input
    if (target === input) {
      return;
    }

    // Check if the target has the calendar class or is within an element with that class
    // The calendar div is inside the calendar renderer's shadow DOM
    const isFocusInCalendar =
      target.classList?.contains('cds--date-picker__calendar') ||
      target.closest?.('.cds--date-picker__calendar') !== null;

    if (!isFocusInCalendar) {
      return;
    }

    // Use shared keyboard mapper for navigation keys
    const context = this._adapter.getContext();
    const currentState = this._adapter.getState();

    const mappedEvent = mapKeyboardToStateMachineEvent({
      key,
      shiftKey: event.shiftKey,
      mode: this._mode === DATE_PICKER_MODE.RANGE ? 'range' : 'single',
      state: currentState,
      focusedDate: context.focusedDate,
    });

    if (mappedEvent) {
      if (mappedEvent.preventDefault) {
        event.preventDefault();
      }
      if (mappedEvent.eventType) {
        this._adapter.send(mappedEvent.eventType, mappedEvent.payload);
      }
      // Special handling for Escape key - also close the calendar
      if (key === 'Escape') {
        this.open = false;
      }
      return;
    }
  };

  /**
   * A ref to the exit sentinel element rendered at the bottom of the shadow root.
   * It sits just after the calendar container in DOM order.  Normally it has
   * tabindex="-1" so it is invisible to Tab.  When the user presses Tab from
   * inside the calendar, _activateExitSentinel() sets it to tabindex="0" so
   * the browser delivers the Tab keystroke to it naturally — no DOM scan needed.
   * The focus handler then closes the calendar and restores tabindex="-1".
   *
   * Uses a CSS class rather than an id to avoid any document-level id concerns
   * (shadow-DOM ids are already scoped, but a class is more conventional for
   * internal Lit @query targets and matches the cds-- naming pattern used
   * throughout this file).
   *
   * TODO (carbon monorepo migration): replace this hand-rolled sentinel with the
   * upstream Carbon wrapFocus utility, which implements the same start/end sentinel
   * pattern for focus trapping and exit.
   * Upstream location: packages/react/src/internal/wrapFocus.ts (wrapFocus /
   * wrapFocusWithoutSentinels exports).  Note that wrapFocus is designed to trap
   * focus inside a container (modal pattern) rather than release it; the exit-only
   * direction we need maps to the endTrapNode path in that utility.
   */
  @query(`.${prefix}--date-picker__exit-sentinel`)
  private _exitSentinelNode!: HTMLElement;

  /**
   * Temporarily make the exit sentinel tabbable so the browser's native Tab
   * handling delivers focus to it after the calendar.
   */
  private _activateExitSentinel() {
    if (this._exitSentinelNode) {
      this._exitSentinelNode.tabIndex = 0;
    }
  }

  /**
   * Handle focus arriving on the exit sentinel.
   * Close the calendar, then immediately remove the sentinel from the tab order
   * so that a subsequent Tab from outside the date picker skips it entirely.
   */
  private _handleExitSentinelFocus = () => {
    // Deactivate sentinel first so it is skipped on all future Tab presses.
    if (this._exitSentinelNode) {
      this._exitSentinelNode.tabIndex = -1;
    }
    // The TAB_KEY event was already sent in _handleKeyDown before the sentinel
    // was activated; the calendar will already be closing / closed.
    // Ensure the open flag is consistent.
    if (this.open) {
      this._adapter?.send(DatePickerEvent.TAB_KEY);
    }
  };

  /**
   * Lifecycle callback when element is connected
   */
  connectedCallback() {
    super.connectedCallback();
    this._initializeDatePicker();

    // Initialize click outside handler using shared utility
    this._clickOutsideHandler = new ClickOutsideHandler({
      isOpen: this.open,
      /**
       * Check if a node is contained within the date picker
       * @param {Node} node - The node to check
       * @returns {boolean} True if the node is within the date picker
       */
      containsNode: (node: Node) => {
        return (
          node === (this as unknown as Node) ||
          this.contains(node) ||
          (this.shadowRoot?.contains(node) ?? false)
        );
      },
      /**
       * Handle clicks outside the date picker
       */
      onOutsideClick: () => {
        if (this._adapter) {
          this._adapter.send(DatePickerEvent.OUTSIDE_CLICK);
        }
      },
      useCapture: true,
      attachDelay: 0,
    });

    this._clickOutsideHandler.attach();

    // Add keyboard event listener
    document.addEventListener('keydown', this._handleKeyDown, true);
  }

  /**
   * Lifecycle callback when element is disconnected
   */
  disconnectedCallback() {
    // Clean up click outside handler
    this._clickOutsideHandler?.detach();
    this._clickOutsideHandler = null;

    // Remove keyboard event listener
    document.removeEventListener('keydown', this._handleKeyDown, true);
    this._releaseDatePicker();
    super.disconnectedCallback();
  }

  /**
   * Lifecycle callback when properties change
   *
   * @param {Map<string, unknown>} changedProperties - Map of changed properties
   */
  updated(changedProperties: Map<string, unknown>) {
    // Update click outside handler when open state changes
    if (changedProperties.has('open')) {
      this._clickOutsideHandler?.updateConfig({ isOpen: this.open });
    }

    if (this._adapter) {
      if (
        changedProperties.has('minDate') ||
        changedProperties.has('maxDate')
      ) {
        // Update context
        this._adapter.updateContext({
          minDate: this.minDate ? Temporal.PlainDate.from(this.minDate) : null,
          maxDate: this.maxDate ? Temporal.PlainDate.from(this.maxDate) : null,
        });
      }

      if (changedProperties.has('open')) {
        if (this.open && !this.readonly) {
          this._adapter.send(DatePickerEvent.CALENDAR_OPEN);
          // Show popover using Popover API
          this._showCalendarPopover();
        } else if (!this.open) {
          this._adapter.send(DatePickerEvent.CALENDAR_CLOSE);
          // Hide popover using Popover API
          this._hideCalendarPopover();
        }
      }

      if (changedProperties.has('closeOnSelect')) {
        this._adapter.updateContext({ closeOnSelect: this.closeOnSelect });
      }

      if (
        changedProperties.has('disabled') ||
        changedProperties.has('readonly')
      ) {
        const { selectorInputFrom, selectorInputTo } = this
          .constructor as typeof CDSDatePicker;
        const inputFrom = this.querySelector(
          selectorInputFrom
        ) as CDSDatePickerInput;
        const inputTo = this.querySelector(
          selectorInputTo
        ) as CDSDatePickerInput;

        [inputFrom, inputTo].forEach((input) => {
          if (input) {
            input.disabled = this.disabled;
            input.readonly = this.readonly;
          }
        });

        this._adapter.updateContext({
          isDisabled: this.disabled,
          isReadonly: this.readonly,
        });
      }

      if (changedProperties.has('value') && this.value) {
        const dates = this.value.split('/').filter(Boolean);
        if (dates.length > 0) {
          // Convert ISO string to Temporal.PlainDate
          const startDate = parseISOToPlainDate(dates[0]);
          if (startDate) {
            this._adapter.send(
              this._mode === DATE_PICKER_MODE.RANGE
                ? DatePickerEvent.RANGE_START_SELECT
                : DatePickerEvent.DATE_SELECT,
              { date: startDate }
            );

            if (this._mode === DATE_PICKER_MODE.RANGE && dates.length > 1) {
              const endDate = parseISOToPlainDate(dates[1]);
              if (endDate) {
                this._adapter.send(DatePickerEvent.RANGE_END_SELECT, {
                  date: endDate,
                });
              }
            }
          }
        }
      }
    }
  }

  /**
   * Renders the component
   */
  render() {
    const { _handleSlotChange: handleSlotChange, _mode: mode, open } = this;
    const context = this._adapter?.getContext();
    const selectedDates = context?.endDate
      ? [context.startDate, context.endDate].filter(Boolean)
      : context?.startDate
        ? [context.startDate]
        : [];

    return html`
      <slot @slotchange="${handleSlotChange}"></slot>
      <div
        id="floating-menu-container"
        class="${prefix}--date-picker__calendar-container">
        ${mode !== DATE_PICKER_MODE.SIMPLE && open
          ? html`
              <cds-date-picker-calendar
                .rangeMode="${mode === DATE_PICKER_MODE.RANGE}"
                .dateFormat="${this.dateFormat || 'm/d/Y'}"
                .minDate="${this.minDate
                  ? Temporal.PlainDate.from(this.minDate)
                  : undefined}"
                .maxDate="${this.maxDate
                  ? Temporal.PlainDate.from(this.maxDate)
                  : undefined}"
                .selectedDates="${selectedDates}"
                .viewDate="${context?.viewDate || null}"
                .focusedDate="${context?.focusedDate || null}"
                @cds-date-picker-calendar-date-select="${this
                  ._handleCalendarDateSelect}"
                @cds-date-picker-calendar-month-change="${this
                  ._handleCalendarMonthChange}">
              </cds-date-picker-calendar>
            `
          : ''}
      </div>
      <!--
        Exit sentinel: sits just after the calendar container in shadow-DOM tab
        order.  Normally tabindex="-1" (invisible to Tab).  _activateExitSentinel()
        sets it to tabindex="0" when the user presses Tab from the calendar, so the
        browser delivers that Tab keystroke here naturally.  The focus handler then
        closes the calendar and restores tabindex="-1".
      -->
      <span
        class="${prefix}--date-picker__exit-sentinel"
        tabindex="-1"
        aria-hidden="true"
        @focus="${this._handleExitSentinelFocus}"></span>
    `;
  }

  /**
   * The CSS class for the calendar dropdown.
   */
  static get classCalendarContainer() {
    return `${prefix}--date-picker__calendar`;
  }

  /**
   * The CSS class for the month navigator.
   */
  static get classMonth() {
    return `${prefix}--date-picker__month`;
  }

  /**
   * The CSS class for the container of the weekdays.
   */
  static get classWeekdays() {
    return `${prefix}--date-picker__weekdays`;
  }

  /**
   * The CSS class for the container of the days.
   */
  static get classDays() {
    return `${prefix}--date-picker__days`;
  }

  /**
   * The CSS class applied to each weekdays.
   */
  static get classWeekday() {
    return `${prefix}--date-picker__weekday`;
  }

  /**
   * The CSS class applied to each days.
   */
  static get classDay() {
    return `${prefix}--date-picker__day`;
  }

  /**
   * The CSS class applied to the "today" highlight if there are any dates selected.
   */
  static classNoBorder = 'no-border';

  /**
   * The default date format.
   */
  static defaultDateFormat = 'm/d/Y';

  /**
   * A selector that will return the `<input>` to enter starting date.
   */
  static get selectorInputFrom() {
    return `${prefix}-date-picker-input,${prefix}-date-picker-input[kind="from"]`;
  }

  /**
   * A selector that will return the `<input>` to enter end date.
   */
  static get selectorInputTo() {
    return `${prefix}-date-picker-input[kind="to"]`;
  }

  /**
   * The name of the custom event when an error occurs.
   */
  static get eventError() {
    return `${prefix}-date-picker-error`;
  }

  /**
   * The name of the custom event fired when the date selection changes.
   */
  static get eventChange() {
    return `${prefix}-date-picker-changed`;
  }

  /**
   * The name of the custom event fired when the calendar icon is clicked.
   */
  static get eventIconClick() {
    return `${prefix}-date-picker-icon-click`;
  }

  /**
   * The name of the custom event fired when an input receives focus.
   */
  static get eventInputFocus() {
    return `${prefix}-date-picker-input-focus`;
  }

  /**
   * The name of the custom event fired when an input loses focus.
   */
  static get eventInputBlur() {
    return `${prefix}-date-picker-input-blur`;
  }

  /**
   * The name of the custom event fired when an input is clicked.
   */
  static get eventInputClick() {
    return `${prefix}-date-picker-input-click`;
  }

  static styles = styles;
}

export default CDSDatePicker;
