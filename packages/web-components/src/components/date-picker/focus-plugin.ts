/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Plugin } from 'flatpickr/dist/types/options';
import on from '../../globals/mixins/on';
import Handle from '../../globals/internal/handle';
import CDSDatePickerInput from './date-picker-input';

/**
 * The configuration for the Flatpickr plugin to set CSS classes specific to this design system.
 */
export interface DatePickerFocusPluginConfig {
  /**
   * The input box to enter starting date.
   */
  inputFrom: CDSDatePickerInput;

  /**
   * The input box to enter end date.
   */
  inputTo?: CDSDatePickerInput;
}

/**
 * `FlatpickrInstance` with additional properties used for `carbonFlatpickrFocusPlugin`.
 */
export interface ExtendedFlatpickrInstanceFocusPlugin
  extends FlatpickrInstance {
  /**
   * The handle for `blur` event handler in calendar dropdown.
   */
  _hCDSCEDatePickerFocusPluginBlur?: Handle | null;

  /**
   * The handle for `keydown` event handler in the `<input>` for the starting date.
   */
  _hCDSCEDatePickerFocusPluginKeydownFrom?: Handle | null;

  /**
   * The handle for `keydown` event handler in the `<input>` for the end date.
   */
  _hCDSCEDatePickerFocusPluginKeydownTo?: Handle | null;

  /**
   * The handle for `focus` event handler in the `<input>` for the starting date.
   */
  _hCDSCEDatePickerFocusPluginFocusFrom?: Handle | null;

  /**
   * The handle for `focus` event handler in the `<input>` for the end date.
   */
  _hCDSCEDatePickerFocusPluginFocusTo?: Handle | null;

  /**
   * Lastly focused `<input>` for starting/end date.
   */
  _lastFocusInput?: CDSDatePickerInput;
}

/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to manage focus to align with the UX pattern in our design system.
 */
export default (config: DatePickerFocusPluginConfig): Plugin =>
  (fp: ExtendedFlatpickrInstanceFocusPlugin) => {
    /**
     * Focuses on calendar dropdown.
     */
    const focusCalendar = () => {
      const { calendarContainer, selectedDateElem, todayDateElem } = fp;
      (selectedDateElem || todayDateElem || calendarContainer).focus();
    };

    /**
     * Handles `keydown` event for date picker input field
     */
    const handleInputKeydown = (event: KeyboardEvent) => {
      if (!(event.target instanceof CDSDatePickerInput)) return;

      const { key } = event;

      if (key === 'Escape') {
        fp.close();
      }
      if (key === 'Tab') {
        if (!event.shiftKey) {
          event.preventDefault();
          fp.open();
          focusCalendar();
        } else if (fp.isOpen && event.target === config.inputFrom) {
          fp.close();
        }
      }
    };

    /**
     * Handles `keydown` event for calendar dropdown
     */
    const handleCalendarKeydown = (event: KeyboardEvent) => {
      const endInput = config.inputTo ? config.inputTo : config.inputFrom;
      const { key } = event;

      if (key === 'Tab') {
        if (!event.shiftKey) {
          if (fp._lastFocusInput === endInput) {
            endInput.focus();
            fp.close();
          } else {
            event.preventDefault();
            endInput.focus();
          }
        } else if (fp._lastFocusInput === endInput) {
          event.preventDefault();
          setTimeout(() => endInput.focus(), 0);
        }
      }
    };

    /**
     * Handles `focus` event on `<input>` for starting/end date to track the lastly focused one.
     */
    const handleInputFocus = ({ target }: FocusEvent) => {
      fp._lastFocusInput = target as CDSDatePickerInput;
    };

    /**
     * Releases event listeners used in this Flatpickr plugin.
     */
    const release = () => {
      if (fp._hCDSCEDatePickerFocusPluginBlur) {
        fp._hCDSCEDatePickerFocusPluginBlur =
          fp._hCDSCEDatePickerFocusPluginBlur.release();
      }
      if (fp._hCDSCEDatePickerFocusPluginFocusTo) {
        fp._hCDSCEDatePickerFocusPluginFocusTo =
          fp._hCDSCEDatePickerFocusPluginFocusTo.release();
      }
      if (fp._hCDSCEDatePickerFocusPluginFocusFrom) {
        fp._hCDSCEDatePickerFocusPluginFocusFrom =
          fp._hCDSCEDatePickerFocusPluginFocusFrom.release();
      }
      if (fp._hCDSCEDatePickerFocusPluginKeydownTo) {
        fp._hCDSCEDatePickerFocusPluginKeydownTo =
          fp._hCDSCEDatePickerFocusPluginKeydownTo.release();
      }
      if (fp._hCDSCEDatePickerFocusPluginKeydownFrom) {
        fp._hCDSCEDatePickerFocusPluginKeydownFrom =
          fp._hCDSCEDatePickerFocusPluginKeydownFrom.release();
      }
    };

    /**
     * Sets up event listeners used for this Flatpickr plugin.
     */
    const init = () => {
      release();
      const { inputFrom, inputTo } = config;
      fp._hCDSCEDatePickerFocusPluginBlur = on(
        fp.calendarContainer,
        'keydown',
        handleCalendarKeydown,
        true
      );
      fp._hCDSCEDatePickerFocusPluginKeydownFrom = on(
        inputFrom,
        'keydown',
        handleInputKeydown
      );
      if (inputTo) {
        fp._hCDSCEDatePickerFocusPluginKeydownTo = on(
          inputTo,
          'keydown',
          handleInputKeydown
        );
      }
      fp._hCDSCEDatePickerFocusPluginFocusFrom = on(
        inputFrom,
        'focus',
        handleInputFocus
      );
      if (inputTo) {
        fp._hCDSCEDatePickerFocusPluginFocusTo = on(
          inputTo,
          'focus',
          handleInputFocus
        );
      }
    };

    /**
     * Registers this Flatpickr plugin.
     *
     */
    const register = () => {
      fp.loadedPlugins.push('carbonFlatpickrFocusPlugin');
    };

    return {
      onReady: [register, init],
      onDestroy: release,
    };
  };
