/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Plugin } from 'flatpickr/dist/types/options';
import type { Instance } from 'flatpickr/dist/types/instance';

interface AppendToPluginConfig {
  appendTo: HTMLElement;
}

export const appendToPlugin =
  (config: AppendToPluginConfig): Plugin =>
  (fp: Instance) => {
    /**
     * Adjusts the floating menu position after Flatpickr sets it.
     */
    const handlePreCalendarPosition = () => {
      Promise.resolve().then(() => {
        const {
          calendarContainer,
          config: fpConfig,
          _positionElement: positionElement,
        } = fp;

        const appendTo = fpConfig.appendTo;

        if (!appendTo) {
          throw new Error('[appendToPlugin] Missing `appendTo` element.');
        }

        const { left: containerLeft, top: containerTop } =
          appendTo.getBoundingClientRect();
        const { left: refLeft, bottom: refBottom } =
          positionElement.getBoundingClientRect();
        if (
          (appendTo !== appendTo.ownerDocument.body ||
            containerLeft !== 0 ||
            containerTop !== 0) &&
          appendTo.ownerDocument.defaultView
            ?.getComputedStyle(appendTo)
            .getPropertyValue('position') === 'static'
        ) {
          throw new Error(
            'Floating menu container must not have `position: static`.'
          );
        }
        // `2` for negative margin on calendar dropdown
        calendarContainer.style.top = `${refBottom - containerTop + 2}px`;
        calendarContainer.style.left = `${refLeft - containerLeft}px`;
      });
    };

    /**
     * Registers this Flatpickr plugin.
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
