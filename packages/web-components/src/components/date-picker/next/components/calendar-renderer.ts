/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import type { PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../../../globals/settings';
import { carbonElement as customElement } from '../../../../globals/decorators/carbon-element';
import ChevronLeft16 from '@carbon/icons/es/chevron--left/16.js';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16.js';
import { iconLoader } from '../../../../globals/internal/icon-loader';
import {
  generateCalendarGrid,
  getFullDateLabel,
  getMonthYearLabel,
  getWeekdayLabels,
} from '@carbon/utilities/date-picker';
import styles from './date-picker.scss?lit';

/**
 * Calendar renderer for date picker.
 * Replaces Flatpickr's calendar UI with a lightweight, framework-agnostic implementation.
 *
 * @element cds-date-picker-v2-calendar
 * @fires cds-date-picker-v2-calendar-date-select - Fired when a date is selected
 * @fires cds-date-picker-v2-calendar-month-change - Fired when the month changes
 */
@customElement(`${prefix}-date-picker-v2-calendar`)
class CDSDatePickerCalendar extends LitElement {
  /**
   * The currently displayed month (Temporal.PlainYearMonth)
   */
  @state()
  private _currentMonth: Temporal.PlainYearMonth =
    Temporal.Now.plainDateISO().toPlainYearMonth();

  /**
   * The selected date(s)
   */
  @property({ type: Array })
  selectedDates: Temporal.PlainDate[] = [];

  /**
   * The view date from the state machine (used to sync calendar month)
   */
  @property({ type: Object })
  viewDate?: Temporal.PlainDate;

  /**
   * The focused date for keyboard navigation
   */
  @property({ type: Object })
  focusedDate?: Temporal.PlainDate | null;

  /**
   * The currently hovered date (for range preview)
   */
  @state()
  private _hoveredDate?: Temporal.PlainDate;

  /**
   * The minimum selectable date
   */
  @property({ type: Object })
  minDate?: Temporal.PlainDate;

  /**
   * The maximum selectable date
   */
  @property({ type: Object })
  maxDate?: Temporal.PlainDate;

  /**
   * Whether range selection is enabled
   */
  @property({ type: Boolean })
  rangeMode = false;

  /**
   * The date format for display
   */
  @property({ type: String })
  dateFormat = 'm/d/Y';

  /**
   * Locale for date formatting
   */
  @property({ type: String })
  locale = 'en-US';

  /**
   * Navigate to previous month
   */
  private _handlePrevMonth() {
    this._currentMonth = this._currentMonth.subtract({ months: 1 });
    this._dispatchMonthChange();
  }

  /**
   * Navigate to next month
   */
  private _handleNextMonth() {
    this._currentMonth = this._currentMonth.add({ months: 1 });
    this._dispatchMonthChange();
  }

  /**
   * Handle date selection
   * @param {Temporal.PlainDate} date - The date to select
   */
  private _handleDateSelect(date: Temporal.PlainDate) {
    if (this._isDateDisabled(date)) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent(`${prefix}-date-picker-v2-calendar-date-select`, {
        bubbles: true,
        composed: true,
        detail: { date },
      })
    );
  }

  /**
   * Dispatch month change event
   */
  private _dispatchMonthChange() {
    this.dispatchEvent(
      new CustomEvent(`${prefix}-date-picker-v2-calendar-month-change`, {
        bubbles: true,
        composed: true,
        detail: { month: this._currentMonth },
      })
    );
  }

  /**
   * Check if a date is disabled
   * @param {Temporal.PlainDate} date - The date to check
   */
  private _isDateDisabled(date: Temporal.PlainDate): boolean {
    if (this.minDate && Temporal.PlainDate.compare(date, this.minDate) < 0) {
      return true;
    }
    if (this.maxDate && Temporal.PlainDate.compare(date, this.maxDate) > 0) {
      return true;
    }
    return false;
  }

  /**
   * Check if previous month navigation should be disabled
   */
  private _isPrevMonthDisabled(): boolean {
    if (!this.minDate) {
      return false;
    }
    // Disable if going to previous month would be before minDate's month
    const prevMonth = this._currentMonth.subtract({ months: 1 });
    const prevMonthLastDay = prevMonth.toPlainDate({
      day: prevMonth.daysInMonth,
    });
    return Temporal.PlainDate.compare(prevMonthLastDay, this.minDate) < 0;
  }

  /**
   * Check if next month navigation should be disabled
   */
  private _isNextMonthDisabled(): boolean {
    if (!this.maxDate) {
      return false;
    }
    // Disable if going to next month would be after maxDate's month
    const nextMonth = this._currentMonth.add({ months: 1 });
    const nextMonthFirstDay = nextMonth.toPlainDate({ day: 1 });
    return Temporal.PlainDate.compare(nextMonthFirstDay, this.maxDate) > 0;
  }

  /**
   * Check if a date is selected
   * @param {Temporal.PlainDate} date - The date to check
   */
  private _isDateSelected(date: Temporal.PlainDate): boolean {
    return this.selectedDates.some((selected) => {
      if (!selected || typeof selected !== 'object' || !('year' in selected)) {
        return false;
      }
      return Temporal.PlainDate.compare(selected, date) === 0;
    });
  }

  /**
   * Check if a date is in range (for range mode)
   * @param {Temporal.PlainDate} date - The date to check
   */
  private _isDateInRange(date: Temporal.PlainDate): boolean {
    if (!this.rangeMode) {
      return false;
    }

    // Case 1: Both dates are selected (final range)
    if (this.selectedDates.length === 2) {
      const [start, end] = this.selectedDates.sort((a, b) =>
        Temporal.PlainDate.compare(a, b)
      );

      return (
        Temporal.PlainDate.compare(date, start) >= 0 &&
        Temporal.PlainDate.compare(date, end) <= 0
      );
    }

    // Case 2: One date selected, show preview range with hovered or focused date
    const previewDate = this._hoveredDate || this.focusedDate;
    if (this.selectedDates.length === 1 && previewDate) {
      // Don't show range preview if the preview date is disabled
      const isPreviewDisabled =
        (this.minDate &&
          Temporal.PlainDate.compare(previewDate, this.minDate) < 0) ||
        (this.maxDate &&
          Temporal.PlainDate.compare(previewDate, this.maxDate) > 0);

      if (isPreviewDisabled) {
        return false;
      }

      const start = this.selectedDates[0];
      const end = previewDate;

      // Sort to handle both forward and backward selection
      const [rangeStart, rangeEnd] = [start, end].sort((a, b) =>
        Temporal.PlainDate.compare(a, b)
      );

      return (
        Temporal.PlainDate.compare(date, rangeStart) >= 0 &&
        Temporal.PlainDate.compare(date, rangeEnd) <= 0
      );
    }

    return false;
  }

  /**
   * Check if a date is focused (for keyboard navigation)
   * @param {Temporal.PlainDate} date - The date to check
   */
  private _isDateFocused(date: Temporal.PlainDate): boolean {
    if (!this.focusedDate) {
      return false;
    }
    return Temporal.PlainDate.compare(date, this.focusedDate) === 0;
  }

  /**
   * Handle mouse enter on a date
   * @param {Temporal.PlainDate} date - The date being hovered
   */
  private _handleDateMouseEnter(date: Temporal.PlainDate) {
    // Only track hover in range mode when selecting end date
    if (this.rangeMode && this.selectedDates.length === 1) {
      this._hoveredDate = date;
    }
  }

  /**
   * Handle mouse leave on a date
   */
  private _handleDateMouseLeave() {
    // Clear hovered date
    this._hoveredDate = undefined;
  }

  /**
   * Render the calendar header with month/year and navigation
   */
  private _renderHeader() {
    const monthName = getMonthYearLabel(
      this._currentMonth.toPlainDate({ day: 1 }),
      this.locale
    );

    const isPrevDisabled = this._isPrevMonthDisabled();
    const isNextDisabled = this._isNextMonthDisabled();

    return html`
      <div class="${prefix}--date-picker__month">
        <button
          type="button"
          class="${prefix}--date-picker__month-nav ${prefix}--date-picker__month-nav--prev"
          tabindex="-1"
          ?disabled="${isPrevDisabled}"
          @click="${this._handlePrevMonth}"
          aria-label="Previous month">
          ${iconLoader(ChevronLeft16)}
        </button>
        <div class="${prefix}--date-picker__current-month">
          <span class="cur-month">${monthName}</span>
        </div>
        <button
          type="button"
          class="${prefix}--date-picker__month-nav ${prefix}--date-picker__month-nav--next"
          tabindex="-1"
          ?disabled="${isNextDisabled}"
          @click="${this._handleNextMonth}"
          aria-label="Next month">
          ${iconLoader(ChevronRight16)}
        </button>
      </div>
    `;
  }

  /**
   * Render the weekday headers
   */
  private _renderWeekdays() {
    const weekdays = getWeekdayLabels(this.locale);

    return html`
      <div class="${prefix}--date-picker__weekdays">
        ${weekdays.map(
          (day) => html`
            <span class="${prefix}--date-picker__weekday">${day}</span>
          `
        )}
      </div>
    `;
  }

  /**
   * Render the calendar days grid
   */
  private _renderDays() {
    const currentMonthValue = this._currentMonth.month;

    const days = generateCalendarGrid(
      this._currentMonth.toPlainDate({ day: 1 }),
      this.minDate ?? null,
      this.maxDate ?? null
    ).flat();

    return html`
      <div class="${prefix}--date-picker__days" role="grid">
        ${days.map(({ date, isCurrentMonth, isDisabled, isToday }) => {
          const isSelected = this._isDateSelected(date);
          const isInRange = this._isDateInRange(date);
          const isFocused = this._isDateFocused(date);

          const dayClasses = classMap({
            [`${prefix}--date-picker__day`]: true,
            prevMonthDay: !isCurrentMonth && date.month < currentMonthValue,
            nextMonthDay: !isCurrentMonth && date.month > currentMonthValue,
            disabled: isDisabled,
            selected: isSelected,
            inRange: isInRange,
            today: isToday && !isSelected,
            'no-border': isToday && isSelected,
            focused: isFocused,
          });

          return html`
            <button
              type="button"
              class="${dayClasses}"
              tabindex="-1"
              ?disabled="${isDisabled}"
              @click="${() => this._handleDateSelect(date)}"
              @mouseenter="${() => this._handleDateMouseEnter(date)}"
              @mouseleave="${() => this._handleDateMouseLeave()}"
              aria-label="${getFullDateLabel(date, this.locale)}"
              aria-current="${ifDefined(isToday ? 'date' : undefined)}">
              ${date.day}
            </button>
          `;
        })}
      </div>
    `;
  }

  /**
   * Lifecycle method called when properties change
   * @param {PropertyValues} changedProperties - Changed properties
   */
  updated(changedProperties: PropertyValues) {
    // Sync calendar month with viewDate from state machine
    if (changedProperties.has('viewDate') && this.viewDate) {
      // Create PlainYearMonth from PlainDate
      this._currentMonth = Temporal.PlainYearMonth.from({
        year: this.viewDate.year,
        month: this.viewDate.month,
      });
    }
  }

  /**
   * Renders the calendar component
   */
  render() {
    return html`
      <div class="${prefix}--date-picker__calendar" tabindex="0">
        ${this._renderHeader()} ${this._renderWeekdays()} ${this._renderDays()}
      </div>
    `;
  }

  static styles = styles;
}

export default CDSDatePickerCalendar;
