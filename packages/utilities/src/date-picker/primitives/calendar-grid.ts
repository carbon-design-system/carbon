/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Shared calendar-grid generation for date picker renderers.
 */
import { addDays, getMonthStart, plainDateToDate } from './temporal-utils.js';
import { isDateInRange, isToday as isDateToday } from './temporal-utils.js';

/**
 * A single day cell in the calendar grid.
 */
export interface CalendarDay {
  date: Temporal.PlainDate;
  isCurrentMonth: boolean;
  isDisabled: boolean;
  isToday: boolean;
}

/**
 * Number of weeks rendered per month. Fixed at 6 so the grid height stays
 * constant regardless of how the month falls across weeks.
 */
const WEEKS_IN_GRID = 6;

/**
 *  Number of days in a week.
 */
const DAYS_IN_WEEK = 7;

/**
 * Generate the calendar grid for the month containing `viewDate`.
 *
 *
 * @param {Temporal.PlainDate} viewDate - The date to generate calendar for
 * @param {Temporal.PlainDate | null} minDate - Minimum selectable date (inclusive), or `null` for no lower bound.
 * @param {Temporal.PlainDate | null} maxDate - Maximum selectable date (inclusive), or `null` for no upper bound.
 * @param {number} weekStartsOn - First day of the week: 0 = Sunday (default) through 6 = Saturday.
 * @returns {CalendarDay[][]} 6×7 grid of day cells (weeks × days).
 */
export function generateCalendarGrid(
  viewDate: Temporal.PlainDate,
  minDate: Temporal.PlainDate | null = null,
  maxDate: Temporal.PlainDate | null = null,
  weekStartsOn = 0
): CalendarDay[][] {
  const firstDayOfMonth = getMonthStart(viewDate);

  // Day of week for the first of the month (0 = Sunday … 6 = Saturday), then
  // shifted so the grid can start on an arbitrary weekday.
  const firstWeekday = plainDateToDate(firstDayOfMonth).getDay();
  const leadingDays = (firstWeekday - weekStartsOn + 7) % 7;

  // Start date may fall in the previous month.
  const startDate = addDays(firstDayOfMonth, -leadingDays);

  const weeks: CalendarDay[][] = [];
  let currentDate = startDate;

  for (let week = 0; week < WEEKS_IN_GRID; week++) {
    const days: CalendarDay[] = [];

    for (let day = 0; day < DAYS_IN_WEEK; day++) {
      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.month === viewDate.month,
        isToday: isDateToday(currentDate),
        isDisabled: !isDateInRange(currentDate, minDate, maxDate),
      });

      currentDate = addDays(currentDate, 1);
    }

    weeks.push(days);
  }

  return weeks;
}
