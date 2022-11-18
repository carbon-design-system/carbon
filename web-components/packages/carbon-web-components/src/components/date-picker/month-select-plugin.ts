/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Locale } from 'flatpickr/dist/types/locale';
import { Plugin } from 'flatpickr/dist/types/options';
import { forEach } from '../../globals/internal/collection-helpers';

/**
 * @param monthNumber The month number.
 * @param shorthand `true` to use shorthand month.
 * @param locale The Flatpickr locale data.
 * @returns The month string.
 */
const monthToStr = (monthNumber: number, shorthand: boolean, locale: Locale) =>
  locale.months[shorthand ? 'shorthand' : 'longhand'][monthNumber];

/**
 * The configuration for the Flatpickr plugin to use text instead of `<select>` for month picker.
 */
export interface DatePickerMonthSelectPluginConfig {
  /**
   * `true` to use shorthand month.
   */
  shorthand?: boolean;

  /**
   * The CSS selector for the container of month/year selection UI.
   */
  selectorFlatpickrMonthYearContainer: string;

  /**
   * The CSS selector for the container of year selection UI.
   */
  selectorFlatpickrYearContainer: string;

  /**
   * The CSS selector for the text-based month selection UI.
   */
  selectorFlatpickrCurrentMonth: string;

  /**
   * The CSS class for the text-based month selection UI.
   */
  classFlatpickrCurrentMonth: string;
}

/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to use text instead of `<select>` for month picker.
 */
export default (config: DatePickerMonthSelectPluginConfig): Plugin =>
  (fp: FlatpickrInstance) => {
    /**
     * Replaces `<select>` for month with text content.
     */
    const setupElements = () => {
      const {
        monthElements,
        yearElements,
        currentMonth,
        l10n,
        _createElement: createElement,
      } = fp;
      if (!monthElements) {
        return;
      }
      const {
        shorthand,
        selectorFlatpickrMonthYearContainer,
        selectorFlatpickrYearContainer,
        classFlatpickrCurrentMonth,
      } = config;
      monthElements.forEach((elem) => {
        if (!elem.parentNode) return;
        elem.parentNode.removeChild(elem);
      });
      monthElements.splice(
        0,
        monthElements.length,
        ...monthElements.map(() => {
          const monthElement = createElement(
            'span',
            classFlatpickrCurrentMonth
          );
          monthElement.textContent = monthToStr(
            currentMonth,
            shorthand === true,
            l10n
          );
          const monthYearContainer = yearElements[0].closest(
            selectorFlatpickrMonthYearContainer
          );
          if (monthYearContainer) {
            monthYearContainer.insertBefore(
              monthElement,
              yearElements[0].closest(selectorFlatpickrYearContainer)
            );
          }
          return monthElement;
        })
      );
    };

    /**
     * Updates the text-based month UI with the latest selected date.
     */
    const updateCurrentMonth = () => {
      const { yearElements, currentMonth, l10n } = fp;
      const {
        shorthand,
        selectorFlatpickrMonthYearContainer,
        selectorFlatpickrCurrentMonth,
      } = config;
      const monthStr = monthToStr(currentMonth, shorthand === true, l10n);
      yearElements.forEach((elem) => {
        const currentMonthContainer = elem.closest(
          selectorFlatpickrMonthYearContainer
        );
        if (currentMonthContainer) {
          forEach(
            currentMonthContainer.querySelectorAll(
              selectorFlatpickrCurrentMonth
            ),
            (monthElement) => {
              monthElement.textContent = monthStr;
            }
          );
        }
      });
    };

    /**
     * Registers this Flatpickr plugin.
     */
    const register = () => {
      fp.loadedPlugins.push('carbonFlatpickrMonthSelectPlugin');
    };

    return {
      onMonthChange: updateCurrentMonth,
      onValueUpdate: updateCurrentMonth,
      onOpen: updateCurrentMonth,
      onReady: [setupElements, updateCurrentMonth, register],
    };
  };
