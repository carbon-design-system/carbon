/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Plugin } from 'flatpickr/dist/types/options';

/**
 * The configuration for the Flatpickr plugin to put the calendar dropdown in shadow DOM.
 */
export interface DatePickerAppendToPluginConfig {
  /**
   * The floating menu container.
   */
  appendTo: HTMLElement;
}

/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to put the calendar dropdown in shadow DOM.
 */
export default (config: DatePickerAppendToPluginConfig): Plugin =>
  (fp: FlatpickrInstance) => {
    /**
     * Adjusts the floating meun position after Flatpicker sets it.
     */
    const handlePreCalendarPosition = async () => {
      await Promise.resolve();
      const {
        calendarContainer,
        config: fpConfig,
        _positionElement: positionElement,
      } = fp;
      const { appendTo } = fpConfig;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const { top: containerTop } = appendTo!.getBoundingClientRect();
      const { bottom: refBottom } = positionElement.getBoundingClientRect();
      const isRtl =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        appendTo!
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
          .ownerDocument!.defaultView!.getComputedStyle(appendTo!)
          .getPropertyValue('direction') === 'rtl';
      calendarContainer.style.top = `${refBottom - containerTop}px`;
      calendarContainer.style.left = !isRtl ? '0' : 'auto';
      calendarContainer.style.right = !isRtl ? 'auto' : '0';
    };

    /**
     * Registers this Flatpickr plugin.
     *
     */
    const register = () => {
      fp.loadedPlugins.push('carbonFlatpickrAppendToPlugin');
    };

    return {
      appendTo: config.appendTo,
      onReady: register,
      onPreCalendarPosition: handlePreCalendarPosition,
    };
  };
