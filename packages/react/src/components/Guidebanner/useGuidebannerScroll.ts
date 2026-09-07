/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef } from 'react';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

/** @internal */
type ScrollHandle = {
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollReset: () => void;
  scrollToView: (itemNumber: number) => void;
};

/**
 * @internal
 * Private scroll hook for the Guidebanner component.
 * Manages scrolling behaviour for the carousel-style content row.
 */
function useGuidebannerScroll(options: {
  onScroll: (scrollPercent: number) => void;
  onChangeIsScrollable: (isScrollable: boolean) => void;
  fadedEdgeColor?: string | { left: string; right: string };
  disableArrowScroll?: boolean;
  disableResetOnResize?: boolean;
}): {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  carouselRef: React.RefObject<HTMLDivElement | null>;
  leftFadedEdgeRef: React.RefObject<HTMLDivElement | null>;
  rightFadedEdgeRef: React.RefObject<HTMLDivElement | null>;
  childElementsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  handle: ScrollHandle;
} {
  const {
    onScroll,
    onChangeIsScrollable,
    fadedEdgeColor,
    disableArrowScroll,
    disableResetOnResize,
  } = options;

  const leftFadedEdgeColor =
    typeof fadedEdgeColor === 'object' ? fadedEdgeColor?.left : fadedEdgeColor;
  const rightFadedEdgeColor =
    typeof fadedEdgeColor === 'object' ? fadedEdgeColor?.right : fadedEdgeColor;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const leftFadedEdgeRef = useRef<HTMLDivElement | null>(null);
  const rightFadedEdgeRef = useRef<HTMLDivElement | null>(null);
  const childElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleOnScroll = useCallback(() => {
    const scrollDiv = scrollRef.current;
    if (!scrollDiv) {
      return;
    }
    const { scrollLeft, clientWidth, scrollWidth } = scrollDiv;
    const scrollPercent =
      parseFloat((scrollLeft / (scrollWidth - clientWidth)).toFixed(2)) || 0;
    onChangeIsScrollable(scrollWidth > clientWidth);
    onScroll(scrollPercent);
  }, [onChangeIsScrollable, onScroll]);

  const getElementInView = useCallback(
    (containerRect: DOMRect, elementRect: DOMRect): boolean => {
      return (
        elementRect.left >= containerRect.left &&
        elementRect.right <= containerRect.right
      );
    },
    []
  );

  const getElementsInView = useCallback((): HTMLDivElement[] => {
    const scrollDiv = scrollRef.current;
    if (!scrollDiv) {
      return [];
    }
    const containerRect = scrollDiv.getBoundingClientRect();
    return (
      childElementsRef.current.filter(Boolean) as HTMLDivElement[]
    ).filter((el) =>
      getElementInView(containerRect, el.getBoundingClientRect())
    );
  }, [getElementInView]);

  const getContainerAndChildRectData = useCallback(() => {
    const scrollDiv = scrollRef.current;
    if (!scrollDiv) {
      return { containerRect: null, elementRectsInView: [], visibleWidth: 0 };
    }
    const containerRect = scrollDiv.getBoundingClientRect();
    const elementRectsInView = getElementsInView().map((el) =>
      el.getBoundingClientRect()
    );
    const visibleWidth = elementRectsInView.reduce(
      (acc, r) => acc + r.width,
      0
    );
    return { containerRect, elementRectsInView, visibleWidth };
  }, [getElementsInView]);

  const handleScrollNext = useCallback(() => {
    const scrollDiv = scrollRef.current;
    if (!scrollDiv) {
      return;
    }
    const { containerRect, visibleWidth } = getContainerAndChildRectData();
    const scrollValue =
      visibleWidth > 0 ? visibleWidth : (containerRect?.width ?? 0);
    scrollDiv.scrollLeft += scrollValue;
  }, [getContainerAndChildRectData]);

  const handleScrollPrev = useCallback(() => {
    const scrollDiv = scrollRef.current;
    if (!scrollDiv) {
      return;
    }
    const { containerRect, elementRectsInView, visibleWidth } =
      getContainerAndChildRectData();
    const scrollValue =
      visibleWidth > 0
        ? visibleWidth - (elementRectsInView[0]?.left ?? 0)
        : (containerRect?.width ?? 0) + (containerRect?.left ?? 0);
    scrollDiv.scrollLeft -= scrollValue;
  }, [getContainerAndChildRectData]);

  const handleScrollReset = useCallback(() => {
    const scrollDiv = scrollRef.current;
    if (!scrollDiv) {
      return;
    }
    scrollDiv.scrollLeft = 0;
    handleOnScroll();
  }, [handleOnScroll]);

  const handleScrollToView = useCallback((itemNumber: number) => {
    childElementsRef.current[itemNumber]?.scrollIntoView();
  }, []);

  // Mount — fire handleOnScroll after one tick so CSS has applied
  useEffect(() => {
    const timer = setTimeout(() => {
      handleOnScroll();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // scrollend on scrollRef → handleOnScroll
  useEffect(() => {
    const scrollDiv = scrollRef.current;
    if (!scrollDiv) {
      return;
    }
    scrollDiv.addEventListener('scrollend', handleOnScroll);
    return () => {
      scrollDiv.removeEventListener('scrollend', handleOnScroll);
    };
  }, [handleOnScroll]);

  // resize on window → reset + handleOnScroll (unless disableResetOnResize)
  useEffect(() => {
    const handleWindowResize = () => {
      const scrollDiv = scrollRef.current;
      if (!scrollDiv) {
        return;
      }
      if (!disableResetOnResize) {
        scrollDiv.scrollLeft = 0;
      }
      handleOnScroll();
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [disableResetOnResize, handleOnScroll]);

  // wheel on scrollRef, { passive: false } → preventDefault only when shiftKey
  useEffect(() => {
    const scrollDiv = scrollRef.current;
    if (!scrollDiv) {
      return;
    }
    const handleWheel = (e: WheelEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
      }
    };
    scrollDiv.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      scrollDiv.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // keydown on carouselRef → block ArrowLeft/ArrowRight when disableArrowScroll
  useEffect(() => {
    const carouselDiv = carouselRef.current;
    if (!carouselDiv) {
      return;
    }
    const handleKeydown = (e: KeyboardEvent) => {
      if (
        disableArrowScroll &&
        (e.key === 'ArrowLeft' || e.key === 'ArrowRight')
      ) {
        e.preventDefault();
      }
    };
    carouselDiv.addEventListener('keydown', handleKeydown);
    return () => {
      carouselDiv.removeEventListener('keydown', handleKeydown);
    };
  }, [disableArrowScroll]);

  // Faded edge rendering — left
  useIsomorphicEffect(() => {
    const el = leftFadedEdgeRef.current;
    if (el && leftFadedEdgeColor) {
      el.style.background = `linear-gradient(90deg, ${leftFadedEdgeColor}, transparent)`;
    }
  }, [leftFadedEdgeRef, leftFadedEdgeColor]);

  // Faded edge rendering — right
  useIsomorphicEffect(() => {
    const el = rightFadedEdgeRef.current;
    if (el && rightFadedEdgeColor) {
      el.style.background = `linear-gradient(270deg, ${rightFadedEdgeColor}, transparent)`;
    }
  }, [rightFadedEdgeRef, rightFadedEdgeColor]);

  return {
    scrollRef,
    carouselRef,
    leftFadedEdgeRef,
    rightFadedEdgeRef,
    childElementsRef,
    handle: {
      scrollNext: handleScrollNext,
      scrollPrev: handleScrollPrev,
      scrollReset: handleScrollReset,
      scrollToView: handleScrollToView,
    },
  };
}

export default useGuidebannerScroll;
