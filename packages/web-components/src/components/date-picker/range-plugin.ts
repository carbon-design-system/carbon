/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
// @ts-nocheck
import rangePlugin from 'flatpickr/dist/esm/plugins/rangePlugin.js';
import type { Config } from 'flatpickr/dist/plugins/rangePlugin';
import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Plugin } from 'flatpickr/dist/types/options';
import on from '../../globals/mixins/on';
import Handle from '../../globals/internal/handle';

/**
 * `FlatpickrInstance` with additional properties used for `range` plugin.
 */
export interface ExtendedFlatpickrInstanceRangePlugin
  extends FlatpickrInstance {
  /**
   * The handle for `blur` event handler for from date range input.
   */
  _hBXCEDatePickerRangePluginOnBlurFrom?: Handle | null;

  /**
   * The handle for `blur` event handler for to date range input.
   */
  _hBXCEDatePickerRangePluginOnBlurTo?: Handle | null;
}

/**
 * @param config Plugin configuration.
 * @returns
 *   An extension of Flatpickr `rangePlugin` that does the following:
 *
 *   Better ensures the calendar dropdown is always aligned to the `<input>` for the starting date.
 *     Workaround for: https://github.com/flatpickr/flatpickr/issues/1944
 *   Disables the logic in Flatpickr `rangePlugin` that calculates the new range with the old selected date
 *     when user selects a date from calendar dropdown.
 *     We'd like to reset the selection when user re-opens calendar dropdown and re-selects a date.
 *     Workaround for: https://github.com/flatpickr/flatpickr/issues/1958
 *   Disables the logic in Flatpickr `rangePlugin` that closes the calendar dropdown
 *     when it's launched from the `<input>` for the end date and user selects a date.
 *     Workaround for: https://github.com/flatpickr/flatpickr/issues/1958
 *   Ensures that the `<input>` in shadow DOM is treated as part of Flatpickr UI,
 *     by ensuring such `<input>` hits `.contains()` search from `fp.config.ignoredFocusElements`.
 *     Without that, Flatpickr clears the `<input>` when end date hasn't been selected yet (which we don't want).
 */
export default (config: Config): Plugin => {
  const factory = rangePlugin({ position: 'left', ...config });
  return (fp: ExtendedFlatpickrInstanceRangePlugin) => {
    const origRangePlugin = factory(fp);
    const { onReady: origOnReady } = origRangePlugin;

    const getDateStrFromInputs = (dates: Array<string>) => {
      return dates
        .filter((value) => value)
        .filter(
          (d, i, arr) =>
            fp.config.mode !== 'range' ||
            fp.config.enableTime ||
            arr.indexOf(d) === i
        )
        .join(
          fp.config.mode !== 'range'
            ? fp.config.conjunction
            : fp.l10n.rangeSeparator
        );
    };

    const handleBlur = (event: FocusEvent) => {
      event.stopPropagation();
      const firstInput = fp._input;
      const secondInput = config.input as HTMLInputElement;
      const isInput =
        event.target === firstInput || event.target === secondInput;
      const valueChanged =
        getDateStrFromInputs([firstInput.value, secondInput.value]) !==
        fp.getDateStr();
      const relatedTargetIsCalendar =
        event.relatedTarget &&
        event.relatedTarget instanceof Node &&
        fp.calendarContainer.contains(event.relatedTarget);

      if (isInput && valueChanged && !relatedTargetIsCalendar) {
        fp.setDate(
          [firstInput.value, secondInput.value],
          true,
          firstInput === fp.altInput
            ? fp.config.altFormat
            : fp.config.dateFormat
        );
      }
    };

    const release = () => {
      if (fp._hBXCEDatePickerRangePluginOnBlurFrom) {
        fp._hBXCEDatePickerRangePluginOnBlurFrom =
          fp._hBXCEDatePickerRangePluginOnBlurFrom.release();
      }
      if (fp._hBXCEDatePickerRangePluginOnBlurTo) {
        fp._hBXCEDatePickerRangePluginOnBlurTo =
          fp._hBXCEDatePickerRangePluginOnBlurTo.release();
      }
    };
    return Object.assign(origRangePlugin, {
      onReady() {
        origOnReady.call(this);
        const { ignoredFocusElements } = fp.config;
        ignoredFocusElements.push(
          ...ignoredFocusElements
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
            .map((elem) => elem.shadowRoot as any)
            .filter(Boolean)
        );

        // Setup event listeners for the blur even on both inputs. In the case
        // of the first input, we're overriding the blur event handler from
        // the library to fix it by setting it on the capture phase and then
        // stopping propagation. This is necessary b/c the library does not take
        // the range plugin into consideration when it calls setDate.
        // Workaround for: https://github.com/flatpickr/flatpickr/issues/2918
        release();
        if (fp.config.allowInput) {
          fp._hBXCEDatePickerRangePluginOnBlurFrom = on(
            fp._input,
            'blur',
            handleBlur,
            { capture: true }
          );
          fp._hBXCEDatePickerRangePluginOnBlurTo = on(
            config.input as HTMLInputElement,
            'blur',
            handleBlur,
            { capture: true }
          );
        }
      },
    });
  };
};
