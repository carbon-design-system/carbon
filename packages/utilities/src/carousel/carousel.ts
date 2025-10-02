/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  InitCarousel,
  CarouselResponse,
  CarouselStackHistory,
  Config,
} from './types';
import { registerSwipeEvents } from './swipeEvents';

/**
 * Initializes a carousel with the given configuration.
 * @param carouselContainer - The HTMLElement representing the carousel container.
 * @param config - Optional configuration object.
 * @returns An object containing methods to control the carousel.
 */
export const initCarousel = (
  carouselContainer: HTMLElement,
  config?: Config
): InitCarousel => {
  const prefix = 'carousel';
  let viewIndexStack = [0];
  let previousViewIndexStack = [0];
  const refs: Record<number, HTMLElement | null> = {};

  const minHeight = 10; // 10 rem

  const { onViewChangeStart, onViewChangeEnd, excludeSwipeSupport } =
    config || {};

  /**
   * Registers an HTMLElement at a specific index in the refs array.
   *
   * @param {number} index - The index at which to register the HTMLElement.
   * @param {HTMLElement} ref - The HTMLElement to register.
   *
   * @example
   * registerRef(0, document.getElementById('myElement'));
   */
  const registerRef = (index: number, ref: HTMLElement) => {
    refs[index] = ref;
  };

  /**
   * Wraps all child elements of a given container into a new div with the specified class.
   * If an element with the specified class already exists as a child of the container, the function does nothing.
   *
   * @param {HTMLElement} container - The container element to wrap child elements of.
   * @param {string} wrapperClass - The class name to apply to the new wrapper div.
   * @returns {void}
   */
  const wrapAllItems = (container: HTMLElement, wrapperClass: string) => {
    if (container.querySelector(`.${wrapperClass}`)) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.classList.add(`${wrapperClass}`);
    while (container.firstChild) {
      wrapper.appendChild(container.firstChild);
    }
    container.appendChild(wrapper);
  };

  const getHistory = () => {
    return viewIndexStack.map((id) => ({
      id,
      elem: refs[id],
    }));
  };
  /**
   * Retrieves the current carousel response based on the view index stack and reference objects.
   * @returns {CarouselResponse} - An object containing carousel response details.
   */
  const getCallbackResponse = (): CarouselResponse => {
    const totalRefs = Object.keys(refs).length;
    const lastElementRef = refs[totalRefs - 1];
    const historicalData = getHistory();
    return {
      currentIndex: viewIndexStack[0],
      lastIndex: parseInt(
        lastElementRef?.dataset.index || viewIndexStack[0].toString(),
        10
      ),
      totalViews: totalRefs,
      historyStack: historicalData as CarouselStackHistory[],
    };
  };

  /**
   * Handles the start of a transition in the application.
   * This function is responsible for capturing the current state of the view index stack
   * and invoking a callback function if it exists.
   *
   * @function handleTransitionStart
   * @returns {void}
   */
  const handleTransitionStart = () => {
    previousViewIndexStack = [...viewIndexStack];
    const callbackData = getCallbackResponse();
    onViewChangeStart?.(callbackData);
  };

  /**
   * Handles the 'transitionend' event for a given element.
   * This function checks if the element has a 'data-index' attribute and if its value matches the current view index.
   * If both conditions are met, it calls the 'onViewChangeEnd' callback with the response from 'getCallbackResponse'.
   *
   * @param {HTMLElement | null} el - The element to handle the 'transitionend' event for.
   * @returns {void}
   */
  const handleTransitionEnd = (el?: HTMLElement | null) => {
    if (!el) {
      return;
    }
    const tmpElementIndex = el.dataset.index;
    if (
      tmpElementIndex &&
      viewIndexStack[0] === parseInt(tmpElementIndex, 10)
    ) {
      const callbackData = getCallbackResponse();
      onViewChangeEnd?.(callbackData);
    }
  };

  /**
   * A utility function to sanitize an index value.
   * This function ensures the index stays within the bounds of the refs array.
   *
   * @param {number} idx - The index to be sanitized.
   * @returns {number} - The sanitized index.
   */
  const sanitizeIndex = (idx: number) => {
    const floorVal = 0;
    const ceilVal = Object.keys(refs).length - 1;
    return Math.max(floorVal, Math.min(idx, ceilVal));
  };

  /**
   * Handles the 'transitionend' event for a given element.
   * This function checks if the element has a 'data-index' attribute and if its value matches the current view index.
   * If both conditions are met, it calls the 'onViewChangeEnd' callback with the response from 'getCallbackResponse'.
   *
   * @param {HTMLElement | null} el - The element to handle the 'transitionend' event for.
   * @returns {void}
   */
  const transitionToViewIndex = (idx: number) => {
    const sanitizedIndex = sanitizeIndex(idx);
    if (viewIndexStack[0] !== sanitizedIndex) {
      handleTransitionStart();
      viewIndexStack = [sanitizedIndex, ...viewIndexStack];
      performAnimation(false);
    }
  };

  const transitionComplete = (ref: HTMLElement) => {
    handleTransitionEnd(ref);
  };
  /**
   * Attaches class names to an HTMLElement based on given conditions.
   *
   * @param {HTMLElement} viewItem - The HTML element to which class names will be added.
   * @param {boolean} isInViewStack - Indicates if the view item is in the view stack.
   * @param {boolean} isActive - Indicates if the view item is active.
   * @param {boolean} isBeingRecycledOut - Indicates if the view item is being recycled out.
   * @param {boolean} isBeingRecycledIn - Indicates if the view item is being recycled in.
   * @returns {void}
   */
  const attachClassNames = (
    viewItem: HTMLElement,
    isInViewStack: boolean,
    isActive: boolean,
    isBeingRecycledOut: boolean,
    isBeingRecycledIn: boolean
  ) => {
    viewItem.classList.add(`${prefix}__view`);

    viewItem.classList.toggle(
      `${prefix}__view-in-stack`,
      isInViewStack && !isActive
    );
    viewItem.classList.toggle(
      `${prefix}__view-active`,
      isInViewStack && isActive
    );

    if (isBeingRecycledIn && !isBeingRecycledOut) {
      viewItem.classList.add(`${prefix}__view-recycle-in`);
    }
    if (!isBeingRecycledIn && isBeingRecycledOut) {
      viewItem.classList.add(`${prefix}__view-recycle-out`);
    }
  };

  const removeReCycleClasses = (viewItem: HTMLElement) => {
    viewItem.classList.remove(
      `${prefix}__view-recycle-in`,
      `${prefix}__view-recycle-out`
    );
  };

  const remToPx = (rem: number) => {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  };

  /**
   * Updates the height of the items wrapper in a carousel based on the smallest item height and a threshold height.
   * This function ensures that the items wrapper does not have a height smaller than the threshold, adjusting the item height if necessary.
   *
   * @param {number} itemHeightSmallest - The smallest height of an item in pixels.
   */
  const updateHeightForWrapper = (itemHeightSmallest: number) => {
    const thresholdHeight = remToPx(minHeight);
    const containerHeight = carouselContainer.clientHeight;

    if (containerHeight < thresholdHeight) {
      if (itemHeightSmallest < thresholdHeight) {
        itemHeightSmallest = thresholdHeight;
      }

      const itemsWrapper = carouselContainer.querySelector(
        `.${prefix}__itemsWrapper`
      ) as HTMLElement;
      if (itemsWrapper) {
        itemsWrapper.style.blockSize = `${itemHeightSmallest}px`;
      }
    }
  };

  /**
   * Performs animation on view items based on their state in the view index stack.
   * @param {boolean} isInitial - A flag indicating if this is the initial animation.
   */
  const performAnimation = (isInitial: boolean) => {
    let itemHeightSmallest = 0;
    Array.from(viewItems).forEach((viewItem: HTMLElement, index) => {
      const stackIndex = viewIndexStack.findIndex((idx) => idx === index);
      const stackIndexInstanceCount = previousViewIndexStack.filter(
        (viIdx) => viIdx === index
      ).length;

      const isBeingRecycledOut =
        previousViewIndexStack.length > viewIndexStack.length &&
        previousViewIndexStack[0] === index &&
        stackIndexInstanceCount > 0;

      const isBeingRecycledIn =
        previousViewIndexStack.length < viewIndexStack.length &&
        viewIndexStack[0] === index &&
        stackIndexInstanceCount > 0;

      const isInViewStack = stackIndex > -1;
      const isActive = index === viewIndexStack[0];

      attachClassNames(
        viewItem,
        isInViewStack,
        isActive,
        isBeingRecycledOut,
        isBeingRecycledIn
      );

      if (isInitial) {
        registerRef(index, viewItem);

        setTimeout(() => {
          if (
            !itemHeightSmallest ||
            (viewItem.offsetHeight < itemHeightSmallest &&
              itemHeightSmallest > remToPx(minHeight))
          ) {
            itemHeightSmallest = viewItem.offsetHeight;
          }
          viewItem.style.position = 'absolute';
          updateHeightForWrapper(itemHeightSmallest);
        });

        const listener = (e: Event) => {
          removeReCycleClasses(viewItem);
          if (e.target === refs[viewIndexStack[0]]) {
            //transitionend will trigger twice for pervious card and current card
            transitionComplete(viewItem);
          }
        };
        // store reference on the element for later removal
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        (viewItem as any)._carouselListener = listener;

        viewItem.addEventListener('animationend', listener);
        viewItem.addEventListener('transitionend', listener);

        viewItem.setAttribute('data-index', index.toString());
      }
    });

    if (isInitial) {
      handleTransitionEnd(Array.from(viewItems)[0]);
    }
  };

  /**
   * A utility function to navigate to the next view in the stack.
   * This function increments the current view index and transitions to the new index.
   *
   * @returns {void} - This function does not return any value.
   */
  const navigateNext = () => {
    const targetViewIndex = viewIndexStack[0] + 1;
    transitionToViewIndex(targetViewIndex);
  };
  /**
   * Navigates to the previous view in the view stack.
   * @function navigatePrev
   * @description This function checks if there is a previous view in the stack. If so, it triggers a transition start, removes the current view from the stack, and performs an animation to transition to the previous view.
   * @returns {void} - This function does not return a value.
   */
  const navigatePrev = () => {
    if (viewIndexStack.length - 1 >= 1) {
      handleTransitionStart();
      viewIndexStack = viewIndexStack.slice(1);
      performAnimation(false);
    }
  };

  /**
   * A function that transitions the view to a specified index.
   *
   * @param {number} index - The index to transition to.
   * @returns {void} - This function does not return a value.
   */
  const goToIndex = (index: number) => {
    transitionToViewIndex(index);
  };

  /**
   * Retrieves the currently active item and its index from the view index stack and references.
   * @returns An object containing the index and the corresponding item reference.
   */
  const getActiveItem = () => {
    return {
      index: viewIndexStack[0],
      item: refs[viewIndexStack[0]],
    };
  };

  /**
   * Resets the view index stack and performs an animation.
   *
   * @returns {void}
   */
  const reset = () => {
    viewIndexStack = [0];
    performAnimation(false);
  };

  /**
   * Removes event listeners for 'animationend' and 'transitionend' events from all elements with references stored in the `refs` object.
   * Also registers swipe events if `excludeSwipeSupport` is false.
   */
  const destroyEvents = () => {
    Object.values(refs).forEach((el) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      if (el && (el as any)._carouselListener) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        el.removeEventListener('animationend', (el as any)._carouselListener);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        el.removeEventListener('transitionend', (el as any)._carouselListener);
      }
    });
    if (!excludeSwipeSupport) {
      registerSwipeEvents(carouselContainer, navigateNext, navigatePrev, true);
    }
  };
  /**
   * Retrieves carousel items from a given container element.
   * If the container has a 'slot' element, it fetches all elements assigned to that slot.
   * Otherwise, it fetches all direct children of the container.
   *
   * @param {HTMLElement} container - The container element from which to extract carousel items.
   * @returns {HTMLElement[]} An array of HTMLElements representing the carousel items.
   *
   * @example
   * const carouselContainer = document.querySelector('.carousel-container');
   * const carouselItems = getCarouselItems(carouselContainer);
   * console.log(carouselItems); // Logs the carousel items as HTMLElements
   */
  const getCarouselItems = (container: HTMLElement): HTMLElement[] => {
    const slot = container.querySelector('slot') as HTMLSlotElement | null;
    return slot
      ? (slot.assignedElements({ flatten: true }) as HTMLElement[])
      : (Array.from(container.children) as HTMLElement[]);
  };

  // initialize
  wrapAllItems(carouselContainer, `${prefix}__itemsWrapper`);
  const wrapper = carouselContainer.querySelector(`.${prefix}__itemsWrapper`);
  const viewItems = getCarouselItems(wrapper as HTMLElement);

  carouselContainer.classList.add(`${prefix}__view-stack`);
  performAnimation(true);

  if (!excludeSwipeSupport) {
    registerSwipeEvents(carouselContainer, navigateNext, navigatePrev, false);
  }

  return {
    next: navigateNext,
    prev: navigatePrev,
    reset,
    goToIndex,
    getActiveItem,
    destroyEvents: destroyEvents,
    allViews: refs,
  };
};
