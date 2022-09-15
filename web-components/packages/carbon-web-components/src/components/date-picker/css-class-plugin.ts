/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Plugin } from 'flatpickr/dist/types/options';
import { forEach } from '../../globals/internal/collection-helpers';

/**
 * The configuration for the Flatpickr plugin to set CSS classes specific to this design system.
 */
export interface DatePickerCSSClassPluginConfig {
  /**
   * The CSS class for the calendar dropdown.
   */
  classCalendarContainer: string;

  /**
   * The CSS class for the month navigator.
   */
  classMonth: string;

  /**
   * The CSS class for the container of the weekdays.
   */
  classWeekdays: string;

  /**
   * The CSS class for the container of the days.
   */
  classDays: string;

  /**
   * The CSS class applied to each weekdays.
   */
  classWeekday: string;

  /**
   * The CSS class applied to each days.
   */
  classDay: string;

  /**
   * The CSS class applied to the "today" highlight if there are any dates selected.
   */
  classNoBorder: string;

  /**
   * The CSS selector for Flatpickr's month navigator.
   */
  selectorFlatpickrMonth: string;

  /**
   * The CSS selector for Flatpickr's container of the weekdays.
   */
  selectorFlatpickrWeekdays: string;

  /**
   * The CSS selector for Flatpickr's container of the days.
   */
  selectorFlatpickrDays: string;

  /**
   * The CSS selector applied to Flatpickr's each weekdays.
   */
  selectorFlatpickrWeekday: string;

  /**
   * The CSS selector applied to Flatpickr's each days.
   */
  selectorFlatpickrDay: string;

  /**
   * The CSS class applied to Flatpickr's "today" highlight.
   */
  classFlatpickrToday: string;
}

/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to set CSS classes specific to this design system.
 */
export default (config: DatePickerCSSClassPluginConfig): Plugin =>
  (fp: FlatpickrInstance) => {
    /**
     * Adds class names specific to our design system to calendar dropdown.
     */
    const ensureClassesInDatePicker = () => {
      const { calendarContainer, selectedDates } = fp;
      if (calendarContainer) {
        const {
          classCalendarContainer,
          classMonth,
          classWeekdays,
          classDays,
          classWeekday,
          classDay,
          classNoBorder,
          selectorFlatpickrMonth,
          selectorFlatpickrWeekdays,
          selectorFlatpickrDays,
          selectorFlatpickrWeekday,
          selectorFlatpickrDay,
          classFlatpickrToday,
        } = config;
        calendarContainer.classList.add(classCalendarContainer);
        const month = calendarContainer.querySelector(selectorFlatpickrMonth);
        if (month) {
          month.classList.add(classMonth);
        }
        const weekdays = calendarContainer.querySelector(selectorFlatpickrWeekdays);
        if (weekdays) {
          weekdays.classList.add(classWeekdays);
        }
        const days = calendarContainer.querySelector(selectorFlatpickrDays);
        if (days) {
          days.classList.add(classDays);
        }
        forEach(calendarContainer.querySelectorAll(selectorFlatpickrWeekday), item => {
          item.innerHTML = item.innerHTML.replace(/\s+/g, '');
          item.classList.add(classWeekday);
        });
        forEach(calendarContainer.querySelectorAll(selectorFlatpickrDay), item => {
          item.classList.add(classDay);
          if (item.classList.contains(classFlatpickrToday) && selectedDates!.length > 0) {
            item.classList.add(classNoBorder);
          } else if (item.classList.contains(classFlatpickrToday) && selectedDates!.length === 0) {
            item.classList.remove(classNoBorder);
          }
        });
      }
    };

    /**
     * Registers this Flatpickr plugin.
     */
    const register = () => {
      fp.loadedPlugins.push('carbonFlatpickrCSSClassPlugin');
    };

    return {
      onMonthChange: ensureClassesInDatePicker,
      onYearChange: ensureClassesInDatePicker,
      onValueUpdate: ensureClassesInDatePicker,
      onOpen: ensureClassesInDatePicker,
      onReady: [register],
    };
  };
