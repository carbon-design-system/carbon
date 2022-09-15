/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Plugin } from 'flatpickr/dist/types/options';
import on from 'carbon-components/es/globals/js/misc/on';
import Handle from '../../globals/internal/handle';
import { find } from '../../globals/internal/collection-helpers';

/**
 * `FlatpickrInstance` with additional properties used for `carbonFlatpickrShadowDOMEventsPlugin`.
 */
export interface ExtendedFlatpickrInstanceShadowDOMEventsPlugin extends FlatpickrInstance {
  /**
   * The handle for `keydown` event handler in calendar dropdown.
   */
  _hBXCEDatePickerShadowDOMEventsPluginKeydown?: Handle | null;
}

/**
 * The amount of days to adjust, keyed by the key code.
 */
const moveDateForKeys = {
  ArrowLeft: -1,
  Left: -1,
  ArrowUp: -7,
  Up: -7,
  ArrowRight: 1,
  Right: 1,
  ArrowDown: 7,
  Down: 7,
};

/**
 * The amount of months to adjust, keyed by the key code. Used with Ctrl modifier key.
 */
const moveMonthForKeys = {
  ArrowLeft: -1,
  Left: -1,
  ArrowUp: -12,
  Up: -12,
  ArrowRight: 1,
  Right: 1,
  ArrowDown: 12,
  Down: 12,
};

/**
 * The number of milliseconds per day.
 */
const MILLISECONDS_IN_DAY = 86400000;

/**
 * Adjusts the date with the given amount of days.
 * @param localDate The original date.
 * @param options The options.
 * @param [options.date=0] The amount of days to adjust.
 */
const adjustDate = (localDate: Date, { date: moveDate = 0 }: { date?: number }) => {
  const utcDate = new Date(
    Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()) + moveDate * MILLISECONDS_IN_DAY
  );
  return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
};

/**
 * @param config Plugin configuration.
 * @returns
 *   A Flatpickr plugin to handle events.
 *   Some event handlers in Flatpickr won't work is the calendar dropdown is put in shadow DOM, due to event retargetting.
 */
export default (): Plugin => (fp: ExtendedFlatpickrInstanceShadowDOMEventsPlugin) => {
  const getDateElem = localDate =>
    find(fp.daysContainer!.firstElementChild!.children, ({ dateObj }: any) => localDate.getTime() === dateObj.getTime());

  /**
   * Handles `keydown` event.
   */
  const handleKeydown = (event: KeyboardEvent) => {
    const { ctrlKey, key, target } = event;
    if (key === 'Enter') {
      target!.dispatchEvent(Object.assign(new CustomEvent('mousedown', { bubbles: true }), { which: 1 }));
    } else if (!ctrlKey && key in moveDateForKeys) {
      const { dateObj } = target as any;
      const movedDate = adjustDate(dateObj, { date: moveDateForKeys[key] });
      const movedDateElem = getDateElem(movedDate);
      if (movedDateElem) {
        movedDateElem.focus();
      } else {
        const innerDaysContainer = fp.daysContainer!.firstElementChild!;
        if (movedDate.getTime() < (innerDaysContainer.firstElementChild as any).dateObj.getTime()) {
          fp.changeMonth(-1);
          // `fp.daysContainer` is updated by `fp.changeMonth()`
          (fp.daysContainer!.firstElementChild!.lastElementChild as HTMLElement).focus();
        } else if (movedDate.getTime() > (innerDaysContainer.lastElementChild as any).dateObj.getTime()) {
          fp.changeMonth(1);
          // `fp.daysContainer` is updated by `fp.changeMonth()`
          (fp.daysContainer!.firstElementChild!.firstElementChild as HTMLElement).focus();
        }
      }
      event.preventDefault();
    } else if (ctrlKey && key in moveMonthForKeys) {
      fp.changeMonth(moveMonthForKeys[key]);
      (fp.daysContainer!.firstElementChild!.firstElementChild as HTMLElement).focus();
      event.preventDefault();
    }
  };

  /**
   * Releases event listeners used in this Flatpickr plugin.
   */
  const release = () => {
    if (fp._hBXCEDatePickerShadowDOMEventsPluginKeydown) {
      fp._hBXCEDatePickerShadowDOMEventsPluginKeydown = fp._hBXCEDatePickerShadowDOMEventsPluginKeydown.release();
    }
  };

  /**
   * Sets up event listeners used for this Flatpickr plugin.
   */
  const init = () => {
    release();
    fp._hBXCEDatePickerShadowDOMEventsPluginKeydown = on(fp.calendarContainer, 'keydown', handleKeydown);
  };

  /**
   * Registers this Flatpickr plugin.
   */
  const register = () => {
    fp.loadedPlugins.push('carbonFlatpickrShadowDOMEventsPlugin');
  };

  return {
    onReady: [register, init],
    onDestroy: [release],
  };
};
