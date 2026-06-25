/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react';
import wait from '../utils/wait';

// Focus the first focusable element and call the onMount prop for the current step if one is provided
export const useCreateComponentFocus = ({
  previousState,
  currentStep,
  blockClass,
  onMount,
  firstFocusElement,
}) => {
  useEffect(() => {
    if (typeof onMount === 'function') {
      onMount();
    }
  }, [onMount]);
  useEffect(() => {
    // because of how handleStackChange.claimFocus in TearsheetShell works a timeout is required to focus on specific elements
    const awaitFocus = async (elm) => {
      await wait(10);
      elm.focus();
    };
    // FUNCTION TO ENSURE THE ELEMENT TARGETED IS NOT CONTAINED IN AN ELEMENT MARKED 'INERT'
    const isNotContainedInInert = (elm) => {
      if (!elm) return false;
      const inertParent = elm.closest('[inert]');
      return (
        !inertParent || (!inertParent.hasAttribute('inert') && !elm.disabled)
      );
    };

    const getActiveStep = () => {
      const allSteps = Array.from(document.querySelectorAll(blockClass));
      return allSteps.find((el) => {
        let currentStep = el;
        while (currentStep) {
          if (currentStep.hasAttribute('inert')) return false;
          currentStep = currentStep.parentElement;
        }
        return true;
      });
    };

    const getFocusableElement = (containingElement) => {
      const focusElementQuery = `button, input[type="button"], input, select, textarea, a[href]`;
      // PREFER THE USER DEFINED firstFocusElement IF IT EXISTS
      const firstFocusEl = containingElement.querySelector(firstFocusElement);
      if (
        firstFocusEl &&
        isNotContainedInInert(firstFocusEl) &&
        !firstFocusEl.disabled
      ) {
        return firstFocusEl;
      }
      // BACKUP TO INTERACTIVE ELEMENT LIST
      const bakFocusEl = Array.from(
        containingElement.querySelectorAll(focusElementQuery)
      );
      return bakFocusEl.find((el) => isNotContainedInInert(el) && !el.disabled);
    };

    if (previousState?.currentStep !== currentStep && currentStep > 0) {
      // GET THE CURRENT STEP ELEMENT
      const activeStepElement = getActiveStep();
      if (activeStepElement && isNotContainedInInert(activeStepElement)) {
        const focusEl = getFocusableElement(activeStepElement);
        if (focusEl) {
          awaitFocus(focusEl);
        }
      }
    }
  }, [currentStep, previousState, blockClass, onMount, firstFocusElement]);
};
