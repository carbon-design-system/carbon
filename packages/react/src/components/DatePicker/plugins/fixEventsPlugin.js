/**
 * Copyright IBM Corp. 2016, 2018
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
  /**
   * Handles `keydown` event.
   */
  const handleKeydown = (event) => {
    const { inputFrom, inputTo } = config;
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
