/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Plugin } from 'flatpickr/dist/types/options';
import CDSDatePicker from './date-picker';

/**
 * @param datePicker Plugin configuration.
 * @returns A Flatpickr plugin to handshake states with `<cds-date-picker>`.
 */
export default (datePicker: CDSDatePicker): Plugin =>
  (fp: FlatpickrInstance) => {
    /**
     * Sets open state.
     */
    const setOpen = () => {
      datePicker.open = true;
    };

    /**
     * Sets closed state.
     */
    const setClosed = () => {
      datePicker.open = false;
    };

    /**
     * Propagates Flatpickr's `onChange` event to `<cds-date-picker>`.
     *
     * @param selectedDates The latest selected dates.
     */
    const handleChange = (selectedDates: Date[]) => {
      const { eventChange } = datePicker.constructor as typeof CDSDatePicker;
      datePicker.dispatchEvent(
        new CustomEvent(eventChange, {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            selectedDates,
          },
        })
      );
    };

    /**
     * Registers this Flatpickr plugin.
     *
     * @param _selectedDates The selected dates.
     * @param _value The value.
     * @param calendar The Flatpickr instance.
     */
    const register = (_selectedDates, _value, calendar: FlatpickrInstance) => {
      datePicker.calendar = calendar;
      fp.loadedPlugins.push('carbonFlatpickrStateHandshakePlugin');
    };

    return {
      onOpen: setOpen,
      onClose: setClosed,
      onChange: handleChange,
      onReady: [register],
    };
  };
