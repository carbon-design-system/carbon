/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param config Plugin configuration.
 * @returns
 *   A Flatpickr plugin to manage focus to align with the UX pattern in our design system.
 *   Workaround for: https://github.com/flatpickr/flatpickr/issues/1895
 */
export default config => fp => {
  /**
   * Handles `blur` event to move the focus back to the `<input>`.
   */
  const handleBlur = ({ target, relatedTarget }) => {
    // Obtains `beingUpdated` up-front because it'll be flushed out shortly
    const { calendarContainer, isOpen } = fp;
    if (
      isOpen &&
      calendarContainer.contains(target) &&
      !calendarContainer.contains(relatedTarget)
    ) {
      Promise.resolve().then(() => {
        const rootNode = target.getRootNode();
        // This `blur` event handler can be called from Flatpickr's code cleaning up calenar dropdown's DOM,
        // and changing focus in such condition causes removing an orphaned DOM node,
        // because Flatpickr redraws the calendar dropdown when the `<input>` gets focus.
        if (
          rootNode.nodeType === Node.DOCUMENT_NODE ||
          rootNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE
        ) {
          if (fp._lastFocusInput === config.inputTo) {
            config.inputTo.focus();
          } else {
            config.inputFrom.focus();
          }
          // Closing after moving focus. Reversing the order will cause re-opening calendar dropdown upon focusing
          fp.close();
        }
      });
    }
  };

  /**
   * Handles `focus` event on `<input>` for starting/end date to track the lastly focused one.
   */
  const handleInputFocus = ({ target }) => {
    fp._lastFocusInput = target;
  };

  /**
   * Releases event listeners used in this Flatpickr plugin.
   */
  const release = () => {
    const { inputFrom, inputTo } = config;
    if (inputTo) {
      inputTo.removeEventListener('focus', handleInputFocus);
    }
    inputFrom.removeEventListener('focus', handleInputFocus);
    fp.calendarContainer.removeEventListener('blur', handleBlur, true);
  };

  /**
   * Sets up event listeners used for this Flatpickr plugin.
   */
  const init = () => {
    release();
    const { inputFrom, inputTo } = config;
    fp.calendarContainer.addEventListener('blur', handleBlur, true);
    inputFrom.addEventListener('focus', handleInputFocus);
    if (inputTo) {
      inputTo.addEventListener('focus', handleInputFocus);
    }
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
