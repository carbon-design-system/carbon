/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InitCarousal, CarousalResponse, CarousalStackHistory } from './types';
import { registerSwipeEvents } from './swipeEvents';

export const initCarousal = (
  carousalContainer: HTMLElement,
  onViewChangeStart: (args: CarousalResponse) => void,
  onViewChangeEnd: (args: CarousalResponse) => void
): InitCarousal => {
  const prefix = 'carousal';
  let viewIndexStack = [0];
  let previousViewIndexStack = [0];
  let refs: Record<number, HTMLElement | null> = {};

  const registerRef = (index: number, ref: HTMLElement) => {
    refs = { ...refs, [index]: ref };
  };

  const wrapAllItems = (container: HTMLElement, wrapperClass: string) => {
    // Create a wrapper div around children

    if (container.querySelector(`.${wrapperClass}`)) return;

    const wrapper = document.createElement('div');
    wrapper.classList.add(`${wrapperClass}`);

    // Move all child nodes to the wrapper
    while (container.firstChild) {
      wrapper.appendChild(container.firstChild);
    }

    // Append the wrapper to the container

    container.appendChild(wrapper);
  };

  const getHistory = () => {
    return viewIndexStack.map((id) => {
      return { id: id, elem: refs[id] };
    });
  };

  const getCallbackResponse = (): CarousalResponse => {
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
      historyStack: historicalData as CarousalStackHistory[],
    };
  };

  const handleTransitionStart = () => {
    previousViewIndexStack = [...viewIndexStack];
    const { currentIndex, lastIndex, totalViews, historyStack } =
      getCallbackResponse();
    if (onViewChangeStart) {
      onViewChangeStart({
        currentIndex,
        lastIndex,
        totalViews,
        historyStack,
      });
    }
  };

  const handleTransitionEnd = (el?: HTMLElement | null) => {
    if (!el) {
      return;
    }
    const tmpElementIndex = el.dataset.index;

    if (
      tmpElementIndex &&
      viewIndexStack[0] === parseInt(tmpElementIndex, 10) &&
      onViewChangeEnd
    ) {
      const { currentIndex, lastIndex, totalViews, historyStack } =
        getCallbackResponse();

      onViewChangeEnd({
        currentIndex,
        lastIndex,
        totalViews,
        historyStack,
      });
    }
  };

  const sanitizeIndex = (idx: number) => {
    const floorVal = 0;
    const ceilVal = Object.keys(refs).length - 1;
    if (idx < floorVal) {
      return floorVal;
    } else if (idx > ceilVal) {
      return ceilVal;
    }
    return idx;
  };

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

  const attachClasssNames = (
    viewItem: HTMLElement,
    isInViewStack: boolean,
    isActive: boolean,
    isBeingRecycledOut: boolean,
    isBeingRecycledIn: boolean
  ) => {
    viewItem.classList.add(`${prefix}__view`);

    if (isInViewStack && !isActive) {
      viewItem.classList.add(`${prefix}__view-in-stack`);
    } else {
      viewItem.classList.remove(`${prefix}__view-in-stack`);
    }
    if (isInViewStack && isActive) {
      viewItem.classList.add(`${prefix}__view-active`);
    } else {
      viewItem.classList.remove(`${prefix}__view-active`);
    }
    if (isBeingRecycledIn && !isBeingRecycledOut) {
      viewItem.classList.add(`${prefix}__view-recycle-in`);
    }
    if (!isBeingRecycledIn && isBeingRecycledOut) {
      viewItem.classList.add(`${prefix}__view-recycle-out`);
    }
  };
  const removeReCycleClasses = (viewItem: HTMLElement) => {
    viewItem?.classList.remove(
      `${prefix}__view-recycle-in`,
      `${prefix}__view-recycle-out`
    );
  };
  const performAnimation = (isInitial: boolean) => {
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
      let isActive = false;
      if (index === viewIndexStack[0]) {
        isActive = true;
      }

      attachClasssNames(
        viewItem,
        isInViewStack,
        isActive,
        isBeingRecycledOut,
        isBeingRecycledIn
      );

      if (isInitial) {
        registerRef(index, viewItem);

        viewItem.addEventListener('animationend', (e) => {
          removeReCycleClasses(viewItem);
          if (refs[viewIndexStack[0]] === e.target) {
            //transitionend will trigger twice for pervious card and currnt card
            transitionComplete(viewItem);
          }
        });

        viewItem.addEventListener('transitionend', (e) => {
          removeReCycleClasses(viewItem);
          if (refs[viewIndexStack[0]] === e.target) {
            //transitionend will trigger twice for pervious card and currnt card
            transitionComplete(viewItem);
          }
        });

        viewItem.setAttribute('data-index', index + '');
      }
    });

    if (isInitial) {
      handleTransitionEnd(Array.from(viewItems)[0]);
    }
  };

  //api
  const navigateNext = () => {
    const targetViewIndex = viewIndexStack[0] + 1;
    transitionToViewIndex(targetViewIndex);
  };

  const navigatePrev = () => {
    if (viewIndexStack.length - 1 >= 1) {
      handleTransitionStart();
      viewIndexStack = viewIndexStack.slice(1);

      performAnimation(false);
    }
  };

  const goToIndex = (index: number) => {
    transitionToViewIndex(index);
  };
  const getActiveItem = () => {
    return {
      index: viewIndexStack[0],
      item: refs[viewIndexStack[0]],
    };
  };

  const reset = () => {
    viewIndexStack = [0];

    performAnimation(false);
  };

  const destroyEvents = () => {
    registerSwipeEvents(carousalContainer, navigateNext, navigatePrev, true);
  };
  //initialize
  wrapAllItems(carousalContainer, `${prefix}__itemsWrapper`);
  const wrapper = carousalContainer.querySelector(`.${prefix}__itemsWrapper`);

  const viewItems = wrapper
    ? Array.from(wrapper.children).filter(
        (el): el is HTMLElement => el instanceof HTMLElement
      )
    : [];
  carousalContainer.classList.add(`${prefix}__view-stack`);
  performAnimation(true);
  registerSwipeEvents(carousalContainer, navigateNext, navigatePrev, false);

  return {
    next: navigateNext,
    prev: navigatePrev,
    reset: reset,
    goToIndex: goToIndex,
    getActiveItem: getActiveItem,
    destroyEvents: destroyEvents,
  };
};
