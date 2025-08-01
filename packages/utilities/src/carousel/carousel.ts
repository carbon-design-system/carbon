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

  const registerRef = (index: number, ref: HTMLElement) => {
    refs[index] = ref;
  };

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

  const handleTransitionStart = () => {
    previousViewIndexStack = [...viewIndexStack];
    const callbackData = getCallbackResponse();
    onViewChangeStart?.(callbackData);
  };

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

  const sanitizeIndex = (idx: number) => {
    const floorVal = 0;
    const ceilVal = Object.keys(refs).length - 1;
    return Math.max(floorVal, Math.min(idx, ceilVal));
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

        viewItem.addEventListener('animationend', listener);
        viewItem.addEventListener('transitionend', listener);

        viewItem.setAttribute('data-index', index.toString());
      }
    });

    if (isInitial) {
      handleTransitionEnd(Array.from(viewItems)[0]);
    }
  };

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
    registerSwipeEvents(carouselContainer, navigateNext, navigatePrev, true);
  };

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
    destroyEvents: !excludeSwipeSupport ? destroyEvents : null,
    allViews: refs,
  };
};
