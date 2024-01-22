/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { match, keys } from '../../../internal/keyboard';

/**
 * @param {object} config Plugin configuration.
 * @returns {Plugin} A Flatpickr plugin to fix Flatpickr's behavior of certain events.
 */
export default (config) => (fp) => {
  const { inputFrom, inputTo, lastStartValue } = config;
  /**
   * Handles `keydown` event.
   */
  const handleKeydown = (event) => {
    const { target } = event;
    if (inputFrom === target || inputTo === target) {
      if (match(event, keys.Enter)) {
        // Makes sure the hitting enter key picks up pending values of both `<input>`
        // Workaround for: https://github.com/flatpickr/flatpickr/issues/1942
        fp.setDate(
          [inputFrom.value, inputTo && inputTo.value],
          true,
          fp.config.dateFormat
        );
        event.stopPropagation();
      } else if (
        match(event, keys.ArrowLeft) ||
        match(event, keys.ArrowRight)
      ) {
        // Prevents Flatpickr code from canceling the event if left/right arrow keys are hit on `<input>`,
        // so user can move the keyboard cursor for editing dates
        // Workaround for: https://github.com/flatpickr/flatpickr/issues/1943
        event.stopPropagation();
      } else if (match(event, keys.ArrowDown)) {
        event.preventDefault();
        fp.open();
      } else if (!fp.config.allowInput) {
        // We override the default behaviour of Flatpickr, ideally when allowInput is set to false,
        // the Delete/Backspace button clears all of the date, which we don't want, hence
        // we stop event bubbling and the default Flatpickr's onChange behaviour here itself
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  const parseDateWithFormat = (dateStr) =>
    fp.parseDate(dateStr, fp.config.dateFormat);

  /**
   * Handles `blur` event.
   *
   * For whatever reason, manual changes within the `to` input do not update the
   * calendar on blur. If a manual change is made within the input, this block will
   * set the date again, triggering the calendar to update.
   */
  const handleBlur = (event) => {
    const { target } = event;

    // Only fall into this logic if the event is on the `to` input and there is a
    // `to` date selected
    if (inputTo === target && fp.selectedDates[1]) {
      // Using getTime() enables the ability to more readily compare the date currently
      // selected in the calendar and the date currently in the value of the input
      const withoutTime = (date) => date.setHours(0, 0, 0, 0);
      const selectedToDate = withoutTime(new Date(fp.selectedDates[1]));
      const currentValueToDate = withoutTime(
        parseDateWithFormat(inputTo.value)
      );

      // The date should only be set if both dates are valid dates, and they don't match.
      // When they don't match, this indiciates that the date selected in the calendar is stale,
      // and the current value in the input should be set for the calendar to update.
      if (
        selectedToDate &&
        currentValueToDate &&
        selectedToDate !== currentValueToDate
      ) {
        // Update the calendar with the value of the `to` date input
        fp.setDate(
          [inputFrom.value, inputTo && inputTo.value],
          true,
          fp.config.dateFormat
        );
      }
    }

    const isValidDate = (date) => date.toString() !== 'Invalid Date';
    // save end date in calendar inmediately after it's been written down
    if (inputTo === target && fp.selectedDates.length === 1 && inputTo.value) {
      if (isValidDate(parseDateWithFormat(inputTo.value))) {
        fp.setDate(
          [inputFrom.value, inputTo.value],
          true,
          fp.config.dateFormat
        );
      }
    }

    // overriding the flatpickr bug where the startDate gets deleted on blur
    if (inputTo === target && !inputFrom.value && lastStartValue.current) {
      if (isValidDate(parseDateWithFormat(lastStartValue.current))) {
        inputFrom.value = lastStartValue.current;
        if (inputTo.value) {
          fp.setDate(
            [inputFrom.value, inputTo.value],
            true,
            fp.config.dateFormat
          );
        }
      }
    }
  };

  /**
   * Releases event listeners used in this Flatpickr plugin.
   */
  const release = () => {
    const { inputFrom, inputTo } = config;
    if (inputTo) {
      inputTo.removeEventListener('keydown', handleKeydown, true);
      inputTo.removeEventListener('blur', handleBlur, true);
    }
    inputFrom.removeEventListener('keydown', handleKeydown, true);
  };

  /**
   * Sets up event listeners used for this Flatpickr plugin.
   */
  const init = () => {
    release();
    const { inputFrom, inputTo } = config;
    inputFrom.addEventListener('keydown', handleKeydown, true);
    if (inputTo) {
      inputTo.addEventListener('keydown', handleKeydown, true);
      inputTo.addEventListener('blur', handleBlur, true);
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
