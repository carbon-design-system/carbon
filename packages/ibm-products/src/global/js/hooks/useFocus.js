/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { usePrefix } from '@carbon/react';
import { pkg } from '../../../settings';
import { useCallback, useEffect } from 'react';

export const getSpecificElement = (parentEl, elementId) => {
  const element = parentEl?.querySelector(elementId);

  return elementId && !element?.disabled ? element : null;
};

export const useFocus = (modalRef, selectorPrimaryFocus) => {
  const carbonPrefix = usePrefix();
  const tearsheetBaseClass = `${pkg.prefix}--tearsheet`;
  const sidePanelBaseClass = `${pkg.prefix}--side-panel`;
  // Querying focusable element in the modal
  // Query to exclude hidden elements in the modal from querySelectorAll() method
  // feel free to include more if needed :)
  const notQuery = `:not(.${carbonPrefix}--visually-hidden,.${tearsheetBaseClass}__header--no-close-icon,.${carbonPrefix}--btn--disabled,[aria-hidden="true"],[tabindex="-1"],[disabled])`;
  // Queries to include element types button, input, select, textarea
  const queryButton = `button${notQuery}`;
  const queryInput = `input${notQuery}`;
  const querySelect = `select${notQuery}`;
  const queryTextarea = `textarea${notQuery}`;
  const queryLink = `[href]${notQuery}`;
  const queryAnchor = `a${notQuery}`;
  const queryTabIndex = `[tabindex="0"]${notQuery}`;
  const querySidePanelScroll = `.${sidePanelBaseClass}--scrolls`;
  // Final query
  const query = `${queryButton},${queryLink},${queryAnchor},${queryInput},${querySelect},${queryTextarea},${queryTabIndex},${querySidePanelScroll}`;

  const getFocusable = useCallback(() => {
    // Selecting all focusable elements based on the above conditions
    let focusableElements = modalRef?.current?.querySelectorAll(`${query}`);
    if (focusableElements?.length) {
      focusableElements = Array.prototype.filter.call(
        focusableElements,
        (el) => window?.getComputedStyle(el)?.display !== 'none'
      );
    }

    const first = focusableElements?.[0];
    const last = focusableElements?.[focusableElements?.length - 1];
    const all = focusableElements;
    const specified = getSpecificElement(
      modalRef?.current,
      selectorPrimaryFocus
    );

    return {
      first,
      last,
      all,
      specified,
    };
  }, [modalRef, query, selectorPrimaryFocus]);

  useEffect(() => {
    getFocusable();
  }, [getFocusable, modalRef]);

  const handleKeyDown = async (event) => {
    // Checking whether the key is tab or not
    if (event.key === 'Tab') {
      // updating the focusable elements list
      const { first, last } = getFocusable();

      if (event.shiftKey && document?.activeElement === first) {
        // Prevents the default "Tab" behavior
        event.preventDefault();
        // if the user press shift+tab and the current element not in focusable items
        last?.focus();
      } else if (!event.shiftKey && document?.activeElement === last) {
        event.preventDefault();
        // user pressing tab key only then
        // focusing the first element if the current element is not in focusable items
        first?.focus();
      }
    }
  };

  const claimFocus = useCallback(() => {
    const { first, specified } = getFocusable();

    if (
      specified &&
      window?.getComputedStyle(specified)?.display !== 'none' &&
      specified?.tabIndex !== -1
    ) {
      setTimeout(() => specified.focus(), 0);
    } else {
      setTimeout(() => first?.focus(), 0);
    }
  }, [getFocusable]);

  return {
    firstElement: getFocusable()?.first,
    lastElement: getFocusable()?.last,
    allElements: getFocusable()?.all,
    specifiedElement: getFocusable()?.specified,
    keyDownListener: handleKeyDown,
    getFocusable: getFocusable,
    claimFocus,
  };
};
