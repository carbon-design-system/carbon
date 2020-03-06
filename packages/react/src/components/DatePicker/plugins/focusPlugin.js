/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { match, keys } from '../../../internal/keyboard';

/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to manage focus to align with the UX pattern in our design system.
 */
export default config => fp => {
  /**
   * Clean-up `tabindex` of Flatpickr day elements.
   */
  const cleanDayElemTabIndices = () => {
    const { calendarContainer } = fp;
    Array.prototype.forEach.call(
      calendarContainer.querySelectorAll('.flatpickr-day'),
      elem => {
        elem.tabIndex = -1;
      }
    );
  };

  /**
   * Handles `focusin` event to ensure an day element in calendar dropdown is sequential-focusable
   * when it gets focus.
   * Doing so ensures the next sequential-focusable element of an day element won't be date picker `<input>`.
   */
  const handleFocusCalendarDropdown = ({ target: currentActiveNode }) => {
    const { selectedDateElem, todayDateElem } = fp;
    const currentDayElem =
      (currentActiveNode && currentActiveNode.closest('.flatpickr-day')) ||
      selectedDateElem ||
      todayDateElem;
    if (currentDayElem) {
      cleanDayElemTabIndices();
      currentDayElem.tabIndex = 0;
    }
  };

  /**
   * Handles `focusout` event to:
   *
   * * Ensure an day element in calendar dropdown is non-sequential-focusable when it loses focus
   * * Move the focus back to the `<input>`
   */
  const handleBlurCalendarDropdown = ({
    target: oldActiveNode,
    relatedTarget: currentActiveNode,
  }) => {
    // const { inputFrom, inputTo } = config;
    const { calendarContainer, isOpen } = fp;
    if (
      isOpen &&
      calendarContainer.contains(oldActiveNode) &&
      !calendarContainer.contains(currentActiveNode)
    ) {
      cleanDayElemTabIndices();
    }
  };

  /**
   * Handles `keydown` event to disable Flatpickr's back-tab hehavior.
   */
  const handleKeydownCalendarDropdown = event => {
    if (match(event, keys.Tab) && event.shiftKey) {
      // Flatpickr attempts to take over back-tab key to move focus onto the date picker `<input>`.
      // We want default sequential focusing behavior to allow focusing onto prev/next buttons.
      event.stopPropagation();
    }
  };

  /**
   * Handles `focusout` event on the date picker container to focus on the calendar dropdown or close the calendar dropdown.
   */
  const handleBlurContainer = ({ relatedTarget: currentActiveNode }) => {
    const { inputFrom, inputTo } = config;
    const { calendarContainer } = fp;
    if (!calendarContainer.contains(currentActiveNode)) {
      if (currentActiveNode) {
        fp.close();
      } else {
        setTimeout(() => {
          // When VO cursor moves onto the `<input>` for year, keyboard focus is temporary lost from browser for some reason.
          // Ensure we don't close the calanedar dropdown in such condition.
          const lostFocusWasTemporary =
            calendarContainer.contains(document.activeElement) ||
            document.activeElement === inputFrom ||
            document.activeElement === inputTo;
          if (!lostFocusWasTemporary) {
            // Closing after moving focus. Reversing the order will cause re-opening calendar dropdown upon focusing
            fp.close();
          }
        }, 0);
      }
    }
  };

  /**
   * Releases event listeners used in this Flatpickr plugin.
   */
  const release = () => {
    const { container } = config;
    container.removeEventListener('focusout', handleBlurContainer);
    fp.calendarContainer.removeEventListener(
      'keydown',
      handleKeydownCalendarDropdown
    );
    fp.calendarContainer.removeEventListener(
      'focusout',
      handleBlurCalendarDropdown
    );
    fp.calendarContainer.removeEventListener(
      'focusin',
      handleFocusCalendarDropdown
    );
  };

  /**
   * Sets up event listeners used for this Flatpickr plugin.
   */
  const init = () => {
    release();
    const { container } = config;
    fp.calendarContainer.addEventListener(
      'focusin',
      handleFocusCalendarDropdown
    );
    fp.calendarContainer.addEventListener(
      'focusout',
      handleBlurCalendarDropdown
    );
    fp.calendarContainer.addEventListener(
      'keydown',
      handleKeydownCalendarDropdown
    );
    container.addEventListener('focusout', handleBlurContainer);
  };

  /**
   * Registers this Flatpickr plugin.
   */
  const register = () => {
    fp.loadedPlugins.push('carbonFlatpickrFocusPlugin');
  };

  return {
    onReady: [register, init],
    onDestroy: release,
  };
};
