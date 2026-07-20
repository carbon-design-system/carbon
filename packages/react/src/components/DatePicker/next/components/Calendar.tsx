/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import type { DatePickerContext } from '@carbon/utilities/date-picker';
import { addDays, plainDateToDate } from '@carbon/utilities/date-picker';
import { usePrefix } from '../../../../internal/usePrefix';

/**
 * Calendar component props
 */
export interface CalendarProps {
  /**
   * State machine context
   */
  context: DatePickerContext;

  /**
   * Date selection handler
   */
  onDateSelect: (date: Temporal.PlainDate) => void;

  /**
   * Navigation handler
   */
  onNavigate: (eventType: string) => void;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Day cell in the calendar grid
 */
interface DayCell {
  date: Temporal.PlainDate;
  isCurrentMonth: boolean;
  isDisabled: boolean;
  isToday: boolean;
}

/**
 * Generate calendar grid for a given month
 *
 * @param {Temporal.PlainDate} viewDate - The date to generate calendar for
 * @param {Temporal.PlainDate | null} minDate - Minimum selectable date
 * @param {Temporal.PlainDate | null} maxDate - Maximum selectable date
 * @returns {DayCell[][]} 2D array of day cells (weeks x days)
 */
function generateCalendarGrid(
  viewDate: Temporal.PlainDate,
  minDate: Temporal.PlainDate | null,
  maxDate: Temporal.PlainDate | null
): DayCell[][] {
  const today = Temporal.Now.plainDateISO();
  const firstDayOfMonth = viewDate.with({ day: 1 });

  // Get the day of week for the first day (0 = Sunday)
  // Convert Temporal dayOfWeek (1=Monday) to JS (0=Sunday)
  const jsDate = plainDateToDate(firstDayOfMonth);
  const firstDayOfWeek = jsDate.getDay();

  // Calculate start date (may be from previous month)
  const startDate = addDays(firstDayOfMonth, -firstDayOfWeek);

  // Generate 6 weeks (42 days) to ensure consistent calendar height
  const weeks: DayCell[][] = [];
  let currentDate = startDate;

  for (let week = 0; week < 6; week++) {
    const days: DayCell[] = [];

    for (let day = 0; day < 7; day++) {
      const isCurrentMonth = currentDate.month === viewDate.month;
      const isToday = Temporal.PlainDate.compare(currentDate, today) === 0;

      // Check if date is disabled
      let isDisabled = false;
      if (minDate && Temporal.PlainDate.compare(currentDate, minDate) < 0) {
        isDisabled = true;
      }
      if (maxDate && Temporal.PlainDate.compare(currentDate, maxDate) > 0) {
        isDisabled = true;
      }

      days.push({
        date: currentDate,
        isCurrentMonth,
        isDisabled,
        isToday,
      });

      currentDate = addDays(currentDate, 1);
    }

    weeks.push(days);
  }

  return weeks;
}

/**
 * Calendar component
 * Renders a calendar grid for date selection
 */
export function Calendar({
  context,
  onDateSelect,
  onNavigate,
  className,
}: CalendarProps) {
  const prefix = usePrefix();
  const { viewDate, startDate, endDate, minDate, maxDate, focusedDate, mode } =
    context;

  // Generate calendar grid
  const calendarGrid = useMemo(() => {
    if (!viewDate) {
      return [];
    }
    return generateCalendarGrid(viewDate, minDate, maxDate);
  }, [viewDate, minDate, maxDate]);

  // Navigation handlers
  const handlePrevMonth = useCallback(() => {
    onNavigate('PREV_MONTH');
  }, [onNavigate]);

  const handleNextMonth = useCallback(() => {
    onNavigate('NEXT_MONTH');
  }, [onNavigate]);

  const handleDateClick = useCallback(
    (date: Temporal.PlainDate, isDisabled: boolean) => {
      if (!isDisabled) {
        onDateSelect(date);
      }
    },
    [onDateSelect]
  );

  // Check if a date is selected
  const isDateSelected = useCallback(
    (date: Temporal.PlainDate): boolean => {
      if (!startDate) {
        return false;
      }
      if (Temporal.PlainDate.compare(date, startDate) === 0) {
        return true;
      }
      if (endDate && Temporal.PlainDate.compare(date, endDate) === 0) {
        return true;
      }
      return false;
    },
    [startDate, endDate]
  );

  // Check if a date is in the selected range
  const isDateInRange = useCallback(
    (date: Temporal.PlainDate): boolean => {
      if (mode !== 'range' || !startDate) {
        return false;
      }

      // If endDate exists, use it for the range
      if (endDate) {
        return (
          Temporal.PlainDate.compare(date, startDate) > 0 &&
          Temporal.PlainDate.compare(date, endDate) < 0
        );
      }

      // If endDate doesn't exist but focusedDate does (user is selecting end date),
      // show the range between startDate and focusedDate
      if (focusedDate) {
        const earlierDate =
          Temporal.PlainDate.compare(startDate, focusedDate) < 0
            ? startDate
            : focusedDate;
        const laterDate =
          Temporal.PlainDate.compare(startDate, focusedDate) < 0
            ? focusedDate
            : startDate;

        return (
          Temporal.PlainDate.compare(date, earlierDate) > 0 &&
          Temporal.PlainDate.compare(date, laterDate) < 0
        );
      }

      return false;
    },
    [mode, startDate, endDate, focusedDate]
  );

  // Check if a date is focused
  const isDateFocused = useCallback(
    (date: Temporal.PlainDate): boolean => {
      if (!focusedDate) {
        return false;
      }
      return Temporal.PlainDate.compare(date, focusedDate) === 0;
    },
    [focusedDate]
  );

  if (!viewDate) {
    return null;
  }

  const calendarClasses = classNames(
    `${prefix}--date-picker__calendar`,
    className
  );

  // Format month and year for display
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthYear = `${monthNames[viewDate.month - 1]} ${viewDate.year}`;

  return (
    <div
      className={calendarClasses}
      role="grid"
      aria-label="Calendar"
      tabIndex={0}>
      {/* Month Header */}
      <div className={`${prefix}--date-picker__month`}>
        <button
          type="button"
          className={`${prefix}--date-picker__month-nav`}
          onClick={handlePrevMonth}
          aria-label="Previous month">
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path
              d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"
              transform="rotate(180 8 8)"
            />
          </svg>
        </button>

        <div className={`${prefix}--date-picker__current-month`}>
          {monthYear}
        </div>

        <button
          type="button"
          className={`${prefix}--date-picker__month-nav`}
          onClick={handleNextMonth}
          aria-label="Next month">
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z" />
          </svg>
        </button>
      </div>

      {/* Weekday Headers */}
      <div className={`${prefix}--date-picker__weekdays`}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className={`${prefix}--date-picker__weekday`}
            title={day}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className={`${prefix}--date-picker__days`}>
        {calendarGrid.flat().map((dayCell, index) => {
          const { date, isCurrentMonth, isDisabled, isToday } = dayCell;
          const selected = isDateSelected(date);
          const inRange = isDateInRange(date);
          const focused = isDateFocused(date);

          const dayClasses = classNames(`${prefix}--date-picker__day`, {
            today: isToday,
            selected: selected,
            inRange: inRange,
            prevMonthDay: !isCurrentMonth && date.month < viewDate.month,
            nextMonthDay: !isCurrentMonth && date.month > viewDate.month,
            disabled: isDisabled,
            focused: focused,
          });

          return (
            <button
              key={index}
              type="button"
              className={dayClasses}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={() => handleDateClick(date, isDisabled)}
              disabled={isDisabled}
              aria-label={`${monthNames[date.month - 1]} ${date.day}, ${
                date.year
              }`}
              aria-pressed={selected || undefined}
              aria-current={isToday ? 'date' : undefined}
              tabIndex={focused ? 0 : -1}>
              {date.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Calendar.displayName = 'Calendar';
