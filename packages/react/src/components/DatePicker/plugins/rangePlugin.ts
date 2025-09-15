/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import baseRangePlugin, {
  type Config,
} from 'flatpickr/dist/plugins/rangePlugin';
import { Instance } from 'flatpickr/dist/types/instance';

/**
 * @param config Plugin configuration.
 * @returns An extension of Flatpickr `rangePlugin` that does the following:
 *   * Better ensures the calendar dropdown is always aligned to the `<input>` for the starting date.
 *     Workaround for: https://github.com/flatpickr/flatpickr/issues/1944
 *   * A logic to ensure `fp.setDate()` call won't end up with "startDate to endDate" set to the first `<input>`
 */
export const rangePlugin = (config: Config = {}) => {
  const factory = baseRangePlugin(Object.assign({ position: 'left' }, config));
  return (fp: Instance) => {
    const { setDate: origSetDate } = fp;

    const init = () => {
      fp.setDate = (dates, triggerChange, format) => {
        origSetDate(dates, triggerChange, format);
        // If `triggerChange` is `true`, `onValueUpdate` Flatpickr event is fired
        // where Flatpickr's range plugin takes care of fixing the first `<input>`
        if (!triggerChange && Array.isArray(dates) && dates.length === 2) {
          const { formatDate, _input: inputFrom } = fp;
          const { input: inputTo } = config;
          const inputToElement =
            typeof inputTo === 'string'
              ? document.querySelector(inputTo)
              : inputTo;

          [inputFrom, inputToElement].forEach((input, i) => {
            if (input && input instanceof HTMLInputElement) {
              input.value = !dates[i]
                ? ''
                : formatDate(new Date(dates[i]), fp.config.dateFormat);
            }
          });
        }
      };
    };

    const origRangePlugin = factory(fp);
    const { onReady: origOnReady } = origRangePlugin;

    return Object.assign(origRangePlugin, {
      onReady: [init, origOnReady],
      onPreCalendarPosition: () => {},
    });
  };
};
