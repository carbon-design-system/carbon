/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  selectorTabbable as selectorTabbableCarbon,
  prefix as carbonPrefix,
} from '@carbon/web-components/es/globals/settings';

/**
 * Simple object to store containers by uniqueId
 * { id: [container1, container2, ...] }
 */
const containers: Record<string, Array<HTMLElement | ShadowRoot>> = {};

/**
 * Default key for backward compatibility when no uniqueId is provided
 */
const DEFAULT_KEY = '__default__';

/**
 * Registers a focusable container to be included in the focus trap.
 *
 * This function allows child components to register their shadow roots or DOM elements
 * so that the focus trap utility can query focusable elements within them. This is necessary
 * because shadow DOM boundaries prevent direct querying from parent components.
 *
 * @param container - The HTMLElement or ShadowRoot to register as a focusable container.
 *                    If null, the function returns early without registering.
 * @param uniqueId - Optional unique identifier to scope containers to a specific component instance.
 *                   If not provided, uses a default key for backward compatibility.
 *
 * @example
 * // In a child component's firstUpdated lifecycle
 * protected firstUpdated() {
 *   const uniqueId = tearsheetSignal.get().uniqueId;
 *   registerFocusableContainers(this.shadowRoot, uniqueId);
 * }
 *
 * @example
 * // Without uniqueId (uses default key)
 * registerFocusableContainers(this.shadowRoot);
 */
export const registerFocusableContainers = (
  container: HTMLElement | ShadowRoot | null,
  uniqueId?: string
) => {
  if (!container) {
    return;
  }

  const id = uniqueId || DEFAULT_KEY;

  // Initialize array if it doesn't exist
  if (!containers[id]) {
    containers[id] = [];
  }

  // Add container if not already present
  if (!containers[id].includes(container)) {
    containers[id].push(container);
  }
};

/**
 * UnRegisters a previously registered focusable container.
 *
 * This function should be called in the component's disconnectedCallback lifecycle method
 * to clean up and prevent memory leaks when the component is removed from the DOM.
 *
 * @param container - The HTMLElement or ShadowRoot to unregister.
 *                    If null, the function returns early without doing anything.
 * @param uniqueId - Optional unique identifier that was used when registering the container.
 *                   If not provided, uses the default key.
 *
 * @example
 * // In a child component's disconnectedCallback
 * disconnectedCallback() {
 *   super.disconnectedCallback();
 *   const uniqueId = tearsheetSignal.get().uniqueId;
 *   unregisterFocusableContainers(this.shadowRoot, uniqueId);
 * }
 *
 * @example
 * // Without uniqueId (uses default key)
 * disconnectedCallback() {
 *   super.disconnectedCallback();
 *   unregisterFocusableContainers(this.shadowRoot);
 * }
 */
export const unregisterFocusableContainers = (
  container: HTMLElement | ShadowRoot | null,
  uniqueId?: string
) => {
  if (!container) {
    return;
  }

  const id = uniqueId || DEFAULT_KEY;
  if (containers[id]) {
    containers[id] = containers[id].filter((c) => c !== container);
    if (containers[id].length === 0) {
      delete containers[id];
    }
  }
};

/**
 * Clears all registered focusable containers, either globally or for a specific uniqueId.
 *
 * This function is typically called when a parent component (like a tearsheet or modal) is closing
 * or being removed from the DOM. It ensures all registered containers are cleaned up to prevent
 * memory leaks.
 *
 * @param uniqueId - Optional unique identifier to clear containers for a specific component instance.
 *                   If provided, only containers registered with this uniqueId are cleared.
 *                   If not provided, ALL containers across all uniqueIds are cleared.
 *
 * @example
 * // Clear containers for a specific tearsheet instance
 * clearFocusableContainers(this.uniqueId);
 *
 * @example
 * // Clear all containers (typically in disconnectedCallback)
 * disconnectedCallback() {
 *   super.disconnectedCallback();
 *   this._trapFocusAPI?.cleanup();
 *   clearFocusableContainers();
 * }
 */
export const clearFocusableContainers = (uniqueId?: string) => {
  if (uniqueId) {
    delete containers[uniqueId];
  } else {
    Object.keys(containers).forEach((key) => delete containers[key]);
  }
};

/**
 * Traps keyboard focus within registered focusable containers.
 *
 * This function creates a focus trap that prevents Tab/Shift+Tab navigation from leaving
 * the registered containers. When the user reaches the last focusable element and presses Tab,
 * focus wraps to the first element, and vice versa with Shift+Tab.
 *
 * The function works with Shadow DOM by querying focusable elements from all registered
 * containers, which can include shadow roots from child components.
 *
 * @param wrapper - Optional wrapper element to attach the keydown listener to.
 *                  If not provided, defaults to document for backward compatibility.
 *                  Using a specific wrapper can improve performance and scope the listener.
 * @param uniqueId - Optional unique identifier to scope the focus trap to specific containers.
 *                   If provided, only containers registered with this uniqueId are included.
 *                   If not provided, uses the default key for backward compatibility.
 *
 * @returns An object with a `cleanup` method that removes event listeners.
 *          Call this method when the component is closing or unmounting.
 *
 * @example
 * // In a parent component when opening
 * protected updated(changedProps) {
 *   if (changedProps.has('open') && this.open) {
 *     // Update signal so children can register
 *     updateTearsheetSignals({ uniqueId: this.uniqueId });
 *
 *     // Wait for children to register, then trap focus
 *     requestAnimationFrame(() => {
 *       this._trapFocusAPI = trapFocus(this as HTMLElement, this.uniqueId);
 *     });
 *   }
 * }
 *
 * @example
 * // Without uniqueId (uses default key)
 * this._trapFocusAPI = trapFocus();
 *
 * @example
 * // Cleanup when closing
 * disconnectedCallback() {
 *   this._trapFocusAPI?.cleanup();
 *   clearFocusableContainers(this.uniqueId);
 * }
 */
export const trapFocus = (wrapper?: HTMLElement, uniqueId?: string) => {
  const selectorTabbable = selectorTabbableCarbon.replace(
    `${carbonPrefix}-button`,
    `${carbonPrefix}-button:not([disabled]), ${carbonPrefix}-selectable-tag`
  );

  // Get containers for this uniqueId (or default key for backward compatibility)
  const id = uniqueId || DEFAULT_KEY;

  const containerArray = containers[id];

  if (!containerArray || containerArray.length === 0) {
    return { cleanup: () => {} };
  }

  // Use wrapper if provided, otherwise default to document for backward compatibility
  const eventTarget = wrapper || document;

  /**
   * Determines the best focusable element within a given container.
   *
   * @param el - The element to check for ability to focus
   * @returns The focusable element, or null if none found
   *
   * @internal
   */
  const getFocusTarget = (el) => {
    if (!el) {
      return null;
    }
    if (el.tagName === 'BUTTON' || el.tabIndex >= 0) {
      return el;
    }
    const inner = el.querySelector('button, [tabindex]:not([tabindex="-1"])');
    return inner || el;
  };

  /**
   * Returns the actual focused element, resolving through Shadow DOM and slot boundaries.
   *
   * In standard DOM, `document.activeElement` returns the focused element. However, with
   * Shadow DOM and slots, this can be misleading:
   * - If focus is inside a shadow root, `document.activeElement` returns the host element,
   *   not the actual focused element inside the shadow root.
   * - If focus is on a `<slot>` element, we need to resolve to the assigned element.
   *
   * This function traverses shadow roots to find the true focused element, stopping at
   * tabbable elements like buttons to avoid going too deep into component internals.
   *
   * @returns The actual focused element in the document
   *
   * @internal
   */
  const getRealActiveElement = () => {
    let activeElement = document.activeElement;

    // Traverse through nested shadow DOMs, but stop at tabbable elements
    // This ensures we stop at cds-button level, not go deeper into its shadow root
    while (
      activeElement &&
      activeElement.shadowRoot &&
      activeElement.shadowRoot.activeElement
    ) {
      const nextElement = activeElement.shadowRoot.activeElement;

      // Check if current element is a tabbable element (like cds-button)
      // If so, stop here instead of going deeper
      const tagName = activeElement.tagName.toLowerCase();
      if (
        selectorTabbable.indexOf(tagName) !== -1 ||
        tagName.includes('-button') ||
        activeElement.hasAttribute('tabindex')
      ) {
        break;
      }

      activeElement = nextElement;
    }

    // If active element is a slot, resolve to the assigned element
    if (activeElement?.tagName === 'SLOT') {
      let assigned: Element[] | undefined;

      if (activeElement instanceof HTMLSlotElement) {
        assigned = activeElement.assignedElements({ flatten: true });
      }
      const candidate = assigned?.find((node) =>
        node.matches('button, [tabindex]:not([tabindex="-1"])')
      );
      if (candidate) {
        activeElement = candidate;
      }
    }

    return activeElement;
  };

  //Optionally focus first element immediately
  requestAnimationFrame(() => {
    const elements = getAllFocusableElements(containerArray);
    getFocusTarget(elements[0])?.focus({ preventScroll: true });
  });

  /**
   * Handles Tab and Shift+Tab key presses to trap focus within containers.
   *
   * @param e - The keyboard event
   *
   * @internal
   */
  function onKeyDown(e) {
    if (e.key !== 'Tab') {
      return;
    }

    // Flatten all focusable elements from all containers
    const elements = getAllFocusableElements(containerArray);

    const first = elements[0];
    const last = elements[elements.length - 1];
    const active = getRealActiveElement();

    if (e.shiftKey) {
      // Shift+Tab wrap
      if (active === first || first.contains(active)) {
        e.preventDefault();
        getFocusTarget(last)?.focus();
      }
    } else {
      // Tab wrap
      if (active === last || last.contains(active)) {
        e.preventDefault();
        getFocusTarget(first)?.focus();
      }
    }
  }

  /**
   * Retrieves all focusable elements from all registered containers.
   *
   * @param containers - Array of containers to query for focusable elements
   * @returns Array of all focusable elements found
   *
   * @internal
   */
  const getAllFocusableElements = (containers) =>
    containers
      .flatMap((container) => [...container.querySelectorAll(selectorTabbable)])
      .filter(Boolean);

  eventTarget.addEventListener('keydown', onKeyDown, true);

  return {
    cleanup: () => {
      eventTarget.removeEventListener('keydown', onKeyDown, true);
      // Don't clear containers here - let components unregister themselves
    },
  };
};
