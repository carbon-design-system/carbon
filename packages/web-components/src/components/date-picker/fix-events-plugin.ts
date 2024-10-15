/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
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
 * The configuration for the Flatpickr plugin to fix Flatpickr's behavior of certain events.
 */
export interface DatePickerFixEventsPluginConfig {
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
 * `FlatpickrInstance` with additional properties used for `carbonFlatpickrFixEventsPlugin`.
 */
export interface ExtendedFlatpickrInstanceFixEventsPlugin
  extends FlatpickrInstance {
  /**
   * The handle for `keydown` event handler in the `<input>` for the starting date.
   */
  _hCDSCEDatePickerFixEventsPluginKeydownFrom?: Handle | null;

  /**
   * The handle for `keydown` event handler in the `<input>` for the end date.
   */
  _hCDSCEDatePickerFixEventsPluginKeydownTo?: Handle | null;
}

/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to fix Flatpickr's behavior of certain events.
 */
export default (config: DatePickerFixEventsPluginConfig): Plugin =>
  (fp: ExtendedFlatpickrInstanceFixEventsPlugin) => {
    /**
     * Handles `keydown` event.
     */
    const handleKeydown = (event: KeyboardEvent) => {
      const { inputFrom, inputTo } = config;
      const { key, target } = event;
      if (inputFrom === target || inputTo === target) {
        switch (key) {
          case 'Enter':
            // Makes sure the hitting enter key picks up pending values of both `<input>`
            // Workaround for: https://github.com/flatpickr/flatpickr/issues/1942
            fp.setDate(
              [inputFrom.value!, (inputTo && inputTo.value)!],
              true,
              fp.config.dateFormat
            );
            event.stopPropagation();
            break;
          case 'ArrowLeft':
          case 'Left':
          case 'ArrowRight':
          case 'Right':
            // Prevents Flatpickr code from canceling the event if left/right arrow keys are hit on `<input>`,
            // so user can move the keyboard cursor for editing dates
            // Workaround for: https://github.com/flatpickr/flatpickr/issues/1943
            event.stopPropagation();
            break;
          default:
            break;
        }
      }
    };

    /**
     * Releases event listeners used in this Flatpickr plugin.
     */
    const release = () => {
      if (fp._hCDSCEDatePickerFixEventsPluginKeydownTo) {
        fp._hCDSCEDatePickerFixEventsPluginKeydownTo =
          fp._hCDSCEDatePickerFixEventsPluginKeydownTo.release();
      }
      if (fp._hCDSCEDatePickerFixEventsPluginKeydownFrom) {
        fp._hCDSCEDatePickerFixEventsPluginKeydownFrom =
          fp._hCDSCEDatePickerFixEventsPluginKeydownFrom.release();
      }
    };

    /**
     * Sets up event listeners used for this Flatpickr plugin.
     */
    const init = () => {
      release();
      const { inputFrom, inputTo } = config;
      fp._hCDSCEDatePickerFixEventsPluginKeydownFrom = on(
        inputFrom,
        'keydown',
        handleKeydown,
        true
      );
      if (inputTo) {
        fp._hCDSCEDatePickerFixEventsPluginKeydownTo = on(
          inputTo,
          'keydown',
          handleKeydown,
          true
        );
      }
    };

    /**
     * Registers this Flatpickr plugin.
     */
    const register = () => {
      fp.loadedPlugins.push('carbonFlatpickrFixEventsPlugin');
    };

    return {
      onReady: [register, init],
      onDestroy: [release],
    };
  };
