/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { match, keys } from '../../../internal/keyboard';
import {
  DOCUMENT_POSITION_BROAD_PRECEDING,
  DOCUMENT_POSITION_BROAD_FOLLOWING,
} from '../../../internal/keyboard/navigation';

/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to manage focus to align with the UX pattern in our design system.
 */
export default config => fp => {
  /**
   * Focuses on calendar dropdown.
   */
  const focusCalendar = () => {
    const { calendarContainer, selectedDateElem, todayDateElem } = fp;
    (selectedDateElem || todayDateElem || calendarContainer).focus();
  };

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
    const currentDayElem =
      currentActiveNode && currentActiveNode.closest('.flatpickr-day');
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
    const { inputFrom, inputTo } = config;
    const { calendarContainer, isOpen } = fp;
    if (
      isOpen &&
      calendarContainer.contains(oldActiveNode) &&
      !calendarContainer.contains(currentActiveNode)
    ) {
      cleanDayElemTabIndices();
      const comparisonResult = !currentActiveNode
        ? DOCUMENT_POSITION_BROAD_FOLLOWING
        : oldActiveNode.compareDocumentPosition(currentActiveNode);
      setTimeout(() => {
        // This `focusout` event handler can be called from Flatpickr's code cleaning up calenar dropdown's DOM,
        // and changing focus in such condition causes removing an orphaned DOM node,
        // because Flatpickr redraws the calendar dropdown when the `<input>` gets focus.
        if (comparisonResult & DOCUMENT_POSITION_BROAD_PRECEDING) {
          (inputTo || inputFrom).focus();
        } else {
          // When VO cursor moves onto the `<input>` for year, keyboard focus is temporary lost for some reason.
          // Ensure we don't close the calanedar dropdown in such condition.
          const lostFocusWasTemporary = calendarContainer.contains(
            document.activeElement
          );
          if (!lostFocusWasTemporary) {
            // Closing after moving focus. Reversing the order will cause re-opening calendar dropdown upon focusing
            fp.close();
          }
        }
      }, 0);
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
  const handleBlurContainer = ({
    target: oldActiveNode,
    relatedTarget: currentActiveNode,
  }) => {
    const { container } = config;
    const { calendarContainer, isOpen } = fp;
    let shouldFocusOnCalendarDropdown = false;
    if (
      isOpen &&
      container &&
      oldActiveNode &&
      currentActiveNode &&
      container.contains(oldActiveNode) &&
      !container.contains(currentActiveNode)
    ) {
      const comparisonResult = oldActiveNode.compareDocumentPosition(
        currentActiveNode
      );
      if (comparisonResult & DOCUMENT_POSITION_BROAD_FOLLOWING) {
        shouldFocusOnCalendarDropdown = true;
      }
    }
    if (shouldFocusOnCalendarDropdown) {
      focusCalendar();
    } else if (!calendarContainer.contains(currentActiveNode)) {
      fp.close();
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
